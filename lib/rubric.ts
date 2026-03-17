export type InvariantId =
  | "intent_preserved"
  | "assumptions_visible"
  | "sequencing_stable"
  | "language_accessible"
  | "neurodivergent_safe";

export type Grade = "PASS" | "WARN" | "FAIL";

export interface RubricCriterion {
  id: InvariantId;
  name: string;
  description: string;
}

export interface RubricDefinition {
  version: string;
  criteria: RubricCriterion[];
}

export const currentRubric: RubricDefinition = {
  version: "v1",
  criteria: [
    {
      id: "intent_preserved",
      name: "Intent Preserved",
      description: "The artifact states the objective early and does not drift into unrelated goals."
    },
    {
      id: "assumptions_visible",
      name: "Assumptions Visible",
      description: "Assumptions and prerequisites are explicitly named and scoped."
    },
    {
      id: "sequencing_stable",
      name: "Sequencing Stable",
      description: "Steps are ordered clearly, no dependent actions are collapsed, and transitions are explicit."
    },
    {
      id: "language_accessible",
      name: "Language Accessible",
      description: "The wording is concrete, avoids dense jargon, and is accessible to the intended audience."
    },
    {
      id: "neurodivergent_safe",
      name: "Neurodivergent Safe",
      description: "Content is chunked, predictable, and avoids overwhelming or ambiguous constructions."
    }
  ]
};

