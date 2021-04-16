import './styles/tip_story.less'

import React from 'react'

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
    title: 'Title of the Tip',
    message: 'Very helpful message',
}

TipPlaygroundStory.argTypes = {
    className: {
        control: {
            type: null,
        },
    },
    top: {
        control: {
            type: null,
        },
    },
}
