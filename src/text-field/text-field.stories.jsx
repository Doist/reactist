import * as React from 'react'

import { Box } from '../box'
import { Button, IconButton } from '../button'
import { Stack } from '../stack'
import { Text } from '../text'
import { Tooltip } from '../tooltip'
import { selectWithNone } from '../utils/storybook-helper'

import { TextField } from './'

function SearchIcon() {
    return (
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24">
            <path
                d="M10.5 3a7.5 7.5 0 015.645 12.438l4.709 4.708a.502.502 0 01-.708.708l-4.708-4.709A7.5 7.5 0 1110.5 3zm0 1a6.5 6.5 0 100 13 6.5 6.5 0 000-13z"
                fill="currentColor"
            />
        </svg>
    )
}

function CloseIcon() {
    return (
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24">
            <path
                d="M5.146 5.146a.5.5 0 0 1 .708 0L12 11.293l6.146-6.147a.5.5 0 0 1 .638-.057l.07.057a.5.5 0 0 1 0 .708L12.707 12l6.147 6.146a.5.5 0 0 1 .057.638l-.057.07a.5.5 0 0 1-.708 0L12 12.707l-6.146 6.147a.5.5 0 0 1-.638.057l-.07-.057a.5.5 0 0 1 0-.708L11.293 12 5.146 5.854a.5.5 0 0 1-.057-.638z"
                fill="currentColor"
            />
        </svg>
    )
}

function preventDefault(event) {
    event.preventDefault()
}

function InteractivePropsStory({
    label,
    auxiliaryLabel,
    startSlot = false,
    endSlot = false,
    ...props
}) {
    return (
        <TextField
            {...props}
            label={label}
            auxiliaryLabel={
                auxiliaryLabel ? (
                    <a href="#" onClick={preventDefault}>
                        {auxiliaryLabel}
                    </a>
                ) : undefined
            }
            startSlot={startSlot ? <SearchIcon /> : undefined}
            endSlot={endSlot ? <CloseIcon /> : undefined}
        />
    )
}

function ClearButtonIcon() {
    return (
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
            <g fill="none" fillRule="evenodd">
                <g fill="currentColor" fillRule="nonzero">
                    <g>
                        <g>
                            <path
                                d="M8.854 8.146L12 11.293l3.146-3.147c.196-.195.512-.195.708 0 .195.196.195.512 0 .708L12.707 12l3.147 3.146c.195.196.195.512 0 .708-.196.195-.512.195-.708 0L12 12.707l-3.146 3.147c-.196.195-.512.195-.708 0-.195-.196-.195-.512 0-.708L11.293 12 8.146 8.854c-.195-.196-.195-.512 0-.708.196-.195.512-.195.708 0z"
                                transform="translate(-378 -86) translate(342 50) translate(36 36)"
                            />
                        </g>
                    </g>
                </g>
            </g>
        </svg>
    )
}

function ClearButtonExample({ slot }) {
    const [value, setValue] = React.useState('')
    const clearButton = (
        <IconButton
            variant="quaternary"
            icon={<ClearButtonIcon />}
            aria-label="Clear search"
            onClick={() => setValue('')}
        />
    )
    return (
        <TextField
            label="Search"
            value={value}
            placeholder={`${slot}={…}`}
            onChange={(event) => setValue(event.currentTarget.value)}
            startSlot={slot === 'startSlot' ? clearButton : undefined}
            endSlot={slot === 'endSlot' ? clearButton : undefined}
        />
    )
}

function WithTooltipExample() {
    const [value, setValue] = React.useState('')
    const isValidNumber = /^\s*(\d{1,3})?\s*$/.test(value)
    return (
        <Tooltip content={isValidNumber ? null : 'Invalid age'} position="top-end">
            <TextField
                label="What’s your age?"
                value={value}
                onChange={(event) => setValue(event.currentTarget.value)}
                tone={isValidNumber ? 'neutral' : 'error'}
                message="This field acceps only numeric inputs. Try typing valid and invalid values to see how it behaves."
                maxWidth="small"
                onBlur={() => {
                    setValue(isValidNumber ? value.trim() : '')
                }}
            />
        </Tooltip>
    )
}

function WithBorderedExample() {
    return (
        <TextField label="Company name" placeholder="Text field with a border" variant="bordered" />
    )
}

function WithBorderedAndEndSlotExample({ endSlotPosition = 'fullHeight' } = {}) {
    return (
        <TextField
            label="Company name"
            placeholder="Text field with a border and end slot"
            variant="bordered"
            endSlot={<IconButton variant="primary" icon="😄" aria-label="Say cheese!" />}
            endSlotPosition={endSlotPosition}
        />
    )
}

function WithMaxLengthExample() {
    const [value, setValue] = React.useState('Doist')
    return (
        <TextField
            label="Company name"
            maxLength={30}
            value={value}
            onChange={(event) => setValue(event.currentTarget.value)}
            maxWidth="small"
        />
    )
}

function WithCharacterCountPositionExample() {
    return (
        <TextField
            label="Company name"
            maxLength={30}
            characterCountPosition="inline"
            maxWidth="small"
        />
    )
}

function WithCharacterCountPositionBelowExample() {
    return (
        <TextField
            label="Company name"
            maxLength={30}
            characterCountPosition="below"
            maxWidth="small"
        />
    )
}

function WithCharacterCountPositionHiddenExample() {
    return (
        <TextField
            label="Company name"
            maxLength={30}
            characterCountPosition="hidden"
            maxWidth="small"
        />
    )
}

export default {
    title: '📝 Form/TextField',
    component: TextField,

    parameters: {
        badges: ['accessible'],
        figma: {
            path: '24Q3 Foundation › Text field',
            url: 'https://www.figma.com/design/5gTX7MuUxhCIvL6WK87JVA/24Q3-Foundation?node-id=1987-64913',
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
        label: 'Your name',
        tone: 'neutral',
        maxWidth: 'small',
        startSlot: false,
        endSlot: false,
        variant: 'default',
        auxiliaryLabel: 'Need help?',
        message:
            'We need your name for billing and shipping purposes. Make sure to enter it correctly.',
        placeholder: 'Enter your name as it appears in your ID',
        maxLength: null,
        disabled: false,
        readOnly: false,
        characterCountPosition: undefined,
        endSlotPosition: undefined,
    },

    argTypes: {
        label: {
            control: {
                type: 'text',
            },

            defaultValue: 'Your name',
        },

        value: {
            table: {
                disable: true,
            },
        },

        tone: {
            options: ['neutral', 'success', 'error', 'loading'],

            control: {
                type: 'inline-radio',
            },

            defaultValue: 'neutral',
        },

        maxWidth: selectWithNone(['xsmall', 'small', 'medium', 'large', 'xlarge', 'full'], 'small'),

        startSlot: {
            control: {
                type: 'boolean',
            },

            defaultValue: false,
        },

        endSlot: {
            control: {
                type: 'boolean',
            },

            defaultValue: false,
        },

        variant: {
            options: ['default', 'bordered'],

            control: {
                type: 'inline-radio',
            },

            defaultValue: 'default',
        },

        auxiliaryLabel: {
            control: {
                type: 'text',
            },

            defaultValue: 'Need help?',
        },

        message: {
            control: {
                type: 'text',
            },

            defaultValue:
                'We need your name for billing and shipping purposes. Make sure to enter it correctly.',
        },

        placeholder: {
            control: {
                type: 'text',
            },

            defaultValue: 'Enter your name as it appears in your ID',
        },

        maxLength: {
            control: {
                type: 'number',
            },

            defaultValue: null,
        },

        disabled: {
            control: {
                type: 'boolean',
            },

            defaultValue: false,
        },

        readOnly: {
            control: {
                type: 'boolean',
            },

            defaultValue: false,
        },

        characterCountPosition: {
            options: [undefined, 'hidden', 'inline', 'below'],

            control: {
                type: 'inline-radio',
            },

            defaultValue: undefined,
        },

        endSlotPosition: {
            options: [undefined, 'bottom', 'fullHeight'],

            control: {
                type: 'inline-radio',
            },

            defaultValue: undefined,
        },
    },
}

export const MessageTone = {
    render: () => (
        <Stack space="xxlarge" dividers="secondary">
            <TextField
                label="Verification code"
                message="Verifying code…"
                tone="loading"
                disabled
                maxWidth="small"
            />
            <TextField
                label="Verification code"
                message="Invalid code. Please, try again."
                tone="error"
                maxWidth="small"
            />
            <TextField
                label="Verification code"
                message="Code verification successful!"
                tone="success"
                maxWidth="small"
            />
            <TextField
                label="Verification code"
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
        <Stack space="xlarge" dividers="secondary" maxWidth="small">
            <Stack as="label" htmlFor="custom-textfield" space="small">
                <Text size="subtitle">Custom label is up here</Text>
                <Text size="caption" tone="secondary" aria-hidden>
                    <em>(click me to focus the input element)</em>
                </Text>
            </Stack>
            <TextField
                label={null}
                id="custom-textfield"
                aria-describedby="custom-description"
                placeholder="Text field without a built-in label"
            />
            <Stack space="small" id="custom-description">
                <Text size="body">Custom description is down here</Text>
                <Text size="caption" tone="secondary" aria-hidden>
                    <em>(inspect the input element accessibility properties if you are curious)</em>
                </Text>
            </Stack>
        </Stack>
    ),

    name: 'Without label',
}

export const Icons = {
    render: () => (
        <Box maxWidth="small" display="flex" flexDirection="column" gap="large">
            <TextField
                label="Search (default variant)"
                startSlot={<SearchIcon />}
                placeholder="Text field with an icon"
            />
            <TextField
                variant="bordered"
                label="Search (bordered variant)"
                startSlot={<SearchIcon />}
                placeholder="Text field with an icon"
            />
        </Box>
    ),

    name: 'Icons',

    parameters: {
        chromatic: {
            disableSnapshot: false,
        },
    },
}

export const ActionButton = {
    render: () => (
        <Box maxWidth="small" display="flex" flexDirection="column" gap="large">
            <ClearButtonExample slot="startSlot" />
            <ClearButtonExample slot="endSlot" />
        </Box>
    ),

    name: 'Action button',

    parameters: {
        chromatic: {
            disableSnapshot: false,
        },
    },
}

export const WithTooltip = {
    render: () => <WithTooltipExample />,
    name: 'With tooltip',
}

export const BorderedVariant = {
    render: () => (
        <Stack space="xxlarge" dividers="secondary">
            <WithBorderedExample />
            <WithBorderedAndEndSlotExample />
            <WithBorderedAndEndSlotExample endSlotPosition="bottom" />
        </Stack>
    ),

    name: 'Bordered variant',
}

export const MaxLength = {
    render: () => <WithMaxLengthExample />,
    name: 'Max Length',
}

export const CharacterCountPosition = {
    render: () => (
        <Stack space="xxlarge" dividers="secondary">
            <WithCharacterCountPositionExample />
            <WithCharacterCountPositionBelowExample />
            <WithCharacterCountPositionHiddenExample />
        </Stack>
    ),

    name: 'Character count position',
}
