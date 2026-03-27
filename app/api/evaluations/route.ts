import { NextRequest, NextResponse } from "next/server";
import { normalizeArtifact } from "@/lib/artifacts/normalizeArtifact";
import { validatePasteLength } from "@/lib/artifacts/validateInput";
import { mapRunToApiResponse } from "@/lib/api/evaluationMapper";
import { jsonError, mapKnownError } from "@/lib/api/httpError";
import { recoveryForKnownError } from "@/lib/api/recoveryMessages";
import { ERROR_CODES } from "@/lib/domain/errorTypes";
import { EvaluationConcurrencyLimiter, getMaxConcurrentEvaluations } from "@/lib/evaluation/concurrency";
import { evaluateNormalizedArtifact } from "@/lib/evaluator/evaluateArtifact";
import { getLogger } from "@/lib/logging/logger";
import { createEvaluationRunRecord } from "@/lib/persistence/createEvaluationRun";
import { getEvaluationRunForSession } from "@/lib/persistence/getEvaluationRun";
import { prisma } from "@/lib/db";
import { resolveSession } from "@/lib/session/session";
import { postEvaluationBodySchema } from "@/lib/validation/schemas";

const log = getLogger();

const concurrencyLimiter = new EvaluationConcurrencyLimiter(getMaxConcurrentEvaluations());

function getEvaluationTimeoutMs(): number {
  const raw = process.env.EVALUATION_TIMEOUT_MS;
  const n = raw !== undefined ? Number.parseInt(String(raw).replace(/"/g, ""), 10) : 30_000;
  if (!Number.isFinite(n)) return 30_000;
  return Math.min(Math.max(n, 100), 600_000);
}

async function resolveArtifactForSession(
  sessionId: string,
  artifact: {
    source: "paste" | "upload" | "sample";
    title: string;
    content?: string;
    uploadId?: string;
    sampleId?: string;
  }
) {
  if (artifact.source === "paste") {
    if (!artifact.content || !artifact.content.trim()) {
      const err = new Error("content is required when source is paste");
      (err as Error & { code: string }).code = ERROR_CODES.EMPTY_INPUT;
      throw err;
    }
    validatePasteLength(artifact.content);
    return {
      title: artifact.title,
      rawText: artifact.content,
      sourceType: "PASTE" as const,
      mimeType: "text/plain" as string | null,
      sampleId: null as string | null
    };
  }
  if (artifact.source === "upload") {
    if (!artifact.uploadId) {
      const err = new Error("uploadId is required when source is upload");
      (err as Error & { code: string }).code = ERROR_CODES.EMPTY_INPUT;
      throw err;
    }
    const pending = await prisma.pendingUpload.findFirst({
      where: { id: artifact.uploadId, sessionId }
    });
    if (!pending) {
      const err = new Error("Upload not found or expired");
      (err as Error & { code: string }).code = ERROR_CODES.UPLOAD_NOT_FOUND;
      throw err;
    }
    return {
      title: artifact.title,
      rawText: pending.content,
      sourceType: "UPLOAD" as const,
      mimeType: pending.mimeType,
      sampleId: null as string | null
    };
  }
  if (!artifact.sampleId) {
    const err = new Error("sampleId is required when source is sample");
    (err as Error & { code: string }).code = ERROR_CODES.EMPTY_INPUT;
    throw err;
  }
  const sample = await prisma.sampleArtifact.findUnique({ where: { slug: artifact.sampleId } });
  if (!sample) {
    const err = new Error("Sample artifact not found");
    (err as Error & { code: string }).code = ERROR_CODES.SAMPLE_NOT_FOUND;
    throw err;
  }
  return {
    title: sample.title,
    rawText: sample.content,
    sourceType: "SAMPLE" as const,
    mimeType: "text/markdown" as string | null,
    sampleId: sample.slug
  };
}

export async function POST(request: NextRequest) {
  const { sessionId, setCookieHeader } = await resolveSession(request);
  const started = Date.now();

  /** Holds a concurrency slot only after tryEnter() succeeds; finally must leave() only when true. */
  let acquiredSlot = false;
  try {
    if (!concurrencyLimiter.tryEnter()) {
      return jsonError(
        ERROR_CODES.CONCURRENT_LIMIT,
        "Too many evaluations are running on this instance.",
        "Wait a few seconds and retry, or open History to confirm whether a run completed.",
        429
      );
    }
    acquiredSlot = true;

    const json = await request.json();
    const parsed = postEvaluationBodySchema.safeParse(json);
    if (!parsed.success) {
      return jsonError(
        ERROR_CODES.EMPTY_INPUT,
        "Invalid request body",
        "Send JSON matching the evaluation schema: artifact.source, artifact.title, and content/uploadId/sampleId as required.",
        400,
        { issues: parsed.error.flatten() }
      );
    }

    const artifactPayload = await resolveArtifactForSession(sessionId, parsed.data.artifact);
    const normalized = normalizeArtifact({
      title: artifactPayload.title,
      raw: artifactPayload.rawText
    });

    const evaluationResult = evaluateNormalizedArtifact(normalized, {
      deadlineMs: getEvaluationTimeoutMs()
    });

    const created = await createEvaluationRunRecord({
      sessionId,
      artifactTitle: normalized.title,
      rawText: normalized.plainText,
      sourceType: artifactPayload.sourceType,
      mimeType: artifactPayload.mimeType,
      sampleId: artifactPayload.sampleId,
      result: evaluationResult
    });

    if (artifactPayload.sourceType === "UPLOAD" && parsed.data.artifact.uploadId) {
      await prisma.pendingUpload.deleteMany({ where: { id: parsed.data.artifact.uploadId, sessionId } });
    }

    const full = await getEvaluationRunForSession(created.runId, sessionId);
    if (!full) {
      return jsonError(
        ERROR_CODES.PERSISTENCE_FAILED,
        "Run was created but could not be reloaded.",
        "Retry the evaluation; if the run appears in history, open it from there.",
        500
      );
    }

    const body = mapRunToApiResponse(full);
    const res = NextResponse.json(body, { status: 201 });
    if (setCookieHeader) res.headers.append("Set-Cookie", setCookieHeader);
    log.info(
      {
        event: "evaluation_created",
        durationMs: Date.now() - started,
        runId: full.id,
        verdict: full.verdict
      },
      "Evaluation created"
    );
    return res;
  } catch (err) {
    const known = mapKnownError(err);
    if (known) {
      return jsonError(known.code, known.message, recoveryForKnownError(known.code), known.status);
    }
    log.error({ err, event: "evaluation_post_error" }, "Evaluation failed");
    return jsonError(
      ERROR_CODES.EVALUATION_FAILED,
      err instanceof Error ? err.message : "Evaluation failed",
      "Retry with a smaller artifact or contact support if this persists.",
      500
    );
  } finally {
    if (acquiredSlot) {
      concurrencyLimiter.leave();
    }
  }
}

export async function GET(request: NextRequest) {
  const { sessionId, setCookieHeader } = await resolveSession(request);
  const { listEvaluationRunsDetailedForSession } = await import("@/lib/persistence/listEvaluationRuns");

  const detailed = await listEvaluationRunsDetailedForSession(sessionId, 100);
  const payload = detailed.map((d) => mapRunToApiResponse(d));
  const res = NextResponse.json(payload);
  if (setCookieHeader) res.headers.append("Set-Cookie", setCookieHeader);
  return res;
}
