import { test } from '@playwright/test';
import { POManager } from '../pages/poManager';
import tsData from '../../../testData/testUsers';

//====================Variables====================
let poManager: POManager;

//====================Hooks====================
test.beforeEach('This actions run before every test', async ({ page }) => {
  poManager = new POManager(page);
  await poManager.getLoginPage().open();
})

//====================Tests====================
test.describe('Login test', () => {
  test('verify profile icon', async ({ page }) => {
    await poManager.getLoginPage().login(tsData.username, tsData.password);
    await poManager.getHomePage().assertProfileIcon();
  });
});
