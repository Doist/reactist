# Reactist

React component library (`@doist/reactist`) - accessible UI components for Doist products.

## Commands

```bash
npm test                   # Run Jest tests
npm run test:watch         # Jest in watch mode
npm run lint               # ESLint
npm run type-check         # TypeScript type checking
npm run validate           # lint + type-check + test (all three)
npm run build              # Rollup build (es/, lib/, dist/)
npm run storybook          # Storybook dev server on :6006
npm run plop component     # Scaffold a new component
npm run prettify           # Format all files with Prettier
```

Run `npm run validate` after meaningful changes to catch issues early.

## Project structure

```
src/
  <component-name>/        # One directory per component
    index.ts                # Re-exports from the main file
    component-name.tsx      # Implementation
    component-name.module.css   # CSS Modules styles
    component-name.test.tsx     # Tests
    component-name.stories.mdx  # Storybook docs (or .tsx)
  styles/
    design-tokens.css       # Global CSS custom properties (--reactist-*)
  utils/
    common-types.ts         # Shared types (Space, Tone, ObfuscatedClassName, etc.)
    responsive-props.ts     # Responsive prop utilities
    polymorphism.ts         # Polymorphic component types (deprecated)
    test-helpers.tsx        # Test utilities (flushMicrotasks, TestIcon, runSpaceTests)
  hooks/                    # Custom hooks (usePrevious)
  index.ts                  # Root export file - all components exported here
```

## Component conventions

### File structure

Every component has `index.ts`, `component.tsx`, `component.module.css`, `component.test.tsx`, and a story file. Use `npm run plop component` to scaffold new components.

### Implementation patterns

- Import React as `import * as React from 'react'`
- Use `React.forwardRef` with a named function matching the component name:
  ```tsx
  const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(function Button(
      { variant, size = 'normal', ...props },
      ref,
  ) { ... })
  ```
- Use named exports only - no default exports for design system components
- Export types explicitly: `export type { ButtonProps }`
- Add JSDoc comments to every prop
- Use `exceptionallySetClassName` instead of `className` (via `ObfuscatedClassName` type) to discourage custom styling
- Use `classNames()` from the `classnames` package for conditional classes
- Use `aria-disabled` instead of HTML `disabled` for soft disable (keeps element focusable)

### Exports

New components must be added to `src/index.ts`. Components are grouped by category (layout, alerts, typography, links, form fields, other).

### Styling

- CSS Modules with `.module.css` files (plain CSS). Legacy components under `src/components/` use `.less` but new components should use CSS Modules
- Use CSS custom properties from `src/styles/design-tokens.css` (prefixed `--reactist-*`)
- Component-specific tokens go in the component's own CSS file under `:root`
- Class naming: `variant-primary`, `size-small`, `tone-destructive` (dash-separated)
- Responsive: mobile-first with breakpoints at 768px (tablet) and 992px (desktop)
- No CSS nesting - keep selectors flat

### Accessibility

- Build on `@ariakit/react` primitives for interactive components
- Use semantic HTML and ARIA attributes
- Icon-only buttons require `aria-label`
- Test with `jest-axe` - every component should have an a11y test
- Use `react-focus-lock` and `aria-hidden` for modals

## Testing conventions

- Use `@testing-library/react` with `userEvent` (not `fireEvent`)
- Query elements by role: `screen.getByRole('button', { name: 'Click me' })`
- Use `flushMicrotasks()` from `src/utils/test-helpers.tsx` after ariakit component interactions
- Use `jest-axe` for accessibility checks:
  ```tsx
  const { container } = render(<Component />)
  expect(await axe(container)).toHaveNoViolations()
  ```
- Use `TestIcon` from test-helpers when a test needs an icon element
- Use `runSpaceTests()` from test-helpers for components that accept a `space` prop

## Commits and PRs

- PR titles must follow [conventional commits](https://www.conventionalcommits.org/): `feat:`, `fix:`, `chore:`, `refactor:`, `test:`, `docs:`, etc.
- `feat:` triggers a minor version bump, `fix:` triggers a patch, `feat!:` or `fix!:` triggers a major (breaking)
- Versioning is automated by release-please based on PR title
- Pre-commit hooks run Prettier, ESLint, and React Compiler tracking - do not skip them

## React Compiler

The project uses `babel-plugin-react-compiler` targeting React 17+. Compilation status is tracked in `.react-compiler.rec.json`. Some files are currently opted out due to compilation errors. The pre-commit hook automatically updates this tracking file.
