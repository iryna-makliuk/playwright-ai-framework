import { test } from "../../fixtures/pages.fixture.js";
import { invalidUsers, users } from "../../data/users.js";

test("successful login", async ({ loginPage }) => {
  await loginPage.open();

  const securePage = await loginPage.login(users.standard);
  await securePage.verifyLoaded();
});

for (const user of invalidUsers) {
  test(`invalid login - ${user.name}`, async ({ loginPage }) => {
    await loginPage.open();

    await loginPage.login(user.credentials);
    await loginPage.verifyLoginError(user.expectedMessage);
  });
}
