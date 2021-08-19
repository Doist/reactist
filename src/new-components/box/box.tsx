import * as React from 'react'
import classNames from 'classnames'
import { polymorphicComponent } from '../../utils/polymorphism'
import { getClassNames } from '../responsive-props'

import type { ResponsiveProp } from '../responsive-props'
import type { Space, SpaceWithNegatives, WithEnhancedClassName } from '../common-types'

import styles from './box.module.css'
import paddingStyles from './padding.module.css'
import marginStyles from './margin.module.css'

interface BoxPaddingProps {
    padding?: ResponsiveProp<Space>
    paddingX?: ResponsiveProp<Space>
    paddingY?: ResponsiveProp<Space>
    paddingTop?: ResponsiveProp<Space>
    paddingRight?: ResponsiveProp<Space>
    paddingBottom?: ResponsiveProp<Space>
    paddingLeft?: ResponsiveProp<Space>
}

interface BoxMarginProps {
    margin?: ResponsiveProp<SpaceWithNegatives>
    marginX?: ResponsiveProp<SpaceWithNegatives>
    marginY?: ResponsiveProp<SpaceWithNegatives>
    marginTop?: ResponsiveProp<SpaceWithNegatives>
    marginRight?: ResponsiveProp<SpaceWithNegatives>
    marginBottom?: ResponsiveProp<SpaceWithNegatives>
    marginLeft?: ResponsiveProp<SpaceWithNegatives>
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

interface ReusableBoxProps extends BorderProps, BoxPaddingProps {
    minWidth?: 0 | BoxMaxMinWidth
    maxWidth?: BoxMaxMinWidth | 'full'
    background?: 'default' | 'aside' | 'highlight' | 'selected'
}

type BoxPosition = 'absolute' | 'fixed' | 'relative' | 'static' | 'sticky'

interface BoxProps extends WithEnhancedClassName, ReusableBoxProps, BoxMarginProps {
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
    textAlign?: ResponsiveProp<'start' | 'center' | 'end' | 'justify'>
}

const Box = polymorphicComponent<'div', BoxProps, 'keepClassName'>(function Box(
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
        textAlign = 'start',
        padding,
        paddingY,
        paddingX,
        paddingTop,
        paddingRight,
        paddingBottom,
        paddingLeft,
        margin,
        marginY,
        marginX,
        marginTop,
        marginRight,
        marginBottom,
        marginLeft,
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

    const resolvedMarginTop = marginTop ?? marginY ?? margin
    const resolvedMarginRight = marginRight ?? marginX ?? margin
    const resolvedMarginBottom = marginBottom ?? marginY ?? margin
    const resolvedMarginLeft = marginLeft ?? marginX ?? margin

    const omitFlex = typeof display === 'string' && display !== 'flex' && display !== 'inlineFlex'

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
                    textAlign !== 'start' ? getClassNames(styles, 'textAlign', textAlign) : null,
                    // padding
                    getClassNames(paddingStyles, 'paddingTop', resolvedPaddingTop),
                    getClassNames(paddingStyles, 'paddingRight', resolvedPaddingRight),
                    getClassNames(paddingStyles, 'paddingBottom', resolvedPaddingBottom),
                    getClassNames(paddingStyles, 'paddingLeft', resolvedPaddingLeft),
                    // margin
                    getClassNames(marginStyles, 'marginTop', resolvedMarginTop),
                    getClassNames(marginStyles, 'marginRight', resolvedMarginRight),
                    getClassNames(marginStyles, 'marginBottom', resolvedMarginBottom),
                    getClassNames(marginStyles, 'marginLeft', resolvedMarginLeft),
                    // flex props
                    omitFlex ? null : getClassNames(styles, 'flexDirection', flexDirection),
                    omitFlex ? null : getClassNames(styles, 'flexWrap', flexWrap),
                    omitFlex ? null : getClassNames(styles, 'alignItems', alignItems),
                    omitFlex ? null : getClassNames(styles, 'justifyContent', justifyContent),
                    flexShrink != null
                        ? getClassNames(styles, 'flexShrink', String(flexShrink))
                        : null,
                    flexGrow != null ? getClassNames(styles, 'flexGrow', String(flexGrow)) : null,
                    // other props
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
    BoxPaddingProps,
    BoxMarginProps,
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
