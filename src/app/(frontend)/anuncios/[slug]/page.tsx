import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";

import { getAnnouncementKindLabels } from "@/lib/announcements";
import { formatDate } from "@/lib/animals";
import { getAdminSession } from "@/lib/auth";
import { getDictionary } from "@/lib/i18n";
import { getLocale } from "@/lib/i18n-server";
import { getMedia } from "@/lib/media";
import { getCMS } from "@/lib/payload";
import { isExternalHttpHref, sanitizeHref } from "@/lib/security";

type AnnouncementPageProps = {
  params: Promise<{
    slug: string;
  }>;
};

export default async function AnnouncementDetailPage({ params }: AnnouncementPageProps) {
  const { slug } = await params;
  const locale = await getLocale();
  const t = getDictionary(locale);
  const payload = await getCMS();
  const adminSession = await getAdminSession();
  const kindLabels = getAnnouncementKindLabels(locale);
  const { docs } = await payload.find({
    collection: "announcements",
    depth: 1,
    limit: 1,
    where: {
      slug: {
        equals: slug,
      },
    },
  });

  const announcement = docs[0];

  if (!announcement) {
    notFound();
  }

  const title = announcement.title || t.announcementsPage.fallbackTitle;
  const cover = getMedia(announcement.coverImage);
  const editHref = `/admin/collections/announcements/${announcement.id}`;
  const externalHref = sanitizeHref(announcement.externalUrl);

  return (
    <div className="space-y-8">
      <section className="rounded-[2rem] border border-[var(--line)] bg-[var(--surface)] p-8 shadow-[var(--shadow)]">
        <div className="flex flex-wrap items-start justify-between gap-6">
          <div className="max-w-[62rem]">
            <div className="flex flex-wrap items-center gap-3 text-xs font-semibold uppercase tracking-[0.16em] text-[var(--muted)]">
              <span className="rounded-full bg-[rgba(111,83,100,0.14)] px-3 py-2 text-[var(--olive-deep)]">
                {kindLabels[announcement.kind || ""] || announcement.kind || t.announcementsPage.badge}
              </span>
              {announcement.eventDate ? <span>{formatDate(announcement.eventDate, locale)}</span> : null}
              {announcement.location ? <span>{announcement.location}</span> : null}
            </div>
            <h1 className="display-font mt-5 max-w-5xl text-5xl leading-[0.96]">
              {title}
            </h1>
            <p className="mt-6 max-w-3xl text-[1.08rem] leading-8 text-[var(--muted)]">
              {announcement.summary || t.announcementsPage.fallbackSummary}
            </p>
          </div>
          <div className="flex flex-wrap gap-3">
            <Link
              className="inline-flex rounded-full border border-[var(--line-strong)] px-5 py-3 text-sm font-semibold"
              href="/anuncios"
            >
              {t.announcementsPage.backToAnnouncements}
            </Link>
            {adminSession.canEditAnnouncements ? (
              <a
                className="inline-flex rounded-full bg-[var(--coral)] px-5 py-3 text-sm font-semibold text-white"
                href={editHref}
              >
                {t.common.editPanel}
              </a>
            ) : null}
          </div>
        </div>

        {cover?.url ? (
          <div className="relative mt-10 mb-10 min-h-[22rem] overflow-hidden rounded-[1.75rem] border border-[var(--line)] bg-[rgba(240,196,173,0.32)]">
            <Image
              alt={cover.alt || title}
              className="object-cover"
              fill
              sizes="100vw"
              src={cover.url}
            />
          </div>
        ) : null}

        <div className="max-w-[46rem] space-y-6 text-[1.04rem] leading-8 text-[var(--foreground)]">
          {(announcement.body || "")
            .split(/\n{2,}/)
            .map((paragraph: string) => paragraph.trim())
            .filter(Boolean)
            .map((paragraph: string, index: number) => (
              <p key={`${announcement.id}-${index}`}>{paragraph}</p>
            ))}
        </div>

        {externalHref ? (
          <div className="mt-8">
            <a
              className="inline-flex rounded-full bg-[var(--olive-deep)] px-5 py-3 text-sm font-semibold text-white"
              href={externalHref}
              rel="noreferrer"
              target={isExternalHttpHref(externalHref) ? "_blank" : undefined}
            >
              {t.announcementsPage.externalCta}
            </a>
          </div>
        ) : null}
      </section>
    </div>
  );
}
