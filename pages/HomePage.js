import { BasePage } from "./BasePage.js";
import { HeaderMenu } from "../components/HeaderMenu.js";

export class HomePage extends BasePage {
  constructor(page) {
    super(page);
    this.headerMenu = new HeaderMenu(page);
  }

  async open() {
    await this.page.goto("/");
  }
}
