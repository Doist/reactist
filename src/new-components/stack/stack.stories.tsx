import * as React from 'react'
import {
    selectSize,
    selectCount,
    times,
    reusableBoxProps,
    Placeholder,
    ResponsiveWidthRef,
    Wrapper,
    selectWithNone,
} from '../storybook-helper'
import { Heading } from '../heading'
import { Stack } from './stack'

import type { DividerWeight } from '../divider'

export default {
    title: 'Design system/Stack',
    component: Stack,
}

export function InteractivePropsStory() {
    return (
        <Wrapper border={true}>
            <Stack
                space={selectSize('space')}
                dividers={selectWithNone<DividerWeight>('dividers', ['regular', 'strong']) || false}
                {...reusableBoxProps()}
            >
                {times(selectCount('Item Count')).map((i) => (
                    <Placeholder key={i} label={i + 1} />
                ))}
            </Stack>
        </Wrapper>
    )
}

export function ResponsiveStory() {
    return (
        <>
            <ResponsiveWidthRef />
            <Wrapper>
                <Stack space={['xsmall', 'medium', 'xlarge']}>
                    {times(selectCount('Item Count')).map((i) => (
                        <Placeholder key={i} label={i + 1} />
                    ))}
                </Stack>
            </Wrapper>
        </>
    )
}

export function NestedStacksStory() {
    const space = selectSize('space', 'xlarge')
    return (
        <>
            <Stack space={space}>
                <Heading level="1">Parent stack with space=&ldquo;{space ?? 'none'}&rdquo;</Heading>
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
