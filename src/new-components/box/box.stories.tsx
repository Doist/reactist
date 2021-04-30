import * as React from 'react'
import {
    select,
    selectWithNone,
    reusableBoxProps,
    disableResponsiveProps,
    Placeholder,
    ResponsiveWidthRef,
    Wrapper,
    PartialProps,
} from '../storybook-helper'
import { Stack } from '../stack'
import { Box } from './box'
import type {
    BoxDisplay,
    BoxFlexDirection,
    BoxFlexWrap,
    BoxAlignItems,
    BoxJustifyContent,
} from './box'

export default {
    title: 'Design system/Box',
    component: Box,
    argTypes: {
        display: select<BoxDisplay>(['block', 'inlineBlock', 'inline', 'flex', 'none'], 'block'),
        flexDirection: selectWithNone<BoxFlexDirection>(['column', 'row'], 'row'),
        flexWrap: selectWithNone<BoxFlexWrap>(['wrap', 'nowrap'], 'nowrap'),
        alignItems: selectWithNone<BoxAlignItems>(['center', 'flexEnd', 'flexStart'], 'none'),
        justifyContent: selectWithNone<BoxJustifyContent>(
            ['center', 'flexEnd', 'flexStart', 'spaceBetween'],
            'none',
        ),
        ...reusableBoxProps(),
    },
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

ResponsiveStory.argTypes = {
    display: { control: false },
    flexDirection: { control: false },
    flexWrap: { control: false },
    alignItems: { control: false },
    justifyContent: { control: false },
    ...disableResponsiveProps,
}
