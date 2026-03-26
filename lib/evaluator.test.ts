import { describe, expect, it } from "vitest";
import { currentRubric } from "./rubric";
import { runEvaluation } from "./evaluator";

describe("runEvaluation", () => {
  it("returns one result per rubric criterion", async () => {
    const result = await runEvaluation({ artifactText: "Example instructional artifact" });

    expect(result.rubricVersion).toBe(currentRubric.version);
    expect(result.criteria).toHaveLength(currentRubric.criteria.length);
  });

  it("computes an overall grade that is at least as severe as any criterion", async () => {
    const result = await runEvaluation({ artifactText: "Example instructional artifact" });

    const severity: Record<string, number> = {
      FAIL: 3,
      WARN: 2,
      PASS: 1
    };

    const worstCriterion = result.criteria.reduce((worst, item) => {
      return severity[item.grade] > severity[worst.grade] ? item : worst;
    }, result.criteria[0]);

    expect(severity[result.overallGrade]).toBeGreaterThanOrEqual(severity[worstCriterion.grade]);
  });
});

