import Link from "next/link";
import { getAdminSession } from "@/lib/auth";
import { getDictionary } from "@/lib/i18n";
import { getLocale } from "@/lib/i18n-server";

export const metadata = {
  title: "How to help | APADAC",
};

const getCollaborationCards = (locale: string) => {
  if (locale === "en") {
    return [
      {
        badge: "Veterinary, food, and emergencies",
        body: "A one-time contribution helps cover treatments, medication, food, deworming, tests, and rescues.",
        cta: "See donation methods",
        eyebrow: "Direct contribution",
        href: "/donaciones#donar",
        icon: "M12 21s-7-4.4-7-10a4 4 0 0 1 7-2.6A4 4 0 0 1 19 11c0 5.6-7 10-7 10Z",
        title: "Donate",
      },
      {
        badge: "Stable monthly support",
        body: "Becoming a member allows us to plan fixed costs and support cases that need care for weeks or months.",
        cta: "Become a member",
        eyebrow: "Ongoing commitment",
        href: "/donaciones#socio",
        icon: "M12 3 19 6v5c0 4.6-2.9 8-7 10-4.1-2-7-5.4-7-10V6l7-3Z",
        title: "Become a member",
      },
      {
        badge: "A temporary home",
        body: "Fostering frees up space, reduces stress, and allows us to get to know the animal better while they wait for adoption.",
        cta: "Become a foster home",
        eyebrow: "Temporary foster",
        href: "/voluntariado#acogida",
        icon: "M4 11.5 12 5l8 6.5V20a1 1 0 0 1-1 1h-5v-6h-4v6H5a1 1 0 0 1-1-1v-8.5Z",
        title: "Foster home",
      },
      {
        badge: "Support with a personal touch",
        body: "Sponsoring helps cover the needs of a specific animal, especially if they require special care.",
        cta: "See sponsorship",
        eyebrow: "For long stays",
        href: "/apadrina",
        icon: "M8 12h8M12 8v8M4 12a8 8 0 1 0 16 0 8 8 0 0 0-16 0Z",
        title: "Sponsor",
      },
      {
        badge: "Time, hands, and presence",
        body: "Walks, transfers, events, cleaning, outreach, or organizational support. Every hour dedicated counts.",
        cta: "Volunteer",
        eyebrow: "Active participation",
        href: "/voluntariado#voluntariado",
        icon: "M7 11a3 3 0 1 0 0-6 3 3 0 0 0 0 6ZM17 11a3 3 0 1 0 0-6 3 3 0 0 0 0 6ZM4 20a4 4 0 0 1 8 0M12 20a4 4 0 0 1 8 0",
        title: "Become a volunteer",
      },
    ];
  }
  return [
    {
      badge: "Veterinario, alimento y urgencias",
      body: "Una aportación puntual ayuda a cubrir tratamientos, medicación, pienso, desparasitaciones, pruebas y rescates.",
      cta: "Ver formas de donar",
      eyebrow: "Aportación directa",
      href: "/donaciones#donar",
      icon: "M12 21s-7-4.4-7-10a4 4 0 0 1 7-2.6A4 4 0 0 1 19 11c0 5.6-7 10-7 10Z",
      title: "Dona",
    },
    {
      badge: "Ayuda estable cada mes",
      body: "Ser socio permite planificar gastos fijos y sostener casos que necesitan atención durante semanas o meses.",
      cta: "Hazte socio",
      eyebrow: "Compromiso continuado",
      href: "/donaciones#socio",
      icon: "M12 3 19 6v5c0 4.6-2.9 8-7 10-4.1-2-7-5.4-7-10V6l7-3Z",
      title: "Hazte socio",
    },
    {
      badge: "Un hogar temporal",
      body: "La acogida libera espacio, reduce estrés y permite conocer mejor al animal mientras aparece una adopción.",
      cta: "Ser casa de acogida",
      eyebrow: "Acogida temporal",
      href: "/voluntariado#acogida",
      icon: "M4 11.5 12 5l8 6.5V20a1 1 0 0 1-1 1h-5v-6h-4v6H5a1 1 0 0 1-1-1v-8.5Z",
      title: "Casa de acogida",
    },
    {
      badge: "Apoyo con nombre propio",
      body: "Apadrinar ayuda a cubrir necesidades de un animal concreto, especialmente si requiere cuidados especiales.",
      cta: "Ver apadrinamiento",
      eyebrow: "Para largas estancias",
      href: "/apadrina",
      icon: "M8 12h8M12 8v8M4 12a8 8 0 1 0 16 0 8 8 0 0 0-16 0Z",
      title: "Apadrina",
    },
    {
      badge: "Tiempo, manos y presencia",
      body: "Paseos, traslados, eventos, limpieza, difusión o apoyo organizativo. Cada hora dedicada cuenta.",
      cta: "Hacer voluntariado",
      eyebrow: "Participación activa",
      href: "/voluntariado#voluntariado",
      icon: "M7 11a3 3 0 1 0 0-6 3 3 0 0 0 0 6ZM17 11a3 3 0 1 0 0-6 3 3 0 0 0 0 6ZM4 20a4 4 0 0 1 8 0M12 20a4 4 0 0 1 8 0",
      title: "Hazte voluntario",
    },
  ];
};

export default async function HelpPage() {
  const locale = await getLocale();
  const t = getDictionary(locale);
  const session = await getAdminSession();
  const collaborationCards = getCollaborationCards(locale);

  return (
    <div className="space-y-10 mb-16">
      <section className="rounded-[2rem] border border-[var(--line)] bg-[var(--surface-strong)] px-8 py-10 shadow-[var(--shadow)] sm:px-12">
        <div className="mx-auto max-w-4xl text-center">
          <p className="text-sm font-semibold uppercase tracking-[0.22em] text-[var(--olive)]">
            {t.help.pageEyebrow}
          </p>
          <h1 className="display-font mt-4 text-4xl leading-[0.98] sm:text-5xl">
            {t.help.pageTitle}
          </h1>
          <p className="mx-auto mt-5 max-w-3xl text-base leading-8 text-[var(--muted)]">
            {t.help.pageText}
          </p>

          <div className="mt-8 flex flex-wrap justify-center gap-3">
            <a
              className="button-soft rounded-full bg-[var(--coral)] px-6 py-3 text-sm font-semibold text-white"
              href="#vias"
            >
              {t.help.viewOptions}
            </a>
            <Link
              className="button-soft rounded-full border border-[var(--line-strong)] bg-white px-6 py-3 text-sm font-semibold"
              href="/contacto"
            >
              {t.common.contact}
            </Link>
          </div>

          {session?.canEditHelpContent && (
            <div className="mt-4">
              <a className="text-sm font-semibold text-[var(--muted)] underline underline-offset-4" href="/admin/globals/como-ayudar">
                {t.common.editContent}
              </a>
            </div>
          )}
        </div>
      </section>

      {/* HUB GRIDS */}
      <section className="space-y-6" id="vias">
        <div className="rounded-[2.4rem] border border-[var(--line)] bg-[linear-gradient(135deg,rgba(111,83,100,0.96),rgba(185,121,101,0.78)_45%,rgba(240,196,173,0.72))] p-6 text-white shadow-[var(--shadow)] sm:p-8">
          <div className="grid gap-8 lg:grid-cols-[0.78fr_1.22fr] lg:items-end">
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.24em] text-[var(--sand)]">
                {t.help.optionsEyebrow}
              </p>
              <h2 className="display-font mt-3 text-5xl leading-none sm:text-6xl">
                {locale === "en" ? "Help in your own way" : "Colabora a tu manera"}
              </h2>
              <p className="mt-5 max-w-xl text-sm leading-7 text-white/78">
                {locale === "en" 
                  ? "Not everyone can adopt, but almost everyone can help in some way. Choose the path that suits you and APADAC will guide you."
                  : "No todo el mundo puede adoptar, pero casi todo el mundo puede ayudar de alguna forma. Elige la vía que encaje contigo y APADAC te orientará."}
              </p>
            </div>

            <div className="grid gap-3 sm:grid-cols-2">
              {collaborationCards.slice(0, 2).map((card) => (
                <Link 
                  className="surface-lift flex flex-col rounded-[1.8rem] border border-white/22 bg-white/15 p-6 backdrop-blur group" 
                  href={card.href} 
                  key={card.title}
                >
                  <p className="text-xs font-semibold uppercase tracking-[0.18em] text-white/68">{card.eyebrow}</p>
                  <h3 className="display-font mt-4 text-4xl leading-none">{card.title}</h3>
                  <p className="mt-4 flex-grow text-sm font-semibold leading-6 text-white/85">{card.badge}</p>
                  
                  <div className="mt-6">
                    <span className="button-soft inline-flex items-center gap-2 rounded-full bg-white px-5 py-3 text-sm font-semibold text-[var(--olive-deep)] shadow-sm transition-transform group-hover:scale-105">
                      {card.cta} 
                      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" className="w-4 h-4">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
                      </svg>
                    </span>
                  </div>
                </Link>
              ))}
            </div>
          </div>

          <div className="mt-5 grid gap-4 md:grid-cols-3">
            {collaborationCards.slice(2).map((card, index) => (
              <Link
                className="surface-lift group flex flex-col rounded-[1.8rem] border border-[var(--line)] bg-white p-6 text-[var(--foreground)] shadow-[0_18px_50px_rgba(58,40,50,0.14)]"
                href={card.href}
                key={card.title}
                style={{ animationDelay: `${index * 80}ms` }}
              >
                <span className="inline-flex h-12 w-12 items-center justify-center rounded-[1.1rem] bg-[var(--blush)] text-[var(--olive-deep)] transition-transform duration-200 group-hover:scale-110">
                  <svg aria-hidden="true" className="h-6 w-6" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.8" viewBox="0 0 24 24"><path d={card.icon} /></svg>
                </span>
                <p className="mt-5 text-xs font-semibold uppercase tracking-[0.18em] text-[var(--muted)]">{card.eyebrow}</p>
                <h3 className="display-font mt-3 text-3xl leading-none text-[var(--foreground)]">{card.title}</h3>
                <p className="mt-4 flex-grow text-sm leading-7 text-[var(--muted)]">{card.body}</p>
                
                <div className="mt-6">
                  <span className="button-soft inline-flex items-center gap-2 rounded-full bg-[var(--coral)] px-5 py-3 text-sm font-semibold text-white shadow-sm transition-transform group-hover:scale-105">
                    {card.cta}
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" className="w-4 h-4">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
                    </svg>
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}