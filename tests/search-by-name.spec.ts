import { test, expect } from '@playwright/test';
import { HomePage } from '../pages/home.page';

test('Searching by name shows only matching products', async ({ page }) => {
  const homePage = new HomePage(page);

  await homePage.goto();
  await homePage.searchFor('pliers');

  await expect(homePage.searchCaption).toHaveText('Searched for: pliers');

  // the results can update a moment after the caption appears, so keep checking until they match.
  // the length check stops the test passing on an empty list
  await expect.poll(async () => {
    const names = await homePage.getProductNames();
    return names.length > 0 && names.every(name => name.toLowerCase().includes('pliers'));
  }, { message: 'every product name should contain "pliers"' }).toBe(true);
});
