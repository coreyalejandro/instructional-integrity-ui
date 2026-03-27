"use client";

import Link from "next/link";
import { useEffect, useRef, useState, useTransition } from "react";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { CognitiveSafetyGlossary } from "@/components/cognitive-safety-glossary";
import { ErrorDisplay } from "@/components/error-display";
import { EvidencePanel } from "@/components/evidence-panel";
import { FailureClassList } from "@/components/failure-class-list";
import { SampleArtifactSelector, type SampleOption } from "@/components/sample-artifact-selector";
import { UploadDropzone } from "@/components/upload-dropzone";
import { VerdictBadge } from "@/components/verdict-badge";
import type { VerdictLabel } from "@/lib/domain/verdictTypes";

export interface ApiEvaluationResponse {
  id: string;
  status: "complete" | "incomplete";
  verdict: VerdictLabel;
  overallScore: number;
  criterionResults: Array<{
    dimensionId: string;
    score: number;
    maxScore: number;
    verdict: "pass" | "warn" | "fail";
    evidence: Array<{ excerptText: string; location: string; relevance: string }>;
    failureClasses: string[];
    remediation: string;
  }>;
  failureClassSummary: string[];
  createdAt: string;
  artifactTitle: string;
}

const DEMO_ARTIFACT = `Purpose: Try a quick evaluation without writing content.

Assumptions:
- Reader can follow numbered steps.

Steps:
1. Open the evaluation workspace.
2. Paste text or choose a sample.
3. Run evaluation and open the saved run for evidence.

This walkthrough uses clear sequencing and named assumptions.`;

async function postEvaluation(body: unknown): Promise<ApiEvaluationResponse> {
  const response = await fetch("/api/evaluations", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body)
  });
  const data = (await response.json().catch(() => ({}))) as {
    error?: { message?: string; recoveryGuidance?: string; code?: string };
  };
  if (!response.ok) {
    const e = data?.error;
    if (e?.message && e?.recoveryGuidance) {
      const err = new Error(e.message) as Error & {
        recoveryGuidance: string;
        code?: string;
      };
      err.recoveryGuidance = e.recoveryGuidance;
      err.code = e.code;
      throw err;
    }
    throw new Error("Evaluation request failed.");
  }
  return data as ApiEvaluationResponse;
}

export function EvaluatorPanel() {
  const [artifact, setArtifact] = useState(DEMO_ARTIFACT);
  const [artifactTitle, setArtifactTitle] = useState("Getting started — workspace tour");
  const [samples, setSamples] = useState<SampleOption[]>([]);
  const [sampleSlug, setSampleSlug] = useState("");
  const [result, setResult] = useState<ApiEvaluationResponse | null>(null);
  const [error, setError] = useState<{ message: string; recovery?: string } | null>(null);
  const [isPending, startTransition] = useTransition();
  const resultsRegionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    fetch("/api/samples")
      .then((r) => r.json())
      .then((rows: SampleOption[]) => {
        setSamples(rows);
        if (rows[0]) setSampleSlug(rows[0].slug);
      })
      .catch(() => {
        /* samples optional for first paint */
      });
  }, []);

  const runEvaluation = (payload: unknown) => {
    setError(null);
    startTransition(() => {
      postEvaluation(payload)
        .then((data) => {
          setResult(data);
        })
        .catch((err: unknown) => {
          if (err instanceof Error && "recoveryGuidance" in err) {
            const r = err as Error & { recoveryGuidance: string };
            setError({ message: err.message, recovery: r.recoveryGuidance });
            return;
          }
          setError({
            message: err instanceof Error ? err.message : "Failed to run evaluation.",
            recovery: "Try again or pick a smaller artifact."
          });
        });
    });
  };

  useEffect(() => {
    if (result && resultsRegionRef.current) {
      resultsRegionRef.current.focus();
    }
  }, [result]);

  const handleRunPaste = () => {
    const trimmed = artifact.trim();
    if (!trimmed) {
      setError({
        message: "Artifact text is empty.",
        recovery: "Paste instructional content, upload a .txt/.md file, or run a sample from the library."
      });
      return;
    }
    runEvaluation({
      artifact: {
        source: "paste",
        title: artifactTitle.trim().slice(0, 200) || "Pasted artifact",
        content: trimmed
      }
    });
  };

  const handleRunSample = () => {
    if (!sampleSlug) {
      setError({
        message: "No sample selected.",
        recovery: "Choose a sample from the dropdown, then run again."
      });
      return;
    }
    runEvaluation({
      artifact: {
        source: "sample",
        title: samples.find((s) => s.slug === sampleSlug)?.title ?? "Sample",
        sampleId: sampleSlug
      }
    });
  };

  const handleUpload = async (file: File) => {
    setError(null);
    const fd = new FormData();
    fd.append("file", file);
    try {
      const res = await fetch("/api/uploads", { method: "POST", body: fd });
      const data = await res.json().catch(() => ({}));
      if (!res.ok) {
        const e = data?.error as { message?: string; recoveryGuidance?: string } | undefined;
        if (e?.message && e?.recoveryGuidance) {
          const err = new Error(e.message) as Error & { recoveryGuidance: string };
          err.recoveryGuidance = e.recoveryGuidance;
          throw err;
        }
        throw new Error("Upload failed.");
      }
      runEvaluation({
        artifact: {
          source: "upload",
          title: (data.title as string) || file.name,
          uploadId: data.uploadId as string
        }
      });
    } catch (e) {
      if (e instanceof Error && "recoveryGuidance" in e) {
        const r = e as Error & { recoveryGuidance: string };
        setError({ message: e.message, recovery: r.recoveryGuidance });
      } else {
        setError({
          message: e instanceof Error ? e.message : "Upload failed.",
          recovery: "Use a UTF-8 .txt or .md file under the size limit."
        });
      }
    }
  };

  return (
    <section className="grid gap-4 lg:grid-cols-[0.95fr_1.05fr]" aria-label="Evaluator workspace">
      <div className="space-y-4">
        <Card>
          <CardHeader
            title="Evaluate an artifact"
            subtitle="Audience: Safety Evaluator — paste text, upload a file, or run a seeded sample (Article VI)."
          />
          <CardContent>
            <div className="space-y-4">
              <div>
                <label htmlFor="artifact-title" className="text-sm font-medium text-zinc-200">
                  Title (optional)
                </label>
                <input
                  id="artifact-title"
                  className="mt-1 w-full rounded-xl border border-border bg-zinc-950 px-3 py-2 text-sm text-zinc-100"
                  value={artifactTitle}
                  onChange={(e) => setArtifactTitle(e.target.value)}
                  maxLength={200}
                />
              </div>
              <div>
                <label htmlFor="artifact-body" className="text-sm font-medium text-zinc-200">
                  Instructional artifact
                </label>
                <textarea
                  id="artifact-body"
                  className="mt-1 min-h-[220px] w-full rounded-xl border border-border bg-zinc-950 px-3 py-2 font-mono text-sm text-zinc-100"
                  value={artifact}
                  onChange={(e) => setArtifact(e.target.value)}
                />
              </div>
              <div className="flex flex-wrap gap-2">
                <button
                  type="button"
                  className="rounded-full bg-white px-4 py-2 text-sm font-semibold text-zinc-950 disabled:opacity-50"
                  disabled={isPending}
                  onClick={handleRunPaste}
                >
                  Run evaluation (paste)
                </button>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader title="Sample library" subtitle="Preloaded artifacts for immediate runs (§8.2)." />
          <CardContent className="space-y-4">
            <SampleArtifactSelector
              samples={samples}
              value={sampleSlug}
              onChange={setSampleSlug}
              disabled={isPending}
            />
            <button
              type="button"
              className="rounded-full border border-border px-4 py-2 text-sm font-semibold text-zinc-100 disabled:opacity-50"
              disabled={isPending || !sampleSlug}
              onClick={handleRunSample}
            >
              Run evaluation (sample)
            </button>
          </CardContent>
        </Card>

        <Card>
          <CardHeader title="Upload" subtitle="UTF-8 .txt / .md only; validated server-side." />
          <CardContent>
            <UploadDropzone onFile={handleUpload} disabled={isPending} />
          </CardContent>
        </Card>

        <CognitiveSafetyGlossary />
      </div>

      <div className="space-y-4">
        {error ? (
          <ErrorDisplay
            message={error.message}
            recovery={error.recovery ?? "Fix the issue above, then retry the evaluation."}
          />
        ) : null}

        <Card>
          <CardHeader title="Latest result" subtitle="Inspectable structure — no black-box summary (§19)." />
          <CardContent>
            {result ? (
              <div
                ref={resultsRegionRef}
                tabIndex={-1}
                className="space-y-4 outline-none ring-offset-2 focus-visible:ring-2 focus-visible:ring-zinc-500"
                aria-live="polite"
                aria-atomic="true"
              >
                <div className="flex flex-wrap items-center gap-3">
                  <VerdictBadge verdict={result.verdict} />
                  <span className="text-sm text-zinc-400">
                    Score {result.overallScore.toFixed(1)} · {result.status}
                  </span>
                </div>
                <p className="text-sm text-zinc-300">
                  <span className="font-medium text-zinc-100">{result.artifactTitle}</span> — criterion-level evidence
                  appears on the run detail page.
                </p>
                <Link
                  href={`/runs/${result.id}`}
                  className="inline-flex rounded-full border border-border px-4 py-2 text-sm font-semibold text-white"
                >
                  Open run detail
                </Link>
                <div className="space-y-2">
                  <p className="text-xs font-semibold uppercase tracking-wide text-zinc-500">Failure classes (summary)</p>
                  <FailureClassList classIds={result.failureClassSummary} />
                </div>
                <div className="space-y-2">
                  <p className="text-xs font-semibold uppercase tracking-wide text-zinc-500">First criterion preview</p>
                  {result.criterionResults[0] ? (
                    <div className="rounded-xl border border-border bg-black/30 p-3 text-sm">
                      <p className="font-mono text-xs text-zinc-400">{result.criterionResults[0].dimensionId}</p>
                      <EvidencePanel items={result.criterionResults[0].evidence} />
                    </div>
                  ) : null}
                </div>
              </div>
            ) : (
              <p className="text-sm text-zinc-400">
                Run an evaluation to see verdict, failure classes, and a preview of evidence-backed criteria.
              </p>
            )}
          </CardContent>
        </Card>
      </div>
    </section>
  );
}
