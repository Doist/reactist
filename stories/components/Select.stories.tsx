import * as React from 'react'

import Select from '../../src/components/deprecated-select'
import { Alert } from '../../src/alert'
import { Stack } from '../../src/stack'

const options = [
    { value: 'intro', text: 'Select a fruit', disabled: true },
    { value: 'apple', text: '🍎 Apple' },
    { value: 'pear', text: '🍐 Pear' },
    { value: 'fish', text: '🐟 Fish', disabled: true },
    { value: 'banana', text: '🍌 Banana' },
    { value: 'grapes', text: '🍇 Grapes' },
]

// Story setup ================================================================

export default {
    title: 'Components/Select',
    component: Select,
    parameters: {
        badges: ['deprecated'],
    },
}

// Story Definitions ==========================================================

export function SelectStory() {
    const [value, setValue] = React.useState<string>(options[0].value)

    return (
        <Stack as="section" exceptionallySetClassName="story" space="large">
            <Alert tone="critical">
                <strong>Deprecated:</strong> Please use{' '}
                <a href="reactist/?path=/docs/design-system-selectfield">SelectField</a> instead
            </Alert>

            <Select value={value} options={options} onChange={setValue} />
        </Stack>
    )
}

export function SelectPlaygroundStory(args) {
    const [value, setValue] = React.useState<string>(options[0].value)

    return (
        <section className="story">
            <Select {...args} value={value} options={options} onChange={setValue} />
        </section>
    )
}

SelectPlaygroundStory.args = {
    disabled: false,
}

SelectPlaygroundStory.argTypes = {
    disabled: {
        control: { type: 'boolean' },
    },
    value: {
        control: { type: null },
    },
    defaultValue: {
        control: { type: null },
    },
    className: {
        control: { type: null },
    },
    options: {
        control: { type: null },
    },
}
