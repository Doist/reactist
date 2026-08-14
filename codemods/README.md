# Reactist Text codemod

Migrates the breaking Text, Heading, and Display APIs to the consolidated Text component and its
named variants.

## Run

```bash
npx jscodeshift@17.3.0 \
  --transform ./node_modules/@doist/reactist/codemods/text-variants.ts \
  --extensions js,jsx,ts,tsx \
  --parser tsx \
  src
```

Run Prettier and the application's type-check after the transform.

## Exact mappings

| Legacy Text size | Regular or omitted | Semibold    | Bold      |
| ---------------- | ------------------ | ----------- | --------- |
| subtitle         | subheader-2        | subheader-1 | Manual    |
| body or omitted  | body-3             | body-2      | body-1    |
| copy             | callout-2          | callout-1   | Manual    |
| caption          | caption-3          | caption-2   | caption-1 |

Legacy Heading maps only exact 32px/700 uses to `header-1` and exact 20px/700 uses to `header-3`.
The transform adds `render={<hN />}` only when the original level differs from the header variant's
default element.

Existing named Heading variants map directly from `heading-1` through `heading-4` to `header-1`
through `header-4`. Display variants keep their `display-1` through `display-5` names. Heading and
Display imports are rebound to Text while their local names stay unchanged.

## Manual migrations

The transform changes only exact static mappings. Ambiguous size/weight combinations, dynamic
expressions, duplicate props, and prop spreads remain unchanged. Each unresolved use receives a
TODO(reactist-codemod) comment, and the command prints its file and line. Direct Heading JSX uses
still migrate when the same import has indirect references. The indirect statements receive TODOs
for manual migration. Namespace references, removed Heading and Display types, and custom component
values passed to `as` also receive TODOs.

Resolve every TODO before upgrading to the new Reactist major version. Do not mechanically choose
the nearest variant: confirm the intended visual hierarchy with design.
