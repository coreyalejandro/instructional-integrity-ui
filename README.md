# Instructional Integrity UI

## What This Is

Cognitive safety system that evaluates whether learning environments produce correct understanding — not just correct content. Instructional Integrity UI provides a journey-map flow from framework comprehension through artifact evaluation to production packaging, with a rubric system that makes evidence states visible at every stage.

## What Safety Problem It Addresses

**Domain:** Cognitive Safety
**Failure class:** A learning environment produces false understanding, misleading structure, or unsafe mental models — even when the underlying content is technically correct.

An AI tutoring system presents a correct mathematical proof but shows the conclusion before the premises. The student concludes the conclusion was an assumption. The content was correct. The understanding is wrong. This is not a pedagogical failure — it is a safety failure. Cognitive scaffolding determines whether correct information produces correct mental models. Without evaluation of instructional integrity, systems produce confident learners with false understanding.

## Why It Matters

> Alignment includes human interpretation, not just model outputs.

A correct output misunderstood is still a failure. This is what separates cognitive safety from epistemic safety: the truth may be present but the interpretation may be wrong. Every AI system that teaches, explains, or presents information for decision-making is an instructional system — and every instructional system that produces false understanding is a cognitive safety hazard.

## How It Fits the Platform / Domain

**Domain:** Cognitive Safety
**Platform role:** Domain work under Safety Systems Design
**Invariants enforced:** I1 (Evidence-First — evaluations require evidence), I3 (Confidence-Verification — rubric scores must be grounded), I5 (Safety Over Fluency — reject polished content with bad scaffolding)

### Connection to Doctrine

**Doctrine Point 4:** *Alignment includes human interpretation, not just model outputs.* Instructional Integrity UI exists because a system can produce entirely truthful, well-formatted, accessible content that still produces false understanding in the learner. The scaffolding is the safety layer.

### Connection to 35-Year Arc

```
1991–2010  The Educator    → Cognitive safety as daily practice
2010–2020  The Dean        → Learning environments as safety systems
2020–Now   The AI Engineer → Instructional integrity applied to AI interfaces
```

25 years of education and instructional design work proved that the learning environment is a safety system. This is not a new idea — it is the continuation of the arc.

## What Is Real Now

- **Complete homepage UI** — Next.js 14 App Router with stable information architecture
- **Journey-map flow** — 5-step product journey: understand framework → choose path → complete task → review evidence → production packages
- **Evaluator interface** — mock with visible evidence states (`components/evaluator-panel.tsx`)
- **Rubric system** — structured evaluation criteria (`lib/rubric.ts`)
- **Evaluator logic** — core evaluation engine (`lib/evaluator.ts`)
- **Domain types** — typed domain model (`lib/domain.ts`)
- **Data layer** — structured data access (`lib/data.ts`, `lib/db.ts`)
- **API types** — typed API contracts (`lib/api-types.ts`)
- **Prisma schema** — data model: User, Organization, Artifact, EvaluationRun, Template, Playbook, TrainingSession
- **8 components** — evaluator-panel, footer, header, hero, journey-map, package-grid, ui/, workflow-overview
- **Tests** — evaluator test suite (`lib/evaluator.test.ts`)
- **Vitest configuration** — test runner configured (`vitest.config.mts`)
- **Tailwind styling** — responsive, component-based design
- **TypeScript** — full type coverage

**Implementation status:** Prototype (working UI, evaluator interface, rubric system — no real evaluator execution, no auth, no persistence)

## How to Verify

```bash
# Clone
git clone <repo-url>
cd instructional-integrity-ui

# Install and run
npm install
npm run dev
# → http://localhost:3000

# Run tests
npx vitest run

# Inspect Prisma schema
cat prisma/schema.prisma
```

## Demo / Evidence

- **Working UI:** `http://localhost:3000` — complete homepage with journey-map flow
- **Evaluator interface:** `components/evaluator-panel.tsx` — visible evidence states
- **Rubric system:** `lib/rubric.ts` — structured evaluation criteria
- **Evaluator logic:** `lib/evaluator.ts` — core evaluation engine
- **Data model:** `prisma/schema.prisma` — 7 models defining the evaluation domain
- **Test suite:** `lib/evaluator.test.ts` — evaluator tests

## Status Matrix

| Component | Status | Evidence |
|-----------|--------|---------|
| Homepage UI | Implemented | `app/page.tsx`, 8 components |
| Journey-map flow | Implemented | `components/journey-map.tsx` |
| Evaluator interface (mock) | Implemented | `components/evaluator-panel.tsx` |
| Rubric system | Implemented | `lib/rubric.ts` |
| Evaluator logic | Implemented | `lib/evaluator.ts` |
| Domain types | Implemented | `lib/domain.ts`, `lib/api-types.ts` |
| Prisma schema | Implemented | `prisma/schema.prisma` — 7 models |
| Evaluator test suite | Implemented | `lib/evaluator.test.ts` |
| Real evaluator execution | Not wired | Mock only — no live artifact evaluation |
| Authentication | Not implemented | No auth system |
| Persistent state | Not implemented | Prisma schema exists, no database provisioned |
| File upload pipeline | Not implemented | No upload capability |
| Training workflow backend | Not implemented | No backend processing |

## Next Planned Work

- Wire real evaluator execution against live instructional artifacts
- Provision PostgreSQL and run Prisma migrations
- Implement authentication (likely NextAuth)
- Build file upload pipeline for artifact submission
- Connect rubric scoring to persistent evaluation records
- Add evidence export for audit trail

---

### V&T Statement

**EXISTS:** Homepage UI, journey-map flow, evaluator interface (mock), rubric system, evaluator logic, domain types, Prisma schema, evaluator tests, Vitest config
**VERIFIED AGAINST:** Application source code, component files, library files, Prisma schema, test files
**NOT CLAIMED:** Real evaluator execution, authentication, persistent state, production deployment, validated evaluation accuracy
**STATUS:** PROTOTYPE

---

### Repository Structure

```
app/                    # Next.js 14 App Router
  page.tsx              # Homepage
  layout.tsx            # Root layout
  api/                  # API routes
components/             # 8 React components
  evaluator-panel.tsx   # Evaluator interface with evidence states
  journey-map.tsx       # 5-step product journey
  hero.tsx              # Homepage hero
  package-grid.tsx      # Package overview
  workflow-overview.tsx # Workflow visualization
  header.tsx            # Navigation
  footer.tsx            # Footer
  ui/                   # Shared UI primitives
lib/                    # Core logic
  evaluator.ts          # Evaluation engine
  rubric.ts             # Rubric system
  domain.ts             # Domain types
  data.ts               # Data access
  db.ts                 # Database utilities
  api-types.ts          # API contracts
  evaluator.test.ts     # Tests
prisma/
  schema.prisma         # Data model (7 models)
```

---

*Part of [Safety Systems Design](https://github.com/coreyalejandro) — Cognitive Safety domain*
*Platform: SentinelOS — AI Safety Operating Layer*
