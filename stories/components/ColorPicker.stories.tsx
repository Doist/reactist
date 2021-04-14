import React, { useState } from 'react'

import ColorPicker from '../../src/components/color-picker'

// Story setup ================================================================

export default {
    title: 'ColorPicker',
    component: ColorPicker,
}

// Story Definitions ==========================================================

export const ColorPickersStory = () => {
    const [color, setColor] = useState<number>(0)

    return (
        <section className="story">
            <p>Color Picker</p>
            <ColorPicker color={color} onChange={() => setColor(color)} />
        </section>
    )
}

export const CustomColorPickersStory = () => {
    const [color, setColor] = useState<number>(0)

    return (
        <section className="story">
            <p>Custom Colors Color Picker</p>
            <ColorPicker
                color={color}
                onChange={() => setColor(color)}
                colorList={['red', 'green', 'palegoldenrod', '#FF00FF']}
            />
        </section>
    )
}

export const NamedColorPickersStory = () => {
    const [color, setColor] = useState<number>(0)

    return (
        <section className="story">
            <p>Named Colors Color Picker</p>
            <ColorPicker
                color={color}
                onChange={() => setColor(color)}
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

    return (
        <section className="story">
            <p>Small Color Picker</p>
            <ColorPicker small color={color} onChange={() => setColor(color)} />
        </section>
    )
}
