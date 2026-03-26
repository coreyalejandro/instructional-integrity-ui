# Instructional Integrity Studio — project index

## Overview

**Instructional Integrity Studio** (repo slug `instructional-integrity-ui`) is a **Cognitive Safety** product: deterministic, rubric-backed evaluation of text/markdown instructional artifacts with evidence excerpts, failure classes, remediation, session-scoped Postgres persistence, and JSON/Markdown export.

**Canonical build contract:** `docs/prompts/ZERO_SHOT_BUILD_CONTRACT__INSTRUCTIONAL_INTEGRITY_STUDIO.md` (ZSB-IIS-v2.0).

## Architecture

- **UI:** `app/page.tsx` (doctrine), `app/evaluate/page.tsx`, `app/runs/page.tsx`, `app/runs/[id]/page.tsx`; `components/header.tsx` nav Home / Evaluate / History.
- **API:** `app/api/evaluations/*`, `app/api/uploads`, `app/api/samples`.
- **Core:** `lib/evaluator/ruleBasedTextEvaluator.ts`, `lib/rubric/defaultRubric.ts` (10 dimensions), `lib/persistence/*`, `lib/session/session.ts` (cookie `iis_session`).
- **Data:** PostgreSQL + Prisma; local `docker compose` port **5434**.

## User defined namespaces

- (none yet)

## Components

- Evaluator workspace: `components/evaluator-panel.tsx`, glossary, upload, samples.
- Verdict UI: `components/verdict-badge.tsx`, evidence/failure/remediation panels.

## Patterns

- Anonymous **session** cookie; all runs filtered by `sessionId` — no accounts in MVP.
- **Evaluator** interface in `lib/evaluator/evaluatorInterface.ts`; MVP = `rule-based-text-evaluator`.
- **Truth ledger:** `docs/truth-status.md`.
