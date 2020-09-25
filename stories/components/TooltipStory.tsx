import './styles/tooltip_story.less'

import React from 'react'
import { storiesOf } from '@storybook/react'
import { withKnobs, text, number, select } from '@storybook/addon-knobs'

import { Tooltip, TooltipProps } from '../../src/components/Tooltip'
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

const positions: Array<TooltipProps['position']> = [
    'auto-start',
    'auto',
    'auto-end',
    'top-start',
    'top',
    'top-end',
    'right-start',
    'right',
    'right-end',
    'bottom-end',
    'bottom',
    'bottom-start',
    'left-end',
    'left',
    'left-start',
]

function TooltipPlaygroundStory() {
    const position = select('Position', ['(default)', ...positions], '(default)')
    const gapSize = number('Gap Size (px)', 5)
    return (
        <section className="story tooltip">
            <input
                autoFocus
                placeholder="Focus here so you can press Tab to test focusing the button below"
            />
            <Tooltip
                // Tooltip does not react to dynamic changes of some props so we force a new
                // component re-render every time these change.
                key={String(position) + String(gapSize)}
                content={text('Tooltip Text', 'Very helpful content in this tooltip')}
                position={position === '(default)' ? undefined : position}
                gapSize={gapSize}
            >
                <ExampleButton />
            </Tooltip>
        </section>
    )
}

// Story setup ================================================================
function TooltipStory() {
    storiesOf('Tooltip', module)
        .addDecorator(withKnobs)
        .add('Component Playground', TooltipPlaygroundStory)
}

export { TooltipStory }
