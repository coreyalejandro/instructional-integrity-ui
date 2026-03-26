# Security — threat model (lightweight MVP)

| Surface | Threats | Mitigations |
|---------|-----------|-------------|
| Paste input | XSS, oversized payload, control-character abuse | `sanitizeInput`, size limits, Zod validation, CSP headers |
| File upload | MIME spoofing, path traversal, binary payloads | Server-only parsing, extension + MIME cross-check, size cap, UTF-8 validation |
| API | CSRF on mutations, abuse | Same-site session cookie; CORS default same-origin; future: rate limits |
| Exports | Injection into markdown/HTML consumers | `sanitizeExportContent` for exports |
| Database | SQL injection | Prisma parameterized queries only |
| Session scope | Cross-session data access | Runs keyed by `sessionId` from HttpOnly cookie |

This document is living; extend before production hardening.
