# Agent Handoff: Instructional Integrity Studio

**Date:** 2026-03-26  
**Status:** ZSB-IIS-v2.0 MVP — rule-based cognitive safety evaluator, session-scoped Postgres, contract-linked docs

## What was just completed

- Renamed product surfaces to **Instructional Integrity Studio**; canonical contract at `docs/prompts/ZERO_SHOT_BUILD_CONTRACT__INSTRUCTIONAL_INTEGRITY_STUDIO.md`.
- New Prisma schema: `Session`, `Artifact`, `EvaluationRun`, `CriterionResult`, `EvidenceExcerpt`, `FailureClassRecord`, `SampleArtifact`, `PendingUpload`, `DeletionLog`.
- API: `/api/evaluations` (POST/GET), `/api/evaluations/[id]` (GET/DELETE), export, `/api/uploads`, `/api/samples`.
- Core libs: `lib/evaluator/*`, `lib/rubric/*`, `lib/artifacts/*`, `lib/persistence/*`, `lib/validation/schemas.ts`, `lib/logging/logger.ts`.
- UI: evaluator panel (paste/sample/upload), verdict badges with text labels, run detail with evidence/failure classes/remediation, glossary.
- Docs: `docs/truth-status.md`, `docs/architecture.md`, `docs/tlc-mapping.md`, `docs/security.md`, `ADR-001`, `CHANGELOG.md`, README §22 structure.
- Tests: `tests/*.test.ts` (Vitest), `tests/e2e/*` (Playwright smoke + axe).
- Middleware: security headers + CSP + anonymous session cookie `iis_session`.

## Current project state

### Working

- `docker compose up -d` → Postgres on **5434**
- `cp .env.example .env.local` → `npm run db:reset` → `npm run dev`
- Evaluate → history → detail → export JSON/Markdown → delete

### Key paths

- `app/api/evaluations/route.ts`, `app/api/evaluations/[id]/route.ts`, `export/route.ts`, `uploads/route.ts`
- `lib/evaluator/ruleBasedTextEvaluator.ts`, `lib/rubric/defaultRubric.ts`
- `middleware.ts`, `prisma/schema.prisma`, `data/samples/*.md`

## Recommended next steps

1. Raise `/lib` test coverage toward **80%** (contract §24.4) with API integration tests.
2. Expand Playwright flows for §8.1 error cases and full paste→detail path against a CI database.
3. Tighten CSP for production (remove `unsafe-eval` when dev-only).
4. Consider Next.js `proxy` migration per framework warning.

## Known issues

- Line coverage ~44% on `/lib` — documented in `docs/truth-status.md`.
- `middleware` deprecation warning from Next.js 16 — monitor migration to `proxy`.

## Quick reference

- **DB:** `postgresql://ii:ii@localhost:5434/instructional_integrity`
- **Scripts:** `npm run db:reset`, `npm test`, `npm run test:e2e`, `npm run build`
