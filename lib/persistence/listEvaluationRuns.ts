import { prisma } from "@/lib/db";

const fullInclude = {
  artifact: true,
  criteria: {
    include: { evidence: true, failureClasses: true },
    orderBy: { dimensionId: "asc" as const }
  }
} as const;

export async function listEvaluationRunsForSession(sessionId: string, limit = 100) {
  return prisma.evaluationRun.findMany({
    where: { sessionId },
    orderBy: { createdAt: "desc" },
    take: limit,
    include: {
      artifact: { select: { id: true, title: true, rawText: true } }
    }
  });
}

export async function listEvaluationRunsDetailedForSession(sessionId: string, limit = 100) {
  return prisma.evaluationRun.findMany({
    where: { sessionId },
    orderBy: { createdAt: "desc" },
    take: limit,
    include: fullInclude
  });
}
