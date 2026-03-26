import { ERROR_CODES } from "@/lib/domain/errorTypes";

export interface ValidationLimits {
  maxPasteLength: number;
  maxUploadBytes: number;
}

const DEFAULT_LIMITS: ValidationLimits = {
  maxPasteLength: Number(process.env.MAX_PASTE_LENGTH ?? 100_000),
  maxUploadBytes: Number(process.env.MAX_UPLOAD_SIZE_BYTES ?? 5_242_880)
};

export const ALLOWED_UPLOAD_MIME = new Set(["text/plain", "text/markdown", "text/x-markdown"]);

export function allowedExtension(filename: string): boolean {
  const lower = filename.toLowerCase();
  return lower.endsWith(".txt") || lower.endsWith(".md");
}

export function validatePasteLength(text: string, limits: ValidationLimits = DEFAULT_LIMITS): void {
  if (text.length === 0) {
    const err = new Error("Empty input");
    (err as Error & { code: string }).code = ERROR_CODES.EMPTY_INPUT;
    throw err;
  }
  if (text.length > limits.maxPasteLength) {
    const err = new Error(`Paste exceeds ${limits.maxPasteLength} characters`);
    (err as Error & { code: string }).code = ERROR_CODES.INPUT_TOO_LARGE;
    throw err;
  }
}

export function validateUploadBuffer(
  buf: Buffer,
  mimeType: string,
  filename: string,
  limits: ValidationLimits = DEFAULT_LIMITS
): void {
  if (buf.length === 0) {
    const err = new Error("Empty file");
    (err as Error & { code: string }).code = ERROR_CODES.EMPTY_INPUT;
    throw err;
  }
  if (buf.length > limits.maxUploadBytes) {
    const err = new Error(`File exceeds ${limits.maxUploadBytes} bytes`);
    (err as Error & { code: string }).code = ERROR_CODES.INPUT_TOO_LARGE;
    throw err;
  }
  const normalizedMime = mimeType.split(";")[0]?.trim().toLowerCase() ?? "";
  if (!ALLOWED_UPLOAD_MIME.has(normalizedMime)) {
    const err = new Error(`Unsupported media type: ${mimeType}`);
    (err as Error & { code: string }).code = ERROR_CODES.UNSUPPORTED_MEDIA_TYPE;
    throw err;
  }
  if (!allowedExtension(filename)) {
    const err = new Error("Only .txt and .md files are allowed");
    (err as Error & { code: string }).code = ERROR_CODES.INVALID_EXTENSION;
    throw err;
  }
  const looksMd = filename.toLowerCase().endsWith(".md");
  const looksPlain = filename.toLowerCase().endsWith(".txt");
  if (looksMd && !["text/markdown", "text/x-markdown"].includes(normalizedMime)) {
    const err = new Error("MIME type does not match .md extension");
    (err as Error & { code: string }).code = ERROR_CODES.MISMATCHED_TYPE;
    throw err;
  }
  if (looksPlain && normalizedMime !== "text/plain") {
    const err = new Error("MIME type does not match .txt extension");
    (err as Error & { code: string }).code = ERROR_CODES.MISMATCHED_TYPE;
    throw err;
  }
}
