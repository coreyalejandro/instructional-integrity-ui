/** Prevent HTML/script leakage in exported markdown (§28.3). */
export function sanitizeExportText(s: string): string {
  return s
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/\u0000/g, "");
}
