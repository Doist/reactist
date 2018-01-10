import './styles/tabs_story.less'

import React from 'react'
import { storiesOf } from '@storybook/react'
import { withKnobs, text, boolean, number, select } from '@storybook/addon-knobs'
import { action } from '@storybook/addon-actions'

import { getPropTypesStory, optionsSourceOnly, optionsNoSourceNoProps } from '../utils/StoryUtils'
import { Tabs, Tab } from '../../../src/components/Tabs'

// Story Definitions ==========================================================
const TabsPropTypesStory = getPropTypesStory(Tabs, Tab)
const TabsPropTypesChapter = {
    subtitle: 'Component Usage',
    sections: [{ sectionFn: TabsPropTypesStory, options: optionsNoSourceNoProps }]
}

const TabsStory = () => {
    return <section className='story tabs'>
        <Tabs>
            <Tab value={"a"} title='Tab A'>Content of Tab A</Tab>
            <Tab disabled value={"b"} title='Tab B (disable)'>Content of Tab B</Tab>
            <Tab value={"c"} title='Tab C'>Content of Tab C</Tab>
        </Tabs>
    </section>
}

const TabsPlaygroundStory = () => {
    const spreadLayout = boolean("spreadLayout", false)

    return <section className='story tabs'>
        <Tabs spreadLayout={spreadLayout} onChange={action("onChange")}>
            <Tab value={"a"} title='Tab A'>Content of Tab A</Tab>
            <Tab disabled value={"b"} title='Tab B (disable)'>Content of Tab B</Tab>
            <Tab value={"c"} title='Tab C'>Content of Tab C</Tab>
        </Tabs>
    </section>
}

const TabsChapter = {
    subtitle: 'Tabs',
    sections: [{ sectionFn: TabsStory, options: optionsSourceOnly }]
}

// Story setup ================================================================
const Story = () =>
storiesOf('Tabs', module)
    .addDecorator(withKnobs)
    .addWithChapters('Component Overview', {
        chapters: [
            TabsPropTypesChapter,
            TabsChapter
        ]
    })
    .add('Component Playground', () => <TabsPlaygroundStory />)

export default Story
