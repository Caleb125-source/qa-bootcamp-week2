import { expect, type APIRequestContext } from '@playwright/test';

// Small helpers for the Toolshop cart API.
// Each one checks its own status code, so a failing call is reported where it happens
// instead of causing a confusing error later in the test.

// the API lives on a different host from the UI site, so it has its own setting in .env
const API_URL = process.env.API_URL;

export type Product = { id: string; name: string };

// Product ids change whenever the shop data is reset, so look the product up by name every time
export async function findProductByName(request: APIRequestContext, name: string): Promise<Product> {
  const response = await request.get(`${API_URL}/products/search`, { params: { q: name } });
  expect(response.status()).toBe(200);

  const products: Product[] = (await response.json()).data;
  const product = products.find(p => p.name === name);
  expect(product, `a product named "${name}" should exist in the shop`).toBeDefined();
  return product!;
}

export async function createCart(request: APIRequestContext): Promise<string> {
  const response = await request.post(`${API_URL}/carts`);
  expect(response.status()).toBe(201);

  const { id } = await response.json();
  expect(id).toBeTruthy();
  return id;
}

export async function addToCart(request: APIRequestContext, cartId: string, productId: string, quantity: number) {
  const response = await request.post(`${API_URL}/carts/${cartId}`, {
    data: { product_id: productId, quantity },
  });
  expect(response.status()).toBe(200);
}

export async function deleteCart(request: APIRequestContext, cartId: string) {
  const response = await request.delete(`${API_URL}/carts/${cartId}`);
  expect(response.status(), `cart ${cartId} should be deleted`).toBe(204);
}
