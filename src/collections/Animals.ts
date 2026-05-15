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
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");

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
  if (!value) {
    return null;
  }

  if (typeof value === "string" || typeof value === "number") {
    return value;
  }

  if (typeof value === "object" && "id" in value) {
    const candidate = (value as { id?: number | string }).id;

    return typeof candidate === "string" || typeof candidate === "number"
      ? candidate
      : null;
  }

  return null;
};

type SelectedMedia = {
  id: number | string;
  fallbackAlt: string;
};

const getMediaAltName = (name: unknown) => {
  if (typeof name !== "string") {
    return "animal";
  }

  return name.trim().replace(/\s+/g, "_") || "animal";
};

const getSelectedMedia = (doc: Record<string, unknown>): SelectedMedia[] => {
  const media = new Map<number | string, SelectedMedia>();
  const animalName = getMediaAltName(doc.name);
  const coverID = getRelationshipID(doc.coverImage);

  if (coverID) {
    media.set(coverID, {
      fallbackAlt: `${animalName}_portada`,
      id: coverID,
    });
  }

  if (Array.isArray(doc.gallery)) {
    let galleryIndex = 1;

    doc.gallery.forEach((item) => {
      const id = getRelationshipID(item);

      if (id && !media.has(id)) {
        media.set(id, {
          fallbackAlt: `${animalName}_${galleryIndex}`,
          id,
        });
        galleryIndex += 1;
      }
    });
  }

  return [...media.values()];
};

const syncMediaOwnership: CollectionAfterChangeHook = async ({ doc, req }) => {
  if (typeof doc.name !== "string" || doc.name.trim().length === 0) {
    return doc;
  }

  const selectedMedia = getSelectedMedia(doc as Record<string, unknown>);
  const selectedMediaIDs = selectedMedia.map((media) => media.id);
  const currentMedia = await req.payload.find({
    collection: "media",
    depth: 0,
    limit: 200,
    overrideAccess: true,
    pagination: false,
    where: {
      animal: {
        equals: doc.id,
      },
    },
  });

  const currentMediaIDs = new Set(currentMedia.docs.map((item) => item.id));

  for (const media of selectedMedia) {
    const current = await req.payload.findByID({
      id: media.id,
      collection: "media",
      depth: 0,
      overrideAccess: true,
    });
    const updateData: Record<string, unknown> = {
      animal: doc.id,
    };

    if (typeof current.alt !== "string" || current.alt.trim().length === 0) {
      updateData.alt = media.fallbackAlt;
    }

    await req.payload.update({
      id: media.id,
      collection: "media",
      data: updateData,
      overrideAccess: true,
    });
  }

  for (const media of currentMedia.docs) {
    if (!selectedMediaIDs.includes(media.id)) {
      await req.payload.update({
        id: media.id,
        collection: "media",
        data: {
          animal: null,
        },
        overrideAccess: true,
      });
    }
  }

  return {
    ...doc,
    _syncedMediaCount: currentMediaIDs.size,
  };
};

const ensureAnimalDossier: CollectionAfterChangeHook = async ({ doc, req }) => {
  if (typeof doc.name !== "string" || doc.name.trim().length === 0) {
    return doc;
  }

  const existingDossiers = await req.payload.find({
    collection: "animal-dossiers",
    depth: 0,
    limit: 1,
    overrideAccess: true,
    pagination: false,
    where: {
      animal: {
        equals: doc.id,
      },
    },
  });

  if (existingDossiers.docs.length === 0) {
    await req.payload.create({
      collection: "animal-dossiers",
      data: {
        animal: doc.id,
      },
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
    where: {
      animal: {
        equals: id,
      },
    },
  });

  for (const media of linkedMedia.docs) {
    await req.payload.update({
      id: media.id,
      collection: "media",
      data: {
        animal: null,
      },
      overrideAccess: true,
    });
  }
};

const deleteAnimalDossiers: CollectionAfterDeleteHook = async ({ id, req }) => {
  const dossiers = await req.payload.find({
    collection: "animal-dossiers",
    depth: 0,
    limit: 20,
    overrideAccess: true,
    pagination: false,
    where: {
      animal: {
        equals: id,
      },
    },
  });

  for (const dossier of dossiers.docs) {
    await req.payload.delete({
      id: dossier.id,
      collection: "animal-dossiers",
      overrideAccess: true,
    });
  }
};

const mediaFilterForAnimal = ({ id }: { id?: number | string }): Where =>
  id
    ? ({
        or: [
          {
            animal: {
              equals: id,
            },
          },
          {
            animal: {
              equals: null,
            },
          },
        ],
      } as Where)
    : ({
        animal: {
          equals: null,
        },
      } as Where);

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
      name: "name",
      type: "text",
      label: "Nombre",
      required: true,
    },
    {
      name: "slug",
      type: "text",
      admin: {
        description: "Se genera automáticamente a partir del nombre si lo dejas vacío.",
      },
      hooks: {
        beforeValidate: [
          ({ data, value }) => {
            if (typeof value === "string" && value.length > 0) {
              return slugify(value);
            }

            if (typeof data?.name === "string") {
              return slugify(data.name);
            }

            return value;
          },
        ],
      },
      index: true,
      required: true,
      unique: true,
    },
    {
      name: "species",
      type: "select",
      defaultValue: "perro",
      label: "Especie",
      options: [
        {
          label: "Perro",
          value: "perro",
        },
        {
          label: "Gato",
          value: "gato",
        },
      ],
      required: true,
    },
    {
      name: "status",
      type: "select",
      admin: {
        description:
          "“Baja interna” mantiene la ficha en la base de datos pero la oculta de la web pública. Úsalo para casos sensibles o animales que no deban seguir visibles.",
      },
      defaultValue: "en_adopcion",
      label: "Estado",
      options: [
        {
          label: "En adopción",
          value: "en_adopcion",
        },
        {
          label: "Urgente",
          value: "urgente",
        },
        {
          label: "En acogida",
          value: "acogida",
        },
        {
          label: "Reservado",
          value: "reservado",
        },
        {
          label: "Adoptado",
          value: "adoptado",
        },
        {
          label: "Baja interna (oculto en web)",
          value: "baja_interna",
        },
      ],
      required: true,
    },
    {
      name: "featured",
      type: "checkbox",
      defaultValue: false,
      label: "Destacar en portada",
    },
    {
      type: "row",
      fields: [
        {
          name: "entryDate",
          type: "date",
          label: "Fecha de entrada",
        },
        {
          name: "adoptionDate",
          type: "date",
          label: "Fecha de adopción",
        },
      ],
    },
    {
      type: "row",
      fields: [
        {
          name: "sex",
          type: "select",
          label: "Sexo",
          options: [
            {
              label: "Macho",
              value: "macho",
            },
            {
              label: "Hembra",
              value: "hembra",
            },
          ],
        },
        {
          name: "age",
          type: "text",
          label: "Edad aproximada",
        },
        {
          name: "size",
          type: "select",
          label: "Tamaño",
          options: [
            {
              label: "Pequeño",
              value: "pequeno",
            },
            {
              label: "Mediano",
              value: "mediano",
            },
            {
              label: "Grande",
              value: "grande",
            },
          ],
        },
      ],
    },
    {
      name: "breed",
      type: "text",
      label: "Raza",
    },
    {
      type: "row",
      fields: [
        {
          name: "location",
          type: "text",
          label: "Zona / ubicación",
        },
        {
          name: "energyLevel",
          type: "select",
          label: "Nivel de energía",
          options: [
            {
              label: "Baja",
              value: "tranquila",
            },
            {
              label: "Media",
              value: "equilibrada",
            },
            {
              label: "Alta",
              value: "activa",
            },
          ],
        },
      ],
    },
    {
      name: "summary",
      type: "textarea",
      label: "Resumen",
      required: true,
    },
    {
      name: "story",
      type: "richText",
      editor: lexicalEditor(),
      label: "Historia completa",
    },
    {
      name: "health",
      type: "textarea",
      label: "Salud",
    },
    {
      name: "adoptionRequirements",
      type: "textarea",
      label: "Requisitos o notas para adopción",
    },
    {
      name: "temperament",
      type: "textarea",
      label: "Carácter",
    },
    {
      type: "row",
      fields: [
        {
          name: "goodWithDogs",
          type: "checkbox",
          defaultValue: false,
          label: "Compatible con perros",
        },
        {
          name: "goodWithCats",
          type: "checkbox",
          defaultValue: false,
          label: "Compatible con gatos",
        },
        {
          name: "goodWithKids",
          type: "checkbox",
          defaultValue: false,
          label: "Compatible con niños",
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
          label: "Vacunado/a",
        },
        {
          name: "sterilized",
          type: "checkbox",
          defaultValue: false,
          label: "Esterilizado/a",
        },
        {
          name: "specialNeeds",
          type: "checkbox",
          defaultValue: false,
          label: "Necesidades especiales",
        },
        {
          name: "sponsored",
          type: "checkbox",
          defaultValue: false,
          label: "Apadrinado/a",
        },
      ],
    },
    {
      name: "coverImage",
      admin: {
        allowCreate: true,
        description:
          "Sube la portada desde aquí. La imagen se asociará automáticamente al guardar la ficha.",
      },
      filterOptions: ({ id }) => mediaFilterForAnimal({ id }),
      label: "Imagen principal",
      relationTo: "media",
      type: "upload",
    },
    {
      name: "gallery",
      admin: {
        allowCreate: true,
        description:
          "Sube aquí el resto de fotos. Quedarán asociadas automáticamente al guardar la ficha.",
        isSortable: true,
      },
      filterOptions: ({ id }) => mediaFilterForAnimal({ id }),
      hasMany: true,
      label: "Galería",
      relationTo: "media",
      type: "upload",
    },
    {
      name: "adoptionContact",
      type: "email",
      label: "Email de contacto",
      access: {
        create: canReadInternalAnimalField,
        read: canReadInternalAnimalField,
        update: canReadInternalAnimalField,
      },
    },
  ],
  labels: {
    plural: "Animales",
    singular: "Animal",
  },
  versions: {
    drafts: true,
  },
};
