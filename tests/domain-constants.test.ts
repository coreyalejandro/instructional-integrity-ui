import { describe, it, expect } from "vitest";
import {
  FAILURE_CLASS_IDS,
  isFailureClassId,
} from "@/lib/domain/failureTypes";
import { COGNITIVE_SAFETY_GLOSSARY } from "@/lib/glossary/cognitiveSafetyTerms";
import { packageCards } from "@/lib/data";
import { ERROR_CODES } from "@/lib/domain/errorTypes";
import { attachEvidencePlaceholder } from "@/lib/evidence/extractEvidence";
import { evaluateNormalizedArtifact } from "@/lib/evaluator/evaluateArtifact";

// ─── FAILURE_CLASS_IDS ────────────────────────────────────────────────────

describe("FAILURE_CLASS_IDS", () => {
  it("contains exactly 10 failure class IDs (contract §9)", () => {
    expect(FAILURE_CLASS_IDS).toHaveLength(10);
  });

  it("contains step_gap", () => {
    expect(FAILURE_CLASS_IDS).toContain("step_gap");
  });

  it("contains premature_conclusion", () => {
    expect(FAILURE_CLASS_IDS).toContain("premature_conclusion");
  });

  it("contains terminology_jump", () => {
    expect(FAILURE_CLASS_IDS).toContain("terminology_jump");
  });

  it("contains sequence_break", () => {
    expect(FAILURE_CLASS_IDS).toContain("sequence_break");
  });

  it("all IDs are lowercase strings with underscores", () => {
    for (const id of FAILURE_CLASS_IDS) {
      expect(id).toMatch(/^[a-z_]+$/);
    }
  });
});

// ─── isFailureClassId ─────────────────────────────────────────────────────

describe("isFailureClassId", () => {
  it("returns true for a known failure class ID", () => {
    expect(isFailureClassId("step_gap")).toBe(true);
  });

  it("returns true for all 10 canonical IDs", () => {
    for (const id of FAILURE_CLASS_IDS) {
      expect(isFailureClassId(id)).toBe(true);
    }
  });

  it("returns false for an unknown string", () => {
    expect(isFailureClassId("made_up_class")).toBe(false);
  });

  it("returns false for empty string", () => {
    expect(isFailureClassId("")).toBe(false);
  });
});

// ─── COGNITIVE_SAFETY_GLOSSARY ────────────────────────────────────────────

describe("COGNITIVE_SAFETY_GLOSSARY", () => {
  it("is a non-empty array", () => {
    expect(COGNITIVE_SAFETY_GLOSSARY.length).toBeGreaterThan(0);
  });

  it("every entry has an id, term, and definition", () => {
    for (const entry of COGNITIVE_SAFETY_GLOSSARY) {
      expect(typeof entry.id).toBe("string");
      expect(entry.id.length).toBeGreaterThan(0);
      expect(typeof entry.term).toBe("string");
      expect(entry.term.length).toBeGreaterThan(0);
      expect(typeof entry.definition).toBe("string");
      expect(entry.definition.length).toBeGreaterThan(0);
    }
  });

  it("entry IDs start with 'glossary-'", () => {
    for (const entry of COGNITIVE_SAFETY_GLOSSARY) {
      expect(entry.id).toMatch(/^glossary-/);
    }
  });

  it("all entry IDs are unique", () => {
    const ids = COGNITIVE_SAFETY_GLOSSARY.map((e) => e.id);
    expect(new Set(ids).size).toBe(ids.length);
  });
});

// ─── packageCards (lib/data.ts) ───────────────────────────────────────────

describe("packageCards", () => {
  it("is a non-empty array", () => {
    expect(packageCards.length).toBeGreaterThan(0);
  });

  it("every card has id, title, status, description", () => {
    for (const card of packageCards) {
      expect(typeof card.id).toBe("string");
      expect(typeof card.title).toBe("string");
      expect(typeof card.status).toBe("string");
      expect(typeof card.description).toBe("string");
    }
  });

  it("contains an evaluator card", () => {
    const evaluatorCard = packageCards.find((c) => c.id === "evaluator");
    expect(evaluatorCard).toBeDefined();
  });

  it("all card IDs are unique", () => {
    const ids = packageCards.map((c) => c.id);
    expect(new Set(ids).size).toBe(ids.length);
  });
});

// ─── evaluateNormalizedArtifact ───────────────────────────────────────────

describe("evaluateNormalizedArtifact", () => {
  const sampleArtifact = {
    title: "Test lesson",
    plainText: "Step one: do this. Step two: do that. Make sure you understand the prior step before continuing.",
    paragraphs: ["Step one: do this. Step two: do that. Make sure you understand the prior step before continuing."],
    lines: ["Step one: do this. Step two: do that. Make sure you understand the prior step before continuing."],
    wordCount: 18,
    charCount: 96,
  };

  it("returns a result object", () => {
    const result = evaluateNormalizedArtifact(sampleArtifact);
    expect(result).toBeTruthy();
    expect(typeof result).toBe("object");
  });

  it("result includes a verdict", () => {
    const result = evaluateNormalizedArtifact(sampleArtifact);
    expect(["pass", "warn", "fail", "needs_human_review"]).toContain(result.verdict);
  });

  it("result includes criterionResults array", () => {
    const result = evaluateNormalizedArtifact(sampleArtifact);
    expect(Array.isArray(result.criterionResults)).toBe(true);
  });
});

// ─── attachEvidencePlaceholder ────────────────────────────────────────────

describe("attachEvidencePlaceholder", () => {
  it("returns an array with one item", () => {
    const result = attachEvidencePlaceholder("some text", "para 1", "context");
    expect(result).toHaveLength(1);
  });

  it("maps excerpt, location, and relevance", () => {
    const [item] = attachEvidencePlaceholder("text here", "line 5", "missing step");
    expect(item.excerptText).toBe("text here");
    expect(item.location).toBe("line 5");
    expect(item.relevance).toBe("missing step");
  });

  it("truncates excerpt to 2000 characters", () => {
    const long = "x".repeat(3000);
    const [item] = attachEvidencePlaceholder(long, "loc", "rel");
    expect(item.excerptText.length).toBe(2000);
  });

  it("passes short excerpt through unchanged", () => {
    const [item] = attachEvidencePlaceholder("short", "loc", "rel");
    expect(item.excerptText).toBe("short");
  });
});

// ─── ERROR_CODES completeness ─────────────────────────────────────────────

describe("ERROR_CODES", () => {
  it("contains all expected error code keys", () => {
    const expected = [
      "EMPTY_INPUT",
      "INPUT_TOO_LARGE",
      "UNSUPPORTED_MEDIA_TYPE",
      "INVALID_EXTENSION",
      "MISMATCHED_TYPE",
      "ENCODING_INVALID",
      "NORMALIZATION_FAILED",
      "UPLOAD_NOT_FOUND",
      "SAMPLE_NOT_FOUND",
      "NOT_FOUND",
      "EVALUATION_FAILED",
      "EVALUATION_TIMEOUT",
      "PERSISTENCE_FAILED",
      "EXPORT_FAILED",
      "INTERNAL",
      "CONCURRENT_LIMIT",
      "CORS_FORBIDDEN",
    ];
    for (const key of expected) {
      expect(ERROR_CODES).toHaveProperty(key);
    }
  });

  it("all values equal their keys (self-describing codes)", () => {
    for (const [key, value] of Object.entries(ERROR_CODES)) {
      expect(value).toBe(key);
    }
  });
});
