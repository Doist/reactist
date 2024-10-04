import {
    objectWithoutProperties as _objectWithoutProperties,
    objectSpread2 as _objectSpread2,
} from '../_virtual/_rollupPluginBabelHelpers.js'
import React__default from 'react'
import { CloseIcon } from '../icons/close-icon.js'
import { Box } from '../box/box.js'
import { Button, IconButton } from '../button/button.js'
import { Stack } from '../stack/stack.js'
import { Text } from '../text/text.js'
import modules_d11e18f0 from './toast.module.css.js'

const _excluded = ['message', 'description', 'icon', 'action', 'onDismiss', 'dismissLabel']
/**
 * A toast that shows a message, and an optional action associated with it.
 *
 * This component is generally not meant to be used directly. Most of the time you'll want to use
 * toasts generated via `useToasts` instead. However, this component is available in case you need
 * to take control of rendering a toast under different circumstances than that of notification-like
 * floating toasts.
 *
 * This component makes no assumptions outwardly about how it is positioned on the screen. That is,
 * it will not be shown floating or fixed to the viewport edges, as toasts normally show up. It only
 * provides the toast look and feel, but you are responsible for positioning it as you want.
 *
 * @see useToasts
 */

const StaticToast = /*#__PURE__*/ React__default.forwardRef(function Toast(_ref, ref) {
    let { message, description, icon, action, onDismiss, dismissLabel = 'Close' } = _ref,
        props = _objectWithoutProperties(_ref, _excluded)

    return /*#__PURE__*/ React__default.createElement(
        Box,
        _objectSpread2(
            {
                ref: ref,
                role: 'alert',
                'aria-live': 'polite',
                borderRadius: 'full',
                width: 'fitContent',
                background: 'toast',
                display: 'flex',
                padding: 'large',
                alignItems: 'center',
                className: modules_d11e18f0.toastContainer,
            },
            props,
        ),
        icon ? /*#__PURE__*/ React__default.createElement(ToastContentSlot, null, icon) : null,
        /*#__PURE__*/ React__default.createElement(
            Box,
            {
                flexGrow: 1,
                maxWidth: 'small',
            },
            description
                ? /*#__PURE__*/ React__default.createElement(
                      Stack,
                      {
                          space: 'small',
                      },
                      /*#__PURE__*/ React__default.createElement(
                          Text,
                          {
                              weight: 'bold',
                          },
                          message,
                          ' ',
                      ),
                      /*#__PURE__*/ React__default.createElement(Text, null, description),
                  )
                : /*#__PURE__*/ React__default.createElement(Text, null, message),
        ),
        action
            ? /*#__PURE__*/ React__default.createElement(
                  ToastContentSlot,
                  null,
                  isActionObject(action)
                      ? /*#__PURE__*/ React__default.createElement(
                            Button,
                            {
                                variant: 'tertiary',
                                size: 'small',
                                onClick: action.onClick,
                            },
                            action.label,
                        )
                      : action,
              )
            : null,
        onDismiss
            ? /*#__PURE__*/ React__default.createElement(
                  ToastContentSlot,
                  null,
                  /*#__PURE__*/ React__default.createElement(IconButton, {
                      variant: 'quaternary',
                      size: 'small',
                      onClick: onDismiss,
                      'aria-label': dismissLabel,
                      icon: /*#__PURE__*/ React__default.createElement(CloseIcon, null),
                  }),
              )
            : null,
    )
})

function isActionObject(action) {
    return (
        action != null &&
        typeof action === 'object' &&
        'label' in action &&
        'onClick' in action &&
        typeof action.label === 'string' &&
        typeof action.onClick === 'function'
    )
}

function ToastContentSlot({ children }) {
    return /*#__PURE__*/ React__default.createElement(
        Box,
        {
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            marginX: '-xsmall',
            marginY: '-medium',
            className: modules_d11e18f0.slot,
        },
        children,
    )
}

export { StaticToast, isActionObject }
//# sourceMappingURL=static-toast.js.map
