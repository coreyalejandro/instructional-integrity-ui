import type { NormalizedArtifact } from "@/lib/artifacts/artifactTypes";
import type { CriterionEvaluationResult, EvaluationResultPayload } from "@/lib/domain/evaluationTypes";
import type { FailureClassId } from "@/lib/domain/failureTypes";
import { defaultRubric } from "@/lib/rubric/defaultRubric";
import type { Rubric } from "@/lib/rubric/rubricTypes";
import type { Evaluator } from "./evaluatorInterface";
import { computeVerdictFromCriteria } from "./verdict";

const EVALUATOR_ID = "rule-based-text-evaluator";
const EVALUATOR_VERSION = "1.0.0";

function clamp(n: number, min = 0, max = 10): number {
  return Math.max(min, Math.min(max, Math.round(n)));
}

function firstLineMatching(text: string, re: RegExp): string {
  for (const line of text.split("\n")) {
    if (re.test(line)) return line.trim().slice(0, 400);
  }
  return text.split("\n")[0]?.trim().slice(0, 400) ?? "";
}

function headFraction(text: string, frac: number): string {
  const n = Math.max(1, Math.floor(text.length * frac));
  return text.slice(0, n).toLowerCase();
}

function countMatches(text: string, re: RegExp): number {
  const m = text.match(re);
  return m ? m.length : 0;
}

function evaluateDimension(
  dimId: string,
  artifact: NormalizedArtifact
): { score: number; failureClasses: FailureClassId[]; excerpt: string; location: string; relevance: string } {
  const { plainText, paragraphs } = artifact;
  const p0 = paragraphs[0] ?? plainText;
  const head15 = headFraction(plainText, 0.15);

  switch (dimId) {
    case "seq_integrity": {
      const earlyConclusion = /\b(therefore|thus|in conclusion|so in short|hence|it follows|to summarize)\b/.test(head15);
      const hasSteps = /^\s*\d+[\.)]\s/im.test(plainText) || /\bstep\s*\d\b/i.test(plainText);
      let score = 10;
      if (earlyConclusion) {
        score -= 5;
      }
      if (hasSteps) score += 2;
      const fc: FailureClassId[] = [];
      if (earlyConclusion) fc.push("premature_conclusion", "sequence_break");
      if (!hasSteps && plainText.length > 400) fc.push("step_gap");
      return {
        score: clamp(score),
        failureClasses: fc,
        excerpt: firstLineMatching(plainText, /\b(therefore|thus|step|1\.|2\.)/i),
        location: earlyConclusion ? "opening segment" : "body",
        relevance: earlyConclusion
          ? "Conclusion language appears near the start; sequencing may invert support."
          : "Sequence markers and step structure detected for review."
      };
    }
    case "prereq_visibility": {
      const marks = /\b(prerequisite|assumes|before you|prior knowledge|expected background)\b/i.test(plainText);
      const fc: FailureClassId[] = [];
      let score = 6;
      if (marks) score += 4;
      else {
        score -= 2;
        fc.push("missing_prerequisite_scaffolding", "contextless_abstraction");
      }
      return {
        score: clamp(score),
        failureClasses: fc,
        excerpt: firstLineMatching(plainText, /\b(prerequisite|assumes|before)\b/i) || p0.slice(0, 400),
        location: "paragraph 1",
        relevance: marks ? "Prerequisite cues are present." : "Few explicit prerequisite cues; gaps may hide."
      };
    }
    case "term_grounding": {
      const tokens = plainText.split(/\s+/);
      const longWords = tokens.filter((w) => w.length > 12);
      const fc: FailureClassId[] = [];
      let score = 9;
      if (longWords.length > 8) {
        score -= 3;
        fc.push("terminology_jump");
      }
      if (/\b(define|definition|means)\b/i.test(plainText)) score += 1;
      return {
        score: clamp(score),
        failureClasses: fc,
        excerpt: longWords[0]?.slice(0, 400) ?? p0.slice(0, 200),
        location: "lexical scan",
        relevance: "Long tokens without definitional cues may indicate terminology jumps."
      };
    }
    case "concept_dep_clarity": {
      const thinBridge =
        countMatches(plainText, /\b(therefore|thus|hence)\b/gi) >
        countMatches(plainText, /\b(because|since|given that)\b/gi);
      let score = 8;
      const fc: FailureClassId[] = [];
      if (thinBridge) {
        score -= 3;
        fc.push("step_gap", "contextless_abstraction");
      }
      return {
        score: clamp(score),
        failureClasses: fc,
        excerpt: firstLineMatching(plainText, /\b(therefore|because|since)\b/i),
        location: "inference markers",
        relevance: "Balance of conclusion vs. support markers guides dependency clarity."
      };
    }
    case "progressive_disclosure": {
      const headings = countMatches(plainText, /^#{1,3}\s/gm);
      const bullets = countMatches(plainText, /^\s*[-*]\s/gm);
      let score = 7;
      if (headings + bullets > 2) score += 3;
      const fc: FailureClassId[] = [];
      if (paragraphs.length === 1 && plainText.length > 1200) {
        score -= 4;
        fc.push("compression_overload");
      }
      return {
        score: clamp(score),
        failureClasses: fc,
        excerpt: paragraphs[0]?.slice(0, 400) ?? plainText.slice(0, 400),
        location: "structure",
        relevance: "Headings/lists vs. monolithic blocks indicate progressive disclosure."
      };
    }
    case "misconception_risk": {
      const absolutes = /\b(always|never|guaranteed|impossible)\b/i.test(plainText);
      let score = 9;
      const fc: FailureClassId[] = [];
      if (absolutes) {
        score -= 3;
        fc.push("unjustified_confidence_signal", "polished_but_unsafe_explanation");
      }
      return {
        score: clamp(score),
        failureClasses: fc,
        excerpt: firstLineMatching(plainText, /\b(always|never|guaranteed)\b/i) || p0.slice(0, 200),
        location: "wording",
        relevance: "Absolute language can invite false certainty."
      };
    }
    case "cog_load_pacing": {
      const avgLen =
        paragraphs.reduce((sum, p) => sum + p.split(/\s+/).length, 0) / Math.max(1, paragraphs.length);
      let score = 8;
      const fc: FailureClassId[] = [];
      if (avgLen > 120) {
        score -= 4;
        fc.push("compression_overload");
      }
      return {
        score: clamp(score),
        failureClasses: fc,
        excerpt: paragraphs.find((p) => p.split(/\s+/).length > 80)?.slice(0, 400) ?? p0.slice(0, 200),
        location: "longest paragraph",
        relevance: "High words-per-paragraph suggests pacing risk."
      };
    }
    case "scaffold_continuity": {
      const transitions = /\b(next|then|after that|meanwhile|finally)\b/i.test(plainText);
      let score = transitions ? 9 : 6;
      const fc: FailureClassId[] = [];
      if (!transitions && paragraphs.length > 2) {
        fc.push("step_gap", "sequence_break");
      }
      return {
        score: clamp(score),
        failureClasses: fc,
        excerpt:
          (firstLineMatching(plainText, /\b(next|then|finally)\b/i) || paragraphs[1]?.slice(0, 200)) ?? p0,
        location: "transitions",
        relevance: "Explicit transitions support continuity across sections."
      };
    }
    case "conclusion_support": {
      const early = /\b(therefore|in conclusion|thus)\b/.test(head15);
      let score = early ? 4 : 9;
      const fc: FailureClassId[] = early ? ["premature_conclusion"] : [];
      return {
        score: clamp(score),
        failureClasses: fc,
        excerpt: firstLineMatching(plainText, /\b(therefore|in conclusion)\b/i),
        location: "opening 15%",
        relevance: early ? "Conclusion language appears before established support." : "Conclusion placement appears supported."
      };
    }
    case "confidence_alignment": {
      const certainty = countMatches(plainText, /\b(certainly|definitely|proven|guaranteed)\b/gi);
      const support = countMatches(plainText, /\b(because|evidence|study|data)\b/gi);
      let score = 9;
      const fc: FailureClassId[] = [];
      if (certainty > 0 && support === 0) {
        score -= 4;
        fc.push("unjustified_confidence_signal");
      }
      return {
        score: clamp(score),
        failureClasses: fc,
        excerpt: firstLineMatching(plainText, /\b(certainly|definitely|evidence)\b/i),
        location: "confidence cues",
        relevance: "Certainty language without nearby evidence cues is flagged."
      };
    }
    default:
      return {
        score: 7,
        failureClasses: [],
        excerpt: p0.slice(0, 200),
        location: "n/a",
        relevance: "Default conservative score for unknown dimension."
      };
  }
}

function criterionVerdictFromScore(score: number, maxScore: number): "pass" | "warn" | "fail" {
  const ratio = score / maxScore;
  if (ratio >= 0.75) return "pass";
  if (ratio >= 0.45) return "warn";
  return "fail";
}

export interface RuleBasedEvaluationOptions {
  /** Wall-clock budget; checked between rubric dimensions (§19.1). */
  deadlineMs?: number;
}

function buildRemediation(
  verdict: "pass" | "warn" | "fail",
  dim: { remediationGuidance: string },
  ev: { excerpt: string; location: string }
): string {
  if (verdict === "pass") {
    return "No change required for this dimension based on rule-based signals.";
  }
  const clip = ev.excerpt.trim().slice(0, 140);
  const suffix = clip.length ? ` Reference the supporting excerpt (${ev.location}): "${clip}${ev.excerpt.trim().length > 140 ? "…" : ""}"` : "";
  return `${dim.remediationGuidance}${suffix}`;
}

function finalizeEvaluationPayload(
  criterionResults: CriterionEvaluationResult[],
  rubric: Rubric,
  status: "complete" | "incomplete",
  incompleteReason: string | undefined,
  evaluatorStartedAt: number
): EvaluationResultPayload {
  const dimById = new Map(rubric.dimensions.map((d) => [d.id, d]));
  let overallScore = 0;
  if (criterionResults.length > 0) {
    const weightSum = criterionResults.reduce((acc, c) => acc + (dimById.get(c.dimensionId)?.weight ?? 0), 0);
    if (weightSum > 0) {
      overallScore = Math.round(
        (criterionResults.reduce(
          (acc, c) => acc + (c.score / c.maxScore) * (dimById.get(c.dimensionId)?.weight ?? 0),
          0
        ) /
          weightSum) *
          100 *
          100
      ) / 100;
    }
  }

  const { verdict, failureClassSummary } = computeVerdictFromCriteria(criterionResults);

  return {
    status,
    verdict,
    overallScore,
    criterionResults,
    failureClassSummary,
    rubricVersion: rubric.version,
    evaluatorId: EVALUATOR_ID,
    evaluatorVersion: EVALUATOR_VERSION,
    evaluationDurationMs: Date.now() - evaluatorStartedAt,
    incompleteReason
  };
}

export function runRuleBasedEvaluation(
  artifact: NormalizedArtifact,
  rubric: Rubric = defaultRubric,
  options?: RuleBasedEvaluationOptions
): EvaluationResultPayload {
  const evaluatorStartedAt = Date.now();
  const deadline =
    options?.deadlineMs !== undefined ? evaluatorStartedAt + Math.max(0, options.deadlineMs) : undefined;

  const criterionResults: CriterionEvaluationResult[] = [];

  for (const dim of rubric.dimensions) {
    if (deadline !== undefined && Date.now() >= deadline) {
      return finalizeEvaluationPayload(
        criterionResults,
        rubric,
        "incomplete",
        "Evaluation exceeded the configured time budget (EVALUATION_TIMEOUT_MS). Partial criterion results below were produced before the limit.",
        evaluatorStartedAt
      );
    }

    const ev = evaluateDimension(dim.id, artifact);
    const verdict = criterionVerdictFromScore(ev.score, dim.maxScore);
    const evidenceInsufficient = ev.excerpt.trim().length === 0;

    criterionResults.push({
      dimensionId: dim.id,
      score: ev.score,
      maxScore: dim.maxScore,
      verdict,
      evidence: [
        {
          excerptText: ev.excerpt || artifact.plainText.slice(0, 200),
          location: ev.location,
          relevance: ev.relevance
        }
      ],
      failureClasses: ev.failureClasses,
      remediation: buildRemediation(verdict, dim, ev),
      evidenceInsufficient
    });
  }

  return finalizeEvaluationPayload(criterionResults, rubric, "complete", undefined, evaluatorStartedAt);
}

export const ruleBasedTextEvaluator: Evaluator = {
  id: EVALUATOR_ID,
  name: "Rule-based text evaluator",
  version: EVALUATOR_VERSION,
  supportedArtifactTypes: ["text/markdown", "text/plain"],
  evaluate: (artifact, rubric) => runRuleBasedEvaluation(artifact, rubric)
};
