import {
    objectWithoutProperties as _objectWithoutProperties,
    objectSpread2 as _objectSpread2,
} from '../_virtual/_rollupPluginBabelHelpers.js'
import * as React from 'react'
import { Box } from '../box/box.js'
import { polymorphicComponent } from '../utils/polymorphism.js'
import modules_3d05deee from './text-link.module.css.js'

const _excluded = ['as', 'openInNewTab', 'exceptionallySetClassName']
const TextLink = /*#__PURE__*/ polymorphicComponent(function TextLink(_ref, ref) {
    let { as = 'a', openInNewTab = false, exceptionallySetClassName } = _ref,
        props = _objectWithoutProperties(_ref, _excluded)

    return /*#__PURE__*/ React.createElement(
        Box,
        _objectSpread2(
            _objectSpread2({}, props),
            {},
            {
                as: as,
                display: 'inline',
                className: [exceptionallySetClassName, modules_3d05deee.container],
                ref: ref,
                target: openInNewTab ? '_blank' : undefined,
                rel: openInNewTab ? 'noopener noreferrer' : undefined,
            },
        ),
    )
})

export { TextLink }
//# sourceMappingURL=text-link.js.map
