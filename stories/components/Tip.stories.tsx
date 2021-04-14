import './styles/tip_story.less'

import React from 'react'
import { text } from '@storybook/addon-knobs'

import Tip from '../../src/components/tip'

// Story setup ================================================================

export default {
    title: 'Tip',
    component: Tip,
}

// Story Definitions ==========================================================

export const TipStory = () => (
    <section className="story tip">
        <p>Tip</p>
        <Tip
            title="Title of the Tip"
            message="Very helpful message that guides users to achieve their goals."
        />
    </section>
)

export const TipPlaygroundStory = (args) => (
    <section className="story tip">
        <Tip {...args} />
    </section>
)

TipPlaygroundStory.args = {
    title: text('Title', 'Title of the Tip'),
    message: text('Message', 'Very helpful message'),
}
