import type { EvidenceItem } from "@/lib/domain/evaluationTypes";

/** Evidence excerpts are produced by the rule-based evaluator; this module satisfies §13 separation. */
export function attachEvidencePlaceholder(excerpt: string, location: string, relevance: string): EvidenceItem[] {
  return [{ excerptText: excerpt.slice(0, 2000), location, relevance }];
}
