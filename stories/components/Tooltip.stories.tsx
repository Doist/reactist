import './styles/tooltip_story.less'

import React from 'react'

import { Tooltip, TooltipProps } from '../../src/components/tooltip'
import Button from '../../src/components/deprecated-button'
import type { ButtonProps } from '../../src/components/deprecated-button'

// Story setup ================================================================

export default {
    title: 'Components/Tooltip',
    parameters: {
        badges: ['accessible'],
    },
}

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

export const TooltipPlaygroundStory = (args) => {
    return (
        <section className="story tooltip">
            <input
                autoFocus
                placeholder="Focus here so you can press Tab to test focusing the button below"
            />
            <Tooltip
                // Tooltip does not react to dynamic changes of some props so we force a new
                // component re-render every time these change.
                {...args}
                key={String(args.position) + String(args.gapSize)}
            >
                <ExampleButton />
            </Tooltip>
        </section>
    )
}

TooltipPlaygroundStory.args = {
    content: 'Very helpful content in this tooltip',
    gapSize: 5,
}

TooltipPlaygroundStory.argTypes = {
    position: {
        control: {
            type: 'select',
            options: positions,
            title: 'test',
        },
    },
}
