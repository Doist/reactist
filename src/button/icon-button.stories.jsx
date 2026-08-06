import * as React from 'react'
import { useEffect, useState } from 'react'

import { withDarkTheme } from '../../.storybook/dark-theme'
import { Box } from '../box'
import { IconButton } from '../button'
import { Heading } from '../heading'
import { Inline } from '../inline'
import { Stack } from '../stack'
import { Text } from '../text'

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

function LoadingButton(props) {
    const [loading, setLoading] = useState(false)
    useEffect(() => {
        if (!loading) return undefined
        const timeout = setTimeout(() => setLoading(false), 3000)
        return () => clearTimeout(timeout)
    }, [loading])
    return (
        <IconButton {...props} loading={loading} onClick={() => setLoading(true)} icon={<Icon />} />
    )
}

function PlaygroundTemplate({ label, ...props }) {
    return (
        <Stack space="large">
            <Heading level="2">Click on the buttons to see the loading state</Heading>
            <Inline space="large">
                <Box>
                    <Stack space="large">
                        <Box maxWidth="xsmall">
                            <LoadingButton {...props} aria-label={label} />
                        </Box>
                        <Box maxWidth="xsmall">
                            <LoadingButton {...props} disabled aria-label={label} />
                        </Box>
                    </Stack>
                </Box>
            </Inline>
        </Stack>
    )
}

function DarkModeTemplate(props) {
    return (
        <Box padding="xlarge" background="default">
            <PlaygroundTemplate {...props} />
        </Box>
    )
}

export default {
    title: '🔘 Buttons & links/IconButton',
    component: IconButton,

    parameters: {
        badges: ['accessible'],
        figma: {
            path: 'Web › Components / Todoist › Buttons › Button (Variant=Icon)',
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
                        <LoadingButton variant="primary" aria-label="Primary" icon={<Icon />} />
                    </Box>
                    <Box>
                        <LoadingButton variant="secondary" aria-label="Secondary" icon={<Icon />} />
                    </Box>
                    <Box>
                        <LoadingButton variant="tertiary" aria-label="Tertiary" icon={<Icon />} />
                    </Box>
                    <Box>
                        <LoadingButton
                            variant="quaternary"
                            aria-label="Quaternary"
                            icon={<Icon />}
                        />
                    </Box>
                </Inline>
                <Inline space="large">
                    <Box>
                        <LoadingButton
                            variant="primary"
                            aria-label="Primary"
                            icon={<Icon />}
                            disabled
                        />
                    </Box>
                    <Box>
                        <LoadingButton
                            variant="secondary"
                            aria-label="Secondary"
                            icon={<Icon />}
                            disabled
                        />
                    </Box>
                    <Box>
                        <LoadingButton
                            variant="tertiary"
                            aria-label="Tertiary"
                            icon={<Icon />}
                            disabled
                        />
                    </Box>
                    <Box>
                        <LoadingButton
                            variant="quaternary"
                            aria-label="Quaternary"
                            icon={<Icon />}
                            disabled
                        />
                    </Box>
                </Inline>
            </Stack>
            <Stack space="large">
                <pre>tone="destructive"</pre>
                <Inline space="large">
                    <Box>
                        <LoadingButton
                            variant="primary"
                            aria-label="Primary"
                            icon={<Icon />}
                            tone="destructive"
                        />
                    </Box>
                    <Box>
                        <LoadingButton
                            variant="secondary"
                            aria-label="Secondary"
                            icon={<Icon />}
                            tone="destructive"
                        />
                    </Box>
                    <Box>
                        <LoadingButton
                            variant="tertiary"
                            aria-label="Tertiary"
                            icon={<Icon />}
                            tone="destructive"
                        />
                    </Box>
                    <Box>
                        <LoadingButton
                            variant="quaternary"
                            aria-label="Quaternary"
                            icon={<Icon />}
                            tone="destructive"
                        />
                    </Box>
                </Inline>
                <Inline space="large">
                    <Box>
                        <LoadingButton
                            variant="primary"
                            aria-label="Primary"
                            icon={<Icon />}
                            tone="destructive"
                            disabled
                        />
                    </Box>
                    <Box>
                        <LoadingButton
                            variant="secondary"
                            aria-label="Secondary"
                            icon={<Icon />}
                            tone="destructive"
                            disabled
                        />
                    </Box>
                    <Box>
                        <LoadingButton
                            variant="tertiary"
                            aria-label="Tertiary"
                            icon={<Icon />}
                            tone="destructive"
                            disabled
                        />
                    </Box>
                    <Box>
                        <LoadingButton
                            variant="quaternary"
                            aria-label="Quaternary"
                            icon={<Icon />}
                            tone="destructive"
                            disabled
                        />
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

export const WithDifferentSize = {
    render: () => (
        <Stack space="xxlarge">
            <Stack space="large">
                <pre>size="small"</pre>
                <Inline space="large">
                    <Box>
                        <LoadingButton
                            variant="primary"
                            aria-label="Primary"
                            icon={<Icon />}
                            size="small"
                        />
                    </Box>
                    <Box>
                        <LoadingButton
                            variant="secondary"
                            aria-label="Secondary"
                            icon={<Icon />}
                            size="small"
                        />
                    </Box>
                    <Box>
                        <LoadingButton
                            variant="tertiary"
                            aria-label="Tertiary"
                            icon={<Icon />}
                            size="small"
                        />
                    </Box>
                    <Box>
                        <LoadingButton
                            variant="quaternary"
                            aria-label="Quaternary"
                            icon={<Icon />}
                            size="small"
                        />
                    </Box>
                </Inline>
            </Stack>
            <Stack space="large">
                <pre>size="normal"</pre>
                <Inline space="large">
                    <Box>
                        <LoadingButton
                            variant="primary"
                            aria-label="Primary"
                            icon={<Icon />}
                            size="normal"
                        />
                    </Box>
                    <Box>
                        <LoadingButton
                            variant="secondary"
                            aria-label="Secondary"
                            icon={<Icon />}
                            size="normal"
                        />
                    </Box>
                    <Box>
                        <LoadingButton
                            variant="tertiary"
                            aria-label="Tertiary"
                            icon={<Icon />}
                            size="normal"
                        />
                    </Box>
                    <Box>
                        <LoadingButton
                            variant="quaternary"
                            aria-label="Quaternary"
                            icon={<Icon />}
                            size="normal"
                        />
                    </Box>
                </Inline>
            </Stack>
            <Stack space="large">
                <pre>size="large"</pre>
                <Inline space="large">
                    <Box>
                        <LoadingButton
                            variant="primary"
                            aria-label="Primary"
                            icon={<Icon />}
                            size="large"
                        />
                    </Box>
                    <Box>
                        <LoadingButton
                            variant="secondary"
                            aria-label="Secondary"
                            icon={<Icon />}
                            size="large"
                        />
                    </Box>
                    <Box>
                        <LoadingButton
                            variant="tertiary"
                            aria-label="Tertiary"
                            icon={<Icon />}
                            size="large"
                        />
                    </Box>
                    <Box>
                        <LoadingButton
                            variant="quaternary"
                            aria-label="Quaternary"
                            icon={<Icon />}
                            size="large"
                        />
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
                    aria-label="Enabled"
                />
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
                    aria-label="Disabled"
                />
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

export const Playground = {
    render: PlaygroundTemplate.bind({}),

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

            options: ['OK', 'Submit', 'Mark as done'],
        },

        variant: {
            options: ['primary', 'secondary', 'tertiary', 'quaternary'],

            control: {
                type: 'select',
            },
        },

        tone: {
            options: ['normal', 'destructive'],

            control: {
                type: 'inline-radio',
            },
        },

        size: {
            options: ['small', 'normal', 'large'],

            control: {
                type: 'inline-radio',
            },
        },

        shape: {
            options: ['normal', 'rounded'],

            control: {
                type: 'inline-radio',
            },
        },

        disabled: {
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

    name: 'Playground',
}

export const DarkMode = {
    render: DarkModeTemplate.bind({}),
    decorators: [withDarkTheme],

    parameters: {
        docs: {
            source: {
                type: 'dynamic',
            },
            // Render as an iframe to scope `theme_dark` to the story
            story: {
                inline: false,
                height: '320px',
            },
        },
    },

    name: 'Dark mode',

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
        },

        variant: {
            options: ['primary', 'secondary', 'tertiary', 'quaternary'],

            control: {
                type: 'select',
            },
        },

        tone: {
            options: ['normal', 'destructive'],

            control: {
                type: 'inline-radio',
            },
        },

        size: {
            options: ['small', 'normal', 'large'],

            control: {
                type: 'inline-radio',
            },
        },

        disabled: {
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
