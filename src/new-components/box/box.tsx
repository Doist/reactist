import * as React from 'react'
import classNames from 'classnames'
import { forwardRefComponent } from '../../utils/polymorphism'
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

type BoxMaxMinWidth = 'xsmall' | 'small' | 'medium' | 'large' | 'xlarge'
type BoxDisplay = 'block' | 'flex' | 'inline' | 'inlineBlock' | 'inlineFlex' | 'none'
type BoxFlexDirection = 'column' | 'row'
type BoxFlexWrap = 'nowrap' | 'wrap'
type BoxAlignItems = 'center' | 'flexEnd' | 'flexStart' | 'baseline'
type BoxJustifyContent = 'center' | 'flexEnd' | 'flexStart' | 'spaceBetween'
type BoxOverflow = 'hidden' | 'auto' | 'visible' | 'scroll'

interface BorderProps {
    borderRadius?: 'standard' | 'none' | 'full'
    border?: 'standard' | 'none' // to be extended with more options
}

interface ReusableBoxProps extends BorderProps, PaddingProps {
    minWidth?: 0 | BoxMaxMinWidth
    maxWidth?: BoxMaxMinWidth
    background?: 'default' | 'aside' | 'highlight' | 'selected'
}

type BoxPosition = 'absolute' | 'fixed' | 'relative' | 'static' | 'sticky'

interface BoxProps extends WithEnhancedClassName, ReusableBoxProps {
    position?: ResponsiveProp<BoxPosition>
    display?: ResponsiveProp<BoxDisplay>
    flexDirection?: ResponsiveProp<BoxFlexDirection>
    flexWrap?: BoxFlexWrap
    flexGrow?: 0 | 1
    flexShrink?: 0
    alignItems?: ResponsiveProp<BoxAlignItems>
    justifyContent?: ResponsiveProp<BoxJustifyContent>
    overflow?: BoxOverflow
    width?: 'full'
    height?: 'full'
}

const Box = forwardRefComponent<'div', BoxProps>(function Box(
    {
        as: component = 'div',
        position = 'static',
        display = 'block',
        flexDirection = 'row',
        flexWrap,
        flexGrow,
        flexShrink,
        alignItems,
        justifyContent,
        overflow,
        width,
        height,
        background,
        border,
        borderRadius,
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
    const isFlex = display === 'flex' || display === 'inlineFlex'

    return React.createElement(
        component,
        {
            ...props,
            className:
                classNames(
                    className,
                    styles.box,
                    getClassNames(styles, 'display', display),
                    position !== 'static' ? getClassNames(styles, 'position', position) : null,
                    minWidth != null ? getClassNames(styles, 'minWidth', String(minWidth)) : null,
                    getClassNames(styles, 'maxWidth', maxWidth),
                    getClassNames(styles, 'paddingTop', resolvedPaddingTop),
                    getClassNames(styles, 'paddingRight', resolvedPaddingRight),
                    getClassNames(styles, 'paddingBottom', resolvedPaddingBottom),
                    getClassNames(styles, 'paddingLeft', resolvedPaddingLeft),
                    isFlex ? getClassNames(styles, 'flexDirection', flexDirection) : null,
                    isFlex ? getClassNames(styles, 'flexWrap', flexWrap) : null,
                    isFlex ? getClassNames(styles, 'alignItems', alignItems) : null,
                    isFlex ? getClassNames(styles, 'justifyContent', justifyContent) : null,
                    flexShrink != null
                        ? getClassNames(styles, 'flexShrink', String(flexShrink))
                        : null,
                    flexGrow != null ? getClassNames(styles, 'flexGrow', String(flexGrow)) : null,
                    getClassNames(styles, 'overflow', overflow),
                    getClassNames(styles, 'width', width),
                    getClassNames(styles, 'height', height),
                    getClassNames(styles, 'bg', background),
                    borderRadius !== 'none'
                        ? getClassNames(styles, 'borderRadius', borderRadius)
                        : null,
                    border !== 'none' ? getClassNames(styles, 'border', border) : null,
                ) || undefined,
            ref,
        },
        children,
    )
})

export type {
    BoxProps,
    ReusableBoxProps,
    BoxMaxMinWidth,
    BoxDisplay,
    BoxPosition,
    BoxFlexDirection,
    BoxFlexWrap,
    BoxAlignItems,
    BoxJustifyContent,
    BoxOverflow,
}

export { Box }
