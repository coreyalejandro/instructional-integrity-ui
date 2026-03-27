import { FAILURE_CLASS_TO_GLOSSARY_ID } from "@/lib/glossary/cognitiveSafetyTerms";

export function FailureClassList({ classIds }: { classIds: string[] }) {
  if (classIds.length === 0) {
    return <p className="text-sm text-zinc-500">No failure classes tagged for this run.</p>;
  }
  return (
    <ul className="flex flex-wrap gap-2" aria-label="Failure classes">
      {classIds.map((id) => {
        const glossId = FAILURE_CLASS_TO_GLOSSARY_ID[id as keyof typeof FAILURE_CLASS_TO_GLOSSARY_ID];
        return (
          <li key={id}>
            {glossId ? (
              <a
                href={`#${glossId}`}
                className="inline-flex rounded-full border border-border bg-zinc-900 px-3 py-1 font-mono text-xs text-zinc-200 underline-offset-4 hover:underline"
              >
                {id}
              </a>
            ) : (
              <span className="inline-flex rounded-full border border-border bg-zinc-900 px-3 py-1 font-mono text-xs text-zinc-200">
                {id}
              </span>
            )}
          </li>
        );
      })}
    </ul>
  );
}
