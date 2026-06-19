import '../src/styles/design-tokens.css'
import '../stories/components/styles/story.css'

import { create } from 'storybook/theming/create'

import BaseDecorator from './BaseDecorator'

import type { Preview } from '@storybook/react-vite'

const badgeFontStyles = {
    fontSize: '12px',
    lineHeight: '14px',
}

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
                    '🧭 Navigation & structure',
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
                title: '✔ Accessible (WCAG 2.0 AA)',
                styles: {
                    backgroundColor: 'rgba(5, 133, 39, 0.1)',
                    borderColor: 'rgb(5, 133, 39)',
                    color: 'rgb(5, 133, 39)',
                    ...badgeFontStyles,
                },
            },
            partiallyAccessible: {
                title: '⚠ Partially Accessible',
                styles: {
                    backgroundColor: 'rgba(235, 141, 19, 0.1)',
                    borderColor: 'rgb(235, 141, 19)',
                    color: 'rgb(235, 141, 19)',
                    ...badgeFontStyles,
                },
            },
            notAccessible: {
                title: '✖ Not accessible',
                styles: {
                    backgroundColor: 'rgba(209, 69, 59, 0.1)',
                    borderColor: 'rgb(209, 69, 59)',
                    color: 'rgb(209, 69, 59)',
                    ...badgeFontStyles,
                },
            },
            deprecated: {
                title: '✖ Deprecated',
                styles: {
                    backgroundColor: 'rgba(209, 69, 59, 0.1)',
                    borderColor: 'rgb(209, 69, 59)',
                    color: 'rgb(209, 69, 59)',
                    ...badgeFontStyles,
                },
            },
        },
    },
    tags: ['autodocs'],
}

export default preview
