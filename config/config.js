export const config = {
  baseURL: "https://practice.expandtesting.com",
  api: {
    baseUrl: "https://practice.expandtesting.com/notes/api/",
  },
  browser: {
    name: "chromium",
    headless: true,
    slowMo: 0,
  },
  timeouts: {
    test: 30000,
    expect: 5000,
  },
  retries: 1,
};
