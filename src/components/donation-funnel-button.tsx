"use client";

import Image from "next/image";
import { useEffect, useMemo, useState } from "react";

import type { Locale } from "@/lib/i18n";

type DonationFunnelImage = {
  alt?: string | null;
  height?: number | null;
  url?: string | null;
  width?: number | null;
};

type DonationFunnelButtonProps = {
  buttonImage?: DonationFunnelImage | null;
  contactEmail?: string | null;
  locale: Locale;
  panelImage?: DonationFunnelImage | null;
  paypalUrl?: string | null;
};

const copyByLocale = {
  de: {
    button: "Heute helfen",
    close: "Schließen",
    contact: "Fragen klären",
    cta: "Zu Spenden",
    donateNow: "Hilfe wird heute gebraucht",
    email: "E-Mail",
    eyebrow: "Unterstütze APADAC",
    headline: "Deine Hilfe wird zu Futter, Tierarzt und Rettungen",
    panelBadge: "Jede Unterstützung zählt",
    panelTitle: "Hilf mit einer Spende",
    points: [
      "Deckt Futter, Medikamente und tägliche Versorgung",
      "Hilft bei tierärztlichen Notfällen und Behandlungen",
      "Macht neue Rettungen und Pflegestellen möglich",
    ],
    poster: "Ein kleiner Beitrag kann einen großen Unterschied machen.",
    paypal: "Mit PayPal spenden",
    subtitle:
      "Nicht jeder kann adoptieren, aber jede Person kann Teil der Rettungskette sein. Wenn du heute helfen willst, zeigen wir dir den schnellsten Weg.",
    title: "Dringende Hilfe",
  },
  en: {
    button: "Help today",
    close: "Close",
    contact: "Ask first",
    cta: "Go to donations",
    donateNow: "Support is needed today",
    email: "Email",
    eyebrow: "Support APADAC",
    headline: "Your help becomes food, vet care and rescues",
    panelBadge: "Every contribution helps",
    panelTitle: "Make a donation",
    points: [
      "Covers food, medication and everyday care",
      "Helps with vet emergencies and treatments",
      "Makes new rescues and foster support possible",
    ],
    poster: "A small contribution can change an animal's outcome.",
    paypal: "Donate with PayPal",
    subtitle:
      "Not everyone can adopt, but everyone can be part of the rescue chain. If you want to help today, this is the fastest route.",
    title: "Urgent support",
  },
  es: {
    button: "Ayuda hoy",
    close: "Cerrar",
    contact: "Resolver dudas",
    cta: "Ir a donaciones",
    donateNow: "Hoy hace falta ayuda",
    email: "Escribir",
    eyebrow: "Apoya a APADAC",
    headline: "Tu ayuda se convierte en pienso, veterinario y rescates",
    panelBadge: "Cada aportación suma",
    panelTitle: "Haz una donación",
    points: [
      "Cubre alimentación, medicación y cuidados diarios",
      "Ayuda a afrontar urgencias veterinarias y tratamientos",
      "Permite seguir rescatando y sosteniendo casas de acogida",
    ],
    poster: "Una aportación pequeña puede cambiar por completo el destino de un animal.",
    paypal: "Donar con PayPal",
    subtitle:
      "No todo el mundo puede adoptar, pero cualquiera puede formar parte de la cadena de ayuda. Si quieres colaborar hoy, este es el camino más rápido.",
    title: "Ayuda urgente",
  },
} satisfies Record<
  Locale,
  {
    button: string;
    close: string;
    contact: string;
    cta: string;
    donateNow: string;
    email: string;
    eyebrow: string;
    headline: string;
    panelBadge: string;
    panelTitle: string;
    points: string[];
    poster: string;
    paypal: string;
    subtitle: string;
    title: string;
  }
>;

export function DonationFunnelButton({
  buttonImage,
  contactEmail,
  locale,
  panelImage,
  paypalUrl,
}: DonationFunnelButtonProps) {
  const [isOpen, setIsOpen] = useState(false);
  const copy = copyByLocale[locale];
  const donationHref = "/como-ayudar#donar";
  const contactHref = contactEmail?.trim() ? `mailto:${contactEmail.trim()}` : "/como-ayudar#contacto";
  const safePaypalUrl = useMemo(
    () => (typeof paypalUrl === "string" && paypalUrl.trim() ? paypalUrl.trim() : null),
    [paypalUrl],
  );
  const buttonImageSrc = buttonImage?.url || "/logo-apadac-mark.png";
  const buttonImageAlt = buttonImage?.alt || "Donaciones APADAC";
  const panelImageAlt = panelImage?.alt || "Apoya a APADAC";

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
        className="button-soft fixed bottom-5 left-5 z-[70] inline-flex items-center gap-3 rounded-full border border-white/70 bg-[var(--coral)] px-4 py-3 text-sm font-bold text-white shadow-[0_18px_60px_rgba(185,121,101,0.30)] md:bottom-7 md:left-7"
        onClick={() => setIsOpen(true)}
        type="button"
      >
        <span className="relative inline-flex h-10 w-10 items-center justify-center overflow-hidden rounded-full bg-white/18 ring-1 ring-white/18">
          <span className="absolute inset-0 animate-ping rounded-full bg-white/20 opacity-50" />
          <Image
            alt={buttonImageAlt}
            className="relative object-cover"
            fill
            sizes="40px"
            src={buttonImageSrc}
          />
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

          <div className="relative grid max-h-[92vh] w-full max-w-6xl overflow-y-auto rounded-[2.2rem] border border-white/20 bg-[var(--surface-strong)] shadow-[0_28px_100px_rgba(0,0,0,0.38)] lg:grid-cols-[0.43fr_0.57fr]">
            <button
              aria-label={copy.close}
              className="absolute right-5 top-5 z-10 inline-flex h-11 w-11 items-center justify-center rounded-full bg-white/90 text-xl text-[var(--foreground)] shadow-[0_12px_35px_rgba(0,0,0,0.16)]"
              onClick={() => setIsOpen(false)}
              type="button"
            >
              ×
            </button>

            <aside className="relative flex min-h-[560px] flex-col justify-between gap-8 overflow-hidden bg-[linear-gradient(160deg,rgba(111,83,100,0.95),rgba(185,121,101,0.90),rgba(240,196,173,0.82))] p-8 text-white">
              <div className="absolute left-8 top-8 h-20 w-2 rounded-full bg-white/45" />
              <div className="relative ml-8 max-w-sm">
                <p className="text-sm font-black uppercase tracking-[0.45em] text-white/72">
                  {copy.title}
                </p>
                <h2 className="mt-5 text-5xl font-black uppercase leading-[0.95] tracking-[0.06em] text-white">
                  {copy.panelTitle}
                </h2>
                <p className="mt-5 text-sm font-semibold leading-7 text-white/82">
                  {copy.poster}
                </p>
              </div>

              <div className="relative mx-auto flex h-64 w-64 items-center justify-center rounded-full border border-white/16 bg-white/10">
                <div className="relative flex h-44 w-44 items-center justify-center overflow-hidden rounded-[2.4rem] bg-white/88 shadow-[0_24px_70px_rgba(51,43,47,0.20)]">
                  <div className="absolute inset-4 rounded-[2rem] bg-[linear-gradient(145deg,rgba(240,196,173,0.30),rgba(216,195,224,0.34))]" />
                  {panelImage?.url ? (
                    <Image
                      alt={panelImageAlt}
                      className="relative object-cover"
                      fill
                      sizes="176px"
                      src={panelImage.url}
                    />
                  ) : (
                    <svg
                      aria-hidden="true"
                      className="relative h-24 w-24 text-[var(--coral)]"
                      fill="none"
                      stroke="currentColor"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="1.8"
                      viewBox="0 0 64 64"
                    >
                      <circle
                        cx="19"
                        cy="16"
                        fill="currentColor"
                        fillOpacity="0.22"
                        r="4.5"
                        stroke="none"
                      />
                      <circle
                        cx="30"
                        cy="12"
                        fill="currentColor"
                        fillOpacity="0.22"
                        r="4.5"
                        stroke="none"
                      />
                      <circle
                        cx="41"
                        cy="16"
                        fill="currentColor"
                        fillOpacity="0.22"
                        r="4.5"
                        stroke="none"
                      />
                      <circle
                        cx="23"
                        cy="28"
                        fill="currentColor"
                        fillOpacity="0.22"
                        r="4.5"
                        stroke="none"
                      />
                      <circle
                        cx="37"
                        cy="28"
                        fill="currentColor"
                        fillOpacity="0.22"
                        r="4.5"
                        stroke="none"
                      />
                      <path
                        d="M32 49c-7.8-4.7-13.5-9.7-13.5-17.4 0-4.4 3.5-7.8 7.8-7.8 2.6 0 4.8 1.2 5.7 3.3 0.9-2.1 3.1-3.3 5.7-3.3 4.3 0 7.8 3.4 7.8 7.8 0 7.7-5.7 12.7-13.5 17.4Z"
                        fill="currentColor"
                        fillOpacity="0.16"
                      />
                      <path d="M32 49c-7.8-4.7-13.5-9.7-13.5-17.4 0-4.4 3.5-7.8 7.8-7.8 2.6 0 4.8 1.2 5.7 3.3 0.9-2.1 3.1-3.3 5.7-3.3 4.3 0 7.8 3.4 7.8 7.8 0 7.7-5.7 12.7-13.5 17.4Z" />
                    </svg>
                  )}
                </div>
              </div>

              <div className="relative rounded-[1.4rem] bg-white/14 px-5 py-4">
                <p className="text-xs font-semibold uppercase tracking-[0.2em] text-white/72">
                  {copy.panelBadge}
                </p>
                <p className="mt-2 text-sm font-semibold text-white">{copy.donateNow}</p>
              </div>
            </aside>

            <section className="p-8 lg:p-10">
              <p className="text-sm font-semibold uppercase tracking-[0.22em] text-[var(--olive)]">
                {copy.eyebrow}
              </p>
              <h1 className="display-font mt-3 max-w-3xl text-5xl leading-none text-[var(--olive-deep)] sm:text-6xl">
                {copy.headline}
              </h1>
              <p className="mt-6 max-w-3xl text-base leading-8 text-[var(--muted)]">
                {copy.subtitle}
              </p>

              <div className="mt-7 grid gap-3">
                {copy.points.map((point) => (
                  <div
                    className="flex items-center gap-3 rounded-[1.4rem] border border-[var(--line)] bg-white/78 p-4"
                    key={point}
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
                    <span className="text-sm font-semibold text-[var(--foreground)]">{point}</span>
                  </div>
                ))}
              </div>

              <div className="mt-8 rounded-[1.6rem] border border-[var(--line)] bg-[rgba(240,196,173,0.20)] p-5">
                <p className="text-sm leading-8 text-[var(--foreground)]">
                  Una donación no es solo una cantidad. Es una vacuna, una revisión, una
                  analítica, una medicación o un saco de pienso cuando hace falta.
                </p>
              </div>

              <div className="mt-8 flex flex-wrap gap-3">
                <a
                  className="button-soft inline-flex rounded-full bg-[var(--olive-deep)] px-5 py-3 text-sm font-semibold text-white"
                  href={donationHref}
                >
                  {copy.cta}
                </a>
                {safePaypalUrl ? (
                  <a
                    className="button-soft inline-flex rounded-full bg-[var(--coral)] px-5 py-3 text-sm font-semibold text-white"
                    href={safePaypalUrl}
                    rel="noreferrer"
                    target="_blank"
                  >
                    {copy.paypal}
                  </a>
                ) : null}
                <a
                  className="button-soft inline-flex rounded-full border border-[var(--line-strong)] bg-white px-5 py-3 text-sm font-semibold"
                  href={contactHref}
                >
                  {contactEmail?.trim() ? copy.email : copy.contact}
                
                {contactEmail && (
                      <span className="text-sm font-medium opacity-80">
                        : {contactEmail}
                      </span>
                )}
              </a>
              </div>
            </section>
          </div>
        </div>
      ) : null}
    </>
  );
}
