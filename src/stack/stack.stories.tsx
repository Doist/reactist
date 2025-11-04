import * as React from 'react'

import { Heading } from '../heading'
import {
    disableResponsiveProps,
    Placeholder,
    ResponsiveWidthRef,
    reusableBoxProps,
    selectCount,
    selectSize,
    selectWithNone,
    times,
    Wrapper,
} from '../utils/storybook-helper'

import { Stack } from './stack'

import type { DividerWeight } from '../divider'
import type { PartialProps } from '../utils/storybook-helper'

export default {
    title: 'Design system/Stack',
    component: Stack,
    argTypes: {
        space: selectSize(),
        align: selectWithNone(['start', 'center', 'end']),
        dividers: selectWithNone<DividerWeight>(['primary', 'secondary', 'tertiary']),
        ...reusableBoxProps(),
    },
    parameters: {
        badges: ['accessible'],
    },
}

const widths = [300, 360, 430, 280, 600, 490, 400]
const heights = [80, 40, 60, 70, 90, 30, 100]

function size(index: number) {
    return {
        width: widths[index % widths.length],
        height: heights[index % heights.length],
    }
}

export function InteractivePropsStory({
    itemCount,
    ...args
}: PartialProps<typeof Stack> & { itemCount: number }) {
    return (
        <Wrapper border={true}>
            <Stack {...args}>
                {times(itemCount).map((i) => (
                    <Placeholder key={i} label={i + 1} {...size(i)} />
                ))}
            </Stack>
        </Wrapper>
    )
}

InteractivePropsStory.argTypes = {
    itemCount: selectCount('Item count', 5),
}

export function ResponsiveStory({ itemCount }: { itemCount: number }) {
    return (
        <>
            <ResponsiveWidthRef />
            <Wrapper border title="Alignment and spacing changes as the viewport width changes">
                <Stack
                    space={{ mobile: 'xsmall', tablet: 'medium', desktop: 'xlarge' }}
                    align={{ mobile: 'start', tablet: 'center', desktop: 'end' }}
                >
                    {times(itemCount).map((i) => (
                        <Placeholder key={i} label={i + 1} {...size(i)} />
                    ))}
                </Stack>
            </Wrapper>
        </>
    )
}

ResponsiveStory.argTypes = {
    itemCount: selectCount('Item count'),
    space: { control: false },
    align: { control: false },
    dividers: { control: false },
    ...disableResponsiveProps,
}

export function NestedStacksStory(args: PartialProps<typeof Stack>) {
    const spaceStr = typeof args.space !== 'string' ? 'none' : args.space
    return (
        <Stack {...args}>
            <Heading level="1">Parent stack with space=&ldquo;{spaceStr}&rdquo;</Heading>
            <Stack space="xsmall">
                <Heading level="2">Nested stack with space=&ldquo;xsmall&rdquo;</Heading>
                <Placeholder />
                <Placeholder />
                <Placeholder />
            </Stack>
            <Stack space="xsmall">
                <Heading level="2">Nested stack with space=&ldquo;xsmall&rdquo;</Heading>
                <Placeholder />
                <Placeholder />
                <Placeholder />
                <Placeholder />
            </Stack>
        </Stack>
    )
}

NestedStacksStory.argTypes = {
    space: selectSize('xlarge'),
    dividers: { control: false },
    ...disableResponsiveProps,
}
