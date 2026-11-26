import { test, expect } from '@playwright/test';

// full API address: the UI site and the API live on different hosts,
// so a bare '/products' would hit the wrong one
const API_URL = 'https://api.practicesoftwaretesting.com';

test('GET /products returns 200 and the first page of products', async ({ request }) => {
  const response = await request.get(`${API_URL}/products`);

  // check the status first: if it fails, the report shows the status code
  // instead of a confusing JSON parse error further down
  expect(response.status()).toBe(200);

  const body = await response.json();

  // a request with no page parameter must return page 1.
  // this is fixed by the request, unlike product names or totals, which change when the shop data changes
  expect(body.current_page).toBe(1);
});
