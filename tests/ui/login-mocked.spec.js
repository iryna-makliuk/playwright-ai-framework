import { test } from "../../fixtures/pages.fixture.js";
import { invalidUsers } from "../../data/users.js";

// The real login page is a server-rendered form that POSTs to /authenticate
// (no fetch/XHR involved), so both requests need mocking for this test to be
// fully independent of the live site being reachable.
const loginPageHtml = `<!doctype html>
<html>
  <body>
    <form id="login" action="/authenticate" method="post">
      <input type="text" id="username" name="username" />
      <input type="password" id="password" name="password" />
      <button type="submit">Login</button>
    </form>
  </body>
</html>`;

const [invalidUsernameCase] = invalidUsers;

test("invalid login shows the error message without depending on the live site", async ({
  page,
  loginPage,
}) => {
  await page.route("**/login", (route) =>
    route.fulfill({ contentType: "text/html", body: loginPageHtml })
  );

  await page.route("**/authenticate", (route) =>
    route.fulfill({
      contentType: "text/html",
      body: `<div id="flash">${invalidUsernameCase.expectedMessage} ×</div>`,
    })
  );

  await loginPage.open();
  await loginPage.login(invalidUsernameCase.credentials);
  await loginPage.verifyLoginError(invalidUsernameCase.expectedMessage);
});
