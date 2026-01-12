
const {defineConfig} = require ('@playwright/test');

export default defineConfig({
  timeout: 60000,
  use: {
    headless: true,
    screenshot: 'only-on-failure',
    trace: 'on-first-retry'
  }
});
