import React, { useState } from 'react'

import Select from '../../src/components/select'

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

export const SelectStory = () => {
    const [value, setValue] = useState<string>(options[0].value)

    const handleChange = (val) => {
        setValue(val)
    }

    return (
        <section className="story">
            <Select value={value} options={options} onChange={handleChange} />
        </section>
    )
}

export const SelectPlaygroundStory = (args) => {
    const [value, setValue] = useState<string>(options[0].value)

    const handleChange = (val) => {
        setValue(val)
    }

    return (
        <section className="story">
            <Select {...args} value={value} options={options} onChange={handleChange} />
        </section>
    )
}

SelectPlaygroundStory.args = {
    disabled: false,
}

SelectPlaygroundStory.argTypes = {
    disabled: {
        control: {
            type: 'boolean',
        },
    },
    value: {
        control: {
            type: null,
        },
    },
    defaultValue: {
        control: {
            type: null,
        },
    },
    className: {
        control: {
            type: null,
        },
    },
    options: {
        control: {
            type: null,
        },
    },
}
