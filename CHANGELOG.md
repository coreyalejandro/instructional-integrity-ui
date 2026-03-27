# Changelog

All notable changes to this project are documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.1.0/).

## [Unreleased]

### Changed

- Migrated `middleware.ts` → `proxy.ts` per [Next.js 16 middleware-to-proxy](https://nextjs.org/docs/messages/middleware-to-proxy) (`export function proxy`).

### Added

- Contract **§B**: `RemediationSuggestion` and `ExportRecord` Prisma models; export audit on download; `/api` CORS guard + `CORS_ALLOWED_ORIGINS`; `config/.env.example`; ADR-002.
- Contract §A: evaluation deadline between dimensions, concurrent-eval limiter, recovery message map, glossary anchors for failure classes, E2E error-state and run-detail accessibility coverage.
- ZSB-IIS-v2.0 alignment: PostgreSQL schema for session-scoped evaluation runs, criterion evidence, failure classes, deletion audit log, and sample artifacts.
- API routes: `POST/GET /api/evaluations`, `GET/DELETE /api/evaluations/[id]`, export, uploads, samples.
- Deterministic `rule-based-text-evaluator` with ten-dimension rubric, failure classes, and remediation.
- Documentation: build contract, truth-status, security threat model, ADR-001, architecture and TLC mapping stubs.
- Vitest coverage for evaluator, determinism, rubric, validation; Playwright smoke and axe checks.

### Changed

- Product-facing name to **Instructional Integrity Studio**; anonymous session cookie replaces demo user for scoped history.
