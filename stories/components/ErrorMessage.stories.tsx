import React from 'react'

import ErrorMessage from '../../src/components/error-message'

export default {
    title: 'ErrorMessage',
    component: ErrorMessage,
}

export const ErrorMessageStory = () => (
    <section className="story">
        <ErrorMessage message="Oh no something bad happened :/" timeout={1000 * 60 * 60 * 24} />
    </section>
)

export const ErrorMessagePlaygroundStory = (args) => (
    <section className="story">
        <ErrorMessage {...args} />
    </section>
)

ErrorMessagePlaygroundStory.args = {
    message: 'Oh no something bad happened :/',
    timeout: 60000,
}

ErrorMessagePlaygroundStory.argTypes = {
    message: {
        control: {
            type: 'text',
        },
    },
    timeout: {
        control: {
            type: 'number',
        },
    },
}
