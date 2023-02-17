import * as React from 'react'
import { Box } from '../box'

import { Prose, ProseProps } from './prose'
import { proseExample } from './prose-example'

export default {
    title: 'Design system/Prose',
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
                          '--reactist-prose-quote-tint': '#9db4b9',
                          '--reactist-prose-link-tint': '#22a5bf',
                          '--reactist-divider-primary': '#53595b',
                          '--reactist-divider-secondary': '#424b4c',
                          '--reactist-divider-tertiary': '#323839',
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
