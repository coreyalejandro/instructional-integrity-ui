import { describe, expect, it } from "vitest";
import { normalizeArtifact } from "@/lib/artifacts/normalizeArtifact";
import { sanitizeInstructionalText } from "@/lib/artifacts/sanitizeInput";

describe("artifact normalizer", () => {
  it("strips script tags during sanitization", () => {
    const s = sanitizeInstructionalText("<script>alert(1)</script>Hello");
    expect(s).not.toContain("script");
    expect(s).toContain("Hello");
  });

  it("rejects degenerate content", () => {
    expect(() => normalizeArtifact({ title: "t", raw: "a" })).toThrow();
  });
});
