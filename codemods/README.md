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

## Mappings

| Legacy Text size | Regular or omitted | Semibold    | Bold        |
| ---------------- | ------------------ | ----------- | ----------- |
| subtitle         | subheader-2        | subheader-1 | subheader-1 |
| body or omitted  | body-3             | body-2      | body-1      |
| copy             | callout-2          | callout-1   | callout-1   |
| caption          | caption-3          | caption-2   | caption-1   |

Bold subtitle and copy text use the nearest named variant and change from 700 to 600 weight. Other
Text mappings preserve size and weight.

| Legacy Heading metrics | Text variant |
| ---------------------- | ------------ |
| 32px/700               | header-1     |
| 24px/700               | header-2     |
| 20px/700               | header-3     |
| 16px/700 or 16px/600   | subheader-1  |
| 16px/400               | subheader-2  |
| 14px/700               | body-1       |
| 14px/600               | body-2       |
| 14px/400               | body-3       |
| 12px/700               | caption-1    |
| 12px/600               | caption-2    |
| 12px/400               | caption-3    |

The 24px/700 mapping changes to 26px/700. The 16px/700 mapping changes to 16px/600. Other Heading
mappings preserve size and weight. The transform preserves the original semantic heading level
with `render={<hN />}` when the variant does not render that element by default.

Existing named Heading variants map directly from `heading-1` through `heading-4` to `header-1`
through `header-4`. Display variants keep their `display-1` through `display-5` names. Heading and
Display imports are rebound to Text while their local names stay unchanged.

## Manual migrations

The transform changes only the documented static mappings. Unsupported size/weight combinations,
dynamic expressions, duplicate props, and prop spreads remain unchanged. Each unresolved use
receives a TODO(reactist-codemod) comment, and the command prints its file and line. Direct Heading
JSX uses still migrate when the same import has indirect references. The indirect statements
receive TODOs for manual migration. Namespace references, removed Heading and Display types, and
custom component values passed to `as` also receive TODOs.

Resolve every TODO before upgrading to the new Reactist major version. Do not mechanically choose
an undocumented nearest variant: confirm the intended visual hierarchy with design.
