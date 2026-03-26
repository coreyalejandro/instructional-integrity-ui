import type { FailureClassId } from "@/lib/domain/failureTypes";

export interface RubricDimensionDefinition {
  id: string;
  name: string;
  definition: string;
  scoringRule: string;
  evidenceExpectation: string;
  failureMapping: FailureClassId[];
  remediationGuidance: string;
  maxScore: number;
  weight: number;
}

export interface Rubric {
  version: string;
  dimensions: RubricDimensionDefinition[];
}
