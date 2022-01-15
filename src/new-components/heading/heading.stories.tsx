import React from 'react'

import { Stack } from '../stack'
import { Heading } from './heading'
import { ResponsiveWidthRef, select, selectWithNone } from '../storybook-helper'

export default {
    title: 'Design system/Heading',
    component: Heading,
    parameters: {
        badges: ['accessible'],
    },
}

export function HeadingStory() {
    return (
        <section className="story">
            <Stack dividers="primary" space="medium">
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

export function TruncatedHeadingStory() {
    return (
        <section className="story">
            <Heading level={1} size="largest" lineClamp={1}>
                This is a long title which we will use demonstrate truncating content. When this
                overflows and begins to drop to a new line, its overflowing content will be replaced
                by ellipses.
            </Heading>
            <Heading level={2} lineClamp={2}>
                Now we have a subtitle which we will use to demostrate truncating to multiple lines.
                Sometimes we need to provide more context yet still remain skimmable to users, and
                subtitles are a good way to do this. As it&rsquo;s much longer now we can allow a
                second line to be displayed before truncating it at two lines.
            </Heading>
        </section>
    )
}

export function ResponsiveHeadingStory(props: React.ComponentProps<typeof Heading>) {
    return (
        <>
            <ResponsiveWidthRef />
            <Heading {...props} align={{ mobile: 'end', tablet: 'center', desktop: 'start' }} />
        </>
    )
}

ResponsiveHeadingStory.argTypes = {
    level: select(['1', '2', '3', '4', '5', '6'], '1'),
    size: selectWithNone(['largest', 'larger', 'smaller'], 'none'),
    weight: select(['regular', 'light'], 'regular'),
    lineClamp: selectWithNone([1, 2, 3, 4, 5], 'none'),
    tone: select(['normal', 'secondary', 'danger'], 'normal'),
    align: { control: false },
    children: {
        control: { type: 'text' },
        defaultValue: 'Lorem ipsum dolor, sit amet consectetur adipisicing elit',
    },
}

export function HeadingPlaygroundStory(props: React.ComponentProps<typeof Heading>) {
    return (
        <section className="story playground">
            <Heading {...props} />
        </section>
    )
}

HeadingPlaygroundStory.argTypes = {
    level: select(['1', '2', '3', '4', '5', '6'], '1'),
    size: selectWithNone(['largest', 'larger', 'smaller'], 'none'),
    weight: select(['regular', 'light'], 'regular'),
    lineClamp: selectWithNone([1, 2, 3, 4, 5], 'none'),
    tone: select(['normal', 'secondary', 'danger'], 'normal'),
    align: selectWithNone(['start', 'center', 'end', 'justify'], 'none'),
    children: {
        control: { type: 'text' },
        defaultValue: 'Lorem ipsum dolor, sit amet consectetur adipisicing elit',
    },
}
