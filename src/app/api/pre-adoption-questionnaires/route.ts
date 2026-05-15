import { NextResponse } from "next/server";

import { MailConfigurationError, sendMail } from "@/lib/mail";
import { getCMS } from "@/lib/payload";
import {
  preAdoptionQuestionnaireFields,
  preAdoptionQuestionnaireSections,
} from "@/lib/pre-adoption-questionnaire";

export const runtime = "nodejs";

const MAX_REQUEST_BYTES = 80_000;
const RATE_LIMIT_WINDOW_MS = 10 * 60 * 1000;
const RATE_LIMIT_MAX_REQUESTS = 3;
const FIELD_MAX_LENGTH = 2_000;

type RateLimitEntry = {
  count: number;
  resetAt: number;
};

type PreAdoptionQuestionnairePayload = {
  consent?: boolean;
  values?: Record<string, unknown>;
  website?: string;
};

const globalForPreAdoptionRateLimit = globalThis as typeof globalThis & {
  __apadacPreAdoptionRateLimit__?: Map<string, RateLimitEntry>;
};

const getRateLimitStore = () => {
  if (!globalForPreAdoptionRateLimit.__apadacPreAdoptionRateLimit__) {
    globalForPreAdoptionRateLimit.__apadacPreAdoptionRateLimit__ = new Map();
  }

  return globalForPreAdoptionRateLimit.__apadacPreAdoptionRateLimit__;
};

const getString = (value: unknown) =>
  typeof value === "string" ? value.trim() : "";

const isValidEmail = (value: string) => /\S+@\S+\.\S+/.test(value);

const escapeHtml = (value: string) =>
  value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#39;");

const nl2br = (value: string) => escapeHtml(value).replaceAll("\n", "<br />");
const shouldSendReceipt = (sender: string, recipient: string) =>
  sender.toLowerCase() !== recipient.toLowerCase();

const getClientIP = (request: Request) =>
  request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ||
  request.headers.get("x-real-ip")?.trim() ||
  "unknown";

const consumeRateLimit = (ip: string) => {
  const now = Date.now();
  const store = getRateLimitStore();

  for (const [key, entry] of store.entries()) {
    if (entry.resetAt <= now) {
      store.delete(key);
    }
  }

  const current = store.get(ip);

  if (!current || current.resetAt <= now) {
    store.set(ip, {
      count: 1,
      resetAt: now + RATE_LIMIT_WINDOW_MS,
    });

    return { allowed: true, retryAfter: RATE_LIMIT_WINDOW_MS };
  }

  if (current.count >= RATE_LIMIT_MAX_REQUESTS) {
    return { allowed: false, retryAfter: Math.max(1, current.resetAt - now) };
  }

  current.count += 1;
  store.set(ip, current);

  return { allowed: true, retryAfter: Math.max(1, current.resetAt - now) };
};

const renderTableRows = (rows: Array<[label: string, value: string]>) =>
  rows
    .map(
      ([label, value]) => `
        <tr>
          <td style="padding: 10px 12px; border-bottom: 1px solid #eadfde; width: 245px; font-weight: 700; color: #314232; vertical-align: top;">
            ${escapeHtml(label)}
          </td>
          <td style="padding: 10px 12px; border-bottom: 1px solid #eadfde; color: #445347; line-height: 1.65;">
            ${value ? nl2br(value) : "No indicado"}
          </td>
        </tr>
      `,
    )
    .join("");

export async function POST(request: Request) {
  const contentLength = Number(request.headers.get("content-length") || "0");

  if (Number.isFinite(contentLength) && contentLength > MAX_REQUEST_BYTES) {
    return NextResponse.json({ error: "payload_too_large" }, { status: 413 });
  }

  const rateLimit = consumeRateLimit(getClientIP(request));

  if (!rateLimit.allowed) {
    return NextResponse.json(
      { error: "too_many_requests" },
      {
        headers: {
          "Retry-After": String(Math.ceil(rateLimit.retryAfter / 1000)),
        },
        status: 429,
      },
    );
  }

  let body: PreAdoptionQuestionnairePayload;

  try {
    body = (await request.json()) as PreAdoptionQuestionnairePayload;
  } catch {
    return NextResponse.json({ error: "invalid_payload" }, { status: 400 });
  }

  if (getString(body.website)) {
    return NextResponse.json({ ok: true });
  }

  const values = body.values && typeof body.values === "object" ? body.values : {};

  const missingField = preAdoptionQuestionnaireFields.find(
    (field) => field.required && !getString(values[field.name]),
  );

  if (missingField) {
    return NextResponse.json(
      { error: "missing_field", field: missingField.name },
      { status: 422 },
    );
  }

  if (!body.consent) {
    return NextResponse.json({ error: "consent_required" }, { status: 422 });
  }

  const oversizedField = preAdoptionQuestionnaireFields.find(
    (field) => getString(values[field.name]).length > FIELD_MAX_LENGTH,
  );

  if (oversizedField) {
    return NextResponse.json(
      { error: "field_too_long", field: oversizedField.name },
      { status: 422 },
    );
  }

  const email = getString(values.email);

  if (!isValidEmail(email)) {
    return NextResponse.json({ error: "invalid_email" }, { status: 422 });
  }

  const payload = await getCMS();
  const helpSettings = await payload.findGlobal({
    slug: "como-ayudar",
  });
  const destination =
    getString(helpSettings.contactEmail) ||
    getString(process.env.ADOPTION_INQUIRIES_EMAIL) ||
    getString(process.env.SMTP_FROM_EMAIL);

  if (!destination) {
    return NextResponse.json({ error: "missing_recipient" }, { status: 500 });
  }

  const fullName = `${getString(values.firstName)} ${getString(values.lastName)}`.trim();
  const animalName = getString(values.animalName) || "Sin animal indicado";
  const text = [
    "Nuevo cuestionario pre adopción",
    "",
    `Animal elegido: ${animalName}`,
    `Tipo de animal: ${getString(values.animalType)}`,
    `Nombre: ${fullName}`,
    `Email: ${email}`,
    `Teléfono: ${getString(values.phone)}`,
    "",
    ...preAdoptionQuestionnaireSections.flatMap((section) => [
      section.title,
      ...section.fields.map((field) => `${field.label}: ${getString(values[field.name]) || "No indicado"}`),
      "",
    ]),
  ].join("\n");

  const sectionsHtml = preAdoptionQuestionnaireSections
    .map(
      (section) => `
        <div style="margin-top: 24px;">
          <div style="margin-bottom: 10px; font-size: 14px; font-weight: 800; letter-spacing: 0.06em; text-transform: uppercase; color: #8f7c8f;">
            ${escapeHtml(section.title)}
          </div>
          <table role="presentation" cellspacing="0" cellpadding="0" style="width: 100%; border-collapse: collapse; border: 1px solid #eadfde; border-radius: 18px; overflow: hidden; background: #ffffff;">
            ${renderTableRows(section.fields.map((field) => [field.label, getString(values[field.name])]))}
          </table>
        </div>
      `,
    )
    .join("");

  const html = `
    <div style="margin: 0; padding: 24px; background: #fbf5ee; font-family: Georgia, 'Times New Roman', serif; color: #243424;">
      <div style="max-width: 820px; margin: 0 auto; overflow: hidden; border: 1px solid #eadfde; border-radius: 24px; background: #ffffff;">
        <div style="padding: 28px 32px; background: linear-gradient(135deg, #d79b8c 0%, #d8c3e0 55%, #f2d4c5 100%); color: #243424;">
          <div style="font-size: 12px; letter-spacing: 0.18em; text-transform: uppercase; opacity: 0.78;">APADAC</div>
          <h2 style="margin: 10px 0 0; font-size: 30px; line-height: 1.2;">Nuevo cuestionario pre adopción</h2>
          <p style="margin: 12px 0 0; font-size: 16px; line-height: 1.6; opacity: 0.92;">
            ${escapeHtml(animalName)} · ${escapeHtml(fullName || "Sin nombre")}
          </p>
        </div>

        <div style="padding: 28px 32px;">
          <div style="margin-bottom: 24px; padding: 18px 20px; border-radius: 18px; background: #fff8f4; border: 1px solid #eadfde;">
            <div style="margin-bottom: 8px; font-size: 13px; font-weight: 800; letter-spacing: 0.08em; text-transform: uppercase; color: #8f7c8f;">
              Resumen
            </div>
            <div style="font-size: 24px; font-weight: 800; color: #243424;">${escapeHtml(animalName)}</div>
            <div style="margin-top: 8px; color: #5b675d; line-height: 1.7;">
              ${escapeHtml(fullName || "Sin nombre")} · ${escapeHtml(email)} · ${escapeHtml(getString(values.phone))}
            </div>
          </div>

          ${sectionsHtml}
        </div>
      </div>
    </div>
  `;

  try {
    await sendMail({
      html,
      replyTo: email,
      subject: `[APADAC] Cuestionario pre adopción: ${animalName}`,
      text,
      to: destination,
    });

    if (shouldSendReceipt(email, destination)) {
      await sendMail({
        html: `
          <div style="margin: 0; padding: 24px; background: #fbf5ee; font-family: Georgia, 'Times New Roman', serif; color: #243424;">
            <div style="max-width: 820px; margin: 0 auto; overflow: hidden; border: 1px solid #eadfde; border-radius: 24px; background: #ffffff;">
              <div style="padding: 28px 32px; background: linear-gradient(135deg, #d79b8c 0%, #d8c3e0 55%, #f2d4c5 100%); color: #243424;">
                <div style="font-size: 12px; letter-spacing: 0.18em; text-transform: uppercase; opacity: 0.78;">APADAC</div>
                <h2 style="margin: 10px 0 0; font-size: 30px; line-height: 1.2;">Hemos recibido tu cuestionario</h2>
                <p style="margin: 12px 0 0; font-size: 16px; line-height: 1.6; opacity: 0.92;">
                  ${escapeHtml(animalName)} · ${escapeHtml(fullName || "Sin nombre")}
                </p>
              </div>
              <div style="padding: 28px 32px;">
                <p style="margin: 0; color: #445347; line-height: 1.8;">
                  Hemos recibido correctamente tu cuestionario de preadopción. El equipo de APADAC lo revisará y contactará contigo si necesita ampliar información.
                </p>
                <div style="margin-top: 22px; padding: 18px 20px; border-radius: 18px; background: #fff8f4; border: 1px solid #eadfde;">
                  <div style="margin-bottom: 8px; font-size: 13px; font-weight: 800; letter-spacing: 0.08em; text-transform: uppercase; color: #8f7c8f;">
                    Resumen enviado
                  </div>
                  <div style="color: #243424; line-height: 1.8;">${nl2br(text)}</div>
                </div>
              </div>
            </div>
          </div>
        `,
        subject: `[APADAC] Confirmación de cuestionario: ${animalName}`,
        text:
          `Hemos recibido correctamente tu cuestionario de preadopción.\n\n` +
          `Resumen enviado:\n\n${text}`,
        to: email,
      });
    }
  } catch (error) {
    console.error("pre-adoption questionnaire mail error", error);
    if (error instanceof MailConfigurationError) {
      return NextResponse.json({ error: "smtp_not_configured" }, { status: 500 });
    }
    return NextResponse.json({ error: "mail_failed" }, { status: 500 });
  }

  return NextResponse.json({ ok: true });
}
