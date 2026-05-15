import type { Access, CollectionConfig, FieldAccess } from "payload";

import { isAdminUser, shouldUseSecureCookies } from "@/lib/security";

const canBootstrapFirstUser: Access = async ({ req }) => {
  if (isAdminUser(req.user)) {
    return true;
  }

  const { docs } = await req.payload.find({
    collection: "users",
    depth: 0,
    limit: 1,
    overrideAccess: true,
    pagination: false,
  });

  return docs.length === 0;
};

const canReadOwnUser: Access = ({ req: { user } }) => {
  if (isAdminUser(user)) {
    return true;
  }

  if (!user || typeof user !== "object" || !("id" in user)) {
    return false;
  }

  return {
    id: {
      equals: user.id,
    },
  };
};

const canUpdateOwnUser: Access = ({ req: { user } }) => {
  if (isAdminUser(user)) {
    return true;
  }

  if (!user || typeof user !== "object" || !("id" in user)) {
    return false;
  }

  return {
    id: {
      equals: user.id,
    },
  };
};

const adminOnlyField: FieldAccess = ({ req: { user } }) => isAdminUser(user);

export const Users: CollectionConfig = {
  slug: "users",
  admin: {
    useAsTitle: "email",
  },
  access: {
    create: canBootstrapFirstUser,
    delete: ({ req: { user } }) => isAdminUser(user),
    read: canReadOwnUser,
    update: canUpdateOwnUser,
  },
  auth: {
    cookies: {
      sameSite: "Lax",
      secure: shouldUseSecureCookies(),
    },
    lockTime: 10 * 60 * 1000,
    maxLoginAttempts: 5,
    tokenExpiration: 60 * 60 * 2,
  },
  fields: [
    {
      name: "name",
      type: "text",
      label: "Nombre",
    },
    {
      name: "role",
      type: "select",
      defaultValue: "adopciones",
      label: "Rol",
      access: {
        create: adminOnlyField,
        update: adminOnlyField,
      },
      options: [
        {
          label: "Administración",
          value: "admin",
        },
        {
          label: "Edición",
          value: "editor",
        },
        {
          label: "Adopciones",
          value: "adopciones",
        },
      ],
      required: true,
    },
  ],
};
