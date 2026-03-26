/** Cognitive-safety failure classes (contract §9). */
export const FAILURE_CLASS_IDS = [
  "premature_conclusion",
  "missing_prerequisite_scaffolding",
  "terminology_jump",
  "misleading_hierarchy",
  "compression_overload",
  "polished_but_unsafe_explanation",
  "unjustified_confidence_signal",
  "step_gap",
  "contextless_abstraction",
  "sequence_break"
] as const;

export type FailureClassId = (typeof FAILURE_CLASS_IDS)[number];

export function isFailureClassId(value: string): value is FailureClassId {
  return (FAILURE_CLASS_IDS as readonly string[]).includes(value);
}
