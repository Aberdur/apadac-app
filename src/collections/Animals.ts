import { lexicalEditor } from "@payloadcms/richtext-lexical";
import type {
  Access,
  CollectionAfterChangeHook,
  CollectionAfterDeleteHook,
  CollectionConfig,
  FieldAccess,
  Where,
} from "payload";

import { hasStaffRole } from "@/lib/security";

const slugify = (value: string) =>
  value
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z]+/g, "-") 
    .replace(/(^-|-$)/g, "");

// ---------------------------------------------------------
// VALIDATIONS PERSONNALISÉES
// ---------------------------------------------------------

const validateNoNumbersRequired = (value: any): string | true => {
  if (!value || String(value).trim() === "") return "Este campo es obligatorio. / This field is required.";
  if (/\d/.test(String(value))) return "Este campo no puede contener números. / This field cannot contain numbers.";
  return true;
};

const validateNoNumbersOptional = (value: any): string | true => {
  if (value && /\d/.test(String(value))) return "Este campo no puede contener números. / This field cannot contain numbers.";
  return true;
};

const validateDateRequired = (value: any): string | true => {
  if (!value) return "Este campo es obligatorio. / This field is required.";
  const date = new Date(value);
  if (isNaN(date.getTime())) return "Este campo debe contener únicamente una fecha válida. / This field must contain a valid date.";
  return true;
};

const validateDateOptional = (value: any): string | true => {
  if (value) {
    const date = new Date(value);
    if (isNaN(date.getTime())) return "Este campo debe contener únicamente una fecha válida. / This field must contain a valid date.";
  }
  return true;
};

// ---------------------------------------------------------

const canManageAnimals: Access = ({ req: { user } }) =>
  Boolean(
    user &&
      typeof user === "object" &&
      "role" in user &&
      ["admin", "editor", "adopciones"].includes(String(user.role ?? "")),
  );

const canDeleteAnimals: Access = ({ req: { user } }) =>
  Boolean(
    user &&
      typeof user === "object" &&
      "role" in user &&
      ["admin", "editor"].includes(String(user.role ?? "")),
  );

const canReadInternalAnimalField: FieldAccess = ({ req: { user } }) => hasStaffRole(user);

const getRelationshipID = (value: unknown): number | string | null => {
  if (!value) return null;
  if (typeof value === "string" || typeof value === "number") return value;
  if (typeof value === "object" && "id" in value) {
    const candidate = (value as { id?: number | string }).id;
    return typeof candidate === "string" || typeof candidate === "number" ? candidate : null;
  }
  return null;
};

type SelectedMedia = { id: number | string; fallbackAlt: string; };

const getMediaAltName = (name: unknown) => {
  if (typeof name !== "string") return "animal";
  return name.trim().replace(/\s+/g, "_") || "animal";
};

const getSelectedMedia = (doc: Record<string, unknown>): SelectedMedia[] => {
  const media = new Map<number | string, SelectedMedia>();
  const animalName = getMediaAltName(doc.name);
  const coverID = getRelationshipID(doc.coverImage);

  if (coverID) {
    media.set(coverID, { fallbackAlt: `${animalName}_portada`, id: coverID });
  }

  if (Array.isArray(doc.gallery)) {
    let galleryIndex = 1;
    doc.gallery.forEach((item) => {
      const id = getRelationshipID(item);
      if (id && !media.has(id)) {
        media.set(id, { fallbackAlt: `${animalName}_${galleryIndex}`, id });
        galleryIndex += 1;
      }
    });
  }
  return [...media.values()];
};

const syncMediaOwnership: CollectionAfterChangeHook = async ({ doc, req }) => {
  if (typeof doc.name !== "string" || doc.name.trim().length === 0) return doc;
  const selectedMedia = getSelectedMedia(doc as Record<string, unknown>);
  const selectedMediaIDs = selectedMedia.map((media) => media.id);
  const currentMedia = await req.payload.find({
    collection: "media",
    depth: 0,
    limit: 200,
    overrideAccess: true,
    pagination: false,
    where: { animal: { equals: doc.id } },
  });

  const currentMediaIDs = new Set(currentMedia.docs.map((item) => item.id));

  for (const media of selectedMedia) {
    const current = await req.payload.findByID({ id: media.id, collection: "media", depth: 0, overrideAccess: true });
    const updateData: Record<string, unknown> = { animal: doc.id };
    if (typeof current.alt !== "string" || current.alt.trim().length === 0) updateData.alt = media.fallbackAlt;
    await req.payload.update({ id: media.id, collection: "media", data: updateData, overrideAccess: true });
  }

  for (const media of currentMedia.docs) {
    if (!selectedMediaIDs.includes(media.id)) {
      await req.payload.update({ id: media.id, collection: "media", data: { animal: null }, overrideAccess: true });
    }
  }
  return { ...doc, _syncedMediaCount: currentMediaIDs.size };
};

const ensureAnimalDossier: CollectionAfterChangeHook = async ({ doc, req }) => {
  if (typeof doc.name !== "string" || doc.name.trim().length === 0) return doc;
  const existingDossiers = await req.payload.find({
    collection: "animal-dossiers",
    depth: 0,
    limit: 1,
    overrideAccess: true,
    pagination: false,
    where: { animal: { equals: doc.id } },
  });

  if (existingDossiers.docs.length === 0) {
    await req.payload.create({
      collection: "animal-dossiers",
      data: { animal: doc.id },
      overrideAccess: true,
    });
  }
  return doc;
};

const clearMediaOwnership: CollectionAfterDeleteHook = async ({ id, req }) => {
  const linkedMedia = await req.payload.find({
    collection: "media",
    depth: 0,
    limit: 200,
    overrideAccess: true,
    pagination: false,
    where: { animal: { equals: id } },
  });
  for (const media of linkedMedia.docs) {
    await req.payload.update({ id: media.id, collection: "media", data: { animal: null }, overrideAccess: true });
  }
};

const deleteAnimalDossiers: CollectionAfterDeleteHook = async ({ id, req }) => {
  const dossiers = await req.payload.find({
    collection: "animal-dossiers",
    depth: 0,
    limit: 20,
    overrideAccess: true,
    pagination: false,
    where: { animal: { equals: id } },
  });
  for (const dossier of dossiers.docs) {
    await req.payload.delete({ id: dossier.id, collection: "animal-dossiers", overrideAccess: true });
  }
};

const mediaFilterForAnimal = ({ id }: { id?: number | string }): Where =>
  id
    ? ({ or: [{ animal: { equals: id } }, { animal: { equals: null } }] } as Where)
    : ({ animal: { equals: null } } as Where);

export const Animals: CollectionConfig = {
  slug: "animals",
  access: {
    create: canManageAnimals,
    delete: canDeleteAnimals,
    read: () => true,
    update: canManageAnimals,
  },
  admin: {
    defaultColumns: ["name", "species", "status", "featured"],
    useAsTitle: "name",
  },
  hooks: {
    afterChange: [syncMediaOwnership, ensureAnimalDossier],
    afterDelete: [clearMediaOwnership, deleteAnimalDossiers],
  },
  
  fields: [
    {
      type: "tabs",
      tabs: [
        {
          label: { es: "Información Básica", en: "Basic Information" },
          fields: [
            {
              type: "row",
              fields: [
                {
                  name: "name",
                  type: "text",
                  label: { es: "Nombre", en: "Name" },
                  required: true,
                  validate: validateNoNumbersRequired, 
                },
                {
                  name: "slug",
                  type: "text",
                  admin: {
                    description: { 
                      es: "Se genera automáticamente a partir del nombre si lo dejas vacío.",
                      en: "Automatically generated from the name if left empty."
                    },
                  },
                  validate: validateNoNumbersRequired, 
                  hooks: {
                    beforeValidate: [
                      ({ data, value }) => {
                        if (typeof value === "string" && value.length > 0) return slugify(value);
                        if (typeof data?.name === "string") return slugify(data.name);
                        return value;
                      },
                    ],
                  },
                  index: true,
                  required: true,
                  unique: true,
                },
              ],
            },
            {
              type: "row",
              fields: [
                {
                  name: "species",
                  type: "select",
                  defaultValue: "perro",
                  label: { es: "Especie", en: "Species" },
                  options: [
                    { label: { es: "Perro", en: "Dog" }, value: "perro" },
                    { label: { es: "Gato", en: "Cat" }, value: "gato" },
                  ],
                  required: true,
                },
                {
                  name: "breed",
                  type: "text",
                  label: { es: "Raza", en: "Breed" },
                  validate: validateNoNumbersOptional, 
                },
              ],
            },
            {
              type: "row",
              fields: [
                {
                  name: "sex",
                  type: "select",
                  label: { es: "Sexo", en: "Sex" },
                  options: [
                    { label: { es: "Macho", en: "Male" }, value: "macho" },
                    { label: { es: "Hembra", en: "Female" }, value: "hembra" },
                  ],
                  required: true,
                },
                {
                  name: "age",
                  type: "date",
                  label: { es: "Edad aproximada", en: "Approximate age" },
                  required: true,
                  validate: validateDateRequired, 
                },
              ],
            },
            {
              type: "row",
              fields: [
                {
                  name: "size",
                  type: "select",
                  label: { es: "Tamaño", en: "Size" },
                  options: [
                    { label: { es: "Pequeño", en: "Small" }, value: "pequeno" },
                    { label: { es: "Mediano", en: "Medium" }, value: "mediano" },
                    { label: { es: "Grande", en: "Large" }, value: "grande" },
                  ],
                  required: true,
                },
                {
                  name: "energyLevel",
                  type: "select",
                  label: { es: "Nivel de energía", en: "Energy level" },
                  options: [
                    { label: { es: "Baja", en: "Low" }, value: "tranquila" },
                    { label: { es: "Media", en: "Medium" }, value: "equilibrada" },
                    { label: { es: "Alta", en: "High" }, value: "activa" },
                  ],
                },
              ],
            },
            {
              name: "location",
              type: "text",
              label: { es: "Zona / ubicación", en: "Location / Area" },
            },
          ],
        },
        {
          label: { es: "Descripción e Historia", en: "Description & History" },
          fields: [
            {
              name: "summary",
              type: "textarea",
              label: { es: "Resumen", en: "Summary" },
              required: true,
            },
            {
              name: "story",
              type: "richText",
              editor: lexicalEditor(),
              label: { es: "Historia completa", en: "Full story" },
            },
            {
              name: "temperament",
              type: "textarea",
              label: { es: "Carácter", en: "Temperament" },
            },
            {
              name: "adoptionRequirements",
              type: "textarea",
              label: { es: "Requisitos o notas para adopción", en: "Adoption requirements or notes" },
            },
          ],
        },
        {
          label: { es: "Salud y Compatibilidad", en: "Health & Compatibility" },
          fields: [
            {
              name: "health",
              type: "textarea",
              label: { es: "Salud", en: "Health" },
            },
            {
              type: "row",
              fields: [
                {
                  name: "goodWithDogs",
                  type: "checkbox",
                  defaultValue: false,
                  label: { es: "Compatible con perros", en: "Good with dogs" },
                },
                {
                  name: "goodWithCats",
                  type: "checkbox",
                  defaultValue: false,
                  label: { es: "Compatible con gatos", en: "Good with cats" },
                },
                {
                  name: "goodWithKids",
                  type: "checkbox",
                  defaultValue: false,
                  label: { es: "Compatible con niños", en: "Good with kids" },
                },
              ],
            },
            {
              type: "row",
              fields: [
                {
                  name: "vaccinated",
                  type: "checkbox",
                  defaultValue: false,
                  label: { es: "Vacunado/a", en: "Vaccinated" },
                },
                {
                  name: "sterilized",
                  type: "checkbox",
                  defaultValue: false,
                  label: { es: "Esterilizado/a", en: "Sterilized" },
                },
                {
                  name: "specialNeeds",
                  type: "checkbox",
                  defaultValue: false,
                  label: { es: "Necesidades especiales", en: "Special needs" },
                },
              ],
            },
          ],
        },
        {
          label: { es: "Multimedia", en: "Media" },
          fields: [
            {
              name: "featured",
              type: "checkbox",
              defaultValue: false,
              label: { es: "Destacar en portada", en: "Feature on homepage" },
            },
            {
              name: "coverImage",
              admin: {
                allowCreate: true,
                description: {
                  es: "Sube la portada desde aquí. La imagen se asociará automáticamente al guardar la ficha.",
                  en: "Upload the cover here. The image will be linked automatically when saving."
                },
              },
              filterOptions: ({ id }) => mediaFilterForAnimal({ id }),
              label: { es: "Imagen principal", en: "Main image" },
              relationTo: "media",
              type: "upload",
            },
            {
              name: "gallery",
              admin: {
                allowCreate: true,
                description: {
                  es: "Sube aquí el resto de fotos. Quedarán asociadas automáticamente al guardar la ficha.",
                  en: "Upload the rest of the photos here. They will be linked automatically when saving."
                },
                isSortable: true,
              },
              filterOptions: ({ id }) => mediaFilterForAnimal({ id }),
              hasMany: true,
              label: { es: "Galería", en: "Gallery" },
              relationTo: "media",
              type: "upload",
            },
          ],
        },
        {
          label: { es: "Administración", en: "Administration" },
          fields: [
            {
              name: "status",
              type: "select",
              admin: {
                description: {
                  es: "“Baja interna” mantiene la ficha en la base de datos pero la oculta de la web pública. Úsalo para casos sensibles o animales que no deban seguir visibles.",
                  en: "“Internal removal” keeps the record in the database but hides it from the public website. Use for sensitive cases or animals that shouldn't be visible anymore."
                },
              },
              defaultValue: "en_adopcion",
              label: { es: "Estado", en: "Status" },
              options: [
                { label: { es: "En adopción", en: "For adoption" }, value: "en_adopcion" },
                { label: "Urgente", value: "urgente" },
                { label: "En acogida", value: "acogida" },
                { label: "Reservado", value: "reservado" },
                { label: "Adoptado", value: "adopted" },
                { label: "Baja interna (oculto en web)", value: "baja_interna" },
                { label: "Recuperado por su familia", value: "recuperado" },
              ],
              required: true,
            },
            {
              type: "row",
              fields: [
                {
                  name: "entryDate",
                  type: "date",
                  label: { es: "Fecha de entrada", en: "Entry date" },
                  required: true,
                  validate: validateDateRequired, 
                },
                {
                  name: "adoptionDate",
                  type: "date",
                  label: { es: "Fecha de adopción", en: "Adoption date" },
                  validate: validateDateOptional, 
                },
              ],
            },
            {
              name: "sponsored",
              type: "checkbox",
              defaultValue: false,
              label: { es: "Apadrinado/a", en: "Sponsored" },
            },
            {
              name: "adoptionContact",
              type: "email",
              label: { es: "Email de contacto", en: "Contact email" },
              access: {
                create: canReadInternalAnimalField,
                read: canReadInternalAnimalField,
                update: canReadInternalAnimalField,
              },
            },
          ],
        },
      ],
    },
  ],
  labels: {
    plural: { es: "Animales", en: "Animals" },
    singular: { es: "Animal", en: "Animal" },
  },
  versions: {
    drafts: false,
  },
};