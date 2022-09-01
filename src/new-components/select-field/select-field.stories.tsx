import * as React from 'react'
import { selectWithNone, PartialProps } from '../storybook-helper'
import { SelectField } from './'

import { Stack } from '../stack'
import { Text } from '../text'

import type { BoxMaxWidth } from '../box'

export default {
    title: 'Design system/SelectField',
    component: SelectField,
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
}: PartialProps<typeof SelectField>) {
    return (
        <SelectField
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
            defaultValue="-"
        >
            <option value="-" disabled>
                Select theme
            </option>
            <optgroup label="Light themes">
                <option value="default">Default theme</option>
                <option value="bright">Extra bright</option>
            </optgroup>
            <optgroup label="Dark themes">
                <option value="contrast">High contrast</option>
                <option value="dark">Dark mode</option>
            </optgroup>
        </SelectField>
    )
}

InteractivePropsStory.argTypes = {
    label: {
        control: { type: 'text' },
        defaultValue: 'Theme',
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
            'The theme you select will be applied immediately. If you upgrade to premium you will have more themes to choose from.',
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
    maxWidth: selectWithNone<BoxMaxWidth>(
        ['xsmall', 'small', 'medium', 'large', 'xlarge'],
        'small',
    ),
}

export function MessageToneStory() {
    return (
        <Stack space="xxlarge" dividers="secondary">
            <SelectField
                label="Country of residence"
                message="Saving…"
                tone="loading"
                disabled
                maxWidth="small"
            >
                <option value="none" disabled>
                    –
                </option>
            </SelectField>

            <SelectField
                label="Country of residence"
                message="Something went wrong. Please, try again."
                tone="error"
                maxWidth="small"
            >
                <option value="none" disabled>
                    –
                </option>
            </SelectField>

            <SelectField
                label="Country of residence"
                message="Saved successfully!"
                tone="success"
                maxWidth="small"
            >
                <option value="none" disabled>
                    –
                </option>
            </SelectField>

            <SelectField
                label="Country of residence"
                message="Message with neutral tone (used as description, but still prefer the hint prop for that)"
                hint="This is the primary description of the field, provided by the hint prop"
                tone="neutral"
                maxWidth="small"
            >
                <option value="none" disabled>
                    –
                </option>
            </SelectField>
        </Stack>
    )
}

export function WithoutLabelStory() {
    return (
        <Stack space="xlarge" dividers="secondary" maxWidth="small">
            <Stack as="label" htmlFor="custom-textarea" space="small">
                <Text size="subtitle">Custom label is up here</Text>
                <Text size="caption" tone="secondary" aria-hidden>
                    <em>(click me to focus the select element)</em>
                </Text>
            </Stack>
            <SelectField label={null} id="custom-textarea" aria-describedby="custom-description">
                <option value="none" disabled>
                    –
                </option>
            </SelectField>
            <Stack space="small" id="custom-description">
                <Text size="body">Custom description is down here</Text>
                <Text size="caption" tone="secondary" aria-hidden>
                    <em>
                        (inspect the select element accessibility properties if you are curious)
                    </em>
                </Text>
            </Stack>
        </Stack>
    )
}
