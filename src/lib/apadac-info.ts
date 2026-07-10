import type { Locale } from "@/lib/i18n";

export type ApadacInfoContent = {
  cta: string;
  intro: string;
  missionCards: Array<{
    body: string;
    title: string;
  }>;
  quote: string;
  stats: Array<{
    label: string;
    value: string;
  }>;
  subtitle: string;
  title: string;
};

const es: ApadacInfoContent = {
  cta: "Conocer cómo ayudar",
  intro:
    "En 2010, un grupo de voluntarios inició esta durísima pero enriquecedora aventura para ayudar a los animales abandonados de Callosa de Segura.",
  missionCards: [
    {
      title: "Rescate y protección",
      body: "APADAC trabaja para ayudar a los animales que son abandonados en la localidad, poner fin a su sufrimiento y evitarles una muerte segura.",
    },
    {
      title: "Concienciación",
      body: "La labor no se limita al rescate: también busca educar a la población, incluidos niños, para prevenir el abandono y fomentar el respeto animal.",
    },
    {
      title: "Esterilización responsable",
      body: "La asociación insiste en evitar la sobrepoblación animal mediante la esterilización o castración responsable de perros y gatos.",
    },
    {
      title: "Adopción como alternativa",
      body: "APADAC promueve la adopción responsable como primera alternativa para acabar con el sufrimiento de los animales más indefensos.",
    },
    {
      title: "Educación y campañas",
      body: "Siempre que la situación lo permite, realiza campañas de sensibilización, ferias y charlas en centros educativos.",
    },
    {
      title: "Voluntariado",
      body: "Es una asociación sin ánimo de lucro formada y gestionada por voluntarios. Toda ayuda, del tipo que sea, suma.",
    },
  ],
  quote: "Si pasas tiempo con los animales, corres el riesgo de volverte una mejor persona.",
  stats: [
    { label: "Animales adoptados", value: "640+" },
    { label: "Animales rescatados", value: "122+" },
    { label: "Animales recuperados", value: "34" },
    { label: "Voluntarios", value: "16" },
  ],
  subtitle:
    "Asociación protectora de animales domésticos abandonados de Callosa de Segura.",
  title: "Quiénes somos",
};

const en: ApadacInfoContent = {
  cta: "Learn how to help",
  intro:
    "In 2010, a group of volunteers embarked on this incredibly challenging yet rewarding journey to help the abandoned animals of Callosa de Segura.",
  missionCards: [
    {
      title: "Rescue and protection",
      body: "APADAC works to help abandoned animals in the area, putting an end to their suffering and saving them from a certain death.",
    },
    {
      title: "Awareness",
      body: "Our work goes beyond rescuing: we also strive to educate the public, including children, to prevent animal abandonment and foster respect for all living beings.",
    },
    {
      title: "Responsible neutering",
      body: "The association emphasizes preventing animal overpopulation through the responsible spaying and neutering of dogs and cats.",
    },
    {
      title: "Adoption as the primary solution",
      body: "APADAC promotes responsible adoption as the first and best alternative to end the suffering of the most defenseless animals.",
    },
    {
      title: "Education and campaigns",
      body: "Whenever resources allow, we organize awareness campaigns, charity fairs, and educational talks in schools.",
    },
    {
      title: "Volunteering",
      body: "We are a non-profit association run entirely by volunteers. Every form of help, no matter how small, makes a real difference.",
    },
  ],
  quote: "If you spend time with animals, you run the risk of becoming a better person.",
  stats: [
    { label: "Adopted animals", value: "640+" },
    { label: "Rescued animals", value: "122+" },
    { label: "Reunited with families", value: "34" },
    { label: "Volunteers", value: "16" },
  ],
  subtitle:
    "Association for the protection of abandoned domestic animals in Callosa de Segura.",
  title: "About us",
};

export const apadacInfoByLocale: Record<Locale, ApadacInfoContent> = {
  de: es,
  en,
  es,
};

export const getApadacInfo = (locale: Locale) => apadacInfoByLocale[locale];