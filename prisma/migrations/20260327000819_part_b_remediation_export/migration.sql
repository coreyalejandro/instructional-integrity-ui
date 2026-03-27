-- CreateTable
CREATE TABLE "RemediationSuggestion" (
    "id" TEXT NOT NULL,
    "criterionResultId" TEXT NOT NULL,
    "suggestionText" TEXT NOT NULL,

    CONSTRAINT "RemediationSuggestion_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ExportRecord" (
    "id" TEXT NOT NULL,
    "sessionId" TEXT NOT NULL,
    "evaluationRunId" TEXT NOT NULL,
    "format" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "ExportRecord_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "RemediationSuggestion_criterionResultId_idx" ON "RemediationSuggestion"("criterionResultId");

-- CreateIndex
CREATE INDEX "ExportRecord_sessionId_idx" ON "ExportRecord"("sessionId");

-- CreateIndex
CREATE INDEX "ExportRecord_evaluationRunId_idx" ON "ExportRecord"("evaluationRunId");

-- AddForeignKey
ALTER TABLE "RemediationSuggestion" ADD CONSTRAINT "RemediationSuggestion_criterionResultId_fkey" FOREIGN KEY ("criterionResultId") REFERENCES "CriterionResult"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ExportRecord" ADD CONSTRAINT "ExportRecord_sessionId_fkey" FOREIGN KEY ("sessionId") REFERENCES "Session"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ExportRecord" ADD CONSTRAINT "ExportRecord_evaluationRunId_fkey" FOREIGN KEY ("evaluationRunId") REFERENCES "EvaluationRun"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- Backfill: one RemediationSuggestion per existing criterion (§16)
INSERT INTO "RemediationSuggestion" ("id", "criterionResultId", "suggestionText")
SELECT gen_random_uuid()::text, "id", "remediation" FROM "CriterionResult";
