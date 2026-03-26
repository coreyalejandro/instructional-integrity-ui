import type { Rubric } from "./rubricTypes";

/** Contract §11 — minimum rubric dimensions. */
export const defaultRubric: Rubric = {
  version: "iis-rubric-1.0.0",
  dimensions: [
    {
      id: "seq_integrity",
      name: "Sequencing Integrity",
      definition: "Steps and claims appear in an order that supports valid inference.",
      scoringRule:
        "Deterministic: penalize conclusion markers before supporting premises; reward explicit ordered steps.",
      evidenceExpectation: "Quoted lines showing order of claims vs. premises.",
      failureMapping: ["premature_conclusion", "sequence_break", "step_gap"],
      remediationGuidance: "Reorder so each step builds only on prior steps; move conclusions after support.",
      maxScore: 10,
      weight: 1
    },
    {
      id: "prereq_visibility",
      name: "Prerequisite Visibility",
      definition: "Required prior knowledge is named before dependent concepts.",
      scoringRule: "Deterministic: reward explicit prerequisite sections; penalize sudden expert terms.",
      evidenceExpectation: "Excerpts where prerequisites are named or omitted.",
      failureMapping: ["missing_prerequisite_scaffolding", "contextless_abstraction"],
      remediationGuidance: "State what the learner must already know before new concepts.",
      maxScore: 10,
      weight: 1
    },
    {
      id: "term_grounding",
      name: "Terminology Grounding",
      definition: "Terms are introduced before abstract use.",
      scoringRule: "Deterministic: flag first-use of capitalized or technical tokens without definition.",
      evidenceExpectation: "First occurrence of terms vs. definitional context.",
      failureMapping: ["terminology_jump"],
      remediationGuidance: "Define or ground terms before using them in conclusions.",
      maxScore: 10,
      weight: 1
    },
    {
      id: "concept_dep_clarity",
      name: "Concept Dependency Clarity",
      definition: "Dependencies between ideas are explicit, not implied.",
      scoringRule: "Deterministic: penalize dense 'therefore' chains without bridging sentences.",
      evidenceExpectation: "Lines showing implied jumps between concepts.",
      failureMapping: ["step_gap", "contextless_abstraction"],
      remediationGuidance: "Add bridging sentences that name how concepts depend on each other.",
      maxScore: 10,
      weight: 1
    },
    {
      id: "progressive_disclosure",
      name: "Progressive Disclosure Quality",
      definition: "Information is revealed in digestible layers.",
      scoringRule: "Deterministic: reward sectioning; penalize single blocks with many distinct concepts.",
      evidenceExpectation: "Structure markers (headings, lists) vs. wall-of-text regions.",
      failureMapping: ["compression_overload"],
      remediationGuidance: "Split dense sections into ordered subsections with one main idea each.",
      maxScore: 10,
      weight: 1
    },
    {
      id: "misconception_risk",
      name: "Misconception Risk",
      definition: "Wording avoids inviting common false mental models.",
      scoringRule: "Deterministic: flag absolute certainty and false dichotomies.",
      evidenceExpectation: "Phrases implying certainty without support.",
      failureMapping: ["polished_but_unsafe_explanation", "unjustified_confidence_signal"],
      remediationGuidance: "Soften absolutes; add conditions and counterexamples where needed.",
      maxScore: 10,
      weight: 1
    },
    {
      id: "cog_load_pacing",
      name: "Cognitive Load Pacing",
      definition: "Concept load per segment stays within reasonable bounds.",
      scoringRule: "Deterministic: estimate concept density via sentence length and unique tokens per paragraph.",
      evidenceExpectation: "Paragraphs with high token density or many new terms.",
      failureMapping: ["compression_overload"],
      remediationGuidance: "Reduce concepts per paragraph; add checkpoints and examples.",
      maxScore: 10,
      weight: 1
    },
    {
      id: "scaffold_continuity",
      name: "Evidence of Scaffold Continuity",
      definition: "The learner is guided across transitions without dropped threads.",
      scoringRule: "Deterministic: penalize missing transitions between sections.",
      evidenceExpectation: "Boundary between sections showing continuity or gaps.",
      failureMapping: ["step_gap", "sequence_break"],
      remediationGuidance: "Add explicit transitions that restate where we are and what comes next.",
      maxScore: 10,
      weight: 1
    },
    {
      id: "conclusion_support",
      name: "Conclusion Support Integrity",
      definition: "Conclusions are supported by prior lines, not asserted first.",
      scoringRule: "Deterministic: if conclusion markers appear in first 15% of text, penalize heavily.",
      evidenceExpectation: "Position of conclusion language relative to premises.",
      failureMapping: ["premature_conclusion"],
      remediationGuidance: "Move conclusions after evidence; label evidence before summarizing.",
      maxScore: 10,
      weight: 1
    },
    {
      id: "confidence_alignment",
      name: "Confidence-to-Support Alignment",
      definition: "Confidence in language matches strength of support presented.",
      scoringRule: "Deterministic: flag strong certainty words without nearby qualifiers or evidence cues.",
      evidenceExpectation: "Certainty phrases and neighboring justification.",
      failureMapping: ["unjustified_confidence_signal"],
      remediationGuidance: "Match certainty language to available evidence; add caveats where support is thin.",
      maxScore: 10,
      weight: 1
    }
  ]
};

export function getRubricVersion(): string {
  return defaultRubric.version;
}
