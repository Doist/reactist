import {
    objectWithoutProperties as _objectWithoutProperties,
    objectSpread2 as _objectSpread2,
} from '../_virtual/_rollupPluginBabelHelpers.js'
import * as React from 'react'
import flattenChildren from 'react-keyed-flatten-children'
import { polymorphicComponent } from '../utils/polymorphism.js'
import { mapResponsiveProp } from '../utils/responsive-props.js'
import { Box } from '../box/box.js'
import { Divider } from '../divider/divider.js'

const _excluded = [
    'as',
    'space',
    'align',
    'dividers',
    'width',
    'children',
    'exceptionallySetClassName',
]
const Stack = /*#__PURE__*/ polymorphicComponent(function Stack(_ref, ref) {
    let {
            as,
            space,
            align,
            dividers = 'none',
            width = 'full',
            children,
            exceptionallySetClassName,
        } = _ref,
        props = _objectWithoutProperties(_ref, _excluded)

    const alignItems =
        align === undefined
            ? undefined
            : mapResponsiveProp(align, (align) =>
                  align === 'start' ? 'flexStart' : align === 'end' ? 'flexEnd' : 'center',
              )
    return /*#__PURE__*/ React.createElement(
        Box,
        _objectSpread2(
            _objectSpread2({}, props),
            {},
            {
                display: 'flex',
                flexDirection: 'column',
                width: width,
                alignItems: alignItems,
                gap: space,
                as: as,
                className: exceptionallySetClassName,
                ref: ref,
            },
        ),
        dividers !== 'none'
            ? React.Children.map(flattenChildren(children), (child, index) =>
                  index > 0
                      ? /*#__PURE__*/ React.createElement(
                            React.Fragment,
                            null,
                            /*#__PURE__*/ React.createElement(Divider, {
                                weight: dividers,
                            }),
                            child,
                        )
                      : child,
              )
            : children,
    )
})

export { Stack }
//# sourceMappingURL=stack.js.map
