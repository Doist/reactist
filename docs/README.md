# Documentation Index

Read this index first (per [`AGENTS.md`](../AGENTS.md) → "Documentation Navigation") before scanning the `docs/` directory. Use the descriptions and tags to find the right document by topic.

All documents below are **synced** from [`Doist/shared-configs`](https://github.com/Doist/shared-configs) via the `react-guidelines` resource — do not edit them locally, as changes are overwritten on the next sync. Repo-owned docs added in the future should be labelled `repo`.

## React guidelines

- **[react-guidelines/async.md](react-guidelines/async.md)** — Async patterns: race conditions, data fetching, debouncing, and throttling.
    - _Tags:_ react, async, data-fetching, debounce
    - _Source:_ synced
- **[react-guidelines/conventions.md](react-guidelines/conventions.md)** — JSX conventions, named effect callbacks, and component typing.
    - _Tags:_ react, conventions, jsx, components
    - _Source:_ synced
- **[react-guidelines/react-compiler.md](react-guidelines/react-compiler.md)** — How the React Compiler optimizes components and why you must **not** add manual `useMemo` / `useCallback` / `React.memo`. Explains how to check violations with `@doist/react-compiler-tracker` and `.react-compiler.rec.json`.
    - _Tags:_ react, compiler, memoization, useMemo, useCallback, performance
    - _Source:_ synced
- **[react-guidelines/state.md](react-guidelines/state.md)** — State management: when to use what, Redux Toolkit (typed hooks, slices, thunks, selectors), Zustand, and render purity.
    - _Tags:_ react, state, redux, zustand
    - _Source:_ synced
- **[react-guidelines/testing.md](react-guidelines/testing.md)** — React Testing Library patterns: component tests, hook tests, and provider wrappers.
    - _Tags:_ react, testing, rtl, jest
    - _Source:_ synced
