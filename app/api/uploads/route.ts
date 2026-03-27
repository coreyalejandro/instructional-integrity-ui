import { NextRequest, NextResponse } from "next/server";
import { jsonError, mapKnownError } from "@/lib/api/httpError";
import { recoveryForKnownError } from "@/lib/api/recoveryMessages";
import { ERROR_CODES } from "@/lib/domain/errorTypes";
import { sanitizeInstructionalText } from "@/lib/artifacts/sanitizeInput";
import { validateUploadBuffer } from "@/lib/artifacts/validateInput";
import { getLogger } from "@/lib/logging/logger";
import { prisma } from "@/lib/db";
import { resolveSession } from "@/lib/session/session";

const log = getLogger();

function sanitizeFilename(name: string): string {
  const base = name.replace(/[^a-zA-Z0-9._-]/g, "_").replace(/\.+/g, ".").slice(0, 128);
  return base.length ? base : "upload.txt";
}

export async function POST(request: NextRequest) {
  const { sessionId, setCookieHeader } = await resolveSession(request);

  try {
    const form = await request.formData();
    const file = form.get("file");
    if (!(file instanceof Blob)) {
      return jsonError(
        ERROR_CODES.EMPTY_INPUT,
        "Missing file field",
        "POST multipart form with a `file` field containing .txt or .md content.",
        400
      );
    }

    const rawName = typeof (file as File).name === "string" ? (file as File).name : "upload.txt";
    const safeName = sanitizeFilename(rawName);
    const mimeType = file.type || "text/plain";
    const buf = Buffer.from(await file.arrayBuffer());

    validateUploadBuffer(buf, mimeType, safeName);

    let text = buf.toString("utf8");
    if (/\ufffd/.test(text)) {
      return jsonError(
        ERROR_CODES.ENCODING_INVALID,
        "File must be valid UTF-8 text",
        "Save the file as UTF-8 and upload again.",
        400
      );
    }

    text = sanitizeInstructionalText(text);
    if (!text.trim()) {
      return jsonError(
        ERROR_CODES.EMPTY_INPUT,
        "File content is empty after sanitization",
        "Provide a non-empty UTF-8 text or markdown file.",
        400
      );
    }

    await prisma.session.upsert({
      where: { id: sessionId },
      create: { id: sessionId },
      update: {}
    });

    const pending = await prisma.pendingUpload.create({
      data: {
        sessionId,
        title: safeName,
        content: text,
        mimeType: mimeType.split(";")[0]?.trim() ?? "text/plain"
      }
    });

    log.info({ event: "upload_stored", uploadId: pending.id, sessionId }, "Upload accepted");

    const res = NextResponse.json(
      { uploadId: pending.id, title: safeName },
      { status: 201 }
    );
    if (setCookieHeader) res.headers.append("Set-Cookie", setCookieHeader);
    return res;
  } catch (err) {
    const known = mapKnownError(err);
    if (known) {
      return jsonError(known.code, known.message, recoveryForKnownError(known.code), known.status);
    }
    log.error({ err, event: "upload_error" }, "Upload failed");
    return jsonError(ERROR_CODES.INTERNAL, "Upload failed", "Retry with a supported file type.", 500);
  }
}
