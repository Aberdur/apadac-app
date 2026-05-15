import nodemailer from "nodemailer";

export class MailConfigurationError extends Error {
  constructor(message: string) {
    super(message);
    this.name = "MailConfigurationError";
  }
}

type MailOptions = {
  html?: string;
  replyTo?: string;
  subject: string;
  text: string;
  to: string;
};

const parsePort = (value: string | undefined) => {
  const port = Number(value || "587");
  return Number.isFinite(port) ? port : 587;
};

const getMailConfig = () => {
  const host = process.env.SMTP_HOST;
  const user = process.env.SMTP_USER;
  const pass = process.env.SMTP_PASS;
  const fromEmail = process.env.SMTP_FROM_EMAIL || user;

  if (!host || !fromEmail) {
    throw new MailConfigurationError("SMTP is not configured");
  }

  return {
    auth:
      user && pass
        ? {
            pass,
            user,
          }
        : undefined,
    fromEmail,
    fromName: process.env.SMTP_FROM_NAME || "APADAC",
    host,
    port: parsePort(process.env.SMTP_PORT),
    secure:
      process.env.SMTP_SECURE === "true" ||
      parsePort(process.env.SMTP_PORT) === 465,
  };
};

const globalForMail = globalThis as typeof globalThis & {
  apadacTransporter?: nodemailer.Transporter;
};

const getTransporter = () => {
  if (globalForMail.apadacTransporter) {
    return globalForMail.apadacTransporter;
  }

  const config = getMailConfig();

  const transporter = nodemailer.createTransport({
    auth: config.auth,
    host: config.host,
    port: config.port,
    secure: config.secure,
  });

  globalForMail.apadacTransporter = transporter;

  return transporter;
};

export const sendMail = async ({ html, replyTo, subject, text, to }: MailOptions) => {
  const config = getMailConfig();
  const transporter = getTransporter();

  await transporter.sendMail({
    from: `"${config.fromName}" <${config.fromEmail}>`,
    html,
    replyTo,
    subject,
    text,
    to,
  });
};
