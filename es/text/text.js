import {
    objectWithoutProperties as _objectWithoutProperties,
    objectSpread2 as _objectSpread2,
} from '../_virtual/_rollupPluginBabelHelpers.js'
import * as React from 'react'
import { getClassNames } from '../utils/responsive-props.js'
import { Box } from '../box/box.js'
import { polymorphicComponent } from '../utils/polymorphism.js'
import modules_a9637dd3 from './text.module.css.js'

const _excluded = [
    'as',
    'size',
    'weight',
    'tone',
    'align',
    'children',
    'lineClamp',
    'exceptionallySetClassName',
]
const Text = /*#__PURE__*/ polymorphicComponent(function Text(_ref, ref) {
    let {
            as,
            size = 'body',
            weight = 'regular',
            tone = 'normal',
            align,
            children,
            lineClamp,
            exceptionallySetClassName,
        } = _ref,
        props = _objectWithoutProperties(_ref, _excluded)

    const lineClampMultipleLines =
        typeof lineClamp === 'string'
            ? Number(lineClamp) > 1
            : (lineClamp != null ? lineClamp : 1) > 1
    return /*#__PURE__*/ React.createElement(
        Box,
        _objectSpread2(
            _objectSpread2({}, props),
            {},
            {
                as: as,
                className: [
                    exceptionallySetClassName,
                    modules_a9637dd3.text,
                    size !== 'body' ? getClassNames(modules_a9637dd3, 'size', size) : null,
                    weight !== 'regular' ? getClassNames(modules_a9637dd3, 'weight', weight) : null,
                    tone !== 'normal' ? getClassNames(modules_a9637dd3, 'tone', tone) : null,
                    lineClampMultipleLines ? modules_a9637dd3.lineClampMultipleLines : null,
                    lineClamp
                        ? getClassNames(modules_a9637dd3, 'lineClamp', lineClamp.toString())
                        : null,
                ],
                textAlign: align,
                // Prevents emojis from being cut-off
                // See https://github.com/Doist/reactist/pull/528
                paddingRight: lineClamp ? 'xsmall' : undefined,
                ref: ref,
            },
        ),
        children,
    )
})

export { Text }
//# sourceMappingURL=text.js.map
