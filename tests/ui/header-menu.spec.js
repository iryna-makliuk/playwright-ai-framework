import { expect } from "@playwright/test";
import { test } from "../../fixtures/pages.fixture.js";

const topLevelLinks = [
  { name: "Tools", urlPattern: /\/#tools$/ },
  { name: "Tips", urlPattern: /\/tips$/ },
  { name: "Test Cases", urlPattern: /\/test-cases$/ },
  { name: "API Testing", urlPattern: /\/notes\/api\/api-docs\/?$/ },
  { name: "About", urlPattern: /\/about$/ },
];

const demosDropdownItems = [
  { name: "Examples", href: "/#examples" },
  { name: "Apps", href: "/#apps" },
  { name: "APIs", href: "/#api" },
  { name: "Assertions", href: "/#assertions" },
  { name: "Reports", href: "/#reports" },
];

// The site serves Google AdSense, including full-page "vignette" interstitial
// ads that can hijack a click mid-navigation (observed redirecting a menu
// click to /#google_vignette instead of its real target). Blocking the ad
// and tracking domains keeps navigation clicks deterministic.
test.beforeEach(async ({ page }) => {
  await page.route(
    /googlesyndication\.com|doubleclick\.net|googletagmanager\.com|google-analytics\.com|googleadservices\.com|analytics\.google\.com/,
    (route) => route.abort()
  );
});

test("logo links back to the homepage", async ({ homePage }) => {
  await homePage.open();

  await expect(homePage.headerMenu.logo).toBeVisible();
  await expect(homePage.headerMenu.logo).toHaveAttribute("href", "/");
});

for (const { name, urlPattern } of topLevelLinks) {
  test(`"${name}" navigates to the right page`, async ({ homePage }) => {
    await homePage.open();

    await homePage.headerMenu.navLink(name).click();

    await expect(homePage.page).toHaveURL(urlPattern);
  });
}

test("Demos dropdown expands and lists every item with the right link", async ({
  homePage,
}) => {
  await homePage.open();

  await expect(homePage.headerMenu.demosDropdownMenu).toBeHidden();
  await expect(homePage.headerMenu.demosDropdownToggle).toHaveAttribute(
    "aria-expanded",
    "false"
  );

  await homePage.headerMenu.openDemosDropdown();

  await expect(homePage.headerMenu.demosDropdownMenu).toBeVisible();
  await expect(homePage.headerMenu.demosDropdownToggle).toHaveAttribute(
    "aria-expanded",
    "true"
  );

  for (const { name, href } of demosDropdownItems) {
    await expect(homePage.headerMenu.demosDropdownItem(name)).toHaveAttribute(
      "href",
      href
    );
  }
});

test("clicking a Demos dropdown item navigates there", async ({
  homePage,
}) => {
  await homePage.open();

  await homePage.headerMenu.openDemosDropdown();
  await homePage.headerMenu.demosDropdownItem("Examples").click();

  await expect(homePage.page).toHaveURL(/\/#examples$/);
});

test("Free ISTQB Mock Exams points off-site without navigating there", async ({
  homePage,
}) => {
  await homePage.open();

  await expect(homePage.headerMenu.istqbLink).toHaveAttribute(
    "href",
    "https://istqb.expandtesting.com/"
  );
});

test("menu is collapsed by default and opens via the toggle on small viewports", async ({
  homePage,
}) => {
  await homePage.page.setViewportSize({ width: 500, height: 800 });
  await homePage.open();

  await expect(homePage.headerMenu.mobileMenu).toBeHidden();

  await homePage.headerMenu.openMobileMenu();

  await expect(homePage.headerMenu.mobileMenu).toBeVisible();
  for (const { name } of topLevelLinks) {
    await expect(homePage.headerMenu.navLink(name)).toBeVisible();
  }
});
