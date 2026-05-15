import Link from "next/link";

import { AnimalCard } from "@/components/animal-card";
import { publicAdoptionStatuses } from "@/lib/animals";
import { getDictionary } from "@/lib/i18n";
import { getLocale } from "@/lib/i18n-server";
import { getCMS } from "@/lib/payload";
import { isExternalHttpHref, resolveSafeHref } from "@/lib/security";

export const metadata = {
  title: "Apadrina",
};

export default async function SponsorPage() {
  const locale = await getLocale();
  const t = getDictionary(locale);
  const payload = await getCMS();
  const [{ docs }, helpSettings] = await Promise.all([
    payload.find({
      collection: "animals",
      depth: 1,
      limit: 24,
      sort: "-updatedAt",
      where: {
        and: [
          {
            status: {
              in: publicAdoptionStatuses,
            },
          },
          {
            sponsored: {
              not_equals: true,
            },
          },
        ],
      },
    }),
    payload.findGlobal({
      slug: "como-ayudar",
    }),
  ]);

  const sponsorshipFormUrl = helpSettings.sponsorshipFormUrl as string | undefined;
  const contactEmail = helpSettings.contactEmail as string | undefined;
  const sponsorHref = resolveSafeHref(
    sponsorshipFormUrl,
    contactEmail ? `mailto:${contactEmail}` : "/como-ayudar#apadrinar",
  );

  return (
    <div className="space-y-8">
      <section className="rounded-[2rem] border border-[var(--line)] bg-[var(--surface)] p-8 shadow-[var(--shadow)]">
        <p className="text-sm font-semibold uppercase tracking-[0.22em] text-[var(--olive)]">
          {t.sponsorPage.eyebrow}
        </p>
        <h1 className="display-font mt-3 text-5xl leading-none">
          {t.sponsorPage.title}
        </h1>
        <p className="mt-4 max-w-2xl text-base leading-7 text-[var(--muted)]">
          {t.sponsorPage.subtitle}
        </p>
        <div className="mt-6 flex flex-wrap gap-3">
          <a
            className="inline-flex rounded-full bg-[var(--olive-deep)] px-5 py-3 text-sm font-semibold text-white"
            href={sponsorHref}
            rel="noreferrer"
            target={isExternalHttpHref(sponsorHref) ? "_blank" : undefined}
          >
            {t.sponsorPage.cta}
          </a>
          <Link
            className="inline-flex rounded-full border border-[var(--line-strong)] px-5 py-3 text-sm font-semibold"
            href="/como-ayudar#apadrinar"
          >
            {t.sponsorPage.viewHelp}
          </Link>
        </div>
      </section>

      {docs.length === 0 ? (
        <section className="rounded-[2rem] border border-dashed border-[var(--line-strong)] bg-white/70 p-10 text-center shadow-[var(--shadow)]">
          <p className="display-font text-3xl">{t.sponsorPage.emptyTitle}</p>
          <p className="mx-auto mt-4 max-w-xl text-sm leading-7 text-[var(--muted)]">
            {t.sponsorPage.emptyText}
          </p>
          <div className="mt-6 flex flex-wrap justify-center gap-3">
            <Link
              className="inline-flex rounded-full bg-[var(--olive-deep)] px-5 py-3 text-sm font-semibold text-white"
              href="/adopta"
            >
              {t.sponsorPage.emptyPrimary}
            </Link>
            <Link
              className="inline-flex rounded-full border border-[var(--line-strong)] px-5 py-3 text-sm font-semibold"
              href="/como-ayudar"
            >
              {t.sponsorPage.emptySecondary}
            </Link>
          </div>
        </section>
      ) : (
        <section className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
          {docs.map((animal) => (
            <AnimalCard
              key={animal.id}
              animal={animal}
              ctaLabel={t.sponsorPage.viewAnimal(animal.name || "Animal")}
              href={`/adopta/${animal.slug}`}
              locale={locale}
            />
          ))}
        </section>
      )}
    </div>
  );
}
