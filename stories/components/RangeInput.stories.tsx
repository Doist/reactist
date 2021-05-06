import React, { useState } from 'react'
import RangeInput from '../../src/components/range-input'

// Story setup ================================================================
export default {
    title: 'RangeInput',
    component: RangeInput,
}

// Story Definitions ==========================================================
export const RangeInputStory = () => {
    const [value, setValue] = useState<number>(50)

    const handleChange = (val) => {
        setValue(val)
    }

    return (
        <section className="story">
            <p>RangeInput</p>
            <RangeInput value={value} onChange={handleChange} />
        </section>
    )
}

export const RangeInputPlaygroundStory = (args) => {
    const [value, setValue] = useState<number>(50)

    const handleChange = (val) => {
        setValue(val)
    }

    return (
        <section className="story">
            <p>Current Value: {value}</p>
            <RangeInput {...args} value={value} onChange={handleChange} />
        </section>
    )
}

RangeInputPlaygroundStory.args = {
    stepSize: 1,
    min: 0,
    max: 100,
}

RangeInputPlaygroundStory.argTypes = {
    className: {
        control: {
            type: null,
        },
    },
}
