import * as React from 'react'
import { selectWithNone, PartialProps } from '../storybook-helper'
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
    placeholder: {
        control: { type: 'text' },
        defaultValue: 'Type your password',
    },
    maxWidth: selectWithNone<BoxMaxWidth>(
        ['xsmall', 'small', 'medium', 'large', 'xlarge'],
        'small',
    ),
}
