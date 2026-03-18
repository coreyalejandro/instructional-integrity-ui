"use client";

import { useState, useTransition } from "react";
import type { EvaluationRunResult, CriterionResult } from "@/lib/evaluator";
import { Card, CardContent, CardHeader } from "@/components/ui/card";

function gradeClass(grade: string) {
  if (grade === "PASS") return "bg-emerald-500/15 text-emerald-300 border-emerald-500/30";
  if (grade === "WARN") return "bg-amber-500/15 text-amber-300 border-amber-500/30";
  return "bg-red-500/15 text-red-300 border-red-500/30";
}

const initialArtifact = `Purpose: Review this onboarding guide for instructional integrity.

Assumptions:
- Reader has access to the product dashboard.

Steps:
1. Open Settings.
2. Configure role access.
3. Save changes.

One section is too dense and needs revision.`;

async function runEvaluatorRequest(artifactText: string): Promise<EvaluationRunResult> {
  const response = await fetch("/api/evaluator/run", {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({ artifactText })
  });

  if (!response.ok) {
    const data = await response.json().catch(() => ({}));
    const message = typeof data.error === "string" ? data.error : "Unexpected error while running evaluator.";
    throw new Error(message);
  }

  return (await response.json()) as EvaluationRunResult;
}

export function EvaluatorPanel() {
  const [artifact, setArtifact] = useState(initialArtifact);
  const [result, setResult] = useState<EvaluationRunResult | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [isPending, startTransition] = useTransition();

  const criteria: CriterionResult[] =
    result?.criteria ??
    ([
      {
        id: "intent_preserved",
        criterion: "Intent Preserved",
        grade: "PASS",
        rationale: "The artifact states the objective early and does not drift into unrelated goals.",
        nextAction: "Keep the objective statement, but consider adding a concrete outcome at the top."
      },
      {
        id: "assumptions_visible",
        criterion: "Assumptions Visible",
        grade: "WARN",
        rationale: "The artifact assumes prior knowledge of the deployment environment but does not name it.",
        nextAction: "Add a short section that names what the learner is expected to already know or have done."
      },
      {
        id: "sequencing_stable",
        criterion: "Sequencing Stable",
        grade: "PASS",
        rationale: "The steps are ordered clearly and no dependent actions are collapsed.",
        nextAction: "Review the steps and ensure each action depends only on information already established."
      },
      {
        id: "language_accessible",
        criterion: "Language Accessible",
        grade: "PASS",
        rationale: "The wording is concrete and avoids dense jargon.",
        nextAction: "Swap any dense phrases for concrete verbs and examples that match your audience."
      },
      {
        id: "neurodivergent_safe",
        criterion: "Neurodivergent Safe",
        grade: "WARN",
        rationale: "One section contains a paragraph that should be split into smaller task units.",
        nextAction: "Split long paragraphs into smaller task units with clear headings or bullet points."
      }
    ] satisfies CriterionResult[]);

  const handleRunEvaluator = () => {
    const trimmed = artifact.trim();
    if (!trimmed) {
      setError("Add or paste an instructional artifact first.");
      return;
    }

    setError(null);
    startTransition(() => {
      runEvaluatorRequest(trimmed)
        .then((data) => {
          setResult(data);
        })
        .catch((err: unknown) => {
          const message = err instanceof Error ? err.message : "Failed to run evaluator.";
          setError(message);
        });
    });
  };

  return (
    <section className="grid gap-4 lg:grid-cols-[0.9fr_1.1fr]">
      <Card>
        <CardHeader
          title="Focused task surface"
          subtitle="The default screen should help the user complete one meaningful action immediately."
        />
        <CardContent>
          <div className="space-y-4">
            <textarea
              value={artifact}
              onChange={(event) => setArtifact(event.target.value)}
              className="h-72 w-full rounded-3xl border border-border bg-zinc-950 p-4 text-sm leading-6 text-zinc-200 outline-none"
            />
            <div className="grid gap-3 sm:grid-cols-2">
              <button
                type="button"
                onClick={handleRunEvaluator}
                className="rounded-2xl bg-white px-4 py-3 text-sm font-medium text-black disabled:cursor-not-allowed disabled:opacity-60"
                disabled={isPending}
              >
                {isPending ? "Running evaluator…" : "Run evaluator"}
              </button>
              <button className="rounded-2xl border border-border bg-zinc-950 px-4 py-3 text-sm font-medium text-white">
                Open revision template
              </button>
              {error ? <p className="col-span-2 text-xs text-red-400">{error}</p> : null}
            </div>
          </div>
        </CardContent>
      </Card>
      <Card>
        <CardHeader
          title="Evidence-first feedback"
          subtitle="Results should name the criterion, show the status, and explain the exact next move."
        />
        <CardContent>
          <div className="space-y-3">
            {criteria.map((item) => (
              <div key={item.id} className="rounded-3xl border border-border bg-black/30 p-4">
                <div className="flex flex-wrap items-center justify-between gap-3">
                  <div>
                    <p className="font-medium">{item.criterion}</p>
                    <p className="mt-1 text-xs text-zinc-400">{item.nextAction}</p>
                  </div>
                  <span className={`rounded-full border px-3 py-1 text-xs font-semibold ${gradeClass(item.grade)}`}>
                    {item.grade}
                  </span>
                </div>
                <p className="mt-3 text-sm leading-6 text-zinc-300">{item.rationale}</p>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </section>
  );
}
