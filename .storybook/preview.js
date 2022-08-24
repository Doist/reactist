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

const badgeFontStyles = {
    fontSize: '12px',
    lineHeight: '14px',
}

addParameters({
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
})
