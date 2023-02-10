import * as React from 'react'
import { selectWithNone, PartialProps } from '../utils/storybook-helper'

import { Stack } from '../stack'
import { Text } from '../text'
import { PasswordField } from './'

import type { BoxMaxWidth } from '../box'

export default {
    title: 'Design system/PasswordField',
    component: PasswordField,
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
}: PartialProps<typeof PasswordField>) {
    return (
        <PasswordField
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

InteractivePropsStory.parameters = {
    chromatic: { disableSnapshot: false },
}

InteractivePropsStory.argTypes = {
    label: {
        control: { type: 'text' },
        defaultValue: 'Password',
    },
    secondaryLabel: {
        control: { type: 'text' },
        defaultValue: 'optional',
    },
    auxiliaryLabel: {
        control: { type: 'text' },
        defaultValue: 'Forgot your password?',
    },
    hint: {
        control: { type: 'text' },
        defaultValue:
            'Must be at least 100 characters long, and it should include each letter of the alphabet',
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
        defaultValue: 'Type your password',
    },
    maxWidth: selectWithNone<BoxMaxWidth>(
        ['xsmall', 'small', 'medium', 'large', 'xlarge'],
        'small',
    ),
}

export function MessageToneStory() {
    return (
        <Stack space="xxlarge" dividers="secondary">
            <PasswordField
                label="Password confirmation"
                message="Comparing to original password…"
                tone="loading"
                disabled
                maxWidth="small"
            />
            <PasswordField
                label="Password confirmation"
                message="It does not match the original password"
                tone="error"
                maxWidth="small"
            />
            <PasswordField
                label="Password confirmation"
                message="Matches original password!"
                tone="success"
                maxWidth="small"
            />
            <PasswordField
                label="Password confirmation"
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
            <Stack as="label" htmlFor="custom-textarea" space="small">
                <Text size="subtitle">Custom label is up here</Text>
                <Text size="caption" tone="secondary" aria-hidden>
                    <em>(click me to focus the textarea)</em>
                </Text>
            </Stack>
            <PasswordField
                label={null}
                id="custom-textarea"
                aria-describedby="custom-description"
                placeholder="Password field without a built-in label"
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
