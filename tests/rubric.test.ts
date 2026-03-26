import { describe, expect, it } from "vitest";
import { defaultRubric } from "@/lib/rubric/defaultRubric";

describe("rubric registry", () => {
  it("defines ten dimensions (§11)", () => {
    expect(defaultRubric.dimensions).toHaveLength(10);
    expect(defaultRubric.dimensions.every((d) => d.maxScore > 0 && d.weight > 0)).toBe(true);
  });
});
