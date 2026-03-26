# Changelog

All notable changes to this project are documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.1.0/).

## [Unreleased]

### Added

- ZSB-IIS-v2.0 alignment: PostgreSQL schema for session-scoped evaluation runs, criterion evidence, failure classes, deletion audit log, and sample artifacts.
- API routes: `POST/GET /api/evaluations`, `GET/DELETE /api/evaluations/[id]`, export, uploads, samples.
- Deterministic `rule-based-text-evaluator` with ten-dimension rubric, failure classes, and remediation.
- Documentation: build contract, truth-status, security threat model, ADR-001, architecture and TLC mapping stubs.
- Vitest coverage for evaluator, determinism, rubric, validation; Playwright smoke and axe checks.

### Changed

- Product-facing name to **Instructional Integrity Studio**; anonymous session cookie replaces demo user for scoped history.
