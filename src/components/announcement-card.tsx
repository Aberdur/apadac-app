import Image from "next/image";
import Link from "next/link";

import {
  announcementTone,
  formatAnnouncementMeta,
  getAnnouncementKindLabels,
} from "@/lib/announcements";
import { getDictionary, type Locale } from "@/lib/i18n";
import { getMedia } from "@/lib/media";

type AnnouncementCardProps = {
  announcement: {
    coverImage?: unknown;
    eventDate?: string | null;
    id: number | string;
    kind?: string | null;
    location?: string | null;
    slug?: string | null;
    summary?: string | null;
    title?: string | null;
  };
  href: string;
  locale: Locale;
};

export const AnnouncementCard = ({
  announcement,
  href,
  locale,
}: AnnouncementCardProps) => {
  const t = getDictionary(locale);
  const kindLabels = getAnnouncementKindLabels(locale);
  const cover = getMedia(announcement.coverImage);
  const title = announcement.title || t.announcementsPage.fallbackTitle;
  const meta = formatAnnouncementMeta({
    eventDate: announcement.eventDate,
    kind: announcement.kind,
    locale,
    location: announcement.location,
  });

  return (
    <article className="surface-lift overflow-hidden rounded-[1.75rem] border border-[var(--line)] bg-[var(--surface)] shadow-[var(--shadow)]">
      <div className="relative h-64 bg-[rgba(240,196,173,0.32)]">
        {cover?.url ? (
          <Image
            alt={cover.alt || title}
            className="object-cover"
            fill
            sizes="(max-width: 767px) 100vw, 50vw"
            src={cover.url}
          />
        ) : (
          <div className="flex h-full items-center justify-center text-sm text-[var(--muted)]">
            {t.common.imagePending}
          </div>
        )}
      </div>

      <div className="space-y-5 p-7">
        <div className="flex items-start justify-between gap-4">
          <div>
            <h3 className="display-font text-[2.2rem] leading-[0.95]">{title}</h3>
            {meta ? <p className="mt-2 text-sm text-[var(--muted)]">{meta}</p> : null}
          </div>
          <span
            className={`shrink-0 rounded-full px-3 py-1 text-xs font-semibold uppercase tracking-[0.15em] ${
              announcementTone[announcement.kind || ""] ||
              "bg-[rgba(111,83,100,0.12)] text-[var(--foreground)]"
            }`}
          >
            {kindLabels[announcement.kind || ""] || announcement.kind || t.announcementsPage.badge}
          </span>
        </div>

        <p className="text-base leading-8 text-[var(--muted)]">
          {announcement.summary || t.announcementsPage.fallbackSummary}
        </p>

        <Link
          className="button-soft inline-flex rounded-full bg-[var(--olive-deep)] px-4 py-2 text-sm font-semibold text-white"
          href={href}
        >
          {t.announcementsPage.viewAnnouncement}
        </Link>
      </div>
    </article>
  );
};
