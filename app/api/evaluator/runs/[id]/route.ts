import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import type { EvaluationRunResult } from "@/lib/evaluator";
import type { CriterionResultRecord, EvaluationRun } from "@/lib/domain";
import type { Grade } from "@/lib/rubric";

export async function GET(
  _request: NextRequest,
  context: { params: Promise<{ id: string }> }
) {
  const { id } = await context.params;

  try {
    const [runRecord, criteriaRecords] = await Promise.all([
      prisma.evaluationRun.findUnique({
        where: { id }
      }),
      prisma.criterionResult.findMany({
        where: { evaluationRunId: id }
      })
    ]);

    if (!runRecord) {
      return NextResponse.json({ error: "Evaluation run not found" }, { status: 404 });
    }

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

    const criteria: CriterionResultRecord[] = criteriaRecords.map((item) => ({
      id: item.id,
      evaluationRunId: item.evaluationRunId,
      invariantId: item.invariantId as CriterionResultRecord["invariantId"],
      criterionName: item.criterionName,
      grade: item.grade as Grade,
      rationale: item.rationale,
      nextAction: item.nextAction
    }));

    const result: EvaluationRunResult = {
      run,
      criteria: criteria.map((item) => ({
        id: item.invariantId,
        criterion: item.criterionName,
        grade: item.grade,
        rationale: item.rationale,
        nextAction: item.nextAction
      }))
    };

    return NextResponse.json(result, { status: 200 });
  } catch (error) {
    console.error(
      JSON.stringify({
        event: "evaluation_run_fetch_error",
        error: error instanceof Error ? error.message : "Unknown error"
      })
    );

    return NextResponse.json({ error: "Failed to fetch evaluation run" }, { status: 500 });
  }
}

