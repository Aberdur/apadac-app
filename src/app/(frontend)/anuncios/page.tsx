import Link from "next/link";

import { AnnouncementCard } from "@/components/announcement-card";
import { getAdminSession } from "@/lib/auth";
import { getDictionary } from "@/lib/i18n";
import { getLocale } from "@/lib/i18n-server";
import { getCMS } from "@/lib/payload";

export const metadata = {
  title: "Anuncios",
};

export default async function AnnouncementsPage() {
  const locale = await getLocale();
  const t = getDictionary(locale);
  const payload = await getCMS();
  const session = await getAdminSession();
  const { docs } = await payload.find({
    collection: "announcements",
    depth: 1,
    limit: 24,
    sort: "-updatedAt",
  });

  return (
    <div className="space-y-8">
      <section className="rounded-[2rem] border border-[var(--line)] bg-[var(--surface)] p-8 shadow-[var(--shadow)]">
        <div className="flex flex-wrap items-start justify-between gap-4">
          <div className="max-w-2xl">
            <p className="text-sm font-semibold uppercase tracking-[0.22em] text-[var(--olive)]">
              {t.announcementsPage.eyebrow}
            </p>
            <h1 className="display-font mt-3 text-5xl leading-none">
              {t.announcementsPage.title}
            </h1>
            <p className="mt-4 text-base leading-7 text-[var(--muted)]">
              {t.announcementsPage.subtitle}
            </p>
          </div>
          {session.canEditAnnouncements ? (
            /* eslint-disable-next-line @next/next/no-html-link-for-pages */
            <a
              className="button-soft inline-flex rounded-full bg-[var(--coral)] px-5 py-3 text-sm font-semibold text-white"
              href="/admin/collections/announcements/create"
            >
              {t.announcementsPage.createAnnouncement}
            </a>
          ) : null}
        </div>
      </section>

      {docs.length > 0 ? (
        <section className="grid gap-6 md:grid-cols-2">
          {docs.map((announcement) => (
            <AnnouncementCard
              key={announcement.id}
              announcement={announcement}
              href={`/anuncios/${announcement.slug}`}
              locale={locale}
            />
          ))}
        </section>
      ) : (
        <section className="rounded-[2rem] border border-dashed border-[var(--line-strong)] bg-white/70 p-10 text-center shadow-[var(--shadow)]">
          <p className="display-font text-3xl">{t.announcementsPage.emptyTitle}</p>
          <p className="mx-auto mt-4 max-w-xl text-sm leading-7 text-[var(--muted)]">
            {t.announcementsPage.emptyText}
          </p>
          <div className="mt-6 flex flex-wrap justify-center gap-3">
            <Link
              className="inline-flex rounded-full bg-[var(--olive-deep)] px-5 py-3 text-sm font-semibold text-white"
              href="/"
            >
              {t.announcementsPage.emptyHome}
            </Link>
            {session.canEditAnnouncements ? (
              /* eslint-disable-next-line @next/next/no-html-link-for-pages */
              <a
                className="inline-flex rounded-full border border-[var(--line-strong)] px-5 py-3 text-sm font-semibold"
                href="/admin/collections/announcements/create"
              >
                {t.announcementsPage.createAnnouncement}
              </a>
            ) : null}
          </div>
        </section>
      )}
    </div>
  );
}
