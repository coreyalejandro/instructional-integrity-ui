import { cookies } from "next/headers";
import { getEvaluationRunForSession } from "@/lib/persistence/getEvaluationRun";
import { listEvaluationRunsDetailedForSession } from "@/lib/persistence/listEvaluationRuns";
import { SESSION_COOKIE_NAME } from "@/lib/session/session";

export async function listEvaluationRuns(limit = 100) {
  const sessionId = (await cookies()).get(SESSION_COOKIE_NAME)?.value;
  if (!sessionId) return [];
  return listEvaluationRunsDetailedForSession(sessionId, limit);
}

export async function getEvaluationRunById(id: string) {
  const sessionId = (await cookies()).get(SESSION_COOKIE_NAME)?.value;
  if (!sessionId) return null;
  return getEvaluationRunForSession(id, sessionId);
}
