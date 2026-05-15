import type { Access, CollectionAfterChangeHook, CollectionConfig } from "payload";

import { hasStaffRole } from "../lib/security";

const canManageDossiers: Access = ({ req: { user } }) => hasStaffRole(user);

const syncDossierFilesOwnership: CollectionAfterChangeHook = async ({ doc, req }) => {
  const dossierID = doc.id;
  const selectedFileIDs = new Set<number | string>();

  if (Array.isArray(doc.documents)) {
    for (const document of doc.documents) {
      if (Array.isArray(document?.files)) {
        for (const file of document.files) {
          if (typeof file === "number" || typeof file === "string") {
            selectedFileIDs.add(file);
          } else if (file && typeof file === "object" && "id" in file) {
            const id = (file as { id?: number | string }).id;

            if (typeof id === "number" || typeof id === "string") {
              selectedFileIDs.add(id);
            }
          }
        }
      }
    }
  }

  for (const fileID of selectedFileIDs) {
    await req.payload.update({
      id: fileID,
      collection: "animal-files",
      data: {
        dossier: dossierID,
      },
      overrideAccess: true,
    });
  }

  const currentFiles = await req.payload.find({
    collection: "animal-files",
    depth: 0,
    limit: 200,
    overrideAccess: true,
    pagination: false,
    where: {
      dossier: {
        equals: dossierID,
      },
    },
  });

  for (const file of currentFiles.docs) {
    if (!selectedFileIDs.has(file.id)) {
      await req.payload.update({
        id: file.id,
        collection: "animal-files",
        data: {
          dossier: null,
        },
        overrideAccess: true,
      });
    }
  }

  return doc;
};

export const AnimalDossiers: CollectionConfig = {
  slug: "animal-dossiers",
  access: {
    create: canManageDossiers,
    delete: canManageDossiers,
    read: canManageDossiers,
    update: canManageDossiers,
  },
  admin: {
    defaultColumns: ["animal", "updatedAt"],
    group: "Gestión interna",
    useAsTitle: "animal",
  },
  fields: [
    {
      name: "animal",
      type: "relationship",
      admin: {
        description: "Cada animal debe tener una única carpeta documental.",
      },
      index: true,
      label: "Animal",
      relationTo: "animals",
      required: true,
      unique: true,
    },
    {
      name: "documents",
      type: "array",
      admin: {
        description:
          "Añade aquí informes veterinarios, vacunas, analíticas, contratos u otros documentos internos.",
        initCollapsed: true,
      },
      fields: [
        {
          name: "title",
          type: "text",
          label: "Título",
          required: true,
        },
        {
          name: "type",
          type: "select",
          defaultValue: "veterinario",
          label: "Tipo",
          options: [
            {
              label: "Veterinario",
              value: "veterinario",
            },
            {
              label: "Vacuna",
              value: "vacuna",
            },
            {
              label: "Analítica",
              value: "analitica",
            },
            {
              label: "Cirugía",
              value: "cirugia",
            },
            {
              label: "Medicación",
              value: "medicacion",
            },
            {
              label: "Contrato",
              value: "contrato",
            },
            {
              label: "Documentación",
              value: "documentacion",
            },
            {
              label: "Otro",
              value: "otro",
            },
          ],
          required: true,
        },
        {
          name: "documentDate",
          type: "date",
          admin: {
            date: {
              pickerAppearance: "dayOnly",
            },
          },
          label: "Fecha",
        },
        {
          name: "summary",
          type: "textarea",
          label: "Resumen",
        },
        {
          name: "notes",
          type: "textarea",
          label: "Notas internas",
        },
        {
          name: "files",
          type: "upload",
          admin: {
            allowCreate: true,
            description: "Sube imágenes, PDFs o documentos asociados a esta entrada.",
          },
          hasMany: true,
          label: "Archivos",
          relationTo: "animal-files",
        },
      ],
      label: "Documentos",
      labels: {
        plural: "Documentos",
        singular: "Documento",
      },
    },
    {
      name: "generalNotes",
      type: "textarea",
      label: "Notas generales",
    },
  ],
  hooks: {
    afterChange: [syncDossierFilesOwnership],
  },
  labels: {
    plural: "Documentación por animal",
    singular: "Carpeta documental",
  },
};
