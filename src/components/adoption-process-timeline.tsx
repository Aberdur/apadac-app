import Link from "next/link";

import type { AdoptionGuidePage as AdoptionGuidePageContent } from "@/lib/adoption-guides";

type AdoptionProcessTimelineProps = {
  content: AdoptionGuidePageContent;
};

export function AdoptionProcessTimeline({ content }: AdoptionProcessTimelineProps) {
  const phaseLabels = content.ui?.phases || ["Primer contacto", "Valoración", "Adopción", "Después"];

  return (
    <div className="space-y-8">
      <section className="grid gap-6 rounded-[2.4rem] border border-[var(--line)] bg-[linear-gradient(135deg,rgba(111,83,100,0.96),rgba(185,121,101,0.86))] p-8 text-white shadow-[var(--shadow)] lg:grid-cols-[1fr_0.8fr] lg:p-10">
        <div>
          <p className="text-sm font-semibold uppercase tracking-[0.24em] opacity-75">
            {content.eyebrow}
          </p>
          <h1 className="display-font mt-4 text-5xl leading-none sm:text-7xl">{content.title}</h1>
          <p className="mt-6 max-w-3xl text-base leading-8 opacity-86">{content.intro}</p>
          <div className="mt-7 flex flex-wrap gap-3">
            <Link
              className="button-soft inline-flex rounded-full bg-white px-5 py-3 text-sm font-semibold shadow-[0_14px_36px_rgba(0,0,0,0.16)]"
              href={content.ctaHref}
              style={{ color: "var(--olive-deep)" }}
            >
              {content.ctaLabel}
            </Link>
            {content.secondaryHref && content.secondaryLabel ? (
              <Link
                className="button-soft inline-flex rounded-full border border-white/35 px-5 py-3 text-sm font-semibold text-white"
                href={content.secondaryHref}
              >
                {content.secondaryLabel}
              </Link>
            ) : null}
          </div>
        </div>

        {content.featured ? (
          <aside className="rounded-[2rem] border border-white/18 bg-white/12 p-6 backdrop-blur">
            <h2 className="display-font text-4xl leading-none">{content.featured.title}</h2>
            <p className="mt-5 text-sm leading-8 opacity-86">{content.featured.body}</p>
            <div className="mt-6 grid gap-3">
              {content.featured.items.map((item) => (
                <div className="rounded-2xl bg-white/14 px-4 py-3 text-sm font-semibold" key={item}>
                  {item}
                </div>
              ))}
            </div>
          </aside>
        ) : null}
      </section>

      <section className="grid gap-4 md:grid-cols-4">
        {phaseLabels.map((label) => (
          <div
            className="rounded-[1.5rem] border border-[var(--line)] bg-white/72 p-5 shadow-[0_14px_45px_rgba(111,83,100,0.08)]"
            key={label}
          >
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[var(--olive)]">
              {content.ui?.phaseLabel || "Fase"}
            </p>
            <p className="display-font mt-2 text-2xl leading-none">{label}</p>
          </div>
        ))}
      </section>

      <section className="rounded-[2rem] border border-[var(--line)] bg-[var(--surface)] p-6 shadow-[var(--shadow)] lg:p-8">
        <div className="mb-8 max-w-2xl">
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-[var(--olive)]">
            {content.ui?.timelineEyebrow || "Ruta de adopción"}
          </p>
          <h2 className="display-font mt-3 text-4xl leading-none">
            {content.ui?.timelineTitle || "Qué ocurre desde el primer contacto hasta el seguimiento"}
          </h2>
        </div>

        <div className="relative space-y-6 before:absolute before:left-5 before:top-3 before:h-[calc(100%-1.5rem)] before:w-px before:bg-[var(--line-strong)] md:before:left-1/2">
          {content.items.map((item, index) => (
            <article
              className={`relative grid gap-5 md:grid-cols-2 ${index % 2 === 0 ? "" : "md:[&>div]:col-start-2"}`}
              key={item.title}
            >
              <span className="absolute left-0 top-2 z-10 flex h-10 w-10 items-center justify-center rounded-full border border-[var(--line-strong)] bg-[var(--surface-strong)] text-[var(--olive-deep)] md:left-1/2 md:-translate-x-1/2">
                <svg
                  aria-hidden="true"
                  className="h-4 w-4"
                  fill="none"
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2.2"
                  viewBox="0 0 16 16"
                >
                  <path d="m3.5 8.5 3 3 6-7" />
                </svg>
              </span>
              <div className="ml-14 rounded-[1.75rem] border border-[var(--line)] bg-white/76 p-6 shadow-[0_18px_55px_rgba(111,83,100,0.08)] md:ml-0">
                {item.highlight ? (
                  <span className="rounded-full bg-[rgba(240,196,173,0.36)] px-3 py-1 text-xs font-semibold uppercase tracking-[0.14em] text-[var(--olive-deep)]">
                    {item.highlight}
                  </span>
                ) : null}
                <h3 className="display-font mt-4 text-3xl leading-none">{item.title}</h3>
                <p className="mt-4 text-sm leading-8 text-[var(--muted)]">{item.body}</p>
              </div>
            </article>
          ))}
        </div>
      </section>
    </div>
  );
}