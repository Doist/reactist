import * as React from 'react'
import classNames from 'classnames'
import { forwardRefWithAs } from '../type-helpers'
import { getClassNames } from '../responsive-props'

import type { ResponsiveProp } from '../responsive-props'
import type { Space, WithEnhancedClassName } from '../common-types'

import styles from './box.module.css'

interface PaddingProps {
    padding?: ResponsiveProp<Space>
    paddingX?: ResponsiveProp<Space>
    paddingY?: ResponsiveProp<Space>
    paddingTop?: ResponsiveProp<Space>
    paddingRight?: ResponsiveProp<Space>
    paddingBottom?: ResponsiveProp<Space>
    paddingLeft?: ResponsiveProp<Space>
}

interface ReusableBoxProps extends PaddingProps {
    minWidth?: 'xsmall' | 'small' | 'medium' | 'large' | 'xlarge'
    maxWidth?: 'xsmall' | 'small' | 'medium' | 'large' | 'xlarge'
    background?: 'default' | 'shade' | 'highlight' | 'selected'
}

interface BoxProps extends WithEnhancedClassName, ReusableBoxProps {
    display?: ResponsiveProp<'block' | 'flex' | 'inline' | 'inlineBlock' | 'none'>
    flexDirection?: ResponsiveProp<'column' | 'row'>
    flexWrap?: 'nowrap' | 'wrap'
    alignItems?: ResponsiveProp<'center' | 'flexEnd' | 'flexStart'>
    justifyContent?: ResponsiveProp<'center' | 'flexEnd' | 'flexStart' | 'spaceBetween'>
    overflow?: 'hidden' | 'auto' | 'visible' | 'scroll'
    width?: 'full'
    height?: 'full'
}

const Box = forwardRefWithAs<BoxProps>(function Box(
    {
        component = 'div',
        display = 'block',
        flexDirection = 'row',
        flexWrap,
        alignItems,
        justifyContent,
        overflow,
        width,
        height,
        background,
        minWidth,
        maxWidth,
        padding,
        paddingY,
        paddingX,
        paddingTop,
        paddingRight,
        paddingBottom,
        paddingLeft,
        className,
        children,
        ...props
    },
    ref,
) {
    const resolvedPaddingTop = paddingTop ?? paddingY ?? padding
    const resolvedPaddingRight = paddingRight ?? paddingX ?? padding
    const resolvedPaddingBottom = paddingBottom ?? paddingY ?? padding
    const resolvedPaddingLeft = paddingLeft ?? paddingX ?? padding

    return React.createElement(
        component,
        {
            ...props,
            className:
                classNames(
                    className,
                    styles.box,
                    getClassNames(styles, 'display', display),
                    getClassNames(styles, 'minWidth', minWidth),
                    getClassNames(styles, 'maxWidth', maxWidth),
                    getClassNames(styles, 'paddingTop', resolvedPaddingTop),
                    getClassNames(styles, 'paddingRight', resolvedPaddingRight),
                    getClassNames(styles, 'paddingBottom', resolvedPaddingBottom),
                    getClassNames(styles, 'paddingLeft', resolvedPaddingLeft),
                    display === 'flex'
                        ? getClassNames(styles, 'flexDirection', flexDirection)
                        : null,
                    display === 'flex' ? getClassNames(styles, 'flexWrap', flexWrap) : null,
                    display === 'flex' ? getClassNames(styles, 'alignItems', alignItems) : null,
                    display === 'flex'
                        ? getClassNames(styles, 'justifyContent', justifyContent)
                        : null,
                    getClassNames(styles, 'overflow', overflow),
                    getClassNames(styles, 'width', width),
                    getClassNames(styles, 'height', height),
                    getClassNames(styles, 'bg', background),
                ) || undefined,
            ref,
        },
        children,
    )
})

export type { BoxProps, ReusableBoxProps }
export { Box }
