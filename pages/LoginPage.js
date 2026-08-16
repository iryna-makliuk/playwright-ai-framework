import { expect } from "@playwright/test";
import { BasePage } from "./BasePage.js";
import { SecurePage } from "./SecurePage.js";
import { FlashMessage } from "../components/FlashMessage.js";

export class LoginPage extends BasePage {
  constructor(page) {
    super(page);

    this.flashMessage = new FlashMessage(page);

    this.usernameInput = page.locator("#username");
    this.passwordInput = page.locator("#password");
    this.loginButton = page.getByRole("button", { name: "Login" });
  }

  async open() {
    await this.page.goto("/login");
  }

  async login(user) {
    await this.usernameInput.fill(user.username);
    await this.passwordInput.fill(user.password);
    await this.loginButton.click();

    return new SecurePage(this.page);
  }

  async verifyLoginError(message) {
    await this.flashMessage.verifyMessage(message);
  }
}
