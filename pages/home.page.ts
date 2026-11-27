import { type Page, type Locator } from '@playwright/test';

// The Toolshop home page: the product list and the search box on it.
// Locators live here so tests never need to know how the page is built.
export class HomePage {
  readonly page: Page;
  readonly searchInput: Locator;
  readonly searchButton: Locator;
  readonly searchCaption: Locator;
  readonly productNames: Locator;

  constructor(page: Page) {
    this.page = page;
    // data-test attributes are added for testing, so they don't change when the design does
    this.searchInput = page.locator('[data-test="search-query"]');
    this.searchButton = page.locator('[data-test="search-submit"]');
    this.searchCaption = page.locator('[data-test="search-caption"]');
    this.productNames = page.locator('[data-test="product-name"]');
  }

  async goto() {
    await this.page.goto('/');
  }

  async searchFor(term: string) {
    await this.searchInput.fill(term);
    await this.searchButton.click();
  }

  // product names as plain text, with the extra spaces around them removed
  async getProductNames(): Promise<string[]> {
    const names = await this.productNames.allTextContents();
    return names.map(name => name.trim());
  }
}
