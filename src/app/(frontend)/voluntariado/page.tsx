import { getDictionary } from "@/lib/i18n";
import { getLocale } from "@/lib/i18n-server";
import { getCMS } from "@/lib/payload";
import { resolveSafeHref, isExternalHttpHref } from "@/lib/security";

export const metadata = {
  title: "Voluntariado y Acogida | APADAC",
  description: "Únete a APADAC. Descubre cómo ser casa de acogida, voluntario o ayudarnos difundiendo.",
};

const resolvePrimaryLink = (value?: string | null, fallback = "/contacto") =>
  resolveSafeHref(value, fallback);

const mailtoLink = (email?: string | null) =>
  typeof email === "string" && email.trim().length > 0 ? `mailto:${email.trim()}` : "/contacto";

const copyByLocale = {
  es: {
    pageTitle: "Participación Activa",
    pageSubtitle: "Únete a nuestro equipo. Tu tiempo, tus manos y tu hogar salvan vidas.",
    fosterHighlights: [
      "Acogida temporal hasta adopción",
      "Ideal para cachorros, recuperaciones o animales sensibles",
      "Permite conocer carácter, rutinas y necesidades reales",
    ],
    volunteerHighlights: [
      "Paseos y socialización",
      "Traslados, eventos y apoyo logístico",
      "Difusión de casos y ayuda organizativa",
    ],
    cms: {
      fosterText: "Ser casa de acogida permite sacar animales de situaciones complicadas y conocer mejor su carácter.",
      volunteerText: "Paseos, traslados, eventos, difusión o tareas organizativas. Cada hora dedicada cuenta.",
      diffusionText: "Compartir casos, hablar de APADAC y movilizar a otras personas también ayuda a salvar vidas."
    }
  },
  en: {
    pageTitle: "Active Participation",
    pageSubtitle: "Join our team. Your time, your hands, and your home save lives.",
    fosterHighlights: [
      "Temporary foster until adoption",
      "Ideal for puppies, recoveries, or sensitive animals",
      "Allows us to know their real character, routines, and needs",
    ],
    volunteerHighlights: [
      "Walks and socialization",
      "Transfers, events, and logistical support",
      "Spreading cases and organizational help",
    ],
    cms: {
      fosterText: "Becoming a foster home helps animals escape difficult situations and allows us to better understand their personality.",
      volunteerText: "Dog walking, transportation, events, outreach, or administrative tasks. Every hour you give matters.",
      diffusionText: "Sharing cases, talking about APADAC, and getting other people involved also helps save lives."
    }
  },
  de: {
    pageTitle: "Aktive Teilnahme",
    pageSubtitle: "Werde Teil unseres Teams. Deine Zeit, deine Hände und dein Zuhause retten Leben.",
    fosterHighlights: [
      "Vorübergehende Pflege bis zur Adoption",
      "Ideal für Welpen, zur Erholung oder für sensible Tiere",
      "Ermöglicht es, Charakter, Routinen und echte Bedürfnisse kennenzulernen",
    ],
    volunteerHighlights: [
      "Spaziergänge und Sozialisierung",
      "Fahrten, Veranstaltungen und logistische Unterstützung",
      "Verbreitung von Fällen und organisatorische Hilfe",
    ],
    cms: {
      fosterText: "Pflegestelle zu sein hilft, Tiere aus schwierigen Situationen zu holen und ihren Charakter besser kennenzulernen.",
      volunteerText: "Spaziergänge, Fahrten, Veranstaltungen, Sichtbarkeit oder organisatorische Aufgaben. Jede investierte Stunde zählt.",
      diffusionText: "Fälle teilen, über APADAC sprechen und andere mobilisieren hilft ebenfalls, Leben zu retten."
    }
  }
};

export default async function VoluntariadoPage() {
  const locale = await getLocale();
  const t = getDictionary(locale);
  const copy = copyByLocale[locale];
  const payload = await getCMS();

  let helpSettings;
  try {
    helpSettings = await payload.findGlobal({ 
      depth: 1, 
      slug: "como-ayudar",
      locale: locale as "es" | "en" | "de",
      fallbackLocale: "es" 
    });
  } catch (error) {
    helpSettings = {} as any;
  }

  const defaultEsTexts = copyByLocale.es.cms;
  
  // Fonction de traduction magique pour les textes du CMS non traduits
  const translateCMS = (text: unknown, key: keyof typeof defaultEsTexts, defaultFallback: string) => {
    if (typeof text !== "string" || text.trim().length === 0) return defaultFallback;
    if (text.trim() === defaultEsTexts[key].trim()) {
      return copy.cms[key];
    }
    return text.trim();
  };

  const contactEmail = helpSettings?.contactEmail as string | undefined;
  
  const fosterText = translateCMS(helpSettings?.fosterText, "fosterText", t.help.fosterText);
  const volunteerText = translateCMS(helpSettings?.volunteerText, "volunteerText", t.help.volunteerText);
  const diffusionText = translateCMS(helpSettings?.diffusionText, "diffusionText", t.help.diffusionText);

  return (
    <main className="container mx-auto px-5 py-16">
      <div className="mb-4 text-center">
        <h1 className="text-4xl md:text-5xl font-bold tracking-tight text-gray-900 mb-4">
          {copy.pageTitle}
        </h1>
        <p className="text-lg text-[var(--muted)]">
          {copy.pageSubtitle}
        </p>
      </div>

      <section className="space-y-8">
        {/* BLOC 1 : CASA DE ACOGIDA */}
        <article className="rounded-[2rem] border border-[var(--line)] bg-[var(--surface)] p-8 shadow-[var(--shadow)]" id="acogida">
          <p className="text-sm font-semibold uppercase tracking-[0.18em] text-[var(--olive)]">{t.help.foster}</p>
          <h2 className="display-font mt-3 text-4xl leading-none">{t.help.fosterTitle}</h2>
          <p className="mt-4 text-sm leading-7 text-[var(--muted)]">{fosterText}</p>
          <div className="mt-6 grid gap-3 md:grid-cols-3">
            {copy.fosterHighlights.map((item) => (
              <div className="rounded-[1.4rem] border border-[var(--line)] bg-[var(--surface-strong)] p-4 text-sm font-semibold leading-6 text-[var(--foreground)]" key={item}>
                {item}
              </div>
            ))}
          </div>
          <div className="mt-6 flex flex-wrap gap-3">
            <a
              className="button-soft inline-flex rounded-full bg-[var(--coral)] px-5 py-3 text-sm font-semibold text-white"
              href={resolvePrimaryLink(helpSettings?.fosterFormUrl as string | undefined, "./contacto")}
              rel="noreferrer"
              target="_blank"
            >
              {t.help.fosterButton}
            </a>
          </div>
        </article>

        {/* BLOC 2 : VOLUNTARIADO */}
        <article className="rounded-[2rem] border border-[var(--line)] bg-[var(--surface)] p-8 shadow-[var(--shadow)]" id="voluntariado">
          <p className="text-sm font-semibold uppercase tracking-[0.18em] text-[var(--olive)]">{t.help.volunteering}</p>
          <h2 className="display-font mt-3 text-4xl leading-none">{t.help.volunteerTitle}</h2>
          <p className="mt-4 text-sm leading-7 text-[var(--muted)]">{volunteerText}</p>
          <div className="mt-6 grid gap-3 md:grid-cols-3">
            {copy.volunteerHighlights.map((item) => (
              <div className="rounded-[1.4rem] border border-[var(--line)] bg-[var(--surface-strong)] p-4 text-sm font-semibold leading-6 text-[var(--foreground)]" key={item}>
                {item}
              </div>
            ))}
          </div>
          <div className="mt-6 flex flex-wrap gap-3">
            <a
              className="button-soft inline-flex rounded-full bg-[var(--olive-deep)] px-5 py-3 text-sm font-semibold text-white"
              href={resolvePrimaryLink(helpSettings?.volunteerFormUrl as string | undefined, "./contacto")}
              rel="noreferrer"
              target="_blank"
            >
              {t.help.volunteerButton}
            </a>
          </div>
        </article>

        {/* BLOC 3 : DIFUSIÓN */}
        <article className="rounded-[2rem] border border-[var(--line)] bg-[var(--surface)] p-8 shadow-[var(--shadow)]" id="difundir">
          <p className="text-sm font-semibold uppercase tracking-[0.18em] text-[var(--olive)]">{t.help.diffusion}</p>
          <h2 className="display-font mt-3 text-4xl leading-none">{t.help.diffusionTitle}</h2>
          <p className="mt-4 text-sm leading-7 text-[var(--muted)]">{diffusionText}</p>
          <div className="mt-6 flex flex-wrap gap-3">
            <a
              className="button-soft inline-flex rounded-full bg-[var(--coral)] px-5 py-3 text-sm font-semibold text-white"
              href={resolvePrimaryLink(helpSettings?.diffusionFormUrl as string | undefined, "./contacto")}
              rel="noreferrer"
              target="_blank"
            >
              {t.help.diffusionButton}
            </a>
          </div>
        </article>
      </section>
    </main>
  );
}