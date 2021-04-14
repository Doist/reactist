import './styles/tabs_story.less'

import React from 'react'
import { action } from '@storybook/addon-actions'

import { Tabs, Tab } from '../../src/components/tabs'
import { boolean } from '@storybook/addon-knobs'

// Story setup ================================================================

export default {
    title: 'Tabs',
    component: Tabs,
}

// Story Definitions ==========================================================

export const TabsStory = () => {
    return (
        <section className="story tabs">
            <p>Tabs</p>
            <Tabs>
                <Tab value={'a'} title="Tab A">
                    Content of Tab A
                </Tab>
                <Tab disabled value={'b'} title="Tab B (disable)">
                    Content of Tab B
                </Tab>
                <Tab value={'c'} title="Tab C">
                    Content of Tab C
                </Tab>
            </Tabs>
        </section>
    )
}

export const TabsPlaygroundStory = (args) => {
    return (
        <section className="story tabs">
            <Tabs {...args} onChange={action('onChange')}>
                <Tab value={'a'} title="Tab A">
                    Content of Tab A
                </Tab>
                <Tab disabled value={'b'} title="Tab B (disable)">
                    Content of Tab B
                </Tab>
                <Tab value={'c'} title="Tab C">
                    Content of Tab C
                </Tab>
            </Tabs>
        </section>
    )
}

TabsPlaygroundStory.arg = {
    spreadLayout: boolean('spreadLayout', false),
}
