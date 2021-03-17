import React from 'react'
import { storiesOf } from '@storybook/react'
import { withKnobs, select, text } from '@storybook/addon-knobs'

import { Stack } from '../stack'
import { Heading } from './heading'

const HeadingChapter = {
    subtitle: 'Heading',
    sections: [
        { sectionFn: HeadingStory, options: { showPropTables: false } },
        { sectionFn: TruncatedHeadingStory, options: { showPropTables: false } },
    ],
}

function HeadingStory() {
    return (
        <section className="story">
            <Stack dividers space="medium">
                <Stack space="small">
                    <Heading level={1} size="largest">
                        Heading level 1, largest
                    </Heading>
                    <Heading level={1} size="larger">
                        Heading level 1, larger
                    </Heading>
                    <Heading level={1}>Heading level 1</Heading>
                    <Heading level={1} size="smaller">
                        Heading level 1, smaller
                    </Heading>
                </Stack>

                <Stack space="small">
                    <Heading level={2} size="largest">
                        Heading level 2, largest
                    </Heading>
                    <Heading level={2} size="larger">
                        Heading level 2, larger
                    </Heading>
                    <Heading level={2}>Heading level 2</Heading>
                    <Heading level={2} size="smaller">
                        Heading level 2, smaller
                    </Heading>
                </Stack>

                <Stack space="small">
                    <Heading level={3} size="largest">
                        Heading level 3, largest
                    </Heading>
                    <Heading level={3} size="larger">
                        Heading level 3, larger
                    </Heading>
                    <Heading level={3}>Heading level 3</Heading>
                    <Heading level={3} size="smaller">
                        Heading level 3, smaller
                    </Heading>
                </Stack>

                <Stack space="small">
                    <Heading level={4} size="largest">
                        Heading level 4 / 5 / 6, largest
                    </Heading>
                    <Heading level={4} size="larger">
                        Heading level 4 / 5 / 6, larger
                    </Heading>
                    <Heading level={4}>Heading level 4 / 5 / 6</Heading>
                </Stack>
            </Stack>
        </section>
    )
}

function TruncatedHeadingStory() {
    return (
        <section className="story">
            <Heading level={1} size="largest" lineClamp={1}>
                This is a long title which we will use demonstrate truncating content. When this
                overflows and begins to drop to a new line, its overflowing content will be replaced
                by ellipses.
            </Heading>
            <Heading level={2} size="smaller" lineClamp={2}>
                Now we have a subtitle which we will use to truncate to multiple lines. It&rsquo;s
                much longer so we will allow a second line to be displayed before truncating it at
                two lines.
            </Heading>
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
    const lineClamp = select(
        'lineClamp',
        { none: undefined, 0: 0, 1: 1, 2: 2, 3: 3, 4: 4, 5: 5 },
        1,
    )
    const children = text('children', 'Lorem ipsum dolor, sit amet consectetur adipisicing elit')

    return (
        <section className="story playground">
            <Heading level={level} size={size} weight={weight} lineClamp={lineClamp}>
                {children}
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
