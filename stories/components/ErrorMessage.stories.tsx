import React from 'react'
import { withKnobs, text, number } from '@storybook/addon-knobs'

import ErrorMessage from '../../src/components/error-message'

export default {
    title: 'ErrorMessage',
    component: ErrorMessage,
    decorators: [withKnobs],
}

export const ErrorMessageStory = () => (
    <section className="story">
        <ErrorMessage message="Oh no something bad happened :/" timeout={1000 * 60 * 60 * 24} />
    </section>
)

export const ErrorMessagePlaygroundStory = () => (
    <section className="story">
        <ErrorMessage
            message={text('Error Message', 'Oh no something bad happened :/')}
            timeout={number('Timeout', 60000)}
        />
    </section>
)
