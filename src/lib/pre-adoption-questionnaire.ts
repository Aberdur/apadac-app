import type { Locale } from "@/lib/i18n";

export type PreAdoptionField = {
  help?: string;
  name: string;
  options?: string[];
  required?: boolean;
  type?: "date" | "email" | "select" | "tel" | "textarea" | "text" | "animal-autocomplete";
  wide?: boolean;
  label: string;
};

export type PreAdoptionSection = {
  description: string;
  fields: PreAdoptionField[];
  title: string;
};

const sectionsEs: PreAdoptionSection[] = [
  {
    title: "Animal elegido",
    description: "Indica el animal que deseas adoptar. Si aún no lo tienes claro, selecciona el tipo.",
    fields: [
      { label: "Nombre del animal elegido", name: "animalName", type: "animal-autocomplete", required: true, wide: true },
      { label: "Tipo de animal", name: "animalType", options: ["Perro", "Gato", "No lo tengo claro todavía"], required: true, type: "select" },
    ],
  },
  {
    title: "Datos de contacto",
    description: "Información básica para comunicarnos contigo.",
    fields: [
      { label: "Nombre y Apellidos", name: "fullName", required: true, wide: true },
      { label: "Email", name: "email", required: true, type: "email" },
      { label: "Teléfono", name: "phone", required: true, type: "tel" },
      { label: "Localidad y Provincia", name: "city", required: true, wide: true },
    ],
  },
  {
    title: "Vivienda y Entorno",
    description: "Datos sobre el hogar donde vivirá el animal.",
    fields: [
      {
        label: "Tipo de vivienda",
        name: "housingType",
        options: ["Casa con jardín", "Piso con balcón/terraza", "Piso sin balcón", "Entorno rural", "Otro"],
        required: true,
        type: "select",
      },
      {
        label: "Situación de la vivienda",
        name: "housingStatus",
        options: ["Propiedad", "Alquiler (tengo permiso del propietario)", "Alquiler (no tengo permiso o no lo sé)"],
        required: true,
        type: "select",
      },
      { label: "¿Convives con niños u otros animales? (Detalla edades o especies)", name: "familyAndAnimals", required: true, type: "textarea", wide: true },
    ],
  },
  {
    title: "Estilo de vida y Compromiso",
    description: "Evaluación de la rutina diaria y las responsabilidades de la adopción.",
    fields: [
      { label: "¿Cuántas horas al día pasaría el animal completamente solo?", name: "hoursAlone", required: true },
      {
        label: "¿Estás dispuesto a asumir los gastos veterinarios y de alimentación durante los próximos 10-15 años?",
        name: "financialCommitment",
        options: ["Sí", "No", "Necesito más información"],
        required: true,
        type: "select",
      },
      { label: "¿Por qué has decidido adoptar?", name: "adoptionReason", required: true, type: "textarea", wide: true },
    ],
  },
];

const sectionsEn: PreAdoptionSection[] = [
  {
    title: "Chosen animal",
    description: "Indicate the animal you wish to adopt. If you are not sure yet, select the type.",
    fields: [
      { label: "Name of the chosen animal", name: "animalName", type: "animal-autocomplete", required: true, wide: true },
      { label: "Type of animal", name: "animalType", options: ["Dog", "Cat", "I am not sure yet"], required: true, type: "select" },
    ],
  },
  {
    title: "Contact details",
    description: "Basic information so we can contact you.",
    fields: [
      { label: "Full Name", name: "fullName", required: true, wide: true },
      { label: "Email", name: "email", required: true, type: "email" },
      { label: "Phone", name: "phone", required: true, type: "tel" },
      { label: "City and Province", name: "city", required: true, wide: true },
    ],
  },
  {
    title: "Housing and Environment",
    description: "Details about the home where the animal will live.",
    fields: [
      {
        label: "Type of housing",
        name: "housingType",
        options: ["House with garden", "Apartment with balcony/terrace", "Apartment without balcony", "Rural environment", "Other"],
        required: true,
        type: "select",
      },
      {
        label: "Housing status",
        name: "housingStatus",
        options: ["Owned", "Rented (with landlord's permission)", "Rented (no permission or don't know)"],
        required: true,
        type: "select",
      },
      { label: "Do you live with children or other animals? (Please specify ages and species)", name: "familyAndAnimals", required: true, type: "textarea", wide: true },
    ],
  },
  {
    title: "Lifestyle and Commitment",
    description: "Assessment of your daily routine and adoption responsibilities.",
    fields: [
      { label: "How many hours a day would the animal spend completely alone?", name: "hoursAlone", required: true },
      {
        label: "Are you willing to cover veterinary and food expenses for the next 10-15 years?",
        name: "financialCommitment",
        options: ["Yes", "No", "I need more information"],
        required: true,
        type: "select",
      },
      { label: "Why have you decided to adopt?", name: "adoptionReason", required: true, type: "textarea", wide: true },
    ],
  },
];

const sectionsDe: PreAdoptionSection[] = [
  {
    title: "Ausgewähltes Tier",
    description: "Gib das Tier an, das du adoptieren möchtest. Wenn du dir noch nicht sicher bist, wähle die Tierart.",
    fields: [
      { label: "Name des ausgewählten Tiers", name: "animalName", type: "animal-autocomplete", required: true, wide: true },
      { label: "Tierart", name: "animalType", options: ["Hund", "Katze", "Ich bin mir noch nicht sicher"], required: true, type: "select" },
    ],
  },
  {
    title: "Kontaktdaten",
    description: "Grundlegende Informationen, um dich kontaktieren zu können.",
    fields: [
      { label: "Vor- und Nachname", name: "fullName", required: true, wide: true },
      { label: "E-Mail", name: "email", required: true, type: "email" },
      { label: "Telefon", name: "phone", required: true, type: "tel" },
      { label: "Stadt und Provinz", name: "city", required: true, wide: true },
    ],
  },
  {
    title: "Wohnsituation und Umgebung",
    description: "Details zum Zuhause, in dem das Tier leben wird.",
    fields: [
      {
        label: "Wohnart",
        name: "housingType",
        options: ["Haus mit Garten", "Wohnung mit Balkon/Terrasse", "Wohnung ohne Balkon", "Ländliche Umgebung", "Andere"],
        required: true,
        type: "select",
      },
      {
        label: "Wohnsituation",
        name: "housingStatus",
        options: ["Eigentum", "Gemietet (mit Erlaubnis des Vermieters)", "Gemietet (keine Erlaubnis oder weiß nicht)"],
        required: true,
        type: "select",
      },
      { label: "Lebst du mit Kindern oder anderen Tieren zusammen? (Bitte Alter und Art angeben)", name: "familyAndAnimals", required: true, type: "textarea", wide: true },
    ],
  },
  {
    title: "Lebensstil und Verantwortung",
    description: "Einschätzung des Alltags und der Adoptionsverantwortung.",
    fields: [
      { label: "Wie viele Stunden am Tag wäre das Tier komplett allein?", name: "hoursAlone", required: true },
      {
        label: "Bist du bereit, die Tierarzt- und Futterkosten für die nächsten 10-15 Jahre zu übernehmen?",
        name: "financialCommitment",
        options: ["Ja", "Nein", "Ich benötige weitere Informationen"],
        required: true,
        type: "select",
      },
      { label: "Warum hast du dich für eine Adoption entschieden?", name: "adoptionReason", required: true, type: "textarea", wide: true },
    ],
  },
];

export const preAdoptionQuestionnaireSectionsByLocale: Record<Locale, PreAdoptionSection[]> = {
  es: sectionsEs,
  en: sectionsEn,
  de: sectionsDe,
};

export const getPreAdoptionQuestionnaireSections = (locale: Locale) =>
  preAdoptionQuestionnaireSectionsByLocale[locale];

export const getPreAdoptionQuestionnaireFields = (locale: Locale) =>
  getPreAdoptionQuestionnaireSections(locale).flatMap((section) => section.fields);

// Fallbacks statiques conservés pour assurer la compatibilité avec ta route API POST
export const preAdoptionQuestionnaireSections: PreAdoptionSection[] = sectionsEs;
export const preAdoptionQuestionnaireFields = preAdoptionQuestionnaireSections.flatMap(
  (section) => section.fields,
);