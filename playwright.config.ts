import { defineConfig, devices } from '@playwright/test';
// load BASE_URL and API_URL from .env (copied from .env.example)
import 'dotenv/config';

// stop straight away with a clear message, instead of every test failing on a bad URL
for (const name of ['BASE_URL', 'API_URL']) {
  if (!process.env[name]) {
    throw new Error(`${name} is not set. Copy .env.example to .env (see the README).`);
  }
}

export default defineConfig({
  testDir: './tests',
  reporter: [['list'], ['html', { open: 'never' }]],
  use: {
    // UI tests call page.goto('/...') and Playwright adds this in front
    baseURL: process.env.BASE_URL,
    // keep a trace only when a test fails, ready for the trace viewer
    trace: 'retain-on-failure',
  },
  // the README only installs Chromium, so only run Chromium
  projects: [{ name: 'chromium', use: { ...devices['Desktop Chrome'] } }],
});
