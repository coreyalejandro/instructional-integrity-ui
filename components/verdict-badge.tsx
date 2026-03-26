import type { VerdictLabel } from "@/lib/domain/verdictTypes";

export type { VerdictLabel };

export function verdictLabelText(v: VerdictLabel): string {
  switch (v) {
    case "pass":
      return "Pass";
    case "warn":
      return "Warn";
    case "fail":
      return "Fail";
    case "needs_human_review":
      return "Needs human review";
    default:
      return String(v);
  }
}

export function VerdictBadge({ verdict }: { verdict: VerdictLabel }) {
  const cls =
    verdict === "pass"
      ? "border-emerald-500/40 bg-emerald-500/15 text-emerald-200"
      : verdict === "warn"
        ? "border-amber-500/40 bg-amber-500/15 text-amber-200"
        : verdict === "fail"
          ? "border-red-500/40 bg-red-500/15 text-red-200"
          : "border-violet-500/40 bg-violet-500/15 text-violet-200";

  return (
    <span className={`rounded-full border px-3 py-1 text-xs font-semibold ${cls}`}>
      <span className="sr-only">Verdict: </span>
      {verdictLabelText(verdict)}
    </span>
  );
}
