# AGENTS — Reactist

> **How this file is organized.** Everything above the `shared-config:agents` HTML comment marker is specific to Reactist and is maintained locally in this repo. Everything below the marker is synced from Doist/shared-configs and must not be edited directly, as it will be overwritten on the next sync.

Reactist is a React component library (`@doist/reactist`) — accessible UI components for Doist products.

## Repository-specific rules

### React Compiler is enabled — read before touching components/hooks

Before adding or editing any React component or hook, consult [docs/react-guidelines/react-compiler.md](docs/react-guidelines/react-compiler.md). Do **not** add `useMemo`, `useCallback`, or `React.memo` by default — the compiler handles memoization. Files the compiler already optimizes are the ones **not** listed in `.react-compiler.rec.json`; check violations with the tracker, not ESLint (`npx @doist/react-compiler-tracker --check-files --show-errors <file>`), and do not skip the pre-commit hook that updates the record file.

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

For generic JSX conventions, named effect callbacks, and component typing, see [docs/react-guidelines/conventions.md](docs/react-guidelines/conventions.md). Reactist-specific patterns:

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

For generic React Testing Library patterns (component tests, hook tests, provider wrappers, querying by role, `userEvent` over `fireEvent`), see [docs/react-guidelines/testing.md](docs/react-guidelines/testing.md). Reactist-specific helpers:

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

<!-- shared-config:agents -->

# AGENTS

> [!WARNING]
> **This file is automatically synced from [`Doist/shared-configs`](https://github.com/Doist/shared-configs).**
>
> Do not edit this file directly. Any local changes will be overwritten on the next sync. To make changes, edit the file in the source repository.

## Core Principles

These principles apply to **all** agent interactions:

1. **Documentation-First for Intended Behavior:** Prioritize human-written documentation from the `docs/` directory when the task is about intended behavior, architecture, workflows, conventions, or checklists.
2. **Code as Source of Truth for Implementation:** Use the codebase as the source of truth for implementation details such as method signatures, parameter requirements, control flow, and concrete behavior. Consult documentation for additional context, intent, or repository-specific guidance.
3. **Augment, Don't Override:** Use information from `docs/` to augment and guide your process. The instructions in this file define the _how_ (your process), while the `docs/` directory provides the repository-specific _what_ (the conventions, checklists, and knowledge). The code clarifies the concrete implementation details.
4. **Minimal Scope:** When inspecting code, focus on the smallest possible scope (specific files or modules). Do not read entire directories.
5. **Transparency:** If you are unsure about an approach or need to expand your scope, ask the user for confirmation first.

## Your Communication Style

Write clearly, concisely, and directly. Be engaging without sounding generic.

Respect the reader's time. Follow "If I had more time, I would have written a shorter letter". Choose the shortest version that still says what matters. Cut vague phrasing, filler, and repetition.

Avoid AI-sounding writing: polished fluff, corporate jargon, poetic metaphors, formulaic openings, generic summaries, and empty closings like "let me know if…". Avoid words such as delve, tapestry, realm, landscape, robust, seamless, transformative, holistic, comprehensive, empower, unlock, actionable, pivotal, crucial, "it's worth noting," "in conclusion," and "at the end of the day" unless they're truly the best fit.

Use plain English, active voice, contractions, concrete examples, varied sentence lengths, and clear judgment. Don't over-hedge, force both-sides framing, default to tidy three-part lists, or repeat the same structure.

## Documentation Navigation

Before performing any task that requires consulting documentation:

1. **Check for Index:** First, read `docs/README.md`. If this file exists, it **must** be used as the primary index for navigating the `docs/` directory.
2. **Use Index for Navigation:** Rely on the index's descriptions and tags to identify which documents are relevant to your task. Do not scan the entire `docs/` folder when the index provides clear guidance.
3. **Fallback to Scanning:** Only if `docs/README.md` does not exist or does not provide sufficient guidance should you fall back to scanning the `docs/` directory.

## Task-Specific Guidelines

### Knowledge Queries

When asked a question about the project's codebase or development process, follow this mandatory process:

1. **Choose the Right Primary Source:** If the question is about architecture, process, intended behavior, or documented conventions, start with the Documentation Navigation process above. If the question is about implementation details such as specific methods, functions, parameters, types, control flow, or concrete behavior, inspect the relevant code directly.
2. **Synthesize from the Best Source:** Answer from the most relevant primary source. Use documentation for documented intent and guidance, and use code for implementation details.
3. **Cross-Check When Helpful:** Consult the other source when it adds useful context or when you notice ambiguity or a mismatch between documented intent and actual behavior.
4. **Be Clear About the Basis of the Answer:** State whether your answer is based on documentation, code, or both when that distinction matters.

### Code Reviews

When asked to perform a code review, follow this mandatory process:

1. **Consult Documentation:** Use the Documentation Navigation process above to find relevant guidelines in `docs/`. Look for documents related to:
    - Coding conventions and style guides.
    - Testing guidelines and best practices.
    - Architecture or design patterns.
    - Any domain-specific standards relevant to the code being reviewed.
2. **Review:** Analyze the code against the guidelines found in the documentation.
3. **Provide Feedback:** Structure your feedback based on the principles and checklists you have found.

### Code Generation

When asked to write new code or implement features, follow this mandatory process:

1. **Consult Documentation:** Use the Documentation Navigation process above to find relevant guidelines in `docs/`. Look for documents related to:
    - Coding conventions and style guides.
    - Architecture patterns and design principles.
    - Testing requirements and test structure.
    - Security guidelines and best practices.
    - Any domain-specific standards or templates.
2. **Inspect Existing Code:** Examine existing code in the relevant area to understand:
    - Naming conventions and code organization.
    - Existing patterns and idioms used in similar features.
    - How related functionality is currently implemented.
3. **Implement:** Write the code following the guidelines and patterns you've identified, ensuring:
    - Consistency with existing codebase style.
    - Adherence to documented conventions.
    - Appropriate error handling and validation.
    - Inclusion of necessary tests (unit, integration, etc.).

### PR Creation

When asked to create a pull request, follow this mandatory process:

1. **Determine Creation Method:** Check if GitHub CLI (`gh`) is available and confirm with the user whether to:
    - Create the PR directly using GitHub CLI, or
    - Generate the PR body for manual creation (copy-paste into GitHub UI).
2. **Gather Context:** Identify the branch name, parent branch (default: `main`), and any related PRs or issues that should be referenced or closed.
3. **Consult PR Template:** Read the repository's PR template (typically at `.github/PULL_REQUEST_TEMPLATE.md`) to understand the required sections and format.
4. **Consult Documentation:** Use the Documentation Navigation process above to find relevant guidelines in `docs/`. Look for documents related to:
    - PR creation guidelines and best practices.
    - Changelog format and conventions.
    - Testing requirements.
    - Any repository-specific PR standards.
5. **Analyze Changes:** Review the commits and diff to summarize the changes and complete the required sections in the pull request body.
6. **Create or Generate PR:**
    - **If using GitHub CLI:** Execute `gh pr create` with the appropriate flags (title, body, labels, base branch).
    - **If generating body only:** Output the complete PR title and body in a format ready for copy-paste, clearly indicating which labels should be applied manually.
7. **Critical Requirements:**
    - Follow the exact template structure from `.github/PULL_REQUEST_TEMPLATE.md`.
    - Pay special attention to changelog format if it's parsed by automation.
    - Include appropriate testing information (e.g., "Smoke tested", unit tests added).
    - Add relevant labels (e.g., "👀 Show PR" for small, obvious changes).
    - Link related issues and PRs in the Reference section.

## Enforcement

These guidelines are **non-negotiable**. Deviation from this process constitutes a failure to follow core instructions. When in doubt, ask for clarification.

<!-- /shared-config:agents -->
