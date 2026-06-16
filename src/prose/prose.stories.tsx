import * as React from 'react'

import { Box } from '../box'

import { Prose } from './prose'
import { proseExample, proseTableColorsExample, proseTableOverflowExample } from './prose-example'

import type { ProseProps } from './prose'

export default {
    title: '🔤 Typography/Prose',
    component: Prose,
    parameters: {
        badges: ['accessible'],
    },
}

//
// Playground
//

export function ProsePlaygroundStory({ darkModeTypography, dangerouslySetInnerHTML }: ProseProps) {
    return (
        <Box
            style={
                darkModeTypography
                    ? {
                          backgroundColor: '#202020',
                          // @ts-expect-error
                          '--reactist-content-primary': 'rgba(255, 255, 255, 0.88)',
                          '--reactist-prose-code-tint': 'rgba(255, 255, 255, 0.88)',
                          '--reactist-prose-code-fill': 'rgb(40, 40, 40)',
                          '--reactist-prose-code-border': 'var(--reactist-divider-secondary)',
                          '--reactist-prose-quote-tint': '#9db4b9',
                          // divider colors
                          '--reactist-divider-primary': '#53595b',
                          '--reactist-divider-secondary': '#424b4c',
                          '--reactist-divider-tertiary': '#323839',
                          // link colors
                          '--reactist-prose-link-idle-tint': '#22a5bf',
                          '--reactist-prose-link-idle-underline': '#53595b',
                          '--reactist-prose-link-hover-tint': '#22a5bf',
                          '--reactist-prose-link-hover-underline': '#22a5bf',
                      }
                    : undefined
            }
            padding="xlarge"
            borderRadius="full"
        >
            <Prose
                darkModeTypography={darkModeTypography}
                dangerouslySetInnerHTML={dangerouslySetInnerHTML}
            />
        </Box>
    )
}

ProsePlaygroundStory.storyName = 'Playground'
ProsePlaygroundStory.parameters = {
    chromatic: { disableSnapshot: false },
}
ProsePlaygroundStory.args = {
    darkModeTypography: false,
    dangerouslySetInnerHTML: { __html: proseExample },
}
ProsePlaygroundStory.argTypes = {
    children: { control: false },
    dangerouslySetInnerHTML: { control: false },
    exceptionallySetClassName: { control: false },
}

//
// Table overflow
//

export function ProseTableOverflowStory() {
    // The narrow container guarantees the table overflows into a horizontal scroll at any
    // viewport size, so the snapshot exercises the scrolling layout deterministically.
    return (
        <Box padding="xlarge" style={{ maxWidth: 400 }}>
            <Prose
                darkModeTypography={false}
                dangerouslySetInnerHTML={{ __html: proseTableOverflowExample }}
            />
        </Box>
    )
}

ProseTableOverflowStory.storyName = 'Table overflow'
ProseTableOverflowStory.parameters = {
    chromatic: { disableSnapshot: false },
}

//
// Table colors
//

export function ProseTableColorsStory() {
    return (
        <Box
            padding="xlarge"
            style={{
                // @ts-expect-error
                '--reactist-prose-table-header-fill': 'rgb(233, 239, 242)',
                '--reactist-prose-table-row-even-fill': 'rgb(247, 250, 251)',
            }}
        >
            <Prose
                darkModeTypography={false}
                dangerouslySetInnerHTML={{ __html: proseTableColorsExample }}
            />
        </Box>
    )
}

ProseTableColorsStory.storyName = 'Table colors'
ProseTableColorsStory.parameters = {
    chromatic: { disableSnapshot: false },
}
