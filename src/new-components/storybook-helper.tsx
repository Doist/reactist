import * as React from 'react'
import { number, select as selectKnob } from '@storybook/addon-knobs'
import { Box } from './box'
import { Heading } from './heading'
import { Stack } from './stack'

import './default-styles.less'

import type { SelectTypeKnobValue } from '@storybook/addon-knobs/dist/components/types'
import type { BoxProps } from './box'
import type { Space } from './common-types'

type SelectTypeOptionsProp<T extends SelectTypeKnobValue = SelectTypeKnobValue> =
    | Extract<T, PropertyKey>[]
    | readonly Extract<T, PropertyKey>[]

function selectWithNone<T extends string | number>(
    label: string,
    options: SelectTypeOptionsProp<T>,
    defaultValue: T | 'none' = 'none',
) {
    const value = selectKnob(label, ['none', ...options], defaultValue)
    return value === 'none' ? undefined : (value as Exclude<T, 'none'>)
}

function selectSize(label: string, defaultValue: Space | 'none' = 'none') {
    return selectWithNone<Space>(
        label,
        ['xsmall', 'small', 'medium', 'large', 'xlarge', 'xxlarge'],
        defaultValue,
    )
}

function selectCount(label: string, defaultValue = 5) {
    return Math.max(1, number(label, defaultValue))
}

function times(count: number): number[] {
    // eslint-disable-next-line prefer-spread
    return Array.apply(null, Array(count)).map((_x, i) => i)
}

function reusableBoxProps(): Partial<BoxProps> {
    return {
        maxWidth: selectWithNone('maxWidth', ['xsmall', 'small', 'medium', 'large', 'xlarge']),
        padding: selectSize('padding'),
        paddingX: selectSize('paddingX'),
        paddingY: selectSize('paddingY'),
        paddingTop: selectSize('paddingTop'),
        paddingRight: selectSize('paddingRight'),
        paddingBottom: selectSize('paddingBottom'),
        paddingLeft: selectSize('paddingLeft'),
    }
}

function Wrapper({
    title,
    children,
    border = false,
}: {
    title?: React.ReactNode
    children: React.ReactNode
    border?: boolean
}) {
    return (
        <Stack space="small">
            {title ? <Heading level="2">{title}</Heading> : null}
            <Box style={border ? { border: '1px dotted black' } : undefined}>{children}</Box>
        </Stack>
    )
}

function ResponsiveWidthRef() {
    return (
        <>
            <div style={{ height: '36px' }} />
            <div style={{ position: 'fixed', top: 0, left: 0 }}>
                <div style={{ width: '992px', height: '20px', backgroundColor: '#ccc' }}>
                    desktop min width
                </div>
                <div style={{ width: '768px', height: '20px', backgroundColor: '#ddd' }}>
                    tablet min width
                </div>
            </div>
        </>
    )
}

function Placeholder({
    label,
    width = '100%',
    height = '30px',
}: { label?: React.ReactNode } & Pick<React.CSSProperties, 'width' | 'height'>) {
    return (
        <Box
            style={{
                backgroundColor: 'lightgreen',
                border: '1px solid green',
                width,
                height,
            }}
            display="flex"
            alignItems="center"
            padding="medium"
        >
            {label}
        </Box>
    )
}

export {
    selectWithNone,
    selectSize,
    selectCount,
    times,
    reusableBoxProps,
    Wrapper,
    ResponsiveWidthRef,
    Placeholder,
}
