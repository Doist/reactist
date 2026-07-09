import * as React from 'react'

import { Box } from '../box'
import { Stack } from '../stack'
import { Text } from '../text'
import { selectWithNone } from '../utils/storybook-helper'

import { TextArea } from './'

function preventDefault(event) {
    event.preventDefault()
}

function InteractivePropsStory({
    label,
    auxiliaryLabel,
    value,
    controlled: _controlled,
    ...props
}) {
    return (
        <TextArea
            {...props}
            value={value}
            label={label}
            auxiliaryLabel={
                auxiliaryLabel ? (
                    <a href="#" onClick={preventDefault}>
                        {auxiliaryLabel}
                    </a>
                ) : undefined
            }
        />
    )
}

function AutoExpandStory(props) {
    const [value, setValue] = React.useState('')
    return (
        <Stack space="large" dividers="secondary" maxWidth="medium">
            <TextArea
                {...props}
                label="Text area with auto-expand"
                auxiliaryLabel="(controlled)"
                autoExpand
                value={value}
                onChange={(event) => setValue(event.target.value)}
                message="Write as much or as little as you want. The input area will auto-expand to fit what you've typed."
                rows={1}
                onKeyDown={(event) => {
                    if (event.key === 'Enter') {
                        event.preventDefault()
                        setValue('') // Clear the input programmatically
                    }
                }}
            />
            <Text size="caption" tone="secondary">
                If you press Enter, the input will be cleared. This allows you to test that
                auto-expand works when the input is cleared programmatically, shrinking the textarea
                to the new expected height.
            </Text>
        </Stack>
    )
}

function AutoExpandWithInitialValueStory(props) {
    const initialValue =
        'This is some text that takes up multiple lines. It should cause the textarea to render initially as large as needed to fit this text, even if its initial rows are not enough.'
    return (
        <Stack space="xxlarge" dividers="secondary" maxWidth="medium">
            <TextArea
                {...props}
                label="Text area with auto-expand and initial value"
                auxiliaryLabel="(uncontrolled)"
                message="Write as much or as little as you want. The input area will auto-expand to fit what you've typed."
                defaultValue={initialValue}
                rows={1}
                autoExpand
            />
        </Stack>
    )
}

export default {
    title: '📝 Form/TextArea',
    component: TextArea,

    parameters: {
        badges: ['accessible'],
        figma: {
            path: '24Q3 Foundation › Multi-line text field',
            url: 'https://www.figma.com/design/5gTX7MuUxhCIvL6WK87JVA/24Q3-Foundation?node-id=1987-546972',
        },
    },
}

export const InteractiveProps = {
    render: InteractivePropsStory.bind({}),
    name: 'Interactive props',

    parameters: {
        chromatic: {
            disableSnapshot: false,
        },
    },

    args: {
        label: 'User bio',
        controlled: false,
        value: '',
        tone: 'neutral',
        maxWidth: 'small',
        variant: 'default',
        auxiliaryLabel: 'Need help?',
        message:
            'You’ll have a better experience in our community if others get to know a little bit about you.',
        rows: 2,
        autoExpand: false,
        disableResize: false,
        placeholder: 'Tell us something about yourself. Don’t be shy.',
        maxLength: null,
        disabled: false,
        readOnly: false,
    },

    argTypes: {
        label: {
            control: {
                type: 'text',
            },
        },

        controlled: {
            control: {
                type: 'boolean',
            },
        },

        value: {
            if: {
                arg: 'controlled',
                truthy: true,
            },

            control: {
                type: 'text',
            },
        },

        tone: {
            options: ['neutral', 'success', 'error', 'loading'],

            control: {
                type: 'inline-radio',
            },
        },

        maxWidth: selectWithNone(['xsmall', 'small', 'medium', 'large', 'xlarge', 'full']),

        variant: {
            options: ['default', 'bordered'],

            control: {
                type: 'inline-radio',
            },
        },

        auxiliaryLabel: {
            control: {
                type: 'text',
            },
        },

        message: {
            control: {
                type: 'text',
            },
        },

        rows: {
            control: {
                type: 'number',
            },
        },

        autoExpand: {
            control: {
                type: 'boolean',
            },
        },

        disableResize: {
            control: {
                type: 'boolean',
            },
        },

        placeholder: {
            control: {
                type: 'text',
            },
        },

        maxLength: {
            control: {
                type: 'number',
            },
        },

        disabled: {
            control: {
                type: 'boolean',
            },
        },

        readOnly: {
            control: {
                type: 'boolean',
            },
        },
    },
}

export const MessageTone = {
    render: () => (
        <Stack space="xxlarge" dividers="secondary">
            <TextArea
                label="Profile bio"
                message="Saving changes…"
                tone="loading"
                disabled
                maxWidth="small"
            />
            <TextArea
                label="Profile bio"
                message="Too short. Don't be shy, tell us a bit more."
                tone="error"
                maxWidth="small"
            />
            <TextArea
                label="Profile bio"
                message="Changes saved successfully!"
                tone="success"
                maxWidth="small"
            />
            <TextArea
                label="Profile bio"
                message="This is the supporting text (helper or error) of the field, provided by the message prop"
                tone="neutral"
                maxWidth="small"
            />
        </Stack>
    ),

    name: 'Message tone',

    parameters: {
        chromatic: {
            disableSnapshot: false,
        },
    },
}

export const WithoutLabel = {
    render: () => (
        <Stack space="xlarge" dividers="secondary">
            <Stack as="label" htmlFor="custom-textarea" space="small">
                <Text size="subtitle">Custom label is up here</Text>
                <Text size="caption" tone="secondary" aria-hidden>
                    <em>(click me to focus the textarea)</em>
                </Text>
            </Stack>
            <TextArea
                label={null}
                id="custom-textarea"
                aria-describedby="custom-description"
                rows={8}
            />
            <Stack space="small" id="custom-description">
                <Text size="body">Custom description is down here</Text>
                <Text size="caption" tone="secondary" aria-hidden>
                    <em>(inspect the textarea accessibility properties if you are curious)</em>
                </Text>
            </Stack>
        </Stack>
    ),

    name: 'Without label',
}

export const AutoExpand = {
    render: AutoExpandStory.bind({}),
    name: 'Auto expand',

    args: {
        tone: 'neutral',
        maxWidth: 'small',
        variant: 'default',
        message: '',
        rows: 2,
        autoExpand: false,
        placeholder: '',
        disabled: false,
    },

    argTypes: {
        label: {
            control: false,
        },

        tone: {
            options: ['neutral', 'success', 'error', 'loading'],

            control: {
                type: 'inline-radio',
            },
        },

        maxWidth: selectWithNone(['xsmall', 'small', 'medium', 'large', 'xlarge', 'full']),

        variant: {
            options: ['default', 'bordered'],

            control: {
                type: 'inline-radio',
            },
        },

        auxiliaryLabel: {
            control: false,
        },

        message: {
            control: {
                type: 'text',
            },
        },

        rows: {
            control: {
                type: 'number',
            },
        },

        autoExpand: {
            control: {
                type: 'boolean',
            },
        },

        placeholder: {
            control: {
                type: 'text',
            },
        },

        disabled: {
            control: {
                type: 'boolean',
            },
        },
    },
}

export const AutoExpandWithInitialValue = {
    render: AutoExpandWithInitialValueStory.bind({}),
    name: 'Auto expand with initial value',

    args: {
        tone: 'neutral',
        maxWidth: 'small',
        variant: 'default',
        message: '',
        rows: 2,
        autoExpand: false,
        disableResize: false,
        placeholder: '',
        disabled: false,
        readOnly: false,
    },

    argTypes: {
        label: {
            control: false,
        },

        tone: {
            options: ['neutral', 'success', 'error', 'loading'],

            control: {
                type: 'inline-radio',
            },
        },

        maxWidth: selectWithNone(['xsmall', 'small', 'medium', 'large', 'xlarge', 'full']),

        variant: {
            options: ['default', 'bordered'],

            control: {
                type: 'inline-radio',
            },
        },

        auxiliaryLabel: {
            control: false,
        },

        message: {
            control: {
                type: 'text',
            },
        },

        rows: {
            control: {
                type: 'number',
            },
        },

        autoExpand: {
            control: {
                type: 'boolean',
            },
        },

        disableResize: {
            control: {
                type: 'boolean',
            },
        },

        placeholder: {
            control: {
                type: 'text',
            },
        },

        disabled: {
            control: {
                type: 'boolean',
            },
        },

        readOnly: {
            control: {
                type: 'boolean',
            },
        },
    },
}
