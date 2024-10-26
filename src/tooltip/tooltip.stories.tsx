import * as React from 'react'
import { createPortal } from 'react-dom'

import { Tooltip, TooltipProps } from './tooltip'
import { Button } from '../button'
import { Stack } from '../stack'
import { TextField } from '../text-field'
import { Box } from '../box'
import { Text } from '../text'

//
// Story setup
//

export default {
    title: 'Design system/Tooltip',
    parameters: {
        badges: ['accessible'],
    },
}

const positions: Array<TooltipProps['position']> = [
    'top',
    'top-start',
    'top-end',
    'right',
    'right-start',
    'right-end',
    'bottom',
    'bottom-start',
    'bottom-end',
    'left',
    'left-start',
    'left-end',
]

function StoryTemplate(props: Omit<TooltipProps, 'children'>) {
    return (
        <Stack space="xxlarge">
            <Box paddingY="xxlarge">
                <TextField
                    autoFocus
                    label={null}
                    maxWidth="small"
                    placeholder="Focus here, then press Tab to focus on the button below"
                />
            </Box>
            <Box
                display="flex"
                width="full"
                alignItems="center"
                justifyContent="center"
                padding="xxlarge"
            >
                <Tooltip
                    // Tooltip does not react to dynamic changes of some props so we force a new
                    // component re-render every time these change.
                    key={String(props.position) + String(props.gapSize)}
                    {...props}
                >
                    <Button variant="secondary">Hover or focus to see the tooltip in action</Button>
                </Tooltip>
            </Box>
        </Stack>
    )
}

//
// Playground
//

export function TooltipPlayground(args: Omit<TooltipProps, 'children'>) {
    return <StoryTemplate {...args} />
}

TooltipPlayground.args = {
    content: 'You did it!',
    position: 'top',
    gapSize: 5,
    withArrow: false,
    showTimeout: 500,
    hideTimeout: 100,
}

TooltipPlayground.argTypes = {
    position: {
        control: { type: 'select', options: positions },
    },
}

//
// Rich content
//

export function TooltipRichContent({
    position,
    gapSize,
    withArrow,
    showTimeout,
    hideTimeout,
}: Pick<TooltipProps, 'position' | 'gapSize' | 'withArrow' | 'showTimeout' | 'hideTimeout'>) {
    return (
        <StoryTemplate
            position={position}
            gapSize={gapSize}
            withArrow={withArrow}
            showTimeout={showTimeout}
            hideTimeout={hideTimeout}
            content={
                <Stack space="medium" padding="small" align="start">
                    <Text weight="bold" size="subtitle">
                        Upgrade to Pro
                    </Text>
                    <ul style={{ textAlign: 'start', padding: '0 16px', margin: '0' }}>
                        <li>Add reminders to tasks</li>
                        <li>Unlimited projects</li>
                        <li>Daily backups and unlimited activity history</li>
                        <li>25 collaborators per project</li>
                    </ul>
                    <Text tone="secondary">and more…</Text>
                </Stack>
            }
        />
    )
}

TooltipRichContent.args = {
    position: 'bottom',
    gapSize: 10,
    withArrow: true,
    showTimeout: 500,
    hideTimeout: 100,
}

TooltipRichContent.argTypes = {
    position: {
        control: { type: 'select', options: positions },
    },
}

// This story sets a new z-index for the tooltip, but it will leak into other stories
// when viewed from the Docs page, since all stories live in a single iframe.
// Only in the Canvas page will stories be isolated from each other
export function TooltipCustomZIndex() {
    return (
        <>
            <PortalToHead>
                <style>
                    {`:root {
                        --reactist-stacking-order-tooltip: 10000;
                    }`}
                </style>
            </PortalToHead>
            <Stack space="medium">
                <Text>
                    The tooltip‘s z-index can be customized using the
                    <em>--reactist-stacking-order-tooltip</em> custom property:
                </Text>
                <Box
                    background="aside"
                    padding="large"
                    position="relative"
                    style={{ zIndex: 2000 }}
                >
                    <Tooltip content="I have a custom z-index">
                        <Button variant="secondary">
                            Hover or focus to see the tooltip in action
                        </Button>
                    </Tooltip>
                </Box>
            </Stack>
        </>
    )
}

function PortalToHead({ children }: React.PropsWithChildren<unknown>) {
    return createPortal(children, document.head)
}
