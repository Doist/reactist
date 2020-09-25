import React from 'react'
import { storiesOf } from '@storybook/react'
import { withKnobs, text, number } from '@storybook/addon-knobs'

import { getPropTypesStory, optionsSourceOnly, optionsNoSourceNoProps } from '../utils/StoryUtils'

import ErrorMessage from '../../src/components/ErrorMessage'

// Story Definitions ==========================================================
const ErrorMessagePropTypesStory = getPropTypesStory(ErrorMessage)
const ErrorMessagePropTypesChapter = {
    subtitle: 'Component Usage',
    sections: [
        {
            sectionFn: ErrorMessagePropTypesStory,
            options: optionsNoSourceNoProps,
        },
    ],
}

const ErrorMessageStory = () => (
    <section className="story">
        <ErrorMessage message="Oh no something bad happened :/" timeout={1000 * 60 * 60 * 24} />
    </section>
)
const ErrorMessageChapter = {
    subtitle: 'Error Message',
    sections: [{ sectionFn: ErrorMessageStory, options: optionsSourceOnly }],
}

const ErrorMessagePlaygroundStory = () => (
    <section className="story">
        <ErrorMessage
            message={text('Error Message', 'Oh no something bad happened :/')}
            timeout={number('Timeout', 60000)}
        />
    </section>
)

// Story setup ================================================================
const Story = () =>
    storiesOf('ErrorMessage', module)
        .addDecorator(withKnobs)
        .addWithChapters('Component Overview', {
            chapters: [ErrorMessagePropTypesChapter, ErrorMessageChapter],
        })
        .add('Component Playground', ErrorMessagePlaygroundStory)

export { Story as ErrorMessageStory }
