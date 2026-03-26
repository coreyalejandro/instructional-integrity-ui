import type { Prisma } from "@prisma/client";

type RunWithRelations = Prisma.EvaluationRunGetPayload<{
  include: {
    artifact: true;
    criteria: {
      include: { evidence: true; failureClasses: true };
    };
  };
}>;

export function mapRunToApiResponse(run: RunWithRelations) {
  return {
    id: run.id,
    status: run.status === "COMPLETE" ? ("complete" as const) : ("incomplete" as const),
    verdict: mapVerdict(run.verdict),
    overallScore: run.overallScore,
    criterionResults: run.criteria.map((c) => ({
      dimensionId: c.dimensionId,
      score: c.score,
      maxScore: c.maxScore,
      verdict: mapCriterionVerdict(c.verdict),
      evidence: c.evidence.map((e) => ({
        excerptText: e.excerptText,
        location: e.location,
        relevance: e.relevance
      })),
      failureClasses: c.failureClasses.map((f) => f.classId),
      remediation: c.remediation
    })),
    failureClassSummary: run.failureClassSummary,
    createdAt: run.createdAt.toISOString(),
    artifactTitle: run.artifact.title ?? "Untitled artifact"
  };
}

function mapVerdict(v: string): "pass" | "warn" | "fail" | "needs_human_review" {
  switch (v) {
    case "PASS":
      return "pass";
    case "WARN":
      return "warn";
    case "FAIL":
      return "fail";
    case "NEEDS_HUMAN_REVIEW":
      return "needs_human_review";
    default:
      return "needs_human_review";
  }
}

function mapCriterionVerdict(v: string): "pass" | "warn" | "fail" {
  switch (v) {
    case "PASS":
      return "pass";
    case "WARN":
      return "warn";
    case "FAIL":
      return "fail";
    default:
      return "warn";
  }
}
