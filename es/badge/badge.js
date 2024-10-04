import {
    objectWithoutProperties as _objectWithoutProperties,
    objectSpread2 as _objectSpread2,
} from '../_virtual/_rollupPluginBabelHelpers.js'
import * as React from 'react'
import { Box } from '../box/box.js'
import modules_33c7c985 from './badge.module.css.js'

const _excluded = ['tone', 'label']

function Badge(_ref) {
    let { tone, label } = _ref,
        props = _objectWithoutProperties(_ref, _excluded)

    return /*#__PURE__*/ React.createElement(
        Box,
        _objectSpread2(
            _objectSpread2({}, props),
            {},
            {
                as: 'span', // It enables putting the badge inside a button (https://stackoverflow.com/a/12982334)
                display: 'inline',
                className: [modules_33c7c985.badge, modules_33c7c985['badge-' + tone]],
            },
        ),
        label,
    )
}

export { Badge }
//# sourceMappingURL=badge.js.map
