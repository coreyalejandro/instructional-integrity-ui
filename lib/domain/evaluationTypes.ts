import type { FailureClassId } from "./failureTypes";
import type { CriterionVerdict, Verdict } from "./verdictTypes";

export interface EvidenceItem {
  excerptText: string;
  location: string;
  relevance: string;
}

export interface CriterionEvaluationResult {
  dimensionId: string;
  score: number;
  maxScore: number;
  verdict: CriterionVerdict;
  evidence: EvidenceItem[];
  failureClasses: FailureClassId[];
  remediation: string;
  evidenceInsufficient: boolean;
}

export interface EvaluationResultPayload {
  status: "complete" | "incomplete";
  verdict: Verdict;
  overallScore: number;
  criterionResults: CriterionEvaluationResult[];
  failureClassSummary: FailureClassId[];
  rubricVersion: string;
  evaluatorId: string;
  evaluatorVersion: string;
  evaluationDurationMs: number;
  incompleteReason?: string;
}
