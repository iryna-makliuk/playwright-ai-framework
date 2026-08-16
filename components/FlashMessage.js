import { expect } from "@playwright/test";

export class FlashMessage {
  constructor(page) {
    this.message = page.locator("#flash");
  }

  async verifyMessage(text) {
    await expect(this.message).toContainText(text);
  }
}
