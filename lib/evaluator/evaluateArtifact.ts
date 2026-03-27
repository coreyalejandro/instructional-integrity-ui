import type { NormalizedArtifact } from "@/lib/artifacts/artifactTypes";
import { getRubric } from "@/lib/rubric/rubricRegistry";
import { runRuleBasedEvaluation, type RuleBasedEvaluationOptions } from "./ruleBasedTextEvaluator";

export function evaluateNormalizedArtifact(artifact: NormalizedArtifact, options?: RuleBasedEvaluationOptions) {
  const rubric = getRubric();
  return runRuleBasedEvaluation(artifact, rubric, options);
}
