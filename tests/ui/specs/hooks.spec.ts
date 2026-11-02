import { test, expect } from '@playwright/test';
import loginCredentials from '../../../testData/testUsers';

test.beforeAll('this actions run before all tests', async() => {
    console.log('this actions run before all tests');
});

test.beforeEach('this actions run before each tests', async({page}, testinfo) => {
    await page.goto('https://opensource-demo.orangehrmlive.com/');
    console.log(`start test ${testinfo.title}`);
});

test.afterEach('this actions run after each tests', async () => {
    console.log(`finish test ${test.info().title}`);
});

test.afterAll('this actions run after all tests', async() => {
    console.log('this actions run after all tests');
});

test.describe('Login test', () => {
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
