import { test, expect } from '@playwright/test';

test.describe('Login tests with annotations', {
  tag: ['@ui', '@smoke'],
}, () => {
  test('valid login', {
    annotation: {
      type: 'purpose',
      description: 'Verify valid credentials allow login.',
    },
  }, async ({ page }) => {
    await page.goto('https://practice.expandtesting.com/login');
    await page.locator("//input[@id='username']").fill('practice');
    await page.locator("//input[@id='password']").fill('SuperSecretPassword!');
    await page.locator("//button[@id='submit-login']").click();
    await expect(page.locator("//div[@id='flash']")).toContainText(
      'You logged into a secure area!',
    );
  });

  test('invalid login', {
    annotation: {
      type: 'purpose',
      description: 'Verify invalid credentials are rejected.',
    },
  }, async ({ page }) => {
    await page.goto('https://practice.expandtesting.com/login');
    await page.locator("//input[@id='username']").fill('practice');
    await page.locator("//input[@id='password']").fill('SuperSecretPassword');
    await page.locator("//button[@id='submit-login']").click();
    await expect.soft(page.locator("//div[@id='flash']")).toContainText(
      'Your used password is invalid!',
    );
    console.log('test completed.');
  });
});
