import { test } from "../../fixtures/api.fixture.js";
import { expect } from "@playwright/test";
import { generateNewUser } from "../../data/users.js";

test("successful registration", async ({ apiRequest }) => {
  const user = generateNewUser();

  const response = await apiRequest.post("users/register", { data: user });

  expect(response.status()).toBe(201);

  const body = await response.json();
  expect(body.success).toBe(true);
  expect(body.status).toBe(201);
  expect(body.message).toBe("User account created successfully");
  expect(body.data.name).toBe(user.name);
  expect(body.data.email).toBe(user.email);
  expect(body.data.id).toBeTruthy();
});

test("fails to register with an already used email", async ({ apiRequest }) => {
  const user = generateNewUser();
  await apiRequest.post("users/register", { data: user });

  const response = await apiRequest.post("users/register", { data: user });

  expect(response.status()).toBe(409);

  const body = await response.json();
  expect(body.success).toBe(false);
  expect(body.message).toBe(
    "An account already exists with the same email address"
  );
});

test("fails to register with a password that is too short", async ({
  apiRequest,
}) => {
  const user = generateNewUser();

  const response = await apiRequest.post("users/register", {
    data: { ...user, password: "123" },
  });

  expect(response.status()).toBe(400);

  const body = await response.json();
  expect(body.success).toBe(false);
  expect(body.message).toBe("Password must be between 6 and 30 characters");
});

test("fails to register without an email", async ({ apiRequest }) => {
  const user = generateNewUser();

  const response = await apiRequest.post("users/register", {
    data: { name: user.name, password: user.password },
  });

  expect(response.status()).toBe(400);

  const body = await response.json();
  expect(body.success).toBe(false);
  expect(body.message).toBe("A valid email address is required");
});
