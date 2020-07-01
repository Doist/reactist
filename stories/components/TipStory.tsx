import './styles/tip_story.less'

import React from 'react'
import { storiesOf } from '@storybook/react'
import { withKnobs, text } from '@storybook/addon-knobs'

import { getPropTypesStory, optionsNoSourceNoProps, optionsSourceOnly } from '../utils/StoryUtils'

import Tip from '../../src/components/Tip'

// Story Definitions ==========================================================
const TipPropTypesStory = getPropTypesStory(Tip)
const TipPropTypesChapter = {
    subtitle: 'Component Usage',
    sections: [{ sectionFn: TipPropTypesStory, options: optionsNoSourceNoProps }],
}

const TipStory = () => (
    <section className="story tip">
        <Tip
            title="Title of the Tip"
            message="Very helpful message that guides users to achieve their goals."
        />
    </section>
)
const TipChapter = {
    subtitle: 'Tip',
    sections: [{ sectionFn: TipStory, options: optionsSourceOnly }],
}

const TipPlaygroundStory = () => (
    <section className="story tip">
        <Tip
            title={text('Title', 'Title of the Tip')}
            message={text('Message', 'Very helpful message')}
        />
    </section>
)

// Story setup ================================================================
const Story = () =>
    storiesOf('Tip', module)
        .addDecorator(withKnobs)
        .addWithChapters('Component Overview', {
            chapters: [TipPropTypesChapter, TipChapter],
        })
        .add('Component Playground', TipPlaygroundStory)

export default Story
