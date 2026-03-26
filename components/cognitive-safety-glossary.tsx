"use client";

import { useId, useState } from "react";

const TERMS: { term: string; definition: string }[] = [
  {
    term: "Cognitive safety",
    definition:
      "Whether an instructional artifact tends to produce correct mental models in the learner, not merely whether its propositions are true."
  },
  {
    term: "Scaffolding failure",
    definition: "Missing or misleading structure that causes false understanding despite plausible wording."
  },
  {
    term: "Premature conclusion",
    definition: "A conclusion appears before the learner has enough support to interpret it correctly."
  },
  {
    term: "Prerequisite scaffolding",
    definition: "Explicit naming of what the learner must already know before new ideas are introduced."
  },
  {
    term: "Terminology grounding",
    definition: "Terms are defined or anchored before they are used in abstract arguments."
  },
  {
    term: "Compression overload",
    definition: "Too many distinct concepts packed into too few steps or paragraphs for the intended audience."
  },
  {
    term: "Progressive disclosure",
    definition: "Revealing detail in layers so each step stays within working-memory limits."
  },
  {
    term: "Mental model",
    definition: "The learner’s internal picture of how a system works, which can be wrong even when facts are right."
  },
  {
    term: "Epistemic correctness vs cognitive safety",
    definition:
      "Content can be true on its face yet unsafe if sequencing and scaffolding invite the wrong interpretation."
  }
];

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
          {TERMS.map((t) => (
            <div key={t.term}>
              <dt className="font-medium text-zinc-100">{t.term}</dt>
              <dd className="mt-1 leading-6">{t.definition}</dd>
            </div>
          ))}
        </dl>
      ) : null}
    </div>
  );
}
