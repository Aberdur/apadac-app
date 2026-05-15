const ALLOWED_LINK_PROTOCOLS = new Set(["http:", "https:", "mailto:", "tel:"]);

export const hasStaffRole = (user: unknown): user is { id: number | string; role?: string } =>
  Boolean(
    user &&
      typeof user === "object" &&
      "id" in user &&
      "role" in user &&
      ["admin", "editor", "adopciones"].includes(String((user as { role?: string }).role ?? "")),
  );

export const isAdminUser = (user: unknown): user is { id: number | string; role: "admin" } =>
  Boolean(
    user &&
      typeof user === "object" &&
      "id" in user &&
      "role" in user &&
      String((user as { role?: string }).role ?? "") === "admin",
  );

export const getPayloadSecret = () => {
  const secret = process.env.PAYLOAD_SECRET?.trim();

  if (secret) {
    return secret;
  }

  if (process.env.NODE_ENV === "production") {
    throw new Error("PAYLOAD_SECRET must be configured in production.");
  }

  return "apadac-local-dev-secret";
};

export const shouldUseSecureCookies = () => {
  const publicUrl =
    process.env.NEXT_PUBLIC_SERVER_URL?.trim() || process.env.PAYLOAD_PUBLIC_SERVER_URL?.trim();

  return Boolean(publicUrl?.startsWith("https://"));
};

export const sanitizeHref = (value: unknown) => {
  if (typeof value !== "string") {
    return null;
  }

  const href = value.trim();

  if (!href) {
    return null;
  }

  if (href.startsWith("/") || href.startsWith("#")) {
    return href;
  }

  try {
    const parsed = new URL(href);

    return ALLOWED_LINK_PROTOCOLS.has(parsed.protocol) ? href : null;
  } catch {
    return null;
  }
};

export const resolveSafeHref = (value: unknown, fallback: string) => sanitizeHref(value) ?? fallback;

export const isExternalHttpHref = (href: string) => /^https?:\/\//i.test(href);
