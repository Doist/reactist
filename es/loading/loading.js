import {
    objectWithoutProperties as _objectWithoutProperties,
    objectSpread2 as _objectSpread2,
} from '../_virtual/_rollupPluginBabelHelpers.js'
import * as React from 'react'
import { Box } from '../box/box.js'
import { Spinner } from '../spinner/spinner.js'

const _excluded = ['size', 'exceptionallySetClassName']
const sizeMapping = {
    xsmall: 16,
    small: 24,
    medium: 36,
    large: 48,
}

function Loading(_ref) {
    var _sizeMapping$size

    let { size = 'small', exceptionallySetClassName } = _ref,
        props = _objectWithoutProperties(_ref, _excluded)

    const numericSize =
        (_sizeMapping$size = sizeMapping[size]) != null ? _sizeMapping$size : sizeMapping.small
    const ariaLabel = props['aria-label']
        ? props['aria-label']
        : !props['aria-labelledby']
        ? 'Loading…'
        : undefined
    return /*#__PURE__*/ React.createElement(
        Box,
        _objectSpread2(
            _objectSpread2({}, props),
            {},
            {
                'aria-label': ariaLabel,
                className: exceptionallySetClassName,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                role: 'progressbar',
            },
        ),
        /*#__PURE__*/ React.createElement(Spinner, {
            size: numericSize,
            'aria-hidden': true,
        }),
    )
}

export { Loading }
//# sourceMappingURL=loading.js.map
