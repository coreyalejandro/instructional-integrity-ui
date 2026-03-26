/**
 * Strip/neutralize embedded HTML, script tags, and dangerous control chars (§6.1).
 */
export function sanitizeInstructionalText(input: string): string {
  let s = input.replace(/\0/g, "");
  // Remove script/style blocks
  s = s.replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, "");
  s = s.replace(/<style\b[^<]*(?:(?!<\/style>)<[^<]*)*<\/style>/gi, "");
  // Strip HTML tags
  s = s.replace(/<[^>]+>/g, " ");
  // Neutralize other angle brackets
  s = s.replace(/[<>]/g, "");
  // Collapse whitespace except newlines
  s = s.replace(/[ \t\f\v]+/g, " ");
  s = s.replace(/\r\n/g, "\n").replace(/\r/g, "\n");
  // Remove most C0 controls except newline/tab
  s = s.replace(/[\u0001-\u0008\u000B\u000C\u000E-\u001F\u007F]/g, "");
  return s.trim();
}
