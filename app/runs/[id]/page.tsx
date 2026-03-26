import Link from "next/link";
import { notFound } from "next/navigation";
import { AppShell } from "@/components/app-shell";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { getEvaluationRunById } from "@/lib/runs";
import type { Grade } from "@/lib/rubric";

export const dynamic = "force-dynamic";

function gradeBadge(grade: Grade) {
  if (grade === "PASS") return "bg-emerald-500/15 text-emerald-300 border-emerald-500/30";
  if (grade === "WARN") return "bg-amber-500/15 text-amber-300 border-amber-500/30";
  return "bg-red-500/15 text-red-300 border-red-500/30";
}

export async function generateMetadata({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const run = await getEvaluationRunById(id);
  if (!run) return { title: "Run not found" };
  return {
    title: `${run.overallGrade} · ${run.artifact.title?.trim() || "Evaluation"} | Studio`
  };
}

export default async function RunDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const run = await getEvaluationRunById(id);

  if (!run) {
    notFound();
  }

  return (
    <AppShell>
      <div className="flex flex-col gap-2">
        <Link href="/runs" className="w-fit text-sm text-zinc-400 transition hover:text-white">
          All runs
        </Link>
        <div className="flex flex-wrap items-center gap-3">
          <h1 className="text-2xl font-semibold tracking-tight md:text-3xl">
            {run.artifact.title?.trim() || "Evaluation run"}
          </h1>
          <span className={`rounded-full border px-3 py-1 text-xs font-semibold ${gradeBadge(run.overallGrade as Grade)}`}>
            {run.overallGrade}
          </span>
        </div>
        <p className="text-xs text-zinc-500">
          Rubric {run.rubricVersion} · {run.createdAt.toLocaleString()}
        </p>
      </div>

      <div className="grid gap-6 lg:grid-cols-[1fr_1.1fr]">
        <Card>
          <CardHeader title="Artifact snapshot" subtitle="Text as submitted for this run" />
          <CardContent>
            <pre className="max-h-[480px] overflow-auto whitespace-pre-wrap rounded-2xl border border-border bg-zinc-950 p-4 text-xs leading-6 text-zinc-300">
              {run.artifact.rawText}
            </pre>
          </CardContent>
        </Card>

        <Card>
          <CardHeader title="Criterion evidence" subtitle="Invariant-aligned rationale and next actions" />
          <CardContent>
            <ul className="space-y-3">
              {run.criteria.map((c) => (
                <li key={c.id} className="rounded-2xl border border-border bg-black/30 p-4">
                  <div className="flex flex-wrap items-start justify-between gap-2">
                    <p className="font-medium text-zinc-100">{c.criterionName}</p>
                    <span className={`rounded-full border px-2.5 py-0.5 text-xs font-semibold ${gradeBadge(c.grade as Grade)}`}>
                      {c.grade}
                    </span>
                  </div>
                  <p className="mt-2 text-sm leading-6 text-zinc-300">{c.rationale}</p>
                  <p className="mt-2 text-xs text-zinc-500">
                    <span className="font-medium text-zinc-400">Next: </span>
                    {c.nextAction}
                  </p>
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>
      </div>
    </AppShell>
  );
}
