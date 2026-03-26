import { NextRequest, NextResponse } from "next/server";
import { mapRunToApiResponse } from "@/lib/api/evaluationMapper";
import { jsonError } from "@/lib/api/httpError";
import { ERROR_CODES } from "@/lib/domain/errorTypes";
import { deleteEvaluationRunForSession } from "@/lib/persistence/deleteEvaluationRun";
import { getEvaluationRunForSession } from "@/lib/persistence/getEvaluationRun";
import { resolveSession } from "@/lib/session/session";

export async function GET(
  request: NextRequest,
  context: { params: Promise<{ id: string }> }
) {
  const { id } = await context.params;
  const { sessionId, setCookieHeader } = await resolveSession(request);
  const run = await getEvaluationRunForSession(id, sessionId);
  if (!run) {
    return jsonError(
      ERROR_CODES.NOT_FOUND,
      "Evaluation run not found",
      "Return to history and select a run from your session.",
      404
    );
  }
  const res = NextResponse.json(mapRunToApiResponse(run));
  if (setCookieHeader) res.headers.append("Set-Cookie", setCookieHeader);
  return res;
}

export async function DELETE(
  request: NextRequest,
  context: { params: Promise<{ id: string }> }
) {
  const { id } = await context.params;
  const { sessionId, setCookieHeader } = await resolveSession(request);
  const result = await deleteEvaluationRunForSession(id, sessionId);
  if (!result.deleted) {
    return jsonError(
      ERROR_CODES.NOT_FOUND,
      "Evaluation run not found",
      "The run may have been deleted already. Refresh history.",
      404
    );
  }
  const res = NextResponse.json({ deleted: true });
  if (setCookieHeader) res.headers.append("Set-Cookie", setCookieHeader);
  return res;
}
