import Link from "next/link";

import { getAdminSession } from "@/lib/auth";
import { getDictionary } from "@/lib/i18n";
import { getLocale } from "@/lib/i18n-server";
import { getCMS } from "@/lib/payload";
import { isExternalHttpHref, resolveSafeHref, sanitizeHref } from "@/lib/security";

export const metadata = {
  title: "Cómo ayudar",
};

const resolvePrimaryLink = (value?: string | null, fallback = "/contacto") =>
  resolveSafeHref(value, fallback);

const mailtoLink = (email?: string | null) =>
  typeof email === "string" && email.trim().length > 0
    ? `mailto:${email.trim()}`
    : "/contacto";

const textOrFallback = (value: unknown, fallback: string) =>
  typeof value === "string" && value.trim().length > 0 ? value.trim() : fallback;

const collaborationCards = [
  {
    badge: "Veterinario, alimento y urgencias",
    body:
      "Una aportación puntual ayuda a cubrir tratamientos, medicación, pienso, desparasitaciones, pruebas y rescates.",
    cta: "Ver formas de donar",
    eyebrow: "Aportación directa",
    href: "#donar",
    icon: "M12 21s-7-4.4-7-10a4 4 0 0 1 7-2.6A4 4 0 0 1 19 11c0 5.6-7 10-7 10Z",
    title: "Dona",
  },
  {
    badge: "Ayuda estable cada mes",
    body:
      "Ser socio permite planificar gastos fijos y sostener casos que necesitan atención durante semanas o meses.",
    cta: "Hazte socio",
    eyebrow: "Compromiso continuado",
    href: "#socio",
    icon: "M12 3 19 6v5c0 4.6-2.9 8-7 10-4.1-2-7-5.4-7-10V6l7-3Z",
    title: "Hazte socio",
  },
  {
    badge: "Un hogar temporal cambia el pronóstico",
    body:
      "La acogida libera espacio, reduce estrés y permite conocer mejor al animal mientras aparece una adopción.",
    cta: "Ser casa de acogida",
    eyebrow: "Acogida temporal",
    href: "#acogida",
    icon: "M4 11.5 12 5l8 6.5V20a1 1 0 0 1-1 1h-5v-6h-4v6H5a1 1 0 0 1-1-1v-8.5Z",
    title: "Casa de acogida",
  },
  {
    badge: "Para animales de larga estancia",
    body:
      "Apadrinar ayuda a cubrir necesidades de un animal concreto, especialmente si requiere cuidados especiales.",
    cta: "Ver apadrinamiento",
    eyebrow: "Apoyo con nombre propio",
    href: "/apadrina",
    icon: "M8 12h8M12 8v8M4 12a8 8 0 1 0 16 0 8 8 0 0 0-16 0Z",
    title: "Apadrina",
  },
  {
    badge: "Tiempo, manos y presencia",
    body:
      "Paseos, traslados, eventos, limpieza, difusión o apoyo organizativo. Cada hora dedicada cuenta.",
    cta: "Hacer voluntariado",
    eyebrow: "Participación activa",
    href: "#voluntariado",
    icon: "M7 11a3 3 0 1 0 0-6 3 3 0 0 0 0 6ZM17 11a3 3 0 1 0 0-6 3 3 0 0 0 0 6ZM4 20a4 4 0 0 1 8 0M12 20a4 4 0 0 1 8 0",
    title: "Hazte voluntario",
  },
] as const;

const fosterHighlights = [
  "Acogida temporal hasta adopción",
  "Ideal para cachorros, recuperaciones o animales sensibles",
  "Permite conocer carácter, rutinas y necesidades reales",
];

const sponsorHighlights = [
  "Ayuda continuada para un animal concreto",
  "Especialmente útil en tratamientos o estancias largas",
  "Puedes combinarlo con difusión para aumentar oportunidades",
];

const volunteerHighlights = [
  "Paseos y socialización",
  "Traslados, eventos y apoyo logístico",
  "Difusión de casos y ayuda organizativa",
];

export default async function HelpPage() {
  const locale = await getLocale();
  const t = getDictionary(locale);
  const payload = await getCMS();
  const [helpSettings, session] = await Promise.all([
    payload.findGlobal({
      slug: "como-ayudar",
    }),
    getAdminSession(),
  ]);

  const contactEmail = helpSettings.contactEmail as string | undefined;
  const contactPhone = helpSettings.contactPhone as string | undefined;
  const whatsapp = helpSettings.whatsapp as string | undefined;
  const paypalUrl = sanitizeHref(helpSettings.paypalUrl);
  const donationText =
    (helpSettings.donationText as string | undefined) || t.help.donationText;
  const bizum = textOrFallback(helpSettings.bizum, t.common.pendingInPanel);
  const bizumNote = textOrFallback(helpSettings.bizumNote, t.common.pendingInPanel);
  const dogsDonationNote = textOrFallback(
    helpSettings.dogsDonationNote,
    t.common.pendingInPanel,
  );
  const dogsBankIban = textOrFallback(helpSettings.dogsBankIban, t.common.pendingInPanel);
  const dogsBankSwift = textOrFallback(helpSettings.dogsBankSwift, t.common.pendingInPanel);
  const catsDonationNote = textOrFallback(
    helpSettings.catsDonationNote,
    t.common.pendingInPanel,
  );
  const catsBankIban = textOrFallback(helpSettings.catsBankIban, t.common.pendingInPanel);
  const catsBankSwift = textOrFallback(helpSettings.catsBankSwift, t.common.pendingInPanel);
  const bankName =
    typeof helpSettings.bankName === "string" ? helpSettings.bankName.trim() : "";
  const bankBranchInfo =
    typeof helpSettings.bankBranchInfo === "string"
      ? helpSettings.bankBranchInfo.trim()
      : "";
  const bankAccountHolder =
    typeof helpSettings.bankAccountHolder === "string"
      ? helpSettings.bankAccountHolder.trim()
      : "";
  const bankSwift =
    typeof helpSettings.bankSwift === "string" ? helpSettings.bankSwift.trim() : "";
  const teamingText =
    (helpSettings.teamingText as string | undefined) || t.help.teamingText;
  const fosterText =
    (helpSettings.fosterText as string | undefined) || t.help.fosterText;
  const sponsorshipText =
    (helpSettings.sponsorshipText as string | undefined) || t.help.sponsorshipText;
  const volunteerText =
    (helpSettings.volunteerText as string | undefined) || t.help.volunteerText;
  const diffusionText =
    (helpSettings.diffusionText as string | undefined) || t.help.diffusionText;

  return (
    <div className="space-y-10">
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
            <a
              className="button-soft rounded-full border border-[var(--line-strong)] bg-white px-6 py-3 text-sm font-semibold"
              href="/contacto"
            >
              {t.common.contact}
            </a>
          </div>

          {session.canEditHelpContent ? (
            <div className="mt-4">
              {/* Use a hard navigation to keep the public app from preloading the Payload admin bundle. */}
              {/* eslint-disable-next-line @next/next/no-html-link-for-pages */}
              <a
                className="text-sm font-semibold text-[var(--muted)] underline underline-offset-4"
                href="/admin/globals/como-ayudar"
              >
                {t.common.editContent}
              </a>
            </div>
          ) : null}
        </div>
      </section>

      <section className="space-y-6" id="vias">
        <div className="rounded-[2.4rem] border border-[var(--line)] bg-[linear-gradient(135deg,rgba(111,83,100,0.96),rgba(185,121,101,0.78)_45%,rgba(240,196,173,0.72))] p-6 text-white shadow-[var(--shadow)] sm:p-8">
          <div className="grid gap-8 lg:grid-cols-[0.78fr_1.22fr] lg:items-end">
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.24em] text-[var(--sand)]">
                {t.help.optionsEyebrow}
              </p>
              <h2 className="display-font mt-3 text-5xl leading-none sm:text-6xl">
                Colabora a tu manera
              </h2>
              <p className="mt-5 max-w-xl text-sm leading-7 text-white/78">
                No todo el mundo puede adoptar, pero casi todo el mundo puede ayudar de
                alguna forma. Elige la vía que encaje contigo y APADAC te orientará.
              </p>
            </div>

            <div className="grid gap-3 sm:grid-cols-2">
              {collaborationCards.slice(0, 2).map((card) => (
                <a
                  className="surface-lift rounded-[1.8rem] border border-white/22 bg-white/15 p-5 backdrop-blur"
                  href={card.href}
                  key={card.title}
                >
                  <p className="text-xs font-semibold uppercase tracking-[0.18em] text-white/68">
                    {card.eyebrow}
                  </p>
                  <h3 className="display-font mt-4 text-4xl leading-none">{card.title}</h3>
                  <p className="mt-4 text-sm font-semibold leading-6 text-white/85">
                    {card.badge}
                  </p>
                </a>
              ))}
            </div>
          </div>

          <div className="mt-5 grid gap-4 md:grid-cols-3">
            {collaborationCards.slice(2).map((card, index) => (
              <a
                className="surface-lift group rounded-[1.8rem] border border-white/18 bg-white/90 p-5 text-[var(--foreground)] shadow-[0_18px_50px_rgba(58,40,50,0.14)]"
                href={card.href}
                key={card.title}
                style={{ animationDelay: `${index * 80}ms` }}
              >
                <span className="inline-flex h-12 w-12 items-center justify-center rounded-[1.1rem] bg-[var(--blush)] text-[var(--olive-deep)] transition-transform duration-200 group-hover:scale-110">
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
                    <path d={card.icon} />
                  </svg>
                </span>
                <p className="mt-5 text-xs font-semibold uppercase tracking-[0.18em] text-[var(--muted)]">
                  {card.eyebrow}
                </p>
                <h3 className="display-font mt-3 text-3xl leading-none">{card.title}</h3>
                <p className="mt-4 text-sm leading-7 text-[var(--muted)]">{card.body}</p>
                <p className="mt-5 text-sm font-semibold text-[var(--olive-deep)]">
                  {card.cta}
                </p>
              </a>
            ))}
          </div>
        </div>
      </section>

      <section className="space-y-5">
        <article
          className="rounded-[2rem] border border-[var(--line)] bg-[var(--surface)] p-8 shadow-[var(--shadow)]"
          id="donar"
        >
          <p className="text-sm font-semibold uppercase tracking-[0.18em] text-[var(--olive)]">
            Aportación directa
          </p>
          <h2 className="display-font mt-3 text-4xl leading-none">
            Dona para cubrir gastos reales
          </h2>
          <p className="mt-4 text-sm leading-7 text-[var(--muted)]">{donationText}</p>
          <div className="mt-6 grid gap-4 lg:grid-cols-[0.9fr,1.1fr]">
            <div className="rounded-[1.7rem] border border-[var(--line)] bg-[linear-gradient(180deg,rgba(215,154,160,0.22),rgba(255,255,255,0.92))] p-6">
              <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[var(--muted)]">
                {t.help.bizum}
              </p>
              <p className="mt-3 text-3xl font-semibold tracking-tight text-[var(--foreground)]">
                {bizum}
              </p>
              <div className="mt-5 rounded-[1.3rem] border border-[var(--line)] bg-white/80 p-4">
                <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[var(--muted)]">
                  {t.help.bizumNote}
                </p>
                <p className="mt-2 text-sm leading-7 text-[var(--foreground)]">{bizumNote}</p>
              </div>
            </div>

            <div className="rounded-[1.7rem] border border-[var(--line)] bg-[linear-gradient(180deg,rgba(216,195,224,0.22),rgba(255,255,255,0.94))] p-6">
              <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[var(--muted)]">
                {t.help.bankTransfer}
              </p>
              <h3 className="mt-3 text-xl font-semibold text-[var(--foreground)]">
                {t.help.bankDetails}
              </h3>

              <div className="mt-5 grid gap-4 xl:grid-cols-2">
                <div className="rounded-[1.4rem] border border-[var(--line)] bg-white/80 p-5">
                  <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[var(--muted)]">
                    {t.help.dogsAccount}
                  </p>
                  <p className="mt-3 text-sm leading-7 text-[var(--foreground)]">
                    {dogsDonationNote}
                  </p>
                  <dl className="mt-5 space-y-4 text-sm leading-7 text-[var(--foreground)]">
                    <div>
                      <dt className="text-xs font-semibold uppercase tracking-[0.18em] text-[var(--muted)]">
                        IBAN
                      </dt>
                      <dd className="mt-1 break-words font-medium">{dogsBankIban}</dd>
                    </div>
                    <div>
                      <dt className="text-xs font-semibold uppercase tracking-[0.18em] text-[var(--muted)]">
                        {t.help.bicSwift}
                      </dt>
                      <dd className="mt-1 break-words font-medium">{dogsBankSwift}</dd>
                    </div>
                  </dl>
                </div>

                <div className="rounded-[1.4rem] border border-[var(--line)] bg-white/80 p-5">
                  <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[var(--muted)]">
                    {t.help.catsAccount}
                  </p>
                  <p className="mt-3 text-sm leading-7 text-[var(--foreground)]">
                    {catsDonationNote}
                  </p>
                  <dl className="mt-5 space-y-4 text-sm leading-7 text-[var(--foreground)]">
                    <div>
                      <dt className="text-xs font-semibold uppercase tracking-[0.18em] text-[var(--muted)]">
                        IBAN
                      </dt>
                      <dd className="mt-1 break-words font-medium">{catsBankIban}</dd>
                    </div>
                    <div>
                      <dt className="text-xs font-semibold uppercase tracking-[0.18em] text-[var(--muted)]">
                        {t.help.bicSwift}
                      </dt>
                      <dd className="mt-1 break-words font-medium">{catsBankSwift}</dd>
                    </div>
                  </dl>
                </div>
              </div>

              <div className="mt-4 rounded-[1.4rem] border border-[var(--line)] bg-white/70 p-5">
                <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[var(--muted)]">
                  {t.help.bankInfo}
                </p>
                <dl className="mt-4 grid gap-4 text-sm leading-7 text-[var(--foreground)] md:grid-cols-2">
                  {bankName ? (
                    <div>
                      <dt className="text-xs font-semibold uppercase tracking-[0.18em] text-[var(--muted)]">
                        {t.help.bank}
                      </dt>
                      <dd className="mt-1">{bankName}</dd>
                    </div>
                  ) : null}
                  {bankAccountHolder ? (
                    <div>
                      <dt className="text-xs font-semibold uppercase tracking-[0.18em] text-[var(--muted)]">
                        {t.help.accountHolder}
                      </dt>
                      <dd className="mt-1">{bankAccountHolder}</dd>
                    </div>
                  ) : null}
                  {bankSwift ? (
                    <div>
                      <dt className="text-xs font-semibold uppercase tracking-[0.18em] text-[var(--muted)]">
                        {t.help.bicSwift}
                      </dt>
                      <dd className="mt-1 break-words">{bankSwift}</dd>
                    </div>
                  ) : null}
                  {bankBranchInfo ? (
                    <div>
                      <dt className="text-xs font-semibold uppercase tracking-[0.18em] text-[var(--muted)]">
                        {t.help.bankDetails}
                      </dt>
                      <dd className="mt-1">{bankBranchInfo}</dd>
                    </div>
                  ) : null}
                </dl>
              </div>
            </div>
          </div>

          {paypalUrl ? (
            <div className="mt-4 rounded-[1.7rem] border border-[var(--line)] bg-[linear-gradient(180deg,rgba(240,196,173,0.28),rgba(255,255,255,0.92))] p-6">
              <div className="flex flex-wrap items-center justify-between gap-4">
                <div className="max-w-2xl">
                  <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[var(--muted)]">
                    {t.help.paypal}
                  </p>
                  <p className="mt-3 text-sm leading-7 text-[var(--foreground)]">
                    {t.help.paypalText}
                  </p>
                </div>
                <a
                  className="button-soft inline-flex rounded-full bg-[var(--olive-deep)] px-5 py-3 text-sm font-semibold text-white"
                  href={paypalUrl}
                  rel="noreferrer"
                  target={isExternalHttpHref(paypalUrl) ? "_blank" : undefined}
                >
                  {t.help.paypalButton}
                </a>
              </div>
            </div>
          ) : null}
          <div className="mt-6 flex flex-wrap gap-3">
            <a
              className="button-soft inline-flex rounded-full bg-[var(--coral)] px-5 py-3 text-sm font-semibold text-white"
              href={mailtoLink(contactEmail)}
            >
              {t.help.donationWrite}
            </a>
          </div>
        </article>

        <article
          className="overflow-hidden rounded-[2rem] border border-[var(--line)] bg-[linear-gradient(135deg,rgba(255,250,247,0.98),rgba(216,195,224,0.34))] p-8 shadow-[var(--shadow)]"
          id="socio"
        >
          <div className="grid gap-6 lg:grid-cols-[0.82fr_1.18fr] lg:items-center">
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.18em] text-[var(--olive)]">
                Compromiso estable
              </p>
              <h2 className="display-font mt-3 text-4xl leading-none">
                Hazte socio de APADAC
              </h2>
              <p className="mt-4 text-sm leading-7 text-[var(--muted)]">
                Las cuotas periódicas son una de las ayudas más importantes porque
                permiten prever gastos veterinarios, tratamientos largos, alimentación y
                urgencias sin depender solo de donaciones puntuales.
              </p>
              <div className="mt-6 flex flex-wrap gap-3">
                <a
                  className="button-soft inline-flex rounded-full bg-[var(--olive-deep)] px-5 py-3 text-sm font-semibold text-white"
                  href={mailtoLink(contactEmail)}
                >
                  Quiero hacerme socio
                </a>
                <a
                  className="button-soft inline-flex rounded-full border border-[var(--line-strong)] bg-white/70 px-5 py-3 text-sm font-semibold"
                  href="/contacto"
                >
                  Resolver dudas
                </a>
              </div>
            </div>

            <div className="grid gap-4 sm:grid-cols-3">
              {[
                ["Estabilidad", "Ayuda mensual para organizar gastos fijos."],
                ["Sin presencia obligatoria", "Puedes colaborar aunque no tengas tiempo para voluntariado."],
                ["Impacto continuo", "Tu apoyo sostiene a animales que tardan más en encontrar familia."],
              ].map(([title, body]) => (
                <div
                  className="surface-lift rounded-[1.6rem] border border-[var(--line)] bg-white/78 p-5"
                  key={title}
                >
                  <p className="display-font text-3xl leading-none text-[var(--olive-deep)]">
                    {title}
                  </p>
                  <p className="mt-3 text-sm leading-7 text-[var(--muted)]">{body}</p>
                </div>
              ))}
            </div>
          </div>
        </article>

        <article
          className="rounded-[2rem] border border-[var(--line)] bg-[var(--surface)] p-8 shadow-[var(--shadow)]"
          id="teaming"
        >
          <p className="text-sm font-semibold uppercase tracking-[0.18em] text-[var(--olive)]">
            {t.help.teaming}
          </p>
          <h2 className="display-font mt-3 text-4xl leading-none">
            {t.help.teamingTitle}
          </h2>
          <p className="mt-4 text-sm leading-7 text-[var(--muted)]">{teamingText}</p>
          <div className="mt-6 rounded-[1.5rem] border border-[var(--line)] bg-white/80 p-5">
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[var(--muted)]">
              {t.help.teamingLinkLabel}
            </p>
            <p className="mt-3 break-all text-sm leading-7 text-[var(--foreground)]">
              {helpSettings.teamingUrl
                ? String(helpSettings.teamingUrl)
                : t.common.pendingInPanel}
            </p>
          </div>
          <div className="mt-6 flex flex-wrap gap-3">
            <a
              className="button-soft inline-flex rounded-full bg-[var(--olive-deep)] px-5 py-3 text-sm font-semibold text-white"
              href={resolvePrimaryLink(helpSettings.teamingUrl as string | undefined)}
              rel="noreferrer"
              target={
                isExternalHttpHref(resolvePrimaryLink(helpSettings.teamingUrl as string | undefined))
                  ? "_blank"
                  : undefined
              }
            >
              {t.help.teamingButton}
            </a>
          </div>
        </article>

        <article
          className="rounded-[2rem] border border-[var(--line)] bg-[var(--surface)] p-8 shadow-[var(--shadow)]"
          id="acogida"
        >
          <p className="text-sm font-semibold uppercase tracking-[0.18em] text-[var(--olive)]">
            {t.help.foster}
          </p>
          <h2 className="display-font mt-3 text-4xl leading-none">
            {t.help.fosterTitle}
          </h2>
          <p className="mt-4 text-sm leading-7 text-[var(--muted)]">{fosterText}</p>
          <div className="mt-6 grid gap-3 md:grid-cols-3">
            {fosterHighlights.map((item) => (
              <div
                className="rounded-[1.4rem] border border-[var(--line)] bg-[var(--surface-strong)] p-4 text-sm font-semibold leading-6 text-[var(--foreground)]"
                key={item}
              >
                {item}
              </div>
            ))}
          </div>
          <div className="mt-6 flex flex-wrap gap-3">
            <a
              className="button-soft inline-flex rounded-full bg-[var(--coral)] px-5 py-3 text-sm font-semibold text-white"
              href={resolvePrimaryLink(
                helpSettings.fosterFormUrl as string | undefined,
                mailtoLink(contactEmail),
              )}
              rel="noreferrer"
              target={
                isExternalHttpHref(
                  resolvePrimaryLink(
                    helpSettings.fosterFormUrl as string | undefined,
                    mailtoLink(contactEmail),
                  ),
                )
                  ? "_blank"
                  : undefined
              }
            >
              {t.help.fosterButton}
            </a>
          </div>
        </article>

        <article
          className="rounded-[2rem] border border-[var(--line)] bg-[var(--surface)] p-8 shadow-[var(--shadow)]"
          id="apadrinar"
        >
          <p className="text-sm font-semibold uppercase tracking-[0.18em] text-[var(--olive)]">
            {t.help.sponsorship}
          </p>
          <h2 className="display-font mt-3 text-4xl leading-none">
            {t.help.sponsorshipTitle}
          </h2>
          <p className="mt-4 text-sm leading-7 text-[var(--muted)]">{sponsorshipText}</p>
          <div className="mt-6 grid gap-3 md:grid-cols-3">
            {sponsorHighlights.map((item) => (
              <div
                className="rounded-[1.4rem] border border-[var(--line)] bg-[var(--surface-strong)] p-4 text-sm font-semibold leading-6 text-[var(--foreground)]"
                key={item}
              >
                {item}
              </div>
            ))}
          </div>
          <div className="mt-6 flex flex-wrap gap-3">
            <Link
              className="button-soft inline-flex rounded-full border border-[var(--line-strong)] bg-white/70 px-5 py-3 text-sm font-semibold"
              href="/apadrina"
            >
              Ver animales para apadrinar
            </Link>
            <a
              className="button-soft inline-flex rounded-full bg-[var(--olive-deep)] px-5 py-3 text-sm font-semibold text-white"
              href={resolvePrimaryLink(
                helpSettings.sponsorshipFormUrl as string | undefined,
                mailtoLink(contactEmail),
              )}
              rel="noreferrer"
              target={
                isExternalHttpHref(
                  resolvePrimaryLink(
                    helpSettings.sponsorshipFormUrl as string | undefined,
                    mailtoLink(contactEmail),
                  ),
                )
                  ? "_blank"
                  : undefined
              }
            >
              {t.help.sponsorshipButton}
            </a>
          </div>
        </article>

        <article
          className="rounded-[2rem] border border-[var(--line)] bg-[var(--surface)] p-8 shadow-[var(--shadow)]"
          id="voluntariado"
        >
          <p className="text-sm font-semibold uppercase tracking-[0.18em] text-[var(--olive)]">
            {t.help.volunteering}
          </p>
          <h2 className="display-font mt-3 text-4xl leading-none">
            {t.help.volunteerTitle}
          </h2>
          <p className="mt-4 text-sm leading-7 text-[var(--muted)]">{volunteerText}</p>
          <div className="mt-6 grid gap-3 md:grid-cols-3">
            {volunteerHighlights.map((item) => (
              <div
                className="rounded-[1.4rem] border border-[var(--line)] bg-[var(--surface-strong)] p-4 text-sm font-semibold leading-6 text-[var(--foreground)]"
                key={item}
              >
                {item}
              </div>
            ))}
          </div>
          <div className="mt-6 flex flex-wrap gap-3">
            <a
              className="button-soft inline-flex rounded-full bg-[var(--coral)] px-5 py-3 text-sm font-semibold text-white"
              href={resolvePrimaryLink(
                helpSettings.volunteerFormUrl as string | undefined,
                mailtoLink(contactEmail),
              )}
              rel="noreferrer"
              target={
                isExternalHttpHref(
                  resolvePrimaryLink(
                    helpSettings.volunteerFormUrl as string | undefined,
                    mailtoLink(contactEmail),
                  ),
                )
                  ? "_blank"
                  : undefined
              }
            >
              {t.help.volunteerButton}
            </a>
          </div>
        </article>

        <article
          className="rounded-[2rem] border border-[var(--line)] bg-[var(--surface)] p-8 shadow-[var(--shadow)]"
          id="difundir"
        >
          <p className="text-sm font-semibold uppercase tracking-[0.18em] text-[var(--olive)]">
            {t.help.diffusion}
          </p>
          <h2 className="display-font mt-3 text-4xl leading-none">
            {t.help.diffusionTitle}
          </h2>
          <p className="mt-4 text-sm leading-7 text-[var(--muted)]">{diffusionText}</p>
          <div className="mt-6 flex flex-wrap gap-3">
            <a
              className="button-soft inline-flex rounded-full bg-[var(--olive-deep)] px-5 py-3 text-sm font-semibold text-white"
              href={resolvePrimaryLink(
                helpSettings.diffusionFormUrl as string | undefined,
                mailtoLink(contactEmail),
              )}
              rel="noreferrer"
              target={
                isExternalHttpHref(
                  resolvePrimaryLink(
                    helpSettings.diffusionFormUrl as string | undefined,
                    mailtoLink(contactEmail),
                  ),
                )
                  ? "_blank"
                  : undefined
              }
            >
              {t.help.diffusionButton}
            </a>
          </div>
        </article>
      </section>
    </div>
  );
}
