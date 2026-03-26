import Link from "next/link";
import { AppShell } from "@/components/app-shell";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { VerdictBadge } from "@/components/verdict-badge";
import { prismaVerdictToLabel } from "@/lib/verdict-map";
import { listEvaluationRuns } from "@/lib/runs";

export const dynamic = "force-dynamic";

export const metadata = {
  title: "History | Instructional Integrity Studio",
  description: "Saved evaluation runs and artifact previews."
};

export default async function RunsPage() {
  const rows = await listEvaluationRuns(100);

  return (
    <AppShell>
      <div className="flex flex-col gap-2">
        <p className="text-xs text-zinc-500">
          Audience: Safety Evaluator — review persisted runs for this browser session (Article VI).
        </p>
        <Link href="/evaluate" className="w-fit text-sm text-zinc-400 transition hover:text-white">
          New evaluation
        </Link>
        <h1 className="text-3xl font-semibold tracking-tight md:text-4xl">Evaluation history</h1>
        <p className="max-w-2xl text-sm text-zinc-400 md:text-base">
          Each run stores the artifact snapshot, rubric version, criterion evidence, and failure classes.
        </p>
      </div>

      <Card>
        <CardHeader title="Recent runs" subtitle={`${rows.length} saved in this session`} />
        <CardContent>
          {rows.length === 0 ? (
            <p className="text-sm text-zinc-400">
              No runs yet.{" "}
              <Link href="/evaluate" className="text-white underline-offset-4 hover:underline">
                Evaluate an artifact
              </Link>{" "}
              or load a sample to create your first record.
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
                      <FailureClassChips classes={row.failureClassSummary} />
                    </div>
                    <div className="flex shrink-0 flex-wrap items-center gap-3 md:flex-col md:items-end">
                      <VerdictBadge verdict={prismaVerdictToLabel(row.verdict)} />
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

function FailureClassChips({ classes }: { classes: string[] }) {
  if (classes.length === 0) return null;
  return (
    <ul className="mt-2 flex flex-wrap gap-1" aria-label="Failure classes">
      {classes.slice(0, 4).map((c) => (
        <li key={c} className="rounded-full bg-zinc-900 px-2 py-0.5 font-mono text-[10px] text-zinc-400">
          {c}
        </li>
      ))}
    </ul>
  );
}
