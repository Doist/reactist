import * as React from 'react'

import { Stack } from '../stack'
import { ResponsiveWidthRef, select, selectWithNone } from '../utils/storybook-helper'

import { Heading } from './heading'

export default {
    title: '🔤 Typography/Heading',
    component: Heading,
    parameters: {
        badges: ['accessible'],
        figma: {
            path: 'Global › Text Styles › SF *FOR WEB* › Header 1',
            url: 'https://www.figma.com/design/xo9yAsH8PQUpi0eTJh9pmR/Product-Library---Global?node-id=2524-3589',
        },
    },
}

export function HeadingStory() {
    return (
        <section className="story">
            <Stack space="medium">
                <Heading level={1}>Heading 1</Heading>
                <Heading level={2}>Heading 2</Heading>
                <Heading level={3}>Heading 3</Heading>
                <Heading level={4}>Heading 4</Heading>
                <Heading level={5}>Heading 5, visually heading-4</Heading>
                <Heading level={6}>Heading 6, visually heading-4</Heading>
                <Heading level={2} variant="heading-1">
                    Semantic h2, visual heading-1
                </Heading>
                <Heading variant="heading-3" render={<button type="button" />}>
                    Button with heading typography
                </Heading>
            </Stack>
        </section>
    )
}

HeadingStory.parameters = {
    chromatic: { disableSnapshot: false },
}

export function TruncatedHeadingStory() {
    return (
        <section className="story">
            <Heading level={1} lineClamp={1}>
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

TruncatedHeadingStory.parameters = {
    chromatic: { disableSnapshot: false },
}

export function ResponsiveHeadingStory(props: React.ComponentProps<typeof Heading>) {
    return (
        <>
            <ResponsiveWidthRef />
            <Heading {...props} align={{ mobile: 'end', tablet: 'center', desktop: 'start' }} />
        </>
    )
}

ResponsiveHeadingStory.args = {
    level: '1',
    tone: 'normal',
    children: 'Lorem ipsum dolor, sit amet consectetur adipisicing elit',
}

ResponsiveHeadingStory.argTypes = {
    level: select(['1', '2', '3', '4', '5', '6']),
    variant: selectWithNone(['heading-1', 'heading-2', 'heading-3', 'heading-4']),
    lineClamp: selectWithNone([1, 2, 3, 4, 5]),
    tone: select(['normal', 'secondary', 'danger']),
    align: { control: false },
    children: {
        control: { type: 'text' },
    },
}

export function HeadingPlaygroundStory(props: React.ComponentProps<typeof Heading>) {
    return (
        <section className="story playground">
            <Heading {...props} />
        </section>
    )
}

HeadingPlaygroundStory.args = {
    level: '1',
    tone: 'normal',
    children: 'Lorem ipsum dolor, sit amet consectetur adipisicing elit',
}

HeadingPlaygroundStory.argTypes = {
    level: select(['1', '2', '3', '4', '5', '6']),
    variant: selectWithNone(['heading-1', 'heading-2', 'heading-3', 'heading-4']),
    lineClamp: selectWithNone([1, 2, 3, 4, 5]),
    tone: select(['normal', 'secondary', 'danger']),
    align: selectWithNone(['start', 'center', 'end', 'justify']),
    children: {
        control: { type: 'text' },
    },
}
