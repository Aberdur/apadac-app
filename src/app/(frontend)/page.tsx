import Link from "next/link";

import { AnimalCard } from "@/components/animal-card";
import { AnnouncementCard } from "@/components/announcement-card";
import { ApadacAboutSection } from "@/components/apadac-about-section";
import { getApadacInfo } from "@/lib/apadac-info";
import { publicAdoptionStatuses, successStatus } from "@/lib/animals";
import { getAdminSession } from "@/lib/auth";
import { getHelpOptions } from "@/lib/help-options";
import { getDictionary } from "@/lib/i18n";
import { getLocale } from "@/lib/i18n-server";
import { getCMS } from "@/lib/payload";

type HomePageProps = {
  searchParams?: Promise<{
    species?: string;
  }>;
};

const docsOrEmpty = <T,>(
  result: PromiseSettledResult<{ docs: T[] }>,
  label: string,
) => {
  if (result.status === "fulfilled") {
    return result.value.docs.filter(Boolean);
  }
  console.error(`home section load failed: ${label}`, result.reason);
  return [];
};

export default async function HomePage({ searchParams }: HomePageProps) {
  const params = searchParams ? await searchParams : undefined;
  const selectedSpecies =
    params?.species === "gato" || params?.species === "perro"
      ? params.species
      : "perro";
  const locale = await getLocale();
  const t = getDictionary(locale);
  
  const helpOptions = [
    { id: "donaciones", href: "/donaciones", title: "Donaciones y Ayuda Económica" },
    { id: "voluntariado", href: "/voluntariado", title: "Voluntariado y Acogida" },
    { id: "apadrina", href: "/apadrina", title: "Apadrina un animal" },
  ];

  const baseApadacInfo = getApadacInfo(locale);
  const payload = await getCMS();
  const session = await getAdminSession();

  const [
    animalsResult,
    successCasesResult,
    announcementsResult,
    adoptedCountResult,
    totalAnimalsCountResult,
    recoveredCountResult,
    volunteersCountResult
  ] = await Promise.allSettled([
    payload.find({
      collection: "animals",
      depth: 1,
      limit: 6,
      sort: "-updatedAt",
      where: {
        and: [
          { species: { equals: selectedSpecies } },
          { status: { in: publicAdoptionStatuses } },
        ],
      },
    }),
    payload.find({
      collection: "animals",
      depth: 1,
      limit: 4,
      sort: "-updatedAt",
      where: { status: { equals: successStatus } },
    }),
    payload.find({
      collection: "announcements",
      depth: 1,
      limit: 3,
      sort: "-updatedAt",
    }),
    payload.find({
      collection: "animals",
      limit: 1,
      depth: 0,
      where: { status: { equals: successStatus } },
    }),
    payload.find({
      collection: "animals",
      limit: 1,
      depth: 0,
    }),
    payload.find({
      collection: "animals",
      limit: 1,
      depth: 0,
      where: { status: { equals: "recuperado" } },
    }),

    payload.find({
      collection: "users",
      limit: 1,
      depth: 0,
    })
  ]);

  const animals = docsOrEmpty(animalsResult, "animals");
  const successCases = docsOrEmpty(successCasesResult, "successCases");
  const announcements = docsOrEmpty(announcementsResult, "announcements");

  const realAdopted = adoptedCountResult.status === "fulfilled" ? adoptedCountResult.value.totalDocs : 0;
  const totalAdopted = 640 + realAdopted;

  const realRescatados = totalAnimalsCountResult.status === "fulfilled" ? totalAnimalsCountResult.value.totalDocs : 0;
  const totalRescatados = 120 + realRescatados;

  const realRecuperados = recoveredCountResult.status === "fulfilled" ? recoveredCountResult.value.totalDocs : 0;
  const totalRecuperados = 45 + realRecuperados;

  const realVolunteers = volunteersCountResult.status === "fulfilled" ? volunteersCountResult.value.totalDocs : 0;
  const totalVolunteers = 13 + realVolunteers;

  const dynamicApadacInfo = {
    ...baseApadacInfo,
    stats: baseApadacInfo.stats.map(stat => {
      const labelLower = stat.label.toLowerCase();
      
      if (labelLower.includes("adopt")) {
        return { ...stat, value: `${totalAdopted}+` };
      }
      if (labelLower.includes("rescatad")) {
        return { ...stat, value: `${totalRescatados}+` };
      }
      if (labelLower.includes("recuperad")) {
        return { ...stat, value: `${totalRecuperados}+` };
      }
      if (labelLower.includes("voluntari") || labelLower.includes("bénévol")) {
        return { ...stat, value: `${totalVolunteers}+` };
      }
      
      return stat;
    })
  };

  return (
    <div className="space-y-10">
      
      <section className="rounded-[2rem] border border-[var(--line)] bg-[var(--surface-strong)] px-8 py-10 text-center shadow-[var(--shadow)] sm:px-12">
        <p className="text-sm font-semibold uppercase tracking-[0.22em] text-[var(--olive)]">
          {t.home.heroEyebrow}
        </p>
        <h1 className="display-font mx-auto mt-4 max-w-4xl text-4xl leading-[0.98] sm:text-5xl">
          {t.home.heroTitle}
        </h1>
        <p className="mx-auto mt-5 max-w-3xl text-base leading-8 text-[var(--muted)]">
          {t.home.heroText}
        </p>
        <div className="mt-8 flex flex-wrap justify-center gap-3">
          <Link
            href={`/?species=${selectedSpecies}#adopcion`}
            className="button-soft rounded-full bg-[var(--olive-deep)] px-6 py-3 text-sm font-semibold text-white"
          >
            {t.home.heroPrimary(selectedSpecies)}
          </Link>
          <Link
            href="/casos-de-exito"
            className="button-soft rounded-full border border-[var(--line-strong)] bg-white px-6 py-3 text-sm font-semibold hover:bg-[var(--surface)]"
          >
            {t.home.heroSecondary}
          </Link>
        </div>
      </section>

      <section className="space-y-6" id="adopcion">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.22em] text-[var(--olive)]">
              {t.home.adoptionEyebrow}
            </p>
            <h2 className="display-font mt-2 text-4xl leading-none sm:text-5xl">
              {t.home.speciesHeading(selectedSpecies)}
            </h2>
            <p className="mt-3 max-w-2xl text-sm leading-7 text-[var(--muted)]">
              {t.home.adoptionText}
            </p>
            <div className="mt-5 flex flex-wrap gap-3">
              <Link
                className={`button-soft rounded-full px-4 py-2 text-sm font-semibold ${
                  selectedSpecies === "perro" ? "bg-[var(--coral)] text-white" : "border border-[var(--line)] bg-white/80"
                }`}
                href="/?species=perro#adopcion"
              >
                {t.common.dogs}
              </Link>
              <Link
                className={`button-soft rounded-full px-4 py-2 text-sm font-semibold ${
                  selectedSpecies === "gato" ? "bg-[var(--coral)] text-white" : "border border-[var(--line)] bg-white/80"
                }`}
                href="/?species=gato#adopcion"
              >
                {t.common.gatos}
              </Link>
            </div>
          </div>
          <Link
            className="button-soft inline-flex rounded-full border border-[var(--line-strong)] bg-white/70 px-5 py-3 text-sm font-semibold"
            href={`/adopta?species=${selectedSpecies}`}
          >
            {selectedSpecies === "gato" ? t.common.seeAllCats : t.common.seeAllDogs}
          </Link>
        </div>

        {animals.length > 0 ? (
          <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
            {animals.map((animal) => (
              <AnimalCard key={animal.id} animal={animal} ctaLabel={t.adoptionList.cta(animal.name || "Animal")} href={`/adopta/${animal.slug}`} locale={locale} />
            ))}
          </div>
        ) : (
          <div className="rounded-[2rem] border border-dashed border-[var(--line-strong)] bg-white/70 p-8 text-sm leading-7 text-[var(--muted)] shadow-[var(--shadow)]">
            {t.home.noAnimals(selectedSpecies)}
          </div>
        )}
      </section>

      <ApadacAboutSection compact content={dynamicApadacInfo} />

      <section className="rounded-[2rem] border border-[var(--line)] bg-[var(--surface)] p-8 shadow-[var(--shadow)]" id="ayudar">
        <div className="flex flex-wrap items-center justify-between gap-5">
          <div className="max-w-2xl">
            <p className="text-sm font-semibold uppercase tracking-[0.22em] text-[var(--olive)]">
              {t.home.helpEyebrow}
            </p>
            <h2 className="display-font mt-2 text-3xl leading-none sm:text-4xl">
              {t.home.helpTitle}
            </h2>
            <p className="mt-4 text-sm leading-7 text-[var(--muted)]">
              {t.home.helpText}
            </p>
          </div>
          <Link className="button-soft inline-flex rounded-full bg-[var(--olive-deep)] px-5 py-3 text-sm font-semibold text-white" href="/como-ayudar">
            {t.home.helpCta}
          </Link>
        </div>

        <div className="mt-6 flex flex-wrap gap-3">
          {helpOptions.map((item) => (
            <Link key={item.id} className="button-soft rounded-full border border-[var(--line)] bg-white/80 px-4 py-2 text-sm font-semibold" href={item.href}>
              {item.title}
            </Link>
          ))}
        </div>
      </section>

      <section className="space-y-6">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.22em] text-[var(--olive)]">
              {t.home.successEyebrow}
            </p>
            <h2 className="display-font mt-2 text-4xl leading-none sm:text-5xl">
              {t.home.successTitle}
            </h2>
            <p className="mt-3 max-w-2xl text-sm leading-7 text-[var(--muted)]">
              {t.home.successText}
            </p>
          </div>
          <Link className="button-soft inline-flex rounded-full border border-[var(--line-strong)] bg-white/70 px-5 py-3 text-sm font-semibold" href="/casos-de-exito">
            {t.home.successCta}
          </Link>
        </div>

        {successCases.length > 0 ? (
          <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-4">
            {successCases.map((animal) => (
              <AnimalCard key={animal.id} animal={animal} ctaLabel={t.successPage.viewStory} href={`/adopta/${animal.slug}`} locale={locale} variant="success" />
            ))}
          </div>
        ) : (
          <div className="rounded-[2rem] border border-dashed border-[var(--line-strong)] bg-white/70 p-8 text-sm leading-7 text-[var(--muted)] shadow-[var(--shadow)]">
            {t.home.noSuccess}
          </div>
        )}
      </section>

      <section className="space-y-6">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.22em] text-[var(--olive)]">
              {t.home.announcementsEyebrow}
            </p>
            <h2 className="display-font mt-2 text-4xl leading-none sm:text-5xl">
              {t.home.announcementsTitle}
            </h2>
            <p className="mt-3 max-w-2xl text-sm leading-7 text-[var(--muted)]">
              {t.home.announcementsText}
            </p>
          </div>
          <div className="flex flex-wrap gap-3">
            <Link className="button-soft inline-flex rounded-full border border-[var(--line-strong)] bg-white/70 px-5 py-3 text-sm font-semibold" href="/anuncios">
              {t.home.announcementsCta}
            </Link>
            {session?.canEditAnnouncements ? (
              /* eslint-disable-next-line @next/next/no-html-link-for-pages */
              <a className="button-soft inline-flex rounded-full bg-[var(--coral)] px-5 py-3 text-sm font-semibold text-white" href="/admin/collections/announcements/create">
                {t.home.announcementsAdminCta}
              </a>
            ) : null}
          </div>
        </div>

        {announcements.length > 0 ? (
          <div className="grid max-w-5xl gap-6 md:grid-cols-2">
            {announcements.map((announcement) => (
              <AnnouncementCard key={announcement.id} announcement={announcement} href={`/anuncios/${announcement.slug}`} locale={locale} />
            ))}
          </div>
        ) : (
          <div className="rounded-[2rem] border border-dashed border-[var(--line-strong)] bg-white/70 p-8 text-sm leading-7 text-[var(--muted)] shadow-[var(--shadow)]">
            {t.home.noAnnouncements}
          </div>
        )}
      </section>

    </div>
  );
}