import { test as base } from "@playwright/test";
import { LoginPage } from "../pages/LoginPage.js";

export const test = base.extend({
  loginPage: async ({ page }, use) => {
    await use(new LoginPage(page));
  },
});
