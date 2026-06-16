import { PreAdoptionQuestionnaireForm } from "@/components/pre-adoption-questionnaire-form";
import { PreAdoptionQuestionnaireOverview } from "@/components/pre-adoption-questionnaire-overview";
import { getAdoptionGuidePage } from "@/lib/adoption-guides";
import { getLocale } from "@/lib/i18n-server";
import { getCMS } from "@/lib/payload";

export const metadata = {
  title: "Cuestionario pre adopción",
};

export default async function PreAdoptionFormInfoPage() {
  const locale = await getLocale();
  const payload = await getCMS();
  
  let animalNames: string[] = [];
  try {
    const animalsData = await payload.find({
      collection: "animals",
      limit: 300,
      depth: 0,
      select: { name: true },
    });
    
    animalNames = animalsData.docs.map((doc) => doc.name).filter(Boolean);
  } catch (error) {
    console.error("Impossible de récupérer la liste des animaux", error);
  }

  return (
    <div className="space-y-8">
      <PreAdoptionQuestionnaireOverview content={getAdoptionGuidePage("cuestionario", locale)} />
      <PreAdoptionQuestionnaireForm locale={locale} animals={animalNames} />
    </div>
  );
}