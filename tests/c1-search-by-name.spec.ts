import { test, expect } from '@playwright/test';
import { HomePage } from '../pages/home.page';

test('C1 Search by name', async ({ page }) => {
  const homePage = new HomePage(page);

  await homePage.goto();

  // before searching, the list includes products that are not pliers.
  // the check after the search can then only pass if the search really changed the list
  await expect(homePage.productNames.filter({ hasNotText: /pliers/i }).first()).toBeVisible();

  await homePage.searchFor('pliers');

  await expect(homePage.searchCaption).toHaveText('Searched for: pliers');

  // the "pliers" search returns 4 products, all on one page, so this checks every result, not a sample.
  // an array of patterns checks the count and each name at once, and keeps retrying until the results load
  await expect(homePage.productNames).toHaveText([/pliers/i, /pliers/i, /pliers/i, /pliers/i]);
});
