import * as React from 'react'

import { Box } from '../box'
import { Stack } from '../stack'
import { Text } from '../text'

import { Loading } from './loading'

function Example({ children, size }) {
    return (
        <Stack space="xxlarge" align="center">
            <Box>{children}</Box>
            <Box as="pre">size="{size}"</Box>
        </Stack>
    )
}

export default {
    title: '💬 Feedback/Loading',
    component: Loading,

    parameters: {
        badges: ['accessible'],
        figma: {
            path: 'Web › Components / Todoist › Progress › Progress circular',
            url: 'https://www.figma.com/design/LYlWNzvhMDh907l07mPPQk/Product-Library---Web?node-id=20195-258612',
        },
    },
}

export const AllSizes = {
    render: () => (
        <Box display="flex" flexDirection="row" justifyContent="spaceEvenly" alignItems="flexEnd">
            <Example size="xsmall">
                <Loading aria-label="Loading Demo" size="xsmall" />
            </Example>
            <Example size="small">
                <Loading aria-label="Loading Demo" size="small" />
            </Example>
            <Example size="medium">
                <Loading aria-label="Loading Demo" size="medium" />
            </Example>
            <Example size="large">
                <Loading aria-label="Loading Demo" size="large" />
            </Example>
        </Box>
    ),

    parameters: {
        docs: {
            source: {
                type: 'dynamic',
            },
        },
    },

    name: 'All Sizes',
}

export const CustomizeColor = {
    render: () => (
        <Box
            display="flex"
            flexDirection="row"
            justifyContent="spaceEvenly"
            alignItems="flexEnd"
            style={{
                '--reactist-spinner-tint': 'red',
            }}
        >
            <Example size="xsmall">
                <Loading aria-label="Loading Demo" size="xsmall" />
            </Example>
            <Example size="small">
                <Loading aria-label="Loading Demo" size="small" />
            </Example>
            <Example size="medium">
                <Loading aria-label="Loading Demo" size="medium" />
            </Example>
            <Example size="large">
                <Loading aria-label="Loading Demo" size="large" />
            </Example>
        </Box>
    ),

    parameters: {
        docs: {
            source: {
                type: 'dynamic',
            },
        },
    },

    name: 'Customize Color',
}

export const AccessibilityAttributes = {
    render: () => (
        <Box display="flex" flexDirection="row" justifyContent="spaceEvenly" alignItems="flexEnd">
            <Stack space="xxlarge" align="center">
                <Loading aria-label="Loading puppies" />
                <Box as="pre">aria-label</Box>
            </Stack>
            <Stack space="xxlarge" align="center">
                <Text id="loading-kittens" tone="secondary">
                    Loading kittens...
                </Text>
                <Loading aria-labelledby="loading-kittens" />
                <Box as="pre">aria-labelledby</Box>
            </Stack>
            <Stack space="xxlarge" align="center">
                <Text id="loading-progress" tone="secondary">
                    50% complete...
                </Text>
                <Loading aria-label="loading-progress" />
                <Box as="pre">aria-describedby</Box>
            </Stack>
        </Box>
    ),

    parameters: {
        docs: {
            source: {
                type: 'dynamic',
            },
        },
    },

    name: 'Accessibility Attributes',
}

export const AccessibilityConsiderations = {
    render: () => (
        <Box
            alignItems="center"
            aria-busy={true}
            display="flex"
            flexDirection="column"
            justifyContent="spaceEvenly"
            style={{
                background: '#f3f3f3',
                border: '1px solid #333',
                width: '200px',
                height: '200px',
            }}
        >
            <Loading aria-describedby="loading-progress" />
            <Text id="loading-progress" tone="secondary">
                50% complete
            </Text>
        </Box>
    ),

    parameters: {
        docs: {
            source: {
                type: 'dynamic',
            },
        },
    },

    name: 'Accessibility Considerations',
}
