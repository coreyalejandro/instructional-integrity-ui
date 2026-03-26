import { prisma } from "@/lib/db";
import { getLogger } from "@/lib/logging/logger";

export async function deleteEvaluationRunForSession(runId: string, sessionId: string) {
  const log = getLogger();
  const existing = await prisma.evaluationRun.findFirst({
    where: { id: runId, sessionId }
  });
  if (!existing) return { deleted: false as const };

  const artifactId = existing.artifactId;

  await prisma.$transaction(async (tx) => {
    await tx.deletionLog.create({
      data: {
        sessionId,
        deletedRunIds: [runId],
        metadata: { at: new Date().toISOString() }
      }
    });
    await tx.evaluationRun.delete({ where: { id: runId } });
    const otherRuns = await tx.evaluationRun.count({ where: { artifactId } });
    if (otherRuns === 0) {
      await tx.artifact.delete({ where: { id: artifactId } });
    }
  });

  log.info({ event: "evaluation_run_deleted", runId, sessionId }, "Run deleted");
  return { deleted: true as const };
}
