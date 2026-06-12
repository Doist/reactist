import * as React from 'react'

import { Stack } from '../stack'
import { Text } from '../text'

import { SwitchField } from './switch-field'

function Template({ label, message, disabled }) {
    return <SwitchField label={label || 'Default label'} message={message} disabled={disabled} />
}

export default {
    title: '📝 Form/SwitchField',
    component: SwitchField,

    parameters: {
        badges: ['accessible'],
    },
}

export const Playground = {
    render: Template.bind({}),
    name: 'Playground',

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

    args: {
        label: 'Show unread badge',
        tone: 'neutral',
        message: 'Show an icon badge to indicate that there are new threads and messages.',
        disabled: false,
    },

    argTypes: {
        label: {
            control: {
                type: 'text',
            },

            defaultValue: 'Show unread badge',
        },

        tone: {
            options: ['neutral', 'success', 'error', 'loading'],

            control: {
                type: 'inline-radio',
            },

            defaultValue: 'neutral',
        },

        message: {
            control: {
                type: 'text',
            },

            defaultValue: 'Show an icon badge to indicate that there are new threads and messages.',
        },

        disabled: {
            control: {
                type: 'boolean',
            },

            defaultValue: false,
        },
    },
}

export const AccessibilityAttributes = {
    render: () => (
        <Stack space="medium" dividers="primary">
            <Stack space="medium">
                <SwitchField aria-label="Golden Retriever" label="aria-label" />
                <Text tone="secondary">
                    A screen reader will announce the switch as "Golden Retriever".
                </Text>
            </Stack>
            <Stack space="medium">
                <SwitchField aria-labelledby="shibainu-text" label="aria-labelledby" />
                <Text id="shibainu-text">Shiba Inu</Text>
                <Text tone="secondary">
                    A screen reader will announce the switch as "Shiba Inu".
                </Text>
            </Stack>
            <Stack space="medium">
                <SwitchField aria-describedby="husky-text" label="aria-describedby" />
                <Text id="husky-text">Husky</Text>
                <Text tone="secondary">A screen reader will describe the switch as "Husky".</Text>
            </Stack>
        </Stack>
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
