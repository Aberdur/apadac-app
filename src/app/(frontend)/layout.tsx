import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";

import { DonationFunnelButton } from "@/components/donation-funnel-button";
import { LanguageSwitcher } from "@/components/language-switcher";
import { LostPetButton } from "@/components/lost-pet-button";
import { MobileMenu } from "@/components/mobile-menu";
import { getAdoptionGuideNav } from "@/lib/adoption-guides";
import { getHelpOptions } from "@/lib/help-options";
import { getDictionary } from "@/lib/i18n";
import { getLocale } from "@/lib/i18n-server";
import { getMedia } from "@/lib/media";
import { getCMS } from "@/lib/payload";

import "../globals.css";

export const metadata: Metadata = {
  title: {
    default: "APADAC",
    template: "%s | APADAC",
  },
  description:
    "APADAC: adopciones responsables, historias con final feliz y formas de colaborar con la protectora de Callosa de Segura.",
};

export default async function FrontendLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const locale = await getLocale();
  const t = getDictionary(locale);
  const adoptionItems = getAdoptionGuideNav(locale);
  const helpItems = [
    { href: "/donaciones", label: "Donaciones" },
    { href: "/voluntariado", label: "Voluntariado" },
    { href: "/apadrina", label: "Apadrina un animal" },
  ];
  const payload = await getCMS();
  const helpSettings = await payload.findGlobal({
    depth: 1,
    slug: "como-ayudar",
  });
  const contactEmail =
    typeof helpSettings.contactEmail === "string" ? helpSettings.contactEmail : null;
  const contactPhone =
    typeof helpSettings.contactPhone === "string" ? helpSettings.contactPhone : null;
  const whatsapp = typeof helpSettings.whatsapp === "string" ? helpSettings.whatsapp : null;
  const paypalUrl = typeof helpSettings.paypalUrl === "string" ? helpSettings.paypalUrl : null;
  const donationFunnelButtonImage = getMedia(helpSettings.donationFunnelButtonImage);
  const donationFunnelPanelImage = getMedia(helpSettings.donationFunnelPanelImage);

  return (
    <html lang={locale}>
      <body className="frontend-shell min-h-screen">
        <div className="page-shell mx-auto flex min-h-screen max-w-7xl flex-col px-5 py-5 sm:px-8">
          <div className="mb-2 flex justify-end md:hidden">
            <div className="z-40">
              <LanguageSwitcher compact locale={locale} />
            </div>
          </div>

          <MobileMenu
            adminLabel={t.common.admin}
            announcementsLabel={t.common.announcements}
            adoptLabel={t.common.adopt}
            adoptionItems={adoptionItems}
            brandTagline={t.common.brandTagline}
            casesOfSuccessLabel={t.common.casesOfSuccess}
            contactLabel={t.common.contact}
            helpLabel={t.common.help}
            helpItems={helpItems}
            menuLabel={t.common.menu}
          />

          <div className="mb-2 hidden justify-end md:flex">
            <div className="z-40">
              <LanguageSwitcher locale={locale} />
            </div>
          </div>

          <header className="sticky top-4 z-30 mb-8 hidden rounded-full border border-[var(--line)] bg-[var(--surface)] px-4 py-3 shadow-[var(--shadow)] backdrop-blur md:block">
            <div className="flex flex-wrap items-center justify-between gap-4">
              <Link href="/" className="flex items-center gap-3">
                <Image
                  alt="Logo de APADAC"
                  className="h-14 w-14 rounded-2xl object-contain"
                  height={56}
                  src="/logo-apadac-mark.png"
                  width={56}
                />
                <div>
                  <p className="display-font text-xl leading-none">APADAC</p>
                  <p className="text-sm text-[var(--muted)]">{t.common.brandTagline}</p>
                </div>
              </Link>

              <nav className="flex flex-wrap items-center gap-2 text-sm font-medium text-[var(--muted)]">
                <Link className="rounded-full px-4 py-2 hover:bg-white/70" href="/apadac">
                  APADAC
                </Link>
                <div className="group relative">
                  <Link
                    className="inline-flex rounded-full px-4 py-2 hover:bg-white/70"
                    href="/adopta"
                  >
                    {t.common.adopt}
                  </Link>
                  <div className="invisible absolute left-1/2 top-full z-50 w-72 -translate-x-1/2 pt-3 opacity-0 transition duration-150 group-hover:visible group-hover:opacity-100 group-focus-within:visible group-focus-within:opacity-100">
                    <div className="rounded-[1.5rem] border border-[var(--line)] bg-[var(--surface-strong)] p-3 shadow-[var(--shadow)]">
                      {adoptionItems.map((item) => (
                        <Link
                          className="block rounded-2xl px-4 py-3 text-sm font-semibold text-[var(--muted)] hover:bg-white/80 hover:text-[var(--foreground)]"
                          href={item.href}
                          key={item.href}
                        >
                          {item.label}
                        </Link>
                      ))}
                    </div>
                  </div>
                </div>
                <Link
                  className="rounded-full px-4 py-2 hover:bg-white/70"
                  href="/casos-de-exito"
                >
                  {t.common.casesOfSuccess}
                </Link>
                <div className="group relative">
                  <Link
                    className="inline-flex rounded-full px-4 py-2 hover:bg-white/70"
                    href="/como-ayudar"
                  >
                    {t.common.help}
                  </Link>
                  <div className="invisible absolute left-1/2 top-full z-50 w-72 -translate-x-1/2 pt-3 opacity-0 transition duration-150 group-hover:visible group-hover:opacity-100 group-focus-within:visible group-focus-within:opacity-100">
                    <div className="rounded-[1.5rem] border border-[var(--line)] bg-[var(--surface-strong)] p-3 shadow-[var(--shadow)]">
                      {helpItems.map((item) => (
                        <Link
                          className="block rounded-2xl px-4 py-3 text-sm font-semibold text-[var(--muted)] hover:bg-white/80 hover:text-[var(--foreground)]"
                          href={item.href}
                          key={item.href}
                        >
                          {item.label}
                        </Link>
                      ))}
                    </div>
                  </div>
                </div>
                <Link className="rounded-full px-4 py-2 hover:bg-white/70" href="/anuncios">
                  {t.common.announcements}
                </Link>
                <Link className="rounded-full px-4 py-2 hover:bg-white/70" href="/contacto">
                  {t.common.contact}
                </Link>
                {/* Use a hard navigation to keep the public app from preloading the Payload admin bundle. */}
                {/* eslint-disable-next-line @next/next/no-html-link-for-pages */}
                <a
                  className="button-soft rounded-full bg-[var(--coral)] px-4 py-2 text-white transition hover:brightness-95"
                  href="/admin"
                >
                  {t.common.admin}
                </a>
              </nav>
            </div>
          </header>

          <main className="flex-1">{children}</main>
          <DonationFunnelButton
            buttonImage={donationFunnelButtonImage}
            contactEmail={contactEmail}
            locale={locale}
            panelImage={donationFunnelPanelImage}
            paypalUrl={paypalUrl}
          />
          <LostPetButton
            contactEmail={contactEmail}
            contactPhone={contactPhone}
            locale={locale}
            whatsapp={whatsapp}
          />

          <footer
            id="contacto"
            className="mt-12 rounded-[2rem] border border-[var(--line)] bg-[var(--surface)] px-6 py-8 shadow-[var(--shadow)]"
          >
            <div className="grid gap-8 md:grid-cols-3">
              <div>
                <div className="flex items-center gap-3">
                  <Image
                    alt="Logo de APADAC"
                    className="h-12 w-12 rounded-2xl object-contain"
                    height={48}
                    src="/logo-apadac-mark.png"
                    width={48}
                  />
                  <p className="display-font text-2xl">APADAC</p>
                </div>
                <p className="mt-3 max-w-sm text-sm leading-6 text-[var(--muted)]">
                  {t.footer.description}
                </p>
              </div>
              <div>
                <p className="text-sm font-semibold uppercase tracking-[0.18em] text-[var(--muted)]">
                  {t.common.navigation}
                </p>
                <div className="mt-3 flex flex-col gap-2 text-sm">
                  <Link href="/">{t.common.home}</Link>
                  <Link href="/apadac">APADAC</Link>
                  <Link href="/adopta">{t.common.seeAnimalsInAdoption}</Link>
                  <Link href="/anuncios">{t.common.announcements}</Link>
                  <Link href="/casos-de-exito">{t.common.casesOfSuccess}</Link>
                  {/* eslint-disable-next-line @next/next/no-html-link-for-pages */}
                  <a href="/admin">{t.common.panel}</a>
                </div>
              </div>
              <div>
                <p className="text-sm font-semibold uppercase tracking-[0.18em] text-[var(--muted)]">
                  {t.common.collaborate}
                </p>
                <p className="mt-3 text-sm leading-6 text-[var(--muted)]">
                  {t.footer.cta}
                </p>
                <Link
                  className="button-soft mt-4 inline-flex rounded-full border border-[var(--line-strong)] px-4 py-2 text-sm font-semibold"
                  href="/como-ayudar"
                >
                  {t.common.help}
                  
                </Link>
              </div>
            </div>
          </footer>
        </div>
      </body>
    </html>
  );
}
