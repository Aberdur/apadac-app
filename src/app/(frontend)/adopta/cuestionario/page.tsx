import { PreAdoptionQuestionnaireForm } from "@/components/pre-adoption-questionnaire-form";
import { PreAdoptionQuestionnaireOverview } from "@/components/pre-adoption-questionnaire-overview";
import { getAdoptionGuidePage } from "@/lib/adoption-guides";
import { getLocale } from "@/lib/i18n-server";

export const metadata = {
  title: "Cuestionario pre adopción",
};

export default async function PreAdoptionFormInfoPage() {
  const locale = await getLocale();

  return (
    <div className="space-y-8">
      <PreAdoptionQuestionnaireOverview content={getAdoptionGuidePage("cuestionario", locale)} />
      <PreAdoptionQuestionnaireForm locale={locale} />
    </div>
  );
}
