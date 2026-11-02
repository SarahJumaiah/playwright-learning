import { test, expect } from "@playwright/test";

test.describe("@ui Login Tests", () => {
  test("valid login", async ({ page }) => {
    await page.goto("https://practice.expandtesting.com/login");

    // id
    await page.locator("#username").fill("practice");
    // getByLabel
    await page.getByLabel("Password").fill("SuperSecretPassword!");
    // 2- xpath
    // await page.locator("//button[normalize-space()='Login']").click();
    // getByRole
    await page.getByRole("button", { name: "Login" }).click();
    // 3- css selector
    await expect(page.locator("div[id='flash']")).toContainText(
      "You logged into a secure area!",
    );
  });

  test("invalid login", async ({ page }) => {
    await page.goto("https://practice.expandtesting.com/login");

    // css selector
    await page.locator("#username").fill("practice");
    // 4- name
    await page.locator("[name='password']").fill("SuperSecretPassword");
    await page.locator("//button[normalize-space()='Login']").click();
    await expect(page.locator("div[id='flash']")).toContainText(
      "Your password is invalid!",
    );
  });

  test("login page renders correctly", async ({ page }) => {
    await page.goto("https://practice.expandtesting.com/login");

    // 5- alt text
    // await expect(page.locator("[alt='Best Website for Practice Automation Testing: Free UI and REST API Examples and Apps. Using Cypress, Playwright, Selenium, WebdriverIO and Postman.']")).toBeVisible();
    // 6- text
    // await expect(page.getByText("SuperSecretPassword!")).toBeVisible();
    await expect(
      page.locator(
        "[alt='Best Website for Practice Automation Testing: Free UI and REST API Examples and Apps. Using Cypress, Playwright, Selenium, WebdriverIO and Postman.']",
      ),
    ).toBeVisible();
  });
});
