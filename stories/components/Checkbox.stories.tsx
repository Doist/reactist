import React, { useState } from 'react'
import { withKnobs, text, boolean } from '@storybook/addon-knobs'

import Checkbox from '../../src/components/checkbox'

// Story setup ================================================================

export default {
    title: 'Checkbox',
    component: Checkbox,
    decorators: [withKnobs],
}

// Story Definitions ==========================================================

export const CheckboxStory = () => {
    const [checked, setChecked] = useState<boolean>(false)

    return (
        <section className="story">
            <p>Checkbox</p>
            <Checkbox
                label="Checkbox with a clickable label"
                checked={checked}
                onChange={() => setChecked((prev: boolean) => !prev)}
            />
        </section>
    )
}

export const CheckboxPlaygroundStory = () => {
    const [checked, setChecked] = useState<boolean>(false)

    return (
        <section className="story">
            <Checkbox
                label={text('Label', 'Label next to the checkbox')}
                checked={boolean('Checked', checked)}
                disabled={boolean('Disabled', false)}
                onChange={() => setChecked((prev: boolean) => !prev)}
            />
        </section>
    )
}
