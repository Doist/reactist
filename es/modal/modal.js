import {
    objectWithoutProperties as _objectWithoutProperties,
    objectSpread2 as _objectSpread2,
} from '../_virtual/_rollupPluginBabelHelpers.js'
import * as React from 'react'
import { forwardRef } from 'react'
import classNames from 'classnames'
import FocusLock from 'react-focus-lock'
import { hideOthers } from 'aria-hidden'
import { useDialogStore, Portal, Dialog } from '@ariakit/react'
import { CloseIcon } from '../icons/close-icon.js'
import { Columns, Column } from '../columns/columns.js'
import { Inline } from '../inline/inline.js'
import { Divider } from '../divider/divider.js'
import { Box } from '../box/box.js'
import { IconButton } from '../button/button.js'
import modules_8f59d13b from './modal.module.css.js'

const _excluded = [
        'isOpen',
        'onDismiss',
        'height',
        'width',
        'exceptionallySetClassName',
        'exceptionallySetOverlayClassName',
        'autoFocus',
        'hideOnEscape',
        'hideOnInteractOutside',
        'children',
        'portalElement',
        'onKeyDown',
        'className',
    ],
    _excluded2 = ['children', 'button', 'withDivider', 'exceptionallySetClassName'],
    _excluded3 = ['exceptionallySetClassName', 'children'],
    _excluded4 = ['exceptionallySetClassName', 'withDivider'],
    _excluded5 = ['children']
const ModalContext = /*#__PURE__*/ React.createContext({
    onDismiss: undefined,
    height: 'fitContent',
})

function isNotInternalFrame(element) {
    return !(element.ownerDocument === document && element.tagName.toLowerCase() === 'iframe')
}
/**
 * Renders a modal that sits on top of the rest of the content in the entire page.
 *
 * Follows the WAI-ARIA Dialog (Modal) Pattern.
 *
 * @see ModalHeader
 * @see ModalFooter
 * @see ModalBody
 */

function Modal(_ref) {
    let {
            isOpen,
            onDismiss,
            height = 'fitContent',
            width = 'medium',
            exceptionallySetClassName,
            exceptionallySetOverlayClassName,
            autoFocus = true,
            hideOnEscape = true,
            hideOnInteractOutside = true,
            children,
            portalElement,
            onKeyDown,
            // @ts-expect-error we want to make sure to not pass it to the Dialog component
            className,
        } = _ref,
        props = _objectWithoutProperties(_ref, _excluded)

    const setOpen = React.useCallback(
        (visible) => {
            if (!visible) {
                onDismiss == null ? void 0 : onDismiss()
            }
        },
        [onDismiss],
    )
    const store = useDialogStore({
        open: isOpen,
        setOpen,
    })
    const contextValue = React.useMemo(
        () => ({
            onDismiss,
            height,
        }),
        [onDismiss, height],
    )
    const portalRef = React.useRef(null)
    const dialogRef = React.useRef(null)
    const backdropRef = React.useRef(null)
    const handleBackdropClick = React.useCallback(
        (event) => {
            var _dialogRef$current, _backdropRef$current

            if (
                // The focus lock element takes up the same space as the backdrop and is where the event bubbles up from,
                // so instead of checking the backdrop as the event target, we need to make sure it's just above the dialog
                !(
                    (_dialogRef$current = dialogRef.current) != null &&
                    _dialogRef$current.contains(event.target)
                ) && // Events fired from other portals will bubble up to the backdrop, even if it isn't a child in the DOM
                (_backdropRef$current = backdropRef.current) != null &&
                _backdropRef$current.contains(event.target)
            ) {
                event.stopPropagation()
                onDismiss == null ? void 0 : onDismiss()
            }
        },
        [onDismiss],
    )
    React.useLayoutEffect(
        function disableAccessibilityTreeOutside() {
            if (!isOpen || !portalRef.current) {
                return
            }

            return hideOthers(portalRef.current)
        },
        [isOpen],
    )
    const handleKeyDown = React.useCallback(
        function handleKeyDown(event) {
            if (
                hideOnEscape &&
                onDismiss != null &&
                event.key === 'Escape' &&
                !event.defaultPrevented
            ) {
                event.stopPropagation()
                onDismiss()
            }

            onKeyDown == null ? void 0 : onKeyDown(event)
        },
        [onDismiss, hideOnEscape, onKeyDown],
    )

    if (!isOpen) {
        return null
    }

    return /*#__PURE__*/ React.createElement(
        Portal,
        {
            portalRef: portalRef,
            portalElement: portalElement,
        },
        /*#__PURE__*/ React.createElement(
            Box,
            {
                'data-testid': 'modal-overlay',
                'data-overlay': true,
                className: classNames(
                    modules_8f59d13b.overlay,
                    modules_8f59d13b[height],
                    modules_8f59d13b[width],
                    exceptionallySetOverlayClassName,
                ),

                /**
                 * We're using `onPointerDown` instead of `onClick` to prevent the modal from
                 * closing when the click starts inside the modal and ends on the backdrop.
                 */
                onPointerDown: hideOnInteractOutside ? handleBackdropClick : undefined,
                ref: backdropRef,
            },
            /*#__PURE__*/ React.createElement(
                FocusLock,
                {
                    autoFocus: autoFocus,
                    whiteList: isNotInternalFrame,
                    returnFocus: true,
                    crossFrame: false,
                },
                /*#__PURE__*/ React.createElement(
                    Dialog,
                    _objectSpread2(
                        _objectSpread2({}, props),
                        {},
                        {
                            ref: dialogRef,
                            render: /*#__PURE__*/ React.createElement(Box, {
                                borderRadius: 'full',
                                background: 'default',
                                display: 'flex',
                                flexDirection: 'column',
                                overflow: 'hidden',
                                height: height === 'expand' ? 'full' : undefined,
                                flexGrow: height === 'expand' ? 1 : 0,
                            }),
                            className: classNames(
                                exceptionallySetClassName,
                                modules_8f59d13b.container,
                            ),
                            store: store,
                            preventBodyScroll: true,
                            // Disable focus lock as we set up our own using ReactFocusLock
                            modal: false,
                            autoFocus: false,
                            autoFocusOnShow: false,
                            autoFocusOnHide: false,
                            // Disable portal and backdrop as we control their markup
                            portal: false,
                            backdrop: false,
                            hideOnInteractOutside: false,
                            hideOnEscape: false,
                            onKeyDown: handleKeyDown,
                        },
                    ),
                    /*#__PURE__*/ React.createElement(
                        ModalContext.Provider,
                        {
                            value: contextValue,
                        },
                        children,
                    ),
                ),
            ),
        ),
    )
}
/**
 * The close button rendered by ModalHeader. Provided independently so that consumers can customize
 * the button's label.
 *
 * @see ModalHeader
 */

function ModalCloseButton(props) {
    const { onDismiss } = React.useContext(ModalContext)
    const [includeInTabOrder, setIncludeInTabOrder] = React.useState(false)
    const [isMounted, setIsMounted] = React.useState(false)
    React.useEffect(
        function skipAutoFocus() {
            if (isMounted) {
                setIncludeInTabOrder(true)
            } else {
                setIsMounted(true)
            }
        },
        [isMounted],
    )
    return /*#__PURE__*/ React.createElement(
        IconButton,
        _objectSpread2(
            _objectSpread2({}, props),
            {},
            {
                variant: 'quaternary',
                onClick: onDismiss,
                icon: /*#__PURE__*/ React.createElement(CloseIcon, null),
                tabIndex: includeInTabOrder ? 0 : -1,
            },
        ),
    )
}
/**
 * Renders a standard modal header area with an optional close button.
 *
 * @see Modal
 * @see ModalFooter
 * @see ModalBody
 */

function ModalHeader(_ref2) {
    let { children, button = true, withDivider = false, exceptionallySetClassName } = _ref2,
        props = _objectWithoutProperties(_ref2, _excluded2)

    return /*#__PURE__*/ React.createElement(
        React.Fragment,
        null,
        /*#__PURE__*/ React.createElement(
            Box,
            _objectSpread2(
                _objectSpread2({}, props),
                {},
                {
                    as: 'header',
                    paddingLeft: 'large',
                    paddingRight: button === false || button === null ? 'large' : 'small',
                    paddingY: 'small',
                    className: exceptionallySetClassName,
                },
            ),
            /*#__PURE__*/ React.createElement(
                Columns,
                {
                    space: 'large',
                    alignY: 'center',
                },
                /*#__PURE__*/ React.createElement(
                    Column,
                    {
                        width: 'auto',
                    },
                    children,
                ),
                button === false || button === null
                    ? /*#__PURE__*/ React.createElement('div', {
                          className: modules_8f59d13b.headerContent,
                      })
                    : /*#__PURE__*/ React.createElement(
                          Column,
                          {
                              width: 'content',
                              exceptionallySetClassName: modules_8f59d13b.buttonContainer,
                              'data-testid': 'button-container',
                          },
                          typeof button === 'boolean'
                              ? /*#__PURE__*/ React.createElement(ModalCloseButton, {
                                    'aria-label': 'Close modal',
                                    autoFocus: false,
                                })
                              : button,
                      ),
            ),
        ),
        withDivider ? /*#__PURE__*/ React.createElement(Divider, null) : null,
    )
}
/**
 * Renders the body of a modal.
 *
 * Convenient to use alongside ModalHeader and/or ModalFooter as needed. It ensures, among other
 * things, that the content of the modal body expands or contracts depending on the modal height
 * setting or the size of the content. The body content also automatically scrolls when it's too
 * large to fit the available space.
 *
 * @see Modal
 * @see ModalHeader
 * @see ModalFooter
 */

const ModalBody = /*#__PURE__*/ forwardRef(function ModalBody(_ref3, ref) {
    let { exceptionallySetClassName, children } = _ref3,
        props = _objectWithoutProperties(_ref3, _excluded3)

    const { height } = React.useContext(ModalContext)
    return /*#__PURE__*/ React.createElement(
        Box,
        _objectSpread2(
            _objectSpread2({}, props),
            {},
            {
                ref: ref,
                className: exceptionallySetClassName,
                flexGrow: height === 'expand' ? 1 : 0,
                height: height === 'expand' ? 'full' : undefined,
                overflow: 'auto',
            },
        ),
        /*#__PURE__*/ React.createElement(
            Box,
            {
                padding: 'large',
                paddingBottom: 'xxlarge',
            },
            children,
        ),
    )
})
/**
 * Renders a standard modal footer area.
 *
 * @see Modal
 * @see ModalHeader
 * @see ModalBody
 */

function ModalFooter(_ref4) {
    let { exceptionallySetClassName, withDivider = false } = _ref4,
        props = _objectWithoutProperties(_ref4, _excluded4)

    return /*#__PURE__*/ React.createElement(
        React.Fragment,
        null,
        withDivider ? /*#__PURE__*/ React.createElement(Divider, null) : null,
        /*#__PURE__*/ React.createElement(
            Box,
            _objectSpread2(
                _objectSpread2(
                    {
                        as: 'footer',
                    },
                    props,
                ),
                {},
                {
                    className: exceptionallySetClassName,
                    padding: 'large',
                },
            ),
        ),
    )
}
/**
 * A specific version of the ModalFooter, tailored to showing an inline list of actions (buttons).
 * @see ModalFooter
 */

function ModalActions(_ref5) {
    let { children } = _ref5,
        props = _objectWithoutProperties(_ref5, _excluded5)

    return /*#__PURE__*/ React.createElement(
        ModalFooter,
        _objectSpread2({}, props),
        /*#__PURE__*/ React.createElement(
            Inline,
            {
                align: 'right',
                space: 'large',
            },
            children,
        ),
    )
}

export { Modal, ModalActions, ModalBody, ModalCloseButton, ModalFooter, ModalHeader }
//# sourceMappingURL=modal.js.map
