import './styles/tooltip_story.less'

import React from 'react'
import { storiesOf } from '@storybook/react'
import { withKnobs } from '@storybook/addon-knobs'
import { optionsSourceOnly } from '../utils/StoryUtils'

import TooltipNew from '../../../src/components/TooltipNew'

const TooltipStory = () => (
    <section className="story tooltip">
        <TooltipNew title="Very helpful content in this tooltip">
            <div className="tip_item" tabIndex="0">
                Hover or focus me for an automatically positioned Tooltip
            </div>
        </TooltipNew>
    </section>
)
const TooltipChapter = {
    subtitle: 'Tooltip',
    sections: [{ sectionFn: TooltipStory, options: optionsSourceOnly }]
}

// Story setup ================================================================
const Story = () =>
    storiesOf('TooltipNew', module)
        .addDecorator(withKnobs)
        .addWithChapters('Component Overview', {
            chapters: [TooltipChapter]
        })

export default Story
