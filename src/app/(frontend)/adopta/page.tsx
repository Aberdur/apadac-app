import Link from "next/link";

import { AnimalCard } from "@/components/animal-card";
import {
  getAgeGroupLabels,
  inferAgeGroup,
  publicAdoptionStatuses,
  getSexLabels,
  getSizeLabels,
} from "@/lib/animals";
import { getDictionary } from "@/lib/i18n";
import { getLocale } from "@/lib/i18n-server";
import { getCMS } from "@/lib/payload";

export const metadata = {
  title: "Adopta",
};

type AdoptaPageArgs = {
  searchParams: Promise<{
    age?: string;
    sex?: string;
    size?: string;
    species?: string;
  }>;
};

export default async function AdoptaPage({ searchParams }: AdoptaPageArgs) {
  const params = await searchParams;
  const locale = await getLocale();
  const t = getDictionary(locale);
  const ageGroupLabels = getAgeGroupLabels(locale);
  const sexLabels = getSexLabels(locale);
  const sizeLabels = getSizeLabels(locale);
  const activeSpecies =
    params.species === "gato" || params.species === "perro" ? params.species : null;
  const activeSex =
    params.sex === "hembra" || params.sex === "macho" ? params.sex : null;
  const activeSize =
    params.size === "pequeno" || params.size === "mediano" || params.size === "grande"
      ? params.size
      : null;
  const activeAge =
    params.age === "cachorro" ||
    params.age === "joven" ||
    params.age === "adulto" ||
    params.age === "senior"
      ? params.age
      : null;
  const payload = await getCMS();
  const { docs: initialDocs } = await payload.find({
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
        ...(activeSpecies
          ? [
              {
                species: {
                  equals: activeSpecies,
                },
              },
            ]
          : []),
        ...(activeSex
          ? [
              {
                sex: {
                  equals: activeSex,
                },
              },
            ]
          : []),
        ...(activeSize
          ? [
              {
                size: {
                  equals: activeSize,
                },
              },
            ]
          : []),
      ],
    },
  });
  const docs = activeAge
    ? initialDocs.filter((animal) => inferAgeGroup(animal.age) === activeAge)
    : initialDocs;

  return (
    <div className="space-y-8">
      <section className="rounded-[2rem] border border-[var(--line)] bg-[var(--surface)] p-8 shadow-[var(--shadow)]">
        <p className="text-sm font-semibold uppercase tracking-[0.22em] text-[var(--olive)]">
          {t.adoptionList.pageEyebrow}
        </p>
        <h1 className="display-font mt-3 text-5xl leading-none">
          {t.adoptionList.heading(activeSpecies)}
        </h1>
        <p className="mt-4 max-w-2xl text-base leading-7 text-[var(--muted)]">
          {t.adoptionList.pageText}
        </p>

        <div className="mt-8 space-y-4">
          <div className="flex flex-wrap items-center gap-3">
            <Link
              className={`rounded-full px-4 py-2 text-sm font-semibold transition ${
                !activeSpecies
                  ? "bg-[var(--coral)] text-white"
                  : "border border-[var(--line)] bg-white/80"
              }`}
              href="/adopta"
            >
              {t.common.all}
            </Link>
            <Link
              className={`rounded-full px-4 py-2 text-sm font-semibold transition ${
                activeSpecies === "perro"
                  ? "bg-[var(--coral)] text-white"
                  : "border border-[var(--line)] bg-white/80"
              }`}
              href="/adopta?species=perro"
            >
              {t.common.dogs}
            </Link>
            <Link
              className={`rounded-full px-4 py-2 text-sm font-semibold transition ${
                activeSpecies === "gato"
                  ? "bg-[var(--coral)] text-white"
                  : "border border-[var(--line)] bg-white/80"
              }`}
              href="/adopta?species=gato"
            >
              {t.common.gatos}
            </Link>
          </div>

          <details className="rounded-[1.5rem] border border-[var(--line)] bg-white/75 px-5 py-4">
            <summary className="cursor-pointer list-none text-sm font-semibold text-[var(--muted)]">
              {t.common.moreFilters}
            </summary>

            <form
              action="/adopta"
              className="mt-4 grid gap-4 md:grid-cols-2 xl:grid-cols-4"
              method="get"
            >
              <input name="species" type="hidden" value={activeSpecies || ""} />

              <label className="text-sm">
                <span className="mb-2 block font-semibold text-[var(--muted)]">
                  {t.common.size}
                </span>
                <select
                  className="w-full rounded-2xl border border-[var(--line)] bg-white px-4 py-3"
                  defaultValue={activeSize || ""}
                  name="size"
                >
                  <option value="">{t.common.all}</option>
                  <option value="pequeno">{sizeLabels.pequeno}</option>
                  <option value="mediano">{sizeLabels.mediano}</option>
                  <option value="grande">{sizeLabels.grande}</option>
                </select>
              </label>

              <label className="text-sm">
                <span className="mb-2 block font-semibold text-[var(--muted)]">
                  {t.common.sex}
                </span>
                <select
                  className="w-full rounded-2xl border border-[var(--line)] bg-white px-4 py-3"
                  defaultValue={activeSex || ""}
                  name="sex"
                >
                  <option value="">{t.common.all}</option>
                  <option value="macho">{sexLabels.macho}</option>
                  <option value="hembra">{sexLabels.hembra}</option>
                </select>
              </label>

              <label className="text-sm">
                <span className="mb-2 block font-semibold text-[var(--muted)]">
                  {t.common.age}
                </span>
                <select
                  className="w-full rounded-2xl border border-[var(--line)] bg-white px-4 py-3"
                  defaultValue={activeAge || ""}
                  name="age"
                >
                  <option value="">{t.adoptionList.allFemale}</option>
                  <option value="cachorro">{ageGroupLabels.cachorro}</option>
                  <option value="joven">{ageGroupLabels.joven}</option>
                  <option value="adulto">{ageGroupLabels.adulto}</option>
                  <option value="senior">{ageGroupLabels.senior}</option>
                </select>
              </label>

              <div className="flex items-end gap-3">
                <button
                  className="inline-flex rounded-full bg-[var(--olive-deep)] px-5 py-3 text-sm font-semibold text-white"
                  type="submit"
                >
                  {t.common.apply}
                </button>
                <Link
                  className="inline-flex rounded-full border border-[var(--line-strong)] px-5 py-3 text-sm font-semibold"
                  href={activeSpecies ? `/adopta?species=${activeSpecies}` : "/adopta"}
                >
                  {t.common.clear}
                </Link>
              </div>
            </form>
          </details>
        </div>

        {activeSpecies || activeSize || activeSex || activeAge ? (
          <div className="mt-5 flex flex-wrap gap-3 text-sm">
            {activeSpecies ? (
              <span className="rounded-full border border-[var(--line)] bg-white/80 px-4 py-2">
                {activeSpecies === "perro" ? t.common.dogs : t.common.gatos}
              </span>
            ) : null}
            {activeSize ? (
              <span className="rounded-full border border-[var(--line)] bg-white/80 px-4 py-2">
                {sizeLabels[activeSize]}
              </span>
            ) : null}
            {activeSex ? (
              <span className="rounded-full border border-[var(--line)] bg-white/80 px-4 py-2">
                {sexLabels[activeSex]}
              </span>
            ) : null}
            {activeAge ? (
              <span className="rounded-full border border-[var(--line)] bg-white/80 px-4 py-2">
                {ageGroupLabels[activeAge]}
              </span>
            ) : null}
            <span className="rounded-full bg-[rgba(216,195,224,0.24)] px-4 py-2 font-semibold text-[var(--olive-deep)]">
              {t.common.results(docs.length)}
            </span>
          </div>
        ) : null}
      </section>

      {docs.length === 0 ? (
        <section className="rounded-[2rem] border border-dashed border-[var(--line-strong)] bg-white/70 p-10 text-center shadow-[var(--shadow)]">
          <p className="display-font text-3xl">{t.adoptionList.emptyTitle}</p>
          <p className="mx-auto mt-4 max-w-xl text-sm leading-7 text-[var(--muted)]">
            {t.adoptionList.emptyText}
          </p>
          {/* Use a hard navigation to keep the public app from preloading the Payload admin bundle. */}
          {/* eslint-disable-next-line @next/next/no-html-link-for-pages */}
          <a
            className="mt-6 inline-flex rounded-full bg-[var(--coral)] px-5 py-3 text-sm font-semibold text-white"
            href="/admin"
          >
            {t.adoptionList.emptyButton}
          </a>
        </section>
      ) : (
        <section className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
          {docs.map((animal) => (
            <AnimalCard
              key={animal.id}
              animal={animal}
              ctaLabel={t.adoptionList.cta(animal.name || "Animal")}
              href={`/adopta/${animal.slug}`}
              locale={locale}
            />
          ))}
        </section>
      )}
    </div>
  );
}
