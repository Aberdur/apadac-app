"use client";

import { useState, useTransition } from "react";

import type { Locale } from "@/lib/i18n";

type ErrorFieldMap = Record<string, string>;

type AdoptionInquiryCopy = {
  availability: string;
  availabilityLabel: string;
  cancel: string;
  childrenLabel: string;
  childrenMixed: string;
  childrenNo: string;
  childrenOlder: string;
  childrenYoung: string;
  cityLabel: string;
  close: string;
  consent: string;
  emailLabel: string;
  error: string;
  errorByField: ErrorFieldMap;
  experience: string;
  experienceLabel: string;
  householdApartment: string;
  householdHouse: string;
  householdOther: string;
  householdRural: string;
  householdTypeLabel: string;
  housingFamily: string;
  housingOther: string;
  housingOwn: string;
  housingRent: string;
  housingStatusLabel: string;
  intro: (name: string) => string;
  landlordLabel: string;
  landlordNa: string;
  landlordNo: string;
  landlordYes: string;
  motivation: string;
  motivationLabel: string;
  otherAnimalsLabel: string;
  pending: string;
  phoneLabel: string;
  send: string;
  sentText: string;
  sentTitle: string;
  title: string;
  yourNameLabel: string;
};

const RequiredMark = () => <span className="ml-1 text-[var(--coral)]">*</span>;

type AdoptionInquiryFormProps = {
  animalId: number | string;
  animalName: string;
  locale: Locale;
  triggerClassName?: string;
  triggerLabel: string;
};

const copyByLocale: Record<Locale, AdoptionInquiryCopy> = {
  de: {
    availability: "Wie würde der Alltag mit diesem Tier aussehen?",
    availabilityLabel: "Verfügbarkeit und zusätzliche Hinweise",
    cancel: "Abbrechen",
    childrenLabel: "Kinder im Haushalt",
    childrenNo: "Keine",
    childrenOlder: "Ja, ältere Kinder",
    childrenYoung: "Ja, kleine Kinder",
    childrenMixed: "Ja, unterschiedliche Altersgruppen",
    cityLabel: "Stadt oder Wohnort",
    close: "Schließen",
    consent: "Ich bestätige, dass die Angaben wahr sind und APADAC mich zur Adoption kontaktieren darf.",
    emailLabel: "E-Mail",
    errorByField: {
      animalId: "Das Tier konnte nicht korrekt erkannt werden.",
      childrenAtHome: "Bitte gib an, ob Kinder im Haushalt leben.",
      city: "Bitte gib deinen Ort oder deine Gegend an.",
      consent: "Du musst die Einwilligung akzeptieren, bevor du die Anfrage sendest.",
      email: "Bitte gib eine gültige E-Mail-Adresse ein.",
      experience: "Bitte erzähle kurz von deiner bisherigen Erfahrung.",
      fullName: "Bitte gib deinen Vor- und Nachnamen an.",
      housingStatus: "Bitte gib deine Wohnsituation an.",
      householdType: "Bitte gib die Art der Wohnung oder des Hauses an.",
      motivation: "Bitte erkläre, warum du adoptieren möchtest.",
      phone: "Bitte gib eine Telefonnummer an.",
    },
    error: "Die Anfrage konnte nicht gesendet werden. Prüfe die Felder oder versuche es später erneut.",
    experience: "Welche Erfahrung hast du mit Hunden oder Katzen?",
    experienceLabel: "Vorerfahrung",
    householdApartment: "Wohnung",
    householdHouse: "Haus",
    householdOther: "Andere",
    householdRural: "Haus mit Grundstück / ländlich",
    householdTypeLabel: "Wohnform",
    housingFamily: "Familienhaus",
    housingOther: "Andere Situation",
    housingOwn: "Eigentum",
    housingRent: "Miete",
    housingStatusLabel: "Wohnsituation",
    intro: (name: string) =>
      `Fülle die wichtigsten Angaben aus und APADAC kann besser einschätzen, ob ${name} zu dir passen könnte.`,
    landlordLabel: "Erlaubnis des Vermieters oder Eigentümers",
    landlordNa: "Nicht erforderlich",
    landlordNo: "Noch nicht",
    landlordYes: "Ja",
    motivation: "Warum interessiert dich gerade dieses Tier?",
    motivationLabel: "Warum möchtest du adoptieren?",
    otherAnimalsLabel: "Andere Tiere zu Hause",
    pending: "Wird gesendet...",
    phoneLabel: "Telefon",
    send: "Anfrage senden",
    sentText: "Die Anfrage wurde gesendet. APADAC erhält jetzt deine Angaben per E-Mail.",
    sentTitle: "Anfrage gesendet",
    title: "Adoptionsformular",
    yourNameLabel: "Vor- und Nachname",
  },
  en: {
    availability: "What would daily life with this animal look like?",
    availabilityLabel: "Availability and additional notes",
    cancel: "Cancel",
    childrenLabel: "Children at home",
    childrenMixed: "Yes, mixed ages",
    childrenNo: "No",
    childrenOlder: "Yes, older children",
    childrenYoung: "Yes, young children",
    cityLabel: "City or area",
    close: "Close",
    consent:
      "I confirm that this information is accurate and that APADAC may contact me about the adoption process.",
    emailLabel: "Email",
    errorByField: {
      animalId: "The animal could not be identified correctly.",
      childrenAtHome: "Please indicate whether there are children at home.",
      city: "Please enter your city or area.",
      consent: "You must accept the consent checkbox before sending.",
      email: "Please enter a valid email address.",
      experience: "Please tell us about your previous experience.",
      fullName: "Please enter your full name.",
      housingStatus: "Please indicate your housing status.",
      householdType: "Please indicate your home type.",
      motivation: "Please explain why you want to adopt.",
      phone: "Please enter a contact phone number.",
    },
    error:
      "The form could not be sent. Please check the fields or try again later.",
    experience: "Tell us about your previous experience with dogs or cats.",
    experienceLabel: "Previous experience",
    householdApartment: "Apartment",
    householdHouse: "House",
    householdOther: "Other",
    householdRural: "House with land / rural home",
    householdTypeLabel: "Home type",
    housingFamily: "Family home",
    housingOther: "Other situation",
    housingOwn: "Owned",
    housingRent: "Rented",
    housingStatusLabel: "Housing status",
    intro: (name: string) =>
      `Share the basic information and APADAC will be able to assess whether ${name} could be a good match for your home.`,
    landlordLabel: "Landlord or property permission",
    landlordNa: "Not applicable",
    landlordNo: "Not yet",
    landlordYes: "Yes",
    motivation: "Why are you interested in this animal?",
    motivationLabel: "Why do you want to adopt?",
    otherAnimalsLabel: "Other animals at home",
    pending: "Sending...",
    phoneLabel: "Phone",
    send: "Send application",
    sentText: "Your application has been sent. APADAC will receive it by email.",
    sentTitle: "Application sent",
    title: "Adoption form",
    yourNameLabel: "Full name",
  },
  es: {
    availability: "¿Cómo sería el día a día con este animal en casa?",
    availabilityLabel: "Disponibilidad y notas adicionales",
    cancel: "Cancelar",
    childrenLabel: "Niños en casa",
    childrenMixed: "Sí, de varias edades",
    childrenNo: "No",
    childrenOlder: "Sí, mayores",
    childrenYoung: "Sí, pequeños",
    cityLabel: "Ciudad o zona",
    close: "Cerrar",
    consent:
      "Confirmo que la información es veraz y que APADAC puede contactar conmigo sobre el proceso de adopción.",
    emailLabel: "Email",
    errorByField: {
      animalId: "No se ha identificado correctamente el animal.",
      childrenAtHome: "Indica si hay niños en casa.",
      city: "Indica tu ciudad o zona.",
      consent: "Debes aceptar el consentimiento antes de enviar la solicitud.",
      email: "Introduce un email válido.",
      experience: "Cuéntanos tu experiencia previa.",
      fullName: "Escribe tu nombre y apellidos.",
      housingStatus: "Indica la situación de la vivienda.",
      householdType: "Indica el tipo de vivienda.",
      motivation: "Cuéntanos por qué quieres adoptar.",
      phone: "Indica un teléfono de contacto.",
    },
    error:
      "No se ha podido enviar la solicitud. Revisa los campos o inténtalo más tarde.",
    experience: "Cuéntanos tu experiencia previa con perros o gatos.",
    experienceLabel: "Experiencia previa",
    householdApartment: "Piso",
    householdHouse: "Casa",
    householdOther: "Otro",
    householdRural: "Casa con terreno / entorno rural",
    householdTypeLabel: "Tipo de vivienda",
    housingFamily: "Vivienda familiar",
    housingOther: "Otra situación",
    housingOwn: "En propiedad",
    housingRent: "De alquiler",
    housingStatusLabel: "Situación de la vivienda",
    intro: (name: string) =>
      `Déjanos unos datos básicos y APADAC podrá valorar mejor si ${name} encaja contigo y con tu hogar.`,
    landlordLabel: "Permiso del casero o de la propiedad",
    landlordNa: "No aplica",
    landlordNo: "Todavía no",
    landlordYes: "Sí",
    motivation: "¿Por qué te interesa justamente este animal?",
    motivationLabel: "Motivación para adoptar",
    otherAnimalsLabel: "Otros animales en casa",
    pending: "Enviando...",
    phoneLabel: "Teléfono",
    send: "Enviar solicitud",
    sentText: "La solicitud se ha enviado y APADAC la recibirá por correo.",
    sentTitle: "Solicitud enviada",
    title: "Formulario de adopción",
    yourNameLabel: "Nombre y apellidos",
  },
};

export const AdoptionInquiryForm = ({
  animalId,
  animalName,
  locale,
  triggerClassName,
  triggerLabel,
}: AdoptionInquiryFormProps) => {
  const copy = copyByLocale[locale];
  const [isOpen, setIsOpen] = useState(false);
  const [isPending, startTransition] = useTransition();
  const [error, setError] = useState<string | null>(null);
  const [sent, setSent] = useState(false);

  return (
    <>
      <button
        className={triggerClassName}
        onClick={() => {
          setError(null);
          setSent(false);
          setIsOpen(true);
        }}
        type="button"
      >
        {triggerLabel}
      </button>

      {isOpen ? (
        <div
          aria-modal="true"
          className="fixed inset-0 z-[80] flex items-center justify-center bg-[rgba(26,22,17,0.55)] p-4"
          role="dialog"
        >
          <div className="max-h-[92vh] w-full max-w-3xl overflow-y-auto rounded-[2rem] border border-[var(--line)] bg-[var(--surface-strong)] p-6 shadow-[var(--shadow)] sm:p-8">
            <div className="flex items-start justify-between gap-4">
              <div className="max-w-2xl">
                <p className="text-sm font-semibold uppercase tracking-[0.18em] text-[var(--olive)]">
                  {copy.title as string}
                </p>
                <h2 className="display-font mt-3 text-3xl leading-none sm:text-4xl">
                  {animalName}
                </h2>
                <p className="mt-4 text-sm leading-7 text-[var(--muted)]">
                  {(copy.intro as (name: string) => string)(animalName)}
                </p>
              </div>
              <button
                aria-label={copy.close as string}
                className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-[var(--line-strong)] bg-white/90 text-xl"
                onClick={() => setIsOpen(false)}
                type="button"
              >
                ×
              </button>
            </div>

            {sent ? (
              <div className="mt-8 rounded-[1.6rem] border border-[var(--line)] bg-white/80 p-6">
                <h3 className="display-font text-2xl">{copy.sentTitle as string}</h3>
                <p className="mt-3 text-sm leading-7 text-[var(--muted)]">
                  {copy.sentText as string}
                </p>
                <div className="mt-5">
                  <button
                    className="button-soft inline-flex rounded-full bg-[var(--olive-deep)] px-5 py-3 text-sm font-semibold text-white"
                    onClick={() => setIsOpen(false)}
                    type="button"
                  >
                    {copy.close as string}
                  </button>
                </div>
              </div>
            ) : (
              <form
                className="mt-8 space-y-6"
                onSubmit={(event) => {
                  event.preventDefault();
                  setError(null);

                  const form = event.currentTarget;
                  const data = new FormData(form);

                  startTransition(async () => {
                    const response = await fetch("/api/adoption-inquiries", {
                      body: JSON.stringify({
                        animalId,
                        availability: String(data.get("availability") || ""),
                        childrenAtHome: String(data.get("childrenAtHome") || ""),
                        city: String(data.get("city") || ""),
                        consent: data.get("consent") === "on",
                        email: String(data.get("email") || ""),
                        experience: String(data.get("experience") || ""),
                        fullName: String(data.get("fullName") || ""),
                        householdType: String(data.get("householdType") || ""),
                        housingStatus: String(data.get("housingStatus") || ""),
                        landlordPermission: String(data.get("landlordPermission") || ""),
                        motivation: String(data.get("motivation") || ""),
                        otherAnimals: String(data.get("otherAnimals") || ""),
                        phone: String(data.get("phone") || ""),
                        website: String(data.get("website") || ""),
                      }),
                      headers: {
                        "Content-Type": "application/json",
                      },
                      method: "POST",
                    });

                    if (!response.ok) {
                      const payload = (await response.json().catch(() => null)) as
                        | {
                            error?: string;
                            field?: string;
                          }
                        | null;

                      if (payload?.error === "missing_field" && payload.field) {
                        const fieldError = (
                          copy.errorByField as Record<string, string | undefined>
                        )[payload.field];
                        setError(fieldError || (copy.error as string));
                        return;
                      }

                      if (payload?.error === "invalid_email") {
                        setError(
                          (copy.errorByField as Record<string, string | undefined>).email ||
                            (copy.error as string),
                        );
                        return;
                      }

                      if (payload?.error === "consent_required") {
                        setError(
                          (copy.errorByField as Record<string, string | undefined>).consent ||
                            (copy.error as string),
                        );
                        return;
                      }

                      if (payload?.error === "missing_recipient") {
                        setError(
                          locale === "es"
                            ? "No hay un correo de adopciones configurado para este animal."
                            : locale === "en"
                              ? "There is no adoption email configured for this animal."
                              : "Für dieses Tier ist keine Adoptions-E-Mail konfiguriert.",
                        );
                        return;
                      }

                      if (payload?.error === "animal_not_found") {
                        setError(
                          locale === "es"
                            ? "No se ha encontrado la ficha del animal. Recarga la página y vuelve a intentarlo."
                            : locale === "en"
                              ? "The animal profile could not be found. Refresh the page and try again."
                              : "Das Tierprofil wurde nicht gefunden. Lade die Seite neu und versuche es erneut.",
                        );
                        return;
                      }

                      if (payload?.error === "mail_failed") {
                        setError(
                          locale === "es"
                            ? "El servidor no ha podido enviar el correo. Revisa la configuración SMTP."
                            : locale === "en"
                              ? "The server could not send the email. Check the SMTP configuration."
                              : "Der Server konnte die E-Mail nicht senden. Prüfe die SMTP-Konfiguration.",
                        );
                        return;
                      }

                      if (payload?.error === "smtp_not_configured") {
                        setError(
                          locale === "es"
                            ? "El envío de correos no está configurado todavía en el servidor. Faltan los datos SMTP en .env.local."
                            : locale === "en"
                              ? "Email sending is not configured yet on the server. SMTP settings are missing in .env.local."
                              : "Der Mailversand ist auf dem Server noch nicht konfiguriert. Die SMTP-Daten fehlen in .env.local.",
                        );
                        return;
                      }

                      setError(copy.error as string);
                      return;
                    }

                    form.reset();
                    setSent(true);
                  });
                }}
              >
                <input autoComplete="off" className="hidden" name="website" tabIndex={-1} />

                <div className="grid gap-4 sm:grid-cols-2">
                  <label className="space-y-2 text-sm">
                    <span className="font-semibold">
                      {copy.yourNameLabel as string}
                      <RequiredMark />
                    </span>
                    <input
                      className="w-full rounded-2xl border border-[var(--line)] bg-white px-4 py-3 outline-none focus:border-[var(--olive)]"
                      name="fullName"
                      required
                      type="text"
                    />
                  </label>
                  <label className="space-y-2 text-sm">
                    <span className="font-semibold">
                      {copy.emailLabel as string}
                      <RequiredMark />
                    </span>
                    <input
                      className="w-full rounded-2xl border border-[var(--line)] bg-white px-4 py-3 outline-none focus:border-[var(--olive)]"
                      name="email"
                      required
                      type="email"
                    />
                  </label>
                  <label className="space-y-2 text-sm">
                    <span className="font-semibold">
                      {copy.phoneLabel as string}
                      <RequiredMark />
                    </span>
                    <input
                      className="w-full rounded-2xl border border-[var(--line)] bg-white px-4 py-3 outline-none focus:border-[var(--olive)]"
                      name="phone"
                      required
                      type="tel"
                    />
                  </label>
                  <label className="space-y-2 text-sm">
                    <span className="font-semibold">
                      {copy.cityLabel as string}
                      <RequiredMark />
                    </span>
                    <input
                      className="w-full rounded-2xl border border-[var(--line)] bg-white px-4 py-3 outline-none focus:border-[var(--olive)]"
                      name="city"
                      required
                      type="text"
                    />
                  </label>
                  <label className="space-y-2 text-sm">
                    <span className="font-semibold">
                      {copy.householdTypeLabel as string}
                      <RequiredMark />
                    </span>
                    <select
                      className="w-full rounded-2xl border border-[var(--line)] bg-white px-4 py-3 outline-none focus:border-[var(--olive)]"
                      defaultValue=""
                      name="householdType"
                      required
                    >
                      <option value="" disabled />
                      <option value={copy.householdApartment as string}>
                        {copy.householdApartment as string}
                      </option>
                      <option value={copy.householdHouse as string}>
                        {copy.householdHouse as string}
                      </option>
                      <option value={copy.householdRural as string}>
                        {copy.householdRural as string}
                      </option>
                      <option value={copy.householdOther as string}>
                        {copy.householdOther as string}
                      </option>
                    </select>
                  </label>
                  <label className="space-y-2 text-sm">
                    <span className="font-semibold">
                      {copy.housingStatusLabel as string}
                      <RequiredMark />
                    </span>
                    <select
                      className="w-full rounded-2xl border border-[var(--line)] bg-white px-4 py-3 outline-none focus:border-[var(--olive)]"
                      defaultValue=""
                      name="housingStatus"
                      required
                    >
                      <option value="" disabled />
                      <option value={copy.housingOwn as string}>{copy.housingOwn as string}</option>
                      <option value={copy.housingRent as string}>{copy.housingRent as string}</option>
                      <option value={copy.housingFamily as string}>
                        {copy.housingFamily as string}
                      </option>
                      <option value={copy.housingOther as string}>
                        {copy.housingOther as string}
                      </option>
                    </select>
                  </label>
                  <label className="space-y-2 text-sm">
                    <span className="font-semibold">{copy.landlordLabel as string}</span>
                    <select
                      className="w-full rounded-2xl border border-[var(--line)] bg-white px-4 py-3 outline-none focus:border-[var(--olive)]"
                      defaultValue={copy.landlordNa as string}
                      name="landlordPermission"
                    >
                      <option value={copy.landlordYes as string}>{copy.landlordYes as string}</option>
                      <option value={copy.landlordNo as string}>{copy.landlordNo as string}</option>
                      <option value={copy.landlordNa as string}>{copy.landlordNa as string}</option>
                    </select>
                  </label>
                  <label className="space-y-2 text-sm">
                    <span className="font-semibold">{copy.childrenLabel as string}</span>
                    <select
                      className="w-full rounded-2xl border border-[var(--line)] bg-white px-4 py-3 outline-none focus:border-[var(--olive)]"
                      defaultValue={copy.childrenNo as string}
                      name="childrenAtHome"
                    >
                      <option value={copy.childrenNo as string}>{copy.childrenNo as string}</option>
                      <option value={copy.childrenYoung as string}>
                        {copy.childrenYoung as string}
                      </option>
                      <option value={copy.childrenOlder as string}>
                        {copy.childrenOlder as string}
                      </option>
                      <option value={copy.childrenMixed as string}>
                        {copy.childrenMixed as string}
                      </option>
                    </select>
                  </label>
                </div>

                <label className="block space-y-2 text-sm">
                  <span className="font-semibold">{copy.otherAnimalsLabel as string}</span>
                  <textarea
                    className="min-h-28 w-full rounded-[1.5rem] border border-[var(--line)] bg-white px-4 py-3 outline-none focus:border-[var(--olive)]"
                    name="otherAnimals"
                  />
                </label>

                <label className="block space-y-2 text-sm">
                  <span className="font-semibold">{copy.experienceLabel as string}</span>
                  <textarea
                    className="min-h-28 w-full rounded-[1.5rem] border border-[var(--line)] bg-white px-4 py-3 outline-none focus:border-[var(--olive)]"
                    name="experience"
                    placeholder={copy.experience as string}
                  />
                </label>

                <label className="block space-y-2 text-sm">
                  <span className="font-semibold">
                    {copy.motivationLabel as string}
                    <RequiredMark />
                  </span>
                  <textarea
                    className="min-h-28 w-full rounded-[1.5rem] border border-[var(--line)] bg-white px-4 py-3 outline-none focus:border-[var(--olive)]"
                    name="motivation"
                    placeholder={copy.motivation as string}
                    required
                  />
                </label>

                <label className="block space-y-2 text-sm">
                  <span className="font-semibold">{copy.availabilityLabel as string}</span>
                  <textarea
                    className="min-h-24 w-full rounded-[1.5rem] border border-[var(--line)] bg-white px-4 py-3 outline-none focus:border-[var(--olive)]"
                    name="availability"
                    placeholder={copy.availability as string}
                  />
                </label>

                <label className="flex items-start gap-3 rounded-[1.5rem] border border-[var(--line)] bg-white/80 px-4 py-4 text-sm">
                  <input className="mt-1 h-4 w-4" name="consent" required type="checkbox" />
                  <span>{copy.consent as string}</span>
                </label>

                {error ? <p className="text-sm font-medium text-[var(--coral)]">{error}</p> : null}

                <div className="flex flex-wrap gap-3">
                  <button
                    className="button-soft inline-flex rounded-full bg-[var(--coral)] px-5 py-3 text-sm font-semibold text-white disabled:cursor-not-allowed disabled:opacity-70"
                    disabled={isPending}
                    type="submit"
                  >
                    {isPending ? (copy.pending as string) : (copy.send as string)}
                  </button>
                  <button
                    className="button-soft inline-flex rounded-full border border-[var(--line-strong)] bg-white px-5 py-3 text-sm font-semibold"
                    onClick={() => setIsOpen(false)}
                    type="button"
                  >
                    {copy.cancel as string}
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      ) : null}
    </>
  );
};
