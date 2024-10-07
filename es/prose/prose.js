import {
    objectWithoutProperties as _objectWithoutProperties,
    objectSpread2 as _objectSpread2,
} from '../_virtual/_rollupPluginBabelHelpers.js'
import * as React from 'react'
import { Box } from '../box/box.js'
import modules_8ebe6db0 from './prose.module.css.js'

const _excluded = ['darkModeTypography', 'exceptionallySetClassName']
/**
 * Used to style HTML you don’t control, like HTML content generated from Markdown.
 */

function Prose(_ref) {
    let { darkModeTypography, exceptionallySetClassName } = _ref,
        props = _objectWithoutProperties(_ref, _excluded)

    return /*#__PURE__*/ React.createElement(
        Box,
        _objectSpread2(
            _objectSpread2({}, props),
            {},
            {
                className: [
                    modules_8ebe6db0.prose,
                    darkModeTypography ? modules_8ebe6db0.darkModeTypography : null,
                    exceptionallySetClassName,
                ],
            },
        ),
    )
}

export { Prose }
//# sourceMappingURL=prose.js.map
