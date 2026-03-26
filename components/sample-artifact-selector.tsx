"use client";

export interface SampleOption {
  slug: string;
  title: string;
  description: string | null;
}

export function SampleArtifactSelector({
  samples,
  value,
  onChange,
  disabled
}: {
  samples: SampleOption[];
  value: string;
  onChange: (slug: string) => void;
  disabled?: boolean;
}) {
  return (
    <div className="space-y-2">
      <label htmlFor="sample-artifact" className="text-sm font-medium text-zinc-200">
        Sample artifact
      </label>
      <select
        id="sample-artifact"
        className="w-full rounded-xl border border-border bg-zinc-950 px-3 py-2 text-sm text-zinc-100"
        value={value}
        disabled={disabled}
        onChange={(e) => onChange(e.target.value)}
      >
        <option value="">Select a sample…</option>
        {samples.map((s) => (
          <option key={s.slug} value={s.slug}>
            {s.title}
          </option>
        ))}
      </select>
      <p className="text-xs text-zinc-500">
        Audience: Safety Evaluator — samples demonstrate cognitive-safety failure patterns (Article VI).
      </p>
    </div>
  );
}
