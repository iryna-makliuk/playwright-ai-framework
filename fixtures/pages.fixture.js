import fs from "fs";
import path from "path";
import { test as base } from "@playwright/test";
import { LoginPage } from "../pages/LoginPage.js";
import { SecurePage } from "../pages/SecurePage.js";
import { HomePage } from "../pages/HomePage.js";
import { users } from "../data/users.js";

export const test = base.extend({
  loginPage: async ({ page }, use) => {
    await use(new LoginPage(page));
  },

  homePage: async ({ page }, use) => {
    await use(new HomePage(page));
  },

  // Logs in once per worker via the UI, then caches the session so
  // `securePage` never has to repeat the login form on later tests.
  authStorageStatePath: [
    async ({ browser }, use, workerInfo) => {
      const fileName = path.join(
        "playwright",
        ".auth",
        `${workerInfo.parallelIndex}.json`
      );

      if (fs.existsSync(fileName)) {
        await use(fileName);
        return;
      }

      const page = await browser.newPage();
      const loginPage = new LoginPage(page);
      await loginPage.open();
      const securePage = await loginPage.login(users.standard);
      await securePage.verifyLoaded();

      await fs.promises.mkdir(path.dirname(fileName), { recursive: true });
      await page.context().storageState({ path: fileName });
      await page.close();

      await use(fileName);
    },
    { scope: "worker" },
  ],

  // Ready-to-use SecurePage, already authenticated — no UI login required.
  securePage: async ({ browser, authStorageStatePath }, use) => {
    const context = await browser.newContext({
      storageState: authStorageStatePath,
    });
    const page = await context.newPage();

    const securePage = new SecurePage(page);
    await securePage.open();

    await use(securePage);

    await context.close();
  },
});
