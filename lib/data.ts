export const packageCards = [
  {
    id: "spec",
    title: "Instructional Integrity Spec",
    status: "Foundational",
    description: "Defines the non-negotiable invariants that every instructional artifact and AI workflow must preserve."
  },
  {
    id: "templates",
    title: "Templates Library",
    status: "Operational",
    description: "Provides reusable prompt and instruction patterns that already encode the framework."
  },
  {
    id: "evaluator",
    title: "Evaluator",
    status: "Quality Gate",
    description: "Scores artifacts against intent preservation, assumptions visibility, sequencing, language accessibility, and neurodivergent safety."
  },
  {
    id: "playbook",
    title: "Playbook",
    status: "Adoption",
    description: "Shows teams exactly how to apply the framework through checklists, scenarios, and revision patterns."
  },
  {
    id: "ai-module",
    title: "AI Module",
    status: "Training",
    description: "Wraps the framework into alignment-oriented training units and evaluation hooks."
  }
];

export const journeySteps = [
  {
    step: "1",
    title: "Understand the system",
    text: "The user lands on a single-source-of-truth homepage that explains what the framework is, why it matters, and what outcomes the platform supports."
  },
  {
    step: "2",
    title: "Choose a path",
    text: "The user selects one of three primary intents: learn the framework, evaluate an artifact, or operationalize it with templates and playbooks."
  },
  {
    step: "3",
    title: "Perform a focused task",
    text: "The interface narrows immediately to one concrete workflow so the user does not have to reason through multiple branches at once."
  },
  {
    step: "4",
    title: "Review evidence",
    text: "Every result shows the relevant criterion, the status, the reason, and the next corrective action."
  },
  {
    step: "5",
    title: "Move into production",
    text: "The user can proceed into templates, team playbooks, or AI training modules without losing context."
  }
];

export const evaluatorResults = [
  {
    criterion: "Intent Preserved",
    grade: "PASS",
    rationale: "The artifact states the objective early and does not drift into unrelated goals."
  },
  {
    criterion: "Assumptions Visible",
    grade: "WARN",
    rationale: "The artifact assumes prior knowledge of the deployment environment but does not name it."
  },
  {
    criterion: "Sequencing Stable",
    grade: "PASS",
    rationale: "The steps are ordered clearly and no dependent actions are collapsed."
  },
  {
    criterion: "Language Accessible",
    grade: "PASS",
    rationale: "The wording is concrete and avoids dense jargon."
  },
  {
    criterion: "Neurodivergent Safe",
    grade: "WARN",
    rationale: "One section contains a paragraph that should be split into smaller task units."
  }
];

export const workflowCards = [
  {
    title: "Learn",
    subtitle: "Framework onboarding",
    points: [
      "Read the five invariants in plain language",
      "See before/after examples",
      "Understand how the packages connect"
    ]
  },
  {
    title: "Evaluate",
    subtitle: "Artifact review",
    points: [
      "Paste or upload an instructional artifact",
      "Run the evaluator",
      "See grade, rationale, and revision actions"
    ]
  },
  {
    title: "Operationalize",
    subtitle: "Team implementation",
    points: [
      "Select a reusable template",
      "Apply the playbook checklist",
      "Export the process into training workflows"
    ]
  }
];
