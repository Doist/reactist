import * as React from 'react'
import classNames from 'classnames'
import { polymorphicComponent } from '../utils/polymorphism'
import { getClassNames } from '../utils/responsive-props'

import type { ResponsiveProp } from '../utils/responsive-props'
import type {
    DividerWeight,
    Space,
    SpaceWithNegatives,
    WithEnhancedClassName,
} from '../utils/common-types'

import styles from './box.module.css'
import paddingStyles from './padding.module.css'
import marginStyles from './margin.module.css'
import widthStyles from './width.module.css'
import gapStyles from './gap.module.css'

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

type BoxDisplay = 'block' | 'flex' | 'inline' | 'inlineBlock' | 'inlineFlex' | 'none'
type BoxFlexDirection = 'column' | 'row'
type BoxFlexWrap = 'nowrap' | 'wrap'
type BoxAlignItems = 'center' | 'flexEnd' | 'flexStart' | 'baseline'
type BoxJustifyContent =
    | 'center'
    | 'flexEnd'
    | 'flexStart'
    | 'spaceAround'
    | 'spaceBetween'
    | 'spaceEvenly'
type BoxAlignSelf = 'flexStart' | 'flexEnd' | 'center' | 'baseline' | 'stretch'
type BoxOverflow = 'hidden' | 'auto' | 'visible' | 'scroll'

type BoxMaxMinWidth = 'xsmall' | 'small' | 'medium' | 'large' | 'xlarge'
type BoxMinWidth = 0 | BoxMaxMinWidth
type BoxMaxWidth = BoxMaxMinWidth | 'full'
type BoxWidth = 0 | BoxMaxMinWidth | 'full' | 'auto' | 'maxContent' | 'minContent' | 'fitContent'
type BoxBackground = 'default' | 'aside' | 'highlight' | 'selected' | 'toast'
type BoxBorderRadius = 'standard' | 'none' | 'full'

interface BorderProps {
    borderRadius?: BoxBorderRadius
    border?: DividerWeight
}

interface ReusableBoxProps extends BorderProps, BoxPaddingProps {
    minWidth?: BoxMinWidth
    maxWidth?: BoxMaxWidth
    width?: BoxWidth
    background?: BoxBackground
    flexGrow?: 0 | 1
    flexShrink?: 0
}

type BoxPosition = 'absolute' | 'fixed' | 'relative' | 'static' | 'sticky'
type BoxTextAlign = 'start' | 'center' | 'end' | 'justify'

interface BoxProps extends WithEnhancedClassName, ReusableBoxProps, BoxMarginProps {
    position?: ResponsiveProp<BoxPosition>
    display?: ResponsiveProp<BoxDisplay>
    flexDirection?: ResponsiveProp<BoxFlexDirection>
    flexWrap?: BoxFlexWrap
    gap?: ResponsiveProp<Space | 'none'>
    alignItems?: ResponsiveProp<BoxAlignItems>
    alignSelf?: ResponsiveProp<BoxAlignSelf>
    justifyContent?: ResponsiveProp<BoxJustifyContent>
    overflow?: BoxOverflow
    height?: 'full'
    textAlign?: ResponsiveProp<BoxTextAlign>
}

function getBoxClassNames({
    position = 'static',
    display,
    flexDirection = 'row',
    flexWrap,
    flexGrow,
    flexShrink,
    gap,
    alignItems,
    justifyContent,
    alignSelf,
    overflow,
    width,
    height,
    background,
    border,
    borderRadius,
    minWidth,
    maxWidth,
    textAlign,
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
}: BoxProps) {
    const resolvedPaddingTop = paddingTop ?? paddingY ?? padding
    const resolvedPaddingRight = paddingRight ?? paddingX ?? padding
    const resolvedPaddingBottom = paddingBottom ?? paddingY ?? padding
    const resolvedPaddingLeft = paddingLeft ?? paddingX ?? padding

    const resolvedMarginTop = marginTop ?? marginY ?? margin
    const resolvedMarginRight = marginRight ?? marginX ?? margin
    const resolvedMarginBottom = marginBottom ?? marginY ?? margin
    const resolvedMarginLeft = marginLeft ?? marginX ?? margin

    const omitFlex =
        !display || (typeof display === 'string' && display !== 'flex' && display !== 'inlineFlex')

    return classNames(
        className,
        styles.box,
        display ? getClassNames(styles, 'display', display) : null,
        position !== 'static' ? getClassNames(styles, 'position', position) : null,
        minWidth != null ? getClassNames(widthStyles, 'minWidth', String(minWidth)) : null,
        getClassNames(widthStyles, 'maxWidth', maxWidth),
        getClassNames(styles, 'textAlign', textAlign),
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
        alignSelf != null ? getClassNames(styles, 'alignSelf', alignSelf) : null,
        flexShrink != null ? getClassNames(styles, 'flexShrink', String(flexShrink)) : null,
        flexGrow != null ? getClassNames(styles, 'flexGrow', String(flexGrow)) : null,
        gap ? getClassNames(gapStyles, 'gap', gap) : null,
        // other props
        getClassNames(styles, 'overflow', overflow),
        width != null ? getClassNames(widthStyles, 'width', String(width)) : null,
        getClassNames(styles, 'height', height),
        getClassNames(styles, 'bg', background),
        borderRadius !== 'none' ? getClassNames(styles, 'borderRadius', borderRadius) : null,
        border !== 'none' ? getClassNames(styles, 'border', border) : null,
    )
}

const Box = polymorphicComponent<'div', BoxProps, 'keepClassName'>(function Box(
    {
        as: component = 'div',
        position = 'static',
        display,
        flexDirection = 'row',
        flexWrap,
        flexGrow,
        flexShrink,
        gap,
        alignItems,
        justifyContent,
        alignSelf,
        overflow,
        width,
        height,
        background,
        border,
        borderRadius,
        minWidth,
        maxWidth,
        textAlign,
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
    return React.createElement(
        component,
        {
            ...props,
            className: getBoxClassNames({
                position,
                display,
                flexDirection,
                flexWrap,
                flexGrow,
                flexShrink,
                gap,
                alignItems,
                justifyContent,
                alignSelf,
                overflow,
                width,
                height,
                background,
                border,
                borderRadius,
                minWidth,
                maxWidth,
                textAlign,
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
            }),
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
    BoxMinWidth,
    BoxMaxWidth,
    BoxDisplay,
    BoxPosition,
    BoxFlexDirection,
    BoxFlexWrap,
    BoxAlignItems,
    BoxJustifyContent,
    BoxOverflow,
    BoxTextAlign,
    BoxBackground,
    BoxBorderRadius,
}

export { Box, getBoxClassNames }
