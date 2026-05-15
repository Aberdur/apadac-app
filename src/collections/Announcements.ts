import type { Access, CollectionConfig } from "payload";

const slugify = (value: string) =>
  value
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");

const canManageAnnouncements: Access = ({ req: { user } }) =>
  Boolean(
    user &&
      typeof user === "object" &&
      "role" in user &&
      ["admin", "editor"].includes(String(user.role ?? "")),
  );

export const Announcements: CollectionConfig = {
  slug: "announcements",
  access: {
    create: canManageAnnouncements,
    delete: canManageAnnouncements,
    read: () => true,
    update: canManageAnnouncements,
  },
  admin: {
    defaultColumns: ["title", "kind", "eventDate", "featured"],
    useAsTitle: "title",
  },
  fields: [
    {
      name: "title",
      type: "text",
      label: "Título",
      required: true,
    },
    {
      name: "slug",
      type: "text",
      admin: {
        description: "Se genera automáticamente a partir del título si lo dejas vacío.",
      },
      hooks: {
        beforeValidate: [
          ({ data, value }) => {
            if (typeof value === "string" && value.length > 0) {
              return slugify(value);
            }

            if (typeof data?.title === "string") {
              return slugify(data.title);
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
      name: "kind",
      type: "select",
      defaultValue: "noticia",
      label: "Tipo",
      options: [
        {
          label: "Noticia",
          value: "noticia",
        },
        {
          label: "Evento",
          value: "evento",
        },
        {
          label: "Comunicado",
          value: "comunicado",
        },
      ],
      required: true,
    },
    {
      name: "summary",
      type: "textarea",
      label: "Resumen",
      required: true,
    },
    {
      name: "body",
      type: "textarea",
      label: "Contenido",
    },
    {
      name: "eventDate",
      type: "date",
      admin: {
        date: {
          pickerAppearance: "dayOnly",
        },
        description: "Útil si el anuncio corresponde a un evento o una cita concreta.",
      },
      label: "Fecha del anuncio o evento",
    },
    {
      name: "location",
      type: "text",
      label: "Lugar",
    },
    {
      name: "featured",
      type: "checkbox",
      defaultValue: false,
      label: "Destacar en portada",
    },
    {
      name: "coverImage",
      type: "upload",
      relationTo: "media",
      label: "Imagen principal",
      admin: {
        allowCreate: true,
      },
    },
    {
      name: "externalUrl",
      type: "text",
      label: "Enlace externo",
    },
  ],
  labels: {
    plural: "Anuncios",
    singular: "Anuncio",
  },
  versions: {
    drafts: true,
  },
};
