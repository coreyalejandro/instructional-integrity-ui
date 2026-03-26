import { currentRubric, Grade, InvariantId } from "./rubric";
import { prisma } from "./db";
import type { EvaluationRun } from "./domain";
import { ensureDemoUser } from "./demo-user";

export interface EvaluationRunInput {
  artifactText: string;
  rubricVersion?: string;
}

export interface CriterionResult {
  id: InvariantId;
  criterion: string;
  grade: Grade;
  rationale: string;
  nextAction: string;
}

export interface EvaluationRunResult {
  run: EvaluationRun;
  criteria: CriterionResult[];
}

export interface EvaluationComputationResult {
  rubricVersion: string;
  overallGrade: Grade;
  criteria: CriterionResult[];
}

function mockGradeForCriterion(id: InvariantId): Grade {
  if (id === "intent_preserved" || id === "sequencing_stable" || id === "language_accessible") {
    return "PASS";
  }
  if (id === "assumptions_visible" || id === "neurodivergent_safe") {
    return "WARN";
  }
  return "FAIL";
}

function mockNextAction(id: InvariantId): string {
  switch (id) {
    case "intent_preserved":
      return "Keep the objective statement, but consider adding a concrete outcome at the top.";
    case "assumptions_visible":
      return "Add a short section that names what the learner is expected to already know or have done.";
    case "sequencing_stable":
      return "Review the steps and ensure each action depends only on information already established.";
    case "language_accessible":
      return "Swap any dense phrases for concrete verbs and examples that match your audience.";
    case "neurodivergent_safe":
      return "Split long paragraphs into smaller task units with clear headings or bullet points.";
    default:
      return "Revise this section to better align with the framework.";
  }
}

export async function runEvaluation(input: EvaluationRunInput): Promise<EvaluationComputationResult> {
  const rubricVersion = input.rubricVersion ?? currentRubric.version;

  const criteriaResults: CriterionResult[] = currentRubric.criteria.map((criterion) => {
    const grade = mockGradeForCriterion(criterion.id);

    return {
      id: criterion.id,
      criterion: criterion.name,
      grade,
      rationale: criterion.description,
      nextAction: mockNextAction(criterion.id)
    };
  });

  const worstGradePriority: Record<Grade, number> = {
    FAIL: 3,
    WARN: 2,
    PASS: 1
  };

  const overallGrade = criteriaResults.reduce<Grade>((current, result) => {
    return worstGradePriority[result.grade] > worstGradePriority[current] ? result.grade : current;
  }, "PASS");

  return {
    rubricVersion,
    overallGrade,
    criteria: criteriaResults
  };
}

interface RunEvaluationPersistedInput extends EvaluationRunInput {
  sourceType: "paste" | "upload";
  /** Optional display title for history lists */
  artifactTitle?: string;
  mimeType?: string | null;
}

export async function runEvaluationPersisted(input: RunEvaluationPersistedInput): Promise<EvaluationRunResult> {
  const { id: ownerId } = await ensureDemoUser();
  const evaluation = await runEvaluation({
    artifactText: input.artifactText,
    rubricVersion: input.rubricVersion
  });

  const artifact = await prisma.artifact.create({
    data: {
      ownerId,
      title: input.artifactTitle,
      rawText: input.artifactText,
      sourceType: input.sourceType === "paste" ? "PASTE" : "UPLOAD",
      mimeType: input.mimeType ?? undefined
    }
  });

  const runRecord = await prisma.evaluationRun.create({
    data: {
      artifactId: artifact.id,
      userId: ownerId,
      rubricVersion: evaluation.rubricVersion,
      status: "COMPLETED",
      overallGrade: evaluation.overallGrade,
      completedAt: new Date()
    }
  });

  await prisma.$transaction(
    evaluation.criteria.map((criterion) =>
      prisma.criterionResult.create({
        data: {
          evaluationRunId: runRecord.id,
          invariantId: criterion.id,
          criterionName: criterion.criterion,
          grade: criterion.grade,
          rationale: criterion.rationale,
          nextAction: criterion.nextAction
        }
      })
    )
  );

  const run: EvaluationRun = {
    id: runRecord.id,
    artifactId: runRecord.artifactId,
    userId: runRecord.userId,
    rubricVersion: runRecord.rubricVersion,
    status: runRecord.status.toLowerCase() as EvaluationRun["status"],
    createdAt: runRecord.createdAt.toISOString(),
    completedAt: runRecord.completedAt ? runRecord.completedAt.toISOString() : null,
    overallGrade: runRecord.overallGrade as Grade
  };

  return {
    run,
    criteria: evaluation.criteria
  };
}

