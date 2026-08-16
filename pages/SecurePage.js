import { expect } from "@playwright/test";
import { BasePage } from "./BasePage.js";

export class SecurePage extends BasePage {
  async verifyLoaded() {
    await expect(this.page).toHaveURL(/secure/);
  }
}
