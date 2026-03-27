import { describe, expect, it } from "vitest";
import { normalizeArtifact } from "@/lib/artifacts/normalizeArtifact";
import { getRubric } from "@/lib/rubric/rubricRegistry";
import { runRuleBasedEvaluation } from "@/lib/evaluator/ruleBasedTextEvaluator";
import { computeVerdictFromCriteria } from "@/lib/evaluator/verdict";

const SAMPLE = `Assumes you know basic algebra.

Steps:
1. Define the variable.
2. Therefore the answer is obvious.

Because we showed the steps, this is fine.`;

describe("rule-based evaluator", () => {
  it("returns ten criterion rows aligned with rubric dimensions", () => {
    const normalized = normalizeArtifact({ title: "t", raw: SAMPLE });
    const out = runRuleBasedEvaluation(normalized, getRubric());
    expect(out.criterionResults).toHaveLength(10);
    expect(out.criterionResults.map((c) => c.dimensionId)).toEqual(
      getRubric().dimensions.map((d) => d.id)
    );
  });

  it("is deterministic across repeated runs (§5.4)", () => {
    const normalized = normalizeArtifact({ title: "t", raw: SAMPLE });
    const strip = (p: ReturnType<typeof runRuleBasedEvaluation>) => {
      const { evaluationDurationMs: _, ...rest } = p;
      return JSON.stringify(rest);
    };
    const a = strip(runRuleBasedEvaluation(normalized, getRubric()));
    const b = strip(runRuleBasedEvaluation(normalized, getRubric()));
    const c = strip(runRuleBasedEvaluation(normalized, getRubric()));
    expect(a).toBe(b);
    expect(b).toBe(c);
  });
});

describe("verdict calculation (§20.1)", () => {
  it("returns pass when all criteria pass", () => {
    const { verdict } = computeVerdictFromCriteria([
      {
        dimensionId: "a",
        score: 10,
        maxScore: 10,
        verdict: "pass",
        evidence: [],
        failureClasses: [],
        remediation: "",
        evidenceInsufficient: false
      }
    ]);
    expect(verdict).toBe("pass");
  });

  it("returns fail when any criterion fails", () => {
    const { verdict } = computeVerdictFromCriteria([
      {
        dimensionId: "a",
        score: 10,
        maxScore: 10,
        verdict: "pass",
        evidence: [],
        failureClasses: [],
        remediation: "",
        evidenceInsufficient: false
      },
      {
        dimensionId: "b",
        score: 2,
        maxScore: 10,
        verdict: "fail",
        evidence: [],
        failureClasses: [],
        remediation: "x",
        evidenceInsufficient: false
      }
    ]);
    expect(verdict).toBe("fail");
  });

  it("returns warn when any criterion warns and none fail", () => {
    const { verdict } = computeVerdictFromCriteria([
      {
        dimensionId: "a",
        score: 10,
        maxScore: 10,
        verdict: "pass",
        evidence: [],
        failureClasses: [],
        remediation: "",
        evidenceInsufficient: false
      },
      {
        dimensionId: "b",
        score: 5,
        maxScore: 10,
        verdict: "warn",
        evidence: [],
        failureClasses: [],
        remediation: "x",
        evidenceInsufficient: false
      }
    ]);
    expect(verdict).toBe("warn");
  });

  it("returns needs_human_review when evidence insufficient on 2+ criteria", () => {
    const { verdict } = computeVerdictFromCriteria([
      {
        dimensionId: "a",
        score: 10,
        maxScore: 10,
        verdict: "pass",
        evidence: [],
        failureClasses: [],
        remediation: "",
        evidenceInsufficient: true
      },
      {
        dimensionId: "b",
        score: 10,
        maxScore: 10,
        verdict: "pass",
        evidence: [],
        failureClasses: [],
        remediation: "",
        evidenceInsufficient: true
      }
    ]);
    expect(verdict).toBe("needs_human_review");
  });

  it("returns needs_human_review for empty criteria (§20.1 edge)", () => {
    const { verdict } = computeVerdictFromCriteria([]);
    expect(verdict).toBe("needs_human_review");
  });
});
