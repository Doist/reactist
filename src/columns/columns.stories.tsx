import * as React from 'react'

import { Box } from '../box'
import { Stack } from '../stack'
import {
    disableResponsiveProps,
    PartialProps,
    Placeholder,
    ResponsiveWidthRef,
    reusableBoxProps,
    selectSize,
    selectWithNone,
    times,
    Wrapper,
} from '../utils/storybook-helper'

import { Column, Columns } from './columns'

import type {
    ColumnsCollapseBelow,
    ColumnsHorizontalAlignment,
    ColumnsVerticalAlignment,
} from './columns'

export default {
    title: 'Design system/Columns',
    component: Columns,
    subcomponents: { Column },
    argTypes: {
        space: selectSize(),
        align: selectWithNone<ColumnsHorizontalAlignment>(['left', 'center', 'right']),
        alignY: selectWithNone<ColumnsVerticalAlignment>(['top', 'center', 'bottom', 'baseline']),
        ...reusableBoxProps(),
    },
    parameters: {
        badges: ['accessible'],
    },
}

export function AlignmentStory(args: PartialProps<typeof Columns>) {
    return (
        <Stack space="xlarge">
            <Wrapper title="Use alignY to control vertical alignment" border={true}>
                <Columns {...args}>
                    {times(5).map((i) => (
                        <Column key={i}>
                            <Placeholder label={i + 1} height={(i + 1) * 30} />
                        </Column>
                    ))}
                </Columns>
            </Wrapper>
            <Wrapper title="Use align to control horizontal alignment" border={true}>
                <Columns {...args}>
                    <Column width="1/5">
                        <Placeholder height={20} />
                    </Column>
                    <Column width="1/5">
                        <Placeholder height={20} />
                    </Column>
                </Columns>
            </Wrapper>
        </Stack>
    )
}

export function WidthsStory({ space }: PartialProps<typeof Columns>) {
    return (
        <Stack
            space="large"
            dividers="primary"
            paddingRight="xxlarge" // to make sure we see if columns ever overflow the container
        >
            <Wrapper>
                <Stack space="large">
                    <Columns space={space}>
                        <Column width="1/2">
                            <Placeholder label="1/2" />
                        </Column>
                        <Column width="1/2">
                            <Placeholder label="1/2" />
                        </Column>
                    </Columns>
                </Stack>
            </Wrapper>

            <Wrapper>
                <Stack space="large">
                    <Columns space={space}>
                        <Column width="1/3">
                            <Placeholder label="1/3" />
                        </Column>
                        <Column width="2/3">
                            <Placeholder label="2/3" />
                        </Column>
                    </Columns>
                    <Columns space={space}>
                        <Column width="1/3">
                            <Placeholder label="1/3" />
                        </Column>
                        <Column width="1/3">
                            <Placeholder label="1/3" />
                        </Column>
                        <Column width="1/3">
                            <Placeholder label="1/3" />
                        </Column>
                    </Columns>
                </Stack>
            </Wrapper>

            <Wrapper>
                <Stack space="large">
                    <Columns space={space}>
                        <Column width="1/4">
                            <Placeholder label="1/4" />
                        </Column>
                        <Column width="3/4">
                            <Placeholder label="3/4" />
                        </Column>
                    </Columns>
                    <Columns space={space}>
                        <Column width="1/4">
                            <Placeholder label="1/4" />
                        </Column>
                        <Column width="1/4">
                            <Placeholder label="1/4" />
                        </Column>
                        <Column width="1/4">
                            <Placeholder label="1/4" />
                        </Column>
                        <Column width="1/4">
                            <Placeholder label="1/4" />
                        </Column>
                    </Columns>
                </Stack>
            </Wrapper>

            <Wrapper>
                <Stack space="large">
                    <Columns space={space}>
                        <Column width="2/5">
                            <Placeholder label="2/5" />
                        </Column>
                        <Column width="3/5">
                            <Placeholder label="3/5" />
                        </Column>
                    </Columns>
                    <Columns space={space}>
                        <Column width="1/5">
                            <Placeholder label="1/5" />
                        </Column>
                        <Column width="4/5">
                            <Placeholder label="4/5" />
                        </Column>
                    </Columns>
                    <Columns space={space}>
                        <Column width="1/5">
                            <Placeholder label="1/5" />
                        </Column>
                        <Column width="1/5">
                            <Placeholder label="1/5" />
                        </Column>
                        <Column width="1/5">
                            <Placeholder label="1/5" />
                        </Column>
                        <Column width="1/5">
                            <Placeholder label="1/5" />
                        </Column>
                        <Column width="1/5">
                            <Placeholder label="1/5" />
                        </Column>
                    </Columns>
                </Stack>
            </Wrapper>

            <Wrapper>
                <Stack space="large">
                    <Columns space={space}>
                        <Column width="content">
                            <Placeholder label="content" />
                        </Column>
                        <Column width="auto">
                            <Placeholder label="auto" />
                        </Column>
                    </Columns>
                    <Columns space={space}>
                        <Column width="2/3">
                            <Placeholder label="2/3" />
                        </Column>
                        <Column width="auto">
                            <Placeholder label="auto" />
                        </Column>
                        <Column width="content">
                            <Placeholder label="content" />
                        </Column>
                    </Columns>
                </Stack>
            </Wrapper>

            <Wrapper>
                <Stack space="medium">
                    <Columns space={space}>
                        <Column width="content">
                            <Placeholder label="content" />
                        </Column>
                        <Column>
                            <Placeholder label="auto" />
                        </Column>
                    </Columns>
                    <Columns space={space}>
                        <Column width="1/5">
                            <Placeholder label="1/5" />
                        </Column>
                        <Column>
                            <Placeholder label="auto" />
                        </Column>
                    </Columns>
                    <Columns space={space}>
                        <Column width="1/4">
                            <Placeholder label="1/4" />
                        </Column>
                        <Column>
                            <Placeholder label="auto" />
                        </Column>
                    </Columns>
                    <Columns space={space}>
                        <Column width="1/3">
                            <Placeholder label="1/3" />
                        </Column>
                        <Column>
                            <Placeholder label="auto" />
                        </Column>
                    </Columns>
                    <Columns space={space}>
                        <Column width="2/5">
                            <Placeholder label="2/5" />
                        </Column>
                        <Column>
                            <Placeholder label="auto" />
                        </Column>
                    </Columns>
                    <Columns space={space}>
                        <Column width="1/2">
                            <Placeholder label="1/2" />
                        </Column>
                        <Column>
                            <Placeholder label="auto" />
                        </Column>
                    </Columns>
                    <Columns space={space}>
                        <Column width="3/5">
                            <Placeholder label="3/5" />
                        </Column>
                        <Column>
                            <Placeholder label="auto" />
                        </Column>
                    </Columns>
                    <Columns space={space}>
                        <Column width="2/3">
                            <Placeholder label="2/3" />
                        </Column>
                        <Column>
                            <Placeholder label="auto" />
                        </Column>
                    </Columns>
                    <Columns space={space}>
                        <Column width="3/4">
                            <Placeholder label="3/4" />
                        </Column>
                        <Column>
                            <Placeholder label="auto" />
                        </Column>
                    </Columns>
                    <Columns space={space}>
                        <Column width="4/5">
                            <Placeholder label="4/5" />
                        </Column>
                        <Column>
                            <Placeholder label="auto" />
                        </Column>
                    </Columns>
                </Stack>
            </Wrapper>
        </Stack>
    )
}

WidthsStory.argTypes = {
    space: selectSize('medium'),
    align: { control: false },
    alignY: { control: false },
    ...disableResponsiveProps,
}

export function ResponsiveStory(args: PartialProps<typeof Columns>) {
    return (
        <>
            <ResponsiveWidthRef />
            <Stack space="large" dividers="primary">
                <Wrapper title="Columns alignment changes as the viewport size changes">
                    <Columns
                        space="medium"
                        align={{ mobile: 'left', tablet: 'center', desktop: 'right' }}
                    >
                        {times(5).map((i) => (
                            <Column width="content" key={i}>
                                <Placeholder label={i + 1} height={50} />
                            </Column>
                        ))}
                    </Columns>
                </Wrapper>
                <Wrapper title="Space between columns reduces on smaller screen sizes">
                    <Columns space={{ mobile: 'xsmall', tablet: 'medium', desktop: 'xlarge' }}>
                        {times(5).map((i) => (
                            <Column key={i}>
                                <Placeholder label={i + 1} height={50} />
                            </Column>
                        ))}
                    </Columns>
                </Wrapper>
                <Wrapper title="Use collapseBelow to control if/when the columns become stacked depending on viewport width">
                    <Columns {...args}>
                        {times(5).map((i) => (
                            <Column key={i}>
                                <Placeholder label={i + 1} height={50} />
                            </Column>
                        ))}
                    </Columns>
                </Wrapper>
            </Stack>
        </>
    )
}

ResponsiveStory.argTypes = {
    space: selectSize('medium'),
    collapseBelow: selectWithNone<ColumnsCollapseBelow>(['tablet', 'desktop'], 'tablet'),
    align: { control: false },
    alignY: { control: false },
    ...disableResponsiveProps,
}

export function FlexChildStory(args: PartialProps<typeof Columns>) {
    return (
        <Wrapper title="As a flex child">
            <Box display="flex" alignItems="center">
                <Box>
                    <Placeholder label="Element outside of Columns" />
                </Box>
                <Columns {...args}>
                    {times(5).map((i) => (
                        <Column key={i}>
                            <Placeholder label={i + 1} height={50} />
                        </Column>
                    ))}
                </Columns>
            </Box>
        </Wrapper>
    )
}

FlexChildStory.argTypes = {
    space: selectSize('medium'),
    align: { control: false },
    alignY: { control: false },
    ...disableResponsiveProps,
}

export function NestedColumnsStory(args: PartialProps<typeof Columns>) {
    return (
        <Wrapper title="Inner Columns retain their own spacing">
            <Columns space="xlarge">
                <Column>
                    <Placeholder label={0} height={50} />
                </Column>

                <Column>
                    <Columns {...args}>
                        {times(5).map((i) => (
                            <Column key={i}>
                                <Placeholder label={i + 1} height={50} />
                            </Column>
                        ))}
                    </Columns>
                </Column>

                <Column>
                    <Placeholder label={6} height={50} />
                </Column>
            </Columns>
        </Wrapper>
    )
}

NestedColumnsStory.argTypes = {
    space: selectSize('medium'),
    align: { control: false },
    alignY: { control: false },
    ...disableResponsiveProps,
}
