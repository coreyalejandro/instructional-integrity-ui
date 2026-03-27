# Truth status — Instructional Integrity Studio

| Field | Value |
|-------|--------|
| **Owner** | Build agent (handoff to Constitutional Operator) |
| **Last updated** | 2026-03-27 |
| **Next review** | 2026-04-03 |

**What these dates mean:** **Last updated** is when someone last reconciled this file with the real codebase. **Next review** is a calendar reminder: per contract §23.1, during active development this file should be re-read at least every **7 days** so status labels do not go stale. Update both dates whenever you change features or merge meaningful PRs.

## What exists (verified)

| Claim | Status | Evidence |
|-------|--------|----------|
| Product name “Instructional Integrity Studio” in UI shell and metadata | implemented | `components/header.tsx`, `app/layout.tsx` |
| Build contract file at `docs/prompts/ZERO_SHOT_BUILD_CONTRACT__INSTRUCTIONAL_INTEGRITY_STUDIO.md` | implemented | file present |
| Rule-based deterministic evaluator | implemented | `lib/evaluator/ruleBasedTextEvaluator.ts`, `tests/determinism.test.ts` |
| Ten-dimension rubric | implemented | `lib/rubric/defaultRubric.ts`, `tests/rubric.test.ts` |
| Session-scoped persistence | implemented | `prisma/schema.prisma`, `lib/persistence/*` |
| §16 `RemediationSuggestion` + `ExportRecord` entities | implemented | `prisma/schema.prisma`, `createEvaluationRun.ts`, export route; `docs/adr/ADR-002-remediation-export-entities.md` |
| §12.2 explicit CORS for `/api` | implemented | `proxy.ts` + `CORS_ALLOWED_ORIGINS` |
| §15 `config/.env.example` | implemented | `config/.env.example` |
| API surface per §14 | partial | Routes exist; integration tests not exhaustive |
| Export JSON/Markdown | implemented | `app/api/evaluations/[id]/export/route.ts` |
| Security headers | implemented | `proxy.ts` |
| Structured logging (pino) | partial | `lib/logging/logger.ts` wired in API paths |
| §§8.1 / §17 error UX + recovery copy | implemented | `lib/api/recoveryMessages.ts`, `components/evaluator-panel.tsx`, API routes |
| §10.5 focus + results region | implemented | `evaluator-panel.tsx` focus on new results; `aria-live` |
| §10.5 axe on run detail | implemented | `tests/e2e/accessibility.spec.ts` flow to `/runs/[id]` |
| §19.1 evaluation time budget + concurrency | implemented | `ruleBasedTextEvaluator.ts` deadline check; `lib/evaluation/concurrency.ts`; POST `/api/evaluations` |
| §21.1 remediation anchored to excerpts | implemented | `buildRemediation` in `ruleBasedTextEvaluator.ts` |
| §28.4 glossary deep links from failure classes | implemented | `lib/glossary/cognitiveSafetyTerms.ts`, `failure-class-list.tsx` |

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

## Verification & Truth (V&T) — complete statement

This section satisfies the alignment rule: **Exists → Verified against → Not claimed → Functional status.**

### Exists (verified present)
- **Product:** Instructional Integrity Studio on user-facing surfaces; `metadata` in `app/layout.tsx` (title + description; cognitive-safety framing).
- **Network boundary:** `proxy.ts` (Next.js 16 convention) — session cookie, security headers, CSP, `/api` CORS guard + optional `CORS_ALLOWED_ORIGINS`.
- **Data:** Prisma models including `RemediationSuggestion`, `ExportRecord` (§16); session-scoped runs, artifacts, criteria, evidence, failure classes, deletion log.
- **Core loop:** Evaluate (paste/upload/sample) → persist → history → detail → export → delete; rule-based evaluator + rubric + failure classes.
- **Tests:** Vitest 7 files, 15 tests passed (last run); Playwright E2E specs under `tests/e2e/` (smoke + a11y + error-states + run-detail axe flow).
- **Docs:** Truth status, README, contract copy, ADR-001/002, security doc, `config/.env.example`.

### Verified against
- **Automated:** `npm test` (Vitest) — **15/15** passing; `npm run build` — passing on last run in this repo line.
- **Git:** V&T anchored to commit `1e94c63903c8d6af9b0f8112eda22863d9c66f53` (2026-03-27); re-run `git rev-parse HEAD` after material changes.
- **Manual / spot:** UI reachability via HTTP 200 to `/` and `/evaluate` when dev server is running; `playwright.config.ts` uses `reuseExistingServer: true` to avoid duplicate `:3000` listeners.
- **Not continuously verified:** Full CI matrix without local Postgres; Playwright in GitHub Actions (workflow currently runs only `lint` + `npm test`).

### Not claimed
- **Evaluator accuracy** validated by external study — **not** claimed; §27 respected.
- **Production deployment** SLAs, org auth, multi-tenant — **not** implemented (§18).
- **80% `/lib` line coverage** — **not** met (Vitest threshold lower; coverage report ~44% aggregate last run).
- **Every §8.1 row** with dedicated E2E — **not** fully claimed.
- **npm run lint** — Next 16 CLI has had environment-specific quirks; treat as **unverified** here unless CI log shows green.

### Functional status
**Operational:** Local dev with Postgres (`docker compose`), `npm run db:reset`, `npm run dev`, full evaluator loop and exports **functionally available** per architecture and tests above. **Remaining honesty:** SOP-014 gates **3–4 partial** until CI runs E2E + coverage targets; §23.2 checklist items are **not** all ticked in this file by design (operator review).

**Maintenance note:** Re-run `git rev-parse HEAD` and `npm test` after substantive changes; update **Last updated** when this file changes.

## SOP-014 release gates

Manual checklist — not automated in CI for MVP:

1. Evidence-first evaluation path — **pass** (rule-based + persisted excerpts)
2. Truth maintenance — **pass** (this file + README linkage)
3. Failure handling — **partial** (client + API recovery paths; `tests/e2e/error-states.spec.ts` covers empty/oversized paste)
4. Accessibility — **partial** (axe on `/`, `/evaluate`, `/runs`, `/runs/[id]` in Playwright; run in CI TBD)
