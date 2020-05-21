import React from 'react'
import { storiesOf } from '@storybook/react'
import { withKnobs, boolean, text } from '@storybook/addon-knobs'

import {
    getPropTypesStory,
    emptySection,
    optionsSourceOnly,
    optionsNoSourceNoProps,
} from '../utils/StoryUtils'

import Input from '../../src/components/Input'
import { inputPropsDescription } from './InputStory.md'

// Story Definitions ==========================================================
const InputPropTypesStory = getPropTypesStory(Input)
const InputPropTypesChapter = {
    subtitle: 'Component Usage',
    sections: [
        { sectionFn: InputPropTypesStory, options: optionsNoSourceNoProps },
        {
            sectionFn: emptySection,
            info: inputPropsDescription,
            options: optionsNoSourceNoProps,
        },
    ],
}

const InputStory = () => (
    <section className="story">
        <Input placeholder="Simple input wrapper" />
    </section>
)
const InputChapter = {
    subtitle: 'Input',
    sections: [{ sectionFn: InputStory, options: optionsSourceOnly }],
}

const InputPlaygroundStory = () => (
    <section className="story">
        <Input
            placeholder={text('Simple input wrapper')}
            disabled={boolean('Disabled:', false)}
        />
    </section>
)

// Story setup ================================================================
const Story = () =>
    storiesOf('Input', module)
        .addDecorator(withKnobs)
        .addWithChapters('Component Overview', {
            chapters: [InputPropTypesChapter, InputChapter],
        })
        .add('Component Playground', () => <InputPlaygroundStory />)

export default Story
