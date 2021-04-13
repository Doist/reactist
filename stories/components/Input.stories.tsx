import React from 'react'
import { withKnobs, boolean, text } from '@storybook/addon-knobs'

import Input from '../../src/components/input'
import './styles/input_story.less'

// Story setup ================================================================

export default {
    title: 'Input',
    component: Input,
    decorators: [withKnobs],
}

// Story Definitions ==========================================================

export const InputStory = () => (
    <section className="story">
        <div className="story-info">
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

export const InputPlaygroundStory = () => (
    <section className="story">
        <Input placeholder={text('Simple input wrapper')} disabled={boolean('Disabled:', false)} />
    </section>
)
