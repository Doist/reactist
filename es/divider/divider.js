import {
    objectWithoutProperties as _objectWithoutProperties,
    objectSpread2 as _objectSpread2,
} from '../_virtual/_rollupPluginBabelHelpers.js'
import * as React from 'react'
import { getClassNames } from '../utils/responsive-props.js'
import { Box } from '../box/box.js'
import modules_c742c4d7 from './divider.module.css.js'

const _excluded = ['weight']

function Divider(_ref) {
    let { weight = 'tertiary' } = _ref,
        props = _objectWithoutProperties(_ref, _excluded)

    return /*#__PURE__*/ React.createElement(
        Box,
        _objectSpread2(
            {
                as: 'hr',
                className: getClassNames(modules_c742c4d7, 'weight', weight),
            },
            props,
        ),
    )
}

export { Divider }
//# sourceMappingURL=divider.js.map
