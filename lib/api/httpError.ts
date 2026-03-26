import { NextResponse } from "next/server";
import { ERROR_CODES, type ErrorCode } from "@/lib/domain/errorTypes";

export function jsonError(
  code: ErrorCode | string,
  message: string,
  recoveryGuidance: string,
  status: number,
  details?: Record<string, unknown>
) {
  return NextResponse.json(
    {
      error: {
        code,
        message,
        details,
        recoveryGuidance
      }
    },
    { status }
  );
}

export function mapKnownError(err: unknown): { code: ErrorCode; status: number; message: string } | null {
  const code = (err as Error & { code?: string }).code;
  if (!code) return null;
  switch (code) {
    case ERROR_CODES.EMPTY_INPUT:
      return { code: ERROR_CODES.EMPTY_INPUT, status: 400, message: (err as Error).message };
    case ERROR_CODES.INPUT_TOO_LARGE:
      return { code: ERROR_CODES.INPUT_TOO_LARGE, status: 413, message: (err as Error).message };
    case ERROR_CODES.UNSUPPORTED_MEDIA_TYPE:
      return { code: ERROR_CODES.UNSUPPORTED_MEDIA_TYPE, status: 415, message: (err as Error).message };
    case ERROR_CODES.INVALID_EXTENSION:
    case ERROR_CODES.MISMATCHED_TYPE:
      return { code: code as ErrorCode, status: 400, message: (err as Error).message };
    case ERROR_CODES.ENCODING_INVALID:
      return { code: ERROR_CODES.ENCODING_INVALID, status: 400, message: (err as Error).message };
    case ERROR_CODES.NORMALIZATION_FAILED:
      return { code: ERROR_CODES.NORMALIZATION_FAILED, status: 400, message: (err as Error).message };
    case ERROR_CODES.UPLOAD_NOT_FOUND:
      return { code: ERROR_CODES.UPLOAD_NOT_FOUND, status: 400, message: (err as Error).message };
    case ERROR_CODES.SAMPLE_NOT_FOUND:
      return { code: ERROR_CODES.SAMPLE_NOT_FOUND, status: 400, message: (err as Error).message };
    default:
      return null;
  }
}
