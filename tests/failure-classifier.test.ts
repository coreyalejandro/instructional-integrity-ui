import { describe, expect, it } from "vitest";
import { aggregateFailureClasses } from "@/lib/evaluator/classifyFailures";

describe("failure classifier", () => {
  it("dedupes failure classes", () => {
    const out = aggregateFailureClasses([
      {
        dimensionId: "a",
        score: 1,
        maxScore: 10,
        verdict: "warn",
        evidence: [],
        failureClasses: ["step_gap", "step_gap"],
        remediation: "",
        evidenceInsufficient: false
      }
    ]);
    expect(out).toEqual(["step_gap"]);
  });
});
