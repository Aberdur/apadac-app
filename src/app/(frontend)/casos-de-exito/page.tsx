import Link from "next/link";

import { AnimalCard } from "@/components/animal-card";
import { successStatus } from "@/lib/animals";
import { getDictionary } from "@/lib/i18n";
import { getLocale } from "@/lib/i18n-server";
import { getCMS } from "@/lib/payload";

export const metadata = {
  title: "Casos de éxito",
};

export default async function SuccessCasesPage() {
  const locale = await getLocale();
  const t = getDictionary(locale);
  const payload = await getCMS();
  const { docs } = await payload.find({
    collection: "animals",
    depth: 1,
    limit: 24,
    sort: "-updatedAt",
    where: {
      status: {
        equals: successStatus,
      },
    },
  });

  return (
    <div className="space-y-8">
      <section className="rounded-[2rem] border border-[var(--line)] bg-[var(--surface)] p-8 shadow-[var(--shadow)]">
        <p className="text-sm font-semibold uppercase tracking-[0.22em] text-[var(--olive)]">
          {t.successPage.eyebrow}
        </p>
        <h1 className="display-font mt-3 text-5xl leading-none">
          {t.successPage.title}
        </h1>
        <p className="mt-4 max-w-2xl text-base leading-7 text-[var(--muted)]">
          {t.successPage.subtitle}
        </p>
      </section>

      {docs.length > 0 ? (
        <section className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
          {docs.map((animal) => (
              <AnimalCard
                key={animal.id}
                animal={animal}
                ctaLabel={t.successPage.viewStory}
                href={`/adopta/${animal.slug}`}
                locale={locale}
                variant="success"
              />
            ))}
          </section>
      ) : (
        <section className="rounded-[2rem] border border-dashed border-[var(--line-strong)] bg-white/70 p-10 text-center shadow-[var(--shadow)]">
          <p className="display-font text-3xl">{t.successPage.emptyTitle}</p>
          <p className="mx-auto mt-4 max-w-xl text-sm leading-7 text-[var(--muted)]">
            {t.successPage.emptyText}
          </p>
          <Link
            className="mt-6 inline-flex rounded-full bg-[var(--olive-deep)] px-5 py-3 text-sm font-semibold text-white"
            href="/adopta"
          >
            {t.successPage.emptyButton}
          </Link>
        </section>
      )}
    </div>
  );
}
