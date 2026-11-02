import { test } from '@playwright/test';
import { POManager } from '../pages/poManager';
import loginCredentials from '../../../testData/testUsers';

//====================Variables====================
let poManager: POManager;

//====================Hooks====================
test.beforeAll('This actions run before all tests', async () => {
  console.log('This actions run before all tests');
})

test.beforeEach('This actions run before every test', async ({ page }, testInfo) => {
  poManager = new POManager(page);
  await poManager.getLoginPage().open();
  console.log(`test starts for: ${testInfo.title}`);
})

test.afterEach('This actions run after every test', async () => {
  console.log(`test ends for: ${test.info().title}`);
})

test.afterAll('This actions run after all tests', async () => {
  console.log('This actions run after all tests');
})

test.describe('Login test', () => {
  test('valid login', async () => {
    await poManager.getLoginPage().login(loginCredentials.username, loginCredentials.password);
    await poManager.getHomePage().assertProfileIcon();
  });

  test('invalid login', async () => {
    await poManager.getLoginPage().login(loginCredentials.username, 'admin12');
    await poManager.getLoginPage().assertInvalidLoginMessage();
  });
});