import { test, expect } from '@playwright/test';

test('search for pliers only returns pliers', async ({ page }) => {
  await page.goto('https://practicesoftwaretesting.com/');

  // the search box is a plain textbox, not a searchbox, so getByRole('searchbox') won't find it
  await page.getByRole('textbox', { name: 'Search' }).fill('pliers');
  await page.getByRole('button', { name: 'Search' }).click();

  // each product card shows its name as an h5
  const productNames = page.getByRole('heading', { level: 5 });

  // results load after the search, so keep retrying until every name has "pliers"
  // (the length check stops it passing on an empty list)
  await expect.poll(async () => {
    const names = await productNames.allTextContents();
    return names.length > 0 && names.every(name => name.toLowerCase().includes('pliers'));
  }).toBe(true);
});
