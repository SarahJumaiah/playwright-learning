import { test, expect } from "@playwright/test";

//====================Tests====================
test("visual comparison", async ({ page }) => {
  await page.goto("https://qa-practice.netlify.app/auth_ecommerce");
  await expect(page).toHaveScreenshot();
});