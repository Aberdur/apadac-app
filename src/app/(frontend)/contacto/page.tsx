import Link from "next/link";
import { getDictionary } from "@/lib/i18n";
import { getLocale } from "@/lib/i18n-server";
import { getCMS } from "@/lib/payload";

export const metadata = {
  title: "Contacto | APADAC",
  description: "Ponte en contacto con APADAC",
};

const mailtoLink = (email?: string | null) =>
  typeof email === "string" && email.trim().length > 0
    ? `mailto:${email.trim()}`
    : "#contacto";

export default async function ContactoPage() {
  const locale = await getLocale();
  const t = getDictionary(locale);
  const payload = await getCMS();

  let helpSettings;
  try {
    helpSettings = await payload.findGlobal({
      depth: 1,
      slug: "como-ayudar",
    });
  } catch (error) {
    console.warn("Le global 'como-ayudar' n'est pas encore initialisé en base.");
    helpSettings = {} as any;
  }

  const contactEmail = helpSettings?.contactEmail as string | undefined;
  const contactPhone = helpSettings?.contactPhone as string | undefined;
  const whatsapp = helpSettings?.whatsapp as string | undefined;

  return (
    <main className="container mx-auto ">
      <section className="rounded-[2rem] border border-[var(--line)] bg-[var(--surface)] p-8 shadow-[var(--shadow)]">
        <p className="text-sm font-semibold uppercase tracking-[0.18em] text-[var(--olive)]">
          {t.common.contact}
        </p>
        <h1 className="display-font mt-3 text-4xl leading-none">
          {t.help.contactTitle}
        </h1>
        <p className="mt-4 max-w-2xl text-sm leading-7 text-[var(--muted)]">
          {t.help.contactText}
        </p>
        
        <div className="mt-6 grid gap-4 md:grid-cols-3">
          <div className="surface-lift rounded-[1.5rem] border border-[var(--line)] bg-white/80 p-5">
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[var(--muted)]">
              {t.help.contactBlockEmail}
            </p>
            <p className="mt-3 break-all text-sm leading-7 text-[var(--foreground)]">
              {contactEmail || t.common.pendingInPanel}
            </p>
          </div>
          <div className="surface-lift rounded-[1.5rem] border border-[var(--line)] bg-white/80 p-5">
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[var(--muted)]">
              {t.help.contactBlockPhone}
            </p>
            <p className="mt-3 text-sm leading-7 text-[var(--foreground)]">
              {contactPhone || t.common.pendingInPanel}
            </p>
          </div>
          <div className="surface-lift rounded-[1.5rem] border border-[var(--line)] bg-white/80 p-5">
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[var(--muted)]">
              {t.help.contactBlockWhatsapp}
            </p>
            <p className="mt-3 text-sm leading-7 text-[var(--foreground)]">
              {whatsapp || t.common.pendingInPanel}
            </p>
          </div>
        </div>

        <div className="mt-6 flex flex-wrap gap-3">
          <a
            className="button-soft inline-flex rounded-full bg-[var(--coral)] px-5 py-3 text-sm font-semibold text-white"
            href={mailtoLink(contactEmail)}
          >
            {t.common.writeNow}
          </a>
          <Link
            className="button-soft inline-flex rounded-full border border-[var(--line-strong)] px-5 py-3 text-sm font-semibold"
            href="/adopta"
          >
            {t.common.seeAnimalsInAdoption}
          </Link>
          <Link
            className="button-soft inline-flex rounded-full border border-[var(--line-strong)] px-5 py-3 text-sm font-semibold"
            href="/casos-de-exito"
          >
            {t.common.casesOfSuccess}
          </Link>
        </div>
      </section>
    </main>
  );
}