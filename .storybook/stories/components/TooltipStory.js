import './styles/tooltip_story.less'

import React from 'react'
import { storiesOf } from '@storybook/react'
import { withKnobs, text, boolean, number, select } from '@storybook/addon-knobs'

import { getPropTypesStory, optionsSourceOnly, optionsNoSourceNoProps } from '../utils/StoryUtils'

import Tooltip from '../../../src/components/Tooltip'

// Story Definitions ==========================================================
const TooltipPropTypesStory = getPropTypesStory(Tooltip)
const TooltipPropTypesChapter = {
    subtitle: 'Component Usage',
    sections: [{ sectionFn: TooltipPropTypesStory, options: optionsNoSourceNoProps }]
}

const TooltipStory = () => (
    <section className='story tooltip'>
        <Tooltip text='Very helpful content in this tooltip'>
            <div className='tip_item'>Hover me for an automatically positioned Tooltip</div>
        </Tooltip>
    </section>
)
const TooltipChapter = {
    subtitle: 'Tooltip',
    sections: [{ sectionFn: TooltipStory, options: optionsSourceOnly }]
}

const TooltipPlaygroundStory = () => (
    <section className='story tooltip'>
        <Tooltip
            text={ text('Tooltip Text', 'Very helpful content in this tooltip') }
            hideOnScroll={ boolean('Hide On Scroll', true) }
            delayShow={ number('Show Delay (ms)', 1000) }
            delayHide={ number('Hide Delay (ms)', 0) }
            position={ select('Position', ['auto', 'top', 'right', 'bottom', 'left'], 'auto') }
        >
            <div className='tip_item'>Hover me to see your tooltip</div>
        </Tooltip>
    </section>
)

// Story setup ================================================================
const Story = () =>
storiesOf('Tooltip', module)
    .addDecorator(withKnobs)
    .addWithChapters('Component Overview', {
        chapters: [
            TooltipPropTypesChapter,
            TooltipChapter
        ]
    })
    .add('Component Playground', TooltipPlaygroundStory)


export default Story
