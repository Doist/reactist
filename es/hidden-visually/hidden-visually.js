import { objectSpread2 as _objectSpread2 } from '../_virtual/_rollupPluginBabelHelpers.js'
import * as React from 'react'
import { polymorphicComponent } from '../utils/polymorphism.js'
import { Box } from '../box/box.js'
import modules_61c16c43 from './hidden-visually.module.css.js'

/**
 * Provides content to assistive technologies while hiding it from the screen.
 *
 * @see Hidden for fully hiding content, and only under certain conditions.
 */

const HiddenVisually = /*#__PURE__*/ polymorphicComponent(function HiddenVisually(props, ref) {
    return /*#__PURE__*/ React.createElement(
        Box,
        _objectSpread2(
            _objectSpread2({}, props),
            {},
            {
                ref: ref,
                position: 'absolute',
                overflow: 'hidden',
                className: modules_61c16c43.hiddenVisually,
            },
        ),
    )
})

export { HiddenVisually }
//# sourceMappingURL=hidden-visually.js.map
