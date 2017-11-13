import './styles/loading_story.less'

import React from 'react'
import { storiesOf } from '@storybook/react'
import { withKnobs, text, boolean, number, select } from '@storybook/addon-knobs'

import { getPropTypesStory, optionsNoSourceNoProps, optionsSourceOnly } from '../utils/StoryUtils'

import Loading from '../../../src/components/Loading'

// Story Definitions ==========================================================
const LoadingPropTypesStory = getPropTypesStory(Loading)
const LoadingPropTypesChapter = {
    subtitle: 'Component Usage',
    sections: [{ sectionFn: LoadingPropTypesStory, options: optionsNoSourceNoProps }]
}

const LoadingStory = () => (
    <section className='story loading'>
        <Loading />
        <Loading white />
    </section>
)
const LoadingChapter =  {
    subtitle: 'Loading',
    sections: [{ sectionFn: LoadingStory, options: optionsSourceOnly }]
}

const LoadingPlaygroundStory = () => (
    <section className='story loading'>
        <Loading
            white={ boolean('White Loading', false)}
        />
    </section>
)

// Story setup ================================================================
const Story = () =>
storiesOf('Loading', module)
    .addDecorator(withKnobs)
    .addWithChapters('Component Overview', {
        chapters: [
            LoadingPropTypesChapter,
            LoadingChapter
        ]
    })
    .add('Component Playground', LoadingPlaygroundStory)

export default Story
