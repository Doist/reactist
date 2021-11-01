import * as React from 'react'
import { selectWithNone, PartialProps } from '../storybook-helper'
import { SelectField } from './'

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
    maxWidth: selectWithNone<BoxMaxWidth>(
        ['xsmall', 'small', 'medium', 'large', 'xlarge'],
        'small',
    ),
}
