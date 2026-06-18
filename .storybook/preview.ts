import type { Preview } from '@storybook/react-vite'
import { create } from 'storybook/theming/create'
import BaseDecorator from './BaseDecorator'
import '../src/styles/design-tokens.css'
import '../stories/components/styles/story.css'

const preview: Preview = {
    decorators: [BaseDecorator],
    parameters: {
        viewMode: 'docs',
        docs: {
            theme: create({
                base: 'light',
                fontBase: 'var(--reactist-font-family)',
            }),
        },
        options: {
            storySort: {
                method: 'alphabetical',
                order: [
                    'Reactist',
                    'Design tokens',
                    '🔘 Buttons & links',
                    '📊 Data display',
                    '💬 Feedback',
                    '📝 Form',
                    '📐 Layout',
                    '📑 Menus & tabs',
                    '🪟 Overlays',
                    '🔤 Typography',
                    '⚙️ Utility',
                    '🪝 Hooks',
                    'Tips and tricks',
                ],
            },
        },
        chromatic: {
            disableSnapshot: true,
        },
        // The \uFE0E after each symbol forces text (not emoji) presentation, so the glyph
        // inherits the badge tint color instead of falling back to the black emoji font.
        badgesConfig: {
            accessible: {
                title: '✔\uFE0E Accessible (WCAG 2.0 AA)',
                tone: 'positive',
            },
            partiallyAccessible: {
                title: '⚠\uFE0E Partially Accessible',
                tone: 'warning',
            },
            notAccessible: {
                title: '✖\uFE0E Not accessible',
                tone: 'attention',
            },
            deprecated: {
                title: '✖\uFE0E Deprecated',
                tone: 'attention',
            },
        },
    },
    tags: ['autodocs'],
}

export default preview
