import * as React from 'react'
import {
    selectSize,
    selectCount,
    times,
    reusableBoxProps,
    disableResponsiveProps,
    Placeholder,
    ResponsiveWidthRef,
    Wrapper,
    selectWithNone,
    PartialProps,
} from '../storybook-helper'
import { Heading } from '../heading'
import { Stack } from './stack'

import type { DividerWeight } from '../divider'

export default {
    title: 'Design system/Stack',
    component: Stack,
    argTypes: {
        space: selectSize(),
        dividers: selectWithNone<DividerWeight>(['regular', 'strong']),
        ...reusableBoxProps(),
    },
}

export function InteractivePropsStory({
    itemCount,
    ...args
}: PartialProps<typeof Stack> & { itemCount: number }) {
    return (
        <Wrapper border={true}>
            <Stack {...args}>
                {times(itemCount).map((i) => (
                    <Placeholder key={i} label={i + 1} />
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
            <Wrapper>
                <Stack space={['xsmall', 'medium', 'xlarge']}>
                    {times(itemCount).map((i) => (
                        <Placeholder key={i} label={i + 1} />
                    ))}
                </Stack>
            </Wrapper>
        </>
    )
}

ResponsiveStory.argTypes = {
    itemCount: selectCount('Item count'),
    space: { control: false },
    dividers: { control: false },
    ...disableResponsiveProps,
}

export function NestedStacksStory(args: PartialProps<typeof Stack>) {
    return (
        <>
            <Stack {...args}>
                <Heading level="1">
                    Parent stack with space=&ldquo;{args.space ?? 'none'}&rdquo;
                </Heading>
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
        </>
    )
}

NestedStacksStory.argTypes = {
    space: selectSize('xlarge'),
    dividers: { control: false },
    ...disableResponsiveProps,
}
