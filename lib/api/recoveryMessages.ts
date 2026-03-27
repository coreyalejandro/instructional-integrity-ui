import { ERROR_CODES, type ErrorCode } from "@/lib/domain/errorTypes";

/** User-facing recovery lines aligned with contract §8.1 / §14.2. */
export function recoveryForKnownError(code: ErrorCode): string {
  switch (code) {
    case ERROR_CODES.EMPTY_INPUT:
      return "Provide non-empty instructional text, pick a sample, or upload a valid file, then run again.";
    case ERROR_CODES.INPUT_TOO_LARGE:
      return "Shorten the paste under the max character limit or upload a smaller file (see §6.1).";
    case ERROR_CODES.UNSUPPORTED_MEDIA_TYPE:
    case ERROR_CODES.INVALID_EXTENSION:
    case ERROR_CODES.MISMATCHED_TYPE:
      return "Use only .txt or .md with matching text/plain or text/markdown MIME type.";
    case ERROR_CODES.ENCODING_INVALID:
      return "Save the file as UTF-8 and upload again.";
    case ERROR_CODES.NORMALIZATION_FAILED:
      return "Edit the artifact so it has enough substance to evaluate after sanitization, then retry.";
    case ERROR_CODES.UPLOAD_NOT_FOUND:
      return "Re-upload the file, then run evaluation again.";
    case ERROR_CODES.SAMPLE_NOT_FOUND:
      return "Refresh the page to reload samples, pick another sample, or paste your own text.";
    case ERROR_CODES.CONCURRENT_LIMIT:
      return "Wait a few seconds and retry, or open History to confirm whether a run completed.";
    case ERROR_CODES.CORS_FORBIDDEN:
      return "Use the app from its normal URL, or configure CORS_ALLOWED_ORIGINS for an approved browser origin.";
    default:
      return "Fix the reported constraint and try again.";
  }
}
