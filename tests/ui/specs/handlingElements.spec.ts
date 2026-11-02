import {test, expect} from'@playwright/test';

test.describe('@ui henadling wen elements by index and filter', () =>  {

    test('get element by index', async ({page}) => {
        await page.goto('https://practice.expandtesting.com/');
        // normal way
        //await page.locator("(//div[@class='card-body'])[2]").click();
        // playwright way
        const baseLocator = page.locator("(//div[@class='card-body'])");
     //   await baseLocator.locator('nth=1').click();
// await page.locator("//div[@class='card-body']").locator('nth=1').click();
        // filter
// await baseLocator.filter({hasText: 'Test Login Page'}).click();
        await baseLocator.filter({has: page.locator("//a[normalize-space()='Test Login Page']")}).click();
    });
});