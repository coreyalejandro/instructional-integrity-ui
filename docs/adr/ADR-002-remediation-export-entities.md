# ADR-002: RemediationSuggestion and ExportRecord tables

- **Status:** Accepted
- **Date:** 2026-03-27

## Context

ZSB-IIS-v2.0 §16 requires `RemediationSuggestion` and optional `ExportRecord` as persisted entities with cascade on run deletion.

## Decision

- Add `RemediationSuggestion` rows (one per criterion) mirroring `CriterionResult.remediation` for a first-class relational model and §16 compliance.
- Add `ExportRecord` on each successful JSON/markdown export from `GET /api/evaluations/[id]/export`.
- Keep `CriterionResult.remediation` for a single API read path and stable exports; suggestions are written in lockstep at create time.

## Consequences

- Duplicate storage of remediation text until a future migration drops the column in favor of suggestions-only reads.
- Export history grows with downloads; cascade delete clears records when a run is deleted.
