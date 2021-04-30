import * as React from 'react'
import {
    selectSize,
    reusableBoxProps,
    Placeholder,
    ResponsiveWidthRef,
    Wrapper,
    selectWithNone,
} from '../storybook-helper'
import { Stack } from '../stack'
import { Heading } from '../heading'
import { Inline } from './inline'
import type { InlineAlign } from './inline'

export default {
    title: 'Design system/Inline',
    component: Inline,
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

export function InteractivePropsStory() {
    return (
        <Wrapper title="Change the viewport width to see how it wraps content" border={true}>
            <Inline
                space={selectSize('space', 'medium')}
                align={selectWithNone<InlineAlign>('align', ['left', 'center', 'right'])}
                {...reusableBoxProps()}
            >
                {renderInlineContent()}
            </Inline>
        </Wrapper>
    )
}

export function ResponsiveStory() {
    return (
        <>
            <ResponsiveWidthRef />
            <Stack space="medium">
                <Wrapper title="Change the viewport width to see how spacing changes" border={true}>
                    <Inline space={['xsmall', 'medium', 'xlarge']}>{renderInlineContent()}</Inline>
                </Wrapper>
                <Wrapper
                    title="Change the viewport width to see how alignment changes"
                    border={true}
                >
                    <Inline space="xsmall" align={['left', 'center', 'right']}>
                        {renderInlineContent()}
                    </Inline>
                </Wrapper>
            </Stack>
        </>
    )
}

export function NestedStackStory() {
    const space = selectSize('space', 'xlarge')
    return (
        <>
            <Stack space={space}>
                <Heading level="1">Parent stack with space=&ldquo;{space ?? 'none'}&rdquo;</Heading>
                <Inline space="xsmall">{renderInlineContent()}</Inline>
                <Inline space="xsmall">{renderInlineContent()}</Inline>
            </Stack>
        </>
    )
}
