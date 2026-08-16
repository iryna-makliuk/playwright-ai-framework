import { test as base, request } from "@playwright/test";
import { config } from "../config/config.js";

export const test = base.extend({
  apiRequest: async ({}, use) => {
    const apiContext = await request.newContext({
      baseURL: config.api.baseUrl,
    });
    await use(apiContext);
    await apiContext.dispose();
  },
});
