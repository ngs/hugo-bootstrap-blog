// @ts-check
const { defineConfig, devices } = require("@playwright/test");

/**
 * CI-specific configuration that doesn't start its own server
 * @see https://playwright.dev/docs/test-configuration
 */
module.exports = defineConfig({
  testDir: "./tests",
  fullyParallel: false,
  forbidOnly: true,
  retries: 2,
  workers: 1,
  reporter: "list",
  use: {
    baseURL: "http://localhost:1313",
    trace: "on-first-retry",
    ignoreHTTPSErrors: true,
  },

  projects: [
    {
      name: "screenshot",
      use: {
        ...devices["Desktop Chrome"],
        viewport: { width: 1200, height: 800 },
        launchOptions: {
          args: ['--no-sandbox', '--disable-setuid-sandbox', '--disable-dev-shm-usage']
        },
      },
    },
    {
      name: "mobile-screenshot",
      use: {
        ...devices["iPhone 12"],
        launchOptions: {
          args: ['--no-sandbox', '--disable-setuid-sandbox', '--disable-dev-shm-usage']
        },
      },
    },
  ],

  // No webServer config - server is started externally in CI
});