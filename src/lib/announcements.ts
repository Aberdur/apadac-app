import type { Locale } from "@/lib/i18n";

import { formatDate } from "@/lib/animals";

const kindLabelsByLocale: Record<Locale, Record<string, string>> = {
  de: {
    comunicado: "Mitteilung",
    evento: "Veranstaltung",
    noticia: "Neuigkeit",
  },
  en: {
    comunicado: "Notice",
    evento: "Event",
    noticia: "News",
  },
  es: {
    comunicado: "Comunicado",
    evento: "Evento",
    noticia: "Noticia",
  },
};

export const getAnnouncementKindLabels = (locale: Locale) => kindLabelsByLocale[locale];

export const announcementTone: Record<string, string> = {
  comunicado: "bg-[rgba(111,83,100,0.14)] text-[var(--olive-deep)]",
  evento: "bg-[rgba(240,196,173,0.32)] text-[var(--foreground)]",
  noticia: "bg-[rgba(216,195,224,0.26)] text-[var(--muted)]",
};

export const formatAnnouncementMeta = ({
  eventDate,
  kind,
  locale,
  location,
}: {
  eventDate?: string | null;
  kind?: string | null;
  locale: Locale;
  location?: string | null;
}) => {
  const kindLabels = getAnnouncementKindLabels(locale);

  return [
    kind ? kindLabels[kind] || kind : null,
    formatDate(eventDate, locale),
    location || null,
  ]
    .filter(Boolean)
    .join(" · ");
};
