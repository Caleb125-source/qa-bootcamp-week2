import { Given, When, Then } from '@cucumber/cucumber';
import { expect, type APIRequestContext } from '@playwright/test';
import { CartWorld } from '../support/world';

// Product ids change whenever the shop data is reset, so steps name products
// and this looks the id up each time
async function findProductByName(api: APIRequestContext, name: string) {
  const response = await api.get('/products/search', { params: { q: name } });
  expect(response.status()).toBe(200);
  const products: { id: string; name: string }[] = (await response.json()).data;

  const product = products.find(p => p.name === name);
  if (!product) throw new Error(`No product named "${name}" in the shop`);
  return product;
}

Given('the shopper has an empty cart', async function (this: CartWorld) {
  const response = await this.api.post('/carts');
  expect(response.status()).toBe(201);
  this.cartId = (await response.json()).id;
});

When('the shopper adds {int} {string} to the cart',
  async function (this: CartWorld, quantity: number, productName: string) {
    const product = await findProductByName(this.api, productName);

    const response = await this.api.post(`/carts/${this.cartId}`, {
      data: { product_id: product.id, quantity },
    });
    expect(response.status()).toBe(200);
  });

Then('the cart holds {int} {string} and nothing else',
  async function (this: CartWorld, quantity: number, productName: string) {
    const response = await this.api.get(`/carts/${this.cartId}`);
    expect(response.status()).toBe(200);
    const cart = await response.json();

    expect(cart.cart_items).toHaveLength(1);
    expect(cart.cart_items[0].product.name).toBe(productName);
    expect(cart.cart_items[0].quantity).toBe(quantity);
  });
