import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { calculateAge } from "@/lib/dateUtils";

import { AdoptionInquiryForm } from "@/components/adoption-inquiry-form";
import {
  formatAnimalValue,
  formatDate,
  getEnergyLabels,
  getSexLabels,
  getSizeLabels,
  getSpeciesLabels,
  getStatusLabels,
  publicVisibleStatuses,
  statusTone,
  successStatus,
} from "@/lib/animals";
import { getAdminSession } from "@/lib/auth";
import { getDictionary } from "@/lib/i18n";
import { getLocale } from "@/lib/i18n-server";
import { getMedia } from "@/lib/media";
import { getCMS } from "@/lib/payload";

type Args = {
  params: Promise<{
    slug: string;
  }>;
};

export default async function AnimalPage({ params }: Args) {
  const { slug } = await params;
  const locale = await getLocale();
  const t = getDictionary(locale);
  const fallbackAnimalName = locale === "de" ? "Tier" : locale === "en" ? "Animal" : "Animal";
  const energyLabels = getEnergyLabels(locale);
  const sexLabels = getSexLabels(locale);
  const sizeLabels = getSizeLabels(locale);
  const speciesLabels = getSpeciesLabels(locale);
  const statusLabels = getStatusLabels(locale);
  const [payload, adminSession] = await Promise.all([getCMS(), getAdminSession()]);
  const { docs } = await payload.find({
    collection: "animals",
    depth: 1,
    limit: 1,
    where: {
      slug: {
        equals: slug,
      },
    },
  });

  const animal = docs[0];

  if (!animal) {
    notFound();
  }

  if (!adminSession.canEditAnimals && !publicVisibleStatuses.includes(animal.status)) {
    notFound();
  }

  const cover = getMedia(animal.coverImage);
  const galleryImages = Array.isArray(animal.gallery)
    ? animal.gallery
        .map((item) => getMedia(item))
        .filter(
          (item): item is NonNullable<ReturnType<typeof getMedia>> =>
            Boolean(item?.url && item.url !== cover?.url),
        )
    : [];
  const isAdopted = animal.status === successStatus;
  const contactHref = "/como-ayudar#contacto";
  const editHref = `${payload.config.routes.admin}/collections/animals/${animal.id}`;
  const animalName = animal.name || fallbackAnimalName;
  const ageDisplay = typeof animal.age === "string" ? calculateAge(animal.age) : null;
  const factItems = [
    {
      label: t.animal.facts.species,
      value: formatAnimalValue(animal.species, speciesLabels),
    },
    {
      label: t.animal.facts.sex,
      value: formatAnimalValue(animal.sex, sexLabels),
    },
    {
      label: t.animal.facts.age,
      value: ageDisplay,
    },
    {
      label: t.animal.facts.size,
      value: formatAnimalValue(animal.size, sizeLabels),
    },
    {
      label: t.animal.facts.breed,
      value: animal.breed,
    },
    {
      label: t.animal.facts.location,
      value: animal.location,
    },
    {
      label: t.animal.facts.energy,
      value: formatAnimalValue(animal.energyLevel, energyLabels),
    },
    {
      label: t.animal.facts.sponsor,
      value: animal.sponsored ? t.animal.sponsorStateYes : t.animal.sponsorStateNo,
    },
  ].filter((item) => Boolean(item.value));
  const careTags = [
    animal.vaccinated ? t.animal.tags.vaccinated : null,
    animal.sterilized ? t.animal.tags.sterilized : null,
    animal.specialNeeds ? t.animal.tags.specialNeeds : null,
  ].filter(Boolean);
  const compatibilityTags = [
    animal.goodWithDogs ? t.animal.tags.goodWithDogs : null,
    animal.goodWithCats ? t.animal.tags.goodWithCats : null,
    animal.goodWithKids ? t.animal.tags.goodWithKids : null,
  ].filter(Boolean);
  const detailSections = [
    {
      body: animal.temperament,
      title: t.animal.detailsCharacter,
    },
    {
      body: animal.health,
      title: t.animal.detailsHealth,
    },
    {
      body: animal.adoptionRequirements,
      title: t.animal.detailsAdoption,
    },
  ].filter((section) => Boolean(section.body));

  return (
    <article className="space-y-8">
      <div className="flex items-center justify-between gap-4">
        <Link
          className="inline-flex rounded-full border border-[var(--line-strong)] bg-white/70 px-4 py-2 text-sm font-semibold text-[var(--muted)]"
          href={isAdopted ? "/casos-de-exito" : "/adopta"}
        >
          {isAdopted ? t.common.backToSuccessCases : t.common.backToAdoptions}
        </Link>
        <div className="flex flex-wrap items-center justify-end gap-3">
          {adminSession.canEditAnimals ? (
            <Link
              className="inline-flex rounded-full border border-[var(--line-strong)] bg-white/80 px-4 py-2 text-sm font-semibold text-[var(--foreground)]"
              href={editHref}
            >
              {t.common.editPanel}
            </Link>
          ) : null}
          <span
            className={`rounded-full px-4 py-2 text-xs font-semibold uppercase tracking-[0.18em] ${statusTone[animal.status] || "bg-[rgba(111,83,100,0.12)] text-[var(--foreground)]"}`}
          >
            {statusLabels[animal.status] || animal.status}
          </span>
        </div>
      </div>

      <section className="grid gap-6 lg:grid-cols-[1fr_0.8fr]">
        <div className="relative min-h-[24rem] overflow-hidden rounded-[2rem] border border-[var(--line)] bg-[rgba(240,196,173,0.32)] shadow-[var(--shadow)]">
          {cover?.url ? (
            <Image
              alt={cover.alt || animalName}
              className="object-cover"
              fill
              sizes="(max-width: 1024px) 100vw, 58vw"
              src={cover.url}
            />
          ) : (
            <div className="flex h-full items-center justify-center text-sm text-[var(--muted)]">
              {t.common.imagePending}
            </div>
          )}
        </div>

        <div className="rounded-[2rem] border border-[var(--line)] bg-[var(--surface)] p-8 shadow-[var(--shadow)]">
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-[var(--olive)]">
            {isAdopted ? t.animal.successCase : t.animal.adoption}
          </p>
          <h1 className="display-font mt-3 text-5xl leading-none">{animalName}</h1>
          <p className="mt-4 text-sm leading-7 text-[var(--muted)]">{animal.summary}</p>

          <div className="mt-6 flex flex-wrap gap-3">
            {isAdopted ? (
              <Link
                className="inline-flex rounded-full bg-[var(--olive-deep)] px-5 py-3 text-sm font-semibold text-white"
                href="/adopta"
              >
                {t.animal.viewOtherAnimals}
              </Link>
            ) : (
              <AdoptionInquiryForm
                animalId={animal.id}
                animalName={animalName}
                locale={locale}
                triggerClassName="inline-flex rounded-full bg-[var(--coral)] px-5 py-3 text-sm font-semibold text-white transition hover:brightness-95"
                triggerLabel={t.animal.adoptThisAnimal(animalName)}
              />
            )}
            <Link
              className="inline-flex rounded-full border border-[var(--line-strong)] px-5 py-3 text-sm font-semibold"
              href={isAdopted ? "/casos-de-exito" : "/adopta"}
            >
              {isAdopted ? t.animal.browseStories : t.animal.browseAnimals}
            </Link>
          </div>

          {isAdopted && animal.adoptionDate ? (
            <p className="mt-5 text-sm font-medium text-[var(--olive-deep)]">
              {t.animal.adoptedOn(formatDate(animal.adoptionDate, locale) || "")}
            </p>
          ) : null}

          <dl className="mt-8 grid gap-4 sm:grid-cols-2">
            {factItems.map((item) => (
              <div key={item.label}>
                <dt className="text-xs font-semibold uppercase tracking-[0.15em] text-[var(--muted)]">
                  {item.label}
                </dt>
                <dd className="mt-1 text-sm">{item.value}</dd>
              </div>
            ))}
          </dl>

          {compatibilityTags.length > 0 ? (
            <div className="mt-8">
              <p className="text-xs font-semibold uppercase tracking-[0.15em] text-[var(--muted)]">
                {t.animal.coexistence}
              </p>
              <div className="mt-3 flex flex-wrap gap-2">
                {compatibilityTags.map((item) => (
                  <span
                    key={item}
                    className="rounded-full bg-[rgba(216,195,224,0.28)] px-3 py-2 text-sm text-[var(--olive-deep)]"
                  >
                    {item}
                  </span>
                ))}
              </div>
            </div>
          ) : null}

          {careTags.length > 0 ? (
            <div className="mt-6">
              <p className="text-xs font-semibold uppercase tracking-[0.15em] text-[var(--muted)]">
                {t.animal.care}
              </p>
              <div className="mt-3 flex flex-wrap gap-2">
                {careTags.map((item) => (
                  <span
                    key={item}
                    className="rounded-full border border-[var(--line-strong)] px-3 py-2 text-sm text-[var(--foreground)]"
                  >
                    {item}
                  </span>
                ))}
              </div>
            </div>
          ) : null}
        </div>
      </section>

      {galleryImages.length > 0 ? (
        <section className="space-y-4">
          <div className="flex items-end justify-between gap-4">
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.18em] text-[var(--olive)]">
                {t.common.gallery}
              </p>
              <h2 className="display-font mt-2 text-3xl">{t.animal.morePhotos(animalName)}</h2>
            </div>
            {adminSession.canEditAnimals ? (
              <Link
                className="inline-flex rounded-full border border-[var(--line-strong)] bg-white/80 px-4 py-2 text-sm font-semibold text-[var(--foreground)]"
                href={editHref}
              >
                {t.common.addPhotos}
              </Link>
            ) : null}
          </div>

          <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
            {galleryImages.map((image, index) => (
              <div
                key={`${image.url}-${index}`}
                className="relative aspect-[4/3] overflow-hidden rounded-[1.5rem] border border-[var(--line)] bg-[rgba(240,196,173,0.32)] shadow-[var(--shadow)]"
              >
                <Image
                  alt={image.alt || `${animalName} ${index + 1}`}
                  className="object-cover"
                  fill
                  sizes="(max-width: 1280px) 50vw, 33vw"
                  src={image.url || ""}
                />
              </div>
            ))}
          </div>
        </section>
      ) : null}

      {detailSections.length > 0 ? (
        <section className="grid gap-5 lg:grid-cols-3">
          {detailSections.map((section) => (
            <div
              key={section.title}
              className="rounded-[1.75rem] border border-[var(--line)] bg-[var(--surface)] p-6 shadow-[var(--shadow)]"
            >
              <h2 className="display-font text-2xl">{section.title}</h2>
              <p className="mt-3 text-sm leading-7 text-[var(--muted)]">{section.body}</p>
            </div>
          ))}
        </section>
      ) : (
        <section className="rounded-[2rem] border border-[var(--line)] bg-[var(--surface)] p-8 shadow-[var(--shadow)]">
          <h2 className="display-font text-3xl">{t.animal.completeProfile}</h2>
          <p className="mt-4 max-w-2xl text-sm leading-7 text-[var(--muted)]">
            {t.animal.completeProfileText(animalName)}
          </p>
        </section>
      )}

      {!isAdopted ? (
        <section className="rounded-[2rem] border border-[var(--line)] bg-[linear-gradient(180deg,rgba(215,154,160,0.24),rgba(255,248,244,0.92))] p-8 shadow-[var(--shadow)]">
          <p className="text-sm font-semibold uppercase tracking-[0.18em] text-[var(--olive)]">
            {t.animal.adoptionContact}
          </p>
          <h2 className="display-font mt-3 text-4xl">
            {t.animal.adoptionQuestion(animalName)}
          </h2>
          <p className="mt-4 max-w-2xl text-sm leading-7 text-[var(--muted)]">
            {t.animal.adoptionText}
          </p>
          <div className="mt-6 flex flex-wrap gap-3">
            <AdoptionInquiryForm
              animalId={animal.id}
              animalName={animalName}
              locale={locale}
              triggerClassName="inline-flex rounded-full bg-[var(--olive-deep)] px-5 py-3 text-sm font-semibold text-white"
              triggerLabel={t.animal.adoptThisAnimal(animalName)}
            />
            <a
              className="inline-flex rounded-full border border-[var(--line-strong)] bg-white/80 px-5 py-3 text-sm font-semibold"
              href={contactHref}
            >
              {t.animal.writeAbout(animalName)}
            </a>
          </div>
        </section>
      ) : null}

      {isAdopted ? (
        <section className="rounded-[2rem] border border-[var(--line)] bg-[linear-gradient(180deg,rgba(216,195,224,0.34),rgba(255,248,244,0.92))] p-8 shadow-[var(--shadow)]">
          <p className="text-sm font-semibold uppercase tracking-[0.18em] text-[var(--olive)]">
            {t.animal.happyEnding}
          </p>
          <h2 className="display-font mt-3 text-4xl">
            {t.animal.foundFamily(animalName)}
          </h2>
          <p className="mt-4 max-w-2xl text-sm leading-7 text-[var(--muted)]">
            {t.animal.happyEndingText}
          </p>
          <div className="mt-6 flex flex-wrap gap-3">
            <Link
              className="inline-flex rounded-full bg-[var(--olive-deep)] px-5 py-3 text-sm font-semibold text-white"
              href="/adopta"
            >
              {t.common.seeAnimalsInAdoption}
            </Link>
            <Link
              className="inline-flex rounded-full border border-[var(--line-strong)] px-5 py-3 text-sm font-semibold"
              href="/casos-de-exito"
            >
              {t.common.seeAllSuccessCases}
            </Link>
          </div>
        </section>
      ) : null}
    </article>
  );
}
