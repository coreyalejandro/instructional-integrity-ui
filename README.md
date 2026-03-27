# Instructional Integrity Studio — Cognitive Safety

## Zero-Shot Build Contract (canonical)

This repository implements **ZSB-IIS-v2.0**. The canonical build-governing artifact is:

**[`docs/prompts/ZERO_SHOT_BUILD_CONTRACT__INSTRUCTIONAL_INTEGRITY_STUDIO.md`](docs/prompts/ZERO_SHOT_BUILD_CONTRACT__INSTRUCTIONAL_INTEGRITY_STUDIO.md)**

All product behavior aligns with that contract where specified; where silent, TLC Articles I–VIII apply.

---

## 1. Product name and domain

**Instructional Integrity Studio** — a **Cognitive Safety evaluation system** for instructional artifacts (text/markdown MVP).

## 2. What cognitive safety is

**Cognitive safety** asks whether an explanation tends to produce **correct understanding** in the learner — not only whether its propositions are true. Epistemic correctness without scaffolding can still produce false mental models.

## 3. What problem this solves

Correct content can be **cognitively unsafe** when sequencing, prerequisites, terminology, or compression cause the learner to infer the wrong structure. This system surfaces **scaffolding failures** with **evidence-backed** rubric results and failure classes.

## 4. Who it is for

**Primary user class:** **Safety Evaluator** — submits artifacts, runs evaluations, inspects criterion evidence, failure classes, remediation, history, and exports (Article VI).

**Secondary (non-interactive in MVP):** Protected End User — copy is written so reports could be shown without harm.

**Tertiary:** Constitutional Operator — reviews `docs/truth-status.md`, README, and doctrine surfaces.

## 5. How it fits in TLC

Cognitive Safety subsystem under **The Living Constitution (TLC)** on **SentinelOS**. See [`docs/tlc-mapping.md`](docs/tlc-mapping.md).

## 6. Getting started (under 5 minutes)

```bash
git clone <repo-url>
cd instructional-integrity-ui
cp .env.example .env.local
docker compose up -d
npm install
npm run db:reset
npm run dev
# → http://localhost:3000/evaluate — run a paste or pick a sample, then open History
```

Database listens on **localhost:5434** by default (see `docker-compose.yml`).

## 7. Current truthful status

**[`docs/truth-status.md`](docs/truth-status.md)** — owner, dates, verified claims, deferred features.

## 8. Implemented features (§17 snapshot)

| # | Feature | Status |
| --- | --------- | -------- |
| 1 | Paste text/markdown | implemented |
| 2 | Upload `.txt` / `.md` | implemented |
| 3 | Sample artifacts | implemented |
| 4 | Normalize artifact | implemented |
| 5 | §6.1 validation (server) | implemented |
| 6 | Deterministic rubric run | implemented |
| 7 | Ten dimension scores | implemented |
| 8 | Evidence excerpts | implemented |
| 9 | Failure classes | implemented |
| 10 | Remediation strings | implemented |
| 11 | Persist runs (Postgres) | implemented |
| 12 | Run history | implemented |
| 13 | Run detail | implemented |
| 14 | Delete run + audit log | implemented |
| 15 | JSON export | implemented |
| 16 | Markdown export | implemented |
| 17 | Error schema + UI errors | implemented |

## 9. Not implemented / deferred (§18)

PDF/slides/OCR/multimodal, LLM evaluators, full auth, org workspaces, production SLAs, validated accuracy studies — see `docs/truth-status.md`.

## 10. Install / run / test

```bash
npm install
docker compose up -d
npm run db:reset
npm run dev
npm test
npm run build
npm run test:e2e   # requires dev server; see playwright.config.ts
```

## 11. Environment

See [`.env.example`](.env.example) for `DATABASE_URL`, `LOG_LEVEL`, limits, timeouts, and optional `CORS_ALLOWED_ORIGINS`. The contract also references [`config/.env.example`](config/.env.example) (same template).

## 12. Architectural map

See [`docs/architecture.md`](docs/architecture.md) and contract §13 / §15.

## 13. Repository slug

NPM package name may remain `instructional-integrity-ui`; product surfaces use **Instructional Integrity Studio**.

---

### Staleness warning

If [`docs/truth-status.md`](docs/truth-status.md) is older than its freshness window, treat README feature claims as suspect until the status file is refreshed.

---

**Repository:** instructional-integrity-ui · **Product:** Instructional Integrity Studio · **Contract:** ZSB-IIS-v2.0
