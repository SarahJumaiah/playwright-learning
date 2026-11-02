import { test, expect } from '@playwright/test';
import loginCredentials from '../../../testData/testUsers';

test.beforeAll('This actions run before all tests', async () => {
  console.log('This actions run before all tests');
})

test.beforeEach('This actions run before every test', async ({ page }, testInfo) => {
  await page.goto('https://opensource-demo.orangehrmlive.com/');
  console.log(`test starts for: ${testInfo.title}`);
})

test.afterEach('This actions run after every test', async () => {
  console.log(`test ends for: ${test.info().title}`);
})

test.afterAll('This actions run after all tests', async () => {
  console.log('This actions run after all tests');
})

test.describe('@ui Login test', () => {
  test('valid login', async ({ page }) => {
    await page.getByPlaceholder('Username').fill(loginCredentials.username);
    await page.getByPlaceholder('Password').fill(loginCredentials.password);
    await page.getByRole('button', { name: 'Login' }).click();
    await expect(page.getByAltText('profile picture')).toBeVisible();
  });

  test('invalid login', async ({ page }) => {
    await page.getByPlaceholder('Username').fill(loginCredentials.username);
    await page.getByPlaceholder('Password').fill('admin12');
    await page.getByRole('button', { name: 'Login' }).click();
    await expect(page.locator("//p[@class='oxd-text oxd-text--p oxd-alert-content-text']")).toHaveText("Invalid credentials");
  });
});
