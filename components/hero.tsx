import { ArrowRight, Shield, Workflow } from "lucide-react";

export function Hero() {
  return (
    <section className="grid gap-6 lg:grid-cols-[1.2fr_0.8fr]">
      <div className="rounded-[32px] border border-border bg-gradient-to-br from-zinc-900 to-black p-8 shadow-glow">
        <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-border bg-zinc-950 px-3 py-1 text-xs text-zinc-300">
          <Shield className="h-3.5 w-3.5" />
          Five-invariant operating layer
        </div>
        <h1 className="max-w-4xl text-4xl font-semibold leading-tight md:text-6xl">
          Build trustable instruction systems for people and AI without losing the original intent.
        </h1>
        <p className="mt-5 max-w-3xl text-base leading-7 text-zinc-300 md:text-lg">
          This UI is designed around the ideal journey: understand the framework, run a focused evaluation,
          then move directly into templates, playbooks, and AI training workflows with no context loss.
        </p>
        <div className="mt-8 flex flex-wrap gap-3">
          <button className="rounded-2xl bg-white px-5 py-3 text-sm font-medium text-black">
            Start with the evaluator
          </button>
          <button className="rounded-2xl border border-border bg-zinc-950 px-5 py-3 text-sm font-medium text-white">
            Browse the package system
          </button>
        </div>
      </div>
      <div className="rounded-[32px] border border-border bg-zinc-950 p-6 shadow-glow">
        <div className="mb-4 flex items-center gap-2 text-sm font-medium text-zinc-300">
          <Workflow className="h-4 w-4" />
          Primary app promise
        </div>
        <div className="space-y-4">
          {[
            "One home for specification, evaluation, and operationalization",
            "Fast narrowing into a single task path",
            "Evidence-first feedback instead of vague quality language",
            "Low-friction transition into implementation assets"
          ].map((item) => (
            <div key={item} className="rounded-2xl border border-border bg-black/30 p-4 text-sm text-zinc-200">
              {item}
            </div>
          ))}
        </div>
        <div className="mt-6 flex items-center gap-2 text-sm text-zinc-400">
          <ArrowRight className="h-4 w-4" />
          Learn → Evaluate → Operationalize
        </div>
      </div>
    </section>
  );
}
