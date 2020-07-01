import './styles/linkbutton_story.less'

import React from 'react'
import { storiesOf } from '@storybook/react'
import { withKnobs, text, boolean } from '@storybook/addon-knobs'

import { getPropTypesStory, optionsSourceOnly, optionsNoSourceNoProps } from '../utils/StoryUtils'

import LinkButton from '../../src/components/LinkButton'

// Story Definitions ==========================================================
const LinkButtonPropTypesStory = getPropTypesStory(LinkButton)
const LinkButtonPropTypesChapter = {
    subtitle: 'Component Usage',
    sections: [
        {
            sectionFn: LinkButtonPropTypesStory,
            options: optionsNoSourceNoProps,
        },
    ],
}

const LinkButtonsStory = () => (
    <section className="story link_button">
        <LinkButton name="Link Button" />
        <LinkButton disabled name="Disabled Link Button" />
    </section>
)
const LinkButtonsChapter = {
    subtitle: 'Link Button',
    sections: [{ sectionFn: LinkButtonsStory, options: optionsSourceOnly }],
}

const LinkButtonPlaygroundStory = () => (
    <section className="story">
        <LinkButton name={text('Name', 'LinkButton Text')} disabled={boolean('Disabled', false)} />
    </section>
)

// Story setup ================================================================
const Story = () =>
    storiesOf('LinkButton', module)
        .addDecorator(withKnobs)
        .addWithChapters('Component Overview', {
            chapters: [LinkButtonPropTypesChapter, LinkButtonsChapter],
        })
        .add('Component Playground', LinkButtonPlaygroundStory)

export default Story
