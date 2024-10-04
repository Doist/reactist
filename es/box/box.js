import {
    objectWithoutProperties as _objectWithoutProperties,
    objectSpread2 as _objectSpread2,
} from '../_virtual/_rollupPluginBabelHelpers.js'
import * as React from 'react'
import classNames from 'classnames'
import { polymorphicComponent } from '../utils/polymorphism.js'
import { getClassNames } from '../utils/responsive-props.js'
import modules_54d944f2 from './box.module.css.js'
import modules_b537a8ee from './padding.module.css.js'
import modules_131405ac from './margin.module.css.js'
import modules_89b7671c from './width.module.css.js'
import modules_8b5c09cb from './gap.module.css.js'

const _excluded = [
    'as',
    'position',
    'display',
    'flexDirection',
    'flexWrap',
    'flexGrow',
    'flexShrink',
    'gap',
    'alignItems',
    'justifyContent',
    'alignSelf',
    'overflow',
    'width',
    'height',
    'background',
    'border',
    'borderRadius',
    'minWidth',
    'maxWidth',
    'textAlign',
    'padding',
    'paddingY',
    'paddingX',
    'paddingTop',
    'paddingRight',
    'paddingBottom',
    'paddingLeft',
    'margin',
    'marginY',
    'marginX',
    'marginTop',
    'marginRight',
    'marginBottom',
    'marginLeft',
    'className',
    'children',
]

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
}) {
    var _ref, _ref2, _ref3, _ref4, _ref5, _ref6, _ref7, _ref8

    const resolvedPaddingTop =
        (_ref = paddingTop != null ? paddingTop : paddingY) != null ? _ref : padding
    const resolvedPaddingRight =
        (_ref2 = paddingRight != null ? paddingRight : paddingX) != null ? _ref2 : padding
    const resolvedPaddingBottom =
        (_ref3 = paddingBottom != null ? paddingBottom : paddingY) != null ? _ref3 : padding
    const resolvedPaddingLeft =
        (_ref4 = paddingLeft != null ? paddingLeft : paddingX) != null ? _ref4 : padding
    const resolvedMarginTop =
        (_ref5 = marginTop != null ? marginTop : marginY) != null ? _ref5 : margin
    const resolvedMarginRight =
        (_ref6 = marginRight != null ? marginRight : marginX) != null ? _ref6 : margin
    const resolvedMarginBottom =
        (_ref7 = marginBottom != null ? marginBottom : marginY) != null ? _ref7 : margin
    const resolvedMarginLeft =
        (_ref8 = marginLeft != null ? marginLeft : marginX) != null ? _ref8 : margin
    const omitFlex =
        !display || (typeof display === 'string' && display !== 'flex' && display !== 'inlineFlex')
    return classNames(
        className,
        modules_54d944f2.box,
        display ? getClassNames(modules_54d944f2, 'display', display) : null,
        position !== 'static' ? getClassNames(modules_54d944f2, 'position', position) : null,
        minWidth != null ? getClassNames(modules_89b7671c, 'minWidth', String(minWidth)) : null,
        getClassNames(modules_89b7671c, 'maxWidth', maxWidth),
        getClassNames(modules_54d944f2, 'textAlign', textAlign), // padding
        getClassNames(modules_b537a8ee, 'paddingTop', resolvedPaddingTop),
        getClassNames(modules_b537a8ee, 'paddingRight', resolvedPaddingRight),
        getClassNames(modules_b537a8ee, 'paddingBottom', resolvedPaddingBottom),
        getClassNames(modules_b537a8ee, 'paddingLeft', resolvedPaddingLeft), // margin
        getClassNames(modules_131405ac, 'marginTop', resolvedMarginTop),
        getClassNames(modules_131405ac, 'marginRight', resolvedMarginRight),
        getClassNames(modules_131405ac, 'marginBottom', resolvedMarginBottom),
        getClassNames(modules_131405ac, 'marginLeft', resolvedMarginLeft), // flex props
        omitFlex ? null : getClassNames(modules_54d944f2, 'flexDirection', flexDirection),
        omitFlex ? null : getClassNames(modules_54d944f2, 'flexWrap', flexWrap),
        omitFlex ? null : getClassNames(modules_54d944f2, 'alignItems', alignItems),
        omitFlex ? null : getClassNames(modules_54d944f2, 'justifyContent', justifyContent),
        alignSelf != null ? getClassNames(modules_54d944f2, 'alignSelf', alignSelf) : null,
        flexShrink != null
            ? getClassNames(modules_54d944f2, 'flexShrink', String(flexShrink))
            : null,
        flexGrow != null ? getClassNames(modules_54d944f2, 'flexGrow', String(flexGrow)) : null,
        gap ? getClassNames(modules_8b5c09cb, 'gap', gap) : null, // other props
        getClassNames(modules_54d944f2, 'overflow', overflow),
        width != null ? getClassNames(modules_89b7671c, 'width', String(width)) : null,
        getClassNames(modules_54d944f2, 'height', height),
        getClassNames(modules_54d944f2, 'bg', background),
        borderRadius !== 'none'
            ? getClassNames(modules_54d944f2, 'borderRadius', borderRadius)
            : null,
        border !== 'none' ? getClassNames(modules_54d944f2, 'border', border) : null,
    )
}

const Box = /*#__PURE__*/ polymorphicComponent(function Box(_ref9, ref) {
    let {
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
        } = _ref9,
        props = _objectWithoutProperties(_ref9, _excluded)

    return /*#__PURE__*/ React.createElement(
        component,
        _objectSpread2(
            _objectSpread2({}, props),
            {},
            {
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
        ),
        children,
    )
})

export { Box, getBoxClassNames }
//# sourceMappingURL=box.js.map
