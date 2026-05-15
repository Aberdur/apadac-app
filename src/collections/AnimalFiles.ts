import type { Access, CollectionBeforeValidateHook, CollectionConfig } from "payload";

import { hasStaffRole } from "../lib/security";

const canManageAnimalFiles: Access = ({ req: { user } }) => hasStaffRole(user);

const getUploadFallbackTitle = (data: Record<string, unknown> | undefined, req: unknown) => {
  const currentTitle = data?.title;

  if (typeof currentTitle === "string" && currentTitle.trim().length > 0) {
    return currentTitle;
  }

  const requestFileName =
    typeof req === "object" &&
    req &&
    "file" in req &&
    typeof (req as { file?: { name?: unknown } }).file?.name === "string"
      ? (req as { file: { name: string } }).file.name
      : null;
  const filename = typeof data?.filename === "string" ? data.filename : requestFileName;
  const fallback = filename?.replace(/\.[^.]+$/, "").trim();

  return fallback || "Documento";
};

const fillTitleBeforeValidate: CollectionBeforeValidateHook = ({ data, req }) => ({
  ...data,
  title: getUploadFallbackTitle(data, req),
});

export const AnimalFiles: CollectionConfig = {
  slug: "animal-files",
  access: {
    create: canManageAnimalFiles,
    delete: canManageAnimalFiles,
    read: canManageAnimalFiles,
    update: canManageAnimalFiles,
  },
  admin: {
    defaultColumns: ["title", "filename", "updatedAt"],
    group: "Gestión interna",
    hidden: true,
    useAsTitle: "title",
  },
  fields: [
    {
      name: "dossier",
      type: "relationship",
      admin: {
        hidden: true,
      },
      label: "Carpeta documental",
      relationTo: "animal-dossiers",
    },
    {
      name: "title",
      type: "text",
      admin: {
        description: "Nombre interno del archivo. Si lo dejas vacío, se usará el nombre del fichero.",
      },
      label: "Título",
    },
  ],
  hooks: {
    beforeValidate: [fillTitleBeforeValidate],
  },
  labels: {
    plural: "Archivos internos",
    singular: "Archivo interno",
  },
  upload: true,
};
