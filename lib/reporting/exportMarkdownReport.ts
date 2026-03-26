import type { Prisma } from "@prisma/client";
import { sanitizeExportText } from "./sanitizeExportContent";

type RunWithRelations = Prisma.EvaluationRunGetPayload<{
  include: {
    artifact: true;
    criteria: {
      include: { evidence: true; failureClasses: true };
    };
  };
}>;

export function buildMarkdownExport(run: RunWithRelations): string {
  const title = sanitizeExportText(run.artifact.title ?? "Untitled artifact");
  const lines: string[] = [
    `# Evaluation report: ${title}`,
    "",
    `- **Run ID:** ${run.id}`,
    `- **Verdict:** ${run.verdict}`,
    `- **Overall score:** ${run.overallScore}`,
    `- **Rubric:** ${run.rubricVersion}`,
    `- **Created:** ${run.createdAt.toISOString()}`,
    "",
    "## Artifact snapshot",
    "",
    "```",
    sanitizeExportText(run.artifact.rawText).slice(0, 50_000),
    "```",
    "",
    "## Criteria",
    ""
  ];

  for (const c of run.criteria) {
    lines.push(`### ${c.dimensionId}`, "", `- Score: ${c.score} / ${c.maxScore}`, `- Verdict: ${c.verdict}`, "");
    lines.push("**Remediation:**", "", c.remediation, "");
    lines.push("**Evidence:**", "");
    for (const e of c.evidence) {
      lines.push(`- _${sanitizeExportText(e.location)}_: ${sanitizeExportText(e.excerptText)}`);
    }
    lines.push("", "**Failure classes:**", c.failureClasses.map((f) => `- ${f.classId}`).join("\n"), "");
  }

  return lines.join("\n");
}
