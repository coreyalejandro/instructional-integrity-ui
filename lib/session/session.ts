import type { NextRequest } from "next/server";

export const SESSION_COOKIE_NAME = "iis_session";

function buildSessionCookie(value: string): string {
  const parts = [
    `${SESSION_COOKIE_NAME}=${encodeURIComponent(value)}`,
    "Path=/",
    "HttpOnly",
    "SameSite=Lax",
    process.env.NODE_ENV === "production" ? "Secure" : ""
  ].filter(Boolean);
  return parts.join("; ");
}

export async function resolveSession(request: NextRequest): Promise<{
  sessionId: string;
  setCookieHeader?: string;
}> {
  const existing = request.cookies.get(SESSION_COOKIE_NAME)?.value;
  if (existing && existing.length > 8) {
    return { sessionId: existing };
  }
  const sessionId = crypto.randomUUID();
  return {
    sessionId,
    setCookieHeader: buildSessionCookie(sessionId)
  };
}
