import { test } from "../../fixtures/api.fixture.js";
import { expect } from "@playwright/test";

test("test api - get request", async ({ request }) => {
  const response = await request.get("/health-check");

  await expect(response.status).toBe(200);
  const body = response.json();

  await expect(body.status).toBe(200);
  await expect(body.message).toBe("Notes API is Running");
});
