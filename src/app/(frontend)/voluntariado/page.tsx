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

const fosterHighlights = [
  "Acogida temporal hasta adopción",
  "Ideal para cachorros, recuperaciones o animales sensibles",
  "Permite conocer carácter, rutinas y necesidades reales",
];

const volunteerHighlights = [
  "Paseos y socialización",
  "Traslados, eventos y apoyo logístico",
  "Difusión de casos y ayuda organizativa",
];

export default async function VoluntariadoPage() {
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
  const fosterText = (helpSettings?.fosterText as string | undefined) || t.help.fosterText;
  const volunteerText = (helpSettings?.volunteerText as string | undefined) || t.help.volunteerText;
  const diffusionText = (helpSettings?.diffusionText as string | undefined) || t.help.diffusionText;

  return (
    <main className="container mx-auto px-5 py-16">
      <div className="mb-4 text-center">
        <h1 className="text-4xl md:text-5xl font-bold tracking-tight text-gray-900 mb-4">
          Participación Activa
        </h1>
        <p className="text-lg text-[var(--muted)]">
          Únete a nuestro equipo. Tu tiempo, tus manos y tu hogar salvan vidas.
        </p>
      </div>

      <section className="space-y-8">
        {/* BLOC 1 : CASA DE ACOGIDA */}
        <article className="rounded-[2rem] border border-[var(--line)] bg-[var(--surface)] p-8 shadow-[var(--shadow)]" id="acogida">
          <p className="text-sm font-semibold uppercase tracking-[0.18em] text-[var(--olive)]">{t.help.foster}</p>
          <h2 className="display-font mt-3 text-4xl leading-none">{t.help.fosterTitle}</h2>
          <p className="mt-4 text-sm leading-7 text-[var(--muted)]">{fosterText}</p>
          <div className="mt-6 grid gap-3 md:grid-cols-3">
            {fosterHighlights.map((item) => (
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
            {volunteerHighlights.map((item) => (
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