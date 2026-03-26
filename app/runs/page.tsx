import Link from "next/link";
import { AppShell } from "@/components/app-shell";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { listEvaluationRuns } from "@/lib/runs";

export const dynamic = "force-dynamic";

function gradeBadge(grade: string) {
  if (grade === "PASS") return "bg-emerald-500/15 text-emerald-300 border-emerald-500/30";
  if (grade === "WARN") return "bg-amber-500/15 text-amber-300 border-amber-500/30";
  return "bg-red-500/15 text-red-300 border-red-500/30";
}

export const metadata = {
  title: "History | Instructional Integrity Studio",
  description: "Saved evaluation runs and artifact previews."
};

export default async function RunsPage() {
  const rows = await listEvaluationRuns(100);

  return (
    <AppShell>
      <div className="flex flex-col gap-2">
        <Link href="/evaluate" className="w-fit text-sm text-zinc-400 transition hover:text-white">
          New evaluation
        </Link>
        <h1 className="text-3xl font-semibold tracking-tight md:text-4xl">Evaluation history</h1>
        <p className="max-w-2xl text-sm text-zinc-400 md:text-base">
          Every completed run stores the artifact snapshot, rubric version, and criterion results.
        </p>
      </div>

      <Card>
        <CardHeader title="Recent runs" subtitle={`${rows.length} saved in this workspace`} />
        <CardContent>
          {rows.length === 0 ? (
            <p className="text-sm text-zinc-400">
              No runs yet.{" "}
              <Link href="/evaluate" className="text-white underline-offset-4 hover:underline">
                Evaluate an artifact
              </Link>{" "}
              to create your first record.
            </p>
          ) : (
            <ul className="divide-y divide-border rounded-2xl border border-border bg-black/20">
              {rows.map((row) => (
                <li key={row.id}>
                  <Link
                    href={`/runs/${row.id}`}
                    className="flex flex-col gap-2 px-4 py-4 transition hover:bg-zinc-900/50 md:flex-row md:items-center md:justify-between"
                  >
                    <div className="min-w-0 flex-1">
                      <p className="truncate font-medium text-zinc-100">
                        {row.artifact.title?.trim() || "Untitled artifact"}
                      </p>
                      <p className="mt-1 line-clamp-2 text-xs text-zinc-500">{row.artifact.rawText}</p>
                    </div>
                    <div className="flex shrink-0 flex-wrap items-center gap-3 md:flex-col md:items-end">
                      <span
                        className={`rounded-full border px-3 py-1 text-xs font-semibold ${gradeBadge(row.overallGrade)}`}
                      >
                        {row.overallGrade}
                      </span>
                      <time className="text-xs text-zinc-500" dateTime={row.createdAt.toISOString()}>
                        {row.createdAt.toLocaleString()}
                      </time>
                    </div>
                  </Link>
                </li>
              ))}
            </ul>
          )}
        </CardContent>
      </Card>
    </AppShell>
  );
}
