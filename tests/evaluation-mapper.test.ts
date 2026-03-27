import { describe, it, expect } from "vitest";
import { mapRunToApiResponse } from "@/lib/api/evaluationMapper";

function makeRun(overrides: Record<string, unknown> = {}) {
  return {
    id: "run-abc123",
    status: "COMPLETE",
    verdict: "PASS",
    overallScore: 85,
    failureClassSummary: ["step_gap"],
    createdAt: new Date("2026-03-27T00:00:00.000Z"),
    artifact: { title: "My Artifact" },
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

describe("mapRunToApiResponse", () => {
  it("passes through run id", () => {
    expect(mapRunToApiResponse(makeRun()).id).toBe("run-abc123");
  });

  it("maps COMPLETE status to complete", () => {
    expect(mapRunToApiResponse(makeRun({ status: "COMPLETE" })).status).toBe("complete");
  });

  it("maps non-COMPLETE status to incomplete", () => {
    expect(mapRunToApiResponse(makeRun({ status: "PENDING" })).status).toBe("incomplete");
  });

  it("maps PASS verdict to pass", () => {
    expect(mapRunToApiResponse(makeRun({ verdict: "PASS" })).verdict).toBe("pass");
  });

  it("maps WARN verdict to warn", () => {
    expect(mapRunToApiResponse(makeRun({ verdict: "WARN" })).verdict).toBe("warn");
  });

  it("maps FAIL verdict to fail", () => {
    expect(mapRunToApiResponse(makeRun({ verdict: "FAIL" })).verdict).toBe("fail");
  });

  it("maps NEEDS_HUMAN_REVIEW verdict", () => {
    expect(mapRunToApiResponse(makeRun({ verdict: "NEEDS_HUMAN_REVIEW" })).verdict).toBe(
      "needs_human_review"
    );
  });

  it("maps unknown verdict to needs_human_review", () => {
    expect(mapRunToApiResponse(makeRun({ verdict: "MYSTERY" })).verdict).toBe(
      "needs_human_review"
    );
  });

  it("passes overallScore through", () => {
    expect(mapRunToApiResponse(makeRun()).overallScore).toBe(85);
  });

  it("passes failureClassSummary through", () => {
    expect(mapRunToApiResponse(makeRun()).failureClassSummary).toEqual(["step_gap"]);
  });

  it("serializes createdAt as ISO 8601", () => {
    expect(mapRunToApiResponse(makeRun()).createdAt).toBe("2026-03-27T00:00:00.000Z");
  });

  it("uses artifact title when present", () => {
    expect(mapRunToApiResponse(makeRun()).artifactTitle).toBe("My Artifact");
  });

  it("falls back to Untitled artifact when title is null", () => {
    const run = makeRun();
    run.artifact.title = null;
    expect(mapRunToApiResponse(run).artifactTitle).toBe("Untitled artifact");
  });

  it("maps criterion dimensionId", () => {
    const out = mapRunToApiResponse(makeRun());
    expect(out.criterionResults[0].dimensionId).toBe("seq_integrity");
  });

  it("maps criterion score and maxScore", () => {
    const c = mapRunToApiResponse(makeRun()).criterionResults[0];
    expect(c.score).toBe(8);
    expect(c.maxScore).toBe(10);
  });

  it("maps criterion WARN verdict to warn", () => {
    expect(mapRunToApiResponse(makeRun()).criterionResults[0].verdict).toBe("warn");
  });

  it("maps criterion PASS verdict to pass", () => {
    const run = makeRun();
    run.criteria[0].verdict = "PASS";
    expect(mapRunToApiResponse(run).criterionResults[0].verdict).toBe("pass");
  });

  it("maps criterion FAIL verdict to fail", () => {
    const run = makeRun();
    run.criteria[0].verdict = "FAIL";
    expect(mapRunToApiResponse(run).criterionResults[0].verdict).toBe("fail");
  });

  it("maps unknown criterion verdict to warn", () => {
    const run = makeRun();
    run.criteria[0].verdict = "UNKNOWN";
    expect(mapRunToApiResponse(run).criterionResults[0].verdict).toBe("warn");
  });

  it("maps evidence fields", () => {
    const ev = mapRunToApiResponse(makeRun()).criterionResults[0].evidence[0];
    expect(ev.excerptText).toBe("Step 4 references step 5 output.");
    expect(ev.location).toBe("paragraph 2");
    expect(ev.relevance).toBe("sequence violation");
  });

  it("maps failure class IDs", () => {
    expect(mapRunToApiResponse(makeRun()).criterionResults[0].failureClasses).toEqual([
      "step_gap",
    ]);
  });

  it("maps remediation text", () => {
    expect(mapRunToApiResponse(makeRun()).criterionResults[0].remediation).toBe(
      "Reorder steps 3 and 4."
    );
  });

  it("handles empty criteria array", () => {
    expect(mapRunToApiResponse(makeRun({ criteria: [] })).criterionResults).toHaveLength(0);
  });

  it("handles empty evidence array per criterion", () => {
    const run = makeRun();
    run.criteria[0].evidence = [];
    expect(mapRunToApiResponse(run).criterionResults[0].evidence).toHaveLength(0);
  });
});
