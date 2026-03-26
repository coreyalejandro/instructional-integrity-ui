import Link from "next/link";
import { notFound } from "next/navigation";
import { AppShell } from "@/components/app-shell";
import { Breadcrumb } from "@/components/breadcrumb";
import { CognitiveSafetyGlossary } from "@/components/cognitive-safety-glossary";
import { EvidencePanel } from "@/components/evidence-panel";
import { FailureClassList } from "@/components/failure-class-list";
import { RemediationPanel } from "@/components/remediation-panel";
import { RubricBreakdown } from "@/components/rubric-breakdown";
import { VerdictBadge } from "@/components/verdict-badge";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { prismaVerdictToLabel } from "@/lib/verdict-map";
import { getEvaluationRunById } from "@/lib/runs";

export const dynamic = "force-dynamic";

function criterionVerdictLabel(v: string): "pass" | "warn" | "fail" {
  switch (v) {
    case "PASS":
      return "pass";
    case "WARN":
      return "warn";
    case "FAIL":
      return "fail";
    default:
      return "warn";
  }
}

export async function generateMetadata({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const run = await getEvaluationRunById(id);
  if (!run) return { title: "Run not found" };
  return {
    title: `${run.verdict} · ${run.artifact.title?.trim() || "Evaluation"} | Instructional Integrity Studio`
  };
}

export default async function RunDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const run = await getEvaluationRunById(id);

  if (!run) {
    notFound();
  }

  const verdict = prismaVerdictToLabel(run.verdict);

  return (
    <AppShell>
      <Breadcrumb
        items={[
          { href: "/", label: "Home" },
          { href: "/runs", label: "History" },
          { href: `/runs/${run.id}`, label: run.artifact.title?.trim() || "Run detail" }
        ]}
      />

      <div className="flex flex-col gap-2">
        <p className="text-xs text-zinc-500">
          Audience: Safety Evaluator — inspect evidence and exports for governance review (Article VI–VIII).
        </p>
        <Link href="/runs" className="w-fit text-sm text-zinc-400 transition hover:text-white">
          All runs
        </Link>
        <div className="flex flex-wrap items-center gap-3">
          <h1 className="text-2xl font-semibold tracking-tight md:text-3xl">
            {run.artifact.title?.trim() || "Evaluation run"}
          </h1>
          <VerdictBadge verdict={verdict} />
        </div>
        <p className="text-xs text-zinc-500">
          Rubric {run.rubricVersion} · {run.evaluatorId} v{run.evaluatorVersion} · {run.evaluationDurationMs}ms ·{" "}
          {run.createdAt.toLocaleString()}
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

        <div className="space-y-4">
          <Card>
            <CardHeader title="Verdict and score" subtitle="Labels include text — not color alone (§10.5)." />
            <CardContent className="space-y-3 text-sm text-zinc-300">
              <p>
                Overall score: <span className="font-semibold text-zinc-100">{run.overallScore.toFixed(1)}</span> ·
                Status: {run.status}
              </p>
              <FailureClassList classIds={run.failureClassSummary} />
            </CardContent>
          </Card>

          <Card>
            <CardHeader title="Rubric breakdown" subtitle="All ten dimensions (§11)" />
            <CardContent>
              <RubricBreakdown
                rows={run.criteria.map((c) => ({
                  dimensionId: c.dimensionId,
                  score: c.score,
                  maxScore: c.maxScore
                }))}
              />
            </CardContent>
          </Card>

          <CognitiveSafetyGlossary />
        </div>
      </div>

      <Card>
        <CardHeader title="Criterion-level evidence" subtitle="Each score is grounded in excerpts (§5.3)." />
        <CardContent>
          <ul className="space-y-6">
            {run.criteria.map((c) => (
              <li key={c.id} className="rounded-2xl border border-border bg-black/30 p-4">
                <div className="flex flex-wrap items-start justify-between gap-2">
                  <p className="font-mono text-sm text-zinc-200">{c.dimensionId}</p>
                  <span className="rounded-full border border-border px-2.5 py-0.5 text-xs font-semibold text-zinc-200">
                    {criterionVerdictLabel(c.verdict)} · {c.score}/{c.maxScore}
                  </span>
                </div>
                <div className="mt-3 space-y-3">
                  <EvidencePanel
                    items={c.evidence.map((e) => ({
                      excerptText: e.excerptText,
                      location: e.location,
                      relevance: e.relevance
                    }))}
                  />
                  <FailureClassList classIds={c.failureClasses.map((f) => f.classId)} />
                  <RemediationPanel text={c.remediation} />
                </div>
              </li>
            ))}
          </ul>
        </CardContent>
      </Card>

      <Card>
        <CardHeader title="Export" subtitle="JSON and Markdown downloads" />
        <CardContent className="flex flex-wrap gap-3">
          <a
            className="rounded-full border border-border px-4 py-2 text-sm font-semibold text-white"
            href={`/api/evaluations/${run.id}/export?format=json`}
          >
            Download JSON
          </a>
          <a
            className="rounded-full border border-border px-4 py-2 text-sm font-semibold text-white"
            href={`/api/evaluations/${run.id}/export?format=markdown`}
          >
            Download Markdown
          </a>
        </CardContent>
      </Card>
    </AppShell>
  );
}
