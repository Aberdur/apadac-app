import { AdoptionProcessTimeline } from "@/components/adoption-process-timeline";
import { getAdoptionGuidePage } from "@/lib/adoption-guides";
import { getLocale } from "@/lib/i18n-server";

export const metadata = {
  title: "Proceso de adopción",
};

export default async function AdoptionProcessPage() {
  const locale = await getLocale();

  return <AdoptionProcessTimeline content={getAdoptionGuidePage("proceso", locale)} />;
}
