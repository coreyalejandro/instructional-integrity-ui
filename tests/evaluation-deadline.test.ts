import { describe, expect, it } from "vitest";
import { normalizeArtifact } from "@/lib/artifacts/normalizeArtifact";
import { getRubric } from "@/lib/rubric/rubricRegistry";
import { runRuleBasedEvaluation } from "@/lib/evaluator/ruleBasedTextEvaluator";

describe("evaluation deadline (§19.1)", () => {
  it("returns incomplete with partial criteria when time budget is exceeded", () => {
    const n = normalizeArtifact({ title: "t", raw: "x".repeat(200) });
    const out = runRuleBasedEvaluation(n, getRubric(), { deadlineMs: 0 });
    expect(out.status).toBe("incomplete");
    expect(out.criterionResults.length).toBeLessThan(10);
    expect(out.incompleteReason).toMatch(/time budget/i);
    expect(out.verdict).toBe("needs_human_review");
  });
});
