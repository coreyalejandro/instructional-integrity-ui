import type { Grade, InvariantId } from "./rubric";

export type RoleId = "admin" | "reviewer" | "author";

export interface User {
  id: string;
  email: string;
  name?: string;
  role: RoleId;
  organizationId?: string | null;
}

export interface Organization {
  id: string;
  name: string;
}

export interface Artifact {
  id: string;
  ownerId: string;
  title?: string;
  rawText: string;
  sourceType: "paste" | "upload";
  mimeType?: string | null;
  createdAt: string;
}

export interface EvaluationRun {
  id: string;
  artifactId: string;
  userId: string;
  rubricVersion: string;
  status: "pending" | "completed" | "failed";
  createdAt: string;
  completedAt?: string | null;
  overallGrade: Grade;
}

export interface CriterionResultRecord {
  id: string;
  evaluationRunId: string;
  invariantId: InvariantId;
  criterionName: string;
  grade: Grade;
  rationale: string;
  nextAction: string;
}

export interface Template {
  id: string;
  name: string;
  description?: string;
  invariantId?: InvariantId;
  content: string;
  createdById: string;
  createdAt: string;
}

export interface PlaybookStep {
  id: string;
  order: number;
  label: string;
  templateId?: string;
}

export interface Playbook {
  id: string;
  name: string;
  description?: string;
  steps: PlaybookStep[];
  createdById: string;
  createdAt: string;
}

export interface TrainingSession {
  id: string;
  organizationId?: string | null;
  createdById: string;
  createdAt: string;
  label?: string;
}

export interface TrainingExample {
  id: string;
  trainingSessionId: string;
  artifactId: string;
  evaluationRunId: string;
  revisionText: string;
  createdAt: string;
}

