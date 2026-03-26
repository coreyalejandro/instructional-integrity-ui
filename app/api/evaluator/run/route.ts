import { NextRequest, NextResponse } from "next/server";
import { runEvaluationPersisted } from "@/lib/evaluator";

export async function POST(request: NextRequest) {
  const startedAt = Date.now();

  try {
    const body = await request.json();

    const artifactText = typeof body.artifactText === "string" ? body.artifactText.trim() : "";

    if (!artifactText) {
      return NextResponse.json({ error: "artifactText is required" }, { status: 400 });
    }

    const artifactTitle =
      typeof body.artifactTitle === "string" && body.artifactTitle.trim() ? body.artifactTitle.trim() : undefined;

    const result = await runEvaluationPersisted({
      artifactText,
      rubricVersion: typeof body.rubricVersion === "string" ? body.rubricVersion : undefined,
      artifactTitle,
      sourceType: "paste"
    });

    const durationMs = Date.now() - startedAt;

    console.log(
      JSON.stringify({
        event: "evaluation_run_completed",
        durationMs,
        rubricVersion: result.run.rubricVersion,
        overallGrade: result.run.overallGrade,
        criteriaCount: result.criteria.length
      })
    );

    return NextResponse.json(result, { status: 200 });
  } catch (error) {
    const durationMs = Date.now() - startedAt;

    console.error(
      JSON.stringify({
        event: "evaluation_run_error",
        durationMs,
        error: error instanceof Error ? error.message : "Unknown error"
      })
    );

    return NextResponse.json({ error: "Failed to run evaluator" }, { status: 500 });
  }
}

