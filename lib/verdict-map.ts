import type { VerdictLabel } from "@/lib/domain/verdictTypes";

export function prismaVerdictToLabel(v: string): VerdictLabel {
  switch (v) {
    case "PASS":
      return "pass";
    case "WARN":
      return "warn";
    case "FAIL":
      return "fail";
    case "NEEDS_HUMAN_REVIEW":
      return "needs_human_review";
    default:
      return "needs_human_review";
  }
}
