# CAPABILITY EVAL: instructional-integrity-studio
## Maps to: README §8 — 17 implemented features (ZSB-IIS-v2.0)
## Grader: code-based (deterministic where possible) + model-based

---

## Eval Definition

This eval verifies the full capability surface of the Instructional Integrity Studio.
Run after any significant change to `lib/evaluator/`, `lib/rubric/`, `lib/artifacts/`, or `app/api/`.

---

## Capability Evals

### 1. Artifact Intake

| # | Capability | Code Grader |
|---|-----------|-------------|
| C1 | Paste text/markdown accepted | `npm test -- artifact-normalizer` |
| C2 | Upload `.txt`/`.md` accepted | E2E: `tests/e2e/evaluation-flow.spec.ts` |
| C3 | Sample artifacts loadable | `curl http://localhost:3000/api/samples` returns 200 |
| C4 | Artifact normalized (markdown stripped, plain text extracted) | `npm test -- artifact-normalizer` |
| C5 | Input validation enforced (§6.1: length, empty) | `npm test -- input-validation` |

### 2. Evaluation Engine

| # | Capability | Code Grader |
|---|-----------|-------------|
| C6 | Deterministic rubric run — same input → same output | `npm test -- determinism` |
| C7 | 10 dimension scores produced | `npm test -- rubric` |
| C8 | Evidence excerpts attached per criterion | `npm test -- evaluator` |
| C9 | Failure classes mapped (10 class IDs) | `npm test -- failure-classifier` |
| C10 | Remediation strings generated | `npm test -- evaluator` |
| C11 | Evaluation completes within deadline | `npm test -- evaluation-deadline` |

### 3. Persistence & History

| # | Capability | Code Grader |
|---|-----------|-------------|
| C12 | Runs persisted to Postgres | E2E: `tests/e2e/evaluation-flow.spec.ts` |
| C13 | Run history listed (GET /api/evaluations) | E2E |
| C14 | Run detail accessible (GET /api/evaluations/[id]) | E2E |
| C15 | Delete run + audit log written | E2E |

### 4. Export

| # | Capability | Code Grader |
|---|-----------|-------------|
| C16a | JSON export (GET /api/evaluations/[id]/export?format=json) | E2E |
| C16b | Markdown export (GET /api/evaluations/[id]/export?format=md) | E2E |

### 5. Error Handling

| # | Capability | Code Grader |
|---|-----------|-------------|
| C17 | Error schema surfaced in UI (structured error codes) | `tests/e2e/error-states.spec.ts` |

---

## Verdict Thresholds

| Eval Group | Required | Metric |
|------------|----------|--------|
| Intake (C1–C5) | All pass | pass@1 |
| Engine (C6–C11) | All pass | pass^3 (determinism is critical) |
| Persistence (C12–C15) | All pass | pass@3 |
| Export (C16) | All pass | pass@1 |
| Errors (C17) | All pass | pass@1 |

---

## Quick Run (unit-only, no DB required)

```bash
npm test
# Covers: C1, C4, C5, C6, C7, C8, C9, C10, C11
# Expected: 7 files, 15 tests, all PASS
```

## Full Run (requires `npm run dev` + DB)

```bash
npm run db:up && npm run db:reset && npm run dev &
npx playwright test
# Covers: C2, C3, C12–C17
```

---

## Eval Report Template

```
EVAL REPORT: capability-iis
============================
Date:
Trigger:

Unit Evals (C1, C4–C11):
  Intake:       /5
  Engine:       /6
  Overall:      /11

E2E Evals (C2–C3, C12–C17):
  Intake:       /2
  Persistence:  /4
  Export:       /2
  Errors:       /1
  Overall:      /9

Metrics:
  pass@1:  X/20
  pass@3:  X/20 (run 3x to confirm determinism)

Regressions vs baseline: none / [list]

Status: PASS / BLOCK — [reason if BLOCK]
```
