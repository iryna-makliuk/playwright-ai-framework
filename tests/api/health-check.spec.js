import { test } from "../../fixtures/api.fixture.js";
import { expect } from "@playwright/test";
import { simpleResponseSchema } from "../../utils/schemas.js";
import { assertMatchesSchema } from "../../utils/validateSchema.js";

test("API health check", async ({ apiRequest }) => {
  const response = await apiRequest.get("health-check");

  expect(response.status()).toBe(200);
  expect(response.headers()["content-type"]).toContain("application/json");

  const body = await response.json();
  assertMatchesSchema(body, simpleResponseSchema);

  expect(body.success).toBe(true);
  expect(body.status).toBe(200);
  expect(body.message).toBe("Notes API is Running");
});
