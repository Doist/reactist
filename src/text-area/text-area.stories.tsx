import * as React from 'react'
import { selectWithNone, PartialProps } from '../storybook-helper'

import { Stack } from '../stack'
import { Text } from '../text'
import { TextArea } from './'

import type { BoxMaxWidth } from '../box'

export default {
    title: 'Design system/TextArea',
    component: TextArea,
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
}: PartialProps<typeof TextArea>) {
    return (
        <TextArea
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
        defaultValue: 'User bio',
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
            'You’ll have a better experience in our community if others get to know a little bit about you.',
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
        defaultValue: 'Tell us something about yourself. Don’t be shy.',
    },
    maxWidth: selectWithNone<BoxMaxWidth>(
        ['xsmall', 'small', 'medium', 'large', 'xlarge', 'full'],
        'small',
    ),
}

export function MessageToneStory() {
    return (
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
    )
}

export function AutoExpandStory(props: PartialProps<typeof TextArea>) {
    return (
        <Stack space="xxlarge" dividers="secondary" maxWidth="medium">
            <TextArea
                {...props}
                label="What do you want to accomplish?"
                secondaryLabel="auto-expand enabled"
                hint="Write as much or as little as you want. The input area will auto-expand to fit what you've typed."
                autoExpand
            />
            <TextArea
                {...props}
                label="What do you want to accomplish?"
                secondaryLabel="No auto-expand"
                hint="This one will not auto-expand."
                autoExpand={false}
            />
        </Stack>
    )
}

AutoExpandStory.argTypes = {
    label: { control: false },
    secondaryLabel: { control: false },
    auxiliaryLabel: { control: false },
    hint: { control: false },
    rows: {
        control: { type: 'number' },
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
        defaultValue: '',
    },
    maxWidth: selectWithNone<BoxMaxWidth>(
        ['xsmall', 'small', 'medium', 'large', 'xlarge', 'full'],
        'small',
    ),
}
