import React from 'react'
import { storiesOf } from '@storybook/react'
import { withKnobs, text, boolean } from '@storybook/addon-knobs'

import { getPropTypesStory, optionsNoSourceNoProps, optionsSourceOnly } from '../utils/StoryUtils'

import Icon from '../../src/components/Icon'
import CloseIcon from '../../src/components/icons/CloseIcon.svg'

// Story Definitions ==========================================================
const IconPropTypesStory = getPropTypesStory(Icon)
const IconPropTypesChapter = {
    subtitle: 'Component Usage',
    sections: [{ sectionFn: IconPropTypesStory, options: optionsNoSourceNoProps }],
}

const IconStory = () => (
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
const IconChapter = {
    subtitle: 'Icons',
    sections: [{ sectionFn: IconStory, options: optionsSourceOnly }],
}

const IconPlaygroundStory = () => (
    <section className="story">
        <Icon
            image={text('Image URL', 'https://loremflickr.com/72/72')}
            hoveredImage={text('Hovered Image URL', '')}
            disabled={boolean('Disabled', false)}
        />
    </section>
)

// Story setup ================================================================
const Story = () =>
    storiesOf('Icon', module)
        .addDecorator(withKnobs)
        .addWithChapters('Component Overview', {
            chapters: [IconPropTypesChapter, IconChapter],
        })
        .add('Component Playground', IconPlaygroundStory)

export { Story as IconStory }
