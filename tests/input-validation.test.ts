import { describe, expect, it } from "vitest";
import { validatePasteLength } from "@/lib/artifacts/validateInput";
import { ERROR_CODES } from "@/lib/domain/errorTypes";

describe("input validation (§6.1)", () => {
  it("rejects empty paste", () => {
    expect(() => validatePasteLength("", { maxPasteLength: 100, maxUploadBytes: 5000 })).toThrow();
    try {
      validatePasteLength("", { maxPasteLength: 100, maxUploadBytes: 5000 });
    } catch (e) {
      expect((e as Error & { code?: string }).code).toBe(ERROR_CODES.EMPTY_INPUT);
    }
  });

  it("rejects oversized paste", () => {
    const big = "x".repeat(101);
    expect(() => validatePasteLength(big, { maxPasteLength: 100, maxUploadBytes: 5000 })).toThrow();
  });
});
