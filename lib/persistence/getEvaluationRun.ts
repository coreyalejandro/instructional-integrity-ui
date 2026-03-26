import { prisma } from "@/lib/db";

export async function getEvaluationRunForSession(runId: string, sessionId: string) {
  return prisma.evaluationRun.findFirst({
    where: { id: runId, sessionId },
    include: {
      artifact: true,
      criteria: {
        include: {
          evidence: true,
          failureClasses: true
        },
        orderBy: { dimensionId: "asc" }
      }
    }
  });
}
