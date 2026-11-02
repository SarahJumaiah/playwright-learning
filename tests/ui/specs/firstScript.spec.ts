import { test, expect } from "@playwright/test";

test.describe("@ui Login Tests", () => {
  
  test("valid login", async ({ page }) => {
    await page.goto("https://practice.expandtesting.com/login");
    await page.locator("//input[@id='username']").fill("practice");
    await page.locator("//input[@id='password']").fill("SuperSecretPassword!");
    await page.locator("//button[@id='submit-login']").click();
    await expect(page.locator("//div[@id='flash']")).toContainText(
      "You logged into a secure area!",
    );
  });

  test("invalid login", async ({ page }) => {
    await page.goto("https://practice.expandtesting.com/login");
    await page.locator("//input[@id='username']").fill("practice");
    await page.locator("//input[@id='password']").fill("SuperSecretPassword");
    await page.locator("//button[@id='submit-login']").click();
    await expect.soft(page.locator("//div[@id='flash']")).toContainText(
      "Your used password is invalid!",
    );
    console.log("test completed.");
  });
});
