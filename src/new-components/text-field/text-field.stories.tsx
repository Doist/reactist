import * as React from 'react'
import { selectWithNone, PartialProps } from '../storybook-helper'
import { TextField } from './'

import type { BoxMaxWidth } from '../box'
import { Stack } from '../stack'

export default {
    title: 'Design system/TextField',
    component: TextField,
    parameters: {
        badges: ['accessible'],
    },
}

function preventDefault(event: React.SyntheticEvent) {
    event.preventDefault()
}

export function InteractivePropsStory({
    label,
    auxiliaryLabel,
    ...props
}: PartialProps<typeof TextField>) {
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
        />
    )
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
