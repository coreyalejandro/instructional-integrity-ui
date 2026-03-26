import { prisma } from "@/lib/db";

export async function listEvaluationRuns(limit = 50) {
  return prisma.evaluationRun.findMany({
    orderBy: { createdAt: "desc" },
    take: limit,
    include: {
      artifact: {
        select: { id: true, title: true, rawText: true }
      }
    }
  });
}

export async function getEvaluationRunById(id: string) {
  return prisma.evaluationRun.findUnique({
    where: { id },
    include: {
      artifact: true,
      criteria: {
        orderBy: { criterionName: "asc" }
      }
    }
  });
}
