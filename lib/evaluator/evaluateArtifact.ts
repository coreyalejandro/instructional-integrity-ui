import type { NormalizedArtifact } from "@/lib/artifacts/artifactTypes";
import { getRubric } from "@/lib/rubric/rubricRegistry";
import { runRuleBasedEvaluation } from "./ruleBasedTextEvaluator";

export function evaluateNormalizedArtifact(artifact: NormalizedArtifact) {
  const rubric = getRubric();
  return runRuleBasedEvaluation(artifact, rubric);
}
