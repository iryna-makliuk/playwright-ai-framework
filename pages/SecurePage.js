import { expect } from "@playwright/test";
import { BasePage } from "./BasePage.js";

export class SecurePage extends BasePage {
  async open() {
    await this.page.goto("/secure");
  }

  async verifyLoaded() {
    await expect(this.page).toHaveURL(/secure/);
  }
}
