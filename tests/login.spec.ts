import { test, expect } from '@playwright/test';

test('invalid login shows an error message', async ({ page }) => {
  await page.goto('/auth/login');
  await page.getByRole('textbox', { name: 'Email address' }).fill('wrong@example.com');

  // the label is "Password *" - plain 'Password' also matched the "Forgot your Password?" link
  await page.getByRole('textbox', { name: 'Password *' }).fill('wrongpassword');
  await page.getByRole('button', { name: 'Login' }).click();

  // the error is just text on the page with no role, so getByText it is
  await expect(page.getByText('Invalid email or password')).toBeVisible();
});
