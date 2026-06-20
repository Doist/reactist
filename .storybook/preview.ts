import type { Preview } from '@storybook/react-vite'
import { create } from 'storybook/theming/create'
import BaseDecorator from './BaseDecorator'
import { reactistBadgeTones } from './components/badge-tones'
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
        badgesConfig: {
            accessible: {
                title: '✔︎ Accessible (WCAG 2.0 AA)',
                styles: reactistBadgeTones.positive,
            },
            partiallyAccessible: {
                title: '⚠︎ Partially Accessible',
                styles: reactistBadgeTones.warning,
            },
            notAccessible: {
                title: '✖︎ Not accessible',
                styles: reactistBadgeTones.attention,
            },
            deprecated: {
                title: '✖︎ Deprecated',
                styles: reactistBadgeTones.attention,
            },
        },
    },
    tags: ['autodocs'],
}

export default preview
