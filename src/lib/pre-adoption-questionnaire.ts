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

export const preAdoptionQuestionnaireSections: PreAdoptionSection[] = [
  {
    title: "Animal elegido",
    description: "Indica el animal que deseas adoptar. Si aún no lo tienes claro, selecciona el tipo.",
    fields: [
      {
        label: "Nombre del animal elegido",
        name: "animalName",
        type: "animal-autocomplete",
        required: true,
        wide: true,
      },
      {
        label: "Tipo de animal",
        name: "animalType",
        options: ["Perro", "Gato", "No lo tengo claro todavía"],
        required: true,
        type: "select",
      },
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
      {
        label: "¿Convives con niños u otros animales? (Detalla edades o especies)",
        name: "familyAndAnimals",
        required: true,
        type: "textarea",
        wide: true,
      },
    ],
  },
  {
    title: "Estilo de vida y Compromiso",
    description: "Evaluación de la rutina diaria y las responsabilidades de la adopción.",
    fields: [
      {
        label: "¿Cuántas horas al día pasaría el animal completamente solo?",
        name: "hoursAlone",
        required: true,
      },
      {
        label: "¿Estás dispuesto a asumir los gastos veterinarios y de alimentación durante los próximos 10-15 años?",
        name: "financialCommitment",
        options: ["Sí", "No", "Necesito más información"],
        required: true,
        type: "select",
      },
      {
        label: "¿Por qué has decidido adoptar?",
        name: "adoptionReason",
        required: true,
        type: "textarea",
        wide: true,
      },
    ],
  },
];

export const preAdoptionQuestionnaireFields = preAdoptionQuestionnaireSections.flatMap(
  (section) => section.fields,
);