import * as React from 'react'
import { storiesOf } from '@storybook/react'
import {
    selectSize,
    reusableBoxProps,
    Placeholder,
    ResponsiveWidthRef,
    Wrapper,
    selectWithNone,
} from '../storybook-helper'
import { Stack } from '../stack'
import { Inline } from './inline'
import type { InlineAlign } from './inline'

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

storiesOf('Inline', module)
    .add('Interactive props', () => (
        <Wrapper title="Change the viewport width to see how it wraps content" border={true}>
            <Inline
                space={selectSize('space', 'medium')}
                align={selectWithNone<InlineAlign>('align', ['left', 'center', 'right'])}
                {...reusableBoxProps()}
            >
                {renderInlineContent()}
            </Inline>
        </Wrapper>
    ))

    .add('Responsive', () => (
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
    ))
