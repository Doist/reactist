# Testing Library Upgrade Baseline

Date: 2026-05-18
Branch: pawel/upgrade-rtl-user-event

## Dependency Snapshot

Command:

```bash
node -e "const p=require('./package.json'); for (const n of ['@testing-library/react','@testing-library/user-event','@testing-library/jest-dom','@testing-library/dom','@storybook/testing-library','@storybook/jest']) console.log(n, p.devDependencies[n] || '(not direct)')"
```

Output:

```text
@testing-library/react 14.3.1
@testing-library/user-event ^13.2.1
@testing-library/jest-dom ^5.14.1
@testing-library/dom (not direct)
@storybook/testing-library ^0.0.13
@storybook/jest ^0.0.10
```

## Baseline Test Command

Command:

```bash
npm run test -- --runInBand
```

Result: failed before running any tests.

Failing test names: none reported.

Error summary:

```text
> @doist/reactist@30.1.4 test
> jest --passWithNoTests --runInBand

sh: jest: command not found
```

## Baseline Type Check Command

Command:

```bash
npm run type-check
```

Result: failed before TypeScript could run.

Error summary:

```text
> @doist/reactist@30.1.4 type-check
> tsc --noEmit -p ./tsconfig.json

sh: tsc: command not found
```
