import '../styles/design-tokens.css'

import * as React from 'react'

import { Box } from '../box'
import { Heading } from '../heading'
import { Stack } from '../stack'

import type { BoxProps } from '../box'
import type { Space } from './common-types'

type SelectTypeOptionsProp<T> = Extract<T, PropertyKey>[] | readonly Extract<T, PropertyKey>[]

function select<T extends string | number>(options: SelectTypeOptionsProp<T>, defaultValue?: T) {
    return {
        control: {
            type: 'select',
        },
        options,
        defaultValue,
    }
}

function selectWithNone<T extends string | number>(
    options: SelectTypeOptionsProp<T>,
    defaultValue: T | 'none' = 'none',
) {
    return {
        control: {
            type: 'select',
        },
        options: ['none', ...options],
        defaultValue,
        mapping: {
            none: undefined,
        },
    }
}

function selectSize(defaultValue: Space | 'none' = 'none') {
    return selectWithNone<Space>(
        ['xsmall', 'small', 'medium', 'large', 'xlarge', 'xxlarge'],
        defaultValue,
    )
}

function selectCount(label: string, defaultValue = 5) {
    return {
        control: {
            type: 'number',
            min: 1,
        },
        name: label,
        defaultValue,
    }
}

function times(count: number): number[] {
    // eslint-disable-next-line prefer-spread
    return Array.apply(null, Array(count)).map((_x, i) => i)
}

function reusableBoxProps(): Partial<Record<keyof BoxProps, ReturnType<typeof selectWithNone>>> {
    return {
        maxWidth: selectWithNone(['xsmall', 'small', 'medium', 'large', 'xlarge', 'full']),
        width: selectWithNone([
            'auto',
            'maxContent',
            'minContent',
            'fitContent',
            'xsmall',
            'small',
            'medium',
            'large',
            'xlarge',
            'full',
        ]),
        padding: selectSize(),
        paddingX: selectSize(),
        paddingY: selectSize(),
        paddingTop: selectSize(),
        paddingRight: selectSize(),
        paddingBottom: selectSize(),
        paddingLeft: selectSize(),
    }
}

const disableResponsiveProps = Object.keys(reusableBoxProps()).reduce(
    (accumulator, key) => ({ ...accumulator, [key]: { control: false } }),
    {},
)

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
            <Box width="full" style={border ? { border: '1px dotted black' } : undefined}>
                {children}
            </Box>
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

type PartialProps<
    // Parent type of T is the same as React.ComponentProps<T>
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    T extends keyof JSX.IntrinsicElements | React.JSXElementConstructor<any>,
> = Partial<React.ComponentProps<T>>

export {
    disableResponsiveProps,
    Placeholder,
    ResponsiveWidthRef,
    reusableBoxProps,
    select,
    selectCount,
    selectSize,
    selectWithNone,
    times,
    Wrapper,
}

export type { PartialProps }
