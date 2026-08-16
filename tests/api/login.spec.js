import { test } from "../../fixtures/api.fixture.js";
import { expect } from "@playwright/test";
import { generateNewUser } from "../../data/users.js";

test("successful login", async ({ apiRequest }) => {
  const user = generateNewUser();
  await apiRequest.post("users/register", { data: user });

  const response = await apiRequest.post("users/login", {
    data: { email: user.email, password: user.password },
  });

  expect(response.status()).toBe(200);

  const body = await response.json();
  expect(body.success).toBe(true);
  expect(body.status).toBe(200);
  expect(body.message).toBe("Login successful");
  expect(body.data.email).toBe(user.email);
  expect(body.data.token).toBeTruthy();
});

test("fails to login with an incorrect password", async ({ apiRequest }) => {
  const user = generateNewUser();
  await apiRequest.post("users/register", { data: user });

  const response = await apiRequest.post("users/login", {
    data: { email: user.email, password: "WrongPassword123!" },
  });

  expect(response.status()).toBe(401);

  const body = await response.json();
  expect(body.success).toBe(false);
  expect(body.message).toBe("Incorrect email address or password");
});

test("fails to login with an unregistered email", async ({ apiRequest }) => {
  const user = generateNewUser();

  const response = await apiRequest.post("users/login", {
    data: { email: user.email, password: user.password },
  });

  expect(response.status()).toBe(401);

  const body = await response.json();
  expect(body.success).toBe(false);
  expect(body.message).toBe("Incorrect email address or password");
});

test("fails to login without a password", async ({ apiRequest }) => {
  const user = generateNewUser();
  await apiRequest.post("users/register", { data: user });

  const response = await apiRequest.post("users/login", {
    data: { email: user.email },
  });

  expect(response.status()).toBe(400);

  const body = await response.json();
  expect(body.success).toBe(false);
  expect(body.message).toBe("Password must be between 6 and 30 characters");
});
