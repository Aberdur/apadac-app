import { NextRequest, NextResponse } from "next/server";

import { getLocaleFromValue, localeCookieName } from "@/lib/i18n";

export const dynamic = "force-dynamic";

const getPublicOrigin = (request: NextRequest) => {
  const forwardedHost = request.headers.get("x-forwarded-host");
  const host = forwardedHost?.split(",")[0]?.trim() || request.headers.get("host") || request.nextUrl.host;
  const forwardedProto = request.headers.get("x-forwarded-proto");
  const protocol =
    forwardedProto?.split(",")[0]?.trim() || request.nextUrl.protocol.replace(/:$/, "") || "http";

  return `${protocol}://${host}`;
};

export function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const locale = getLocaleFromValue(searchParams.get("locale"));
  const redirectParam = searchParams.get("redirect");
  const redirect = redirectParam && redirectParam.startsWith("/") ? redirectParam : "/";
  const response = NextResponse.redirect(new URL(redirect, getPublicOrigin(request)));

  response.cookies.set(localeCookieName, locale, {
    maxAge: 60 * 60 * 24 * 365,
    path: "/",
    sameSite: "lax",
  });

  return response;
}
