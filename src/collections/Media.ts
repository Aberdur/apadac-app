import type { Access, CollectionBeforeValidateHook, CollectionConfig } from "payload";

const canManageMedia: Access = ({ req: { user } }) => Boolean(user);

const getUploadFallbackAlt = (data: Record<string, unknown> | undefined, req: unknown) => {
  const currentAlt = data?.alt;

  if (typeof currentAlt === "string" && currentAlt.trim().length > 0) {
    return currentAlt;
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

  return fallback || "imagen";
};

const fillUploadAltBeforeValidate: CollectionBeforeValidateHook = ({ data, req }) => ({
  ...data,
  alt: getUploadFallbackAlt(data, req),
});

export const Media: CollectionConfig = {
  slug: "media",
  access: {
    create: canManageMedia,
    delete: canManageMedia,
    read: () => true,
    update: canManageMedia,
  },
  admin: {
    useAsTitle: "alt",
  },
  hooks: {
    beforeValidate: [fillUploadAltBeforeValidate],
  },
  fields: [
    {
      name: "animal",
      type: "relationship",
      admin: {
        description:
          "Este vínculo se completa automáticamente al guardar la ficha del animal.",
        hidden: true,
      },
      label: "Animal asociado",
      relationTo: "animals",
    },
    {
      name: "alt",
      type: "text",
      label: "Texto alternativo",
      admin: {
        description:
          "Opcional al subir desde una ficha: si lo dejas vacío, se completará con el nombre del animal al guardar.",
      },
    },
  ],
  upload: true,
};
