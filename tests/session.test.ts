import { describe, it, expect, beforeEach, afterEach } from "vitest";
import { resolveSession, SESSION_COOKIE_NAME } from "@/lib/session/session";

// Minimal mock for NextRequest — only the cookies.get interface is used.
function makeRequest(sessionId?: string) {
  return {
    cookies: {
      get: (_name: string) =>
        sessionId !== undefined ? { value: sessionId } : undefined,
    },
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } as any;
}

// ─── SESSION_COOKIE_NAME ───────────────────────────────────────────────────

describe("SESSION_COOKIE_NAME", () => {
  it("is iis_session", () => {
    expect(SESSION_COOKIE_NAME).toBe("iis_session");
  });
});

// ─── resolveSession — existing cookie ─────────────────────────────────────

describe("resolveSession with existing valid cookie", () => {
  it("returns the existing session ID", async () => {
    const req = makeRequest("existing-session-id-12345");
    const result = await resolveSession(req);
    expect(result.sessionId).toBe("existing-session-id-12345");
  });

  it("does not set a new cookie when session exists", async () => {
    const req = makeRequest("existing-session-id-12345");
    const result = await resolveSession(req);
    expect(result.setCookieHeader).toBeUndefined();
  });

  it("accepts a UUID-shaped session value", async () => {
    const uuid = "550e8400-e29b-41d4-a716-446655440000";
    const req = makeRequest(uuid);
    const result = await resolveSession(req);
    expect(result.sessionId).toBe(uuid);
  });
});

// ─── resolveSession — short / missing cookie ──────────────────────────────

describe("resolveSession with missing or short cookie", () => {
  it("creates a new session when no cookie is present", async () => {
    const req = makeRequest(undefined);
    const result = await resolveSession(req);
    expect(result.sessionId).toBeTruthy();
    expect(result.setCookieHeader).toBeTruthy();
  });

  it("new session ID is a UUID-format string", async () => {
    const req = makeRequest(undefined);
    const result = await resolveSession(req);
    // UUID v4 pattern
    expect(result.sessionId).toMatch(
      /^[0-9a-f]{8}-[0-9a-f]{4}-4[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i
    );
  });

  it("treats a short cookie (<=8 chars) as missing and creates new session", async () => {
    const req = makeRequest("tooshort");
    const result = await resolveSession(req);
    expect(result.sessionId).not.toBe("tooshort");
    expect(result.setCookieHeader).toBeTruthy();
  });

  it("treats a 1-char cookie as missing", async () => {
    const req = makeRequest("x");
    const result = await resolveSession(req);
    expect(result.setCookieHeader).toBeTruthy();
  });

  it("treats an empty-string cookie as missing", async () => {
    const req = makeRequest("");
    const result = await resolveSession(req);
    expect(result.setCookieHeader).toBeTruthy();
  });
});

// ─── resolveSession — Set-Cookie header format ────────────────────────────

describe("resolveSession Set-Cookie header", () => {
  it("includes the session cookie name in the header", async () => {
    const req = makeRequest(undefined);
    const { setCookieHeader } = await resolveSession(req);
    expect(setCookieHeader).toContain("iis_session=");
  });

  it("includes Path=/", async () => {
    const req = makeRequest(undefined);
    const { setCookieHeader } = await resolveSession(req);
    expect(setCookieHeader).toContain("Path=/");
  });

  it("includes HttpOnly", async () => {
    const req = makeRequest(undefined);
    const { setCookieHeader } = await resolveSession(req);
    expect(setCookieHeader).toContain("HttpOnly");
  });

  it("includes SameSite=Lax", async () => {
    const req = makeRequest(undefined);
    const { setCookieHeader } = await resolveSession(req);
    expect(setCookieHeader).toContain("SameSite=Lax");
  });

  it("does not include Secure outside production", async () => {
    // NODE_ENV is 'test' in vitest
    const req = makeRequest(undefined);
    const { setCookieHeader } = await resolveSession(req);
    expect(setCookieHeader).not.toContain("Secure");
  });

  it("encodes the session ID value in the header", async () => {
    const req = makeRequest(undefined);
    const { sessionId, setCookieHeader } = await resolveSession(req);
    expect(setCookieHeader).toContain(encodeURIComponent(sessionId));
  });

  it("two new sessions get different IDs", async () => {
    const req1 = makeRequest(undefined);
    const req2 = makeRequest(undefined);
    const [r1, r2] = await Promise.all([
      resolveSession(req1),
      resolveSession(req2),
    ]);
    expect(r1.sessionId).not.toBe(r2.sessionId);
  });
});

// ─── resolveSession — production Secure flag ──────────────────────────────

describe("resolveSession Secure flag in production", () => {
  let originalEnv: string | undefined;

  beforeEach(() => {
    originalEnv = process.env.NODE_ENV;
    // @ts-expect-error NODE_ENV is normally read-only
    process.env.NODE_ENV = "production";
  });

  afterEach(() => {
    // @ts-expect-error restoring
    process.env.NODE_ENV = originalEnv;
  });

  it("includes Secure when NODE_ENV is production", async () => {
    const req = makeRequest(undefined);
    const { setCookieHeader } = await resolveSession(req);
    expect(setCookieHeader).toContain("Secure");
  });
});
