import { test, expect } from '@playwright/test';

test.describe('@ui Login and keyboard actions', () => {
  test('valid login', async ({ page }) => {
    await page.goto('https://practice.expandtesting.com/login');
    await page.locator("//input[@id='username']").fill('practice');
    await page.locator("//input[@id='password']").fill('SuperSecretPassword!');
    await page.locator("//button[normalize-space()='Login']").click();

    await expect(page.locator("div[id='flash'] b")).toContainText('You logged into a secure area!');
  });

  test('keys and shortcuts', async ({ page }) => {
    await page.goto('https://practice.expandtesting.com/login');
    await page.locator("//div[@class='col-9']").press('Control+A');
    await page.locator("//input[@id='username']").fill('practice');
    await page.locator("//input[@id='password']").fill('SuperSecretPassword!');
    await page.locator("//button[normalize-space()='Login']").press('Enter');

    await expect(page.locator("div[id='flash'] b")).toContainText('You logged into a secure area!');
  });

  test('keyboard', async ({ page }) => {
    await page.goto('https://practice.expandtesting.com/login');
    await page.locator("//input[@id='username']").click();
    await page.keyboard.type('practiceY');
    await page.keyboard.press('Backspace');
    await page.locator("//input[@id='password']").fill('SuperSecretPassword!');
    await page.locator("//button[normalize-space()='Login']").press('Enter');

    await expect(page.locator("div[id='flash'] b")).toContainText('You logged into a secure area!');
  });

  test('search', async ({ page }) => {
    await page.goto('https://practice.expandtesting.com');
    await page.getByPlaceholder('Search an example...').fill('login');
    await page.locator("//a[normalize-space()='Test Login Page']").click();
    await expect(page).toHaveTitle('Test Login Page for Automation Testing Practice');
  });

  test('Upload files', async ({ page }) => {
    await page.goto('https://demo.automationtesting.in/FileUpload.html');

    // 1- upload single file
    // await page.locator('#input-4').setInputFiles('tests/testData/testFile1.txt');

    // 2- upload multiple files
    await page.locator('#input-4').setInputFiles([
      'tests/testData/testFile1.txt',
      'tests/testData/testFile2.docs'
    ]);
    await page.locator("//button[@title='Upload selected files']").click();

    // assertion
    await expect(page.locator("(//div[@title='testFile1.txt'])[1]")).toBeVisible();

    // remove files
    await page.locator('#input-4').setInputFiles([]);
  });

  test('slider', async ({ page }) => {
    await page.goto('https://practice.expandtesting.com/horizontal-slider');
    const sliderLocator = page.locator("//input[@max='5.0']");
    await sliderLocator.evaluate((e) => {
      e.setAttribute('value', '3.5');
    });

    await page.pause();
  });

  test('Alerts', async ({ page }) => {
    await page.goto('https://testautomationpractice.blogspot.com/');
    //1- alert
    // await page.on('dialog', async dialog => {
    //   await expect(dialog.message()).toContain("I am an alert box!");
    //   await dialog.accept();
    // });
    // await page.locator("#alertBtn").click();

    //2- confirm
    // await page.on('dialog', async dialog => {
    //   await expect(dialog.message()).toContain('Press a button!');
    //   await dialog.dismiss();
    // });
    // await page.locator("#confirmBtn").click();
    // await expect(page.locator("#demo")).toContainText('You pressed Cancel!');

    //3- prompt
    await page.on('dialog', async dialog => {
      await expect(dialog.message()).toContain('Please enter your name:');
      await expect(dialog.defaultValue()).toContain('Harry Potter');
      await dialog.accept('Mohamed Bakry');
    });

    await page.locator("#promptBtn").click();
    await expect(page.locator("#demo")).toContainText('Hello Mohamed Bakry! How are you today?');
  });
});