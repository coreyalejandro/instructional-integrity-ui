import { test, expect } from "@playwright/test";
import AxeBuilder from "@axe-core/playwright";

const paths = ["/", "/evaluate", "/runs"];

for (const path of paths) {
  test(`axe: ${path}`, async ({ page }) => {
    await page.goto(path);
    const results = await new AxeBuilder({ page }).analyze();
    const serious = results.violations.filter((v) => v.impact === "serious" || v.impact === "critical");
    expect(serious, JSON.stringify(serious, null, 2)).toHaveLength(0);
  });
}
