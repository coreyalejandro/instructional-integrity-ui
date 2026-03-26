export function RemediationPanel({ text }: { text: string }) {
  return (
    <section aria-label="Remediation guidance" className="rounded-xl border border-border bg-black/30 p-4 text-sm leading-6 text-zinc-200">
      {text}
    </section>
  );
}
