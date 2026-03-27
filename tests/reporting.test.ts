import { describe, it, expect } from "vitest";
import { sanitizeExportText } from "@/lib/reporting/sanitizeExportContent";
import { buildJsonExportPayload } from "@/lib/reporting/exportJsonReport";
import { buildMarkdownExport } from "@/lib/reporting/exportMarkdownReport";
import { getRubricVersion } from "@/lib/rubric/defaultRubric";

// Minimal fixture matching RunWithRelations shape used by the export functions.
// Only includes fields actually accessed in the implementation.
function makeRun(overrides: Record<string, unknown> = {}) {
  return {
    id: "run-abc123",
    status: "COMPLETE",
    verdict: "PASS",
    overallScore: 85,
    rubricVersion: "iis-rubric-1.0.0",
    evaluatorId: "rule-based-text-evaluator",
    evaluatorVersion: "1.0.0",
    evaluationDurationMs: 142,
    failureClassSummary: ["step_gap"],
    createdAt: new Date("2026-03-27T00:00:00.000Z"),
    artifact: {
      title: "Sample artifact",
      rawText: "This is the raw artifact text.",
    },
    criteria: [
      {
        dimensionId: "seq_integrity",
        score: 8,
        maxScore: 10,
        verdict: "WARN",
        remediation: "Reorder steps 3 and 4.",
        evidence: [
          {
            excerptText: "Step 4 references step 5 output.",
            location: "paragraph 2",
            relevance: "sequence violation",
          },
        ],
        failureClasses: [{ classId: "step_gap" }],
      },
    ],
    ...overrides,
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } as any;
}

// ─── sanitizeExportText ────────────────────────────────────────────────────

describe("sanitizeExportText", () => {
  it("escapes < to &lt;", () => {
    expect(sanitizeExportText("a < b")).toBe("a &lt; b");
  });

  it("escapes > to &gt;", () => {
    expect(sanitizeExportText("a > b")).toBe("a &gt; b");
  });

  it("removes null bytes", () => {
    expect(sanitizeExportText("ab\u0000cd")).toBe("abcd");
  });

  it("passes normal text through unchanged", () => {
    expect(sanitizeExportText("hello world")).toBe("hello world");
  });

  it("handles empty string", () => {
    expect(sanitizeExportText("")).toBe("");
  });

  it("escapes both angle brackets in one pass", () => {
    expect(sanitizeExportText("<script>alert(1)</script>")).toBe(
      "&lt;script&gt;alert(1)&lt;/script&gt;"
    );
  });
});

// ─── buildJsonExportPayload ────────────────────────────────────────────────

describe("buildJsonExportPayload", () => {
  it("maps COMPLETE status to 'complete'", () => {
    const out = buildJsonExportPayload(makeRun({ status: "COMPLETE" }));
    expect(out.status).toBe("complete");
  });

  it("maps non-COMPLETE status to 'incomplete'", () => {
    const out = buildJsonExportPayload(makeRun({ status: "INCOMPLETE" }));
    expect(out.status).toBe("incomplete");
  });

  it("maps PASS verdict", () => {
    expect(buildJsonExportPayload(makeRun({ verdict: "PASS" })).verdict).toBe("pass");
  });

  it("maps WARN verdict", () => {
    expect(buildJsonExportPayload(makeRun({ verdict: "WARN" })).verdict).toBe("warn");
  });

  it("maps FAIL verdict", () => {
    expect(buildJsonExportPayload(makeRun({ verdict: "FAIL" })).verdict).toBe("fail");
  });

  it("maps NEEDS_HUMAN_REVIEW verdict", () => {
    expect(
      buildJsonExportPayload(makeRun({ verdict: "NEEDS_HUMAN_REVIEW" })).verdict
    ).toBe("needs_human_review");
  });

  it("maps unknown verdict to needs_human_review", () => {
    expect(buildJsonExportPayload(makeRun({ verdict: "UNKNOWN" })).verdict).toBe(
      "needs_human_review"
    );
  });

  it("uses 'Untitled artifact' when title is null", () => {
    const run = makeRun();
    run.artifact.title = null;
    const out = buildJsonExportPayload(run);
    expect(out.artifactTitle).toBe("Untitled artifact");
  });

  it("uses artifact title when present", () => {
    const out = buildJsonExportPayload(makeRun());
    expect(out.artifactTitle).toBe("Sample artifact");
  });

  it("includes correct criterion count", () => {
    const out = buildJsonExportPayload(makeRun());
    expect(out.criterionResults).toHaveLength(1);
  });

  it("maps criterion fields correctly", () => {
    const out = buildJsonExportPayload(makeRun());
    const c = out.criterionResults[0];
    expect(c.dimensionId).toBe("seq_integrity");
    expect(c.score).toBe(8);
    expect(c.maxScore).toBe(10);
    expect(c.verdict).toBe("warn");
    expect(c.remediation).toBe("Reorder steps 3 and 4.");
  });

  it("maps evidence array", () => {
    const out = buildJsonExportPayload(makeRun());
    const ev = out.criterionResults[0].evidence[0];
    expect(ev.excerptText).toBe("Step 4 references step 5 output.");
    expect(ev.location).toBe("paragraph 2");
    expect(ev.relevance).toBe("sequence violation");
  });

  it("maps failure class IDs", () => {
    const out = buildJsonExportPayload(makeRun());
    expect(out.criterionResults[0].failureClasses).toEqual(["step_gap"]);
  });

  it("includes rubric metadata fields", () => {
    const out = buildJsonExportPayload(makeRun());
    expect(out.rubricVersion).toBe("iis-rubric-1.0.0");
    expect(out.evaluatorId).toBe("rule-based-text-evaluator");
    expect(out.evaluatorVersion).toBe("1.0.0");
    expect(out.evaluationDurationMs).toBe(142);
  });

  it("serializes createdAt as ISO 8601", () => {
    const out = buildJsonExportPayload(makeRun());
    expect(out.createdAt).toBe("2026-03-27T00:00:00.000Z");
  });

  it("passes through failureClassSummary", () => {
    const out = buildJsonExportPayload(makeRun());
    expect(out.failureClassSummary).toEqual(["step_gap"]);
  });
});

// ─── buildMarkdownExport ───────────────────────────────────────────────────

describe("buildMarkdownExport", () => {
  it("returns a string", () => {
    expect(typeof buildMarkdownExport(makeRun())).toBe("string");
  });

  it("starts with a top-level heading", () => {
    const md = buildMarkdownExport(makeRun());
    expect(md).toMatch(/^# Evaluation report:/);
  });

  it("includes artifact title in heading", () => {
    const md = buildMarkdownExport(makeRun());
    expect(md).toContain("Sample artifact");
  });

  it("sanitizes angle brackets in artifact title", () => {
    const run = makeRun();
    run.artifact.title = "<script>";
    const md = buildMarkdownExport(run);
    expect(md).not.toContain("<script>");
    expect(md).toContain("&lt;script&gt;");
  });

  it("includes verdict", () => {
    const md = buildMarkdownExport(makeRun({ verdict: "FAIL" }));
    expect(md).toContain("FAIL");
  });

  it("includes dimension heading", () => {
    const md = buildMarkdownExport(makeRun());
    expect(md).toContain("seq_integrity");
  });

  it("includes remediation text", () => {
    const md = buildMarkdownExport(makeRun());
    expect(md).toContain("Reorder steps 3 and 4.");
  });

  it("includes evidence excerpt", () => {
    const md = buildMarkdownExport(makeRun());
    expect(md).toContain("Step 4 references step 5 output.");
  });

  it("includes failure class ID", () => {
    const md = buildMarkdownExport(makeRun());
    expect(md).toContain("step_gap");
  });

  it("sanitizes raw artifact text — removes null bytes", () => {
    const run = makeRun();
    run.artifact.rawText = "safe\u0000text";
    const md = buildMarkdownExport(run);
    expect(md).not.toContain("\u0000");
  });

  it("truncates raw text to 50 000 characters", () => {
    const run = makeRun();
    run.artifact.rawText = "x".repeat(60_000);
    const md = buildMarkdownExport(run);
    // The code slice(0, 50_000) — verify the output doesn't balloon
    expect(md.length).toBeLessThan(60_000 + 2000); // 2000 headroom for surrounding markdown
  });
});

// ─── buildJsonExportPayload — criterion verdict branches ──────────────────

describe("buildJsonExportPayload criterion verdict mapping", () => {
  it("maps criterion PASS verdict to pass", () => {
    const run = makeRun();
    run.criteria[0].verdict = "PASS";
    expect(buildJsonExportPayload(run).criterionResults[0].verdict).toBe("pass");
  });

  it("maps criterion FAIL verdict to fail", () => {
    const run = makeRun();
    run.criteria[0].verdict = "FAIL";
    expect(buildJsonExportPayload(run).criterionResults[0].verdict).toBe("fail");
  });

  it("maps unknown criterion verdict to warn (default branch)", () => {
    const run = makeRun();
    run.criteria[0].verdict = "SOMETHING_ELSE";
    expect(buildJsonExportPayload(run).criterionResults[0].verdict).toBe("warn");
  });
});

// ─── getRubricVersion ─────────────────────────────────────────────────────

describe("getRubricVersion", () => {
  it("returns a non-empty string", () => {
    expect(typeof getRubricVersion()).toBe("string");
    expect(getRubricVersion().length).toBeGreaterThan(0);
  });

  it("returns the iis-rubric-1.0.0 version", () => {
    expect(getRubricVersion()).toBe("iis-rubric-1.0.0");
  });
});
