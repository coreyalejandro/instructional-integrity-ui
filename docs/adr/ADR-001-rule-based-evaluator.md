# ADR-001: Deterministic rule-based evaluator for MVP

- **Date:** 2026-03-26
- **Status:** accepted

## Context

The product must ship inspectable, reproducible scoring (§5.4) without claiming validated accuracy from ML models (§5.1, §27).

## Decision

Implement a **rule-based text evaluator** (`rule-based-text-evaluator`) operating on normalized plain text with explicit rubric dimensions, evidence excerpts, and failure-class tagging. Defer LLM-assisted or multimodal evaluators to future ADRs behind the `Evaluator` interface.

## Consequences

- **Positive:** Byte-stable outputs for testing; no external inference dependency; clear remediation mapping.
- **Negative:** Heuristic coverage is limited versus human instructional judgment; must be labeled honestly in `truth-status.md`.

## Alternatives considered

- **LLM-as-judge:** Rejected for MVP — violates determinism and introduces unverified accuracy claims.
- **Hybrid (rules + LLM):** Deferred — requires ADR for cost, safety, and evaluation methodology.
