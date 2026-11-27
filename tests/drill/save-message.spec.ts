import { test, expect } from '@playwright/test';
import path from 'path';
import { pathToFileURL } from 'url';

// the trainer's drill page lives next to this test, so build a file:// URL from this folder
const DRILL_PAGE = pathToFileURL(path.join(__dirname, 'index.html')).href;

// UNFIXED on purpose: this is the flaky version of the drill.
// The page shows "Saved" after a random delay of 0 to 1000 ms.
// Waiting a fixed 500 ms and reading the message once should pass about half the time.
test('Save shows the Saved message', async ({ page }) => {
  await page.goto(DRILL_PAGE);
  await page.getByRole('button', { name: 'Save' }).click();

  // fixed wait: guesses how long the page needs, instead of waiting for the message
  await page.waitForTimeout(500);

  // read the message once, then a plain check that doesn't retry
  const message = await page.locator('#status').textContent();
  expect(message).toBe('Saved');
});
