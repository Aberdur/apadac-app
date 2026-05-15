import { ApadacAboutSection } from "@/components/apadac-about-section";
import { getApadacInfo } from "@/lib/apadac-info";
import { getLocale } from "@/lib/i18n-server";

export const metadata = {
  title: "APADAC",
};

export default async function ApadacPage() {
  const locale = await getLocale();

  return <ApadacAboutSection content={getApadacInfo(locale)} />;
}
