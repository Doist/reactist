import {
    objectWithoutProperties as _objectWithoutProperties,
    objectSpread2 as _objectSpread2,
} from '../_virtual/_rollupPluginBabelHelpers.js'
import * as React from 'react'
import classNames from 'classnames'
import { Role } from '@ariakit/react'
import { getBoxClassNames, Box } from '../box/box.js'
import { Spinner } from '../spinner/spinner.js'
import { Tooltip } from '../tooltip/tooltip.js'
import modules_5357ebb8 from './button.module.css.js'

const _excluded = [
        'variant',
        'tone',
        'size',
        'shape',
        'type',
        'disabled',
        'loading',
        'tooltip',
        'render',
        'onClick',
        'exceptionallySetClassName',
        'children',
        'startIcon',
        'endIcon',
        'width',
        'align',
    ],
    _excluded2 = [
        'variant',
        'tone',
        'size',
        'shape',
        'type',
        'disabled',
        'loading',
        'tooltip',
        'render',
        'onClick',
        'exceptionallySetClassName',
        'children',
        'icon',
    ]

function preventDefault(event) {
    event.preventDefault()
}
/**
 * A button element that displays a text label and optionally a start or end icon. It follows the
 * [WAI-ARIA Button Pattern](https://www.w3.org/TR/wai-aria-practices/#button).
 */

const Button = /*#__PURE__*/ React.forwardRef(function Button(_ref, ref) {
    let {
            variant,
            tone = 'normal',
            size = 'normal',
            shape = 'normal',
            type = 'button',
            disabled = false,
            loading = false,
            tooltip,
            render,
            onClick,
            exceptionallySetClassName,
            children,
            startIcon,
            endIcon,
            width = 'auto',
            align = 'center',
        } = _ref,
        props = _objectWithoutProperties(_ref, _excluded)

    const isDisabled = loading || disabled
    const buttonElement = /*#__PURE__*/ React.createElement(
        Role.button,
        _objectSpread2(
            _objectSpread2({}, props),
            {},
            {
                render: render,
                type: render != null ? undefined : type,
                ref: ref,
                'aria-disabled': isDisabled,
                onClick: isDisabled ? preventDefault : onClick,
                className: classNames([
                    getBoxClassNames({
                        width,
                    }),
                    exceptionallySetClassName,
                    modules_5357ebb8.baseButton,
                    modules_5357ebb8['variant-' + variant],
                    modules_5357ebb8['tone-' + tone],
                    modules_5357ebb8['size-' + size],
                    shape === 'rounded' ? modules_5357ebb8['shape-rounded'] : null,
                    disabled ? modules_5357ebb8.disabled : null,
                ]),
            },
        ),
        /*#__PURE__*/ React.createElement(
            React.Fragment,
            null,
            startIcon
                ? /*#__PURE__*/ React.createElement(
                      Box,
                      {
                          display: 'flex',
                          className: modules_5357ebb8.startIcon,
                          'aria-hidden': true,
                      },
                      loading && !endIcon
                          ? /*#__PURE__*/ React.createElement(Spinner, null)
                          : startIcon,
                  )
                : null,
            children
                ? /*#__PURE__*/ React.createElement(
                      Box,
                      {
                          as: 'span',
                          className: modules_5357ebb8.label,
                          overflow: 'hidden',
                          width: width === 'full' ? 'full' : undefined,
                          textAlign: width === 'auto' ? 'center' : align,
                      },
                      children,
                  )
                : null,
            endIcon || (loading && !startIcon)
                ? /*#__PURE__*/ React.createElement(
                      Box,
                      {
                          display: 'flex',
                          className: modules_5357ebb8.endIcon,
                          'aria-hidden': true,
                      },
                      loading ? /*#__PURE__*/ React.createElement(Spinner, null) : endIcon,
                  )
                : null,
        ),
    )
    return tooltip
        ? /*#__PURE__*/ React.createElement(
              Tooltip,
              {
                  content: tooltip,
              },
              buttonElement,
          )
        : buttonElement
})
/**
 * A button element that displays an icon only, visually, though it is semantically labelled. It
 * also makes sure to always show a tooltip with its label. It follows the
 * [WAI-ARIA Button Pattern](https://www.w3.org/TR/wai-aria-practices/#button).
 */

const IconButton = /*#__PURE__*/ React.forwardRef(function IconButton(_ref2, ref) {
    let {
            variant,
            tone = 'normal',
            size = 'normal',
            shape = 'normal',
            type = 'button',
            disabled = false,
            loading = false,
            tooltip,
            render,
            onClick,
            exceptionallySetClassName,
            children,
            icon,
        } = _ref2,
        props = _objectWithoutProperties(_ref2, _excluded2)

    const isDisabled = loading || disabled
    const buttonElement = /*#__PURE__*/ React.createElement(
        Role.button,
        _objectSpread2(
            _objectSpread2({}, props),
            {},
            {
                render: render,
                type: render != null ? undefined : type,
                ref: ref,
                'aria-disabled': isDisabled,
                onClick: isDisabled ? preventDefault : onClick,
                className: classNames([
                    exceptionallySetClassName,
                    modules_5357ebb8.baseButton,
                    modules_5357ebb8['variant-' + variant],
                    modules_5357ebb8['tone-' + tone],
                    modules_5357ebb8['size-' + size],
                    shape === 'rounded' ? modules_5357ebb8['shape-rounded'] : null,
                    modules_5357ebb8.iconButton,
                    disabled ? modules_5357ebb8.disabled : null,
                ]),
            },
        ),
        (loading && /*#__PURE__*/ React.createElement(Spinner, null)) || icon,
    )
    const tooltipContent = tooltip === undefined ? props['aria-label'] : tooltip
    return tooltipContent
        ? /*#__PURE__*/ React.createElement(
              Tooltip,
              {
                  content: tooltipContent,
              },
              buttonElement,
          )
        : buttonElement
})

export { Button, IconButton }
//# sourceMappingURL=button.js.map
