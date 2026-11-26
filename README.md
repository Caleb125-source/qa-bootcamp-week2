
## Week 2 Day 6 - TypeScript Basics

TypeScript basics covered today, one file per topic, in `src/ts-basics/`:

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
