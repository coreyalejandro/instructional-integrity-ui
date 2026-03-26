import { describe, expect, it } from "vitest";
import { normalizeArtifact } from "@/lib/artifacts/normalizeArtifact";
import { getRubric } from "@/lib/rubric/rubricRegistry";
import { runRuleBasedEvaluation } from "@/lib/evaluator/ruleBasedTextEvaluator";

describe("determinism (§5.4)", () => {
  it("produces byte-identical JSON for same artifact and rubric", () => {
    const text = "Step 1: Do A.\n\nStep 2: Do B.\n\nBecause A supports B, the flow is valid.";
    const n = normalizeArtifact({ title: "Demo", raw: text });
    const rubric = getRubric();
    const runs = [0, 1, 2].map(() => JSON.stringify(runRuleBasedEvaluation(n, rubric)));
    expect(runs[0]).toBe(runs[1]);
    expect(runs[1]).toBe(runs[2]);
  });
});
