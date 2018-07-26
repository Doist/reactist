import './styles/loading_story.less'

import React from 'react'
import { storiesOf } from '@storybook/react'

import {
    getPropTypesStory,
    optionsNoSourceNoProps,
    optionsSourceOnly
} from '../utils/StoryUtils'

import Loading from '../../../src/components/Loading'

// Story Definitions ==========================================================
const LoadingPropTypesStory = getPropTypesStory(Loading)
const LoadingPropTypesChapter = {
    subtitle: 'Component Usage',
    sections: [
        { sectionFn: LoadingPropTypesStory, options: optionsNoSourceNoProps }
    ]
}

const LoadingStory = () => (
    <section className="story loading">
        <Loading />
    </section>
)
const LoadingChapter = {
    subtitle: 'Loading',
    sections: [{ sectionFn: LoadingStory, options: optionsSourceOnly }]
}

// Story setup ================================================================
const Story = () =>
    storiesOf('Loading', module).addWithChapters('Component Overview', {
        chapters: [LoadingPropTypesChapter, LoadingChapter]
    })

export default Story
