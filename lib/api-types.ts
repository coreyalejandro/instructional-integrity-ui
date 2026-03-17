import type { CriterionResult } from "./evaluator";
import type { EvaluationRun } from "./domain";

export interface EvaluatorRunRequest {
  artifactText: string;
  rubricVersion?: string;
  contextPath?: string;
}

export interface EvaluatorRunResponse {
  run: EvaluationRun;
  criteria: CriterionResult[];
}

export interface GetEvaluationRunResponse {
  run: EvaluationRun;
  criteria: CriterionResult[];
}

export interface TemplateFromResultRequest {
  criterion: CriterionResult;
}

export interface TemplateFromResultResponse {
  templateText: string;
}

export interface ListTemplatesResponse {
  templates: {
    id: string;
    name: string;
    description?: string;
  }[];
}

export interface CreateTemplateRequest {
  name: string;
  description?: string;
  content: string;
}

export interface CreateTemplateResponse {
  id: string;
}

export interface CreateTrainingSessionRequest {
  label?: string;
}

export interface CreateTrainingSessionResponse {
  id: string;
}

export interface CreateTrainingExampleRequest {
  trainingSessionId: string;
  artifactId: string;
  evaluationRunId: string;
  revisionText: string;
}

export interface CreateTrainingExampleResponse {
  id: string;
}

