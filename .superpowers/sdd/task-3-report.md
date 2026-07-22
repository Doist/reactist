# Task 3: Display

## Implementation

- Added `Display` with required `display-1` through `display-5` variants.
- Uses `Role.div`, shared typography classes, forwarded div refs, and obfuscated class names.
- Exported from `src/display` and the root package entry.

## TDD evidence

- RED: `npm test -- src/display/display.test.tsx --runInBand` failed because `./display` was absent.
- GREEN: focused suite passes 11 tests after implementation.

## Verification

- `npm test -- src/display/display.test.tsx --runInBand` — pass, 11 tests.
- `npm run type-check` — pass.
- `npx @doist/react-compiler-tracker --check-files --show-errors src/display/display.tsx` — no new errors.

## Files

- `src/display/display.tsx`
- `src/display/display.module.css`
- `src/display/display.test.tsx`
- `src/display/index.ts`
- `src/index.ts`

## Self-review

- Checked exact typography values, Role render behavior, type exports, root export, ref forwarding, a11y, responsive typography classes, and no manual memoization.
- `git diff --check` passes.

## Concerns

None.

## Review fix

- Display now opts into the shared SF for Web font-family class (`'SF Pro Display', sans-serif`); Text and Heading retain the existing default font-family class.
- Replaced Display test-ID queries with text/role queries and retained the variant and behavior assertions.
- Moved Display metrics to component-scoped custom properties and centralized its common weight and line-height rule.

## Fix verification

- `npm test -- src/display/display.test.tsx --runInBand` — RED: 5 variant assertions failed after temporarily removing the SF/display classes; GREEN: passes after restoration.
- `npm test -- src/display/display.test.tsx src/text/text.test.tsx src/heading/heading.test.tsx --runInBand` — pass, 3 suites, 60 tests.
- `npm run type-check` — pass.
- `npx @doist/react-compiler-tracker --check-files --show-errors src/display/display.tsx` — no new errors.
- `git diff --check` — pass.

## Mapping fix

- Display now obtains `font-family-sf-for-web` from `typography.module.css`, where the class is defined, rather than from its local CSS module.
- Added a source-mapping regression test because the global CSS mock returns every property name and cannot expose a wrong CSS-module lookup.

## Mapping verification

- `npm test -- src/display/display.test.tsx --runInBand` — RED: shared CSS-module mapping assertion failed before the import fix; GREEN: pass, 1 suite, 12 tests.
- `npm run type-check` — pass.
- `npx @doist/react-compiler-tracker --check-files --show-errors src/display/display.tsx` — no new errors.
- `git diff --check` — pass.
