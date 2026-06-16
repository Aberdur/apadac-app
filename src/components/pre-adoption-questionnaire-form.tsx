"use client";

import { useMemo, useState, useTransition } from "react";

import type { Locale } from "@/lib/i18n";
import {
  preAdoptionQuestionnaireFields,
  preAdoptionQuestionnaireSections,
  type PreAdoptionField,
} from "@/lib/pre-adoption-questionnaire";

type PreAdoptionQuestionnaireFormProps = {
  locale: Locale;
  animals?: string[];
};

const RequiredMark = () => <span className="ml-1 text-[var(--coral)]">*</span>;

const copyByLocale = {
  de: {
    consent:
      "Ich bestätige, dass die Angaben wahr sind und APADAC mich zum Adoptionsprozess kontaktieren darf.",
    error: "Das Formular konnte nicht gesendet werden. Prüfe die Felder oder versuche es später erneut.",
    pending: "Wird gesendet...",
    send: "Fragebogen senden",
    sentText:
      "Der Fragebogen wurde gesendet. APADAC erhält deine Antworten per E-Mail und kann den Adoptionsprozess prüfen.",
    sentTitle: "Fragebogen gesendet",
    subtitle:
      "Dieses Formular ist unabhängig von der Anfrage in einer Tierakte. Es dient dazu, deine Situation vorab kennenzulernen.",
    title: "Cuestionario pre adopción",
  },
  en: {
    consent:
      "I confirm that the information is accurate and that APADAC may contact me about the adoption process.",
    error: "The form could not be sent. Please check the fields or try again later.",
    pending: "Sending...",
    send: "Send questionnaire",
    sentText:
      "The questionnaire has been sent. APADAC will receive your answers by email and can review the adoption process.",
    sentTitle: "Questionnaire sent",
    subtitle:
      "This form is separate from the request inside a specific animal profile. It helps APADAC understand your situation beforehand.",
    title: "Pre-adoption questionnaire",
  },
  es: {
    consent:
      "Confirmo que la información es veraz y que APADAC puede contactar conmigo sobre el proceso de adopción.",
    error: "No se ha podido enviar el cuestionario. Revisa los campos o inténtalo más tarde.",
    pending: "Enviando...",
    send: "Enviar cuestionario",
    sentText:
      "El cuestionario se ha enviado correctamente. APADAC recibirá tus respuestas por correo y podrá valorar el proceso de adopción.",
    sentTitle: "Cuestionario enviado",
    subtitle:
      "Este formulario es independiente de la solicitud que aparece dentro de la ficha de cada animal. Sirve para conocer tu situación antes de avanzar.",
    title: "Cuestionario pre adopción",
  },
} satisfies Record<
  Locale,
  {
    consent: string;
    error: string;
    pending: string;
    send: string;
    sentText: string;
    sentTitle: string;
    subtitle: string;
    title: string;
  }
>;

const renderField = (field: PreAdoptionField, animals: string[] = []) => {
  const baseClass =
    "w-full rounded-2xl border border-[var(--line)] bg-white px-4 py-3 text-sm outline-none focus:border-[var(--olive)]";
  const wrapperClass = field.wide ? "space-y-2 text-sm md:col-span-2" : "space-y-2 text-sm";

  return (
    <label className={wrapperClass} key={field.name}>
      <span className="font-semibold">
        {field.label}
        {field.required ? <RequiredMark /> : null}
      </span>
      {field.type === "textarea" ? (
        <textarea className={`${baseClass} min-h-28 leading-7`} name={field.name} required={field.required} />
      ) : field.type === "select" ? (
        <select className={baseClass} defaultValue="" name={field.name} required={field.required}>
          <option value="" disabled>Selecciona una opción</option>
          {field.options?.map((option) => (
            <option key={option} value={option}>{option}</option>
          ))}
        </select>
      ) : field.type === "animal-autocomplete" ? (
        <>
          <input
            className={baseClass}
            name={field.name}
            required={field.required}
            type="text"
            list="animal-names-list"
            autoComplete="off"
            placeholder="Empieza a escribir el nombre..."
          />
          <datalist id="animal-names-list">
            {animals.map((animalName) => (
              <option key={animalName} value={animalName} />
            ))}
          </datalist>
        </>
      ) : (
        <input className={baseClass} name={field.name} required={field.required} type={field.type || "text"} />
      )}
      {field.help ? <span className="block text-xs leading-5 text-[var(--muted)]">{field.help}</span> : null}
    </label>
  );
};

export function PreAdoptionQuestionnaireForm({ locale, animals = [] }: PreAdoptionQuestionnaireFormProps) {

  const copy = copyByLocale[locale];
  const [isPending, startTransition] = useTransition();
  const [error, setError] = useState<string | null>(null);
  const [sent, setSent] = useState(false);
  const totalRequired = useMemo(
    () => preAdoptionQuestionnaireFields.filter((field) => field.required).length,
    [],
  );

  return (
    <section
      className="overflow-hidden rounded-[2rem] border border-[var(--line)] bg-[var(--surface)] shadow-[var(--shadow)]"
      id="formulario"
    >
      <div className="grid gap-6 border-b border-[var(--line)] bg-[linear-gradient(135deg,rgba(240,196,173,0.34),rgba(216,195,224,0.28))] p-7 lg:grid-cols-[1.1fr_0.9fr] lg:p-9">
        <div>
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-[var(--olive)]">
            Formulario independiente
          </p>
          <h2 className="display-font mt-3 text-4xl leading-none sm:text-5xl">{copy.title}</h2>
          <p className="mt-4 max-w-3xl text-sm leading-8 text-[var(--muted)]">{copy.subtitle}</p>
        </div>
        <div className="grid gap-3 sm:grid-cols-3 lg:grid-cols-1">
          <div className="rounded-[1.4rem] border border-white/70 bg-white/75 p-4">
            <p className="text-3xl font-bold text-[var(--olive-deep)]">
              {preAdoptionQuestionnaireSections.length}
            </p>
            <p className="mt-1 text-xs font-semibold uppercase tracking-[0.14em] text-[var(--muted)]">
              bloques
            </p>
          </div>
          <div className="rounded-[1.4rem] border border-white/70 bg-white/75 p-4">
            <p className="text-3xl font-bold text-[var(--olive-deep)]">{totalRequired}</p>
            <p className="mt-1 text-xs font-semibold uppercase tracking-[0.14em] text-[var(--muted)]">
              campos clave
            </p>
          </div>
          <div className="rounded-[1.4rem] border border-white/70 bg-white/75 p-4">
            <p className="text-3xl font-bold text-[var(--olive-deep)]">1</p>
            <p className="mt-1 text-xs font-semibold uppercase tracking-[0.14em] text-[var(--muted)]">
              correo a APADAC
            </p>
          </div>
        </div>
      </div>

      {sent ? (
        <div className="p-7 lg:p-9">
          <div className="rounded-[1.75rem] border border-[var(--line)] bg-white/80 p-6">
            <h3 className="display-font text-3xl leading-none">{copy.sentTitle}</h3>
            <p className="mt-4 text-sm leading-8 text-[var(--muted)]">{copy.sentText}</p>
          </div>
        </div>
      ) : (
        <form
          className="space-y-6 p-7 lg:p-9"
          onSubmit={(event) => {
            event.preventDefault();
            setError(null);

            const form = event.currentTarget;
            const data = new FormData(form);

            startTransition(async () => {
              const values = Object.fromEntries(
                preAdoptionQuestionnaireFields.map((field) => [
                  field.name,
                  String(data.get(field.name) || ""),
                ]),
              );

              const response = await fetch("/api/pre-adoption-questionnaires", {
                body: JSON.stringify({
                  consent: data.get("consent") === "on",
                  values,
                  website: String(data.get("website") || ""),
                }),
                headers: {
                  "Content-Type": "application/json",
                },
                method: "POST",
              });

              if (!response.ok) {
                setError(copy.error);
                return;
              }

              form.reset();
              setSent(true);
            });
          }}
        >
          <input autoComplete="off" className="hidden" name="website" tabIndex={-1} />

          {preAdoptionQuestionnaireSections.map((section, index) => (
            <article
              className="overflow-hidden rounded-[1.75rem] border border-[var(--line)] bg-white/75 shadow-[0_14px_45px_rgba(111,83,100,0.08)]"
              key={section.title}
            >
              <div className="border-b border-[var(--line)] bg-[linear-gradient(90deg,rgba(240,196,173,0.34),rgba(216,195,224,0.18))] p-5 sm:p-6">
                <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[var(--olive)]">
                  Bloque {index + 1}
                </p>
                <h3 className="display-font mt-2 text-3xl leading-none">{section.title}</h3>
                <p className="mt-3 max-w-4xl text-sm leading-7 text-[var(--muted)]">
                  {section.description}
                </p>
              </div>
              <div className="p-5 sm:p-6">
                <div>
                  <div className="grid gap-4 md:grid-cols-2">{section.fields.map((field) => renderField(field, animals))}</div>
                </div>
              </div>
            </article>
          ))}

          <label className="flex items-start gap-3 rounded-[1.5rem] border border-[var(--line)] bg-white/80 px-4 py-4 text-sm">
            <input className="mt-1 h-4 w-4" name="consent" required type="checkbox" />
            <span>
              {copy.consent}
              <RequiredMark />
            </span>
          </label>

          {error ? <p className="text-sm font-medium text-[var(--coral)]">{error}</p> : null}

          <div className="flex flex-wrap items-center gap-3">
            <button
              className="button-soft inline-flex rounded-full bg-[var(--coral)] px-6 py-3 text-sm font-semibold text-white disabled:cursor-not-allowed disabled:opacity-70"
              disabled={isPending}
              type="submit"
            >
              {isPending ? copy.pending : copy.send}
            </button>
            <p className="text-xs leading-6 text-[var(--muted)]">
              Los campos marcados con <span className="text-[var(--coral)]">*</span> son necesarios
              para valorar correctamente el cuestionario.
            </p>
          </div>
        </form>
      )}
    </section>
  );
}
