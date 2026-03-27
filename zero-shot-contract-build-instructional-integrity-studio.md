# ZERO-SHOT BUILD CONTRACT

## Project: Instructional Integrity Studio

## Former Working Name: instructional-integrity-ui

## Domain: Cognitive Safety

## Parent Ecosystem: The Living Constitution (TLC)

## Parent Platform: SentinelOS

## Contract Version: ZSB-IIS-v2.0

## Prior Version: ZSB-IIS-v1.0

## Amendment Authority: See §30 (Contract Governance)

You are building a real, professional-grade product called **Instructional Integrity Studio**.

This system is not a generic educational UI, not a content prettifier, and not a broad "AI tutor" shell.

It is a **Cognitive Safety system**.

Its job is to evaluate whether an instructional artifact, explanation flow, tutorial, lesson, walkthrough, or AI-generated teaching output produces **correct understanding**, not merely correct content.

A system can be epistemically correct and still be cognitively unsafe if it causes the learner to form a false mental model.

This build must operationalize that doctrine.

This contract is governed by The Living Constitution (TLC). Where this contract specifies behavior, it binds the builder. Where it is silent, TLC Articles I–VIII and SOPs govern.

---

## 0. Core Product Thesis

Instructional Integrity Studio exists to detect and surface **instructional scaffolding failures** that create:

- false understanding
- unstable mental models
- hidden prerequisite gaps
- conclusion-first confusion
- terminology jumps
- polished but unsafe explanations
- cognitive overload caused by bad sequencing or compression

The system evaluates instructional artifacts as **safety objects**.

This is a Cognitive Safety product under TLC.

---

## 1. Required Name Change

The builder must rename the product-facing system from:

- `instructional-integrity-ui`

to:

- **Instructional Integrity Studio**

The repository slug may remain unchanged if necessary, but all product-facing surfaces must use the new name, including:

- README title
- homepage title
- metadata
- docs
- UI copy
- package/application labels where appropriate

The old name may appear only where needed for migration/reference.

---

## 2. Required Repo Artifact Rule

This zero-shot build contract is itself a required repo artifact.

### Mandatory file path

Create and maintain this file:

`docs/prompts/ZERO_SHOT_BUILD_CONTRACT__INSTRUCTIONAL_INTEGRITY_STUDIO.md`

### Mandatory README rule

The README must contain a clearly visible section that:

- names this contract
- links to it
- states that it is the canonical build-governing artifact

This requirement is mandatory and non-optional.

Do not bury it.

---

## 3. Product Category

Instructional Integrity Studio is a:

- **Cognitive Safety evaluation system**
- **Instructional integrity analysis platform**
- **evidence-backed artifact review tool**
- **TLC subsystem for preventing false understanding**

It is not to be described as:

- a generic LMS
- a chatbot
- a content generation studio
- a vague learning dashboard
- an "AI safety platform" in the broad sense

---

## 4. System Role in TLC

Within TLC, this system is the **Cognitive Safety subsystem**.

### It must integrate conceptually with

- **The Living Constitution** as governing doctrine
- **SentinelOS** as invariant substrate
- **PROACTIVE** as epistemic safety sibling system
- **UICare** as human safety sibling system
- **ConsentChain** as empirical/accountability sibling system
- **BuildLattice** as execution-governance sibling system

### Its distinct role

Evaluate whether instructional structure produces correct learner interpretation.

### Governing TLC Articles

This product is bound by:

- **Article VI (Audience Law)** — every surface must declare its user class
- **Article VII (Failure Operations Law)** — every workflow must define failure handling
- **Article VIII (Truth Maintenance Law)** — every truth claim must have status, owner, and revalidation trigger
- **SOP-014 (Governance Release Gates)** — all four gates must pass before any release

---

## 5.  Non-Negotiable Product Rules

### 5.1 Truth rule

Never claim validated evaluator accuracy unless such validation exists and is documented.

### 5.2 Separation rule

Separate the following concerns into distinct modules. Each concern maps to a required architectural module in §12.

| Concern | Required Module |
| --- | --- |
| artifact intake | `artifact-intake` |
| artifact normalization | `artifact-normalizer` |
| rubric evaluation | `evaluation-engine` + `rubric-registry` |
| evidence extraction | `evidence-extractor` |
| failure classification | `failure-classifier` |
| scoring | `evaluation-engine` |
| persistence | `persistence-layer` |
| reporting | `report-generator` |
| run history | `run-history-service` |
| UI rendering | `UI-surfaces` |

No module may silently combine two concerns without documented justification.

### 5.3 Evidence rule

Every score shown to a user must be grounded in inspectable evidence.

### 5.4 Determinism rule

The system must support deterministic evaluator execution for the core rule-based layer.

**Operational definition:** Given the same artifact input, the same rubric version, and the same evaluator configuration, the system must produce byte-identical scoring output, failure classifications, and verdict. This must hold across runs, across environments with the same configuration, and across test executions. Determinism is verified by running the same evaluation twice in the test suite and asserting output equality.

### 5.5 Status rule

Every major subsystem must be labeled truthfully as:

- `implemented`
- `partial`
- `mocked`
- `not implemented`

Status labels are governed by Article VIII (Truth Maintenance Law). Each status label is a truth claim subject to revalidation triggers, ownership, and drift alarms.

### 5.6 Cognitive Safety rule

The system must reject polished explanation quality as a proxy for safe understanding.

Scaffold quality must be evaluated independently.

### 5.7  Input safety rule

All user-supplied input — pasted text, uploaded files, and API payloads — must be validated and sanitized before processing. See §6.1 for specific constraints.

### 5.8  Accessibility rule

All user-facing surfaces must meet WCAG 2.1 AA compliance. Accessibility must be tested with at least one automated tool (axe-core or Lighthouse). See §10.5 for details.

---

## 6.  First-Class Evaluation Object

The builder must narrow the first implementation to one primary evaluation target:

### Required MVP evaluation object

#### AI-generated explanation artifacts in text or markdown form

This means the MVP must support evaluation of:

- pasted explanation text
- uploaded markdown/text files
- optionally saved explanation records

Do not begin by trying to support every possible instructional medium equally.

PDF, slide deck, image, transcript, and multimodal artifacts may be added later only after the core loop is stable.

### 6.1  Input Validation and Upload Security

All artifact intake must enforce:

| Constraint | Rule |
| --- | --- |
| **Max paste length** | 100,000 characters. Reject with clear error above this limit. |
| **Max upload file size** | 5 MB. Reject with clear error above this limit. |
| **Allowed MIME types** | `text/plain`, `text/markdown`, `text/x-markdown`. Reject all others with explicit error naming the unsupported type. |
| **File extension validation** | `.txt`, `.md` only. MIME type and extension must agree. |
| **Content sanitization** | Strip or neutralize embedded HTML, script tags, and control characters before normalization. |
| **Encoding** | UTF-8 required. Reject or transcode with warning for non-UTF-8 files. |
| **Filename sanitization** | Sanitize uploaded filenames to prevent path traversal or injection. |
| **Empty input** | Reject empty pastes and zero-byte uploads with specific guidance. |

These constraints must be enforced server-side. Client-side validation is permitted but not sufficient.

---

## 7.  Target Users and Audience Binding

Per Article VI (Audience Law), every surface must declare its target user class. This product serves the following user classes from the TLC Audience Contract:

### 7.1 Primary User: Safety Evaluator

A human testing whether instructional artifacts satisfy cognitive safety requirements.

| Attribute | Definition |
| --- | --- |
| **Goals** | Submit instructional artifacts; run evaluations; inspect criterion-level results and evidence; identify failure classes; review remediation guidance; export evidence-backed reports; review evaluation history |
| **Can** | Paste or upload artifacts; initiate evaluations; inspect all scoring, evidence, and failure data; export reports; view and compare historical runs |
| **Cannot** | Edit evaluation results retroactively; suppress failure classes; mark artifacts as safe without evaluation evidence |
| **Primary Surfaces** | Evaluator workspace (§10.2), Run history (§10.3), Run detail (§10.4) |
| **Copy Mode** | Benchmark-oriented, testable, evidence-forward. Must distinguish pass, warn, fail, needs_human_review |

### 7.2 Secondary User: Protected End User

A downstream learner or content consumer who may be affected by artifacts evaluated in this system. This user does not interact with the product directly in MVP, but the system's outputs — reports, failure labels, remediation guidance — must be written so that they could be shown to this user without causing harm.

| Attribute | Definition |
| --- | --- |
| **Goals** | Understand why an artifact was flagged; interpret remediation guidance; trust that the evaluation is grounded |
| **Copy Rules** | Plain language, low-ambiguity, no jargon in remediation text without definition, cognitively safe pacing |

### 7.3 Tertiary User: Constitutional Operator

A human reviewing Instructional Integrity Studio as part of TLC governance.

| Attribute | Definition |
| --- | --- |
| **Goals** | Inspect truth status; review system state; verify compliance with TLC governance |
| **Primary Surfaces** | Homepage/doctrine surface (§10.1), truth-status file, README |
| **Copy Mode** | Concise, operational, risk-aware |

### 7.4 Surface Binding Requirement

Every product surface in §10 must declare which user class it serves. If a surface has no declared user class, it is non-compliant with Article VI.

---

## 8.  Core User Flow

The product must provide a real end-to-end loop:

1. User submits an instructional artifact (paste or upload)
2. System validates input against §6.1 constraints
3. System normalizes artifact into an internal evaluation object
4. Evaluator runs rubric-backed checks
5. Evidence is extracted and attached to each criterion
6. Result is scored and classified
7. Result is persisted
8. User can view current and historical evaluation runs
9. User can inspect criterion-level rationale and evidence
10. User can export an evidence-backed report

That loop must be real.

Mock-only evaluator behavior is not sufficient for the MVP claim.

### 8.1  Error States Within the Core Flow

At each step, the following failure states must be handled explicitly per Article VII:

| Step | Possible Failure | Required Response | Severity |
| --- | --- | --- | --- |
| 1. Submit | Empty input, oversized input, wrong MIME type | Reject with specific guidance naming the constraint violated | S1 |
| 2. Validate | Encoding failure, embedded unsafe content detected | Reject or sanitize with user notification; preserve raw input for audit | S1–S2 |
| 3. Normalize | Unparseable structure, degenerate content (e.g., single character) | Return normalization failure with specific cause; do not proceed to evaluation | S2 |
| 4. Evaluate | Evaluator exception, timeout, partial rubric failure | Mark evaluation as `incomplete`; persist partial results; surface which criteria were not evaluated | S2–S3 |
| 5. Evidence | No evidence extractable for a criterion | Score criterion as `insufficient_evidence`; do not fabricate evidence | S1 |
| 6. Score/Classify | Conflicting signals, ambiguous verdict | Return `needs_human_review` verdict; never resolve ambiguity silently | S1 |
| 7. Persist | Database unreachable, write failure | Display explicit persistence failure; offer retry; do not claim results were saved | S3 |
| 8–9. View | Record not found, corrupted data | Display specific retrieval error; do not show partial data as complete | S2 |
| 10. Export | Generation failure, incomplete data | Fail export with reason; do not export partial reports without labeling them partial | S2 |

Every error displayed to the user must state: what failed, what was protected, what was not completed, and what the next valid action is.

### 8.2  First-Time User Experience

On first visit, the system must provide:

- A clear explanation of what the system does (link to or inline from the doctrine surface)
- At least one sample artifact preloaded or easily accessible so the user can run an evaluation immediately without composing or uploading content
- Clear visual indication of where to start (paste, upload, or try sample)

The system must not present an empty workspace with no guidance.

---

## 9. Required Failure Classes

The MVP must include explicit cognitive-safety failure classes as first-class outputs.

Minimum required classes:

| Class ID | Definition |
| --- | --- |
| `premature_conclusion` | Conclusion presented before sufficient justification or evidence |
| `missing_prerequisite_scaffolding` | Concept introduced without required prior knowledge |
| `terminology_jump` | Term used before it has been defined or grounded |
| `misleading_hierarchy` | Visual or structural hierarchy implies incorrect conceptual relationships |
| `compression_overload` | Too many concepts compressed into too few steps |
| `polished_but_unsafe_explanation` | Explanation reads well but produces incorrect mental model |
| `unjustified_confidence_signal` | Language implies certainty beyond what the content supports |
| `step_gap` | Missing intermediate step between two presented steps |
| `contextless_abstraction` | Abstract concept introduced without concrete grounding |
| `sequence_break` | Logical or pedagogical sequence is violated |

These must be represented in domain types, evaluator output, and UI.

---

## 10.  Required Product Surfaces

### 10.1 Marketing / Doctrine Surface

**Target user class:** Constitutional Operator, Safety Evaluator (first visit)

A serious homepage explaining:

- what cognitive safety is
- why correct content can still be unsafe
- how the system works
- where it fits in TLC
- how to get started (link to evaluator workspace)

### 10.2 Evaluator Workspace

**Target user class:** Safety Evaluator

A real evaluation interface for:

- paste input
- upload artifact
- select sample artifact (from preloaded library)
- run evaluation
- inspect criterion results
- inspect evidence
- inspect failure classes
- inspect remediation suggestions
- clear error messaging for all failure states defined in §8.1

### 10.3 Run History

**Target user class:** Safety Evaluator

A persisted history surface showing:

- prior runs
- timestamps
- artifact titles
- overall verdicts
- failure classes
- ability to open details
- ability to delete individual runs (§13.2 data retention)

### 10.4 Run Detail

**Target user class:** Safety Evaluator

A detail view showing:

- full result summary
- rubric breakdown
- evidence references
- remediation guidance
- failure class tags
- export options (JSON, markdown)
- verdict explanation

### 10.5  Accessibility Requirements for All Surfaces

All surfaces must meet:

- **WCAG 2.1 AA** compliance
- Keyboard navigability for all interactive elements
- Screen reader compatibility for all evaluation results, evidence, and failure classes
- Color contrast ratios meeting AA thresholds
- No information conveyed by color alone (verdicts must have text labels, not just color)
- Focus management on dynamic content updates (evaluation results loading)

Testing requirement: Run axe-core or Lighthouse accessibility audit on all four surfaces. All critical and serious violations must be resolved.

### 10.6  Navigation Model

The four surfaces must be organized as follows:

```text
┌──────────────────────────────────────────┐
│  Global Navigation Bar                    │
│  [Home/Doctrine] [Evaluate] [History]     │
├──────────────────────────────────────────┤
│                                           │
│  Current Surface Content                  │
│                                           │
│  Home → §10.1 doctrine + getting started  │
│  Evaluate → §10.2 evaluator workspace     │
│  History → §10.3 run list                 │
│    └─ History/[id] → §10.4 run detail     │
│                                           │
└──────────────────────────────────────────┘
```

- Multi-page layout using Next.js App Router
- Persistent top navigation across all pages
- Run detail is a child route of History (`/runs/[id]`)
- Active page indicator in navigation
- Breadcrumb on Run Detail page

---

## 11. Required Rubric Dimensions

The rubric must not be generic.

Minimum required rubric dimensions:

| Dimension ID | Name |
| --- | --- |
| `seq_integrity` | Sequencing Integrity |
| `prereq_visibility` | Prerequisite Visibility |
| `term_grounding` | Terminology Grounding |
| `concept_dep_clarity` | Concept Dependency Clarity |
| `progressive_disclosure` | Progressive Disclosure Quality |
| `misconception_risk` | Misconception Risk |
| `cog_load_pacing` | Cognitive Load Pacing |
| `scaffold_continuity` | Evidence of Scaffold Continuity |
| `conclusion_support` | Conclusion Support Integrity |
| `confidence_alignment` | Confidence-to-Support Alignment |

Each rubric dimension must have:

- an `id`
- `definition`
- `scoring_rule` (deterministic per §5.4)
- `evidence_expectation`
- `failure_mapping` (links to §9 failure classes)
- `remediation_guidance`
- `max_score`
- `weight` (for overall verdict calculation)

---

## 12.  Required MVP Stack

Use the following default stack unless a stronger implementation reason is documented in an ADR (§28.2):

| Concern | Technology |
| --- | --- |
| **Framework** | Next.js App Router |
| **Language** | TypeScript (strict mode) |
| **UI** | ShadCN UI |
| **Styling** | Tailwind CSS |
| **Backend** | Next.js route handlers; separate Python worker only when justified via ADR |
| **Database** | PostgreSQL |
| **ORM** | Prisma |
| **Validation** | Zod (all API request/response schemas) |
| **Tests** | Vitest (evaluator/domain logic), Playwright (critical flows) |
| **File handling** | Server-side upload normalization for text and markdown |
| **Export** | JSON + markdown report export |
| **Linting** | ESLint with strict TypeScript rules |
| **Formatting** | Prettier with consistent config |
| **Accessibility testing** | axe-core (integrated) or Lighthouse (CI) |
| **Dependency scanning** | `npm audit` in CI; Dependabot or Snyk recommended |
| **Logging** | Structured JSON logging (pino or equivalent) for all API routes and evaluator execution |

### 12.1  Environment Configuration

The project must include:

| File | Purpose |
| --- | --- |
| `.env.example` | Documented template with all required environment variables, no secrets |
| `.env.local` | Gitignored local override |
| `docker-compose.yml` | Local PostgreSQL instance + optional app container |

Required environment variables at minimum:

- `DATABASE_URL`
- `NODE_ENV`
- `LOG_LEVEL`
- `MAX_UPLOAD_SIZE_BYTES` (default: 5242880)
- `MAX_PASTE_LENGTH` (default: 100000)
- `EVALUATION_TIMEOUT_MS` (default: 30000)

### 12.2  Security Headers

The application must set the following headers on all responses:

- `Content-Security-Policy` — restrict script and style sources
- `X-Content-Type-Options: nosniff`
- `X-Frame-Options: DENY`
- `Strict-Transport-Security` (when served over HTTPS)
- `Referrer-Policy: strict-origin-when-cross-origin`

CORS must be configured to reject cross-origin API requests unless explicitly allowed.

---

## 13.  Required Architecture

### 13.1 Required Modules

| Module | Concern (§5.2) | Description |
| --- | --- | --- |
| `artifact-intake` | artifact intake | Accepts paste and upload, enforces §6.1 constraints |
| `artifact-normalizer` | artifact normalization | Converts raw input to internal evaluation object |
| `rubric-registry` | rubric evaluation | Stores and serves rubric dimension definitions |
| `evaluation-engine` | rubric evaluation + scoring | Runs deterministic rubric checks, produces scores |
| `evidence-extractor` | evidence extraction | Extracts and attaches evidence to criterion results |
| `failure-classifier` | failure classification | Maps evaluation results to failure classes |
| `persistence-layer` | persistence | Database operations for all domain entities |
| `report-generator` | reporting | Produces JSON and markdown exports |
| `run-history-service` | run history | Queries and serves historical evaluation runs |
| `UI-surfaces` | UI rendering | All client-side rendering and interaction |

### 13.2  Data Retention and Deletion

| Rule | Specification |
| --- | --- |
| **Default retention** | Evaluation runs are retained indefinitely in MVP |
| **User-initiated deletion** | Users must be able to delete individual evaluation runs and their associated data |
| **Cascade behavior** | Deleting an evaluation run must cascade to: CriterionResult, EvidenceExcerpt, FailureClass records, RemediationSuggestion, and ExportRecord |
| **Artifact retention** | Raw artifact text is retained with the evaluation run. Deletion of the run deletes the artifact copy |
| **Audit trail** | Deletion events must be logged (timestamp, actor, deleted record IDs) even though the records themselves are removed |
| **Future consideration** | Organization-level retention policies and automatic archival are deferred |

### 13.3 Required Architectural Separation

The evaluator engine must be separable from the UI.

The core evaluation engine must be runnable in tests without the browser UI.

### 13.4  Evaluator Extension Interface

The evaluation engine must expose a defined interface boundary that allows future evaluator types to be added without modifying the core engine.

Minimum interface:

```typescript
interface Evaluator {
  id: string;
  name: string;
  version: string;
  supportedArtifactTypes: ArtifactType[];
  evaluate(artifact: NormalizedArtifact, rubric: Rubric): EvaluationResult;
}
```

The MVP ships with one evaluator: `rule-based-text-evaluator`. The interface exists so that future evaluators (LLM-assisted, multimodal, domain-specific) can be registered without rewriting the engine.

This is an architectural requirement, not a feature requirement. The extension interface must exist in types. Only the rule-based evaluator must be implemented.

---

## 14.  Required API Surface

### 14.1 Endpoints

| Method | Path | Purpose |
| --- | --- | --- |
| `POST` | `/api/evaluations` | Submit artifact and run evaluation |
| `GET` | `/api/evaluations` | List evaluation runs |
| `GET` | `/api/evaluations/[id]` | Get evaluation run detail |
| `DELETE` | `/api/evaluations/[id]` | Delete evaluation run |
| `POST` | `/api/uploads` | Upload artifact file |
| `GET` | `/api/evaluations/[id]/export?format=json` | Export JSON report |
| `GET` | `/api/evaluations/[id]/export?format=markdown` | Export markdown report |

### 14.2  Request/Response Schema Requirements

All request and response payloads must be validated with Zod schemas.

#### POST /api/evaluations — Request

```typescript
{
  artifact: {
    source: "paste" | "upload" | "sample",
    title: string,           // max 200 chars
    content?: string,         // required if source=paste, max 100000 chars
    uploadId?: string,        // required if source=upload
    sampleId?: string,        // required if source=sample
  }
}
```

#### POST /api/evaluations — Response (Success)

```typescript
{
  id: string,
  status: "complete" | "incomplete",
  verdict: "pass" | "warn" | "fail" | "needs_human_review",
  overallScore: number,
  criterionResults: [
    {
      dimensionId: string,
      score: number,
      maxScore: number,
      verdict: "pass" | "warn" | "fail",
      evidence: [
        {
          excerptText: string,
          location: string,      // e.g., "paragraph 3", "lines 12-15"
          relevance: string
        }
      ],
      failureClasses: string[],  // ids from §9
      remediation: string
    }
  ],
  failureClassSummary: string[],
  createdAt: string,             // ISO 8601
  artifactTitle: string
}
```

#### Error Response (All Endpoints)

```typescript
{
  error: {
    code: string,              // machine-readable, e.g., "INPUT_TOO_LARGE"
    message: string,           // human-readable explanation
    details?: Record<string, unknown>,
    recoveryGuidance: string   // what the user should do next
  }
}
```

HTTP status codes must be used correctly: 400 for validation failures, 404 for missing resources, 413 for oversized input, 415 for unsupported media types, 500 for internal errors.

---

## 15.  Required File Structure

Create or preserve a structure equivalent to:

```text
/app
  /page.tsx                          # homepage / doctrine surface
  /evaluate/page.tsx                 # evaluator workspace
  /runs/page.tsx                     # run history
  /runs/[id]/page.tsx                # run detail
  /api/evaluations/route.ts          # POST (create), GET (list)
  /api/evaluations/[id]/route.ts     # GET (detail), DELETE
  /api/evaluations/[id]/export/route.ts  # GET (export)
  /api/uploads/route.ts              # POST (upload)
  /layout.tsx                        # global nav
/components
  evaluator-panel.tsx
  rubric-breakdown.tsx
  evidence-panel.tsx
  failure-class-list.tsx
  remediation-panel.tsx
  run-history-table.tsx
  upload-dropzone.tsx
  sample-artifact-selector.tsx
  hero.tsx
  journey-map.tsx
  package-grid.tsx
  cognitive-safety-glossary.tsx
  error-display.tsx
  nav-bar.tsx
  breadcrumb.tsx
/lib
  evaluator/
    evaluateArtifact.ts
    evaluatorInterface.ts            # extension interface (§13.4)
    ruleBasedTextEvaluator.ts        # MVP evaluator implementation
    classifyFailures.ts
    remediation.ts
  rubric/
    rubricRegistry.ts
    rubricTypes.ts
    defaultRubric.ts
  artifacts/
    normalizeArtifact.ts
    artifactTypes.ts
    validateInput.ts                 # §6.1 enforcement
    sanitizeInput.ts                 # §6.1 enforcement
  evidence/
    extractEvidence.ts
  domain/
    evaluationTypes.ts
    failureTypes.ts
    verdictTypes.ts
    errorTypes.ts
  persistence/
    createEvaluationRun.ts
    getEvaluationRun.ts
    listEvaluationRuns.ts
    deleteEvaluationRun.ts
  reporting/
    exportJsonReport.ts
    exportMarkdownReport.ts
    sanitizeExportContent.ts         # §14 output sanitization
  logging/
    logger.ts                        # structured logging
  validation/
    schemas.ts                       # Zod schemas for all API payloads
/prisma
  schema.prisma
  migrations/
  seed.ts                            # seeds sample artifacts
/data
  samples/
    sample-good-explanation.md
    sample-premature-conclusion.md
    sample-terminology-jump.md
    sample-compression-overload.md
    sample-polished-but-unsafe.md
/docs
  architecture.md
  tlc-mapping.md
  truth-status.md
  security.md                        # threat model (§28.3)
  adr/
    ADR-001-rule-based-evaluator.md  # first ADR (§28.2)
    ADR-TEMPLATE.md
  prompts/
    ZERO_SHOT_BUILD_CONTRACT__INSTRUCTIONAL_INTEGRITY_STUDIO.md
/config
  .env.example
  .eslintrc.js
  .prettierrc
/tests
  evaluator.test.ts
  rubric.test.ts
  failure-classifier.test.ts
  artifact-normalizer.test.ts
  input-validation.test.ts          # negative and boundary tests
  determinism.test.ts               # §5.4 verification
  api.test.ts
  deletion.test.ts
  e2e/
    evaluation-flow.spec.ts
    upload-evaluate-export.spec.ts
    error-states.spec.ts            # §8.1 error scenarios
    accessibility.spec.ts           # axe-core integration
docker-compose.yml
CHANGELOG.md
```

---

## 16. Required Database Model

At minimum, persist:

| Entity | Key Relationships |
| --- | --- |
| `Artifact` | Has many `EvaluationRun` |
| `EvaluationRun` | Belongs to `Artifact`; has many `CriterionResult` |
| `CriterionResult` | Belongs to `EvaluationRun`; has many `EvidenceExcerpt`; has many `FailureClassRecord` |
| `EvidenceExcerpt` | Belongs to `CriterionResult` |
| `FailureClassRecord` | Belongs to `CriterionResult` |
| `RemediationSuggestion` | Belongs to `CriterionResult` |
| `SampleArtifact` | Preloaded evaluation targets |
| `DeletionLog` | Audit record of deleted runs |
| `ExportRecord` | Optional but recommended |

The schema must support one artifact having many evaluation runs over time.

### 16.1  Migration and Seed Strategy

| Requirement | Rule |
| --- | --- |
| **Migrations** | Use Prisma Migrate. All schema changes must have a migration file. No manual SQL in production. |
| **Seed script** | `prisma/seed.ts` must populate sample artifacts from `/data/samples/`. |
| **Dev reset** | `pnpm db:reset` must drop, migrate, and seed in one command. |
| **Migration in CI** | CI must run migrations against a test database before running integration tests. |

---

## 17.  Required Real MVP Features

The MVP must include all of the following as working features:

| # | Feature | Acceptance Signal |
| --- | --- | --- |
| 1 | Paste text/markdown artifact into evaluator | Text appears in evaluation object |
| 2 | Upload `.txt` and `.md` artifact files | File parsed and normalized |
| 3 | Select from preloaded sample artifacts | Sample loads into evaluator |
| 4 | Normalize artifact into internal representation | Normalized object matches schema |
| 5 | Validate input against §6.1 constraints | Invalid inputs rejected with guidance |
| 6 | Run deterministic rubric checks | Same input → same output (§5.4) |
| 7 | Produce criterion-level scores | All 10 dimensions scored |
| 8 | Attach evidence excerpts to scores | Every scored criterion has evidence |
| 9 | Classify failure classes | At least applicable classes labeled |
| 10 | Generate remediation suggestions | Every warn/fail criterion has guidance |
| 11 | Persist results in PostgreSQL | Run retrievable after creation |
| 12 | Show run history | List page shows all persisted runs |
| 13 | Open run detail | Detail page shows full breakdown |
| 14 | Delete evaluation run | Run and associated data removed; deletion logged |
| 15 | Export machine-readable JSON report | Valid JSON matching schema |
| 16 | Export human-readable markdown report | Readable markdown with all sections |
| 17 | Display clear errors for all §8.1 failure states | Error states tested and visible |

### 17.1  MVP Prioritization Guidance

If the builder encounters time or complexity constraints, the following priority tiers govern which features are truly blocking vs. fast-follow:

**Tier 1 — Core loop (must work or no MVP exists):**
Features 1, 4, 5, 6, 7, 8, 9, 10, 11, 13, 17

**Tier 2 — Complete experience (required for MVP claim but buildable after Tier 1):**
Features 2, 3, 12, 14, 15, 16

No Tier 2 feature may be skipped without being explicitly labeled as `deferred` in truth-status.md.

---

## 18. Required Future-State but Deferred Features

Explicitly defer and label as `not implemented`:

- PDF ingestion
- slide deck ingestion
- OCR
- multimodal artifact analysis
- external LLM-assisted rubric judgment
- collaborative review
- full authentication system
- organization workspaces
- production deployment claims
- validated scoring accuracy claims
- real-time collaboration
- automatic archival / retention policies
- organization-level access control

These may be named but must be labeled `deferred` in truth-status.md and in any UI surface where they appear.

---

## 19. Required Evaluator Behavior

The evaluator must produce:

- overall verdict
- rubric score breakdown
- evidence-backed criterion results
- failure class labels
- remediation suggestions
- confidence/uncertainty marker where applicable
- evaluation duration (milliseconds)
- evaluator version identifier

The evaluator must not return black-box summary text without exposing the scored structure.

### 19.1  Timeout and Resource Constraints

| Constraint | Limit |
| --- | --- |
| **Evaluation timeout** | 30 seconds (configurable via `EVALUATION_TIMEOUT_MS`) |
| **Max concurrent evaluations** | 5 per instance (configurable) |
| **Timeout behavior** | Mark evaluation as `incomplete`; persist partial results; return S2 error to user |

---

## 20. Required Verdict States

Minimum verdict set:

- `pass` — artifact meets cognitive safety thresholds
- `warn` — artifact has identified risks that may not prevent understanding but should be addressed
- `fail` — artifact has structural failures likely to produce false understanding
- `needs_human_review` — evaluation produced ambiguous or conflicting signals

These must be grounded in explicit scoring and failure logic.

### 20.1  Verdict Calculation Rule

The verdict must be derived deterministically from criterion scores:

| Condition | Verdict |
| --- | --- |
| All criteria pass | `pass` |
| Any criterion warns, none fail | `warn` |
| Any criterion fails | `fail` |
| Conflicting signals or insufficient evidence on 2+ criteria | `needs_human_review` |

This logic must be unit tested.

---

## 21. Required Remediation Output

For every failing or warning criterion, provide at least one remediation suggestion.

Examples:

- define prerequisite concept earlier
- move conclusion below justification
- split compressed section into ordered stages
- introduce terminology before abstract usage
- reduce concept load per step
- add bridging explanation between sections

This is mandatory.

The product must not diagnose without guiding correction.

### 21.1  Remediation Copy Rules

Per Article VI (Audience Law), remediation text must be written so that it could be shown to a Protected End User:

- plain language
- no jargon without definition
- actionable (states what to do, not just what is wrong)
- specific to the artifact (references the actual content where possible)

---

## 22.  Required README Structure

The README must contain:

| # | Section | Content |
| --- | --- | --- |
| 1 | Product name and domain | Instructional Integrity Studio — Cognitive Safety |
| 2 | What cognitive safety is | 2–3 sentence definition |
| 3 | What problem the product solves | Why correct content can be cognitively unsafe |
| 4 | Who it's for | Primary user class: Safety Evaluator (§7.1) |
| 5 | How it fits in TLC | Cognitive Safety subsystem reference |
| 6 | Getting started | Clone, install, run, evaluate in under 5 minutes |
| 7 | Current truthful status | Link to truth-status.md |
| 8 | Exact implemented features | List from §17 with status |
| 9 | Exact non-implemented features | List from §18 |
| 10 | Install/run/test instructions | Step-by-step including database setup |
| 11 | Environment setup | Reference to `.env.example` |
| 12 | Architectural map | Module diagram or list referencing §13 |
| 13 | Zero-Shot Build Contract | Link to canonical contract file |

This is mandatory.

### 22.1  Developer Onboarding Guarantee

A new developer must be able to go from `git clone` to a running evaluation in under 5 minutes with the following commands:

```bash
git clone <repo>
cd <repo>
cp .env.example .env.local
docker-compose up -d          # starts PostgreSQL
pnpm install
pnpm db:reset                 # migrate + seed
pnpm dev                      # starts app
# navigate to /evaluate, select sample artifact, click evaluate
```

If this sequence does not work, the README is non-compliant.

---

## 23.  Required Truth-Status File

Create: `docs/truth-status.md`

It must state:

- what exists
- what does not exist
- what was verified
- what was not verified
- current functional status
- owner of this file
- last updated date
- next scheduled review date

Do not exaggerate implementation state.

### 23.1  Truth Maintenance Rules (per Article VIII)

| Rule | Specification |
| --- | --- |
| **Owner** | The builder until handoff; thereafter the Constitutional Operator |
| **Update trigger** | Every PR that changes feature status, every release, every dependency change that affects evaluator behavior |
| **Freshness window** | 7 days during active development; 30 days in maintenance mode |
| **Revalidation** | On every trigger: verify that truth-status.md matches actual code state |
| **Drift alarm** | If truth-status.md has not been updated within the freshness window, the README must display a staleness warning |
| **Format** | Each claim must include: claim text, status (`implemented` / `partial` / `mocked` / `not implemented`), evidence (test name, file path, or manual verification note), last verified date |

### 23.2  Truth-Status Compliance Checklist

Before any release or PR that changes feature status, the builder must verify:

- [ ] Every feature listed in §17 has a truthful status entry
- [ ] Every deferred feature in §18 is listed as `not implemented`
- [ ] No status has been upgraded without passing tests or documented evidence
- [ ] `last_updated` date is current
- [ ] `next_review_at` date is set
- [ ] README feature list matches truth-status.md
- [ ] UI copy does not claim features beyond what truth-status.md declares

---

## 24.  Required Test Surface

### 24.1 Unit Tests

| Test Subject | Required Cases |
| --- | --- |
| Artifact normalization | Valid text, valid markdown, empty input, oversized input, non-UTF-8, single character |
| Input validation | Every constraint in §6.1 with both passing and failing cases |
| Rubric scoring logic | Each dimension scored correctly; edge cases for partial matches |
| Failure classification | Each failure class triggered by known patterns; no false classification on clean artifacts |
| Remediation generation | Every warn/fail criterion produces at least one suggestion |
| Verdict calculation | All four verdict states reachable; §20.1 logic verified |
| Determinism | Same artifact + same rubric + same config = identical output across 3 runs |

### 24.2 Integration Tests

| Test Subject | Required Cases |
| --- | --- |
| Create evaluation run | Full flow from API request to persisted record |
| Persist criterion results | All criterion data, evidence, and failure classes stored |
| Retrieve evaluation history | List endpoint returns correct records |
| Retrieve evaluation detail | Detail endpoint returns complete breakdown |
| Delete evaluation run | Cascade deletion verified; deletion logged |
| Upload + evaluate flow | File upload → normalization → evaluation → persistence |
| Error responses | Invalid input returns correct error schema; missing record returns 404 |

### 24.3 E2E Tests

| Test Subject | Required Cases |
| --- | --- |
| Paste → evaluate → persist → open detail | Full happy-path loop in browser |
| Upload → evaluate → persist → export | Upload flow through to export download |
| Sample artifact → evaluate | Preloaded sample triggers successful evaluation |
| Error states | Oversized paste shows error; wrong file type shows error; empty submit shows error |
| Accessibility | axe-core scan on all four surfaces; zero critical/serious violations |

### 24.4  Test Quality Standards

| Standard | Requirement |
| --- | --- |
| **Coverage threshold** | 80% line coverage for `/lib` directory |
| **Negative test ratio** | At least 30% of unit tests must be negative/boundary cases |
| **CI requirement** | All tests must run in CI on every PR |
| **Flake policy** | Any test that fails intermittently must be fixed or quarantined within 48 hours |

No MVP completion claim is allowed without passing tests.

---

## 25.  Required Maturity Moves

The builder must explicitly perform these maturity upgrades:

| # | Move | Verification |
| --- | --- | --- |
| 1 | Remove contradictory status language from existing docs | Grep for conflicting claims; none found |
| 2 | Replace mock ambiguity with one real end-to-end evaluator path | E2E test passes |
| 3 | Make upload real for text/markdown | Upload test passes with real files |
| 4 | Expose criterion-level evidence | Evidence visible in run detail UI |
| 5 | Expose failure classes and remediation | Both visible in run detail UI |
| 6 | Persist results and history | Integration tests pass |
| 7 | Document repo truthfully | truth-status.md passes §23.2 checklist |
| 8 | Add build contract to repo | File exists at specified path |
| 9 | Link build contract in README | Link present and working |
| 10 | Present the repo as a real Cognitive Safety subsystem inside TLC | README and homepage communicate this clearly |
| 11 | Handle all error states in §8.1 | Error state E2E tests pass |
| 12 | Seed sample artifacts | Sample artifacts appear in evaluator workspace |
| 13 | Pass all four Governance Release Gates (SOP-014) | Gate checklist completed |

---

## 26.  Acceptance Criteria

The build is acceptable only if **all** of the following are true:

### Core Product

- [ ] Product-facing name is updated to Instructional Integrity Studio
- [ ] One real text/markdown artifact evaluation loop works end-to-end
- [ ] Criterion-level evidence is visible
- [ ] Failure classes are visible
- [ ] Remediation suggestions are visible
- [ ] Evaluation runs persist
- [ ] History and detail pages work
- [ ] Export works (JSON and markdown)
- [ ] Sample artifacts are preloaded and selectable
- [ ] Deletion of evaluation runs works

### Error Handling

- [ ] All §8.1 error states are handled with user-visible guidance
- [ ] No silent failures in the evaluation pipeline
- [ ] Error responses match §14.2 error schema

### Input Safety

- [ ] All §6.1 input constraints are enforced server-side
- [ ] Security headers are set per §12.2

### Documentation and Truth

- [ ] Build contract file exists in repo at specified path
- [ ] README explicitly links to the build contract
- [ ] README follows §22 structure
- [ ] truth-status.md exists and follows §23 / §23.1 rules
- [ ] truth-status.md passes §23.2 compliance checklist
- [ ] Documentation does not overclaim

### Testing

- [ ] All §24 tests pass
- [ ] 80% line coverage for `/lib`
- [ ] Accessibility audit passes with zero critical/serious violations
- [ ] Determinism test passes (§5.4)

### Governance

- [ ] Every surface declares its target user class (§7 / Article VI)
- [ ] Failure handling defined for every workflow step (§8.1 / Article VII)
- [ ] Truth maintenance rules applied to truth-status.md (§23.1 / Article VIII)
- [ ] All four SOP-014 Release Gates pass

---

## 27. Forbidden Claims

Do not claim:

- validated evaluator accuracy
- production deployment
- full multimodal support
- complete instructional science coverage
- cognitive safety guarantees
- "AI tutor" functionality if not implemented
- enterprise readiness unless proven
- real-time collaboration unless implemented

### 27.1  Forbidden Claims Enforcement

Before any release, the builder must run this compliance check:

1. Search all UI copy, README, docs, and metadata for each forbidden claim keyword
2. Verify that no surface implies any forbidden claim
3. Document the check in truth-status.md under a "Forbidden Claims Audit" section
4. Include: date of audit, files scanned, result (pass/fail), any findings

This check is manual in MVP. Automated scanning is a deferred enhancement.

---

## 28.  Required Supporting Artifacts

### 28.1 CHANGELOG.md

Maintain a `CHANGELOG.md` in the repo root following Keep a Changelog format.

Every PR must include a changelog entry. Categories: Added, Changed, Fixed, Removed, Security, Deprecated.

### 28.2 Architecture Decision Records (ADRs)

Maintain ADRs in `docs/adr/` using the template at `docs/adr/ADR-TEMPLATE.md`.

Template must include:

- ADR number and title
- Date
- Status (proposed / accepted / superseded / deprecated)
- Context (what prompted the decision)
- Decision
- Consequences
- Alternatives considered

**Required first ADR:** `ADR-001-rule-based-evaluator.md` — documenting the decision to use a deterministic rule-based evaluator for MVP rather than LLM-assisted evaluation.

### 28.3 Security Threat Model

Create `docs/security.md` containing a lightweight threat analysis covering:

| Surface | Threats | Mitigations |
| --- | --- | --- |
| Paste input | XSS, injection, oversized payload | §6.1 sanitization, §12.2 CSP, size limits |
| File upload | Malicious files, path traversal, MIME spoofing | §6.1 MIME validation, filename sanitization, server-side only |
| API endpoints | CSRF, unauthorized access, abuse | Security headers, CORS, rate limiting consideration |
| Evaluation output | Content injection into exports | §14 output sanitization |
| Database | SQL injection, data leakage | Prisma parameterized queries, no raw SQL |
| Persisted artifacts | Proprietary content exposure | §13.2 deletion capability, access limited to current session/user |

This is a living document. It need not be exhaustive for MVP but must exist.

### 28.4  Cognitive Safety Glossary

Create a glossary of domain terms used in the UI, accessible from any evaluation surface.

Minimum terms:

- cognitive safety
- scaffolding failure
- premature conclusion
- prerequisite scaffolding
- terminology grounding
- compression overload
- progressive disclosure
- mental model
- epistemic correctness vs cognitive safety

Implementation: a glossary component (`cognitive-safety-glossary.tsx`) accessible as a panel or modal from the evaluator workspace and run detail pages. Terms used in failure class labels and remediation text should link to glossary definitions via tooltips or inline references.

---

## 29.  Authentication Model for MVP

The MVP uses **anonymous session-based identity**.

| Rule | Specification |
| --- | --- |
| **Session** | Browser session via cookie; no login required |
| **Identity** | Anonymous session ID; no PII collected |
| **Scope** | Each session sees only its own evaluation runs |
| **Persistence** | Session-linked data persists across page loads within the same browser |
| **Limitations** | No cross-device access; no account recovery; session expiry clears history link |
| **Deferred** | Full authentication, user accounts, organization workspaces — all labeled `not implemented` |

This must be documented in truth-status.md.

---

## 30. [NEW] Contract Governance

### 30.1 Version

This contract is version **ZSB-IIS-v2.0**.

### 30.2 Amendment Process

Amendments to this contract follow Article V (Amendment Process):

1. **Trigger** — Builder or operator identifies a gap, conflict, or improvement
2. **Proposal** — Draft amendment with: clause affected, change proposed, rationale, impact assessment
3. **Review** — Constitutional Operator reviews against TLC principles
4. **Ratification** — Update contract file in repo; increment version; add CHANGELOG entry; commit with `chore: amend build contract — [clause]`

### 30.3 Conflict Resolution

If this contract conflicts with TLC Articles I–VIII:

- TLC Articles govern
- The conflict must be documented in an ADR
- The contract must be amended to resolve the conflict

If this contract is silent on a matter:

- TLC Articles and SOPs govern by default

---

## 31. Required Final Positioning Statement

The finished MVP must be truthfully describable as:

> **Instructional Integrity Studio** is a Cognitive Safety evaluation system in the TLC ecosystem that analyzes instructional artifacts for scaffolding failures that produce false understanding, with evidence-backed rubric scoring, failure classification, remediation guidance, persisted evaluation history, and governed truth maintenance — designed for Safety Evaluators and bound by TLC Articles VI, VII, and VIII.

---

## 32. Final Build Instruction

Build this as a real, narrow, truth-stable MVP.

Do not overbuild.
Do not hide missing pieces.
Do not replace evaluator rigor with UI polish.
Do not substitute vague AI language for inspectable logic.
Do not ship without passing all four Governance Release Gates.

The first successful version is not "big."
The first successful version is **credible, governed, and honest about what it is.**

---

## Change Log: v1.0 → v2.0

| Section | Change Type | What Changed | Source Recommendation |
| --- | --- | --- | --- |
| Header | Enhanced | Added prior version reference, amendment authority, TLC binding statement | S-H5 |
| §4 | Enhanced | Added governing TLC Articles reference | Gap closure |
| §5.2 | Enhanced | Mapped separation concerns to architectural modules 1:1 | S-E7 |
| §5.4 | Enhanced | Added operational definition of deterministic | S-E8 |
| §5.5 | Enhanced | Connected status rule to Article VIII | Gap closure |
| §5.7 | New | Input safety rule | S-E2 |
| §5.8 | New | Accessibility rule | S-E10 |
| §6.1 | New | Input validation and upload security constraints | S-E2 |
| §7 | New | Target users and audience binding (full section) | S-E1 / Gap 1 |
| §8 | Enhanced | Added step 2 (validation) to core flow | S-E3 |
| §8.1 | New | Error states within core flow (full table) | S-E3 / Gap 2 |
| §8.2 | New | First-time user experience and sample artifacts | S-T8, S-H1 |
| §10 | Enhanced | Added target user class to each surface | S-E1 |
| §10.5 | New | Accessibility requirements | S-E10, S-T5 (from C) |
| §10.6 | New | Navigation model | S-T11 |
| §11 | Enhanced | Added IDs, max_score, weight to rubric dimensions | Implicit from S-E8 |
| §12 | Enhanced | Added linting, formatting, accessibility testing, dependency scanning, logging | S-T3, S-T4, S-T6 |
| §12.1 | New | Environment configuration | S-T1 |
| §12.2 | New | Security headers | S-T9 |
| §13 | Enhanced | Module table with 1:1 concern mapping | S-E7 |
| §13.2 | New | Data retention and deletion | S-E9 |
| §13.4 | New | Evaluator extension interface | S-H3 |
| §14 | New | API surface with endpoints and schemas | S-E4 |
| §14.2 | New | Request/response schemas with Zod | S-E4 |
| §15 | Enhanced | Added new files for all new requirements | Various |
| §16.1 | New | Migration and seed strategy | S-T5 |
| §17 | Enhanced | Added features 3, 5, 14, 17; added acceptance signals | S-T8, S-E2, S-E3 |
| §17.1 | New | MVP prioritization tiers | S-E (from B) |
| §19.1 | New | Timeout and resource constraints | S-E5 |
| §20.1 | New | Verdict calculation rule | S-E8 |
| §21.1 | New | Remediation copy rules per Article VI | Gap 1 |
| §22 | Enhanced | Added getting started, environment, developer onboarding | S-T8, S-H5 (from A) |
| §22.1 | New | Developer onboarding guarantee | S-H5 (from A) |
| §23 | Enhanced | Added owner, last updated, next review date | Gap 3 |
| §23.1 | New | Truth maintenance rules per Article VIII | S-E6 / Gap 3 |
| §23.2 | New | Truth-status compliance checklist | S-E6, S-T12 |
| §24 | Enhanced | Added negative/boundary cases to all test categories | S-T2, S-E (from C) |
| §24.4 | New | Test quality standards | S-T2 |
| §25 | Enhanced | Added verification column | S-T12 |
| §26 | Enhanced | Restructured into categories; added all new acceptance criteria | All |
| §27.1 | New | Forbidden claims enforcement mechanism | S-T12 |
| §28.1 | New | CHANGELOG.md requirement | S-H6 |
| §28.2 | New | ADR template and first required ADR | S-H2 |
| §28.3 | New | Security threat model | S-H8 |
| §28.4 | New | Cognitive safety glossary | S-H10 |
| §29 | New | Authentication model for MVP | S-T7 |
| §30 | New | Contract governance, versioning, amendment process | S-H5 |
| §31 | Enhanced | Updated positioning statement to include governance references | Gap closure |
| §32 | Enhanced | Added governance release gate requirement | SOP-014 |

### Recommendations Addressed

| Category | Total Identified | Addressed in v2.0 | Remaining |
| --- | --- | --- | --- |
| **Essential (S-E)** | 10 | 10 | 0 |
| **Table Stakes (S-T)** | 12 | 12 | 0 |
| **High Value-Added (S-H)** | 10 | 9 | 1 |
| **Total** | 32 | 31 | 1 |

**One deferred recommendation:** S-H9 (Day 1 user journey narrative) — partially addressed by §8.2 (first-time user experience) and §22.1 (developer onboarding guarantee) but a full prose narrative was not included to avoid inflating contract length. It is recommended as a companion document in `/docs/day-1-journey.md`.

---

### V&T Statement

**Exists:** Complete v2.0 zero-shot build contract incorporating all 10 essential, all 12 table stakes, and 9 of 10 high-value-added recommendations. Full change log mapping every modification to its source recommendation. Three governance gaps closed via binding references to TLC Articles VI, VII, and VIII.

**Non-existent:** The contract file has not been written to any repository. No code, schema, test, or infrastructure has been created. The Day 1 user journey narrative (S-H9) was not written as a standalone document.

**Unverified:** Whether the Zod schema definitions in §14.2 align with any existing type definitions in the current codebase. Whether the `docker-compose.yml` requirement is compatible with the builder's deployment environment. Whether the 80% coverage threshold is achievable given the MVP scope.

**Functional status:** Contract v2.0 complete and ready for ratification and repo insertion. All identified gaps closed. All synthesized recommendations addressed or explicitly deferred with rationale.
