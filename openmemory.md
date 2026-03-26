# Instructional Integrity UI — project index

## Overview

Next.js App Router product for **instructional / cognitive safety** evaluation: rubric-based scoring, persisted runs, and evidence-first UI.

## Architecture

- **UI:** `app/` routes — marketing home (`/`), workspace evaluate (`/evaluate`), run history (`/runs`, `/runs/[id]`).
- **API:** `POST /api/evaluator/run`, `GET /api/evaluator/runs`, `GET /api/evaluator/runs/[id]`.
- **Logic:** `lib/evaluator.ts` (computation + persistence), `lib/rubric.ts`, `lib/demo-user.ts` (demo workspace user until auth).
- **Data:** PostgreSQL via Prisma (`prisma/schema.prisma`). Local dev: `docker compose up -d` + `DATABASE_URL` on port **5434**.

## User defined namespaces

- (none yet)

## Components

- `AppShell`, `Header` (nav), `EvaluatorPanel` (client), `EvaluateCta`, journey/package/workflow sections.

## Patterns

- Demo identity: `ensureDemoUser()` upserts `demo@instructional-integrity.local` before persisted evaluations.
- Build: `prisma generate` in `postinstall` and before `next build`.
