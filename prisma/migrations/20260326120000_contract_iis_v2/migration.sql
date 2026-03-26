-- CreateEnum
CREATE TYPE "ArtifactSource" AS ENUM ('PASTE', 'UPLOAD', 'SAMPLE');

-- CreateEnum
CREATE TYPE "RunStatus" AS ENUM ('COMPLETE', 'INCOMPLETE');

-- CreateEnum
CREATE TYPE "Verdict" AS ENUM ('PASS', 'WARN', 'FAIL', 'NEEDS_HUMAN_REVIEW');

-- CreateEnum
CREATE TYPE "CriterionVerdict" AS ENUM ('PASS', 'WARN', 'FAIL');

-- CreateTable
CREATE TABLE "Session" (
    "id" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Session_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Artifact" (
    "id" TEXT NOT NULL,
    "sessionId" TEXT NOT NULL,
    "title" TEXT,
    "rawText" TEXT NOT NULL,
    "sourceType" "ArtifactSource" NOT NULL,
    "mimeType" TEXT,
    "sampleId" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Artifact_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "EvaluationRun" (
    "id" TEXT NOT NULL,
    "sessionId" TEXT NOT NULL,
    "artifactId" TEXT NOT NULL,
    "status" "RunStatus" NOT NULL,
    "verdict" "Verdict" NOT NULL,
    "overallScore" DOUBLE PRECISION NOT NULL,
    "rubricVersion" TEXT NOT NULL,
    "evaluatorId" TEXT NOT NULL,
    "evaluatorVersion" TEXT NOT NULL,
    "evaluationDurationMs" INTEGER NOT NULL,
    "failureClassSummary" TEXT[],
    "incompleteReason" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "completedAt" TIMESTAMP(3),

    CONSTRAINT "EvaluationRun_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "CriterionResult" (
    "id" TEXT NOT NULL,
    "evaluationRunId" TEXT NOT NULL,
    "dimensionId" TEXT NOT NULL,
    "score" DOUBLE PRECISION NOT NULL,
    "maxScore" DOUBLE PRECISION NOT NULL,
    "verdict" "CriterionVerdict" NOT NULL,
    "remediation" TEXT NOT NULL,
    "evidenceInsufficient" BOOLEAN NOT NULL DEFAULT false,

    CONSTRAINT "CriterionResult_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "EvidenceExcerpt" (
    "id" TEXT NOT NULL,
    "criterionResultId" TEXT NOT NULL,
    "excerptText" TEXT NOT NULL,
    "location" TEXT NOT NULL,
    "relevance" TEXT NOT NULL,

    CONSTRAINT "EvidenceExcerpt_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "FailureClassRecord" (
    "id" TEXT NOT NULL,
    "criterionResultId" TEXT NOT NULL,
    "classId" TEXT NOT NULL,

    CONSTRAINT "FailureClassRecord_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "SampleArtifact" (
    "id" TEXT NOT NULL,
    "slug" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "content" TEXT NOT NULL,
    "description" TEXT,

    CONSTRAINT "SampleArtifact_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "PendingUpload" (
    "id" TEXT NOT NULL,
    "sessionId" TEXT NOT NULL,
    "title" TEXT,
    "content" TEXT NOT NULL,
    "mimeType" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "PendingUpload_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "DeletionLog" (
    "id" TEXT NOT NULL,
    "sessionId" TEXT NOT NULL,
    "deletedRunIds" TEXT[],
    "deletedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "metadata" JSONB,

    CONSTRAINT "DeletionLog_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "SampleArtifact_slug_key" ON "SampleArtifact"("slug");

-- AddForeignKey
ALTER TABLE "Artifact" ADD CONSTRAINT "Artifact_sessionId_fkey" FOREIGN KEY ("sessionId") REFERENCES "Session"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "EvaluationRun" ADD CONSTRAINT "EvaluationRun_sessionId_fkey" FOREIGN KEY ("sessionId") REFERENCES "Session"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "EvaluationRun" ADD CONSTRAINT "EvaluationRun_artifactId_fkey" FOREIGN KEY ("artifactId") REFERENCES "Artifact"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CriterionResult" ADD CONSTRAINT "CriterionResult_evaluationRunId_fkey" FOREIGN KEY ("evaluationRunId") REFERENCES "EvaluationRun"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "EvidenceExcerpt" ADD CONSTRAINT "EvidenceExcerpt_criterionResultId_fkey" FOREIGN KEY ("criterionResultId") REFERENCES "CriterionResult"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "FailureClassRecord" ADD CONSTRAINT "FailureClassRecord_criterionResultId_fkey" FOREIGN KEY ("criterionResultId") REFERENCES "CriterionResult"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PendingUpload" ADD CONSTRAINT "PendingUpload_sessionId_fkey" FOREIGN KEY ("sessionId") REFERENCES "Session"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "DeletionLog" ADD CONSTRAINT "DeletionLog_sessionId_fkey" FOREIGN KEY ("sessionId") REFERENCES "Session"("id") ON DELETE CASCADE ON UPDATE CASCADE;

