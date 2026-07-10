import Link from "next/link";

import type { AdoptionGuidePage as AdoptionGuidePageContent } from "@/lib/adoption-guides";

type PreAdoptionQuestionnaireOverviewProps = {
  content: AdoptionGuidePageContent;
};

const copyByLocale = {
  es: {
    focusAreas: [
      "Quién eres y cómo contactarte",
      "Dónde vivirá el animal",
      "Rutina, vacaciones y tiempo solo",
      "Experiencia, convivencia y expectativas",
    ],
    beforeStart: "Antes de empezar",
    keepHandy: "Ten a mano",
  },
  en: {
    focusAreas: [
      "Who you are and how to contact you",
      "Where the animal will live",
      "Routine, holidays, and time alone",
      "Experience, coexistence, and expectations",
    ],
    beforeStart: "Before you start",
    keepHandy: "Keep handy",
  },
  de: {
    focusAreas: [
      "Wer du bist und wie wir dich erreichen",
      "Wo das Tier leben wird",
      "Alltag, Urlaub und Zeit allein",
      "Erfahrung, Zusammenleben und Erwartungen",
    ],
    beforeStart: "Bevor du beginnst",
    keepHandy: "Bereithalten",
  },
};

export function PreAdoptionQuestionnaireOverview({
  content,
}: PreAdoptionQuestionnaireOverviewProps) {
  
  const isEn = content.eyebrow === "Pre-adoption form";
  const isDe = content.eyebrow === "Voranfrage";
  const locale = isEn ? "en" : isDe ? "de" : "es";
  const copy = copyByLocale[locale];

  return (
    <div className="space-y-8">
      <section className="overflow-hidden rounded-[2.4rem] border border-[var(--line)] bg-[linear-gradient(135deg,rgba(255,250,247,0.98),rgba(216,195,224,0.28))] shadow-[var(--shadow)]">
        <div className="grid gap-8 p-8 lg:grid-cols-[0.9fr_1.1fr] lg:p-10">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.24em] text-[var(--olive)]">
              {content.eyebrow}
            </p>
            <h1 className="display-font mt-4 text-5xl leading-none sm:text-7xl">
              {content.title}
            </h1>
            <p className="mt-6 text-base leading-8 text-[var(--muted)]">{content.intro}</p>
            <div className="mt-7 flex flex-wrap gap-3">
              <Link
                className="button-soft inline-flex rounded-full bg-[var(--coral)] px-5 py-3 text-sm font-semibold text-white"
                href={content.ctaHref}
              >
                {content.ctaLabel}
              </Link>
              {content.secondaryHref && content.secondaryLabel ? (
                <Link
                  className="button-soft inline-flex rounded-full border border-[var(--line-strong)] bg-white/75 px-5 py-3 text-sm font-semibold"
                  href={content.secondaryHref}
                >
                  {content.secondaryLabel}
                </Link>
              ) : null}
            </div>
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            {copy.focusAreas.map((area) => (
              <article
                className="rounded-[1.75rem] border border-white/80 bg-white/70 p-5 shadow-[0_16px_50px_rgba(111,83,100,0.09)]"
                key={area}
              >
                <span className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-[rgba(240,196,173,0.42)] text-[var(--olive-deep)]">
                  <svg
                    aria-hidden="true"
                    className="h-5 w-5"
                    fill="none"
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    viewBox="0 0 16 16"
                  >
                    <path d="m3.5 8.5 3 3 6-7" />
                  </svg>
                </span>
                <h2 className="mt-4 text-lg font-bold leading-tight">{area}</h2>
              </article>
            ))}
          </div>
        </div>
      </section>

      {content.featured ? (
        <section className="grid gap-5 lg:grid-cols-[1fr_0.9fr]">
          <article className="rounded-[2rem] border border-[var(--line)] bg-[var(--surface)] p-7 shadow-[var(--shadow)]">
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-[var(--olive)]">
              {copy.beforeStart}
            </p>
            <h2 className="display-font mt-3 text-4xl leading-none">{content.featured.title}</h2>
            <p className="mt-5 text-sm leading-8 text-[var(--muted)]">{content.featured.body}</p>
          </article>
          <div className="rounded-[2rem] border border-[var(--line)] bg-[var(--olive-deep)] p-7 text-white shadow-[var(--shadow)]">
            <p className="text-sm font-semibold uppercase tracking-[0.2em] opacity-75">
              {copy.keepHandy}
            </p>
            <div className="mt-5 grid gap-3">
              {content.featured.items.map((item) => (
                <div className="rounded-2xl bg-white/12 px-4 py-3 text-sm font-semibold" key={item}>
                  {item}
                </div>
              ))}
            </div>
          </div>
        </section>
      ) : null}

      <section className="grid gap-5 md:grid-cols-3">
        {content.items.map((item) => (
          <article
            className="rounded-[1.75rem] border border-[var(--line)] bg-white/76 p-6 shadow-[0_16px_50px_rgba(111,83,100,0.08)]"
            key={item.title}
          >
            <h2 className="display-font text-3xl leading-none">{item.title}</h2>
            <p className="mt-4 text-sm leading-8 text-[var(--muted)]">{item.body}</p>
          </article>
        ))}
      </section>
    </div>
  );
}