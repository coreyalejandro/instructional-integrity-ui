export interface EvidenceItemView {
  excerptText: string;
  location: string;
  relevance: string;
}

export function EvidencePanel({ items }: { items: EvidenceItemView[] }) {
  if (items.length === 0) {
    return <p className="text-sm text-zinc-500">No evidence excerpts recorded.</p>;
  }
  return (
    <ul className="space-y-3" aria-label="Evidence excerpts">
      {items.map((e, i) => (
        <li key={`${e.location}-${i}`} className="rounded-xl border border-border bg-zinc-950/80 p-3 text-sm">
          <p className="text-xs font-medium uppercase tracking-wide text-zinc-500">{e.location}</p>
          <blockquote className="mt-2 whitespace-pre-wrap text-zinc-200">{e.excerptText}</blockquote>
          <p className="mt-2 text-xs text-zinc-400">{e.relevance}</p>
        </li>
      ))}
    </ul>
  );
}
