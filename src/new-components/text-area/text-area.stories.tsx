import * as React from 'react'
import { selectWithNone, PartialProps } from '../storybook-helper'
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
    error: {
        control: { type: 'text' },
        defaultValue: '',
    },
    placeholder: {
        control: { type: 'text' },
        defaultValue: 'Tell us something about yourself. Don’t be shy.',
    },
    maxWidth: selectWithNone<BoxMaxWidth>(
        ['xsmall', 'small', 'medium', 'large', 'xlarge'],
        'small',
    ),
}
