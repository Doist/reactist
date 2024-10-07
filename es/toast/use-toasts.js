import {
    objectSpread2 as _objectSpread2,
    objectWithoutProperties as _objectWithoutProperties,
} from '../_virtual/_rollupPluginBabelHelpers.js'
import React__default from 'react'
import { Portal } from '@ariakit/react'
import { generateElementId } from '../utils/common-helpers.js'
import { Box } from '../box/box.js'
import { Stack } from '../stack/stack.js'
import { isActionObject, StaticToast } from './static-toast.js'
import modules_d11e18f0 from './toast.module.css.js'
import { useToastsAnimation } from './toast-animation.js'

const _excluded = ['toastId']
/** @private */

const InternalToast = /*#__PURE__*/ React__default.forwardRef(function InternalToast(
    {
        message,
        description,
        icon,
        action,
        autoDismissDelay,
        dismissLabel,
        showDismissButton = true,
        toastId,
        onDismiss,
        onRemoveToast,
    },
    ref,
) {
    const [timeoutRunning, setTimeoutRunning] = React__default.useState(Boolean(autoDismissDelay))
    const timeoutRef = React__default.useRef()
    const startTimeout = React__default.useCallback(function startTimeout() {
        setTimeoutRunning(true)
    }, [])
    const stopTimeout = React__default.useCallback(function stopTimeout() {
        setTimeoutRunning(false)
        clearTimeout(timeoutRef.current)
        timeoutRef.current = undefined
    }, [])
    const removeToast = React__default.useCallback(
        function removeToast() {
            onRemoveToast(toastId)
            onDismiss == null ? void 0 : onDismiss()
        },
        [onDismiss, onRemoveToast, toastId],
    )
    React__default.useEffect(
        function setupAutoDismiss() {
            if (!timeoutRunning || !autoDismissDelay) return
            timeoutRef.current = window.setTimeout(removeToast, autoDismissDelay * 1000)
            return stopTimeout
        },
        [autoDismissDelay, removeToast, stopTimeout, timeoutRunning],
    )
    /**
     * If the action is toast action object and not a custom element,
     * the `onClick` property is wrapped in another handler responsible
     * for removing the toast when the action is triggered.
     */

    const actionWithCustomActionHandler = React__default.useMemo(() => {
        if (!isActionObject(action)) {
            return action
        }

        return _objectSpread2(
            _objectSpread2({}, action),
            {},
            {
                onClick: function handleActionClick() {
                    if (!action) {
                        return
                    }

                    action.onClick()
                    removeToast()
                },
            },
        )
    }, [action, removeToast])
    return /*#__PURE__*/ React__default.createElement(StaticToast, {
        ref: ref,
        message: message,
        description: description,
        icon: icon,
        action: actionWithCustomActionHandler,
        onDismiss: showDismissButton ? removeToast : undefined,
        dismissLabel: dismissLabel,
        // @ts-expect-error
        onMouseEnter: stopTimeout,
        onMouseLeave: startTimeout,
    })
})
const ToastsContext = /*#__PURE__*/ React__default.createContext(() => () => undefined)
/**
 * Provides the state management and rendering of the toasts currently active.
 *
 * You need to render this near the top of your app components tree, in order to `useToasts`.
 *
 * @see useToasts
 */

function ToastsProvider({
    children,
    padding = 'large',
    defaultAutoDismissDelay = 10,
    /* seconds */
    defaultDismissLabel = 'Close',
    containerClassName,
}) {
    const [toasts, setToasts] = React__default.useState([])
    const { mappedRef, animateRemove } = useToastsAnimation()
    const removeToast = React__default.useCallback(
        function onRemoveToast(toastId) {
            animateRemove(toastId, () => {
                setToasts((list) => {
                    const index = list.findIndex((n) => n.toastId === toastId)
                    if (index < 0) return list
                    const copy = [...list]
                    copy.splice(index, 1)
                    return copy
                })
            })
        },
        [animateRemove],
    )
    const showToast = React__default.useCallback(
        function showToast(props) {
            const toastId = generateElementId('toast')

            const newToast = _objectSpread2(
                _objectSpread2(
                    {
                        autoDismissDelay: defaultAutoDismissDelay,
                        dismissLabel: defaultDismissLabel,
                    },
                    props,
                ),
                {},
                {
                    toastId,
                },
            )

            setToasts((list) => [...list, newToast])
            return () => removeToast(toastId)
        },
        [defaultAutoDismissDelay, defaultDismissLabel, removeToast],
    )
    return /*#__PURE__*/ React__default.createElement(
        ToastsContext.Provider,
        {
            value: showToast,
        },
        children,
        /*#__PURE__*/ React__default.createElement(
            Portal,
            null,
            toasts.length === 0
                ? null
                : /*#__PURE__*/ React__default.createElement(
                      Box,
                      {
                          className: [modules_d11e18f0.stackedToastsView, containerClassName],
                          position: 'fixed',
                          width: 'full',
                          paddingX: padding,
                          paddingBottom: padding,
                          'data-testid': 'toasts-container',
                      },
                      /*#__PURE__*/ React__default.createElement(
                          Stack,
                          {
                              space: 'medium',
                          },
                          toasts.map((_ref) => {
                              let { toastId } = _ref,
                                  props = _objectWithoutProperties(_ref, _excluded)

                              return /*#__PURE__*/ React__default.createElement(
                                  InternalToast,
                                  _objectSpread2(
                                      {
                                          key: toastId,
                                          ref: mappedRef(toastId),
                                          toastId: toastId,
                                          onRemoveToast: removeToast,
                                      },
                                      props,
                                  ),
                              )
                          }),
                      ),
                  ),
        ),
    )
}
/**
 * Provides a function `showToast` that shows a new toast every time you call it.
 *
 * ```jsx
 * const showToast = useToasts()
 *
 * <button onClick={() => showToast({ message: 'Hello' })}>
 *   Say hello
 * </button>
 * ```
 *
 * All toasts fired via this function are rendered in a global fixed location, and stacked one on
 * top of the other.
 *
 * When called, `showToast` returns a function that dismisses the toast when called.
 *
 * @see ToastsProvider
 */

function useToasts() {
    return React__default.useContext(ToastsContext)
}
/**
 * Adds a toast to be rendered, stacked alongside any other currently active toasts.
 *
 * For most situations, you should prefer to use the `showToast` function obtained from `useToasts`.
 * This component is provided for convenience to render toasts in the markup, but it has some
 * peculiarities, which are discussed below.
 *
 * Internally, this calls `showToast`. It is provided for two reasons:
 *
 * 1. Convenience, when you want to fire a toast in markup/jsx code. Keep in mind, though, that
 *    toasts rendered in this way will be removed from view when the context where it is rendered
 *    is unmounted. Unlike toasts fired with `showToast`, which will normally be dismissed, either
 *    by the user or after a delay. They'll still be animated on their way out, though.
 * 2. When combined with disabling dismissing it (e.g. `showDismissButton={false}` and
 *    `autoDismissDelay={false}` it provides a way to show "permanent" toasts that only go away when
 *    the component ceases to be rendered).
 *
 * This is useful for cases when the consumer wants to control when a toast is visible, and to keep
 * it visible based on an app-specific condition.
 *
 * Something important to note about this component is that it triggers the toast based on the props
 * passed when first rendered, and it does not update the toast if these props change on subsequent
 * renders. In this sense, this is an imperative component, more than a descriptive one. This is
 * done to simplify the internals, and to keep it in line with how `showToast` works: you fire up a
 * toast imperatively, and you loose control over it. It remains rendered according to the props you
 * first passed.
 *
 * @see useToasts
 */

function Toast(props) {
    const showToast = useToasts()
    const propsRef = React__default.useRef(props)
    React__default.useEffect(() => {
        const dismissToast = showToast(propsRef.current)
        return dismissToast
    }, [showToast])
    return null
}

export { Toast, ToastsProvider, useToasts }
//# sourceMappingURL=use-toasts.js.map
