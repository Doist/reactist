import { addParameters } from '@storybook/react'
import BaseDecorator from './BaseDecorator'
import '../stories/components/styles/story.less'

export const decorators = [BaseDecorator]

export const parameters = {
    viewMode: 'docs',
    options: {
        storySort: {
            method: 'alphabetical',
            order: ['Reactist', 'Design tokens', 'Design system', 'Hooks', 'Components'],
        },
    },
    decorators,
}

addParameters({
    badgesConfig: {
        accessible: {
            contrast: 'rgba(5, 133, 39, 0.1)',
            color: 'rgb(5, 133, 39)',
            title: '✔ Accessible (WCAG 2.0 AA)',
        },
        partiallyAccessible: {
            contrast: 'rgba(235, 141, 19, 0.1)',
            color: 'rgb(235, 141, 19)',
            title: '⚠ Partially Accessible',
        },
        notAccessible: {
            contrast: 'rgba(209, 69, 59, 0.1)',
            color: 'rgb(209, 69, 59)',
            title: '✖ Not accessible',
        },
        deprecated: {
            contrast: 'rgba(209, 69, 59, 0.1)',
            color: 'rgb(209, 69, 59)',
            title: '✖ Deprecated',
        },
    },
})
