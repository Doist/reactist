import {
    objectWithoutProperties as _objectWithoutProperties,
    objectSpread2 as _objectSpread2,
} from '../_virtual/_rollupPluginBabelHelpers.js'
import * as React from 'react'
import { polymorphicComponent } from '../utils/polymorphism.js'
import { mapResponsiveProp } from '../utils/responsive-props.js'
import { Box } from '../box/box.js'

const _excluded = ['as', 'space', 'align', 'alignY', 'children', 'exceptionallySetClassName']
const Inline = /*#__PURE__*/ polymorphicComponent(function Inline(_ref, ref) {
    let {
            as,
            space,
            align = 'left',
            alignY = 'center',
            children,
            exceptionallySetClassName,
        } = _ref,
        props = _objectWithoutProperties(_ref, _excluded)

    return /*#__PURE__*/ React.createElement(
        Box,
        _objectSpread2(
            _objectSpread2({}, props),
            {},
            {
                as: as,
                display: 'flex',
                flexWrap: 'wrap',
                gap: space,
                className: exceptionallySetClassName,
                ref: ref,
                alignItems: mapResponsiveProp(alignY, (alignY) =>
                    alignY === 'top' ? 'flexStart' : alignY === 'bottom' ? 'flexEnd' : 'center',
                ),
                justifyContent: mapResponsiveProp(align, (align) =>
                    align === 'left' ? 'flexStart' : align === 'right' ? 'flexEnd' : 'center',
                ),
            },
        ),
        children,
    )
})

export { Inline }
//# sourceMappingURL=inline.js.map
