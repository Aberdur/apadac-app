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

export default async function DonacionesPage() {
  const locale = await getLocale();
  const t = getDictionary(locale);
  const payload = await getCMS();

  let helpSettings;
  try {
    helpSettings = await payload.findGlobal({ depth: 1, slug: "como-ayudar" });
  } catch (error) {
    helpSettings = {} as any;
  }

  const contactEmail = helpSettings?.contactEmail as string | undefined;
  const paypalUrl = sanitizeHref(helpSettings?.paypalUrl);
  const donationText = (helpSettings?.donationText as string | undefined) || t.help.donationText;
  const bizum = textOrFallback(helpSettings?.bizum, t.common.pendingInPanel);
  const bizumNote = textOrFallback(helpSettings?.bizumNote, t.common.pendingInPanel);
  const dogsDonationNote = textOrFallback(helpSettings?.dogsDonationNote, t.common.pendingInPanel);
  const dogsBankIban = textOrFallback(helpSettings?.dogsBankIban, t.common.pendingInPanel);
  const dogsBankSwift = textOrFallback(helpSettings?.dogsBankSwift, t.common.pendingInPanel);
  const catsDonationNote = textOrFallback(helpSettings?.catsDonationNote, t.common.pendingInPanel);
  const catsBankIban = textOrFallback(helpSettings?.catsBankIban, t.common.pendingInPanel);
  const catsBankSwift = textOrFallback(helpSettings?.catsBankSwift, t.common.pendingInPanel);
  const bankName = typeof helpSettings?.bankName === "string" ? helpSettings.bankName.trim() : "";
  const bankBranchInfo = typeof helpSettings?.bankBranchInfo === "string" ? helpSettings.bankBranchInfo.trim() : "";
  const bankAccountHolder = typeof helpSettings?.bankAccountHolder === "string" ? helpSettings.bankAccountHolder.trim() : "";
  const bankSwift = typeof helpSettings?.bankSwift === "string" ? helpSettings.bankSwift.trim() : "";
  const teamingText = (helpSettings?.teamingText as string | undefined) || t.help.teamingText;

  return (
    <main className="container mx-auto px-5 py-16">
      <div className="mb-4 text-center">
        <h1 className="text-4xl md:text-5xl font-bold tracking-tight text-gray-900 mb-4">
          Ayuda Económica
        </h1>
        <p className="text-lg text-[var(--muted)]">
          Haz posible nuestro trabajo. Cada aportación salva vidas.
        </p>
      </div>

      <section className="space-y-8">
        <article className="rounded-[2rem] border border-[var(--line)] bg-[var(--surface)] p-8 shadow-[var(--shadow)]" id="donar">
          <p className="text-sm font-semibold uppercase tracking-[0.18em] text-[var(--olive)]">Aportación directa</p>
          <h2 className="display-font mt-3 text-4xl leading-none">Dona para cubrir gastos reales</h2>
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
              <p className="text-sm font-semibold uppercase tracking-[0.18em] text-[var(--olive)]">Compromiso estable</p>
              <h2 className="display-font mt-3 text-4xl leading-none">Hazte socio de APADAC</h2>
              <p className="mt-4 text-sm leading-7 text-[var(--muted)]">
                Las cuotas periódicas son una de las ayudas más importantes porque permiten prever gastos veterinarios, tratamientos largos, alimentación y urgencias sin depender solo de donaciones puntuales.
              </p>
              <div className="mt-6 flex flex-wrap gap-3">
                <a className="button-soft inline-flex rounded-full bg-[var(--olive-deep)] px-5 py-3 text-sm font-semibold text-white" href="./contacto">Quiero hacerme socio</a>
              </div>
            </div>
            <div className="grid gap-4 sm:grid-cols-3">
              {[
                ["Estabilidad", "Ayuda mensual para organizar gastos fijos."],
                ["Sin presencia obligatoria", "Puedes colaborar aunque no tengas tiempo para voluntariado."],
                ["Impacto continuo", "Tu apoyo sostiene a animales que tardan más en encontrar familia."],
              ].map(([title, body]) => (
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