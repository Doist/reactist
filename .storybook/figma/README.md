# Figma toolbar tool

Allows adding a toolbar link from the current story to its Figma design, so anyone can jump to the source of truth at a glance. When no design is linked, a neutral "No Figma link" hint shows as a reminder to add one.

## Usage

Set the `figma` parameter on the component's CSF `meta`. Provide the design's `url`, plus an optional `path` breadcrumb shown as the link's tooltip:

```tsx
const meta = {
    title: '📊 Data display/Avatar',
    component: Avatar,
    parameters: {
        figma: {
            url: 'https://www.figma.com/design/…?node-id=123-456',
            path: 'Web › Components / Todoist › Avatar',
        },
    },
}
```

Link several frames at once by passing an array:

```tsx
figma: [
    { url: 'https://www.figma.com/design/…?node-id=1-1', path: 'Default' },
    { url: 'https://www.figma.com/design/…?node-id=1-2', path: 'Compact' },
]
```

### MDX docs

A Figma link comes from the story parameters, so an MDX docs page inherits it when it is **attached** to a stories file via `<Meta of={ComponentStories} />`. Storybook will **drop** parameters set directly on a standalone `<Meta title="…" />` (i.e. no `of`). Standalone documentation pages not attached to stories (e.g. the intro and Tips & tricks pages) will never show the "No Figma link" hint.

## Opting out

Non-visual entries (behaviour utilities, hooks) have no Figma design and shouldn't be flagged. Mark them with `FIGMA_NOT_NEEDED` to hide the hint:

```tsx
import { FIGMA_NOT_NEEDED } from '../../.storybook/figma/constants'

const meta = {
    title: '⚙️ Utility/KeyCapturer',
    component: KeyCapturer,
    parameters: { figma: FIGMA_NOT_NEEDED },
}
```
