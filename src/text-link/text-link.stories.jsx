import * as React from 'react'

import { Stack } from '../stack'

import { TextLink } from './text-link'

export default {
    title: '🔘 Buttons & links/TextLink',
    component: TextLink,

    parameters: {
        badges: ['accessible'],
        figma: {
            path: '24Q3 Foundation › Link styling',
            url: 'https://www.figma.com/design/5gTX7MuUxhCIvL6WK87JVA/24Q3-Foundation?node-id=1530-49073',
        },
    },
}

export const MainDemo = {
    render: () => (
        <Stack space="medium" align="start">
            <TextLink href="https://www.doist.com/">regular</TextLink>
            <TextLink href="https://www.doist.com/" openInNewTab={true}>
                open in new tab
            </TextLink>
            <TextLink
                as="button"
                onClick={() => {
                    alert('clicked')
                }}
            >
                button link
            </TextLink>
        </Stack>
    ),

    name: 'Main demo',

    parameters: {
        chromatic: {
            disableSnapshot: false,
        },
    },
}

export const NestedElements = {
    render: () => (
        <Stack space="medium" align="start">
            <TextLink href="https://www.doist.com/">
                <span>Link with nested span</span>
            </TextLink>
            <TextLink href="https://www.doist.com/">
                <div>Link with nested div</div>
            </TextLink>
            <TextLink href="https://www.doist.com/">
                Text with <strong>bold</strong> section
            </TextLink>
            <TextLink href="https://www.doist.com/">
                Text with{' '}
                <a href="https://www.doist.com" target="_blank" rel="noreferrer">
                    link
                </a>{' '}
                section
            </TextLink>
        </Stack>
    ),

    name: 'Nested elements',

    parameters: {
        chromatic: {
            disableSnapshot: false,
        },
    },
}

export const Colors = {
    render: () => (
        <Stack space="medium" align="start">
            <TextLink href="https://www.doist.com/" color="inherit">
                inherit color
            </TextLink>
            <TextLink href="https://www.doist.com/" underline={false}>
                no underline
            </TextLink>
        </Stack>
    ),

    name: 'Colors',

    parameters: {
        chromatic: {
            disableSnapshot: false,
        },
    },
}
