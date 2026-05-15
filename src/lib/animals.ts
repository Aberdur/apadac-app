import type { Locale } from "@/lib/i18n";
import { getDateLocale } from "@/lib/i18n";

export const publicAdoptionStatuses = ["en_adopcion", "urgente", "acogida"];
export const successStatus = "adoptado";
export const internalHiddenStatus = "baja_interna";
export const publicVisibleStatuses = [...publicAdoptionStatuses, successStatus];

const speciesLabelsByLocale: Record<Locale, Record<string, string>> = {
  de: {
    gato: "Katze",
    perro: "Hund",
  },
  en: {
    gato: "Cat",
    perro: "Dog",
  },
  es: {
    gato: "Gato",
    perro: "Perro",
  },
};

const statusLabelsByLocale: Record<Locale, Record<string, string>> = {
  de: {
    acogida: "Pflegestelle",
    adoptado: "Adoptiert",
    baja_interna: "Intern archiviert",
    en_adopcion: "Zur Adoption",
    reservado: "Reserviert",
    urgente: "Dringend",
  },
  en: {
    acogida: "In foster care",
    adoptado: "Adopted",
    baja_interna: "Internal only",
    en_adopcion: "Available",
    reservado: "Reserved",
    urgente: "Urgent",
  },
  es: {
    acogida: "En acogida",
    adoptado: "Adoptado",
    baja_interna: "Baja interna",
    en_adopcion: "En adopción",
    reservado: "Reservado",
    urgente: "Urgente",
  },
};

const sizeLabelsByLocale: Record<Locale, Record<string, string>> = {
  de: {
    grande: "Groß",
    mediano: "Mittel",
    pequeno: "Klein",
  },
  en: {
    grande: "Large",
    mediano: "Medium",
    pequeno: "Small",
  },
  es: {
    grande: "Grande",
    mediano: "Mediano",
    pequeno: "Pequeño",
  },
};

const sexLabelsByLocale: Record<Locale, Record<string, string>> = {
  de: {
    hembra: "Weiblich",
    macho: "Männlich",
  },
  en: {
    hembra: "Female",
    macho: "Male",
  },
  es: {
    hembra: "Hembra",
    macho: "Macho",
  },
};

const ageGroupLabelsByLocale: Record<Locale, Record<string, string>> = {
  de: {
    adulto: "Erwachsen",
    cachorro: "Welpe",
    joven: "Jung",
    senior: "Senior",
  },
  en: {
    adulto: "Adult",
    cachorro: "Puppy / Kitten",
    joven: "Young",
    senior: "Senior",
  },
  es: {
    adulto: "Adulto",
    cachorro: "Cachorro",
    joven: "Joven",
    senior: "Senior",
  },
};

const energyLabelsByLocale: Record<Locale, Record<string, string>> = {
  de: {
    activa: "Hoch",
    equilibrada: "Mittel",
    tranquila: "Niedrig",
  },
  en: {
    activa: "High",
    equilibrada: "Medium",
    tranquila: "Low",
  },
  es: {
    activa: "Alta",
    equilibrada: "Media",
    tranquila: "Baja",
  },
};

export const speciesLabels = speciesLabelsByLocale.es;
export const statusLabels = statusLabelsByLocale.es;
export const sizeLabels = sizeLabelsByLocale.es;
export const sexLabels = sexLabelsByLocale.es;
export const ageGroupLabels = ageGroupLabelsByLocale.es;
export const energyLabels = energyLabelsByLocale.es;

export const getSpeciesLabels = (locale: Locale) => speciesLabelsByLocale[locale];
export const getStatusLabels = (locale: Locale) => statusLabelsByLocale[locale];
export const getSizeLabels = (locale: Locale) => sizeLabelsByLocale[locale];
export const getSexLabels = (locale: Locale) => sexLabelsByLocale[locale];
export const getAgeGroupLabels = (locale: Locale) => ageGroupLabelsByLocale[locale];
export const getEnergyLabels = (locale: Locale) => energyLabelsByLocale[locale];

export const statusTone: Record<string, string> = {
  acogida: "bg-[rgba(216,195,224,0.28)] text-[var(--olive-deep)]",
  adoptado: "bg-[rgba(216,195,224,0.34)] text-[var(--olive-deep)]",
  baja_interna: "bg-[rgba(111,83,100,0.12)] text-[var(--muted)]",
  en_adopcion: "bg-[rgba(215,154,160,0.22)] text-[var(--coral)]",
  reservado: "bg-[rgba(111,83,100,0.12)] text-[var(--foreground)]",
  urgente: "bg-[rgba(215,154,160,0.34)] text-[var(--coral)]",
};

export const formatAnimalValue = (
  value: string | null | undefined,
  labels?: Record<string, string>,
) => {
  if (!value) {
    return null;
  }

  return labels?.[value] ?? value;
};

export const buildAdoptionMailto = (
  email: string,
  animalName: string,
  locale: Locale = "es",
) => {
  const copy = {
    de: {
      body: `Hallo,\n\nich hätte gerne mehr Informationen über ${animalName}.\n\nDanke.`,
      subject: `Ich möchte ${animalName} adoptieren`,
    },
    en: {
      body: `Hello,\n\nI would like to receive more information about ${animalName}.\n\nThank you.`,
      subject: `I want to adopt ${animalName}`,
    },
    es: {
      body: `Hola,\n\nEstoy interesada en recibir más información sobre ${animalName}.\n\nGracias.`,
      subject: `Quiero adoptar a ${animalName}`,
    },
  }[locale];
  const subject = encodeURIComponent(copy.subject);
  const body = encodeURIComponent(copy.body);

  return `mailto:${email}?subject=${subject}&body=${body}`;
};

export const formatDate = (value: string | null | undefined, locale: Locale = "es") => {
  if (!value) {
    return null;
  }

  const date = new Date(value);

  if (Number.isNaN(date.getTime())) {
    return null;
  }

  return new Intl.DateTimeFormat(getDateLocale(locale), {
    day: "numeric",
    month: "long",
    year: "numeric",
  }).format(date);
};

const normalize = (value: string) =>
  value
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "");

export const inferAgeGroup = (value: string | null | undefined) => {
  if (!value) {
    return null;
  }

  const normalized = normalize(value);

  if (
    normalized.includes("cachorro") ||
    normalized.includes("cachorra") ||
    normalized.includes("cachor") ||
    normalized.includes("puppy") ||
    normalized.includes("kitten") ||
    normalized.includes("welpe") ||
    normalized.includes("bebe") ||
    normalized.includes("baby") ||
    normalized.includes("mes")
  ) {
    return "cachorro";
  }

  if (
    normalized.includes("joven") ||
    normalized.includes("juvenil") ||
    normalized.includes("young") ||
    normalized.includes("jung") ||
    normalized.includes("1 ano") ||
    normalized.includes("1 año") ||
    normalized.includes("2 anos") ||
    normalized.includes("2 años")
  ) {
    return "joven";
  }

  if (
    normalized.includes("senior") ||
    normalized.includes("mayor") ||
    normalized.includes("abuel") ||
    normalized.includes("old") ||
    normalized.includes("alt") ||
    normalized.includes("10 anos") ||
    normalized.includes("10 años") ||
    normalized.includes("11 anos") ||
    normalized.includes("11 años") ||
    normalized.includes("12 anos") ||
    normalized.includes("12 años")
  ) {
    return "senior";
  }

  return "adulto";
};
