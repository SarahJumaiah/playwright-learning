import { defineConfig, devices } from '@playwright/test';
import dotenv from 'dotenv';

declare const process: { env: Record<string, string | undefined> };

dotenv.config();

/**
 * See https://playwright.dev/docs/test-configuration.
 */

const reportPortalApiKey = process.env.REPORTPORTAL_API_KEY;
const reportPortalEnabled = !!reportPortalApiKey;

const reportPortalConfig = reportPortalEnabled ? {
  endpoint: process.env.REPORTPORTAL_ENDPOINT ?? "https://demo.reportportal.io/api/v1",
  apiKey: reportPortalApiKey!,
  project: process.env.REPORTPORTAL_PROJECT ?? "sarahjumaiah_personal",
  launch: process.env.REPORTPORTAL_LAUNCH ?? "Test Launch",
  description: "My awesome launch",
  attributes: [
    {
      key: "attributeKey",
      value: "attrbiuteValue",
    },
    {
      value: "anotherAttrbiuteValue",
    },
  ],
  mode: 'DEFAULT',
} : undefined;

export default defineConfig({
  testDir: './',
  testMatch: ['tests/**/*.spec.ts', 'tests/**/*.specs.ts', 'tests-examples/**/*.spec.ts'],
  /* Run tests in files in parallel */
  fullyParallel: true,
  /* Fail the build on CI if you accidentally left test.only in the source code. */
  forbidOnly: !!process.env.CI,
  // retries: 1,
  // workers: process.env.CI ? 1 : undefined,
  workers: 2,
  /* Reporter to use. See https://playwright.dev/docs/test-reporters */
  reporter: [
    ['html', { open: 'never' }],
    ["allure-playwright"],
    ...(reportPortalConfig
      ? [['@reportportal/agent-js-playwright', reportPortalConfig] as const]
      : []),
  ],
  expect: {
    timeout: 6000, //timeout for validation
  },
  timeout: 2 * 60 * 1000, //General timeout for the test run is 1min
  globalTimeout: 3 * 60 * 60 * 1000, //General timeout for the total run is 3hr
  globalSetup: './tests/utils/setup/globalSetup.ts',
  globalTeardown: './tests/utils/setup/globalTeardown.ts',
  /* Shared settings for all the projects below. See https://playwright.dev/docs/api/class-testoptions. */
  use: {
    /* Base URL to use in actions like `await page.goto('')`. */
    // baseURL: 'http://localhost:3000',

    trace: 'retain-on-failure',
    screenshot: 'on',
    headless: true,
    // actionTimeout: 6000,
    // navigationTimeout: 30000,
    baseURL: 'https://opensource-demo.orangehrmlive.com',
    storageState: 'storageState.json',
  },

  /* Configure projects for major browsers */
  projects: [
    {
      name: 'setup',
      testMatch: /.*\.setup\.ts/,
      teardown: 'reset',
      use: {
        ...devices['Desktop Chrome'],
        baseURL: 'https://opensource-demo.orangehrmlive.com',
        trace: 'retain-on-failure',
      },
    },
    {
      name: 'reset',
      testMatch: /.*\.teardown\.ts/,
      use: {
        ...devices['Desktop Chrome'],
        baseURL: 'https://opensource-demo.orangehrmlive.com',
        trace: 'retain-on-failure',
      },
    },
    {
      name: 'chromium',
      dependencies: ['setup'],
      use: {
        ...devices['Desktop Chrome'],
        baseURL: 'https://opensource-demo.orangehrmlive.com',
        storageState: 'storageState.json',
        // viewport: { width: 128, height: 720 },
        trace: 'retain-on-failure',
      },
    },
    {
      name: 'firefox',
      use: { ...devices['Desktop Firefox'] },
    },
    {
      name: 'webkit',
      use: { ...devices['Desktop Safari'] },
    },
    {
      name: 'ui',
      testMatch: ['tests/ui/**/*.spec.ts'],
      use: { ...devices['Desktop Chrome'] },
    },
    {
      name: 'splitting tests',
      testMatch: /.*secondScript.spec.ts/,
      testIgnore: /.*firstScript.spec.ts/,
      use: {
        trace: 'retain-on-failure',
      },
    },

    /* Test against mobile viewports. */
    // {
    //   name: 'Mobile Chrome',
    //   use: { ...devices['Pixel 5'] },
    // },
    // {
    //   name: 'Mobile Safari',
    //   use: { ...devices['iPhone 12'] },
    // },

    /* Test against branded browsers. */
    // {
    //   name: 'Microsoft Edge',
    //   use: { ...devices['Desktop Edge'], channel: 'msedge' },
    // },
    // {
    //   name: 'Google Chrome',
    //   use: { ...devices['Desktop Chrome'], channel: 'chrome' },
    // },
  ],

  /* Run your local dev server before starting the tests */
  // webServer: {
  //   command: 'npm run start',
  //   url: 'http://localhost:3000',
  //   reuseExistingServer: !process.env.CI,
  // },
});
