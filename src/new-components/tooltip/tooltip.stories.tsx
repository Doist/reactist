import * as React from 'react'

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
// Playground story
//

export function TooltipPlaygroundStory(args: Omit<TooltipProps, 'children'>) {
    return <StoryTemplate {...args} />
}

TooltipPlaygroundStory.args = {
    content: 'You did it!',
    position: 'top',
    gapSize: 5,
    withArrow: false,
}

TooltipPlaygroundStory.argTypes = {
    position: {
        control: { type: 'select', options: positions },
    },
}

//
// Rich content story
//

export function TooltipRichContentStory({
    position,
    gapSize,
    withArrow,
}: Pick<TooltipProps, 'position' | 'gapSize' | 'withArrow'>) {
    return (
        <StoryTemplate
            position={position}
            gapSize={gapSize}
            withArrow={withArrow}
            content={
                <Stack space="medium" padding="small" align="start">
                    <Text weight="bold" size="subtitle">
                        Upgrade to Pro
                    </Text>
                    <ul style={{ textAlign: 'start', padding: '0 16px', margin: '0' }}>
                        <li>Add reminders to tasks</li>
                        <li>Unlimited projects</li>
                        <li>Daily backups</li>
                    </ul>
                    <Text tone="secondary">and more…</Text>
                </Stack>
            }
        />
    )
}

TooltipRichContentStory.args = {
    position: 'bottom',
    gapSize: 10,
    withArrow: true,
}

TooltipRichContentStory.argTypes = {
    position: {
        control: { type: 'select', options: positions },
    },
}
