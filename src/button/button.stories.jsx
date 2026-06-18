import * as React from 'react'
import { useEffect, useState } from 'react'

import { Box } from '../box'
import { Heading } from '../heading'
import { Inline } from '../inline'
import { Stack } from '../stack'
import { Text } from '../text'

import { Button } from './button'

function Icon() {
    return (
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
            <path
                fill="currentColor"
                d="M6 6.653a1 1 0 011.464-.886l10.246 5.37a1 1 0 01-.002 1.773L7.46 18.24a1 1 0 01-1.461-.887V13l6.96-.674a.328.328 0 000-.652L6 11V6.653z"
            />
        </svg>
    )
}

function LoadingButton({ disabledWhenLoading = false, ...props }) {
    const [loading, setLoading] = useState(false)
    useEffect(() => {
        if (!loading) return undefined
        const timeout = setTimeout(() => setLoading(false), 3000)
        return () => clearTimeout(timeout)
    }, [loading])
    return (
        <Button
            {...props}
            loading={loading}
            disabled={disabledWhenLoading ? loading : props.disabled}
            onClick={() => setLoading(true)}
        />
    )
}

function FullWidthTemplate({ label, ...otherProps }) {
    if (label === 'Click me <em>now</em>') {
        label = (
            <>
                Click me <em>now</em>
            </>
        )
    }
    const props = {
        ...otherProps,
        startIcon: <Icon />,
        endIcon: <Icon />,
    }
    return (
        <Stack space="medium">
            <Heading level="2">Full-width buttons and label alignment</Heading>
            <Text>
                When buttons have `width` other than the default `auto` they can also customize how
                the label is aligned horizontally.
            </Text>
            <Box width="full" padding="medium" style={{ border: '1px solid gray' }}>
                <Stack space="medium">
                    <LoadingButton {...props} align="start">
                        {label}
                    </LoadingButton>
                    <LoadingButton {...props} align="center">
                        {label}
                    </LoadingButton>
                    <LoadingButton {...props} align="end">
                        {label}
                    </LoadingButton>
                </Stack>
            </Box>
        </Stack>
    )
}

function PlaygroundTemplate({ label, ...props }) {
    let textLabel = label
    if (label === 'Click me <em>now</em>') {
        label = (
            <>
                Click me <em>now</em>
            </>
        )
        textLabel = 'Click me now'
    }
    return (
        <Stack space="large">
            <Heading level="2">Click on the buttons to see the loading state</Heading>
            <Inline space="large">
                <Box>
                    <Stack space="large">
                        <Box maxWidth="xsmall">
                            <LoadingButton {...props}>{label}</LoadingButton>
                        </Box>
                        <Box maxWidth="xsmall">
                            <LoadingButton {...props} disabled>
                                {label}
                            </LoadingButton>
                        </Box>
                    </Stack>
                </Box>
                <Box>
                    <Stack space="large">
                        <Box maxWidth="xsmall">
                            <LoadingButton {...props} startIcon={<Icon />}>
                                {label}
                            </LoadingButton>
                        </Box>
                        <Box maxWidth="xsmall">
                            <LoadingButton {...props} startIcon={<Icon />} disabled>
                                {label}
                            </LoadingButton>
                        </Box>
                    </Stack>
                </Box>
                <Box>
                    <Stack space="large">
                        <Box maxWidth="xsmall">
                            <LoadingButton {...props} endIcon={<Icon />}>
                                {label}
                            </LoadingButton>
                        </Box>
                        <Box maxWidth="xsmall">
                            <LoadingButton {...props} endIcon={<Icon />} disabled>
                                {label}
                            </LoadingButton>
                        </Box>
                    </Stack>
                </Box>
            </Inline>
        </Stack>
    )
}

function DarkModeTemplate(props) {
    return (
        <Box
            padding="xlarge"
            style={{
                backgroundColor: 'rgb(31, 31, 31)',
                '--reactist-content-primary': 'rgba(255, 255, 255, 0.88)',
                // variant="primary"
                '--reactist-actionable-primary-idle-tint': '#eceeee',
                '--reactist-actionable-primary-idle-fill': '#008099',
                '--reactist-actionable-primary-hover-tint': '#eceeee',
                '--reactist-actionable-primary-hover-fill': '#1f8fa5',
                '--reactist-actionable-primary-disabled-tint': '#767777',
                '--reactist-actionable-primary-disabled-fill': '#00404c',
                // variant="secondary"
                '--reactist-actionable-secondary-idle-tint': '#eceeee',
                '--reactist-actionable-secondary-idle-fill': '#283233',
                '--reactist-actionable-secondary-hover-tint': '#eceeee',
                '--reactist-actionable-secondary-hover-fill': '#31393b',
                '--reactist-actionable-secondary-disabled-tint': '#767777',
                '--reactist-actionable-secondary-disabled-fill': '#283233',
                // variant="tertiary"
                '--reactist-actionable-tertiary-idle-tint': '#22a5bf',
                '--reactist-actionable-tertiary-hover-tint': '#22a5bf',
                '--reactist-actionable-tertiary-hover-fill': '#283233',
                '--reactist-actionable-tertiary-disabled-tint': '#11525f',
                // variant="quaternary"
                '--reactist-actionable-quaternary-idle-tint': '#8fa0a3',
                '--reactist-actionable-quaternary-hover-tint': '#eceeee',
                '--reactist-actionable-quaternary-hover-fill': '#283233',
                '--reactist-actionable-quaternary-disabled-tint': '#444d4f',
                // colour for the desctructive tone (used in certain ways by all variants)
                '--reactist-actionable-primary-destructive-idle-tint': '#fff',
                '--reactist-actionable-primary-destructive-idle-fill': '#d26160',
                '--reactist-actionable-primary-destructive-hover-tint': '#fff',
                '--reactist-actionable-primary-destructive-hover-fill': '#e98786',
                '--reactist-actionable-primary-destructive-disabled-tint': '#767777',
                '--reactist-actionable-primary-destructive-disabled-fill': '#7f2c24',
                /* secondary destructive button colors (no fill, as these are transparent and bordered) */
                '--reactist-actionable-secondary-destructive-idle-tint': '#f68584',
                '--reactist-actionable-secondary-destructive-hover-tint': '#eFa9a9',
                '--reactist-actionable-secondary-destructive-disabled-tint': '#8a5853',
            }}
        >
            <PlaygroundTemplate {...props} />
        </Box>
    )
}

export default {
    title: '🔘 Buttons & links/Button',
    component: Button,

    parameters: {
        badges: ['accessible'],
        figma: {
            label: 'Web › Components / Todoist › Buttons › Button',
            url: 'https://www.figma.com/design/LYlWNzvhMDh907l07mPPQk/Product-Library---Web?node-id=507-10',
        },
    },
}

export const MainDemo = {
    render: () => (
        <Stack space="xxlarge">
            <Stack space="large">
                <pre>tone="normal"</pre>
                <Inline space="large">
                    <Box>
                        <LoadingButton variant="primary">Primary</LoadingButton>
                    </Box>
                    <Box>
                        <LoadingButton variant="secondary">Secondary</LoadingButton>
                    </Box>
                    <Box>
                        <LoadingButton variant="tertiary">Tertiary</LoadingButton>
                    </Box>
                    <Box>
                        <LoadingButton variant="quaternary">Quaternary</LoadingButton>
                    </Box>
                </Inline>
                <Inline space="large">
                    <Box>
                        <LoadingButton variant="primary" disabledWhenLoading>
                            Primary
                        </LoadingButton>
                    </Box>
                    <Box>
                        <LoadingButton variant="secondary" disabledWhenLoading>
                            Secondary
                        </LoadingButton>
                    </Box>
                    <Box>
                        <LoadingButton variant="tertiary" disabledWhenLoading>
                            Tertiary
                        </LoadingButton>
                    </Box>
                    <Box>
                        <LoadingButton variant="quaternary" disabledWhenLoading>
                            Quaternary
                        </LoadingButton>
                    </Box>
                </Inline>
                <Inline space="large">
                    <Box>
                        <LoadingButton variant="primary" disabled>
                            Primary
                        </LoadingButton>
                    </Box>
                    <Box>
                        <LoadingButton variant="secondary" disabled>
                            Secondary
                        </LoadingButton>
                    </Box>
                    <Box>
                        <LoadingButton variant="tertiary" disabled>
                            Tertiary
                        </LoadingButton>
                    </Box>
                    <Box>
                        <LoadingButton variant="quaternary" disabled>
                            Quaternary
                        </LoadingButton>
                    </Box>
                </Inline>
            </Stack>
            <Stack space="large">
                <pre>tone="destructive"</pre>
                <Inline space="large">
                    <Box>
                        <LoadingButton variant="primary" tone="destructive">
                            Primary
                        </LoadingButton>
                    </Box>
                    <Box>
                        <LoadingButton variant="secondary" tone="destructive">
                            Secondary
                        </LoadingButton>
                    </Box>
                    <Box>
                        <LoadingButton variant="tertiary" tone="destructive">
                            Tertiary
                        </LoadingButton>
                    </Box>
                    <Box>
                        <LoadingButton variant="quaternary" tone="destructive">
                            Quaternary
                        </LoadingButton>
                    </Box>
                </Inline>
                <Inline space="large">
                    <Box>
                        <LoadingButton variant="primary" tone="destructive" disabledWhenLoading>
                            Primary
                        </LoadingButton>
                    </Box>
                    <Box>
                        <LoadingButton variant="secondary" tone="destructive" disabledWhenLoading>
                            Secondary
                        </LoadingButton>
                    </Box>
                    <Box>
                        <LoadingButton variant="tertiary" tone="destructive" disabledWhenLoading>
                            Tertiary
                        </LoadingButton>
                    </Box>
                    <Box>
                        <LoadingButton variant="quaternary" tone="destructive" disabledWhenLoading>
                            Quaternary
                        </LoadingButton>
                    </Box>
                </Inline>
                <Inline space="large">
                    <Box>
                        <LoadingButton variant="primary" tone="destructive" disabled>
                            Primary
                        </LoadingButton>
                    </Box>
                    <Box>
                        <LoadingButton variant="secondary" tone="destructive" disabled>
                            Secondary
                        </LoadingButton>
                    </Box>
                    <Box>
                        <LoadingButton variant="tertiary" tone="destructive" disabled>
                            Tertiary
                        </LoadingButton>
                    </Box>
                    <Box>
                        <LoadingButton variant="quaternary" tone="destructive" disabled>
                            Quaternary
                        </LoadingButton>
                    </Box>
                </Inline>
            </Stack>
        </Stack>
    ),

    name: 'Main demo',

    parameters: {
        docs: {
            source: {
                type: 'code',
            },
        },

        chromatic: {
            disableSnapshot: false,
        },
    },
}

export const WithLabelAndIcon = {
    render: () => (
        <Stack space="xxlarge">
            <Stack space="large">
                <Text>Icon before the label</Text>
                <Inline space="large">
                    <Box>
                        <LoadingButton variant="primary" startIcon={<Icon />}>
                            Primary
                        </LoadingButton>
                    </Box>
                    <Box>
                        <LoadingButton variant="secondary" startIcon={<Icon />}>
                            Secondary
                        </LoadingButton>
                    </Box>
                    <Box>
                        <LoadingButton variant="tertiary" startIcon={<Icon />}>
                            Tertiary
                        </LoadingButton>
                    </Box>
                    <Box>
                        <LoadingButton variant="quaternary" startIcon={<Icon />}>
                            Quaternary
                        </LoadingButton>
                    </Box>
                </Inline>
            </Stack>
            <Stack space="large">
                <Text>Icon after the label</Text>
                <Inline space="large">
                    <Box>
                        <LoadingButton variant="primary" endIcon={<Icon />}>
                            Primary
                        </LoadingButton>
                    </Box>
                    <Box>
                        <LoadingButton variant="secondary" endIcon={<Icon />}>
                            Secondary
                        </LoadingButton>
                    </Box>
                    <Box>
                        <LoadingButton variant="tertiary" endIcon={<Icon />}>
                            Tertiary
                        </LoadingButton>
                    </Box>
                    <Box>
                        <LoadingButton variant="quaternary" endIcon={<Icon />}>
                            Quaternary
                        </LoadingButton>
                    </Box>
                </Inline>
            </Stack>
        </Stack>
    ),

    name: 'With label and icon',

    parameters: {
        docs: {
            source: {
                type: 'code',
            },
        },

        chromatic: {
            disableSnapshot: false,
        },
    },
}

export const WithDifferentSize = {
    render: () => (
        <Stack space="xxlarge">
            <Stack space="large">
                <pre>size="small"</pre>
                <Inline space="large">
                    <Box>
                        <LoadingButton variant="primary" size="small">
                            Primary
                        </LoadingButton>
                    </Box>
                    <Box>
                        <LoadingButton variant="secondary" size="small">
                            Secondary
                        </LoadingButton>
                    </Box>
                    <Box>
                        <LoadingButton variant="tertiary" size="small">
                            Tertiary
                        </LoadingButton>
                    </Box>
                    <Box>
                        <LoadingButton variant="quaternary" size="small">
                            Quaternary
                        </LoadingButton>
                    </Box>
                </Inline>
                <Inline space="large">
                    <Box>
                        <LoadingButton variant="primary" size="small" disabled>
                            Primary
                        </LoadingButton>
                    </Box>
                    <Box>
                        <LoadingButton variant="secondary" size="small" disabled>
                            Secondary
                        </LoadingButton>
                    </Box>
                    <Box>
                        <LoadingButton variant="tertiary" size="small" disabled>
                            Tertiary
                        </LoadingButton>
                    </Box>
                    <Box>
                        <LoadingButton variant="quaternary" size="small" disabled>
                            Quaternary
                        </LoadingButton>
                    </Box>
                </Inline>
            </Stack>
            <Stack space="large">
                <pre>size="normal"</pre>
                <Inline space="large">
                    <Box>
                        <LoadingButton variant="primary" size="normal">
                            Primary
                        </LoadingButton>
                    </Box>
                    <Box>
                        <LoadingButton variant="secondary" size="normal">
                            Secondary
                        </LoadingButton>
                    </Box>
                    <Box>
                        <LoadingButton variant="tertiary" size="normal">
                            Tertiary
                        </LoadingButton>
                    </Box>
                    <Box>
                        <LoadingButton variant="quaternary" size="normal">
                            Quaternary
                        </LoadingButton>
                    </Box>
                </Inline>
                <Inline space="large">
                    <Box>
                        <LoadingButton variant="primary" size="normal" disabled>
                            Primary
                        </LoadingButton>
                    </Box>
                    <Box>
                        <LoadingButton variant="secondary" size="normal" disabled>
                            Secondary
                        </LoadingButton>
                    </Box>
                    <Box>
                        <LoadingButton variant="tertiary" size="normal" disabled>
                            Tertiary
                        </LoadingButton>
                    </Box>
                    <Box>
                        <LoadingButton variant="quaternary" size="normal" disabled>
                            Quaternary
                        </LoadingButton>
                    </Box>
                </Inline>
            </Stack>
            <Stack space="large">
                <pre>size="large"</pre>
                <Inline space="large">
                    <Box>
                        <LoadingButton variant="primary" size="large">
                            Primary
                        </LoadingButton>
                    </Box>
                    <Box>
                        <LoadingButton variant="secondary" size="large">
                            Secondary
                        </LoadingButton>
                    </Box>
                    <Box>
                        <LoadingButton variant="tertiary" size="large">
                            Tertiary
                        </LoadingButton>
                    </Box>
                    <Box>
                        <LoadingButton variant="quaternary" size="large">
                            Quaternary
                        </LoadingButton>
                    </Box>
                </Inline>
                <Inline space="large">
                    <Box>
                        <LoadingButton variant="primary" size="large" disabled>
                            Primary
                        </LoadingButton>
                    </Box>
                    <Box>
                        <LoadingButton variant="secondary" size="large" disabled>
                            Secondary
                        </LoadingButton>
                    </Box>
                    <Box>
                        <LoadingButton variant="tertiary" size="large" disabled>
                            Tertiary
                        </LoadingButton>
                    </Box>
                    <Box>
                        <LoadingButton variant="quaternary" size="large" disabled>
                            Quaternary
                        </LoadingButton>
                    </Box>
                </Inline>
            </Stack>
        </Stack>
    ),

    name: 'With different size',

    parameters: {
        docs: {
            source: {
                type: 'code',
            },
        },

        chromatic: {
            disableSnapshot: false,
        },
    },
}

export const CustomizedColors = {
    render: () => (
        <Inline space="large">
            <Box>
                <LoadingButton
                    variant="primary"
                    style={{
                        '--reactist-btn-idle-tint': '#eee',
                        '--reactist-btn-idle-fill': '#666',
                        '--reactist-btn-hover-tint': '#fff',
                        '--reactist-btn-hover-fill': '#777',
                        '--reactist-btn-disabled-tint': '#fff',
                        '--reactist-btn-disabled-fill': '#ccc',
                    }}
                >
                    Enabled
                </LoadingButton>
            </Box>
            <Box>
                <LoadingButton
                    variant="primary"
                    disabled
                    style={{
                        '--reactist-btn-idle-tint': '#eee',
                        '--reactist-btn-idle-fill': '#666',
                        '--reactist-btn-hover-tint': '#fff',
                        '--reactist-btn-hover-fill': '#777',
                        '--reactist-btn-disabled-tint': '#fff',
                        '--reactist-btn-disabled-fill': '#ccc',
                    }}
                >
                    Disabled
                </LoadingButton>
            </Box>
        </Inline>
    ),

    parameters: {
        docs: {
            source: {
                type: 'code',
            },
        },
    },

    name: 'Customized colors',
}

export const FullWidth = {
    render: FullWidthTemplate.bind({}),
    name: 'Full-width',

    parameters: {
        docs: {
            source: {
                type: 'code',
            },
        },

        chromatic: {
            disableSnapshot: false,
        },
    },

    args: {
        label: 'Submit',
        variant: 'primary',
        tone: 'normal',
        size: 'normal',
        shape: 'normal',
        width: 'full',
    },

    argTypes: {
        label: {
            control: {
                type: 'select',
            },

            options: [
                'OK',
                'Submit',
                'Mark as done',
                'Yes, cancel my subscription',
                'Click me <em>now</em>',
                'If you click me now, youʼll take away the biggest part of me',
            ],

            defaultValue: 'Submit',
        },

        variant: {
            options: ['primary', 'secondary', 'tertiary', 'quaternary'],

            control: {
                type: 'select',
            },

            defaultValue: 'primary',
        },

        tone: {
            options: ['normal', 'destructive'],

            control: {
                type: 'inline-radio',
            },

            defaultValue: 'normal',
        },

        size: {
            options: ['small', 'normal', 'large'],

            control: {
                type: 'inline-radio',
            },

            defaultValue: 'normal',
        },

        shape: {
            options: ['normal', 'rounded'],

            control: {
                type: 'inline-radio',
            },

            defaultValue: 'normal',
        },

        width: {
            options: ['none', 'xsmall', 'small', 'medium', 'large', 'xlarge', 'full'],

            control: {
                type: 'select',
            },

            defaultValue: 'full',
        },

        align: {
            control: false,
        },

        disabled: {
            control: false,
        },

        startIcon: {
            control: false,
        },

        endIcon: {
            control: false,
        },

        icon: {
            control: false,
        },

        tooltip: {
            control: false,
        },

        exceptionallySetClassName: {
            control: false,
        },
    },
}

export const Playground = {
    render: PlaygroundTemplate.bind({}),
    name: 'Playground',

    parameters: {
        docs: {
            source: {
                type: 'code',
            },
        },
    },

    args: {
        label: 'Submit',
        variant: 'primary',
        tone: 'normal',
        size: 'normal',
        shape: 'normal',
    },

    argTypes: {
        label: {
            control: {
                type: 'select',
            },

            options: [
                'OK',
                'Submit',
                'Mark as done',
                'Yes, cancel my subscription',
                'Click me <em>now</em>',
                'If you click me now, youʼll take away the biggest part of me',
            ],

            defaultValue: 'Submit',
        },

        variant: {
            options: ['primary', 'secondary', 'tertiary', 'quaternary'],

            control: {
                type: 'select',
            },

            defaultValue: 'primary',
        },

        tone: {
            options: ['normal', 'destructive'],

            control: {
                type: 'inline-radio',
            },

            defaultValue: 'normal',
        },

        size: {
            options: ['small', 'normal', 'large'],

            control: {
                type: 'inline-radio',
            },

            defaultValue: 'normal',
        },

        shape: {
            options: ['normal', 'rounded'],

            control: {
                type: 'inline-radio',
            },

            defaultValue: 'normal',
        },

        disabled: {
            control: false,
        },

        startIcon: {
            control: false,
        },

        endIcon: {
            control: false,
        },

        icon: {
            control: false,
        },

        tooltip: {
            control: false,
        },

        exceptionallySetClassName: {
            control: false,
        },
    },
}

export const DarkMode = {
    render: DarkModeTemplate.bind({}),
    name: 'Dark mode',

    parameters: {
        docs: {
            source: {
                type: 'dynamic',
            },
        },
    },

    args: {
        label: 'Submit',
        variant: 'primary',
        tone: 'normal',
        size: 'normal',
    },

    argTypes: {
        label: {
            control: {
                type: 'select',
            },

            options: [
                'Submit',
                'Mark as done',
                'Yes, cancel my subscription',
                'Click me <em>now</em>',
            ],

            defaultValue: 'Submit',
        },

        variant: {
            options: ['primary', 'secondary', 'tertiary', 'quaternary'],

            control: {
                type: 'select',
            },

            defaultValue: 'primary',
        },

        tone: {
            options: ['normal', 'destructive'],

            control: {
                type: 'inline-radio',
            },

            defaultValue: 'normal',
        },

        size: {
            options: ['small', 'normal', 'large'],

            control: {
                type: 'inline-radio',
            },

            defaultValue: 'normal',
        },

        disabled: {
            control: false,
        },

        startIcon: {
            control: false,
        },

        endIcon: {
            control: false,
        },

        icon: {
            control: false,
        },

        tooltip: {
            control: false,
        },

        exceptionallySetClassName: {
            control: false,
        },
    },
}
