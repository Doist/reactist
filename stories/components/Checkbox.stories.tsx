import React, { useState } from 'react'

import Checkbox from '../../src/components/checkbox'

// Story setup ================================================================

export default {
    title: 'Components/Checkbox',
    component: Checkbox,
    parameters: {
        badges: ['deprecated'],
    },
}

// Story Definitions ==========================================================

export const CheckboxStory = () => {
    const [checked, setChecked] = useState<boolean>(false)

    const handleCheck = () => {
        setChecked((prev: boolean) => !prev)
    }

    return (
        <section className="story">
            <p>Checkbox</p>
            <Checkbox
                label="Checkbox with a clickable label"
                checked={checked}
                onChange={handleCheck}
            />
        </section>
    )
}

export const CheckboxPlaygroundStory = (args) => {
    const [checked, setChecked] = useState<boolean>(false)

    const handleCheck = () => {
        setChecked((prev: boolean) => !prev)
    }
    return (
        <section className="story">
            <Checkbox checked={checked} {...args} onChange={handleCheck} />
        </section>
    )
}

CheckboxPlaygroundStory.args = {
    label: 'Label next to the checkbox',
    disabled: false,
}

CheckboxPlaygroundStory.argTypes = {
    disabled: {
        control: {
            type: 'boolean',
        },
    },
    checked: {
        control: {
            type: 'boolean',
        },
    },
}
