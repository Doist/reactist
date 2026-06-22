import * as React from 'react'

import { Box } from '../box'
import { Button } from '../button'
import { Column, Columns } from '../columns'
import { Stack } from '../stack'
import { Text } from '../text'
import { TextLink } from '../text-link'

import { Badge } from './badge'

function PlaygroundTemplate({ tone, label }) {
    return (
        <Stack space="large" maxWidth="medium">
            <div>
                <Badge tone={tone} label={label} />
            </div>
        </Stack>
    )
}

function BadgeExamples() {
    return (
        <Columns space="xxlarge">
            <Column width="content">
                <Stack space="medium">
                    <Text>Tone</Text>
                    <div>
                        <Badge tone="info" label="Info" />
                    </div>
                    <div>
                        <Badge tone="positive" label="Positive" />
                    </div>
                    <div>
                        <Badge tone="promote" label="Promote" />
                    </div>
                    <div>
                        <Badge tone="attention" label="Attention" />
                    </div>
                    <div>
                        <Badge tone="warning" label="Warning" />
                    </div>
                </Stack>
            </Column>
            <Column width="content">
                <Stack space="medium">
                    <Text>Example</Text>
                    <div>
                        <Badge tone="info" label="Upgrade" />
                    </div>
                    <div>
                        <Badge tone="positive" label="New" />
                    </div>
                    <div>
                        <Badge tone="promote" label="Beta" />
                    </div>
                    <div>
                        <Badge tone="attention" label="Save 25%" />
                    </div>
                    <div>
                        <Badge tone="warning" label="Deprecated" />
                    </div>
                </Stack>
            </Column>
        </Columns>
    )
}

function DarkModeTemplate() {
    return (
        <Box
            padding="xlarge"
            style={{
                backgroundColor: '#202020',
                '--reactist-content-primary': 'rgba(255, 255, 255, 0.88)',
                // tone="info"
                '--reactist-badge-info-tint': '#B3B3B3',
                '--reactist-badge-info-fill': '#363636',
                // tone="positive"
                '--reactist-badge-positive-tint': '#08A531',
                '--reactist-badge-positive-fill': '#19231B',
                // tone="promote"
                '--reactist-badge-promote-tint': '#FF8C1A',
                '--reactist-badge-promote-fill': '#412A06',
                // tone="attention"
                '--reactist-badge-attention-tint': '#CF473A',
                '--reactist-badge-attention-fill': '#351E1C',
                // tone="warning
                '--reactist-badge-warning-tint': '#cf473a',
                '--reactist-badge-warning-fill': '#faead1',
            }}
        >
            <BadgeExamples />
        </Box>
    )
}

export default {
    title: '📊 Data display/Badge',
    component: Badge,

    parameters: {
        badges: ['accessible'],
        figma: {
            path: 'Web › Components / Todoist › Badge',
            url: 'https://www.figma.com/design/LYlWNzvhMDh907l07mPPQk/Product-Library---Web?node-id=9038-280657',
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
        tone: 'info',
        label: 'Upgrade',
    },

    argTypes: {
        tone: {
            options: ['info', 'positive', 'promote', 'attention', 'warning'],

            control: {
                type: 'inline-radio',
            },

            defaultValue: 'info',
        },

        label: {
            control: {
                type: 'text',
            },

            defaultValue: 'Upgrade',
        },

        id: {
            control: false,
        },
    },
}

export const MainDemo = {
    render: () => <BadgeExamples />,
    name: 'Main demo',

    parameters: {
        docs: {
            source: {
                type: 'dynamic',
            },
        },

        chromatic: {
            disableSnapshot: false,
        },
    },
}

export const InsideOtherElements = {
    render: () => (
        <Stack space="medium" paddingX="medium">
            <Box marginX="-large">
                <Button variant="secondary" size="large">
                    Reminders <Badge tone="promote" label="Pro" />
                </Button>
            </Box>
            <div>
                You can have badges inside{' '}
                <TextLink>
                    links <Badge tone="info" label="New" />
                </TextLink>
            </div>
        </Stack>
    ),

    name: 'Inside other elements',

    parameters: {
        docs: {
            source: {
                type: 'dynamic',
            },
        },

        chromatic: {
            disableSnapshot: false,
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
}
