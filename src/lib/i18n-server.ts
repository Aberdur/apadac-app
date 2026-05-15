import { cookies } from "next/headers";

import { getLocaleFromValue } from "@/lib/i18n";

export const getLocale = async () => {
  const cookieStore = await cookies();

  return getLocaleFromValue(cookieStore.get("apadac-locale")?.value);
};
