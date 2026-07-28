# Reactist typography codemod

Migrates the breaking Text and Heading typography APIs to named SF variants.

## Run

```bash
npx jscodeshift@17.3.0 \
  --transform ./node_modules/@doist/reactist/codemods/typography-variants.js \
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

Heading maps only exact 32px/700 uses to heading-1 and exact 20px/700 uses to heading-3.

## Manual migrations

The transform changes only exact static mappings. Ambiguous size/weight combinations, dynamic
expressions, and prop spreads remain unchanged. Each unresolved element receives a
TODO(reactist-codemod) comment, and the command prints its file and line.

Resolve every TODO before upgrading to the new Reactist major version. Do not mechanically choose
the nearest variant: confirm the intended visual hierarchy with design.
