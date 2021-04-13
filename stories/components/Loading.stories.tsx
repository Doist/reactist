import './styles/loading_story.less'

import React from 'react'
import { withKnobs, text, number } from '@storybook/addon-knobs'

import Loading from '../../src/components/loading'

// Story setup ================================================================

export default {
    title: 'Loading',
    component: Loading,
    decorators: [withKnobs],
}

// Story Definitions ==========================================================

export const LoadingStory = () => (
    <section className="story loading">
        <Loading aria-label="Loading…" />
    </section>
)

export const LoadingPlaygroundStory = () => (
    <section className="story">
        <Loading
            aria-label={text('aria-label:', 'Loading…')}
            size={number('size:', 24)}
            spinnerColor={text('Spinner Color:', '#3F82EF')}
            bgColor={text('Background Color:', '#D9E6FB')}
        />
    </section>
)
