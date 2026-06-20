# Badges toolbar tool

Allows adding a toolbar badge (or badges) for the current story, used to flag things viewers should know at a glance, e.g. a component's accessibility status or deprecation.

## Usage

Set the `badges` parameter on the component's CSF `meta`:

```ts
const meta = {
    title: '📝 Form/CheckboxField',
    component: CheckboxField,
    parameters: {
        badges: ['accessible'],
    },
}
```

You can list more than one key:

```ts
badges: ['partiallyAccessible', 'deprecated']
```

### MDX docs

Badges come from the story parameters, so an MDX docs page inherits them when it is **attached** to a stories file via `<Meta of={ComponentStories} />`. Storybook will **drop** parameters set directly on a standalone `<Meta title="…" />` (i.e. no `of`).

## Available badges

| Key                   | Label                       | Tone             |
| --------------------- | --------------------------- | ---------------- |
| `accessible`          | ✔ Accessible (WCAG 2.0 AA) | positive (green) |
| `partiallyAccessible` | ⚠ Partially Accessible     | warning (orange) |
| `notAccessible`       | ✖ Not accessible           | attention (red)  |
| `deprecated`          | ✖ Deprecated               | attention (red)  |
