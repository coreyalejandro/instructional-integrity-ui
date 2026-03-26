export function FailureClassList({ classIds }: { classIds: string[] }) {
  if (classIds.length === 0) {
    return <p className="text-sm text-zinc-500">No failure classes tagged for this run.</p>;
  }
  return (
    <ul className="flex flex-wrap gap-2" aria-label="Failure classes">
      {classIds.map((id) => (
        <li
          key={id}
          className="rounded-full border border-border bg-zinc-900 px-3 py-1 font-mono text-xs text-zinc-200"
        >
          {id}
        </li>
      ))}
    </ul>
  );
}
