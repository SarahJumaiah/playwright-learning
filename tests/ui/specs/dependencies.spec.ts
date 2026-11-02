import { test, expect } from '@playwright/test';
import loginCredentials from '../../../testData/testUsers';

test.describe('update personal details', {
  tag: ['@ui', '@smoke'],
}, () => {
  test('verify profile name after changing name', async ({ page }) => {
    await page.goto('/');
    await page.getByPlaceholder('Username').fill(loginCredentials.username);
    await page.getByPlaceholder('Password').fill(loginCredentials.password);
    await page.getByRole('button', { name: 'Login' }).click();
    // await page.getByText('My Info').click();
    // await page.getByPlaceholder('First Name').fill('Sarah');
    // await page.getByPlaceholder('Middle Name').fill('');
    // await page.getByPlaceholder('Last Name').fill('Jumaiah');
    // await page.locator("//div[@class='orangehrm-horizontal-padding orangehrm-vertical-padding']//button[@type='submit'][normalize-space()='Save']").click();
    // await page.reload();
    await expect(page.locator("//p[@class='oxd-userdropdown-name']")).toHaveText('Sarah Jumaiah');
  });

  test('verify admin record after changing name', async ({ page }) => {
    await page.goto('/');
    await page.getByPlaceholder('Username').fill(loginCredentials.username);
    await page.getByPlaceholder('Password').fill(loginCredentials.password);
    await page.getByRole('button', { name: 'Login' }).click();
    // await page.getByText('My Info').click();
    // await page.getByPlaceholder('First Name').fill('Sarah');
    // await page.getByPlaceholder('Middle Name').fill('');
    // await page.getByPlaceholder('Last Name').fill('Jumaiah');
    await page.getByText('Admin').click();
    await expect(page.locator("body > div:nth-child(3) > div:nth-child(1) > div:nth-child(2) > div:nth-child(2) > div:nth-child(1) > div:nth-child(3) > div:nth-child(3) > div:nth-child(1) > div:nth-child(2) > div:nth-child(1) > div:nth-child(1) > div:nth-child(4) > div:nth-child(1)")).toHaveText("Sarah Jumaiah");
  });
});