import { test, expect } from "@playwright/test";

test.describe("§8.1 error surfaces", () => {
  test("empty paste shows structured error", async ({ page }) => {
    await page.goto("/evaluate");
    await page.getByLabel(/instructional artifact/i).fill("");
    await page.getByRole("button", { name: /run evaluation \(paste\)/i }).click();
    await expect(page.getByRole("alert")).toBeVisible();
    await expect(page.getByRole("alert")).toContainText(/empty/i);
  });

  test("oversized paste is rejected", async ({ page }) => {
    await page.goto("/evaluate");
    const big = "z".repeat(100_001);
    await page.getByLabel(/instructional artifact/i).evaluate((el, text) => {
      (el as HTMLTextAreaElement).value = text;
    }, big);
    await page.getByRole("button", { name: /run evaluation \(paste\)/i }).click();
    await expect(page.getByRole("alert")).toBeVisible();
    await expect(page.getByRole("alert")).toContainText(/character|large|limit/i);
  });
});
