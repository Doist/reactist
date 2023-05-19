import * as React from 'react'
import { selectWithNone, PartialProps } from '../utils/storybook-helper'

import { Box } from '../box'
import { Stack } from '../stack'
import { Text } from '../text'
import { TextField } from './'

import type { BoxMaxWidth } from '../box'
import { Button } from '../button'
import { Tooltip } from '../tooltip'

export default {
    title: 'Design system/TextField',
    component: TextField,
    parameters: {
        badges: ['accessible'],
    },
}

function Icon() {
    return (
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24">
            <path
                d="M10.5 3a7.5 7.5 0 015.645 12.438l4.709 4.708a.502.502 0 01-.708.708l-4.708-4.709A7.5 7.5 0 1110.5 3zm0 1a6.5 6.5 0 100 13 6.5 6.5 0 000-13z"
                fill="currentColor"
            />
        </svg>
    )
}

function preventDefault(event: React.SyntheticEvent) {
    event.preventDefault()
}

export function InteractivePropsStory({
    label,
    auxiliaryLabel,
    startSlot = false,
    ...props
}: Omit<PartialProps<typeof TextField>, 'startSlot'> & { startSlot?: boolean }) {
    return (
        <TextField
            {...props}
            label={label}
            auxiliaryLabel={
                auxiliaryLabel ? (
                    // eslint-disable-next-line jsx-a11y/anchor-is-valid
                    <a href="#" onClick={preventDefault}>
                        {auxiliaryLabel}
                    </a>
                ) : undefined
            }
            startSlot={startSlot ? <Icon /> : undefined}
        />
    )
}

InteractivePropsStory.parameters = {
    chromatic: { disableSnapshot: false },
}

InteractivePropsStory.argTypes = {
    label: {
        control: { type: 'text' },
        defaultValue: 'Your name',
    },
    secondaryLabel: {
        control: { type: 'text' },
        defaultValue: 'optional',
    },
    auxiliaryLabel: {
        control: { type: 'text' },
        defaultValue: 'Need help?',
    },
    hint: {
        control: { type: 'text' },
        defaultValue:
            'We need your name for billing and shipping purposes. Make sure to enter it correctly.',
    },
    message: {
        control: { type: 'text' },
        defaultValue: '',
    },
    tone: {
        options: ['neutral', 'success', 'error', 'loading'],
        control: { type: 'inline-radio' },
        defaultValue: 'neutral',
    },
    variant: {
        options: ['default', 'bordered'],
        control: { type: 'inline-radio' },
        defaultValue: 'default',
    },
    placeholder: {
        control: { type: 'text' },
        defaultValue: 'Enter your name as it appears in your ID',
    },
    maxWidth: selectWithNone<BoxMaxWidth>(
        ['xsmall', 'small', 'medium', 'large', 'xlarge'],
        'small',
    ),
    startSlot: {
        control: { type: 'boolean' },
        defaultValue: false,
    },
}

export function MessageToneStory() {
    return (
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
                message="Message with neutral tone (used as description, but still prefer the hint prop for that)"
                hint="This is the primary description of the field, provided by the hint prop"
                tone="neutral"
                maxWidth="small"
            />
        </Stack>
    )
}

MessageToneStory.parameters = {
    chromatic: { disableSnapshot: false },
}

export function WithoutLabelStory() {
    return (
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
    )
}

export function IconStory() {
    return (
        <Box maxWidth="small" display="flex" flexDirection="column" gap="large">
            <TextField
                label="Search (default variant)"
                startSlot={<Icon />}
                placeholder="Text field with an icon"
            />
            <TextField
                variant="bordered"
                label="Search (bordered variant)"
                startSlot={<Icon />}
                placeholder="Text field with an icon"
            />
        </Box>
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

IconStory.parameters = {
    chromatic: { disableSnapshot: false },
}

function ClearButtonExample({ slot }: { slot: 'startSlot' | 'endSlot' }) {
    const [value, setValue] = React.useState('')

    const clearButton = (
        <Button
            variant="quaternary"
            icon={<ClearButtonIcon />}
            aria-label="Clear search"
            onClick={() => setValue('')}
        />
    )

    return (
        <TextField
            label="Search"
            secondaryLabel={`${slot}={…}`}
            value={value}
            onChange={(event) => setValue(event.currentTarget.value)}
            startSlot={slot === 'startSlot' ? clearButton : undefined}
            endSlot={slot === 'endSlot' ? clearButton : undefined}
        />
    )
}

export function ActionButtonStory() {
    return (
        <Box maxWidth="small" display="flex" flexDirection="column" gap="large">
            <ClearButtonExample slot="startSlot" />
            <ClearButtonExample slot="endSlot" />
        </Box>
    )
}

ActionButtonStory.parameters = {
    chromatic: { disableSnapshot: false },
}

export function WithTooltipStory() {
    const [value, setValue] = React.useState('')
    const isValidNumber = /^\s*(\d{1,3})?\s*$/.test(value)

    return (
        <Box display="flex" flexDirection="column" gap="xlarge">
            <Box display="flex" flexDirection="column" gap="small">
                <Text>
                    As an alternative to the <code>`message`</code> prop, you can also use tooltips
                    to associate a description to a text field.{' '}
                    <strong>This is not recommended in general</strong>, because the description
                    will not be visible unless you’re hovering or focusing on the field.
                </Text>
                <Text>
                    However, it can work in a situation like the following: the description is only
                    needed to convey that the value being typed is invalid, and at the same time,
                    the field forces the value back to valid when blurred. Hence, the description is
                    never needed when the field is not focused anyway.
                </Text>
            </Box>
            <Tooltip content={isValidNumber ? null : 'Invalid age'} position="top-end">
                <TextField
                    label="What’s your age?"
                    value={value}
                    onChange={(event) => setValue(event.currentTarget.value)}
                    tone={isValidNumber ? 'neutral' : 'error'}
                    hint="This field acceps only numeric inputs. Try typing valid and invalid values to see how it behaves."
                    maxWidth="small"
                    onBlur={() => {
                        setValue(isValidNumber ? value.trim() : '')
                    }}
                />
            </Tooltip>
        </Box>
    )
}
