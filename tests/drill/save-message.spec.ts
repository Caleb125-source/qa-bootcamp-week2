import { test, expect } from '@playwright/test';
import path from 'path';
import { pathToFileURL } from 'url';

// the trainer's drill page lives next to this test, so build a file:// URL from this folder
const DRILL_PAGE = pathToFileURL(path.join(__dirname, 'index.html')).href;

// FIXED: the page shows "Saved" after a random delay of 0 to 1000 ms.
// The unfixed version waited a fixed 500 ms and read the message once, so it failed
// whenever the delay was longer (11 of 20 passed). It now waits for the message itself.
test('Save shows the Saved message', async ({ page }) => {
  await page.goto(DRILL_PAGE);
  await page.getByRole('button', { name: 'Save' }).click();

  // UNFIXED version, kept for comparison. Flaky: passed 11 of 20 runs.
  // // fixed wait: guesses how long the page needs, instead of waiting for the message
  // await page.waitForTimeout(500);
  //
  // // read the message once, then a plain check that doesn't retry
  // const message = await page.locator('#status').textContent();
  // expect(message).toBe('Saved');

  // FIX: web-first assertion: checks again and again until the text is "Saved" (up to 5 seconds),
  // so it moves on as soon as the message appears, however long the page takes within that time
  await expect(page.locator('#status')).toHaveText('Saved');
});
