import { test, expect } from "@playwright/test";

test.describe("evaluation workspace", () => {
  test("doctrine surface loads and links to evaluate", async ({ page }) => {
    await page.goto("/");
    await expect(page.getByRole("heading", { level: 1 })).toBeVisible();
    await expect(page.getByRole("link", { name: /start with the evaluator/i })).toBeVisible();
  });

  test("evaluator workspace renders intake controls", async ({ page }) => {
    await page.goto("/evaluate");
    await expect(page.getByRole("button", { name: /run evaluation \(paste\)/i })).toBeVisible();
    await expect(page.getByLabel(/instructional artifact/i)).toBeVisible();
  });
});
