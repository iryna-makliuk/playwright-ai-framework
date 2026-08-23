export class HeaderMenu {
  constructor(page) {
    this.page = page;

    // Link text like "Tools", "Tips" and "API Testing" also appears elsewhere
    // on the homepage, so every locator here is scoped to the nav itself.
    this.nav = page.locator("header.main-navbar nav");

    this.logo = this.nav.getByRole("link", { name: "SUT" });
    this.demosDropdownToggle = this.nav.locator("#examples-dropdown");
    this.demosDropdownMenu = this.nav.locator(
      ".dropdown-menu[aria-labelledby='examples-dropdown']"
    );
    this.toolsLink = this.nav.getByRole("link", { name: "Tools" });
    this.tipsLink = this.nav.getByRole("link", { name: "Tips" });
    this.testCasesLink = this.nav.getByRole("link", { name: "Test Cases" });
    this.apiTestingLink = this.nav.getByRole("link", { name: "API Testing" });
    this.aboutLink = this.nav.getByRole("link", { name: "About" });
    this.istqbLink = this.nav.getByRole("link", {
      name: "Free ISTQB Mock Exams",
    });

    this.mobileToggle = this.nav.locator(".navbar-toggler");
    this.mobileMenu = page.locator("#main-navbar");
  }

  navLink(name) {
    return this.nav.getByRole("link", { name });
  }

  async openDemosDropdown() {
    await this.demosDropdownToggle.click();
  }

  demosDropdownItem(name) {
    return this.demosDropdownMenu.getByRole("link", { name });
  }

  async openMobileMenu() {
    await this.mobileToggle.click();
  }
}
