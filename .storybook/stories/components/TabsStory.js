import './styles/tabs_story.less'

import React from 'react'
import { storiesOf } from '@storybook/react'

import { getPropTypesStory, optionsSourceOnly, optionsNoSourceNoProps } from '../utils/StoryUtils'

import { Tabs, Tab } from '../../../src/components/Tabs'

// Story Definitions ==========================================================
const TabsPropTypesStory = getPropTypesStory(Tabs, Tab)
const TabsPropTypesChapter = {
    subtitle: 'Component Usage',
    sections: [{ sectionFn: TabsPropTypesStory, options: optionsNoSourceNoProps }]
}

const TabsStory = () => (
    <section className='story tabs'>
        <Tabs>
            <Tab title='First Tab'>Content of Tab 1</Tab>
            <Tab title='Tab Number Two'>Content of Tab 2</Tab>
            <Tab title='Third is disabled' disabled>Content of Tab 3</Tab>
            <Tab title='Last Tab'>Content of Tab 4</Tab>
        </Tabs>
    </section>
)
const TabsChapter = {
    subtitle: 'Tabs',
    sections: [{ sectionFn: TabsStory, options: optionsSourceOnly }]
}

// Story setup ================================================================
const Story = () =>
storiesOf('Tabs', module)
    .addWithChapters('Component Overview', {
        chapters: [
            TabsPropTypesChapter,
            TabsChapter
        ]
    })

export default Story
