import { test, expect } from '@playwright/test';

test.describe('@ui Dealing with UI Components', () => {
  test('drop down list', async ({ page }) => {
    await page.goto('https://practice.expandtesting.com/dropdown');
    //1- label
    await page.locator('#country').selectOption({ label: 'Egypt' });
    //2- displayed text
    await page.locator('#country').selectOption('Egypt');
    //3-value
    await page.locator('#country').selectOption('EG');
    //4- index
    await page.locator('#country').selectOption({ index: 3 });
    //5- another way
    await page.selectOption('#country', { label: 'Egypt' });
    await page.selectOption('#country', { index: 3 });
    await page.selectOption('#country', 'EG');

    // Assertion
    //1- list count approach1
    const options = page.locator('#country').locator('option');
    await expect(options).toHaveCount(252);
    //2- list count approach2
    const optionsCount = await page.$$('#country option');
    await expect(optionsCount).toHaveLength(252);
    expect(optionsCount.length).toBe(252);
    //3- text content approach1
    const textContent = await page.locator('#country').textContent();
    expect(textContent).toContain('Egypt');
    //4- text content approach2
    const textContent2 = await page.locator('#country').innerText();
    expect(textContent2.includes('Egypt')).toBeTruthy();
  });

  test('date picker - calendar', async ({ page }) => {
    await page.goto('https://demo.automationtesting.in/Datepicker.html');
    await page.locator('#datepicker1').click();
    await page.locator('.ui-icon.ui-icon-circle-triangle-e').click();
    await page.locator('#ui-datepicker-div').getByRole('link', { name: '17', exact: true }).click();

    // second date picker
    const year = '2026';
    const month = 4;
    const day = '17';
    await page.locator('#datepicker2').click();
    await page.locator("select[title='Change the month']").selectOption({ index: month });
    await page.locator("select[title='Change the year']").selectOption(year);
    await page.locator('.datepick-popup').getByRole('link', { name: day, exact: true }).click();
  });

  test('iframe handling', async ({ page }) => {
    await page.goto('https://demo.automationtesting.in/Frames.html');

    // number of iframes in the page
    const frames = await page.frames();
    console.log('number of frames:', frames.length);

    // 1- switch to iframe by name
    // const frame = page.frame('SingleFrame');
    // await frame.locator("//input[@type='text']").fill('select iframe by name');

    // 2- switch to iframe by url
    // const frame = page.frame({ url: 'https://demo.automationtesting.in/SingleFrame.html' });
    // await frame.locator("//input[@type='text']").fill('select iframe by url');

    // 3- switch to iframe by locator
    const frame = await page.frameLocator('#singleframe');
    await frame.locator("//input[@type='text']").fill('select iframe by locator');

    // nested iframes
    await page.locator(".analystic[href='#Multiple']").click();

    // Chain parent frame -> child frame -> action
    await page
      .frameLocator("iframe[src='MultipleFrames.html']")
      .frameLocator("iframe[src='SingleFrame.html']")
      .getByRole('textbox')
      .fill('Hello Nested Frame');
  });
});