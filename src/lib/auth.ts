import { headers } from "next/headers";

import { getCMS } from "@/lib/payload";

export const getAdminSession = async () => {
  const payload = await getCMS();
  const requestHeaders = await headers();
  const authResult = await payload.auth({
    headers: requestHeaders,
  });
  const updatePermission =
    authResult.permissions?.collections?.animals?.update as
      | true
      | { permission?: boolean }
      | undefined;

  const canEditAnimals =
    updatePermission === true ||
    (typeof updatePermission === "object" &&
      updatePermission !== null &&
      "permission" in updatePermission &&
      Boolean(updatePermission.permission));
  const helpUpdatePermission =
    authResult.permissions?.globals?.["como-ayudar"]?.update as
      | true
      | { permission?: boolean }
      | undefined;
  const canEditHelpContent =
    helpUpdatePermission === true ||
    (typeof helpUpdatePermission === "object" &&
      helpUpdatePermission !== null &&
      "permission" in helpUpdatePermission &&
      Boolean(helpUpdatePermission.permission));
  const announcementsCreatePermission =
    authResult.permissions?.collections?.announcements?.create as
      | true
      | { permission?: boolean }
      | undefined;
  const announcementsUpdatePermission =
    authResult.permissions?.collections?.announcements?.update as
      | true
      | { permission?: boolean }
      | undefined;
  const canEditAnnouncements =
    announcementsCreatePermission === true ||
    announcementsUpdatePermission === true ||
    (typeof announcementsCreatePermission === "object" &&
      announcementsCreatePermission !== null &&
      "permission" in announcementsCreatePermission &&
      Boolean(announcementsCreatePermission.permission)) ||
    (typeof announcementsUpdatePermission === "object" &&
      announcementsUpdatePermission !== null &&
      "permission" in announcementsUpdatePermission &&
      Boolean(announcementsUpdatePermission.permission));

  return {
    canEditAnimals,
    canEditAnnouncements,
    canEditHelpContent,
    user: authResult.user,
  };
};
