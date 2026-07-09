import { getDictionary } from "@/lib/i18n";
import { getLocale } from "@/lib/i18n-server";
import { getCMS } from "@/lib/payload";
import { isExternalHttpHref, resolveSafeHref, sanitizeHref } from "@/lib/security";
import Link from "next/link";

export const metadata = {
  title: "Donaciones y Ayuda Económica | APADAC",
  description: "Formas de colaborar económicamente con APADAC: transferencias, Bizum, socios y Teaming.",
};

const resolvePrimaryLink = (value?: string | null, fallback = "/contacto") =>
  resolveSafeHref(value, fallback);

const mailtoLink = (email?: string | null) =>
  typeof email === "string" && email.trim().length > 0 ? `mailto:${email.trim()}` : "/contacto";

const textOrFallback = (value: unknown, fallback: string) =>
  typeof value === "string" && value.trim().length > 0 ? value.trim() : fallback;

const copyByLocale = {
  es: {
    pageTitle: "Ayuda Económica",
    pageSubtitle: "Haz posible nuestro trabajo. Cada aportación salva vidas.",
    directContribution: "Aportación directa",
    donateTitle: "Dona para cubrir gastos reales",
    socioEyebrow: "Compromiso estable",
    socioTitle: "Hazte socio de APADAC",
    socioText: "Las cuotas periódicas son una de las ayudas más importantes porque permiten prever gastos veterinarios, tratamientos largos, alimentación y urgencias sin depender solo de donaciones puntuales.",
    socioButton: "Quiero hacerme socio",
    socioCards: [
      ["Estabilidad", "Ayuda mensual para organizar gastos fijos."],
      ["Sin presencia obligatoria", "Puedes colaborar aunque no tengas tiempo para voluntariado."],
      ["Impacto continuo", "Tu apoyo sostiene a animales que tardan más en encontrar familia."],
    ],
    cms: {
      donationText: "Cada aportación ayuda a cubrir alimentación, veterinario, medicación, rescates y urgencias.",
      bizumNote: "Si haces Bizum, indica en el concepto si la ayuda va destinada a perros, gatos o a un caso concreto.",
      dogsDonationNote: "Importante: especifica en el concepto que es una donación y a qué perro o causa quieres destinarla.",
      catsDonationNote: "Importante: especifica en el concepto a qué gato o causa quieres destinar la donación.",
      bankBranchInfo: "sucursal PEDRO ARAGONES n° 26 en 03360 CALLOSA DE SEGURA (ALICANTE), España",
      teamingText: "Con una pequeña cuota mensual ayudas a sostener una parte estable del trabajo de la protectora."
    }
  },
  en: {
    pageTitle: "Financial Support",
    pageSubtitle: "Make our work possible. Every contribution saves lives.",
    directContribution: "Direct contribution",
    donateTitle: "Donate to cover real expenses",
    socioEyebrow: "Stable commitment",
    socioTitle: "Become an APADAC member",
    socioText: "Regular contributions are one of our most important sources of support because they allow us to plan for veterinary expenses, long-term treatments, food, and emergencies without relying solely on one-off donations.",
    socioButton: "I want to become a member",
    socioCards: [
      ["Stability", "Monthly help to organize fixed costs."],
      ["No mandatory presence", "You can help even if you don't have time to volunteer."],
      ["Continuous impact", "Your support sustains animals that take longer to find a family."],
    ],
    cms: {
      donationText: "Every contribution helps cover food, veterinary care, medication, rescues, and emergencies.",
      bizumNote: "If you use Bizum, please indicate in the reference whether the help is for dogs, cats, or a specific case.",
      dogsDonationNote: "Important: specify in the reference that it is a donation and which dog or cause it is for.",
      catsDonationNote: "Important: specify in the reference which cat or cause you want to support with the donation.",
      bankBranchInfo: "Branch PEDRO ARAGONES n° 26 in 03360 CALLOSA DE SEGURA (ALICANTE), Spain",
      teamingText: "With a small monthly contribution, you help sustain a stable part of the shelter's vital work."
    }
  },
  de: {
    pageTitle: "Finanzielle Hilfe",
    pageSubtitle: "Mache unsere Arbeit möglich. Jeder Beitrag rettet Leben.",
    directContribution: "Direkte Unterstützung",
    donateTitle: "Spenden für echte Ausgaben",
    socioEyebrow: "Regelmäßiges Engagement",
    socioTitle: "Werde Mitglied bei APADAC",
    socioText: "Regelmäßige Beiträge gehören zu unseren wichtigsten Stützen, da sie es uns ermöglichen, Tierarztkosten, Langzeitbehandlungen, Futter und Notfälle zu planen, ohne uns ausschließlich auf Einzelspenden verlassen zu müssen.",
    socioButton: "Ich möchte Mitglied werden",
    socioCards: [
      ["Stabilität", "Monatliche Hilfe zur Deckung der Fixkosten."],
      ["Keine Anwesenheitspflicht", "Du kannst helfen, auch wenn du keine Zeit für Freiwilligenarbeit hast."],
      ["Dauerhafte Wirkung", "Deine Unterstützung hilft Tieren, die länger brauchen, um eine Familie zu finden."],
    ],
    cms: {
      donationText: "Jeder Beitrag hilft bei Futter, Tierarztkosten, Medikamenten, Rettungen und Notfällen.",
      bizumNote: "Wenn du Bizum nutzt, gib bitte im Verwendungszweck an, ob die Spende für Hunde, Katzen oder einen bestimmten Fall ist.",
      dogsDonationNote: "Wichtig: Gib im Verwendungszweck an, dass es sich um eine Spende handelt und für welchen Hund oder welchen Zweck sie bestimmt ist.",
      catsDonationNote: "Wichtig: Gib im Verwendungszweck an, für welche Katze oder welchen Zweck die Spende bestimmt ist.",
      bankBranchInfo: "Filiale PEDRO ARAGONES n° 26 in 03360 CALLOSA DE SEGURA (ALICANTE), Spanien",
      teamingText: "Mit einem kleinen monatlichen Beitrag hilfst du, einen stabilen Teil der Arbeit des Vereins zu tragen."
    }
  }
};

export default async function DonacionesPage() {
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
  
  // Fonction magique qui traduit les textes du CMS s'ils sont encore en espagnol par défaut
  const translateCMS = (text: unknown, key: keyof typeof defaultEsTexts, defaultFallback: string) => {
    if (typeof text !== "string" || text.trim().length === 0) return defaultFallback;
    if (text.trim() === defaultEsTexts[key].trim()) {
      return copy.cms[key];
    }
    return text.trim();
  };

  const contactEmail = helpSettings?.contactEmail as string | undefined;
  const paypalUrl = sanitizeHref(helpSettings?.paypalUrl);
  
  const donationText = translateCMS(helpSettings?.donationText, "donationText", t.help.donationText);
  const bizum = textOrFallback(helpSettings?.bizum, t.common.pendingInPanel);
  const bizumNote = translateCMS(helpSettings?.bizumNote, "bizumNote", t.common.pendingInPanel);
  const dogsDonationNote = translateCMS(helpSettings?.dogsDonationNote, "dogsDonationNote", t.common.pendingInPanel);
  const dogsBankIban = textOrFallback(helpSettings?.dogsBankIban, t.common.pendingInPanel);
  const dogsBankSwift = textOrFallback(helpSettings?.dogsBankSwift, t.common.pendingInPanel);
  const catsDonationNote = translateCMS(helpSettings?.catsDonationNote, "catsDonationNote", t.common.pendingInPanel);
  const catsBankIban = textOrFallback(helpSettings?.catsBankIban, t.common.pendingInPanel);
  const catsBankSwift = textOrFallback(helpSettings?.catsBankSwift, t.common.pendingInPanel);
  const bankName = typeof helpSettings?.bankName === "string" ? helpSettings.bankName.trim() : "";
  const bankBranchInfo = translateCMS(helpSettings?.bankBranchInfo, "bankBranchInfo", "");
  const bankAccountHolder = typeof helpSettings?.bankAccountHolder === "string" ? helpSettings.bankAccountHolder.trim() : "";
  const bankSwift = typeof helpSettings?.bankSwift === "string" ? helpSettings.bankSwift.trim() : "";
  const teamingText = translateCMS(helpSettings?.teamingText, "teamingText", t.help.teamingText);

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
        <article className="rounded-[2rem] border border-[var(--line)] bg-[var(--surface)] p-8 shadow-[var(--shadow)]" id="donar">
          <p className="text-sm font-semibold uppercase tracking-[0.18em] text-[var(--olive)]">{copy.directContribution}</p>
          <h2 className="display-font mt-3 text-4xl leading-none">{copy.donateTitle}</h2>
          <p className="mt-4 text-sm leading-7 text-[var(--muted)]">{donationText}</p>
          
          <div className="mt-6 grid gap-4 lg:grid-cols-[0.9fr,1.1fr]">
            <div className="rounded-[1.7rem] border border-[var(--line)] bg-[linear-gradient(180deg,rgba(215,154,160,0.22),rgba(255,255,255,0.92))] p-6">
              <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[var(--muted)]">{t.help.bizum}</p>
              <p className="mt-3 text-3xl font-semibold tracking-tight text-[var(--foreground)]">{bizum}</p>
              <div className="mt-5 rounded-[1.3rem] border border-[var(--line)] bg-white/80 p-4">
                <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[var(--muted)]">{t.help.bizumNote}</p>
                <p className="mt-2 text-sm leading-7 text-[var(--foreground)]">{bizumNote}</p>
              </div>
            </div>

            <div className="rounded-[1.7rem] border border-[var(--line)] bg-[linear-gradient(180deg,rgba(216,195,224,0.22),rgba(255,255,255,0.94))] p-6">
              <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[var(--muted)]">{t.help.bankTransfer}</p>
              <h3 className="mt-3 text-xl font-semibold text-[var(--foreground)]">{t.help.bankDetails}</h3>

              <div className="mt-5 grid gap-4 xl:grid-cols-2">
                <div className="rounded-[1.4rem] border border-[var(--line)] bg-white/80 p-5">
                  <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[var(--muted)]">{t.help.dogsAccount}</p>
                  <p className="mt-3 text-sm leading-7 text-[var(--foreground)]">{dogsDonationNote}</p>
                  <dl className="mt-5 space-y-4 text-sm leading-7 text-[var(--foreground)]">
                    <div><dt className="text-xs font-semibold uppercase tracking-[0.18em] text-[var(--muted)]">IBAN</dt><dd className="mt-1 break-words font-medium">{dogsBankIban}</dd></div>
                    <div><dt className="text-xs font-semibold uppercase tracking-[0.18em] text-[var(--muted)]">{t.help.bicSwift}</dt><dd className="mt-1 break-words font-medium">{dogsBankSwift}</dd></div>
                  </dl>
                </div>
                <div className="rounded-[1.4rem] border border-[var(--line)] bg-white/80 p-5">
                  <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[var(--muted)]">{t.help.catsAccount}</p>
                  <p className="mt-3 text-sm leading-7 text-[var(--foreground)]">{catsDonationNote}</p>
                  <dl className="mt-5 space-y-4 text-sm leading-7 text-[var(--foreground)]">
                    <div><dt className="text-xs font-semibold uppercase tracking-[0.18em] text-[var(--muted)]">IBAN</dt><dd className="mt-1 break-words font-medium">{catsBankIban}</dd></div>
                    <div><dt className="text-xs font-semibold uppercase tracking-[0.18em] text-[var(--muted)]">{t.help.bicSwift}</dt><dd className="mt-1 break-words font-medium">{catsBankSwift}</dd></div>
                  </dl>
                </div>
              </div>

              <div className="mt-4 rounded-[1.4rem] border border-[var(--line)] bg-white/70 p-5">
                <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[var(--muted)]">{t.help.bankInfo}</p>
                <dl className="mt-4 grid gap-4 text-sm leading-7 text-[var(--foreground)] md:grid-cols-2">
                  {bankName && <div><dt className="text-xs font-semibold uppercase tracking-[0.18em] text-[var(--muted)]">{t.help.bank}</dt><dd className="mt-1">{bankName}</dd></div>}
                  {bankAccountHolder && <div><dt className="text-xs font-semibold uppercase tracking-[0.18em] text-[var(--muted)]">{t.help.accountHolder}</dt><dd className="mt-1">{bankAccountHolder}</dd></div>}
                  {bankSwift && <div><dt className="text-xs font-semibold uppercase tracking-[0.18em] text-[var(--muted)]">{t.help.bicSwift}</dt><dd className="mt-1 break-words">{bankSwift}</dd></div>}
                  {bankBranchInfo && <div><dt className="text-xs font-semibold uppercase tracking-[0.18em] text-[var(--muted)]">{t.help.bankDetails}</dt><dd className="mt-1">{bankBranchInfo}</dd></div>}
                </dl>
              </div>
            </div>
          </div>

          {paypalUrl && (
            <div className="mt-4 rounded-[1.7rem] border border-[var(--line)] bg-[linear-gradient(180deg,rgba(240,196,173,0.28),rgba(255,255,255,0.92))] p-6">
              <div className="flex flex-wrap items-center justify-between gap-4">
                <div className="max-w-2xl">
                  <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[var(--muted)]">{t.help.paypal}</p>
                  <p className="mt-3 text-sm leading-7 text-[var(--foreground)]">{t.help.paypalText}</p>
                </div>
                <a className="button-soft inline-flex rounded-full bg-[var(--olive-deep)] px-5 py-3 text-sm font-semibold text-white" href={paypalUrl} rel="noreferrer" target="_blank">{t.help.paypalButton}</a>
              </div>
            </div>
          )}
        </article>

        <article className="overflow-hidden rounded-[2rem] border border-[var(--line)] bg-[linear-gradient(135deg,rgba(255,250,247,0.98),rgba(216,195,224,0.34))] p-8 shadow-[var(--shadow)]" id="socio">
          <div className="grid gap-6 lg:grid-cols-[0.82fr_1.18fr] lg:items-center">
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.18em] text-[var(--olive)]">{copy.socioEyebrow}</p>
              <h2 className="display-font mt-3 text-4xl leading-none">{copy.socioTitle}</h2>
              <p className="mt-4 text-sm leading-7 text-[var(--muted)]">
                {copy.socioText}
              </p>
              <div className="mt-6 flex flex-wrap gap-3">
                <a className="button-soft inline-flex rounded-full bg-[var(--olive-deep)] px-5 py-3 text-sm font-semibold text-white" href="./contacto">{copy.socioButton}</a>
              </div>
            </div>
            <div className="grid gap-4 sm:grid-cols-3">
              {copy.socioCards.map(([title, body]) => (
                <div className="surface-lift rounded-[1.6rem] border border-[var(--line)] bg-white/78 p-5" key={title}>
                  <p className="display-font text-3xl leading-none text-[var(--olive-deep)]">{title}</p>
                  <p className="mt-3 text-sm leading-7 text-[var(--muted)]">{body}</p>
                </div>
              ))}
            </div>
          </div>
        </article>

        <article className="rounded-[2rem] border border-[var(--line)] bg-[var(--surface)] p-8 shadow-[var(--shadow)]" id="teaming">
          <p className="text-sm font-semibold uppercase tracking-[0.18em] text-[var(--olive)]">{t.help.teaming}</p>
          <h2 className="display-font mt-3 text-4xl leading-none">{t.help.teamingTitle}</h2>
          <p className="mt-4 text-sm leading-7 text-[var(--muted)]">{teamingText}</p>
          <div className="mt-6 flex flex-wrap gap-3">
            <a
              className="button-soft inline-flex rounded-full bg-[var(--olive-deep)] px-5 py-3 text-sm font-semibold text-white"
              href={resolvePrimaryLink(helpSettings?.teamingUrl as string | undefined)}
              rel="noreferrer"
              target="_blank"
            >
              {t.help.teamingButton}
            </a>
          </div>
        </article>
      </section>
    </main>
  );
}