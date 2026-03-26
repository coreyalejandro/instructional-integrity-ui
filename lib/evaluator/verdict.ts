import type { CriterionEvaluationResult } from "@/lib/domain/evaluationTypes";
import type { FailureClassId } from "@/lib/domain/failureTypes";
import type { Verdict } from "@/lib/domain/verdictTypes";

/**
 * Contract §20.1 — deterministic verdict from criterion results.
 */
export function computeVerdictFromCriteria(criteria: CriterionEvaluationResult[]): {
  verdict: Verdict;
  failureClassSummary: FailureClassId[];
} {
  const insufficient = criteria.filter((c) => c.evidenceInsufficient).length;
  const anyFail = criteria.some((c) => c.verdict === "fail");
  const anyWarn = criteria.some((c) => c.verdict === "warn");
  const scores = criteria.map((c) => c.score / c.maxScore);
  const min = Math.min(...scores);
  const max = Math.max(...scores);
  const conflict = max - min > 0.75 && criteria.some((c) => c.verdict === "fail") && criteria.some((c) => c.verdict === "pass");

  const allFailureClasses = Array.from(
    new Set(criteria.flatMap((c) => c.failureClasses))
  ) as FailureClassId[];

  if (anyFail) {
    return { verdict: "fail", failureClassSummary: allFailureClasses };
  }
  if (insufficient >= 2 || conflict) {
    return { verdict: "needs_human_review", failureClassSummary: allFailureClasses };
  }
  if (anyWarn) {
    return { verdict: "warn", failureClassSummary: allFailureClasses };
  }
  return { verdict: "pass", failureClassSummary: allFailureClasses };
}
