import React from 'react'
import { storiesOf } from '@storybook/react'

import { getPropTypesStory, emptySection, optionsSourceOnly, optionsNoSourceNoProps } from '../utils/StoryUtils'

import Input from '../../../src/components/Input'
import { inputPropsDescription } from './InputStoryTexts'

// Story Definitions ==========================================================
const InputPropTypesStory = getPropTypesStory(Input)
const InputPropTypesChapter = {
    subtitle: 'Component Usage',
    sections: [
        { sectionFn: InputPropTypesStory, options: optionsNoSourceNoProps },
        { sectionFn: emptySection, info: inputPropsDescription, options: optionsNoSourceNoProps }]
}

const InputStory = () => (
    <section className='story'>
        <Input placeholder='Simple input wrapper' />
    </section>
)
const InputChapter = {
    subtitle: 'Input',
    sections: [{ sectionFn: InputStory, options: optionsSourceOnly }]
}


// Story setup ================================================================
const input_story = () =>
storiesOf('Input', module)
    .addWithChapters('Component Overview', {
        chapters: [
            InputPropTypesChapter,
            InputChapter,
        ]
    })

export default input_story
