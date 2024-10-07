import {
    objectWithoutProperties as _objectWithoutProperties,
    objectSpread2 as _objectSpread2,
} from '../../_virtual/_rollupPluginBabelHelpers.js'
import * as React from 'react'
import classNames from 'classnames'
import { Tooltip } from '../../tooltip/tooltip.js'

const _excluded = [
    'type',
    'variant',
    'size',
    'loading',
    'disabled',
    'tooltip',
    'onClick',
    'children',
]
/**
 * @deprecated
 */

const Button = /*#__PURE__*/ React.forwardRef(function Button(_ref, ref) {
    let {
            type = 'button',
            variant,
            size = 'default',
            loading = false,
            disabled = false,
            tooltip,
            onClick,
            children,
        } = _ref,
        props = _objectWithoutProperties(_ref, _excluded)

    const className = classNames(
        'reactist_button',
        variant ? 'reactist_button--' + variant : null,
        size !== 'default' ? 'reactist_button--' + size : null,
        {
            'reactist_button--loading': loading,
        },
        props.className,
    )
    const button = /*#__PURE__*/ React.createElement(
        'button',
        _objectSpread2(
            _objectSpread2({}, props),
            {},
            {
                ref: ref,
                type: type,
                className: className,
                'aria-disabled': disabled || loading,
                onClick: disabled || loading ? undefined : onClick,
            },
        ),
        children,
    )
    return tooltip
        ? /*#__PURE__*/ React.createElement(
              Tooltip,
              {
                  content: tooltip,
              },
              button,
          )
        : button
})
Button.displayName = 'Button'
Button.defaultProps = {
    size: 'default',
    loading: false,
    disabled: false,
}

export { Button }
//# sourceMappingURL=deprecated-button.js.map
