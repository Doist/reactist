import {
    objectWithoutProperties as _objectWithoutProperties,
    objectSpread2 as _objectSpread2,
} from '../_virtual/_rollupPluginBabelHelpers.js'
import * as React from 'react'
import { polymorphicComponent } from '../utils/polymorphism.js'
import { getClassNames, mapResponsiveProp } from '../utils/responsive-props.js'
import { Box } from '../box/box.js'
import modules_67f2d07a from './columns.module.css.js'

const _excluded = ['width', 'children', 'exceptionallySetClassName'],
    _excluded2 = [
        'space',
        'align',
        'alignY',
        'collapseBelow',
        'children',
        'exceptionallySetClassName',
    ]
const Column = /*#__PURE__*/ polymorphicComponent(function Column(_ref, ref) {
    let { width = 'auto', children, exceptionallySetClassName } = _ref,
        props = _objectWithoutProperties(_ref, _excluded)

    return /*#__PURE__*/ React.createElement(
        Box,
        _objectSpread2(
            _objectSpread2({}, props),
            {},
            {
                className: [
                    exceptionallySetClassName,
                    getClassNames(modules_67f2d07a, 'columnWidth', width.replace('/', '-')),
                ],
                minWidth: 0,
                height: 'full',
                flexShrink: width === 'content' ? 0 : undefined,
                flexGrow: width === 'auto' ? 1 : 0,
                ref: ref,
            },
        ),
        children,
    )
})
const Columns = /*#__PURE__*/ polymorphicComponent(function Columns(_ref2, ref) {
    let {
            space,
            align = 'left',
            alignY = 'top',
            collapseBelow,
            children,
            exceptionallySetClassName,
        } = _ref2,
        props = _objectWithoutProperties(_ref2, _excluded2)

    return /*#__PURE__*/ React.createElement(
        Box,
        _objectSpread2(
            _objectSpread2({}, props),
            {},
            {
                className: [
                    exceptionallySetClassName,
                    modules_67f2d07a.container,
                    getClassNames(modules_67f2d07a, 'container', space),
                ],
                display: 'flex',
                gap: space,
                flexDirection:
                    collapseBelow === 'desktop'
                        ? {
                              mobile: 'column',
                              tablet: 'column',
                              desktop: 'row',
                          }
                        : collapseBelow === 'tablet'
                        ? {
                              mobile: 'column',
                              tablet: 'row',
                          }
                        : 'row',
                alignItems: mapResponsiveProp(alignY, (alignY) =>
                    alignY === 'top' ? 'flexStart' : alignY === 'bottom' ? 'flexEnd' : alignY,
                ),
                justifyContent: mapResponsiveProp(align, (align) =>
                    align === 'left' ? 'flexStart' : align === 'right' ? 'flexEnd' : align,
                ),
                ref: ref,
            },
        ),
        children,
    )
})

export { Column, Columns }
//# sourceMappingURL=columns.js.map
