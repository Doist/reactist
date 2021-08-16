import * as React from 'react'

import {
    select,
    selectWithNone,
    reusableBoxProps,
    Placeholder,
    ResponsiveWidthRef,
    Wrapper,
    PartialProps,
    selectSize,
} from '../storybook-helper'

import { Box } from './box'
import { Inline } from '../inline'
import { Stack } from '../stack'
import { Text } from '../text'

import type {
    BoxDisplay,
    BoxFlexDirection,
    BoxFlexWrap,
    BoxAlignItems,
    BoxJustifyContent,
    BoxPaddingProps,
} from './'
import type { Space } from '../common-types'

export default {
    title: 'Design system/Box',
    component: Box,
}

export function InteractivePropsStory(args: PartialProps<typeof Box>) {
    return (
        <Wrapper border={true}>
            <Box style={{ backgroundColor: 'lightgreen' }} {...args}>
                <div>One</div>
                <div>Two</div>
                <div>Three</div>
            </Box>
        </Wrapper>
    )
}

InteractivePropsStory.argTypes = {
    display: select<BoxDisplay>(['block', 'inlineBlock', 'inline', 'flex', 'none'], 'block'),
    flexDirection: selectWithNone<BoxFlexDirection>(['column', 'row'], 'row'),
    flexWrap: selectWithNone<BoxFlexWrap>(['wrap', 'nowrap'], 'nowrap'),
    alignItems: selectWithNone<BoxAlignItems>(
        ['center', 'flexEnd', 'flexStart', 'baseline'],
        'none',
    ),
    justifyContent: selectWithNone<BoxJustifyContent>(
        ['center', 'flexEnd', 'flexStart', 'spaceBetween'],
        'none',
    ),
    ...reusableBoxProps(),
}

export function ResponsiveStory() {
    return (
        <>
            <ResponsiveWidthRef />
            <Stack space="large" dividers>
                <Wrapper title="Stacks elements on mobile">
                    <Box display="flex" flexDirection={['column', 'row']}>
                        <Placeholder label="One" height={30} />
                        <Placeholder label="Two" height={30} />
                        <Placeholder label="Three" height={30} />
                    </Box>
                </Wrapper>
                <Wrapper title="Switches horizontal alignment depending on viewport size">
                    <Box
                        style={{ backgroundColor: 'lightgreen' }}
                        display="flex"
                        justifyContent={['flexStart', 'center', 'flexEnd']}
                    >
                        <div>One</div>
                        <div>Two</div>
                        <div>Three</div>
                    </Box>
                </Wrapper>
                <Wrapper title="Switches vertical alignment depending on viewport size">
                    <Box
                        style={{ height: '120px' }}
                        display="flex"
                        alignItems={['flexEnd', 'center', 'flexStart']}
                    >
                        <Placeholder label="One" height={30} />
                        <Placeholder label="Two" height={60} />
                        <Placeholder label="Three" height={90} />
                    </Box>
                </Wrapper>
            </Stack>
        </>
    )
}

function PaddedBox({ prop, value }: { prop: keyof BoxPaddingProps; value: Space }) {
    const paddingProp = { [prop]: value }
    return (
        <Box borderRadius="standard" style={{ backgroundColor: '#83A9F2' }} {...paddingProp}>
            <Box borderRadius="standard" padding="medium" style={{ backgroundColor: '#1D438C' }}>
                <Text style={{ color: 'white', fontFamily: 'sans-serif' }}>{prop}</Text>
            </Box>
        </Box>
    )
}

export function PaddingStory({ padding }: { padding: Space }) {
    return (
        <Stack space="large">
            <Inline space="large" align="center" alignY="center">
                <PaddedBox prop="padding" value={padding} />
                <PaddedBox prop="paddingX" value={padding} />
                <PaddedBox prop="paddingY" value={padding} />
            </Inline>
            <Inline space="large" align="center" alignY="center">
                <PaddedBox prop="paddingTop" value={padding} />
                <PaddedBox prop="paddingRight" value={padding} />
                <PaddedBox prop="paddingBottom" value={padding} />
                <PaddedBox prop="paddingLeft" value={padding} />
            </Inline>
        </Stack>
    )
}

PaddingStory.argTypes = {
    padding: selectSize('medium'),
}
