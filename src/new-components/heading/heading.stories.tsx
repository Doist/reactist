import React from 'react'
import { storiesOf } from '@storybook/react'
import { withKnobs, select } from '@storybook/addon-knobs'

import { Stack } from '../stack'
import { Box } from '../box'
import { Heading } from './heading'

const HeadingChapter = {
    subtitle: 'Heading',
    sections: [{ sectionFn: HeadingStory, options: { showPropTables: false } }],
}

function HeadingStory() {
    return (
        <section className="story">
            <Stack dividers space="medium">
                <Box>
                    <Heading level={1} size="largest" paddingBottom="xlarge">
                        Heading level 1, largest
                    </Heading>
                    <Heading level={1} size="larger" paddingBottom="large">
                        Heading level 1, larger
                    </Heading>
                    <Heading level={1} paddingBottom="medium">
                        Heading level 1
                    </Heading>
                    <Heading level={1} size="smaller" paddingBottom="small">
                        Heading level 1, smaller
                    </Heading>
                </Box>

                <Box>
                    <Heading level={2} size="largest" paddingBottom="large">
                        Heading level 2, largest
                    </Heading>
                    <Heading level={2} size="larger" paddingBottom="medium">
                        Heading level 2, larger
                    </Heading>
                    <Heading level={2} paddingBottom="small">
                        Heading level 2
                    </Heading>
                    <Heading level={2} size="smaller" paddingBottom="xsmall">
                        Heading level 2, smaller
                    </Heading>
                </Box>

                <Box>
                    <Heading level={3} size="largest" paddingBottom="large">
                        Heading level 3, largest
                    </Heading>
                    <Heading level={3} size="larger" paddingBottom="medium">
                        Heading level 3, larger
                    </Heading>
                    <Heading level={3} paddingBottom="small">
                        Heading level 3
                    </Heading>
                    <Heading level={3} size="smaller" paddingBottom="xsmall">
                        Heading level 3, smaller
                    </Heading>
                </Box>

                <Box>
                    <Heading level={4} size="largest" paddingBottom="large">
                        Heading level 4 / 5 / 6, largest
                    </Heading>
                    <Heading level={4} size="larger" paddingBottom="medium">
                        Heading level 4 / 5 / 6, larger
                    </Heading>
                    <Heading level={4} paddingBottom="small">
                        Heading level 4 / 5 / 6
                    </Heading>
                </Box>
            </Stack>
        </section>
    )
}

function HeadingPlaygroundStory() {
    const level = select('level', ['1', '2', '3', '4', '5', '6'], '1')
    const size = select(
        'size',
        {
            largest: 'largest',
            larger: 'larger',
            'default (undefined)': undefined,
            smaller: 'smaller',
        },
        undefined,
    )
    const weight = select('weight', ['regular', 'light'], 'regular')

    return (
        <section className="story playground">
            <Heading level={level} size={size} weight={weight}>
                Heading
            </Heading>
        </section>
    )
}

// Not too sure what's going on in this block, might be an issue with bad typings.
// These should all be reworked once we upgrade to Storybook 6 so we won't spend
// time on fixing the types now

// eslint-disable-next-line
storiesOf('Heading', module)
    .addDecorator(withKnobs)
    // @ts-expect-error
    .addWithChapters('Component Overview', {
        chapters: [HeadingChapter],
    })
    .add('Component Playground', HeadingPlaygroundStory)
