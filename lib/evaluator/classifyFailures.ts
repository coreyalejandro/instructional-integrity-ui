import type { CriterionEvaluationResult } from "@/lib/domain/evaluationTypes";
import type { FailureClassId } from "@/lib/domain/failureTypes";

/** Aggregates failure classes from criterion rows (failure-classifier module). */
export function aggregateFailureClasses(criteria: CriterionEvaluationResult[]): FailureClassId[] {
  return Array.from(new Set(criteria.flatMap((c) => c.failureClasses))) as FailureClassId[];
}
