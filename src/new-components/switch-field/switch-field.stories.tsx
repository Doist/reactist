import * as React from 'react'
import { PartialProps } from '../storybook-helper'
import { SwitchField } from './'

export default {
    title: 'Design system/SwitchField',
    component: SwitchField,
}

export function InteractivePropsStory({ label, ...props }: PartialProps<typeof SwitchField>) {
    return <SwitchField {...props} label={label || 'Default label'} />
}

InteractivePropsStory.argTypes = {
    label: {
        control: { type: 'text' },
        defaultValue: 'Show unread badge',
    },
    hint: {
        control: { type: 'text' },
        defaultValue: 'Show an icon badge to indicate that there are new threads and messages.',
    },
    disabled: {
        control: { type: 'boolean' },
        defaultValue: false,
    },
}
