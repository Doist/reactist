import React, { useState } from 'react'

import ColorPicker from '../../src/components/color-picker'

// Story setup ================================================================

export default {
    title: 'Components/ColorPicker',
    component: ColorPicker,
    parameters: {
        badges: ['notAccessible'],
    },
}

// Story Definitions ==========================================================

export const ColorPickersStory = () => {
    const [color, setColor] = useState<number>(0)

    function handleChange(color: number) {
        setColor(color)
    }

    return (
        <section className="story">
            <p>Color Picker</p>
            <ColorPicker color={color} onChange={handleChange} />
        </section>
    )
}

export const CustomColorPickersStory = () => {
    const [color, setColor] = useState<number>(0)

    function handleChange(color: number) {
        setColor(color)
    }

    return (
        <section className="story">
            <p>Custom Colors Color Picker</p>
            <ColorPicker
                color={color}
                onChange={handleChange}
                colorList={['red', 'green', 'palegoldenrod', '#FF00FF']}
            />
        </section>
    )
}

export const NamedColorPickersStory = () => {
    const [color, setColor] = useState<number>(0)

    function handleChange(color: number) {
        setColor(color)
    }

    return (
        <section className="story">
            <p>Named Colors Color Picker</p>
            <ColorPicker
                color={color}
                onChange={handleChange}
                colorList={[
                    { color: 'red', name: 'Red' },
                    { color: 'green', name: 'Green' },
                    { color: 'palegoldenrod', name: 'Gold' },
                    { color: '#FF00FF', name: 'Pink' },
                    { color: '#ABCDEF', name: 'Blue-Gray-ish' },
                ]}
            />
        </section>
    )
}

export const SmallColorPickerStory = () => {
    const [color, setColor] = useState<number>(0)

    function handleChange(color: number) {
        setColor(color)
    }

    return (
        <section className="story">
            <p>Small Color Picker</p>
            <ColorPicker small color={color} onChange={handleChange} />
        </section>
    )
}
