import { chromium, FullConfig } from "@playwright/test";
import { POManager } from "../../ui/pages/poManager";
import loginCredentials from "../../../testData/testUsers";

async function globalSetup(config: FullConfig) {
  const { baseURL, storageState } = config.projects[0].use;
  const browser = await chromium.launch({ headless: true, timeout: 10000 });
  const page = await browser.newPage();

  const po = new POManager(page);
  await page.goto(baseURL!);
  const loginPage = po.getLoginPage();
  // await po.getLoginPage().open();
  await loginPage.login(loginCredentials.username, loginCredentials.password);
  await page.context().storageState({ path: storageState as string });
  await browser.close();
}

export default globalSetup;