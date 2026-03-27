import type { ArtifactSource as PrismaArtifactSource } from "@/generated/prisma/client";
import { prisma } from "@/lib/db";
import type { EvaluationResultPayload } from "@/lib/domain/evaluationTypes";
import { getLogger } from "@/lib/logging/logger";

function mapVerdict(v: string): "PASS" | "WARN" | "FAIL" | "NEEDS_HUMAN_REVIEW" {
  switch (v) {
    case "pass":
      return "PASS";
    case "warn":
      return "WARN";
    case "fail":
      return "FAIL";
    case "needs_human_review":
      return "NEEDS_HUMAN_REVIEW";
    default:
      return "NEEDS_HUMAN_REVIEW";
  }
}

function mapCriterionVerdict(v: string): "PASS" | "WARN" | "FAIL" {
  switch (v) {
    case "pass":
      return "PASS";
    case "warn":
      return "WARN";
    case "fail":
      return "FAIL";
    default:
      return "WARN";
  }
}

export async function createEvaluationRunRecord(input: {
  sessionId: string;
  artifactTitle: string;
  rawText: string;
  sourceType: PrismaArtifactSource;
  mimeType?: string | null;
  sampleId?: string | null;
  result: EvaluationResultPayload;
}) {
  const log = getLogger();
  try {
    return await prisma.$transaction(async (tx) => {
      await tx.session.upsert({
        where: { id: input.sessionId },
        create: { id: input.sessionId },
        update: {}
      });

      const artifact = await tx.artifact.create({
        data: {
          sessionId: input.sessionId,
          title: input.artifactTitle,
          rawText: input.rawText,
          sourceType: input.sourceType,
          mimeType: input.mimeType ?? undefined,
          sampleId: input.sampleId ?? undefined
        }
      });

      const run = await tx.evaluationRun.create({
        data: {
          sessionId: input.sessionId,
          artifactId: artifact.id,
          status: input.result.status === "complete" ? "COMPLETE" : "INCOMPLETE",
          verdict: mapVerdict(input.result.verdict),
          overallScore: input.result.overallScore,
          rubricVersion: input.result.rubricVersion,
          evaluatorId: input.result.evaluatorId,
          evaluatorVersion: input.result.evaluatorVersion,
          evaluationDurationMs: input.result.evaluationDurationMs,
          failureClassSummary: input.result.failureClassSummary,
          incompleteReason: input.result.incompleteReason,
          completedAt: new Date()
        }
      });

      for (const c of input.result.criterionResults) {
        const row = await tx.criterionResult.create({
          data: {
            evaluationRunId: run.id,
            dimensionId: c.dimensionId,
            score: c.score,
            maxScore: c.maxScore,
            verdict: mapCriterionVerdict(c.verdict),
            remediation: c.remediation,
            evidenceInsufficient: c.evidenceInsufficient
          }
        });
        for (const e of c.evidence) {
          await tx.evidenceExcerpt.create({
            data: {
              criterionResultId: row.id,
              excerptText: e.excerptText,
              location: e.location,
              relevance: e.relevance
            }
          });
        }
        for (const fc of c.failureClasses) {
          await tx.failureClassRecord.create({
            data: {
              criterionResultId: row.id,
              classId: fc
            }
          });
        }
        await tx.remediationSuggestion.create({
          data: {
            criterionResultId: row.id,
            suggestionText: c.remediation
          }
        });
      }

      return { runId: run.id, artifactId: artifact.id };
    });
  } catch (err) {
    log.error({ err, event: "create_evaluation_run_failed" }, "Persistence failed");
    throw err;
  }
}
