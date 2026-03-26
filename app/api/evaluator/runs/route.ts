import { NextResponse } from "next/server";
import { listEvaluationRuns } from "@/lib/runs";

export async function GET() {
  try {
    const rows = await listEvaluationRuns(100);

    const runs = rows.map((row) => ({
      id: row.id,
      createdAt: row.createdAt.toISOString(),
      completedAt: row.completedAt ? row.completedAt.toISOString() : null,
      overallGrade: row.overallGrade,
      rubricVersion: row.rubricVersion,
      status: row.status,
      artifact: {
        id: row.artifact.id,
        title: row.artifact.title,
        preview: row.artifact.rawText.slice(0, 160).replace(/\s+/g, " ").trim()
      }
    }));

    return NextResponse.json({ runs }, { status: 200 });
  } catch (error) {
    console.error(
      JSON.stringify({
        event: "evaluation_runs_list_error",
        error: error instanceof Error ? error.message : "Unknown error"
      })
    );

    return NextResponse.json({ error: "Failed to list evaluation runs" }, { status: 500 });
  }
}
