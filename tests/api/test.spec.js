import { test } from "../../fixtures/api.fixture.js";
import { expect } from "@playwright/test";

test("API health check", async ({ apiRequest }) => {
  const response = await apiRequest.get("health-check");

  expect(response.status()).toBe(200);

  const body = await response.json();

  expect(body.success).toBe(true);
  expect(body.status).toBe(200);
  expect(body.message).toBe("Notes API is Running");
});
