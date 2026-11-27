import { test, expect } from '@playwright/test';
import { findProductByName, createCart, addToCart, deleteCart } from '../helpers/cart-api';

const API_URL = process.env.API_URL;

// the id of the cart the current test created, so afterEach can remove it.
// beforeEach resets it, so one test never sees another test's cart
let cartId: string | undefined;

test.beforeEach(() => {
  cartId = undefined;
});

// afterEach runs even when a check fails, so a failing test still leaves nothing behind
test.afterEach(async ({ request }) => {
  if (cartId) await deleteCart(request, cartId);
});

test('C4 Add to cart', async ({ request }) => {
  const product = await findProductByName(request, 'Combination Pliers');

  cartId = await createCart(request);
  await addToCart(request, cartId, product.id, 2);

  // read the cart back: a 200 from the add call isn't enough,
  // the cart must hold this exact product in the quantity that was added
  const response = await request.get(`${API_URL}/carts/${cartId}`);
  expect(response.status()).toBe(200);
  const cart = await response.json();

  expect(cart.id).toBe(cartId);
  expect(cart.cart_items).toHaveLength(1);
  expect(cart.cart_items[0]).toMatchObject({
    product_id: product.id,
    quantity: 2,
    product: { name: 'Combination Pliers' },
  });
});

test('C5 Unknown cart', async ({ request }) => {
  // this test creates nothing, so cartId stays undefined and afterEach has nothing to delete
  const response = await request.get(`${API_URL}/carts/cart-id-that-does-not-exist`);

  expect(response.status()).toBe(404);
  expect(await response.json()).toEqual({ message: 'Requested item not found' });
});
