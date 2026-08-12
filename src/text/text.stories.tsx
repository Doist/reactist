import * as React from 'react'

import { Stack } from '../stack'
import { ResponsiveWidthRef, select, selectWithNone } from '../utils/storybook-helper'

import { bodyVariants, displayVariants, headingVariants, Text } from './text'

const allVariants = [...displayVariants, ...headingVariants, ...bodyVariants] as const

export default {
    title: '🔤 Typography/Text',
    component: Text,
    parameters: {
        badges: ['accessible'],
        figma: {
            path: 'Global › Text Styles › SF *FOR WEB*',
            url: 'https://www.figma.com/design/xo9yAsH8PQUpi0eTJh9pmR/Product-Library---Global?node-id=9062-3316',
        },
    },
}

export function TextStory() {
    return (
        <section className="story">
            <Stack space="medium">
                {allVariants.map((variant) => (
                    <Text key={variant} variant={variant}>
                        {variant}
                    </Text>
                ))}
            </Stack>
        </section>
    )
}

TextStory.parameters = {
    chromatic: { disableSnapshot: false },
}

export function TruncatedTextStory() {
    return (
        <section className="story">
            <Stack space="medium">
                <Text lineClamp={1}>
                    Lorem ipsum dolor sit, amet consectetur adipisicing elit. Provident cumque
                    recusandae quibusdam, veniam cum illo? Inventore, doloremque necessitatibus!
                    Sequi porro alias mollitia, temporibus quidem, aut modi tempora placeat laborum
                    eos sapiente necessitatibus autem ipsum officia rerum distinctio consectetur
                    tenetur qui! Perspiciatis ab corporis, itaque alias ex optio voluptatum nulla
                    consequatur aut explicabo dolorem rerum ratione magnam. Mollitia dignissimos et
                    ad commodi quasi molestias fugiat repellendus, magni distinctio voluptate neque
                    quos esse asperiores iure excepturi eligendi eaque veniam voluptas blanditiis
                    temporibus, omnis laborum quidem autem totam. Iure, numquam. Totam facilis
                    dolorum, consequatur, eligendi est dolores modi dolore maiores ipsum magnam a.
                </Text>

                <Text lineClamp={4}>
                    Lorem ipsum dolor sit, amet consectetur adipisicing elit. Provident cumque
                    recusandae quibusdam, veniam cum illo? Inventore, doloremque necessitatibus!
                    Sequi porro alias mollitia, temporibus quidem, aut modi tempora placeat laborum
                    eos sapiente necessitatibus autem ipsum officia rerum distinctio consectetur
                    tenetur qui! Perspiciatis ab corporis, itaque alias ex optio voluptatum nulla
                    consequatur aut explicabo dolorem rerum ratione magnam. Mollitia dignissimos et
                    ad commodi quasi molestias fugiat repellendus, magni distinctio voluptate neque
                    quos esse asperiores iure excepturi eligendi eaque veniam voluptas blanditiis
                    temporibus, omnis laborum quidem autem totam. Iure, numquam. Totam facilis
                    dolorum, consequatur, eligendi est dolores modi dolore maiores ipsum magnam a.
                </Text>

                <Text variant="heading-1" lineClamp={1}>
                    This is a long title which we will use demonstrate truncating content. When this
                    overflows and begins to drop to a new line, its overflowing content will be
                    replaced by ellipses.
                </Text>
            </Stack>
        </section>
    )
}

TruncatedTextStory.parameters = {
    chromatic: { disableSnapshot: false },
}

export function ResponsiveTextStory(props: React.ComponentProps<typeof Text>) {
    return (
        <>
            <ResponsiveWidthRef />
            <Text {...props} align={{ mobile: 'end', tablet: 'center', desktop: 'start' }} />
        </>
    )
}

ResponsiveTextStory.args = {
    variant: 'body-3',
    tone: 'normal',
    children: 'Lorem ipsum dolor sit amet consectetur, adipisicing elit',
}

ResponsiveTextStory.argTypes = {
    variant: select(allVariants),
    decoration: selectWithNone(['strikethrough', 'underline']),
    case: selectWithNone(['uppercase']),
    lineClamp: selectWithNone([1, 2, 3, 4, 5]),
    tone: select(['normal', 'secondary', 'danger']),
    align: { control: false },
    children: {
        control: { type: 'text' },
    },
}

export function TextPlaygroundStory(props: React.ComponentProps<typeof Text>) {
    return (
        <section className="story playground">
            <Text {...props} />
        </section>
    )
}

TextPlaygroundStory.args = {
    variant: 'body-3',
    tone: 'normal',
    children: 'Lorem ipsum dolor sit amet consectetur, adipisicing elit',
}

TextPlaygroundStory.argTypes = {
    variant: select(allVariants),
    decoration: selectWithNone(['strikethrough', 'underline']),
    case: selectWithNone(['uppercase']),
    lineClamp: selectWithNone([1, 2, 3, 4, 5]),
    tone: select(['normal', 'secondary', 'danger']),
    align: selectWithNone(['start', 'center', 'end', 'justify']),
    children: {
        control: { type: 'text' },
    },
}
