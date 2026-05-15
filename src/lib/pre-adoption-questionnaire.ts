export type PreAdoptionField = {
  help?: string;
  name: string;
  options?: string[];
  required?: boolean;
  type?: "date" | "email" | "select" | "tel" | "textarea" | "text";
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
    description:
      "Si ya tienes un animal en mente, indícalo. Si todavía no lo tienes claro, esta información ayudará a orientar mejor la adopción.",
    fields: [
      {
        label: "Nombre del animal elegido",
        name: "animalName",
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
    title: "Datos personales",
    description:
      "Datos básicos para poder contactar contigo y preparar correctamente la documentación si el proceso avanza.",
    fields: [
      { label: "Nombre", name: "firstName", required: true },
      { label: "Apellidos", name: "lastName", required: true },
      { label: "DNI / NIE / Pasaporte", name: "documentId", required: true },
      { label: "Fecha de nacimiento", name: "birthDate", required: true, type: "date" },
      { label: "Email", name: "email", required: true, type: "email" },
      { label: "Teléfono", name: "phone", required: true, type: "tel" },
      { label: "Dirección", name: "address", required: true, wide: true },
      { label: "Localidad", name: "city", required: true },
      { label: "Provincia", name: "province", required: true },
    ],
  },
  {
    title: "Vivienda",
    description:
      "El entorno debe ser seguro y compatible con las necesidades del animal, especialmente si hay jardín, alquiler o posibilidad de mudanza.",
    fields: [
      {
        label: "Vivienda",
        name: "housingStatus",
        options: ["Alquiler", "Propiedad", "Vivienda familiar", "Otra situación"],
        required: true,
        type: "select",
      },
      {
        label: "Tipo de vivienda",
        name: "housingType",
        options: ["Casa", "Piso", "Casa con terreno", "Entorno rural", "Otro"],
        required: true,
        type: "select",
      },
      { label: "Metros aproximados de la vivienda", name: "homeMeters", required: true },
      {
        label: "Si es de alquiler, ¿el propietario está conforme?",
        name: "landlordPermission",
        options: ["Sí", "No", "No aplica", "Pendiente de confirmar"],
        required: true,
        type: "select",
      },
      {
        label: "¿Tiene jardín?",
        name: "hasGarden",
        options: ["Sí", "No"],
        required: true,
        type: "select",
      },
      {
        label: "¿El jardín está vallado?",
        name: "gardenFenced",
        options: ["Sí", "No", "No aplica"],
        required: true,
        type: "select",
      },
      {
        label: "¿Existe posibilidad de mudanza en los próximos 10-15 años?",
        name: "movingPossibility",
        options: ["Sí", "No", "No lo sé"],
        required: true,
        type: "select",
      },
      {
        label: "Si hubiera mudanza, ¿qué harías con el animal?",
        name: "movingPlan",
        required: true,
        type: "textarea",
        wide: true,
      },
    ],
  },
  {
    title: "Familia y convivencia",
    description:
      "La adopción debe ser compartida por las personas que conviven en casa y compatible con alergias, menores y planes familiares.",
    fields: [
      {
        label: "¿Vives con más personas?",
        name: "livesWithOthers",
        options: ["Sí", "No"],
        required: true,
        type: "select",
      },
      {
        label: "¿Comparten la decisión de adoptar?",
        name: "sharedDecision",
        options: ["Sí", "No", "No aplica"],
        required: true,
        type: "select",
      },
      {
        label: "¿Hay personas con alergia en la vivienda?",
        name: "allergiesAtHome",
        options: ["Sí", "No", "No lo sé"],
        required: true,
        type: "select",
      },
      {
        label: "¿Qué tipo de alergias?",
        name: "allergiesDetails",
        type: "textarea",
        wide: true,
      },
      {
        label: "¿Tienes niños o menores a tu cargo?",
        name: "childrenAtHome",
        options: ["Sí", "No"],
        required: true,
        type: "select",
      },
      {
        label: "¿Qué edades tienen?",
        name: "childrenAges",
        type: "textarea",
        wide: true,
      },
      {
        label: "¿Existe posibilidad de ampliar la familia en un futuro?",
        name: "futureChildren",
        options: ["Sí", "No", "No lo sé"],
        required: true,
        type: "select",
      },
      {
        label: "¿Sería compatible la llegada de un bebé con la convivencia del animal?",
        name: "babyCompatibility",
        options: ["Sí", "No", "No lo sé", "No aplica"],
        required: true,
        type: "select",
      },
      {
        label: "Explica por qué crees que sería compatible o no",
        name: "babyCompatibilityReason",
        required: true,
        type: "textarea",
        wide: true,
      },
    ],
  },
  {
    title: "Rutina, trabajo y vacaciones",
    description:
      "El objetivo es entender cuánto tiempo real puedes dedicar al animal y cómo se integraría en tu día a día.",
    fields: [
      {
        label: "¿Trabajas actualmente?",
        name: "currentlyWorking",
        options: ["Sí", "No"],
        required: true,
        type: "select",
      },
      {
        label: "Situación laboral",
        name: "workSituation",
        options: ["Fijo", "Eventual", "Autónomo", "Estudiante", "Desempleado", "Jubilado", "Otra"],
        required: true,
        type: "select",
      },
      {
        label: "¿Es compatible tu horario con la dedicación y salidas que necesita el animal?",
        name: "scheduleCompatibility",
        required: true,
        type: "textarea",
        wide: true,
      },
      {
        label: "¿Qué hobbies puedes compartir con tu perro?",
        name: "sharedHobbies",
        type: "textarea",
        wide: true,
      },
      {
        label: "¿Qué sueles hacer en vacaciones? ¿Qué harías con el animal?",
        name: "vacationPlan",
        required: true,
        type: "textarea",
        wide: true,
      },
      {
        label: "Enumera comportamientos que te supongan un problema grave",
        name: "dealBreakers",
        required: true,
        type: "textarea",
        wide: true,
      },
    ],
  },
  {
    title: "Experiencia y otros animales",
    description:
      "La experiencia previa no es obligatoria, pero ayuda a prever necesidades, adaptación y posibles conflictos.",
    fields: [
      {
        label: "¿Has tenido mascotas antes?",
        name: "previousPets",
        options: ["Sí", "No"],
        required: true,
        type: "select",
      },
      {
        label: "Si has tenido, cuéntanos raza, tamaño, cómo murió, si lo cediste o si lo adoptaste",
        name: "previousPetsDetails",
        required: true,
        type: "textarea",
        wide: true,
      },
      {
        label: "¿Tienes otros animales en casa?",
        name: "otherAnimals",
        options: ["Sí", "No"],
        required: true,
        type: "select",
      },
      {
        label: "Si no se llevaran bien, ¿qué solución buscarías?",
        name: "otherAnimalsConflictPlan",
        required: true,
        type: "textarea",
        wide: true,
      },
      {
        label: "¿Habrá alguna parte de la casa a la que el animal no pueda entrar? ¿Cuál y por qué?",
        name: "restrictedAreas",
        required: true,
        type: "textarea",
        wide: true,
      },
      {
        label: "¿Qué harías para solucionar un problema de conducta?",
        name: "behaviorProblemPlan",
        required: true,
        type: "textarea",
        wide: true,
      },
      {
        label: "¿Qué harías si se sube al sofá?",
        name: "sofaReaction",
        required: true,
        type: "textarea",
        wide: true,
      },
    ],
  },
  {
    title: "Cuidados diarios",
    description:
      "Estas preguntas ayudan a valorar descanso, paseos, alimentación y capacidad para asumir gastos habituales o imprevistos.",
    fields: [
      {
        label: "¿Qué lugar de la vivienda estaría destinado para el animal?",
        name: "animalPlace",
        required: true,
        type: "textarea",
        wide: true,
      },
      {
        label: "¿Dónde dormiría el animal?",
        name: "sleepingPlace",
        required: true,
        type: "textarea",
        wide: true,
      },
      {
        label: "¿Cuántas veces al día y durante cuánto tiempo lo sacarías de paseo?",
        name: "walkFrequency",
        required: true,
        type: "textarea",
        wide: true,
      },
      {
        label: "¿Por dónde lo pasearías habitualmente?",
        name: "walkPlaces",
        options: ["Calle", "Campo", "Parque", "Playa", "Varias zonas", "No aplica"],
        required: true,
        type: "select",
      },
      {
        label: "¿Puedes afrontar los gastos mensuales de tener un animal?",
        name: "monthlyCosts",
        required: true,
        type: "textarea",
        wide: true,
      },
      {
        label: "¿Qué precio medio crees que tiene una consulta veterinaria?",
        name: "vetConsultCost",
        required: true,
      },
      {
        label: "¿Podrías afrontar gastos veterinarios extra por enfermedad u operaciones?",
        name: "extraVetCosts",
        required: true,
        type: "textarea",
        wide: true,
      },
      {
        label: "¿Qué alimentación crees que es la más adecuada: casera, sobras o pienso? ¿Por qué?",
        name: "feedingPlan",
        required: true,
        type: "textarea",
        wide: true,
      },
    ],
  },
  {
    title: "Motivación y tipo de adopción",
    description:
      "APADAC necesita saber por qué quieres adoptar, si será para ti y qué expectativas tienes sobre el animal.",
    fields: [
      {
        label: "¿Cuál es tu opinión sobre los animales de caza? ¿Te gusta la caza?",
        name: "huntingOpinion",
        required: true,
        type: "textarea",
        wide: true,
      },
      {
        label: "La adopción conlleva chip, vacunas, pasaporte y esterilización. ¿Estás dispuesto a asumirlos?",
        name: "acceptAdoptionCosts",
        options: ["Sí", "No", "Necesito más información"],
        required: true,
        type: "select",
      },
      {
        label: "La mascota que adoptes, ¿sería para ti o para regalar?",
        name: "adoptionFor",
        options: ["Propia", "Para otra persona"],
        required: true,
        type: "select",
      },
      {
        label: "Si es para otra persona, indica parentesco y si esa persona es consciente de la llegada del animal",
        name: "giftDetails",
        type: "textarea",
        wide: true,
      },
      {
        label: "¿Por qué has decidido adoptar en lugar de comprar?",
        name: "adoptNotBuyReason",
        required: true,
        type: "textarea",
        wide: true,
      },
      {
        label: "¿Con qué finalidad lo adoptas?",
        name: "adoptionPurpose",
        required: true,
        type: "textarea",
        wide: true,
      },
      {
        label: "¿Tienes pensado adoptar otro animal después de este? ¿Cuál y por qué?",
        name: "futureAdoptionPlan",
        required: true,
        type: "textarea",
        wide: true,
      },
    ],
  },
  {
    title: "Animal adulto, cachorro y expectativas",
    description:
      "Estas respuestas ayudan a comprobar si las expectativas son realistas según edad, tamaño, raza y carácter.",
    fields: [
      {
        label: "Enumera ventajas e inconvenientes de adoptar a un animal adulto",
        name: "adultAnimalProsCons",
        required: true,
        type: "textarea",
        wide: true,
      },
      {
        label: "Enumera ventajas e inconvenientes de adoptar a un animal cachorro",
        name: "puppyProsCons",
        required: true,
        type: "textarea",
        wide: true,
      },
      {
        label: "¿Por qué te has interesado por este animal? ¿Qué te ha gustado de él?",
        name: "chosenAnimalReason",
        required: true,
        type: "textarea",
        wide: true,
      },
      {
        label: "¿Conoces esta raza? ¿Por qué la eliges?",
        name: "breedKnowledge",
        required: true,
        type: "textarea",
        wide: true,
      },
      {
        label: "Si adoptas un cachorro y crece más de la cuenta, ¿sería un problema?",
        name: "puppyGrowthIssue",
        required: true,
        type: "textarea",
        wide: true,
      },
      {
        label: "¿Qué carácter deseas que tenga tu mascota?",
        name: "desiredCharacter",
        required: true,
        type: "textarea",
        wide: true,
      },
    ],
  },
  {
    title: "Protectora, seguimiento y esterilización",
    description:
      "La adopción responsable incluye seguimiento, compromiso veterinario y aceptación de la esterilización cuando corresponda.",
    fields: [
      {
        label: "¿Has visitado alguna vez un refugio?",
        name: "visitedShelter",
        options: ["Sí", "No"],
        required: true,
        type: "select",
      },
      {
        label: "¿Eres socio o voluntario de algún refugio?",
        name: "shelterInvolvement",
        options: ["Socio", "Voluntario", "Socio y voluntario", "No"],
        required: true,
        type: "select",
      },
      {
        label: "¿Harías los seguimientos pre y post adopción?",
        name: "acceptFollowUps",
        options: ["Sí", "No", "Necesito más información"],
        required: true,
        type: "select",
      },
      {
        label: "¿Crees que los seguimientos son necesarios?",
        name: "followUpsOpinion",
        required: true,
        type: "textarea",
        wide: true,
      },
      {
        label: "La esterilización es obligatoria. ¿La harías a la edad recomendada?",
        name: "acceptSterilization",
        options: ["Sí", "No", "Necesito más información"],
        required: true,
        type: "select",
      },
      {
        label: "¿Estás a favor o en contra de la esterilización? ¿Por qué?",
        name: "sterilizationOpinion",
        required: true,
        type: "textarea",
        wide: true,
      },
    ],
  },
  {
    title: "Origen del contacto",
    description:
      "Últimos datos para saber cómo llegaste a APADAC y mejorar el formulario.",
    fields: [
      {
        label: "¿Cómo nos has conocido?",
        name: "howKnown",
        required: true,
        type: "textarea",
        wide: true,
      },
      {
        label: "¿Has contactado con alguno de nuestros voluntarios?",
        name: "volunteerContact",
        type: "textarea",
        wide: true,
      },
      {
        label: "Indícanos si has tenido algún problema al rellenar el formulario",
        name: "formProblems",
        type: "textarea",
        wide: true,
      },
    ],
  },
];

export const preAdoptionQuestionnaireFields = preAdoptionQuestionnaireSections.flatMap(
  (section) => section.fields,
);
