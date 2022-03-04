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
import { Heading } from '../heading'

import type {
    BoxDisplay,
    BoxFlexDirection,
    BoxFlexWrap,
    BoxAlignItems,
    BoxJustifyContent,
    BoxMarginProps,
    BoxPaddingProps,
    BoxTextAlign,
} from './'
import type { Space, SpaceWithNegatives } from '../common-types'

export default {
    title: 'Design system/Box',
    component: Box,
    parameters: {
        badges: ['accessible'],
    },
}

export function InteractivePropsStory(args: PartialProps<typeof Box>) {
    return (
        <Wrapper border={true}>
            <Box background="selected" {...args} />
        </Wrapper>
    )
}

InteractivePropsStory.argTypes = {
    children: {
        control: { type: 'text' },
        defaultValue: 'The quick brown fox jumps over the lazy dog.',
    },
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
    textAlign: selectWithNone<BoxTextAlign>(['start', 'center', 'end', 'justify'], 'none'),
    ...reusableBoxProps(),
}

export function ResponsiveStory() {
    return (
        <>
            <ResponsiveWidthRef />
            <Stack space="large" dividers="primary">
                <Wrapper title="Stacks elements on mobile">
                    <Box display="flex" flexDirection={{ mobile: 'column', tablet: 'row' }}>
                        <Placeholder label="One" height={30} />
                        <Placeholder label="Two" height={30} />
                        <Placeholder label="Three" height={30} />
                    </Box>
                </Wrapper>
                <Wrapper title="Switches horizontal alignment depending on viewport size">
                    <Box
                        style={{ backgroundColor: 'lightgreen' }}
                        display="flex"
                        justifyContent={{
                            mobile: 'flexStart',
                            tablet: 'center',
                            desktop: 'flexEnd',
                        }}
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
                        alignItems={{
                            mobile: 'flexEnd',
                            tablet: 'center',
                            desktop: 'flexStart',
                        }}
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
        <Box borderRadius="standard" border="primary" {...paddingProp}>
            <Box borderRadius="standard" padding="medium" background="selected">
                <Text>{prop}</Text>
            </Box>
        </Box>
    )
}

export function PaddingStory({ padding }: { padding: Space }) {
    return (
        <Stack space="large">
            <Heading level="2">The transparent bordered box has padding</Heading>
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

const marginToPadding: Record<keyof BoxMarginProps, keyof BoxPaddingProps> = {
    margin: 'padding',
    marginX: 'paddingX',
    marginY: 'paddingY',
    marginTop: 'paddingTop',
    marginRight: 'paddingRight',
    marginBottom: 'paddingBottom',
    marginLeft: 'paddingLeft',
}

const marginBoxStyle: React.CSSProperties = { opacity: 0.5, minHeight: 100, minWidth: 100 }

function MarginBox({ prop, value }: { prop: keyof BoxMarginProps; value: Space }) {
    const marginProp = { [prop]: value }
    const outerPaddingToCompensateNegativeMargin = value.startsWith('-')
        ? { [marginToPadding[prop]]: value.slice(1) }
        : undefined
    return (
        <Box>
            <Box {...outerPaddingToCompensateNegativeMargin}>
                <Box borderRadius="standard" border="primary">
                    <Box
                        borderRadius="standard"
                        padding="medium"
                        background="selected"
                        display="flex"
                        alignItems="center"
                        justifyContent="center"
                        style={marginBoxStyle}
                        {...marginProp}
                    >
                        <Text>{prop}</Text>
                    </Box>
                </Box>
            </Box>
        </Box>
    )
}

export function MarginStory({ margin }: { margin: Space }) {
    return (
        <Stack space="large">
            <Heading level="2">The shaded box has margin</Heading>
            <Text>
                When margin is negative, you will see the outer bordered box appear to be inside the
                shaded box.
            </Text>
            <Box padding="large">
                <Inline space="large" align="center" alignY="center">
                    <MarginBox prop="margin" value={margin} />
                    <MarginBox prop="marginX" value={margin} />
                    <MarginBox prop="marginY" value={margin} />
                </Inline>
            </Box>
            <Box padding="large">
                <Inline space="large" align="center" alignY="center">
                    <MarginBox prop="marginTop" value={margin} />
                    <MarginBox prop="marginRight" value={margin} />
                    <MarginBox prop="marginBottom" value={margin} />
                    <MarginBox prop="marginLeft" value={margin} />
                </Inline>
            </Box>
        </Stack>
    )
}

MarginStory.argTypes = {
    margin: select<SpaceWithNegatives | 'none'>(
        [
            'xxlarge',
            'xlarge',
            'large',
            'medium',
            'small',
            'xsmall',
            'none',
            '-xsmall',
            '-small',
            '-medium',
            '-large',
            '-xlarge',
            '-xxlarge',
        ],
        'medium',
    ),
}
