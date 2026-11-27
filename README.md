# QA Bootcamp Week 2: Toolshop test suite

Playwright UI and API tests for the [Toolshop practice site](https://practicesoftwaretesting.com), built up over Week 2, Day 6 to Day 10.

To set up and run the suite, see [Run the tests](#run-the-tests) at the end.

## Day 6 (Monday): TypeScript basics

One file per topic, in `src/ts-basics/`:

- `firstProgram.ts` - type annotations and type inference
- `function.ts` - typed parameters, return types, default and optional parameters
- `object.ts` - object types, `readonly` and optional properties
- `aliases.ts` - type aliases for reusable object shapes
- `union.ts` - union types and narrowing with `typeof`
- `tuples.ts` - fixed-length typed arrays and destructuring
- `optionalchain.ts` - optional chaining (`?.`) and nullish coalescing (`??`)

`src/profile-validator.ts` uses `?.` and `??` to safely read a user's notification setting when `settings` or `notifications` may be missing.

Run a file, or type-check the whole project:

    npx tsx src/ts-basics/<file name>
    npx tsx src/profile-validator.ts
    npx tsc --noEmit

## Day 7 (Tuesday): first Playwright UI tests

| File | Type | What it checks |
|---|---|---|
| `tests/home-title.spec.ts` | UI | The home page has the right title |
| `tests/login.spec.ts` | UI | A wrong email and password shows an error |
| `tests/search.spec.ts` | UI | Searching for "pliers" only returns pliers |

## Day 8 (Wednesday): page object and first API test

| File | Type | What it checks |
|---|---|---|
| `tests/search-by-name.spec.ts` | UI | Searching for "pliers" only returns pliers, using the `HomePage` page object |
| `tests/products-api.spec.ts` | API | `GET /products` returns 200 and page 1 |

Supporting files:

- `pages/home.page.ts`: the `HomePage` page object. It holds the locators for the search box, search caption and product names, so tests don't need to know how the page is built.

## Day 9 (Thursday): cart API tests, one suite, Cucumber-js

| File | Type | What it checks |
|---|---|---|
| `tests/cart-api.spec.ts` | API | A product added to a new cart shows up in the cart |
| `tests/cart-api.spec.ts` | API | A cart id that doesn't exist returns 404 |
| `features/cart.feature` | BDD (Cucumber-js) | A shopper adds 2 Combination Pliers to an empty cart and the cart holds only them |

Every cart a test creates is deleted afterwards, even if the test fails.

Supporting files:

- `playwright.config.ts` and `.env.example`: put all the tests in one suite that runs with `npm test`, reading the site and API addresses from `.env`.
- `features/step_definitions/cart.steps.ts`: connects each Given / When / Then line in `cart.feature` to code.
- `features/support/world.ts`: gives each scenario its own state, and deletes the scenario's cart afterwards.

## Day 10 (Friday): top two test cases, automated

The two cases chosen as "automate now" from my Week 1 Toolshop test cases, plus C5, named by case ID:

| File | Type | What it checks |
|---|---|---|
| `tests/c1-search-by-name.spec.ts` | UI | **C1 Search by name:** searching for "pliers" shows exactly 4 results, all pliers, and removes the other products |
| `tests/c4-add-to-cart.spec.ts` | API | **C4 Add to cart:** the cart holds exactly the product and quantity added |
| `tests/c4-add-to-cart.spec.ts` | API | **C5 Unknown cart:** a cart id that doesn't exist returns 404 and `Requested item not found` |

Every check uses `expect`, no test uses a fixed wait, and C4 deletes its cart afterwards, even if the test fails.

Supporting files:

- `pages/home.page.ts`: the Day 8 `HomePage` page object, reused by C1.
- `helpers/cart-api.ts`: small cart helpers used by C4 (find a product by name, create, add to and delete a cart). Each one checks its own status code.

C1 covers everything `search.spec.ts` (Day 7) and `search-by-name.spec.ts` (Day 8) check, and more. The two older tests stay as earlier deliverables, and can be removed once they're no longer needed.

## Run the tests

You need Node.js 20 or newer (check with `node -v`).

1. Install the dependencies and the browser:

       npm install
       npx playwright install chromium

2. Copy the settings file:

       cp .env.example .env

3. Run the tests:

       npm test

All 10 tests should pass. The defaults in `.env` point at the public Toolshop site, so you don't need to change anything. `.env` holds two settings: `BASE_URL` for the website and `API_URL` for the API, which lives on a different host.

If any tests fail, run `npx playwright show-report` to see what happened, including a trace for each failing test.

To run the Cucumber scenario from Day 9:

    npm run test:bdd
