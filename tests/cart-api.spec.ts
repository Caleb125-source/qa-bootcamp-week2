import { test, expect } from '@playwright/test';

// full API address: the UI site and the API live on different hosts
const API_URL = 'https://api.practicesoftwaretesting.com';

// the id of the cart the current test created, so afterEach can remove it.
// tests in one file run one after another in the same worker, and beforeEach resets it,
// so one test never sees another test's cart
let cartId: string | undefined;

test.beforeEach(() => {
  cartId = undefined;
});

// afterEach runs even when a check in the test fails,
// so a failing test still cleans up the shared Toolshop site
test.afterEach(async ({ request }) => {
  if (!cartId) return;

  const response = await request.delete(`${API_URL}/carts/${cartId}`);
  expect(response.status(), `cart ${cartId} should be deleted`).toBe(204);
});

test('POST /carts creates a cart and a product can be added to it', async ({ request }) => {
  // take a real product from the shop instead of hard-coding an id:
  // the shop data is reseeded, and ids change when it is
  const productsResponse = await request.get(`${API_URL}/products`);
  expect(productsResponse.status()).toBe(200);
  const product = (await productsResponse.json()).data[0];

  // create the cart
  const createResponse = await request.post(`${API_URL}/carts`);
  expect(createResponse.status()).toBe(201);
  cartId = (await createResponse.json()).id;
  expect(cartId).toBeTruthy();

  // add the product
  const addResponse = await request.post(`${API_URL}/carts/${cartId}`, {
    data: { product_id: product.id, quantity: 2 },
  });
  expect(addResponse.status()).toBe(200);
  expect(await addResponse.json()).toEqual({ result: 'item added or updated' });

  // read the cart back and check the fields this test controls
  const cartResponse = await request.get(`${API_URL}/carts/${cartId}`);
  expect(cartResponse.status()).toBe(200);
  const cart = await cartResponse.json();

  expect(cart.id).toBe(cartId);
  expect(cart.cart_items).toHaveLength(1);
  expect(cart.cart_items[0]).toMatchObject({
    cart_id: cartId,
    product_id: product.id,
    quantity: 2,
  });
  expect(cart.cart_items[0].product.name).toBe(product.name);
});

test('GET /carts/{id} returns 404 for a cart that does not exist', async ({ request }) => {
  // this test creates nothing, so cartId stays undefined and afterEach has nothing to delete
  const response = await request.get(`${API_URL}/carts/cart-id-that-does-not-exist`);

  expect(response.status()).toBe(404);
  expect(await response.json()).toEqual({ message: 'Requested item not found' });
});
