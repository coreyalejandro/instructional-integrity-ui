import Link from "next/link";
import { AppShell } from "@/components/app-shell";
import { EvaluatorPanel } from "@/components/evaluator-panel";

export const metadata = {
  title: "Evaluate | Instructional Integrity Studio",
  description: "Run rubric-grounded instructional integrity checks with saved evidence."
};

export default function EvaluatePage() {
  return (
    <AppShell>
      <div className="flex flex-col gap-2">
        <Link href="/runs" className="w-fit text-sm text-zinc-400 transition hover:text-white">
          View evaluation history
        </Link>
        <h1 className="text-3xl font-semibold tracking-tight md:text-4xl">Artifact evaluation</h1>
        <p className="max-w-2xl text-sm leading-6 text-zinc-400 md:text-base md:leading-7">
          Audience: Safety Evaluator — submit text or markdown, upload UTF-8 files, or run seeded samples. Each run
          persists criterion evidence, cognitive-safety failure classes, and remediation (Article VI).
        </p>
      </div>
      <EvaluatorPanel />
    </AppShell>
  );
}
