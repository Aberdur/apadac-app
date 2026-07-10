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
  ui?: {
    featuredEyebrow?: string;
    footerEyebrow?: string;
    footerText?: string;
    footerTitle?: string;
    signalsEyebrow?: string;
    signalsTitle?: string;
    phases?: string[];
    phaseLabel?: string;
    timelineEyebrow?: string;
    timelineTitle?: string;
  };
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

/* 
  Définition de l'objet español en premier
*/
const esContent = {
  cuestionario: {
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
        highlight: "Motivo",
        title: "Por qué lo pedimos",
        body: "No todos los animales encajan con todos los estilos de vida. Las respuestas permiten asesorar con honestidad y responsabilidad, y ayudan a evitar adopciones impulsivas o incompatibles.",
      },
      {
        highlight: "Contenido",
        title: "Qué información recoge",
        body: "Incluye datos de contacto, vivienda, familia, horarios, vacaciones, experiencia previa, otros animales, capacidad para asumir gastos, expectativas de convivencia, opinión sobre la esterilización y seguimiento.",
      },
      {
        highlight: "Proceso",
        title: "Dos formularios distintos",
        body: "Este cuestionario es general y está pensado como paso previo. La ficha de cada animal puede tener además una solicitud más corta para pedir información concreta sobre ese perro o gato.",
      },
    ],
    secondaryHref: "/adopta/proceso",
    secondaryLabel: "Ver proceso",
    title: "Cuestionario pre adopción",
  },
  "estoy-listo": {
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
    ui: {
      featuredEyebrow: "Antes de decidir",
      footerEyebrow: "Preguntas incómodas, adopciones mejores",
      footerText:
        "Estas preguntas no buscan desanimar. Buscan que el animal no vuelva a pasar por una devolución, un abandono o una convivencia que nadie preparó bien.",
      footerTitle: "Lee sin prisa",
      signalsEyebrow: "Señales importantes",
      signalsTitle: "Si una respuesta te incomoda, merece la pena pararse",
    },
  },
  proceso: {
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
    ui: {
      phases: ["Primer contacto", "Valoración", "Adopción", "Después"],
      phaseLabel: "Fase",
      timelineEyebrow: "Ruta de adopción",
      timelineTitle: "Qué ocurre desde el primer contacto hasta el seguimiento",
    },
  },
};

export const adoptionGuidePages: Record<
  "cuestionario" | "estoy-listo" | "proceso",
  Record<Locale, AdoptionGuidePage>
> = {
  cuestionario: {
    de: esContent["cuestionario"],
    en: {
      ctaHref: "#formulario",
      ctaLabel: "Fill out questionnaire",
      eyebrow: "Pre-adoption form",
      intro:
        "The questionnaire helps the team get to know you, your household, your routine, and the home you can offer before moving forward with an adoption.",
      featured: {
        title: "A preliminary step for responsible adoption",
        body: "This is not a formality meant to complicate the process. It's our way of understanding if the chosen animal fits the reality of your family, and catching any important doubts before the adoption moves forward.",
        items: [
          "Personal and housing details",
          "Routine, work, and holidays",
          "Experience and living arrangements",
          "Veterinary commitment and follow-up",
        ],
      },
      items: [
        {
          highlight: "Reason",
          title: "Why we ask for it",
          body: "Not every animal fits every lifestyle. Your answers help APADAC advise honestly and responsibly, preventing impulsive or incompatible adoptions.",
        },
        {
          highlight: "Content",
          title: "What information it gathers",
          body: "It includes contact details, housing, family, schedules, holidays, previous experience, other animals, ability to cover expenses, coexistence expectations, views on neutering, and follow-up.",
        },
        {
          highlight: "Process",
          title: "Two different forms",
          body: "This questionnaire is general and meant as a preliminary step. Each animal's profile may also have a shorter request form to ask for specific information about that dog or cat.",
        },
      ],
      secondaryHref: "/adopta/proceso",
      secondaryLabel: "See process",
      title: "Pre-adoption questionnaire",
    },
    es: esContent["cuestionario"],
  },
  "estoy-listo": {
    de: esContent["estoy-listo"],
    en: {
      ctaHref: "/adopta/proceso",
      ctaLabel: "See adoption process",
      eyebrow: "Adopt responsibly",
      featured: {
        body: "If you hesitate on several of these questions, it doesn't mean you can't help. Perhaps right now it is better to collaborate by volunteering, fostering, sharing, or donating until the right moment to adopt arrives.",
        items: [
          "Lifelong commitment",
          "Real time every day",
          "Veterinary and unexpected expenses",
          "The whole family involved",
        ],
        title: "The essentials before deciding",
      },
      intro:
        "Before adopting a dog or a cat, you must calmly assess whether you are prepared to make a real commitment for their entire life. It is not just about signing a contract: you will be their caregiver, their family, and primarily responsible for them.",
      items: [
        {
          highlight: "Motivation",
          title: "Why do I want to adopt?",
          body: "It seems like an easy question, but it isn't. Adopting should not be an impulse or a superficial idea. An animal is not a toy, not an alarm to protect the house, and should not arrive just to fill a temporary need. When a dog or a cat responsibly enters your home, they bring companionship, bonding, and learning, but they also need safety, attention, and constant care.",
        },
        {
          highlight: "Childhood",
          title: "If there are children, do they understand what it implies?",
          body: "Many children show interest in having a dog or a cat, and living with animals can teach responsibility, discipline, and empathy. But the final decision cannot rest solely on them. The adult family must ensure they understand what it means to feed, walk, brush, heal, train, and accompany the animal every day.",
        },
        {
          highlight: "Family",
          title: "Does the whole family take on the responsibility?",
          body: "Everyone in the household should agree with the adoption. If the animal becomes a problem due to a lack of organization or shared responsibilities, returning them or finding another home will hurt them. After experiencing the warmth of a family, being returned can destabilize them and cause great sadness.",
        },
        {
          highlight: "Support",
          title: "If I live alone, who would be my support?",
          body: "It is wise to be clear about who could take care of the animal if an unforeseen event, a work trip, a vacation, or a situation arises where you cannot attend to them. Having a trusted person who can help you occasionally avoids improvisations and protects the animal.",
        },
        {
          highlight: "Future",
          title: "How do I see myself in the future?",
          body: "Although no one can foresee everything, you must think about your plans. If you plan to move to another country, change jobs, travel for long periods, or go through a very unstable phase, it might be better to wait. A dog's life can reach 15 years or more, and a cat's can reach 20 years. This is not a short-term decision.",
        },
        {
          highlight: "Finances",
          title: "Do I have enough financial stability?",
          body: "It's not about being wealthy, but knowing that an animal generates real expenses. Food, vaccines, deworming, check-ups, medication, neutering, and possible veterinary emergencies are part of the responsibility. If you think a dog or a cat raises itself, it is better to stop and reflect.",
        },
        {
          highlight: "Vet",
          title: "Will I assume necessary or urgent vet expenses?",
          body: "Animals may need occasional or regular veterinary care. Accidents, illnesses, or unforeseen treatments can also arise. Before adopting, you should know if you could face these expenses or consider options like pet insurance to help cover part of the care.",
        },
        {
          highlight: "Coexistence",
          title: "Do I have adequate space and time?",
          body: "You don't need to live in a palace or have a large garden, but the animal needs to be part of family life. Relegating them to a balcony, terrace, garden, or an isolated area of the house because their hair or presence is bothersome is not a responsible adoption. The important thing is to know their needs and whether they fit your schedule and habits.",
        },
        {
          highlight: "Time",
          title: "How much time will they be alone?",
          body: "If you spend 10 or 12 hours away from home every day and cannot offer companionship, walks, attention, and bonding, maybe it is not the time to adopt. There are other ways to help, such as volunteering, helping with outreach, or financially supporting the shelter.",
        },
        {
          highlight: "Commitment",
          title: "Am I ready to stand by them until the end?",
          body: "Adopting means being present in sickness and in health, on the easy days and the hard ones. They cannot accompany us our whole life, but during theirs, they will depend on us. By adopting, you are giving an animal a chance and, at the same time, leaving room for another to be rescued.",
        },
      ],
      secondaryHref: "/adopta",
      secondaryLabel: "See animals",
      title: "Am I ready to adopt?",
      ui: {
        featuredEyebrow: "Before deciding",
        footerEyebrow: "Uncomfortable questions, better adoptions",
        footerText:
          "These questions are not meant to discourage you. They exist to ensure the animal never has to go through being returned, abandoned, or placed in a home that wasn't properly prepared.",
        footerTitle: "Take your time",
        signalsEyebrow: "Important signs",
        signalsTitle: "If an answer makes you uncomfortable, it is worth pausing to reflect",
      },
    },
    es: esContent["estoy-listo"],
  },
  proceso: {
    de: esContent["proceso"],
    en: {
      ctaHref: "/adopta/cuestionario",
      ctaLabel: "See questionnaire",
      eyebrow: "Process",
      intro:
        "The adoption process is designed to guide you, answer your questions, and ensure the chosen animal fits your lifestyle. It’s not about putting up obstacles: it’s about preparing a safe, responsible, and lasting adoption.",
      featured: {
        title: "The goal is a good fit for both sides",
        body: "Before adopting, it is important to reflect calmly. APADAC evaluates the family's situation, home, schedule, previous experience, and the specific needs of the animal. If the animal you like isn't the best fit, the team can guide you toward another companion that matches better.",
        items: [
          "Questionnaire before visiting",
          "Individual advice",
          "First contact with the animal",
          "Contract, documentation, and follow-up",
        ],
      },
      items: [
        {
          highlight: "Start",
          title: "First contact",
          body: "You can write to APADAC if you have already seen an animal on the website or social media, or if you simply know what kind of companion you are looking for. The team will let you know if that animal adapts to your lifestyle, and if not, they will suggest other options that are a better fit for your family and the animal's well-being.",
        },
        {
          highlight: "Essential",
          title: "Adoption questionnaire",
          body: "Before visiting the shelter, it is necessary to complete the pre-adoption questionnaire. It helps us get to know the interested person, their household, home, schedule, experience with animals, and living expectations. With this information, volunteers can offer better-informed advice.",
        },
        {
          highlight: "Reflection",
          title: "Assess if it's the right time",
          body: "Adopting involves a commitment that goes far beyond signing a contract. You must consider the available time, family stability, veterinary expenses, potential changes in housing or jobs, and the responsibility of caring for the animal for its entire life.",
        },
        {
          highlight: "Home",
          title: "Home visit or assessment",
          body: "If APADAC considers that you can take care of the animal, a home visit may be necessary. The goal is to verify that the environment has the appropriate size, characteristics, and safety for the animal you want to adopt.",
        },
        {
          highlight: "Meeting",
          title: "Visit to the shelter",
          body: "Ideally, you should meet the future family member before the adoption. This first contact allows both sides to observe their feelings, resolve doubts, and confirm if there is a good connection. In some cases, due to distance, this visit may not be possible.",
        },
        {
          highlight: "Distance",
          title: "Adoptions outside the municipality",
          body: "Living outside Callosa, Alicante, or even the province does not prevent you from adopting if the home is suitable. When it is necessary to assess a distant home, APADAC can rely on volunteers from other areas. If authorized animal transport is used, that cost is not included in the adoption and is assumed by the adopting family.",
        },
        {
          highlight: "Documents",
          title: "Contract, ID, and passport",
          body: "At the time of adoption, you must provide your ID or passport to sign the contract and process the microchip ownership change. APADAC hands over the animal's European passport with the available information: vaccines, deworming, approximate birth date, breed, sex, and microchip number.",
        },
        {
          highlight: "Afterwards",
          title: "Post-adoption follow-up",
          body: "The adoption does not end when you leave the shelter. APADAC appreciates receiving news, photos, and videos throughout the animal's life, and may conduct phone or in-person follow-ups if necessary. The purpose is to ensure the adaptation is going well and to offer help if any problems arise.",
        },
      ],
      secondaryHref: "/como-ayudar#contacto",
      secondaryLabel: "Consult with APADAC",
      title: "How does the adoption process work?",
      ui: {
        phases: ["First contact", "Assessment", "Adoption", "Afterwards"],
        phaseLabel: "Phase",
        timelineEyebrow: "Adoption timeline",
        timelineTitle: "What happens from the first contact to the follow-up",
      },
    },
    es: esContent["proceso"],
  },
};

export const getAdoptionGuidePage = (
  slug: keyof typeof adoptionGuidePages,
  locale: Locale,
) => adoptionGuidePages[slug][locale];