"use client";

import { useId, useState } from "react";
import { COGNITIVE_SAFETY_GLOSSARY } from "@/lib/glossary/cognitiveSafetyTerms";

export function CognitiveSafetyGlossary() {
  const [open, setOpen] = useState(false);
  const headingId = useId();

  return (
    <div className="rounded-2xl border border-border bg-black/30 p-4">
      <button
        type="button"
        className="flex w-full items-center justify-between text-left text-sm font-semibold text-zinc-100"
        aria-expanded={open}
        aria-controls={headingId}
        onClick={() => setOpen((v) => !v)}
      >
        Cognitive safety glossary
        <span aria-hidden="true">{open ? "−" : "+"}</span>
      </button>
      {open ? (
        <dl id={headingId} className="mt-4 space-y-4 text-sm text-zinc-300">
          {COGNITIVE_SAFETY_GLOSSARY.map((t) => (
            <div key={t.id} id={t.id} className="scroll-mt-24">
              <dt className="font-medium text-zinc-100">{t.term}</dt>
              <dd className="mt-1 leading-6">{t.definition}</dd>
            </div>
          ))}
        </dl>
      ) : null}
    </div>
  );
}
