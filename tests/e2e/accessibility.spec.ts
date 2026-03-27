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

test("axe: run detail after evaluation (§10.5)", async ({ page }) => {
  await page.goto("/evaluate");
  await page.getByLabel(/instructional artifact/i).fill(
    "Step 1: Do one thing.\n\nStep 2: Do the next.\n\nBecause both steps are ordered, the sequence is clear."
  );
  await page.getByRole("button", { name: /run evaluation \(paste\)/i }).click();
  await page.getByRole("link", { name: /open run detail/i }).waitFor({ timeout: 60_000 });
  await page.getByRole("link", { name: /open run detail/i }).click();
  await expect(page.getByRole("heading", { level: 1 })).toBeVisible();
  const results = await new AxeBuilder({ page }).analyze();
  const serious = results.violations.filter((v) => v.impact === "serious" || v.impact === "critical");
  expect(serious, JSON.stringify(serious, null, 2)).toHaveLength(0);
});
