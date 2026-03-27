import { describe, it, expect } from "vitest";
import { mapKnownError, jsonError } from "@/lib/api/httpError";
import { recoveryForKnownError } from "@/lib/api/recoveryMessages";
import { prismaVerdictToLabel } from "@/lib/verdict-map";
import { ERROR_CODES } from "@/lib/domain/errorTypes";

// ─── jsonError ─────────────────────────────────────────────────────────────

describe("jsonError", () => {
  it("returns a Response object", () => {
    const resp = jsonError(ERROR_CODES.EMPTY_INPUT, "Empty", "Provide text.", 400);
    expect(resp).toBeTruthy();
    // NextResponse extends Response
    expect(typeof resp.status).toBe("number");
  });

  it("sets the correct HTTP status", () => {
    const resp = jsonError(ERROR_CODES.INPUT_TOO_LARGE, "Too large", "Shorten.", 413);
    expect(resp.status).toBe(413);
  });
});

// ─── prismaVerdictToLabel ──────────────────────────────────────────────────

describe("prismaVerdictToLabel", () => {
  it("maps PASS to pass", () => {
    expect(prismaVerdictToLabel("PASS")).toBe("pass");
  });

  it("maps WARN to warn", () => {
    expect(prismaVerdictToLabel("WARN")).toBe("warn");
  });

  it("maps FAIL to fail", () => {
    expect(prismaVerdictToLabel("FAIL")).toBe("fail");
  });

  it("maps NEEDS_HUMAN_REVIEW to needs_human_review", () => {
    expect(prismaVerdictToLabel("NEEDS_HUMAN_REVIEW")).toBe("needs_human_review");
  });

  it("maps unknown string to needs_human_review", () => {
    expect(prismaVerdictToLabel("UNKNOWN")).toBe("needs_human_review");
  });

  it("maps empty string to needs_human_review", () => {
    expect(prismaVerdictToLabel("")).toBe("needs_human_review");
  });
});

// ─── recoveryForKnownError ────────────────────────────────────────────────

describe("recoveryForKnownError", () => {
  it("returns a string for EMPTY_INPUT", () => {
    expect(typeof recoveryForKnownError(ERROR_CODES.EMPTY_INPUT)).toBe("string");
  });

  it("returns a string for INPUT_TOO_LARGE", () => {
    expect(typeof recoveryForKnownError(ERROR_CODES.INPUT_TOO_LARGE)).toBe("string");
  });

  it("returns a string for UNSUPPORTED_MEDIA_TYPE", () => {
    expect(typeof recoveryForKnownError(ERROR_CODES.UNSUPPORTED_MEDIA_TYPE)).toBe("string");
  });

  it("returns a string for INVALID_EXTENSION", () => {
    expect(typeof recoveryForKnownError(ERROR_CODES.INVALID_EXTENSION)).toBe("string");
  });

  it("returns a string for MISMATCHED_TYPE", () => {
    expect(typeof recoveryForKnownError(ERROR_CODES.MISMATCHED_TYPE)).toBe("string");
  });

  it("returns a string for ENCODING_INVALID", () => {
    expect(typeof recoveryForKnownError(ERROR_CODES.ENCODING_INVALID)).toBe("string");
  });

  it("returns a string for NORMALIZATION_FAILED", () => {
    expect(typeof recoveryForKnownError(ERROR_CODES.NORMALIZATION_FAILED)).toBe("string");
  });

  it("returns a string for UPLOAD_NOT_FOUND", () => {
    expect(typeof recoveryForKnownError(ERROR_CODES.UPLOAD_NOT_FOUND)).toBe("string");
  });

  it("returns a string for SAMPLE_NOT_FOUND", () => {
    expect(typeof recoveryForKnownError(ERROR_CODES.SAMPLE_NOT_FOUND)).toBe("string");
  });

  it("returns a string for CONCURRENT_LIMIT", () => {
    expect(typeof recoveryForKnownError(ERROR_CODES.CONCURRENT_LIMIT)).toBe("string");
  });

  it("returns a string for CORS_FORBIDDEN", () => {
    expect(typeof recoveryForKnownError(ERROR_CODES.CORS_FORBIDDEN)).toBe("string");
  });

  it("returns default fallback for other codes", () => {
    // Cast to satisfy TypeScript — exercising the default branch
    const msg = recoveryForKnownError("INTERNAL" as typeof ERROR_CODES.INTERNAL);
    expect(typeof msg).toBe("string");
    expect(msg.length).toBeGreaterThan(0);
  });

  it("EMPTY_INPUT message mentions providing text", () => {
    const msg = recoveryForKnownError(ERROR_CODES.EMPTY_INPUT);
    expect(msg.toLowerCase()).toContain("text");
  });

  it("INPUT_TOO_LARGE message mentions limit or size", () => {
    const msg = recoveryForKnownError(ERROR_CODES.INPUT_TOO_LARGE);
    expect(msg.toLowerCase()).toMatch(/limit|shorten|smaller/);
  });

  it("CONCURRENT_LIMIT message mentions retry", () => {
    const msg = recoveryForKnownError(ERROR_CODES.CONCURRENT_LIMIT);
    expect(msg.toLowerCase()).toContain("retry");
  });
});

// ─── mapKnownError ─────────────────────────────────────────────────────────

describe("mapKnownError", () => {
  function makeError(code: string, message = "test error") {
    const err = new Error(message) as Error & { code: string };
    err.code = code;
    return err;
  }

  it("maps EMPTY_INPUT to 400", () => {
    const r = mapKnownError(makeError(ERROR_CODES.EMPTY_INPUT));
    expect(r).not.toBeNull();
    expect(r!.status).toBe(400);
    expect(r!.code).toBe(ERROR_CODES.EMPTY_INPUT);
  });

  it("maps INPUT_TOO_LARGE to 413", () => {
    const r = mapKnownError(makeError(ERROR_CODES.INPUT_TOO_LARGE));
    expect(r!.status).toBe(413);
  });

  it("maps UNSUPPORTED_MEDIA_TYPE to 415", () => {
    const r = mapKnownError(makeError(ERROR_CODES.UNSUPPORTED_MEDIA_TYPE));
    expect(r!.status).toBe(415);
  });

  it("maps INVALID_EXTENSION to 400", () => {
    const r = mapKnownError(makeError(ERROR_CODES.INVALID_EXTENSION));
    expect(r!.status).toBe(400);
    expect(r!.code).toBe(ERROR_CODES.INVALID_EXTENSION);
  });

  it("maps MISMATCHED_TYPE to 400", () => {
    const r = mapKnownError(makeError(ERROR_CODES.MISMATCHED_TYPE));
    expect(r!.status).toBe(400);
    expect(r!.code).toBe(ERROR_CODES.MISMATCHED_TYPE);
  });

  it("maps ENCODING_INVALID to 400", () => {
    const r = mapKnownError(makeError(ERROR_CODES.ENCODING_INVALID));
    expect(r!.status).toBe(400);
  });

  it("maps NORMALIZATION_FAILED to 400", () => {
    const r = mapKnownError(makeError(ERROR_CODES.NORMALIZATION_FAILED));
    expect(r!.status).toBe(400);
  });

  it("maps UPLOAD_NOT_FOUND to 400", () => {
    const r = mapKnownError(makeError(ERROR_CODES.UPLOAD_NOT_FOUND));
    expect(r!.status).toBe(400);
  });

  it("maps SAMPLE_NOT_FOUND to 400", () => {
    const r = mapKnownError(makeError(ERROR_CODES.SAMPLE_NOT_FOUND));
    expect(r!.status).toBe(400);
  });

  it("preserves error message in result", () => {
    const r = mapKnownError(makeError(ERROR_CODES.EMPTY_INPUT, "custom msg"));
    expect(r!.message).toBe("custom msg");
  });

  it("returns null for error without code", () => {
    expect(mapKnownError(new Error("no code"))).toBeNull();
  });

  it("returns null for unknown code", () => {
    expect(mapKnownError(makeError("SOME_UNKNOWN_CODE"))).toBeNull();
  });

  it("returns null for non-Error value", () => {
    expect(mapKnownError("string error")).toBeNull();
  });

  it("throws when passed null (no code property)", () => {
    expect(() => mapKnownError(null)).toThrow();
  });
});
