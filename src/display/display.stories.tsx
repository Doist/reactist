import * as React from 'react'

import { Stack } from '../stack'
import { select, selectWithNone } from '../utils/storybook-helper'

import { Display } from './display'

export default {
    title: 'Typography/Display',
    component: Display,
    parameters: {
        badges: ['accessible'],
        figma: {
            path: 'Global > Text Styles > SF *FOR WEB* > Display 1',
            url: 'https://www.figma.com/design/xo9yAsH8PQUpi0eTJh9pmR/Product-Library---Global?node-id=9062-3316',
        },
    },
}

const displayVariants = ['display-1', 'display-2', 'display-3', 'display-4', 'display-5'] as const

export function DisplayStory() {
    return (
        <section className="story">
            <Stack space="medium">
                {displayVariants.map((variant) => (
                    <Display key={variant} variant={variant}>
                        {variant}
                    </Display>
                ))}
            </Stack>
        </section>
    )
}

DisplayStory.parameters = { chromatic: { disableSnapshot: false } }

export function DisplayPlaygroundStory(props: React.ComponentProps<typeof Display>) {
    return (
        <section className="story playground">
            <Display {...props} />
        </section>
    )
}

DisplayPlaygroundStory.args = {
    variant: 'display-3',
    tone: 'normal',
    children: 'Display text',
}

DisplayPlaygroundStory.argTypes = {
    variant: select(displayVariants),
    lineClamp: selectWithNone([1, 2, 3, 4, 5]),
    tone: select(['normal', 'secondary', 'danger', 'positive']),
    align: selectWithNone(['start', 'center', 'end', 'justify']),
    children: { control: { type: 'text' } },
}
