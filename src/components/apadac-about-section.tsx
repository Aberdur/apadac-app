import Image from "next/image";
import Link from "next/link";

import type { ApadacInfoContent } from "@/lib/apadac-info";

type ApadacAboutSectionProps = {
  content: ApadacInfoContent;
  compact?: boolean;
};

const icons = [
  "M12 21s-7-4.4-7-10a4 4 0 0 1 7-2.6A4 4 0 0 1 19 11c0 5.6-7 10-7 10Z",
  "M4 5h16M6 9h12M8 13h8M10 17h4",
  "M12 3 19 6v5c0 4.6-2.9 8-7 10-4.1-2-7-5.4-7-10V6l7-3Z",
  "M8 12h8M12 8v8M4 12a8 8 0 1 0 16 0 8 8 0 0 0-16 0Z",
  "M5 19V6.5A2.5 2.5 0 0 1 7.5 4H19v12H7.5A2.5 2.5 0 0 0 5 18.5Z",
  "M7 11a3 3 0 1 0 0-6 3 3 0 0 0 0 6ZM17 11a3 3 0 1 0 0-6 3 3 0 0 0 0 6ZM4 20a4 4 0 0 1 8 0M12 20a4 4 0 0 1 8 0",
];

const pawPrints = [
  "left-[8%] top-[18%] rotate-[-18deg] delay-0",
  "left-[22%] top-[34%] rotate-[14deg] delay-150",
  "right-[18%] top-[16%] rotate-[20deg] delay-300",
  "right-[8%] bottom-[22%] rotate-[-12deg] delay-500",
];

const impactStyles = [
  "md:col-span-2 bg-[linear-gradient(135deg,rgba(240,196,173,0.46),rgba(255,250,247,0.96))]",
  "bg-[linear-gradient(135deg,rgba(216,195,224,0.40),rgba(255,250,247,0.96))]",
  "bg-[linear-gradient(135deg,rgba(148,172,137,0.22),rgba(255,250,247,0.96))]",
  "bg-[linear-gradient(135deg,rgba(255,250,247,0.98),rgba(240,196,173,0.30))]",
  "bg-[linear-gradient(135deg,rgba(255,250,247,0.98),rgba(216,195,224,0.34))]",
  "md:col-span-2 bg-[linear-gradient(135deg,rgba(111,83,100,0.96),rgba(185,121,101,0.88))] text-white",
];

const Paw = ({ className }: { className: string }) => (
  <svg
    aria-hidden="true"
    className={`apadac-float absolute h-14 w-14 text-white/35 ${className}`}
    fill="currentColor"
    viewBox="0 0 48 48"
  >
    <circle cx="14" cy="17" r="5" />
    <circle cx="24" cy="12" r="5" />
    <circle cx="34" cy="17" r="5" />
    <circle cx="18" cy="29" r="5" />
    <circle cx="30" cy="29" r="5" />
    <path d="M14 36c0-7 5-13 10-13s10 6 10 13c0 5-4 7-10 7s-10-2-10-7Z" />
  </svg>
);

export function ApadacAboutSection({ compact = false, content }: ApadacAboutSectionProps) {
  const missionCards = compact ? content.missionCards.slice(0, 4) : content.missionCards;
  const TitleTag = compact ? "h2" : "h1";

  return (
    <div className={compact ? "space-y-7" : "space-y-12"}>
      <section className="relative overflow-hidden rounded-[2.7rem] border border-[var(--line)] bg-[linear-gradient(135deg,rgba(111,83,100,0.96),rgba(185,121,101,0.80)_48%,rgba(240,196,173,0.82))] shadow-[var(--shadow)]">
        {pawPrints.map((paw) => (
          <Paw className={paw} key={paw} />
        ))}
        <div className="absolute -right-24 -top-24 h-80 w-80 rounded-full bg-white/18 blur-2xl" />
        <div className="absolute -bottom-28 left-1/3 h-72 w-72 rounded-full bg-[var(--coral)]/24 blur-3xl" />

        <div className="relative grid gap-8 p-8 text-white lg:grid-cols-[1fr_0.9fr] lg:p-10 xl:grid-cols-[1.05fr_0.52fr_0.62fr] xl:items-center">
          <div className="apadac-rise">
            <p className="text-sm font-semibold uppercase tracking-[0.24em] text-[var(--olive)]">
              APADAC
            </p>
            <TitleTag className="display-font mt-4 max-w-3xl text-5xl leading-none sm:text-7xl">
              {content.title}
            </TitleTag>
            <p className="mt-5 max-w-2xl text-lg font-semibold leading-8 text-white/85">
              {content.subtitle}
            </p>
            <p className="mt-5 max-w-3xl text-base leading-8 text-white/75">
              {content.intro}
            </p>
            <div className="mt-7 flex flex-wrap gap-3">
              <Link
                className="button-soft inline-flex rounded-full bg-white px-5 py-3 text-sm font-semibold shadow-[0_18px_50px_rgba(0,0,0,0.18)]"
                href={compact ? "/apadac" : "/como-ayudar"}
                style={{ color: "var(--olive-deep)" }}
              >
                {compact ? "Conocer APADAC" : content.cta}
              </Link>
              {!compact ? (
                <Link
                  className="button-soft inline-flex rounded-full border border-white/30 px-5 py-3 text-sm font-semibold text-white"
                  href="/adopta"
                >
                  Ver animales
                </Link>
              ) : null}
            </div>
          </div>

          <div className="apadac-orbit relative mx-auto flex h-56 w-56 items-center justify-center rounded-full border border-white/24 bg-white/12 backdrop-blur sm:h-64 sm:w-64 lg:self-center xl:h-72 xl:w-72">
            <div className="flex h-36 w-36 items-center justify-center rounded-[2rem] bg-white/88 shadow-[0_24px_80px_rgba(0,0,0,0.22)] sm:h-40 sm:w-40 xl:h-44 xl:w-44">
              <Image
                alt="Logo de APADAC"
                className="h-24 w-24 object-contain sm:h-28 sm:w-28 xl:h-32 xl:w-32"
                height={128}
                src="/logo-apadac-mark.png"
                width={128}
              />
            </div>
          </div>

          <div className="grid min-w-0 gap-3 sm:grid-cols-2 lg:col-start-2 lg:grid-cols-2 xl:col-start-auto">
            {content.stats.map((stat, index) => (
              <article
                className="apadac-stat-card apadac-rise min-w-0 rounded-[1.5rem] border border-white/28 bg-white/16 p-4 text-white shadow-[0_18px_60px_rgba(0,0,0,0.16)] backdrop-blur transition-transform duration-200 hover:-translate-y-1 focus-within:-translate-y-1 sm:p-5"
                key={stat.label}
                style={{ animationDelay: `${index * 120}ms` }}
              >
                <p
                  className="apadac-stat-number display-font text-[clamp(2.15rem,3.35vw,3rem)] leading-none"
                  style={{ animationDelay: `${220 + index * 110}ms` }}
                >
                  {stat.value}
                </p>
                <p className="mt-2 max-w-full text-[0.64rem] font-semibold uppercase leading-5 tracking-[0.12em] text-white/75">
                  {stat.label}
                </p>
              </article>
            ))}
          </div>
        </div>
      </section>

      {!compact ? (
        <section className="grid gap-5 lg:grid-cols-[0.74fr_1.26fr]">
          <aside className="apadac-rise relative overflow-hidden rounded-[2.2rem] border border-[var(--line)] bg-[var(--surface)] p-7 shadow-[var(--shadow)]">
            <div className="absolute -right-16 -top-16 h-40 w-40 rounded-full bg-[var(--sand)]/45" />
            <div className="absolute -bottom-20 left-8 h-40 w-40 rounded-full bg-[var(--coral)]/20" />
            <div className="flex items-center gap-4">
              <Image
                alt="Logo de APADAC"
                className="relative h-20 w-20 rounded-[1.5rem] bg-white/90 object-contain shadow-[0_16px_45px_rgba(111,83,100,0.14)]"
                height={80}
                src="/logo-apadac-mark.png"
                width={80}
              />
              <div>
                <p className="text-sm font-semibold uppercase tracking-[0.2em] text-[var(--olive)]">
                  Desde 2010
                </p>
                <h2 className="display-font mt-1 text-4xl leading-none">Voluntarios</h2>
              </div>
            </div>
            <blockquote className="relative mt-8 text-3xl font-semibold leading-tight text-[var(--olive-deep)]">
              “{content.quote}”
            </blockquote>
            <p className="relative mt-4 text-sm uppercase tracking-[0.18em] text-[var(--muted)]">
              Oscar Wilde
            </p>
          </aside>

          <div className="relative grid gap-4 md:grid-cols-2">
            <div className="pointer-events-none absolute left-6 top-8 hidden h-[calc(100%-4rem)] w-px bg-[var(--line-strong)] md:block" />
            {missionCards.map((card, index) => (
              <article
                className={`apadac-rise surface-lift relative rounded-[1.75rem] border border-[var(--line)] p-6 shadow-[var(--shadow)] ${impactStyles[index % impactStyles.length]}`}
                key={card.title}
                style={{ animationDelay: `${index * 90}ms` }}
              >
                <span className="inline-flex h-12 w-12 items-center justify-center rounded-[1.1rem] bg-white/50 text-[var(--olive-deep)]">
                  <svg
                    aria-hidden="true"
                    className="h-6 w-6"
                    fill="none"
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="1.8"
                    viewBox="0 0 24 24"
                  >
                    <path d={icons[index % icons.length]} />
                  </svg>
                </span>
                <h3 className="display-font mt-5 text-3xl leading-none">{card.title}</h3>
                <p className={`mt-4 text-sm leading-8 ${index === 5 ? "text-white/80" : "text-[var(--muted)]"}`}>
                  {card.body}
                </p>
              </article>
            ))}
          </div>
        </section>
      ) : null}
    </div>
  );
}
