import { defaultRubric } from "./defaultRubric";
import type { Rubric, RubricDimensionDefinition } from "./rubricTypes";

export function getRubric(): Rubric {
  return defaultRubric;
}

export function getDimensionById(id: string): RubricDimensionDefinition | undefined {
  return defaultRubric.dimensions.find((d) => d.id === id);
}
