import type { NormalizedArtifact } from "@/lib/artifacts/artifactTypes";
import type { Rubric } from "@/lib/rubric/rubricTypes";
import type { EvaluationResultPayload } from "@/lib/domain/evaluationTypes";

export type ArtifactType = "text/markdown" | "text/plain";

export interface Evaluator {
  id: string;
  name: string;
  version: string;
  supportedArtifactTypes: ArtifactType[];
  evaluate(artifact: NormalizedArtifact, rubric: Rubric): EvaluationResultPayload;
}
