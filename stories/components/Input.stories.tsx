import * as React from 'react'

import Input from '../../src/components/deprecated-input'
import { Alert } from '../../src/alert'
import './styles/input_story.less'
import LinkTo from '@storybook/addon-links/react'

// Story setup ================================================================

export default {
    title: 'Components/Input',
    component: Input,
    parameters: {
        badges: ['deprecated'],
    },
}

// Story Definitions ==========================================================

export const InputStory = () => (
    <section className="story">
        <div className="story-info">
            <Alert tone="critical">
                <strong>Deprecated:</strong> Please use{' '}
                <LinkTo kind="design-system-textfield">TextField</LinkTo> instead
            </Alert>
            <p>
                This component is a dumb wrapper around the
                <code> &lt;input /&gt;</code> element which justs add a class name to give it is
                unique style. All properties you pass to it (e.g. *value* or *onChange*) are
                directly applied onto the underlying <code>&lt;input /&gt;</code> element.
            </p>
        </div>
        <Input placeholder="Simple input wrapper" />
    </section>
)

export const InputPlaygroundStory = (args) => (
    <section className="story">
        <Input {...args} />
    </section>
)

InputPlaygroundStory.args = {
    placeholder: 'Simple input wrapper',
    disabled: false,
}

InputPlaygroundStory.argTypes = {
    placeholder: {
        control: {
            type: 'text',
        },
    },
    disabled: {
        control: {
            type: 'boolean',
        },
    },
    className: {
        control: {
            type: null,
        },
    },
}
