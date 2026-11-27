# QA Bootcamp Week 2: Toolshop test suite

Playwright UI and API tests for the [Toolshop practice site](https://practicesoftwaretesting.com).

## Run the tests

You need Node.js 20 or newer (check with `node -v`).

1. Install the dependencies and the browser:

       npm install
       npx playwright install chromium

2. Copy the settings file:

       cp .env.example .env

3. Run the tests:

       npm test

All 7 tests should pass. The defaults in `.env` point at the public Toolshop site, so you don't need to change anything.

If any tests fail, run `npx playwright show-report` to see what happened, including a trace for each failing test.

## What's in the suite

| File | Type | What it checks |
|---|---|---|
| `tests/home-title.spec.ts` | UI | The home page has the right title |
| `tests/login.spec.ts` | UI | A wrong email and password shows an error |
| `tests/search.spec.ts` | UI | Searching for "pliers" only returns pliers |
| `tests/search-by-name.spec.ts` | UI, page object | The same search, using the `HomePage` page object in `pages/` |
| `tests/products-api.spec.ts` | API | `GET /products` returns 200 and page 1 |
| `tests/cart-api.spec.ts` | API | Creating a cart and adding a product; a missing cart returns 404. Every cart a test creates is deleted afterwards, even if the test fails |

`.env` holds two settings: `BASE_URL` for the website and `API_URL` for the API, which lives on a different host.

## Cucumber-js scenario (BDD)

`features/cart.feature` describes a cart flow in plain English (Given / When / Then). Each line is connected to a step definition in `features/step_definitions/cart.steps.ts`. After the same setup as above, run it with:

    npm run test:bdd

The scenario creates its own cart through the API, and an `After` hook in `features/support/world.ts` deletes it, even if a step fails.

## TypeScript basics

TypeScript basics covered on day 6, one file per topic, in `src/ts-basics/`:

- `firstProgram.ts` - type annotations and type inference
- `function.ts` - typed parameters, return types, default and optional parameters
- `object.ts` - object types, `readonly` and optional properties
- `aliases.ts` - type aliases for reusable object shapes
- `union.ts` - union types and narrowing with `typeof`
- `tuples.ts` - fixed-length typed arrays and destructuring
- `optionalchain.ts` - optional chaining (`?.`) and nullish coalescing (`??`)

`src/profile-validator.ts` uses `?.` and `??` to safely read a user's notification setting when `settings` or `notifications` may be missing.

### Running the files

    npx tsx src/ts-basics/<file name>
    npx tsx src/profile-validator.ts

`tsx` doesn't check types. To type-check everything:

    npx tsc --noEmit
