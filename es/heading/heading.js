import {
    objectWithoutProperties as _objectWithoutProperties,
    objectSpread2 as _objectSpread2,
} from '../_virtual/_rollupPluginBabelHelpers.js'
import * as React from 'react'
import { getClassNames } from '../utils/responsive-props.js'
import { Box } from '../box/box.js'
import modules_949d2ff4 from './heading.module.css.js'

const _excluded = [
    'level',
    'weight',
    'size',
    'tone',
    'children',
    'lineClamp',
    'align',
    'exceptionallySetClassName',
]
const Heading = /*#__PURE__*/ React.forwardRef(function Heading(_ref, ref) {
    let {
            level,
            weight = 'regular',
            size,
            tone = 'normal',
            children,
            lineClamp,
            align,
            exceptionallySetClassName,
        } = _ref,
        props = _objectWithoutProperties(_ref, _excluded)

    // In TypeScript v4.1, this would be properly recognized without needing the type assertion
    // https://devblogs.microsoft.com/typescript/announcing-typescript-4-1-beta/#template-literal-types
    const headingElementName = 'h' + level
    const lineClampMultipleLines =
        typeof lineClamp === 'string' ? parseInt(lineClamp, 10) > 1 : (lineClamp || 0) > 1
    return /*#__PURE__*/ React.createElement(
        Box,
        _objectSpread2(
            _objectSpread2({}, props),
            {},
            {
                className: [
                    exceptionallySetClassName,
                    modules_949d2ff4.heading,
                    weight !== 'regular' ? getClassNames(modules_949d2ff4, 'weight', weight) : null,
                    tone !== 'normal' ? getClassNames(modules_949d2ff4, 'tone', tone) : null,
                    getClassNames(modules_949d2ff4, 'size', size),
                    lineClampMultipleLines ? modules_949d2ff4.lineClampMultipleLines : null,
                    lineClamp
                        ? getClassNames(modules_949d2ff4, 'lineClamp', lineClamp.toString())
                        : null,
                ],
                textAlign: align,
                // Prevents emojis from being cut-off
                // See https://github.com/Doist/reactist/pull/528
                paddingRight: lineClamp ? 'xsmall' : undefined,
                as: headingElementName,
                ref: ref,
            },
        ),
        children,
    )
})

export { Heading }
//# sourceMappingURL=heading.js.map
