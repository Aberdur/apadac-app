import { NextResponse } from "next/server";

import { MailConfigurationError, sendMail } from "@/lib/mail";
import { getCMS } from "@/lib/payload";

export const runtime = "nodejs";

const MAX_REQUEST_BYTES = 20_000;
const RATE_LIMIT_WINDOW_MS = 10 * 60 * 1000;
const RATE_LIMIT_MAX_REQUESTS = 5;
const FIELD_LIMITS: Partial<Record<keyof AdoptionInquiryPayload, number>> = {
  availability: 1_000,
  childrenAtHome: 60,
  city: 120,
  email: 180,
  experience: 1_500,
  fullName: 120,
  householdType: 80,
  housingStatus: 80,
  landlordPermission: 80,
  motivation: 2_000,
  otherAnimals: 500,
  phone: 50,
  website: 120,
};

type RateLimitEntry = {
  count: number;
  resetAt: number;
};

const globalForAdoptionRateLimit = globalThis as typeof globalThis & {
  __apadacAdoptionRateLimit__?: Map<string, RateLimitEntry>;
};

const getRateLimitStore = () => {
  if (!globalForAdoptionRateLimit.__apadacAdoptionRateLimit__) {
    globalForAdoptionRateLimit.__apadacAdoptionRateLimit__ = new Map();
  }

  return globalForAdoptionRateLimit.__apadacAdoptionRateLimit__;
};

type AdoptionInquiryPayload = {
  animalId?: number | string;
  availability?: string;
  childrenAtHome?: string;
  city?: string;
  consent?: boolean;
  email?: string;
  experience?: string;
  fullName?: string;
  householdType?: string;
  housingStatus?: string;
  landlordPermission?: string;
  motivation?: string;
  otherAnimals?: string;
  phone?: string;
  website?: string;
};

const requiredFields = [
  "animalId",
  "fullName",
  "email",
  "phone",
  "city",
  "householdType",
  "housingStatus",
  "motivation",
] as const;

const getString = (value: unknown) =>
  typeof value === "string" ? value.trim() : "";

const hasValue = (value: unknown) => {
  if (typeof value === "number") {
    return true;
  }

  if (typeof value === "string") {
    return value.trim().length > 0;
  }

  return false;
};

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

const renderTableRows = (rows: Array<[label: string, value: string]>) =>
  rows
    .map(
      ([label, value]) => `
        <tr>
          <td style="padding: 10px 12px; border-bottom: 1px solid #e8e1d2; width: 220px; font-weight: 600; color: #314232; vertical-align: top;">
            ${escapeHtml(label)}
          </td>
          <td style="padding: 10px 12px; border-bottom: 1px solid #e8e1d2; color: #445347;">
            ${escapeHtml(value)}
          </td>
        </tr>
      `,
    )
    .join("");

const renderTextBlock = (title: string, value: string) => `
  <div style="margin-top: 18px;">
    <div style="margin-bottom: 8px; font-size: 14px; font-weight: 700; letter-spacing: 0.04em; text-transform: uppercase; color: #6f8b50;">
      ${escapeHtml(title)}
    </div>
    <div style="padding: 14px 16px; border: 1px solid #e8e1d2; border-radius: 16px; background: #faf7ef; color: #314232; line-height: 1.7;">
      ${value ? nl2br(value) : "No indicado"}
    </div>
  </div>
`;

const toId = (value: unknown) => {
  if (typeof value === "number" && Number.isFinite(value)) {
    return value;
  }

  if (typeof value === "string") {
    const trimmed = value.trim();
    const parsed = Number(trimmed);
    return Number.isFinite(parsed) ? parsed : trimmed;
  }

  return value;
};

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

  let body: AdoptionInquiryPayload;

  try {
    body = (await request.json()) as AdoptionInquiryPayload;
  } catch {
    return NextResponse.json({ error: "invalid_payload" }, { status: 400 });
  }

  if (getString(body.website)) {
    return NextResponse.json({ ok: true });
  }

  const missingField = requiredFields.find((field) => !hasValue(body[field]));

  if (missingField) {
    return NextResponse.json(
      { error: "missing_field", field: missingField },
      { status: 422 },
    );
  }

  if (!body.consent) {
    return NextResponse.json({ error: "consent_required" }, { status: 422 });
  }

  const email = getString(body.email);

  const oversizedField = Object.entries(FIELD_LIMITS).find(([field, maxLength]) => {
    if (!maxLength) {
      return false;
    }

    return getString(body[field as keyof AdoptionInquiryPayload]).length > maxLength;
  });

  if (oversizedField) {
    return NextResponse.json(
      { error: "field_too_long", field: oversizedField[0] },
      { status: 422 },
    );
  }

  if (!isValidEmail(email)) {
    return NextResponse.json({ error: "invalid_email" }, { status: 422 });
  }

  const payload = await getCMS();
  const animalId = toId(body.animalId);

  const { docs } = await payload.find({
    collection: "animals",
    depth: 0,
    limit: 1,
    overrideAccess: true,
    where: {
      id: {
        equals: animalId,
      },
    },
  });

  const animal = docs[0];

  if (!animal) {
    return NextResponse.json({ error: "animal_not_found" }, { status: 404 });
  }

  const helpSettings = await payload.findGlobal({
    slug: "como-ayudar",
  });

  const destination =
    getString(animal.adoptionContact) || getString(helpSettings.contactEmail);

  if (!destination) {
    return NextResponse.json({ error: "missing_recipient" }, { status: 500 });
  }

  const lines = [
    `Nueva solicitud de adopción para ${animal.name || "Animal"}`,
    "",
    `Animal: ${animal.name || "Animal"}`,
    `Ficha: ${animal.slug || animal.id}`,
    "",
    "Datos de la persona interesada",
    `Nombre: ${getString(body.fullName)}`,
    `Email: ${email}`,
    `Teléfono: ${getString(body.phone)}`,
    `Ciudad / zona: ${getString(body.city)}`,
    "",
    "Situación del hogar",
    `Tipo de vivienda: ${getString(body.householdType)}`,
    `Situación de vivienda: ${getString(body.housingStatus)}`,
    `Permiso del casero / propietario: ${getString(body.landlordPermission) || "No indicado"}`,
    `Niños en casa: ${getString(body.childrenAtHome)}`,
    `Otros animales: ${getString(body.otherAnimals) || "No indicado"}`,
    "",
    "Experiencia y motivación",
    `Experiencia previa: ${getString(body.experience)}`,
    `Motivación para adoptar a este animal: ${getString(body.motivation)}`,
    `Disponibilidad / comentario adicional: ${getString(body.availability) || "No indicado"}`,
  ];

  const text = lines.join("\n");
  const animalLabel = String(animal.name || "Animal");
  const animalRecord = String(animal.slug || animal.id);
  const publicOrigin =
    process.env.NEXT_PUBLIC_SERVER_URL?.trim() || process.env.PAYLOAD_PUBLIC_SERVER_URL?.trim();
  const animalUrl =
    publicOrigin && animal.slug ? `${publicOrigin.replace(/\/$/, "")}/adopta/${animal.slug}` : null;
  const html = `
    <div style="margin: 0; padding: 24px; background: #f6f3e8; font-family: Georgia, 'Times New Roman', serif; color: #243424;">
      <div style="max-width: 760px; margin: 0 auto; overflow: hidden; border: 1px solid #e8e1d2; border-radius: 24px; background: #ffffff;">
        <div style="padding: 28px 32px; background: linear-gradient(135deg, #314232 0%, #6f8b50 100%); color: #ffffff;">
          <div style="font-size: 12px; letter-spacing: 0.18em; text-transform: uppercase; opacity: 0.8;">APADAC</div>
          <h2 style="margin: 10px 0 0; font-size: 30px; line-height: 1.2;">Nueva solicitud de adopción</h2>
          <p style="margin: 12px 0 0; font-size: 16px; line-height: 1.6; opacity: 0.92;">
            ${escapeHtml(animalLabel)} · ${escapeHtml(animalRecord)}
          </p>
        </div>

        <div style="padding: 28px 32px;">
          <div style="margin-bottom: 24px; padding: 18px 20px; border-radius: 18px; background: #faf7ef; border: 1px solid #eee4cf;">
            <div style="margin-bottom: 6px; font-size: 13px; font-weight: 700; letter-spacing: 0.08em; text-transform: uppercase; color: #6f8b50;">
              Animal
            </div>
            <div style="font-size: 24px; font-weight: 700; color: #243424;">${escapeHtml(animalLabel)}</div>
            <div style="margin-top: 6px; color: #5b675d;">Ficha: ${escapeHtml(animalRecord)}</div>
            ${
              animalUrl
                ? `<div style="margin-top: 14px;"><a href="${escapeHtml(animalUrl)}" style="display: inline-block; padding: 10px 14px; border-radius: 999px; background: #d9b321; color: #243424; font-weight: 700; text-decoration: none;">Ver ficha del animal</a></div>`
                : ""
            }
          </div>

          <div style="margin-top: 24px;">
            <div style="margin-bottom: 10px; font-size: 14px; font-weight: 700; letter-spacing: 0.04em; text-transform: uppercase; color: #6f8b50;">
              Datos de contacto
            </div>
            <table role="presentation" cellspacing="0" cellpadding="0" style="width: 100%; border-collapse: collapse; border: 1px solid #e8e1d2; border-radius: 18px; overflow: hidden; background: #ffffff;">
              ${renderTableRows([
                ["Nombre", getString(body.fullName)],
                ["Email", email],
                ["Teléfono", getString(body.phone)],
                ["Ciudad / zona", getString(body.city)],
              ])}
            </table>
          </div>

          <div style="margin-top: 24px;">
            <div style="margin-bottom: 10px; font-size: 14px; font-weight: 700; letter-spacing: 0.04em; text-transform: uppercase; color: #6f8b50;">
              Situación del hogar
            </div>
            <table role="presentation" cellspacing="0" cellpadding="0" style="width: 100%; border-collapse: collapse; border: 1px solid #e8e1d2; border-radius: 18px; overflow: hidden; background: #ffffff;">
              ${renderTableRows([
                ["Tipo de vivienda", getString(body.householdType)],
                ["Situación de vivienda", getString(body.housingStatus)],
                ["Permiso del casero / propietario", getString(body.landlordPermission) || "No indicado"],
                ["Niños en casa", getString(body.childrenAtHome) || "No indicado"],
                ["Otros animales", getString(body.otherAnimals) || "No indicado"],
              ])}
            </table>
          </div>

          ${renderTextBlock("Experiencia previa", getString(body.experience))}
          ${renderTextBlock("Motivación para adoptar a este animal", getString(body.motivation))}
          ${renderTextBlock("Disponibilidad / comentario adicional", getString(body.availability))}
        </div>
      </div>
    </div>
  `;

  try {
    await sendMail({
      html,
      replyTo: email,
      subject: `[APADAC] Solicitud de adopción: ${animalLabel}`,
      text,
      to: destination,
    });

    if (shouldSendReceipt(email, destination)) {
      await sendMail({
        html: `
          <div style="margin: 0; padding: 24px; background: #f6f3e8; font-family: Georgia, 'Times New Roman', serif; color: #243424;">
            <div style="max-width: 760px; margin: 0 auto; overflow: hidden; border: 1px solid #e8e1d2; border-radius: 24px; background: #ffffff;">
              <div style="padding: 28px 32px; background: linear-gradient(135deg, #314232 0%, #6f8b50 100%); color: #ffffff;">
                <div style="font-size: 12px; letter-spacing: 0.18em; text-transform: uppercase; opacity: 0.8;">APADAC</div>
                <h2 style="margin: 10px 0 0; font-size: 30px; line-height: 1.2;">Hemos recibido tu solicitud</h2>
                <p style="margin: 12px 0 0; font-size: 16px; line-height: 1.6; opacity: 0.92;">
                  ${escapeHtml(animalLabel)} · ${escapeHtml(animalRecord)}
                </p>
              </div>
              <div style="padding: 28px 32px;">
                <p style="margin: 0; color: #445347; line-height: 1.8;">
                  Hemos recibido correctamente tu solicitud de adopción para <strong>${escapeHtml(animalLabel)}</strong>.
                  El equipo de APADAC la revisará y se pondrá en contacto contigo si necesita ampliar información.
                </p>
                <div style="margin-top: 22px; padding: 18px 20px; border-radius: 18px; background: #faf7ef; border: 1px solid #eee4cf;">
                  <div style="margin-bottom: 8px; font-size: 13px; font-weight: 700; letter-spacing: 0.08em; text-transform: uppercase; color: #6f8b50;">
                    Resumen enviado
                  </div>
                  <div style="color: #243424; line-height: 1.8;">${nl2br(text)}</div>
                </div>
              </div>
            </div>
          </div>
        `,
        subject: `[APADAC] Confirmación de solicitud: ${animalLabel}`,
        text:
          `Hemos recibido correctamente tu solicitud de adopción para ${animalLabel}.\n\n` +
          `Resumen enviado:\n\n${text}`,
        to: email,
      });
    }
  } catch (error) {
    console.error("adoption inquiry mail error", error);
    if (error instanceof MailConfigurationError) {
      return NextResponse.json({ error: "smtp_not_configured" }, { status: 500 });
    }
    return NextResponse.json({ error: "mail_failed" }, { status: 500 });
  }

  return NextResponse.json({ ok: true });
}
