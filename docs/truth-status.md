# Truth status — Instructional Integrity Studio

| Field | Value |
|-------|--------|
| **Owner** | Build agent (handoff to Constitutional Operator) |
| **Last updated** | 2026-03-26 |
| **Next review** | 2026-04-02 (7-day window during active development) |

## What exists (verified)

| Claim | Status | Evidence |
|-------|--------|----------|
| Product name “Instructional Integrity Studio” in UI shell and metadata | implemented | `components/header.tsx`, `app/layout.tsx` |
| Build contract file at `docs/prompts/ZERO_SHOT_BUILD_CONTRACT__INSTRUCTIONAL_INTEGRITY_STUDIO.md` | implemented | file present |
| Rule-based deterministic evaluator | implemented | `lib/evaluator/ruleBasedTextEvaluator.ts`, `tests/determinism.test.ts` |
| Ten-dimension rubric | implemented | `lib/rubric/defaultRubric.ts`, `tests/rubric.test.ts` |
| Session-scoped persistence | implemented | `prisma/schema.prisma`, `lib/persistence/*` |
| API surface per §14 | partial | Routes exist; integration tests not exhaustive |
| Export JSON/Markdown | implemented | `app/api/evaluations/[id]/export/route.ts` |
| Security headers | implemented | `middleware.ts` |
| Structured logging (pino) | partial | `lib/logging/logger.ts` wired in API paths |

## What does not exist / deferred (§18)

- PDF/slide/OCR/multimodal ingestion — **not implemented**
- LLM-assisted rubric judgment — **not implemented**
- Full authentication / org workspaces — **not implemented**
- Production deployment guarantees — **not implemented**
- Validated scoring accuracy study — **not implemented**

## What was not verified

- Full §24 CI matrix on a clean machine without local Postgres
- 80% line coverage on `/lib` — current automated coverage is below target; see `vitest.config.mts` threshold note

## Functional status

**Working:** local `docker compose` Postgres, `npm run db:reset`, `npm run dev`, evaluate paste/upload/sample, history, detail, export, delete (session-scoped).

## Forbidden claims audit (§27.1)

| Date | Scope | Result |
|------|-------|--------|
| 2026-03-26 | README, `docs/`, UI strings (manual grep for “guaranteed”, “production-ready”, “validated accuracy”) | pass — no forbidden claims added |

## SOP-014 release gates

Manual checklist — not automated in CI for MVP:

1. Evidence-first evaluation path — **pass** (rule-based + persisted excerpts)
2. Truth maintenance — **pass** (this file + README linkage)
3. Failure handling — **partial** (core paths covered; not all §8.1 scenarios have dedicated E2E)
4. Accessibility — **partial** (axe Playwright spec present; run in CI TBD)
