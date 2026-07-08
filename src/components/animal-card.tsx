import Image from "next/image";
import Link from "next/link";

import {
  formatAnimalValue,
  formatDate,
  getSizeLabels,
  getSpeciesLabels,
  getStatusLabels,
  statusTone,
} from "@/lib/animals";
import { getDictionary, type Locale } from "@/lib/i18n";
import { getMedia } from "@/lib/media";
import { calculateAge } from "@/lib/dateUtils";

type AnimalCardProps = {
  animal: {
    adoptionDate?: string | null;
    age?: string | null;
    coverImage?: unknown;
    id: number | string;
    location?: string | null;
    name?: string | null;
    size?: string | null;
    slug?: string | null;
    species?: string | null;
    status?: string | null;
    summary?: string | null;
  };
  ctaLabel: string;
  href: string;
  locale: Locale;
  variant?: "adoption" | "success";
};

export const AnimalCard = ({
  animal,
  ctaLabel,
  href,
  locale,
  variant = "adoption",
}: AnimalCardProps) => {
  const t = getDictionary(locale);
  const sizeLabels = getSizeLabels(locale);
  const speciesLabels = getSpeciesLabels(locale);
  const statusLabels = getStatusLabels(locale);
  const ageDisplay = typeof animal.age === "string" ? calculateAge(animal.age) : null;
  const cover = getMedia(animal.coverImage);
  const name = animal.name || "Animal";
  const status = animal.status || "";
  const summary = animal.summary || t.common.recentStory;
  const aspectRatio =
    cover?.width && cover?.height ? cover.width / cover.height : null;
  const isPortrait = aspectRatio !== null && aspectRatio < 0.95;
  const isSquare = aspectRatio !== null && aspectRatio >= 0.95 && aspectRatio < 1.15;
  const meta =
    variant === "success"
      ? formatDate(animal.adoptionDate, locale) || t.common.recentStory
      : [
          formatAnimalValue(animal.species, speciesLabels),
          ageDisplay,
          formatAnimalValue(animal.size, sizeLabels),
        ]
          .filter(Boolean)
          .join(" . ");

  return (
    <article className="surface-lift overflow-hidden rounded-[1.75rem] border border-[var(--line)] bg-[var(--surface)] shadow-[var(--shadow)]">
      <div className="relative h-64 overflow-hidden bg-[rgba(240,196,173,0.32)]">
        {cover?.url ? (
          isPortrait ? (
            <>
              <Image
                alt=""
                aria-hidden
                className="scale-110 object-cover blur-2xl opacity-30"
                fill
                sizes="(max-width: 1024px) 100vw, 33vw"
                src={cover.url}
              />
              <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(255,255,255,0.12),rgba(255,255,255,0.32))]" />
              <Image
                alt={cover.alt || name}
                className="object-contain p-4"
                fill
                sizes="(max-width: 1024px) 100vw, 33vw"
                src={cover.url}
              />
            </>
          ) : (
            <Image
              alt={cover.alt || name}
              className={isSquare ? "object-cover object-center" : "object-cover"}
              fill
              sizes="(max-width: 1024px) 100vw, 33vw"
              src={cover.url}
            />
          )
        ) : (
          <div className="flex h-full items-center justify-center text-sm text-[var(--muted)]">
            {t.common.imagePending}
          </div>
        )}
      </div>

      <div className="space-y-4 p-6">
        <div className="flex items-start justify-between gap-3">
          <div>
            <h3 className="display-font text-3xl leading-none">{name}</h3>
            {meta ? <p className="mt-2 text-sm text-[var(--muted)]">{meta}</p> : null}
          </div>
          <span
            className={`rounded-full px-3 py-1 text-xs font-semibold uppercase tracking-[0.15em] ${statusTone[status] || "bg-[rgba(111,83,100,0.12)] text-[var(--foreground)]"}`}
          >
            {statusLabels[status] || status || t.common.published}
          </span>
        </div>

        <p className="text-sm leading-7 text-[var(--muted)]">{summary}</p>

        <div className="flex flex-wrap gap-3">
          <Link
            className={`button-soft inline-flex rounded-full px-4 py-2 text-sm font-semibold ${
              variant === "success"
                ? "bg-[var(--olive-deep)] text-white"
                : "bg-[var(--coral)] text-white"
            }`}
            href={href}
          >
            {ctaLabel}
          </Link>
          {variant === "adoption" && animal.location ? (
            <span className="inline-flex rounded-full border border-[var(--line-strong)] px-4 py-2 text-sm text-[var(--muted)]">
              {animal.location}
            </span>
          ) : null}
        </div>
      </div>
    </article>
  );
};
