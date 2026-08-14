# Reactist Text codemod

Migrates the breaking Text, Heading, and Display APIs to the consolidated Text component and its
named variants.

## Run

First, run a strict dry run. It exits with an error if parsing fails or manual work remains.

```bash
npx jscodeshift@17.3.0 \
  --dry \
  --run-in-band \
  --verbose=0 \
  --fail-on-error \
  --fail-on-manual=true \
  --transform ./node_modules/@doist/reactist/codemods/text-variants.ts \
  --extensions js,jsx,ts,tsx \
  --parser tsx \
  src
```

The dry-run summary groups every manual migration by reason. Remove
`--fail-on-manual=true` when you want to inspect the automatic changes before you resolve the
remaining cases.

Apply the transform after you review the dry run:

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
Display imports with only direct, fully migrated JSX uses merge into one Text import. Aliased,
commented, indirect, or unresolved bindings keep their local names.

Literal conditional expressions also migrate when every branch has an exact mapping. This includes
an `undefined` branch, which uses the legacy default. The transform does not trace variables or
infer values across files.

Static Text `as` values migrate to `render`. Props for the rendered element move into that element.
Text styling props, `key`, and `ref` stay on Text. Dynamic targets, existing `render` props, and prop
spreads remain manual.

## Manual migrations

The transform changes only documented mappings. Unsupported size/weight combinations, non-finite
dynamic expressions, duplicate props, and prop spreads remain unchanged. Each unresolved use gets
a nearby TODO(reactist-codemod) comment, and the command prints its file and line. Direct Heading JSX
uses still migrate when the same import has indirect references. The indirect statements get TODOs
for manual migration. Namespace references and removed Heading and Display types also get TODOs.
References such as `TextProps['size']` and `Pick<TextProps, 'size' | 'weight'>` get precise TODOs
because the replacement type depends on the consumer API.

The transform supports imports from `@doist/reactist`. Deep imports are outside its scope.

Resolve every TODO before upgrading to the new Reactist major version. Do not mechanically choose
an undocumented nearest variant: confirm the intended visual hierarchy with design.
