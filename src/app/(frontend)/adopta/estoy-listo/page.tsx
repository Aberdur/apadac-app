import { AdoptionReadinessPage } from "@/components/adoption-readiness-page";
import { getAdoptionGuidePage } from "@/lib/adoption-guides";
import { getLocale } from "@/lib/i18n-server";

export const metadata = {
  title: "Estoy listo para adoptar",
};

export default async function ReadyToAdoptPage() {
  const locale = await getLocale();

  return <AdoptionReadinessPage content={getAdoptionGuidePage("estoy-listo", locale)} />;
}
