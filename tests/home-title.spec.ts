import { test, expect } from '@playwright/test';

test('home page has the correct title', async ({ page }) => {
  await page.goto('/');
  // checked the real title in the browser tab first
  await expect(page).toHaveTitle('Practice Software Testing - Toolshop - v5.0');
});
