import type { Locale } from "@/lib/i18n";

export type AdoptionGuideItem = {
  body: string;
  highlight?: string;
  title: string;
};

export type AdoptionGuidePage = {
  ctaHref: string;
  ctaLabel: string;
  eyebrow: string;
  featured?: {
    body: string;
    items: string[];
    title: string;
  };
  intro: string;
  items: AdoptionGuideItem[];
  secondaryHref?: string;
  secondaryLabel?: string;
  title: string;
};

export const adoptionGuideNavByLocale: Record<
  Locale,
  Array<{ href: string; label: string }>
> = {
  de: [
    { href: "/adopta", label: "Tiere zur Adoption" },
    { href: "/adopta/estoy-listo", label: "Bin ich bereit?" },
    { href: "/adopta/proceso", label: "Ablauf der Adoption" },
    { href: "/adopta/cuestionario", label: "Voranfrage" },
  ],
  en: [
    { href: "/adopta", label: "Animals for adoption" },
    { href: "/adopta/estoy-listo", label: "Am I ready?" },
    { href: "/adopta/proceso", label: "Adoption process" },
    { href: "/adopta/cuestionario", label: "Pre-adoption form" },
  ],
  es: [
    { href: "/adopta", label: "Animales en adopción" },
    { href: "/adopta/estoy-listo", label: "¿Estoy listo para adoptar?" },
    { href: "/adopta/proceso", label: "Proceso de adopción" },
    { href: "/adopta/cuestionario", label: "Cuestionario pre adopción" },
  ],
};

export const getAdoptionGuideNav = (locale: Locale) => adoptionGuideNavByLocale[locale];

export const adoptionGuidePages: Record<
  "cuestionario" | "estoy-listo" | "proceso",
  Record<Locale, AdoptionGuidePage>
> = {
  cuestionario: {
    de: {
      ctaHref: "/adopta",
      ctaLabel: "Tier auswählen",
      eyebrow: "Voranfrage",
      intro:
        "Der Fragebogen hilft dem Team, die Familie, den Alltag und das zukünftige Zuhause kennenzulernen.",
      items: [
        {
          title: "Warum wir fragen",
          body: "Nicht jedes Tier passt zu jedem Haushalt. Die Antworten helfen, ehrlich und verantwortungsvoll zu beraten.",
        },
        {
          title: "Was abgefragt wird",
          body: "Kontakt, Wohnsituation, Familie, Arbeitszeiten, Erfahrung mit Tieren, andere Tiere im Haushalt, Kostenbewusstsein und Erwartungen.",
        },
        {
          title: "Wie es jetzt funktioniert",
          body: "Du kannst die Anfrage direkt über das Formular in der Tierakte senden. APADAC erhält die Informationen per E-Mail und meldet sich bei dir.",
        },
      ],
      secondaryHref: "/adopta/proceso",
      secondaryLabel: "Ablauf ansehen",
      title: "Fragebogen vor der Adoption",
    },
    en: {
      ctaHref: "/adopta",
      ctaLabel: "Choose an animal",
      eyebrow: "Pre-adoption form",
      intro:
        "The form helps the team understand your household, routines and the future home you can offer.",
      items: [
        {
          title: "Why we ask",
          body: "Not every animal fits every lifestyle. Your answers help APADAC advise responsibly.",
        },
        {
          title: "What we ask about",
          body: "Contact details, housing, family, work schedule, previous experience, other animals, cost awareness and expectations.",
        },
        {
          title: "How it works now",
          body: "You can send the request directly from an animal profile. APADAC receives it by email and will contact you.",
        },
      ],
      secondaryHref: "/adopta/proceso",
      secondaryLabel: "See process",
      title: "Pre-adoption questionnaire",
    },
    es: {
      ctaHref: "#formulario",
      ctaLabel: "Rellenar cuestionario",
      eyebrow: "Cuestionario pre adopción",
      intro:
        "El cuestionario ayuda al equipo a conocer mejor a la persona interesada, su unidad familiar, su rutina y el hogar que puede ofrecer antes de avanzar con una adopción.",
      featured: {
        title: "Un paso previo para adoptar con responsabilidad",
        body: "No es un trámite para complicar el proceso. Es la forma de entender si el animal elegido encaja con la realidad de la familia y de detectar dudas importantes antes de que la adopción avance.",
        items: [
          "Datos personales y de vivienda",
          "Rutina, trabajo y vacaciones",
          "Experiencia y convivencia",
          "Compromiso veterinario y seguimiento",
        ],
      },
      items: [
        {
          title: "Por qué lo pedimos",
          body: "No todos los animales encajan con todos los estilos de vida. Las respuestas permiten asesorar con honestidad y responsabilidad, y ayudan a evitar adopciones impulsivas o incompatibles.",
        },
        {
          title: "Qué información recoge",
          body: "Incluye datos de contacto, vivienda, familia, horarios, vacaciones, experiencia previa, otros animales, capacidad para asumir gastos, expectativas de convivencia, opinión sobre la esterilización y seguimiento.",
        },
        {
          title: "Dos formularios distintos",
          body: "Este cuestionario es general y está pensado como paso previo. La ficha de cada animal puede tener además una solicitud más corta para pedir información concreta sobre ese perro o gato.",
        },
      ],
      secondaryHref: "/adopta/proceso",
      secondaryLabel: "Ver proceso",
      title: "Cuestionario pre adopción",
    },
  },
  "estoy-listo": {
    de: {
      ctaHref: "/adopta/proceso",
      ctaLabel: "Ablauf ansehen",
      eyebrow: "Verantwortungsvoll adoptieren",
      intro:
        "Eine Adoption ist eine Entscheidung für viele Jahre. Diese Fragen helfen, ehrlich zu prüfen, ob jetzt der richtige Moment ist.",
      items: [
        {
          title: "Warum möchte ich adoptieren?",
          body: "Ein Tier ist kein Geschenk, kein Spielzeug und keine Alarmanlage. Es wird Teil deiner Familie.",
        },
        {
          title: "Ist die ganze Familie einverstanden?",
          body: "Alle Personen im Haushalt sollten die Entscheidung teilen und Verantwortung übernehmen.",
        },
        {
          title: "Habe ich Zeit und Stabilität?",
          body: "Denke an Arbeit, Reisen, Umzüge, Familienplanung und die nächsten 10 bis 20 Jahre.",
        },
        {
          title: "Kann ich Kosten und Notfälle tragen?",
          body: "Futter, Tierarzt, Medikamente und unvorhergesehene Situationen müssen realistisch eingeplant werden.",
        },
      ],
      secondaryHref: "/adopta",
      secondaryLabel: "Tiere ansehen",
      title: "Bin ich bereit für eine Adoption?",
    },
    en: {
      ctaHref: "/adopta/proceso",
      ctaLabel: "See process",
      eyebrow: "Responsible adoption",
      intro:
        "Adoption is a long-term decision. These questions help you honestly check whether now is the right moment.",
      items: [
        {
          title: "Why do I want to adopt?",
          body: "An animal is not a gift, a toy or an alarm system. They become part of your family.",
        },
        {
          title: "Is everyone at home aligned?",
          body: "Every person in the household should agree with the decision and share responsibility.",
        },
        {
          title: "Do I have time and stability?",
          body: "Think about work, travel, moving, family plans and the next 10 to 20 years.",
        },
        {
          title: "Can I handle costs and emergencies?",
          body: "Food, vet care, medication and unexpected situations must be considered realistically.",
        },
      ],
      secondaryHref: "/adopta",
      secondaryLabel: "See animals",
      title: "Am I ready to adopt?",
    },
    es: {
      ctaHref: "/adopta/proceso",
      ctaLabel: "Ver proceso de adopción",
      eyebrow: "Adopta con responsabilidad",
      featured: {
        body: "Si dudas en varias de estas preguntas, no significa que no puedas ayudar. Quizá ahora sea mejor colaborar como voluntario, casa de acogida, difusión o donación hasta que llegue el momento adecuado para adoptar.",
        items: [
          "Compromiso durante toda su vida",
          "Tiempo real cada día",
          "Gastos veterinarios e imprevistos",
          "Toda la familia implicada",
        ],
        title: "Lo esencial antes de decidir",
      },
      intro:
        "Antes de adoptar a un perro o a un gato, debes valorar con calma si estás preparado para asumir un compromiso real durante toda su vida. No se trata solo de firmar un contrato: serás su cuidador, su familia y su principal responsable.",
      items: [
        {
          highlight: "Motivación",
          title: "¿Por qué quiero adoptar?",
          body: "Parece una pregunta fácil, pero no lo es. Adoptar no debe responder a un impulso ni a una idea superficial. Un animal no es un juguete, no es una alarma para proteger la casa y no debería llegar para cubrir una necesidad puntual. Cuando un perro o un gato entra en tu hogar con responsabilidad, aporta compañía, vínculo y aprendizaje, pero también necesita seguridad, atención y cuidados constantes.",
        },
        {
          highlight: "Infancia",
          title: "Si hay niños, ¿entienden lo que implica?",
          body: "Muchos niños muestran interés por tener un perro o un gato, y convivir con animales puede enseñar responsabilidad, disciplina y empatía. Pero la decisión final no puede recaer solo en ellos. La familia adulta debe asegurarse de que se entiende lo que implica alimentar, pasear, cepillar, curar, educar y acompañar al animal cada día.",
        },
        {
          highlight: "Familia",
          title: "¿Toda la familia asume la responsabilidad?",
          body: "Todos los miembros del hogar deberían estar de acuerdo con la adopción. Si el animal se convierte en un problema por falta de organización o responsabilidades compartidas, devolverlo o buscarle otro hogar le hará daño. Después de conocer el calor de una familia, una devolución puede desestabilizarlo y provocarle una gran tristeza.",
        },
        {
          highlight: "Apoyo",
          title: "Si vivo solo, ¿quién sería su apoyo?",
          body: "Conviene tener claro quién podría hacerse cargo del animal si surge un imprevisto, un viaje de trabajo, unas vacaciones o una situación en la que no puedas atenderlo. Tener una persona de confianza que pueda ayudarte puntualmente evita improvisaciones y protege al animal.",
        },
        {
          highlight: "Futuro",
          title: "¿Cómo me veo en el futuro?",
          body: "Aunque nadie puede preverlo todo, sí debes pensar en tus planes. Si tienes previsto mudarte a otro país, cambiar de trabajo, viajar durante largos periodos o atravesar una etapa muy inestable, quizá sea mejor esperar. La vida de un perro puede llegar a 15 años o más, y la de un gato puede alcanzar los 20 años. No es una decisión a corto plazo.",
        },
        {
          highlight: "Economía",
          title: "¿Tengo estabilidad económica suficiente?",
          body: "No se trata de tener riqueza, pero sí de saber que un animal genera gastos reales. Alimentación, vacunas, desparasitación, revisiones, medicación, esterilización y posibles urgencias veterinarias forman parte de la responsabilidad. Si piensas que un perro o un gato se cría solo, es mejor detenerse y reflexionar.",
        },
        {
          highlight: "Veterinario",
          title: "¿Asumiré gastos veterinarios necesarios o urgentes?",
          body: "Los animales pueden necesitar atención veterinaria puntual o habitual. También pueden aparecer accidentes, enfermedades o tratamientos no previstos. Antes de adoptar, debes saber si podrías afrontar esos gastos o valorar opciones como seguros veterinarios que ayuden a cubrir parte de la asistencia.",
        },
        {
          highlight: "Convivencia",
          title: "¿Tengo espacio y tiempo adecuados?",
          body: "No hace falta vivir en un palacio ni tener un gran jardín, pero el animal necesita formar parte de la vida familiar. Relegarlo a un balcón, terraza, jardín o una zona aislada de la casa porque molesta el pelo o la convivencia no es una adopción responsable. Lo importante es conocer sus necesidades y si encajan con tus horarios y hábitos.",
        },
        {
          highlight: "Tiempo",
          title: "¿Cuánto tiempo estará solo?",
          body: "Si pasas 10 o 12 horas fuera de casa cada día y no puedes ofrecer compañía, paseos, atención y vínculo, quizá no sea el momento de adoptar. Existen otras formas de ayudar, como ser voluntario, colaborar con difusión o apoyar económicamente a la protectora.",
        },
        {
          highlight: "Compromiso",
          title: "¿Estoy preparado para acompañarlo hasta el final?",
          body: "Adoptar implica estar presente en la salud y en la enfermedad, en los días fáciles y en los difíciles. No podrán acompañarnos toda nuestra vida, pero durante la suya dependerán de nosotros. Al adoptar estás dando una oportunidad a un animal y, al mismo tiempo, dejando espacio para que otro pueda ser rescatado.",
        },
      ],
      secondaryHref: "/adopta",
      secondaryLabel: "Ver animales",
      title: "¿Estoy listo para adoptar?",
    },
  },
  proceso: {
    de: {
      ctaHref: "/adopta",
      ctaLabel: "Tiere ansehen",
      eyebrow: "Ablauf",
      intro:
        "Der Prozess hilft, die passende Familie für jedes Tier zu finden und eine sichere Adoption vorzubereiten.",
      items: [
        { title: "1. Erster Kontakt", body: "Sag uns, welches Tier dich interessiert oder welche Art Begleiter du suchst." },
        { title: "2. Voranfrage", body: "Der Fragebogen hilft, Alltag, Zuhause und Erwartungen kennenzulernen." },
        { title: "3. Bewertung des Zuhauses", body: "Wenn nötig, wird geprüft, ob Umgebung und Sicherheit passen." },
        { title: "4. Kennenlernen", body: "Idealerweise lernst du das Tier vor der Adoption persönlich kennen." },
        { title: "5. Vertrag und Unterlagen", body: "DNI oder Pass, Vertrag, Chip-Änderung und EU-Heimtierausweis." },
        { title: "6. Nachbetreuung", body: "APADAC freut sich über Nachrichten und kann bei Bedarf nachfassen." },
      ],
      secondaryHref: "/adopta/cuestionario",
      secondaryLabel: "Fragebogen ansehen",
      title: "Wie läuft eine Adoption ab?",
    },
    en: {
      ctaHref: "/adopta",
      ctaLabel: "See animals",
      eyebrow: "Process",
      intro:
        "The process helps find the right family for each animal and prepare a safe adoption.",
      items: [
        { title: "1. First contact", body: "Tell us which animal you are interested in or what kind of companion you are looking for." },
        { title: "2. Pre-adoption form", body: "The questionnaire helps us understand your routine, home and expectations." },
        { title: "3. Home assessment", body: "When needed, APADAC checks that the environment is safe and suitable." },
        { title: "4. Meeting the animal", body: "Ideally, both sides meet before the adoption." },
        { title: "5. Contract and documents", body: "ID/passport, adoption contract, microchip transfer and European passport." },
        { title: "6. Follow-up", body: "APADAC keeps in touch to make sure the family and animal are doing well." },
      ],
      secondaryHref: "/adopta/cuestionario",
      secondaryLabel: "See questionnaire",
      title: "How does the adoption process work?",
    },
    es: {
      ctaHref: "/adopta/cuestionario",
      ctaLabel: "Ver cuestionario",
      eyebrow: "Proceso",
      intro:
        "El proceso de adopción sirve para acompañarte, resolver dudas y confirmar que el animal elegido encaja con tu forma de vida. No se trata de poner obstáculos: se trata de preparar una adopción segura, responsable y duradera.",
      featured: {
        title: "El objetivo es que ambas partes encajen",
        body: "Antes de adoptar conviene reflexionar con calma. APADAC valora la situación de la familia, el hogar, los horarios, la experiencia previa y las necesidades concretas del animal. Si el animal que te gusta no es el más adecuado para tu caso, el equipo puede orientarte hacia otro compañero que encaje mejor.",
        items: [
          "Cuestionario antes de visitar",
          "Asesoramiento individual",
          "Primer contacto con el animal",
          "Contrato, documentación y seguimiento",
        ],
      },
      items: [
        {
          highlight: "Inicio",
          title: "Primer contacto",
          body: "Puedes escribir a APADAC si ya has visto un animal en la web o en redes sociales, o si simplemente sabes qué tipo de compañero estás buscando. El equipo te dirá si ese animal puede adaptarse a tu estilo de vida y, si no es así, te propondrá otras opciones más adecuadas para tu familia y para el bienestar del animal.",
        },
        {
          highlight: "Imprescindible",
          title: "Cuestionario de adopción",
          body: "Antes de visitar la protectora es necesario completar el cuestionario pre adopción. Sirve para conocer mejor a la persona interesada, su unidad familiar, su vivienda, sus horarios, su experiencia con animales y las expectativas de convivencia. Con esa información, los voluntarios pueden asesorar con más criterio.",
        },
        {
          highlight: "Reflexión",
          title: "Valorar si es el momento",
          body: "Adoptar implica un compromiso que va mucho más allá de firmar un contrato. Hay que pensar en el tiempo disponible, la estabilidad familiar, los gastos veterinarios, los posibles cambios de vivienda o trabajo y la responsabilidad de cuidar al animal durante toda su vida.",
        },
        {
          highlight: "Hogar",
          title: "Visita o valoración del domicilio",
          body: "Si APADAC considera que puedes hacerte cargo del animal, puede ser necesaria una visita al hogar. El objetivo es comprobar que el entorno tiene el tamaño, las características y la seguridad adecuadas para el animal que se quiere adoptar.",
        },
        {
          highlight: "Encuentro",
          title: "Visita a la protectora",
          body: "Lo ideal es conocer al futuro miembro de la familia antes de la adopción. Ese primer contacto permite observar las sensaciones por ambas partes, resolver dudas y confirmar si existe una buena conexión. En algunos casos, por distancia, esta visita puede no ser posible.",
        },
        {
          highlight: "Distancia",
          title: "Adopciones fuera del municipio",
          body: "Vivir fuera de Callosa, de Alicante o incluso de la provincia no impide adoptar si el hogar es adecuado. Cuando hace falta valorar una vivienda lejana, APADAC puede apoyarse en voluntarios de otras zonas. Si se usa transporte autorizado de animales, ese coste no está incluido en la adopción y lo asume la familia adoptante.",
        },
        {
          highlight: "Documentos",
          title: "Contrato, DNI y pasaporte",
          body: "En el momento de la adopción hay que aportar DNI o pasaporte para firmar el contrato y tramitar el cambio de titularidad del microchip. APADAC entrega el pasaporte europeo del animal con la información disponible: vacunas, desparasitaciones, fecha aproximada de nacimiento, raza, sexo y número de microchip.",
        },
        {
          highlight: "Después",
          title: "Seguimiento post adopción",
          body: "La adopción no termina al salir de la protectora. APADAC agradece recibir noticias, fotos y vídeos durante la vida del animal, y puede hacer seguimiento telefónico o presencial si es necesario. La finalidad es asegurarse de que la adaptación funciona y poder ayudar si surge algún problema.",
        },
      ],
      secondaryHref: "/como-ayudar#contacto",
      secondaryLabel: "Consultar con APADAC",
      title: "¿Cómo funciona el proceso de adopción?",
    },
  },
};

export const getAdoptionGuidePage = (
  slug: keyof typeof adoptionGuidePages,
  locale: Locale,
) => adoptionGuidePages[slug][locale];
