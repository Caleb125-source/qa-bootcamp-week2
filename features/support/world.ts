import { World, setWorldConstructor, setDefaultTimeout, Before, After } from '@cucumber/cucumber';
import { request, expect, type APIRequestContext } from '@playwright/test';
import 'dotenv/config';

// Cucumber's default is 5 seconds per step; the shared Toolshop API can be slower than that
setDefaultTimeout(30_000);

// Cucumber creates a new World for every scenario, so one scenario never sees another's data
export class CartWorld extends World {
  api!: APIRequestContext;
  cartId?: string;
}

setWorldConstructor(CartWorld);

Before(async function (this: CartWorld) {
  if (!process.env.API_URL) {
    throw new Error('API_URL is not set. Copy .env.example to .env (see the README).');
  }
  // Playwright's API client, the same one the `request` fixture gives the Playwright tests
  this.api = await request.newContext({ baseURL: process.env.API_URL });
});

// After runs even when a step fails, so a failing scenario still removes its cart
After(async function (this: CartWorld) {
  try {
    if (this.cartId) {
      const response = await this.api.delete(`/carts/${this.cartId}`);
      expect(response.status(), `cart ${this.cartId} should be deleted`).toBe(204);
    }
  } finally {
    await this.api.dispose();
  }
});
