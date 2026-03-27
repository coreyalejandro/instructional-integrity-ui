# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

---

## Commands

```bash
# Development
npm run dev           # Start Next.js dev server → http://localhost:3000

# Build
npm run build         # prisma generate + next build

# Testing
npm test              # Run vitest unit tests (non-watch)
npm run test:watch    # Vitest in watch mode
npm run test:e2e      # Playwright E2E (requires dev server running on :3000)

# Lint
npm run lint          # next lint

# Database (requires Docker)
npm run db:up         # docker compose up -d (Postgres on localhost:5434)
npm run db:reset      # migrate reset --force (wipes + re-seeds)
npm run db:migrate    # prisma migrate dev
npm run db:seed       # prisma db seed
npm run db:generate   # prisma generate (regenerate client after schema change)
```

**Single test file:**
```bash
npx vitest run tests/evaluator.test.ts
```

**E2E prerequisite:** `npm run dev` must be running. Playwright auto-starts it if not found (via `reuseExistingServer: true`).

---

## Environment

Copy `.env.example` to `.env.local`. Key vars:

| Var | Default | Purpose |
|-----|---------|---------|
| `DATABASE_URL` | `postgresql://ii:ii@localhost:5434/instructional_integrity` | Postgres |
| `LOG_LEVEL` | `info` | Pino log level |
| `MAX_UPLOAD_SIZE_BYTES` | `5242880` (5 MB) | File upload cap |
| `MAX_PASTE_LENGTH` | `100000` | Paste char limit |
| `EVALUATION_TIMEOUT_MS` | `30000` | Per-evaluation deadline |
| `MAX_CONCURRENT_EVALUATIONS` | `5` | Concurrency limiter |

---

## Architecture

**Instructional Integrity Studio** evaluates instructional text/markdown artifacts for **cognitive safety** — whether correct content might still produce false mental models in learners.

### Pipeline (request → response)

```
POST /api/evaluations
  → resolveSession (anonymous cookie, `lib/session/session.ts`)
  → Zod validate body (`lib/validation/schemas.ts`)
  → resolveArtifactForSession (paste / upload / sample)
  → normalizeArtifact (`lib/artifacts/normalizeArtifact.ts`)
  → evaluateNormalizedArtifact (`lib/evaluator/evaluateArtifact.ts`)
      → getRubric() (`lib/rubric/rubricRegistry.ts`)
      → runRuleBasedEvaluation (`lib/evaluator/ruleBasedTextEvaluator.ts`)
  → createEvaluationRunRecord (Prisma, `lib/persistence/createEvaluationRun.ts`)
  → mapRunToApiResponse (`lib/api/evaluationMapper.ts`)
  → 201 JSON response
```

### Key domain concepts

- **Rubric** (`lib/rubric/`): 10 dimensions (e.g. `seq_integrity`, `prereq_visibility`, `term_grounding`). Version `iis-rubric-1.0.0`. Registry in `rubricRegistry.ts` — swap evaluators by registering a new `Rubric`.
- **Failure classes** (`lib/domain/failureTypes.ts`): 10 IDs (e.g. `premature_conclusion`, `step_gap`, `terminology_jump`). Each rubric dimension maps to 1–3 failure classes.
- **Verdicts** (`lib/domain/verdictTypes.ts`): `PASS | WARN | FAIL | NEEDS_HUMAN_REVIEW` (run-level); `PASS | WARN | FAIL` (criterion-level).
- **Session** (`lib/session/session.ts`): Anonymous UUID cookie `iis_session`. No PII. All DB records cascade-delete on session delete.
- **Concurrency limiter** (`lib/evaluation/concurrency.ts`): `EvaluationConcurrencyLimiter` — in-memory, per-instance. Returns 429 when at limit.

### Module map

| Path | Concern |
|------|---------|
| `app/api/evaluations/` | POST (run evaluation), GET (list runs) |
| `app/api/evaluations/[id]/` | GET (single run), DELETE |
| `app/api/evaluations/[id]/export/` | GET JSON/MD export |
| `app/api/uploads/` | POST file upload to `PendingUpload` |
| `app/api/samples/` | GET seeded sample artifacts |
| `app/evaluate/` | Evaluation submission UI |
| `app/runs/` | Run history list |
| `app/runs/[id]/` | Run detail view |
| `lib/artifacts/` | Intake: validate, sanitize, normalize |
| `lib/rubric/` | Dimension definitions + registry |
| `lib/evaluator/` | Evaluator interface + rule-based impl + verdict logic |
| `lib/evidence/` | Evidence extraction interface |
| `lib/persistence/` | Prisma data access (CRUD for runs) |
| `lib/reporting/` | JSON/Markdown export builders |
| `lib/run-history-service/` | History query surface |
| `lib/session/` | Anonymous session cookie |
| `lib/validation/` | Zod schemas for API payloads |
| `lib/api/` | Response mapper, HTTP error helpers, recovery messages |
| `lib/domain/` | Core types: evaluation, failure, verdict, error codes |
| `components/` | React UI components |

### Database schema (Postgres via Prisma)

`Session → Artifact → EvaluationRun → CriterionResult → EvidenceExcerpt / FailureClassRecord / RemediationSuggestion`

Supporting: `SampleArtifact`, `PendingUpload` (upload → evaluate staging, deleted after run), `DeletionLog`, `ExportRecord`.

---

## Testing layout

- **Unit (vitest):** `tests/*.test.ts` and `lib/**/*.test.ts`. Coverage provider: v8, 40% line threshold. Tests resolve `@/` alias against repo root.
- **E2E (Playwright):** `tests/e2e/*.spec.ts`. Chromium only. Runs against `http://127.0.0.1:3000`.

---

## Truth status

`docs/truth-status.md` is the canonical source of what is actually implemented vs. deferred. If it is stale, treat README feature claims as unverified. Check it before making claims about feature completeness.
