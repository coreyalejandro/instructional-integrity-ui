# REGRESSION EVAL: core
## Baseline: 2026-03-26 | 7 files, 15 tests, all passing
## Run: `npm test`

Ensure that every code change leaves the unit test suite green. These are the non-negotiable regression gates.

---

## Code Graders (Deterministic)

### Gate 1 — Unit tests pass
```bash
npm test
# Expected: "7 passed (7)" test files, "15 passed (15)" tests
# PASS if exit code 0
# FAIL if any test fails or count drops below baseline
```

### Gate 2 — Coverage threshold met
```bash
npm test
# Expected: lines threshold 40% met (currently ~satisfied)
# PASS if vitest exits 0 (threshold is enforced by vitest config)
```

### Gate 3 — TypeScript compiles
```bash
npx tsc --noEmit
# PASS if exit code 0
# FAIL if type errors present
```

### Gate 4 — Lint clean
```bash
npm run lint
# PASS if exit code 0
```

---

## Regression Suites

| Suite | File | Baseline |
|-------|------|----------|
| Evaluator core | `tests/evaluator.test.ts` | PASS |
| Rubric dimensions | `tests/rubric.test.ts` | PASS |
| Artifact normalizer | `tests/artifact-normalizer.test.ts` | PASS |
| Input validation | `tests/input-validation.test.ts` | PASS |
| Failure classifier | `tests/failure-classifier.test.ts` | PASS |
| Determinism | `tests/determinism.test.ts` | PASS |
| Evaluation deadline | `tests/evaluation-deadline.test.ts` | PASS |

---

## Pass Criteria

- **pass^3 = 100%** required for all regression gates (critical path)
- Any single regression gate failure = BLOCK on merge

---

## Run Log

| Date | Tests | Passed | Failed | Trigger |
|------|-------|--------|--------|---------|
| 2026-03-26 | 15 | 15 | 0 | Baseline capture |
