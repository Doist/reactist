import './styles/tooltip_story.less'

import React from 'react'
import { storiesOf } from '@storybook/react'
import { withKnobs, text } from '@storybook/addon-knobs'

import { Tooltip } from '../../src/components/Tooltip'
import Button, { ButtonProps } from '../../src/components/Button'

const ExampleButton = React.forwardRef<HTMLButtonElement, ButtonProps>(function ExampleButton(
    props,
    ref,
) {
    return (
        <Button ref={ref} {...props}>
            I am a button.
            <br />
            Hover or focus me to see a tooltip.
        </Button>
    )
})

function TooltipPlaygroundStory() {
    return (
        <section className="story tooltip">
            <input
                autoFocus
                placeholder="Focus here so you can press Tab to test focusing the button below"
            />
            <Tooltip content={text('Tooltip Text', 'Very helpful content in this tooltip')}>
                <ExampleButton className="large-block-button" />
            </Tooltip>
            <div role="toolbar">
                <p>More buttons</p>
                <Tooltip content="one">
                    <button>1</button>
                </Tooltip>
                <Tooltip content="two">
                    <button>2</button>
                </Tooltip>
                <Tooltip content="three">
                    <button>3</button>
                </Tooltip>
            </div>
        </section>
    )
}

// Story setup ================================================================
function Story() {
    storiesOf('Tooltip', module)
        .addDecorator(withKnobs)
        .add('Component Playground', TooltipPlaygroundStory)
}

export default Story
