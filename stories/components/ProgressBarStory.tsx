import './styles/progressbar_story.less'

import React from 'react'
import { storiesOf } from '@storybook/react'
import { withKnobs, number } from '@storybook/addon-knobs'

import { getPropTypesStory, optionsSourceOnly, optionsNoSourceNoProps } from '../utils/StoryUtils'

import ProgressBar from '../../src/components/ProgressBar'

// Story Definitions ==========================================================
const ProgressBarPropTypesStory = getPropTypesStory(ProgressBar)
const ProgressBarPropTypesChapter = {
    subtitle: 'Component Usage',
    sections: [
        {
            sectionFn: ProgressBarPropTypesStory,
            options: optionsNoSourceNoProps,
        },
    ],
}

const ProgressBarStory = () => (
    <section className="story">
        <ProgressBar fillPercentage={0} />
        <ProgressBar fillPercentage={25} />
        <ProgressBar fillPercentage={50} />
        <ProgressBar fillPercentage={75} />
        <ProgressBar fillPercentage={100} />
    </section>
)
const ProgressBarChapter = {
    subtitle: 'Progress Bars',
    sections: [{ sectionFn: ProgressBarStory, options: optionsSourceOnly }],
}

const ProgressBarPlaygroundStory = () => (
    <section className="story">
        <ProgressBar fillPercentage={number('Fill Percentage:', 50)} />
    </section>
)

// Story setup ================================================================
const Story = () =>
    storiesOf('ProgressBar', module)
        .addDecorator(withKnobs)
        .addWithChapters('Component Overview', {
            chapters: [ProgressBarPropTypesChapter, ProgressBarChapter],
        })
        .add('Component Playground', ProgressBarPlaygroundStory)

export { Story as ProgressBarStory }
