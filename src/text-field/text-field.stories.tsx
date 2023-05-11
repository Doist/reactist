import * as React from 'react'
import { selectWithNone, PartialProps } from '../utils/storybook-helper'

import { Box } from '../box'
import { Stack } from '../stack'
import { Text } from '../text'
import { TextField } from './'

import type { BoxMaxWidth } from '../box'

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
    startIcon = false,
    ...props
}: Omit<PartialProps<typeof TextField>, 'startIcon'> & { startIcon?: boolean }) {
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
            startIcon={startIcon ? <Icon /> : undefined}
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
    startIcon: {
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
                startIcon={<Icon />}
                placeholder="Text field with an icon"
            />
            <TextField
                variant="bordered"
                label="Search (bordered variant)"
                startIcon={<Icon />}
                placeholder="Text field with an icon"
            />
        </Box>
    )
}
