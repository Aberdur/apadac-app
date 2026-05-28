"use client";

import Image from "next/image";
import { useEffect, useMemo, useState } from "react";

import type { Locale } from "@/lib/i18n";

type LostPetButtonProps = {
  contactEmail?: string | null;
  contactPhone?: string | null;
  locale: Locale;
  whatsapp?: string | null;
};

const copyByLocale = {
  de: {
    button: "Tier verloren?",
    close: "Schließen",
    email: "E-Mail schreiben",
    headline: "Hast du dein Tier verloren?",
    location: "Callosa de Segura, Alicante",
    outside:
      "Wenn dein Tier außerhalb unserer Gemeinde verschwunden ist, kontaktiere bitte die lokale Polizei oder das Rathaus des Ortes, damit sie dich über den zuständigen Abholdienst informieren.",
    phone: "Anrufen",
    poster: "Bitte kontaktiere uns",
    steps: [
      "Foto des Tieres",
      "Ort und Zeitpunkt des Verschwindens",
      "Chipnummer, falls vorhanden",
      "Kontakttelefon",
    ],
    subtitle:
      "APADAC hilft bei verlorenen oder ausgesetzten Tieren in Callosa de Segura. Je schneller die Informationen ankommen, desto besser.",
    title: "Verlorenes Tier",
    whatsapp: "WhatsApp",
  },
  en: {
    button: "Lost pet?",
    close: "Close",
    email: "Email APADAC",
    headline: "Have you lost your pet?",
    location: "Callosa de Segura, Alicante",
    outside:
      "If your pet has gone missing outside our municipality, contact the local police or town hall where it happened so they can tell you who handles animal collection on public roads.",
    phone: "Call",
    poster: "Please contact us",
    steps: [
      "A clear photo",
      "Area and time last seen",
      "Microchip number if available",
      "Contact phone number",
    ],
    subtitle:
      "APADAC helps with lost or abandoned animals in Callosa de Segura. Fast, clear information makes the search easier.",
    title: "Lost animal",
    whatsapp: "WhatsApp",
  },
  es: {
    button: "Animal perdido",
    close: "Cerrar",
    email: "Enviar email",
    headline: "¿Has perdido a tu mascota?",
    location: "Callosa de Segura, Alicante",
    outside:
      "Si has perdido a tu mascota fuera de nuestro municipio, contacta con la Policía Local o con el Ayuntamiento de la localidad donde haya ocurrido para que te informen sobre quién realiza el servicio de recogida de animales en la vía pública.",
    phone: "Llamar",
    poster: "Por favor, contacta",
    steps: [
      "Foto clara del animal",
      "Zona y hora en la que se perdió",
      "Número de chip si lo tienes",
      "Teléfono de contacto",
    ],
    subtitle:
      "APADAC focaliza su labor en la recogida y protección de animales perdidos o abandonados en Callosa de Segura. Cuanto antes llegue la información, mejor.",
    title: "Animal perdido",
    whatsapp: "WhatsApp",
  },
} satisfies Record<
  Locale,
  {
    button: string;
    close: string;
    email: string;
    headline: string;
    location: string;
    outside: string;
    phone: string;
    poster: string;
    steps: string[];
    subtitle: string;
    title: string;
    whatsapp: string;
  }
>;

const normalizePhone = (value?: string | null) =>
  typeof value === "string" ? value.replace(/[^\d+]/g, "") : "";

const getWhatsAppHref = (value?: string | null) => {
  if (typeof value !== "string" || !value.trim()) {
    return null;
  }

  const trimmed = value.trim();

  if (/^https?:\/\//i.test(trimmed)) {
    return trimmed;
  }

  const digits = trimmed.replace(/[^\d]/g, "");

  return digits ? `https://wa.me/${digits}` : null;
};

export function LostPetButton({
  contactEmail,
  contactPhone,
  locale,
  whatsapp,
}: LostPetButtonProps) {
  const [isOpen, setIsOpen] = useState(false);
  const copy = copyByLocale[locale];
  const phoneHref = useMemo(() => {
    const phone = normalizePhone(contactPhone);
    return phone ? `tel:${phone}` : null;
  }, [contactPhone]);
  const whatsappHref = useMemo(() => getWhatsAppHref(whatsapp), [whatsapp]);
  const emailHref = contactEmail?.trim() ? `mailto:${contactEmail.trim()}` : null;

  useEffect(() => {
    if (!isOpen) {
      return;
    }

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setIsOpen(false);
      }
    };

    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [isOpen]);

  return (
    <>
      <button
        className="button-soft fixed bottom-5 right-5 z-[70] inline-flex items-center gap-3 rounded-full border border-white/70 bg-[var(--olive-deep)] px-4 py-3 text-sm font-bold text-white shadow-[0_18px_60px_rgba(51,43,47,0.28)] md:bottom-7 md:right-7"
        onClick={() => setIsOpen(true)}
        type="button"
      >
        <span className="relative inline-flex h-9 w-9 items-center justify-center rounded-full bg-[var(--coral)]">
          <span className="absolute inset-0 animate-ping rounded-full bg-[var(--coral)] opacity-35" />
          <svg
            aria-hidden="true"
            className="relative h-5 w-5"
            fill="none"
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            viewBox="0 0 24 24"
          >
            <path d="M9 6.5a2 2 0 1 1-4 0 2 2 0 0 1 4 0ZM19 6.5a2 2 0 1 1-4 0 2 2 0 0 1 4 0ZM7 14.5c0-2.2 2.2-4 5-4s5 1.8 5 4c0 2.5-2 4.5-5 4.5s-5-2-5-4.5Z" />
            <path d="M10 14h4" />
          </svg>
        </span>
        <span className="hidden sm:inline">{copy.button}</span>
      </button>

      {isOpen ? (
        <div
          aria-modal="true"
          className="fixed inset-0 z-[100] flex items-center justify-center bg-[rgba(20,18,18,0.74)] p-4 backdrop-blur-sm"
          role="dialog"
        >
          <button
            aria-label={copy.close}
            className="absolute inset-0 cursor-default"
            onClick={() => setIsOpen(false)}
            type="button"
          />
          <div className="relative grid max-h-[92vh] w-full max-w-6xl overflow-y-auto rounded-[2.2rem] border border-white/20 bg-[var(--surface-strong)] shadow-[0_28px_100px_rgba(0,0,0,0.38)] lg:grid-cols-[0.44fr_0.56fr]">
            <button
              aria-label={copy.close}
              className="absolute right-5 top-5 z-10 inline-flex h-11 w-11 items-center justify-center rounded-full bg-white/90 text-xl text-[var(--foreground)] shadow-[0_12px_35px_rgba(0,0,0,0.16)]"
              onClick={() => setIsOpen(false)}
              type="button"
            >
              ×
            </button>

            <aside className="relative flex min-h-[560px] flex-col justify-between gap-8 overflow-hidden bg-[linear-gradient(160deg,rgba(216,195,224,0.42),rgba(240,196,173,0.72))] p-8">
              <div className="absolute left-8 top-8 h-20 w-2 rounded-full bg-[var(--coral)]" />
              <div className="relative ml-8 max-w-sm">
                <p className="text-sm font-black uppercase tracking-[0.45em] text-[var(--olive-deep)]">
                  {copy.title}
                </p>
                <h2 className="mt-5 text-5xl font-black uppercase leading-[0.95] tracking-[0.08em] text-[var(--coral)]">
                  {copy.poster}
                </h2>
                <p className="mt-5 text-sm font-bold uppercase tracking-[0.1em] text-[var(--foreground)]">
                  {copy.location}
                </p>
              </div>

              <div className="relative mx-auto flex h-64 w-64 items-center justify-center rounded-full bg-white/40">
                <Image
                  alt="Logo de APADAC"
                  className="h-36 w-36 rounded-[2rem] object-contain"
                  height={144}
                  src="/logo-apadac-mark.png"
                  width={144}
                />
              </div>

              <div className="relative rounded-[1.4rem] bg-[var(--olive-deep)] px-5 py-4 text-white">
                <p className="text-xs font-semibold uppercase tracking-[0.2em] opacity-80">
                  Información útil
                </p>
                <p className="mt-2 text-sm font-semibold">
                  Foto, zona, fecha, chip y teléfono aceleran la difusión.
                </p>
              </div>
            </aside>

            <section className="p-8 lg:p-10">
              <p className="text-sm font-semibold uppercase tracking-[0.22em] text-[var(--olive)]">
                Urgente
              </p>
              <h1 className="display-font mt-3 max-w-2xl text-5xl leading-none text-[var(--olive-deep)] sm:text-6xl">
                {copy.headline}
              </h1>
              <p className="mt-6 max-w-3xl text-base leading-8 text-[var(--muted)]">
                {copy.subtitle}
              </p>

              <div className="mt-7 grid gap-3 sm:grid-cols-2">
                {copy.steps.map((step) => (
                  <div
                    className="flex items-center gap-3 rounded-[1.4rem] border border-[var(--line)] bg-white/78 p-4"
                    key={step}
                  >
                    <span className="inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-[rgba(215,154,160,0.22)] text-[var(--olive-deep)]">
                      <svg
                        aria-hidden="true"
                        className="h-4 w-4"
                        fill="none"
                        stroke="currentColor"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2.2"
                        viewBox="0 0 16 16"
                      >
                        <path d="m3.5 8.5 3 3 6-7" />
                      </svg>
                    </span>
                    <span className="text-sm font-semibold text-[var(--foreground)]">{step}</span>
                  </div>
                ))}
              </div>

              <div className="mt-8 rounded-[1.6rem] border border-[var(--line)] bg-[rgba(240,196,173,0.20)] p-5">
                <p className="text-sm leading-8 text-[var(--foreground)]">{copy.outside}</p>
              </div>

              <div className="mt-8 flex flex-wrap gap-3">
                {whatsappHref ? (
                  <a
                    className="button-soft inline-flex rounded-full bg-[var(--coral)] px-5 py-3 text-sm font-semibold text-white"
                    href={whatsappHref}
                    rel="noreferrer"
                    target="_blank"
                  >
                    {copy.whatsapp}
                  </a>
                ) : null}
                {phoneHref ? (
                  <a
                    className="button-soft inline-flex rounded-full border border-[var(--line-strong)] bg-white px-5 py-3 text-sm font-semibold"
                    href={phoneHref}
                  >
                    {copy.phone}
                  </a>
                ) : null}
                {emailHref ? (
                  <div className="inline-flex items-center gap-3">
                    <a
                      className="button-soft inline-flex rounded-full border border-[var(--line-strong)] bg-white px-5 py-3 text-sm font-semibold"
                      href={emailHref}
                    >
                      {copy.email}
                    </a>

                    {contactEmail && (
                      <span className="text-sm font-medium opacity-80">
                        {contactEmail}
                      </span>
                    )}
                  </div>
                ) : null}
              </div>
            </section>
          </div>
        </div>
      ) : null}
    </>
  );
}
