import Link from "next/link";

import type { AdoptionGuidePage as AdoptionGuidePageContent } from "@/lib/adoption-guides";

type AdoptionReadinessPageProps = {
  content: AdoptionGuidePageContent;
};

const questionStyles = [
  "bg-[linear-gradient(145deg,rgba(240,196,173,0.40),rgba(255,250,247,0.94))]",
  "bg-[linear-gradient(145deg,rgba(216,195,224,0.36),rgba(255,250,247,0.94))]",
  "bg-[linear-gradient(145deg,rgba(148,172,137,0.20),rgba(255,250,247,0.94))]",
];

export function AdoptionReadinessPage({ content }: AdoptionReadinessPageProps) {
  const featuredItems = content.featured?.items || [];
  const leadItems = content.items.slice(0, 2);
  const compactItems = content.items.slice(2, 5);
  const remainingItems = content.items.slice(5);

  return (
    <div className="space-y-8">
      <section className="overflow-hidden rounded-[2.4rem] border border-[var(--line)] bg-[radial-gradient(circle_at_18%_0%,rgba(240,196,173,0.72),transparent_32%),linear-gradient(135deg,rgba(255,250,247,0.98),rgba(246,239,231,0.86))] shadow-[var(--shadow)]">
        <div className="grid gap-8 p-8 lg:grid-cols-[1.05fr_0.95fr] lg:p-10">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.24em] text-[var(--olive)]">
              {content.eyebrow}
            </p>
            <h1 className="display-font mt-4 max-w-4xl text-5xl leading-none sm:text-7xl">
              {content.title}
            </h1>
            <p className="mt-6 max-w-2xl text-base leading-8 text-[var(--muted)]">
              {content.intro}
            </p>
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

          {content.featured ? (
            <aside className="rounded-[2rem] border border-white/70 bg-white/72 p-6 shadow-[0_20px_70px_rgba(111,83,100,0.12)] backdrop-blur">
              <p className="text-sm font-semibold uppercase tracking-[0.18em] text-[var(--olive)]">
                Antes de decidir
              </p>
              <h2 className="display-font mt-3 text-4xl leading-none">
                {content.featured.title}
              </h2>
              <p className="mt-5 text-sm leading-8 text-[var(--muted)]">
                {content.featured.body}
              </p>
              <div className="mt-6 grid gap-3">
                {featuredItems.map((item) => (
                  <div
                    className="flex items-center gap-3 rounded-2xl bg-[rgba(255,255,255,0.72)] p-3"
                    key={item}
                  >
                    <span className="h-2.5 w-2.5 shrink-0 rounded-full bg-[var(--coral)]" />
                    <span className="text-sm font-semibold text-[var(--foreground)]">{item}</span>
                  </div>
                ))}
              </div>
            </aside>
          ) : null}
        </div>
      </section>

      <section className="grid gap-5 xl:grid-cols-[1.1fr_0.9fr]">
        <div className="grid gap-5 md:grid-cols-2">
          {leadItems.map((item, index) => (
            <article
              className={`rounded-[2.1rem] border border-[var(--line)] p-7 shadow-[var(--shadow)] ${questionStyles[index % questionStyles.length]}`}
              key={item.title}
            >
              {item.highlight ? (
                <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[var(--olive)]">
                  {item.highlight}
                </p>
              ) : null}
              <h2 className="display-font mt-4 text-4xl leading-none">{item.title}</h2>
              <p className="mt-5 text-sm leading-8 text-[var(--muted)]">{item.body}</p>
            </article>
          ))}
        </div>

        <aside className="rounded-[2.1rem] border border-[var(--line)] bg-[var(--olive-deep)] p-7 text-white shadow-[var(--shadow)]">
          <p className="text-sm font-semibold uppercase tracking-[0.2em] opacity-75">
            Señales importantes
          </p>
          <h2 className="display-font mt-3 text-4xl leading-none">
            Si una respuesta te incomoda, merece la pena pararse
          </h2>
          <div className="mt-6 grid gap-3">
            {compactItems.map((item) => (
              <article className="rounded-[1.4rem] bg-white/12 p-4" key={item.title}>
                {item.highlight ? (
                  <p className="text-xs font-semibold uppercase tracking-[0.14em] opacity-72">
                    {item.highlight}
                  </p>
                ) : null}
                <h3 className="mt-2 text-base font-bold leading-snug">{item.title}</h3>
                <p className="mt-2 text-sm leading-7 opacity-82">{item.body}</p>
              </article>
            ))}
          </div>
        </aside>
      </section>

      <section className="overflow-hidden rounded-[2rem] border border-[var(--line)] bg-[var(--surface)] shadow-[var(--shadow)]">
        <div className="grid border-b border-[var(--line)] p-7 lg:grid-cols-[0.45fr_1fr]">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-[var(--olive)]">
              Preguntas incómodas, adopciones mejores
            </p>
            <h2 className="display-font mt-3 text-4xl leading-none">Lee sin prisa</h2>
          </div>
          <p className="mt-4 text-sm leading-8 text-[var(--muted)] lg:mt-0">
            Estas preguntas no buscan desanimar. Buscan que el animal no vuelva a pasar por una
            devolución, un abandono o una convivencia que nadie preparó bien.
          </p>
        </div>

        <div className="divide-y divide-[var(--line)]">
          {remainingItems.map((item) => (
            <article className="grid gap-4 p-7 md:grid-cols-[0.25fr_1fr]" key={item.title}>
              <div>
                {item.highlight ? (
                  <span className="rounded-full bg-[rgba(216,195,224,0.32)] px-3 py-1 text-xs font-semibold uppercase tracking-[0.14em] text-[var(--olive-deep)]">
                    {item.highlight}
                  </span>
                ) : null}
              </div>
              <div>
                <h3 className="display-font text-3xl leading-none">{item.title}</h3>
                <p className="mt-4 text-[0.95rem] leading-8 text-[var(--muted)]">{item.body}</p>
              </div>
            </article>
          ))}
        </div>
      </section>
    </div>
  );
}
