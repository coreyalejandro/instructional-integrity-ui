import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";

import { SESSION_COOKIE_NAME } from "@/lib/session/session";

/** §12.2 — reject browser cross-origin API calls unless origin is allowlisted. */
function crossOriginApiBlocked(request: NextRequest): NextResponse | null {
  if (!request.nextUrl.pathname.startsWith("/api")) return null;
  const origin = request.headers.get("origin");
  if (!origin) return null;
  const self = request.nextUrl.origin;
  const allowed = new Set<string>([self]);
  const extra = process.env.CORS_ALLOWED_ORIGINS?.split(",")
    .map((s) => s.trim())
    .filter(Boolean);
  if (extra) for (const o of extra) allowed.add(o);
  if (allowed.has(origin)) return null;
  return NextResponse.json(
    {
      error: {
        code: "CORS_FORBIDDEN",
        message: "Cross-origin API access is not allowed for this origin.",
        recoveryGuidance:
          "Use the app from the same origin, or set CORS_ALLOWED_ORIGINS for trusted browser origins when self-hosting.",
        details: { origin }
      }
    },
    { status: 403 }
  );
}

/** Next.js 16+ — replaces deprecated `middleware` convention (network boundary: session cookie, headers, CORS). */
export function proxy(request: NextRequest) {
  const blocked = crossOriginApiBlocked(request);
  if (blocked) return blocked;

  const res = NextResponse.next();
  if (!request.cookies.get(SESSION_COOKIE_NAME)?.value) {
    res.cookies.set(SESSION_COOKIE_NAME, crypto.randomUUID(), {
      httpOnly: true,
      sameSite: "lax",
      path: "/",
      maxAge: 60 * 60 * 24 * 400
    });
  }
  res.headers.set("X-Content-Type-Options", "nosniff");
  res.headers.set("X-Frame-Options", "DENY");
  res.headers.set("Referrer-Policy", "strict-origin-when-cross-origin");
  if (request.nextUrl.protocol === "https:") {
    res.headers.set("Strict-Transport-Security", "max-age=63072000; includeSubDomains; preload");
  }
  const csp = [
    "default-src 'self'",
    "script-src 'self' 'unsafe-inline' 'unsafe-eval'",
    "style-src 'self' 'unsafe-inline'",
    "img-src 'self' data:",
    "font-src 'self'",
    "connect-src 'self'",
    "frame-ancestors 'none'",
    "base-uri 'self'",
    "form-action 'self'"
  ].join("; ");
  res.headers.set("Content-Security-Policy", csp);
  return res;
}

export const config = {
  matcher: ["/((?!_next/static|_next/image|favicon.ico).*)"]
};
