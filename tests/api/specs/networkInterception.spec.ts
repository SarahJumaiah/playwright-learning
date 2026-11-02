import { expect, test } from '@playwright/test';
import { POManager } from '../../ui/pages/poManager';
import tsData from '../../../testData/testUsers';
import mockedResponse from '../../../mocks/responseInterception.json';
//======================Variables======================
let poManager: POManager;
//======================Hooks==========================
test.beforeEach('This actions run before every test', async ({ page }, testInfo) => {
    poManager = new POManager(page);
    await poManager.getLoginPage().open();
    console.log(`test starts for: ${testInfo.title}`);
});
//======================Tests==========================
test.describe('Network interception', () => {
    test('Delete an employee using the intercepted employee response', async ({ page }) => {
        await poManager.getLoginPage().login(tsData.username, tsData.password);
        await page.getByText('PIM').click();
        const employeeResponse = await page.waitForResponse(response =>
            response.url().startsWith(
                'https://opensource-demo.orangehrmlive.com/web/index.php/api/v2/pim/employees?limit=50&offset=0'
            )
        );
        const employeeResponseBody = await employeeResponse.json();
        console.log(employeeResponseBody);
        const empNumber = employeeResponseBody.data[0].empNumber;
        console.log(empNumber);
        const requestBody = {
            "ids": [empNumber]
        };
        const deletedEmpResponse = await page.request.delete(
            'https://opensource-demo.orangehrmlive.com/web/index.php/api/v2/pim/employees',
            {
                data: requestBody
            }
        );
        const deletedEmployeeResponseBody = await deletedEmpResponse.json();
        console.log(deletedEmployeeResponseBody);
    });

    test('Mock the random user response ', async ({ page }) => {
        await page.route('https://api.randomuser.me/?nat=us', async route => {
            await route.fulfill({
                body: JSON.stringify(mockedResponse)
            });
        });

        await page.goto('https://demo.automationtesting.in/DynamicData.html');
        await page.locator('#save').click();
        await expect(page.locator('#loading'))
            .toContainText('First Name : PlaywrightLast Name : User');
    });

    test('Modify the random user response before fulfilling it', async ({ page }) => {
        await page.route('https://api.randomuser.me/?nat=us', async route => {
            const response = await route.fetch();
            const responseBody = await response.json();
            responseBody.results[0].name.first = 'Udemy';
            responseBody.results[0].name.last = 'Course';
            await route.fulfill({
                body: JSON.stringify(responseBody)
            });
        });

        await page.goto('https://demo.automationtesting.in/DynamicData.html');
        await page.locator('#save').click();
        await expect(page.locator('#loading'))
            .toContainText('First Name : UdemyLast Name : Course');
    });

    test('Rewrite the Wikipedia search request', async ({ page }) => {
        await page.route('https://en.wikipedia.org/w/api.php*', async route => {
            await route.continue({
                url: 'https://en.wikipedia.org/w/api.php?action=opensearch&search=Udemy&format=json&callback=%3F&callback=callback'
            });
        });

        await page.goto('https://testautomationpractice.blogspot.com/');
        await page.locator("//input[@id='Wikipedia1_wikipedia-search-input']").fill('Hello');
        await page.locator("//input[@type='submit']").click();
        await expect(page.locator("//a[normalize-space()='Udemy']")).toBeVisible();
    });

    test('Abort image requests', async ({ page }) => {
        // await page.route('**/*.css', async route => {
        //     await route.abort();
        // });
        // await page.goto('https://practice.expandtesting.com/');

        await page.route('**/*.{png,jpg,jpeg}', async route => {
            await route.abort();
        });
        await page.goto('https://practice.automationtesting.in/');
    });
});