export interface RubricRow {
  dimensionId: string;
  score: number;
  maxScore: number;
}

export function RubricBreakdown({ rows }: { rows: RubricRow[] }) {
  return (
    <ul className="space-y-2" aria-label="Rubric breakdown">
      {rows.map((r) => (
        <li key={r.dimensionId} className="flex flex-wrap items-center justify-between gap-2 rounded-xl border border-border bg-black/20 px-3 py-2 text-sm">
          <span className="font-mono text-xs text-zinc-300">{r.dimensionId}</span>
          <span className="text-zinc-400">
            {r.score.toFixed(1)} / {r.maxScore.toFixed(1)}
          </span>
        </li>
      ))}
    </ul>
  );
}
