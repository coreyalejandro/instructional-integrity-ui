import { ERROR_CODES } from "@/lib/domain/errorTypes";
import type { NormalizedArtifact } from "./artifactTypes";
import { sanitizeInstructionalText } from "./sanitizeInput";

export interface NormalizeOptions {
  title: string;
  raw: string;
}

export function normalizeArtifact(options: NormalizeOptions): NormalizedArtifact {
  const plainText = sanitizeInstructionalText(options.raw);
  if (plainText.length < 2) {
    const err = new Error("Content too short to normalize (minimum 2 characters after sanitization)");
    (err as Error & { code: string }).code = ERROR_CODES.NORMALIZATION_FAILED;
    throw err;
  }
  const paragraphs = plainText
    .split(/\n\s*\n+/)
    .map((p) => p.trim())
    .filter(Boolean);
  const lines = plainText.split("\n");
  const words = plainText.split(/\s+/).filter(Boolean);
  return {
    title: options.title.trim() || "Untitled artifact",
    plainText,
    paragraphs: paragraphs.length ? paragraphs : [plainText],
    lines,
    wordCount: words.length,
    charCount: plainText.length
  };
}
