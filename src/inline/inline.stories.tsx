import * as React from 'react'
import {
    selectSize,
    reusableBoxProps,
    Placeholder,
    ResponsiveWidthRef,
    Wrapper,
    selectWithNone,
    PartialProps,
    disableResponsiveProps,
} from '../utils/storybook-helper'
import { Stack } from '../stack'
import { Heading } from '../heading'
import { Inline, InlineAlign } from './inline'

export default {
    title: 'Design system/Inline',
    component: Inline,
    argTypes: {
        space: selectSize('medium'),
        align: selectWithNone<InlineAlign>(['left', 'center', 'right']),
        ...reusableBoxProps(),
    },
    parameters: {
        badges: ['accessible'],
    },
}

function renderInlineContent() {
    return (
        <>
            <Placeholder width={20} height={48} />
            <Placeholder width={80} height={48} />
            <Placeholder width={40} height={48} />
            <Placeholder width={150} height={48} />
            <Placeholder width={120} height={48} />
            <Placeholder width={60} height={48} />
            <Placeholder width={40} height={48} />
            <Placeholder width={180} height={48} />
            <Placeholder width={100} height={48} />
            <Placeholder width={60} height={48} />
            <Placeholder width={120} height={48} />
            <Placeholder width={40} height={48} />
        </>
    )
}

export function InteractivePropsStory(args: PartialProps<typeof Inline>) {
    return (
        <Wrapper title="Change the viewport width to see how it wraps content" border={true}>
            <Inline {...args}>{renderInlineContent()}</Inline>
        </Wrapper>
    )
}

export function ResponsiveStory() {
    return (
        <>
            <ResponsiveWidthRef />
            <Stack space="medium">
                <Wrapper title="Change the viewport width to see how spacing changes" border={true}>
                    <Inline space={{ mobile: 'xsmall', tablet: 'medium', desktop: 'xlarge' }}>
                        {renderInlineContent()}
                    </Inline>
                </Wrapper>
                <Wrapper
                    title="Change the viewport width to see how alignment changes"
                    border={true}
                >
                    <Inline
                        space="xsmall"
                        align={{ mobile: 'left', tablet: 'center', desktop: 'right' }}
                    >
                        {renderInlineContent()}
                    </Inline>
                </Wrapper>
            </Stack>
        </>
    )
}

ResponsiveStory.argTypes = {
    space: { control: false },
    align: { control: false },
    ...disableResponsiveProps,
}

export function NestedStackStory({ space }: PartialProps<typeof Inline>) {
    const spaceStr = typeof space !== 'string' ? 'none' : space
    return (
        <Stack space={space}>
            <Heading level="1">Parent stack with space=&ldquo;{spaceStr}&rdquo;</Heading>
            <Inline space="xsmall">{renderInlineContent()}</Inline>
            <Inline space="xsmall">{renderInlineContent()}</Inline>
        </Stack>
    )
}

NestedStackStory.argTypes = {
    space: selectSize('xlarge'),
    align: { control: false },
    ...disableResponsiveProps,
}
