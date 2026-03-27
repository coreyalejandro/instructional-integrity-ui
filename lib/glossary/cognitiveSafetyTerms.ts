import type { FailureClassId } from "@/lib/domain/failureTypes";

export interface GlossaryEntry {
  id: string;
  term: string;
  definition: string;
}

/** Canonical glossary entries (contract §28.4) with stable DOM ids for deep links. */
export const COGNITIVE_SAFETY_GLOSSARY: GlossaryEntry[] = [
  {
    id: "glossary-cognitive-safety",
    term: "Cognitive safety",
    definition:
      "Whether an instructional artifact tends to produce correct mental models in the learner, not merely whether its propositions are true."
  },
  {
    id: "glossary-scaffolding-failure",
    term: "Scaffolding failure",
    definition: "Missing or misleading structure that causes false understanding despite plausible wording."
  },
  {
    id: "glossary-premature-conclusion",
    term: "Premature conclusion",
    definition: "A conclusion appears before the learner has enough support to interpret it correctly."
  },
  {
    id: "glossary-prerequisite-scaffolding",
    term: "Prerequisite scaffolding",
    definition: "Explicit naming of what the learner must already know before new ideas are introduced."
  },
  {
    id: "glossary-terminology-grounding",
    term: "Terminology grounding",
    definition: "Terms are defined or anchored before they are used in abstract arguments."
  },
  {
    id: "glossary-compression-overload",
    term: "Compression overload",
    definition: "Too many distinct concepts packed into too few steps or paragraphs for the intended audience."
  },
  {
    id: "glossary-progressive-disclosure",
    term: "Progressive disclosure",
    definition: "Revealing detail in layers so each step stays within working-memory limits."
  },
  {
    id: "glossary-mental-model",
    term: "Mental model",
    definition: "The learner's internal picture of how a system works, which can be wrong even when facts are right."
  },
  {
    id: "glossary-epistemic-vs-cognitive",
    term: "Epistemic correctness vs cognitive safety",
    definition:
      "Content can be true on its face yet unsafe if sequencing and scaffolding invite the wrong interpretation."
  },
  {
    id: "glossary-misleading-hierarchy",
    term: "Misleading hierarchy",
    definition: "Visual or structural layout that suggests the wrong relationships between ideas."
  },
  {
    id: "glossary-polished-unsafe",
    term: "Polished but unsafe explanation",
    definition: "Language reads fluent and convincing while inviting an incorrect mental model."
  },
  {
    id: "glossary-unjustified-confidence",
    term: "Unjustified confidence signal",
    definition: "Wording implies certainty beyond what the surrounding content supports."
  },
  {
    id: "glossary-step-gap",
    term: "Step gap",
    definition: "A required intermediate reasoning or action step is missing between two presented steps."
  },
  {
    id: "glossary-contextless-abstraction",
    term: "Contextless abstraction",
    definition: "Abstract claims appear without concrete grounding examples the learner can map to."
  },
  {
    id: "glossary-sequence-break",
    term: "Sequence break",
    definition: "Pedagogical order is violated so the learner meets conclusions or terms out of turn."
  }
];

/** Map failure-class ids (§9) to glossary entry ids for inline links. */
export const FAILURE_CLASS_TO_GLOSSARY_ID: Partial<Record<FailureClassId, string>> = {
  premature_conclusion: "glossary-premature-conclusion",
  missing_prerequisite_scaffolding: "glossary-prerequisite-scaffolding",
  terminology_jump: "glossary-terminology-grounding",
  misleading_hierarchy: "glossary-misleading-hierarchy",
  compression_overload: "glossary-compression-overload",
  polished_but_unsafe_explanation: "glossary-polished-unsafe",
  unjustified_confidence_signal: "glossary-unjustified-confidence",
  step_gap: "glossary-step-gap",
  contextless_abstraction: "glossary-contextless-abstraction",
  sequence_break: "glossary-sequence-break"
};
