import { NextResponse, type NextRequest } from "next/server";

export function proxy(request: NextRequest) {
  const token = request.cookies.get("payload-token")?.value;

  if (!token || request.headers.has("authorization")) {
    return NextResponse.next();
  }

  const headers = new Headers(request.headers);
  headers.set("authorization", `Bearer ${token}`);

  return NextResponse.next({
    request: {
      headers,
    },
  });
}

export const config = {
  matcher: ["/admin/:path*", "/api/:path*"],
};
