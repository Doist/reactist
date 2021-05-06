import React from 'react'

import Icon from '../../src/components/icon'
import CloseIcon from '../../src/components/icons/CloseIcon.svg'

// Story setup ================================================================

export default {
    title: 'Icon',
    component: Icon,
}
// Story Definitions ==========================================================

export const IconStory = () => (
    <section className="story">
        <label>Default Icon (+ disabled state)</label>
        <Icon />
        <Icon disabled />
        <label>SVG Icon Component (+ disabled state)</label>
        <Icon icon={<CloseIcon />} />
        <Icon icon={<CloseIcon />} disabled />
        <label>Image Icon Component (+ disabled state)</label>
        <Icon image="https://loremflickr.com/72/72" />
        <Icon image="https://loremflickr.com/72/72" disabled />
    </section>
)

export const IconPlaygroundStory = (args) => (
    <section className="story">
        <Icon {...args} />
    </section>
)

IconPlaygroundStory.args = {
    image: 'https://loremflickr.com/72/72',
    hoveredImage: '',
    disabled: false,
}

IconPlaygroundStory.argTypes = {
    image: {
        control: {
            type: 'text',
        },
    },
    hoveredImage: {
        control: {
            type: 'text',
        },
    },
    disabled: {
        control: {
            type: 'boolean',
        },
    },
    tooltip: {
        control: {
            type: null,
        },
    },
    icon: {
        control: {
            type: null,
        },
    },
    className: {
        control: {
            type: null,
        },
    },
}
