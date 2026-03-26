# Agent Handoff: Instructional Integrity UI

**Date:** 2026-03-23  
**Status:** Product-shaped MVP — persisted evaluations, multi-route app shell, Docker Postgres

## What was just completed

- App routes: `/evaluate` (full evaluator), `/runs` (history), `/runs/[id]` (detail + not-found).
- Home uses `AppShell` + `EvaluateCta`; evaluator removed from homepage in favor of dedicated workspace.
- `Header` primary nav (Overview / Evaluate / History).
- `POST /api/evaluator/run` persists via `ensureDemoUser()` + Prisma (fixed invalid `anonymous-user` FK).
- `GET /api/evaluator/runs` list API.
- `lib/runs.ts` for server-side listing/detail.
- `docker-compose.yml` Postgres on host port **5434** (5433 was occupied in one environment).
- `.env.example`, `prisma migrate` initial migration, `db:seed`, `db:up`, `postinstall` prisma generate.
- `evaluator.test.ts` fixed (`run` vs computation shape).
- `vitest.config.mts` path aliases for `@/`.
- Removed broken `prisma.config.ts` (Prisma 5 incompatible import).
- `next.config.mjs`: `typedRoutes` top-level, `turbopack.root` for monorepo lockfile warning.

## Current project state

### Working

- `npm run db:up` → Postgres  
- `cp .env.example .env` → `npm run db:migrate` → `npm run db:seed`  
- `npm run dev` / `npm run build` / `npm test`

### Structure (key paths)

- `app/page.tsx`, `app/evaluate/page.tsx`, `app/runs/page.tsx`, `app/runs/[id]/page.tsx`
- `app/api/evaluator/run/route.ts`, `runs/route.ts`, `runs/[id]/route.ts`
- `components/app-shell.tsx`, `evaluate-cta.tsx`, `evaluator-panel.tsx`, `header.tsx`

## Recommended next steps

1. **Auth** — replace demo user with real sessions (e.g. NextAuth) and scope runs by `userId`.
2. **File upload** — `ArtifactSourceType.UPLOAD` + storage.
3. **Export** — JSON/PDF audit export for runs.
4. **Rubric versioning** — surface diff when `rubricVersion` changes.

## Known issues / considerations

- `.vscode/*` gitignore may exclude tracked settings; project `.vscode/settings.json` exists locally for CSS lint.
- Docker required for default local DB (or point `DATABASE_URL` at managed Postgres).

## Quick reference

- **Branch / commit:** run `git branch --show-current` / `git rev-parse HEAD` locally.
- **DB URL default:** `postgresql://ii:ii@localhost:5434/instructional_integrity`
