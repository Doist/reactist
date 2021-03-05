import * as React from 'react'
import { storiesOf } from '@storybook/react'
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
import { Stack } from './stack'

import type { DividerWeight } from '../divider'

storiesOf('Stack', module)
    .add('Stack (interactive props)', () => (
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
    ))

    .add('Stack (responsive)', () => (
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
    ))
