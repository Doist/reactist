import React from 'react'

import Loading from '../../src/components/loading'
import './styles/loading_story.less'

// Story setup ================================================================

export default {
    title: 'Components/Loading',
    component: Loading,
}

// Story Definitions ==========================================================

export const LoadingStory = () => (
    <section className="story loading">
        <p>Loading</p>
        <Loading aria-label="Loading…" />
    </section>
)

export const LoadingPlaygroundStory = (args) => (
    <section className="story">
        <Loading {...args} />
    </section>
)

LoadingPlaygroundStory.args = {
    'aria-label': 'Loading',
    size: 24,
    spinnerColor: '#3F82EF',
    bgColor: '#D9E6FB',
}

LoadingPlaygroundStory.argTypes = {
    className: {
        control: {
            type: null,
        },
    },
}
