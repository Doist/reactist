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
                </Stack>
            </Column>
        </Columns>
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
            options: ['info', 'positive', 'promote', 'attention'],

            control: {
                type: 'inline-radio',
            },
        },

        label: {
            control: {
                type: 'text',
            },
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
