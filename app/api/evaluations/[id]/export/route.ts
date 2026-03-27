import { NextRequest, NextResponse } from "next/server";
import { jsonError } from "@/lib/api/httpError";
import { ERROR_CODES } from "@/lib/domain/errorTypes";
import { prisma } from "@/lib/db";
import { buildJsonExportPayload } from "@/lib/reporting/exportJsonReport";
import { buildMarkdownExport } from "@/lib/reporting/exportMarkdownReport";
import { getEvaluationRunForSession } from "@/lib/persistence/getEvaluationRun";
import { resolveSession } from "@/lib/session/session";
import { exportQuerySchema } from "@/lib/validation/schemas";

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
      "Verify the run id or export from the run detail page.",
      404
    );
  }

  const { searchParams } = new URL(request.url);
  const parsed = exportQuerySchema.safeParse({
    format: searchParams.get("format") ?? "json"
  });
  if (!parsed.success) {
    return jsonError(
      ERROR_CODES.EMPTY_INPUT,
      "Invalid export format",
      "Use ?format=json or ?format=markdown",
      400
    );
  }

  if (parsed.data.format === "json") {
    const body = buildJsonExportPayload(run);
    const res = NextResponse.json(body, {
      headers: {
        "Content-Type": "application/json",
        "Content-Disposition": `attachment; filename="evaluation-${id}.json"`
      }
    });
    if (setCookieHeader) res.headers.append("Set-Cookie", setCookieHeader);
    await prisma.exportRecord.create({
      data: {
        sessionId,
        evaluationRunId: id,
        format: "json"
      }
    });
    return res;
  }

  const md = buildMarkdownExport(run);
  const res = new NextResponse(md, {
    headers: {
      "Content-Type": "text/markdown; charset=utf-8",
      "Content-Disposition": `attachment; filename="evaluation-${id}.md"`
    }
  });
  if (setCookieHeader) res.headers.append("Set-Cookie", setCookieHeader);
  await prisma.exportRecord.create({
    data: {
      sessionId,
      evaluationRunId: id,
      format: "markdown"
    }
  });
  return res;
}
