import './styles/progressbar_story.less'

import React from 'react'
import { withKnobs, number } from '@storybook/addon-knobs'

import ProgressBar from '../../src/components/progress-bar'

// Story setup ================================================================
export default {
    title: 'ProgressBar',
    component: ProgressBar,
    decorators: [withKnobs],
}

// Story Definitions ==========================================================

export const ProgressBarStory = () => (
    <section className="story">
        <p>Progress Bars</p>
        <ProgressBar fillPercentage={0} />
        <ProgressBar fillPercentage={25} />
        <ProgressBar fillPercentage={50} />
        <ProgressBar fillPercentage={75} />
        <ProgressBar fillPercentage={100} />
    </section>
)

export const ProgressBarPlaygroundStory = () => (
    <section className="story">
        <ProgressBar fillPercentage={number('Fill Percentage:', 50)} />
    </section>
)
