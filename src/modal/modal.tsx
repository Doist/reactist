import * as React from 'react'
import classNames from 'classnames'
import FocusLock from 'react-focus-lock'
import { hideOthers } from 'aria-hidden'

import { Dialog, DialogOptions, useDialogState } from 'ariakit/dialog'
import { Portal, PortalOptions } from 'ariakit/portal'

import { CloseIcon } from '../icons/close-icon'
import { Column, Columns } from '../columns'
import { Inline } from '../inline'
import { Divider } from '../divider'
import { Box } from '../box'
import { Button, ButtonProps } from '../button'

import styles from './modal.module.css'

type ModalWidth = 'small' | 'medium' | 'large' | 'xlarge' | 'full'
type ModalHeightMode = 'expand' | 'fitContent'

//
// ModalContext
//

type ModalContextValue = {
    onDismiss?(this: void): void
    height: ModalHeightMode
}

const ModalContext = React.createContext<ModalContextValue>({
    onDismiss: undefined,
    height: 'fitContent',
})

//
// Modal container
//

type DivProps = Omit<
    React.DetailedHTMLProps<React.ButtonHTMLAttributes<HTMLDivElement>, HTMLDivElement>,
    'className' | 'children' | `aria-label` | `aria-labelledby`
>

export type ModalProps = DivProps & {
    /**
     * The content of the modal.
     */
    children: React.ReactNode
    /**
     * Whether the modal is open and visible or not.
     */
    isOpen: boolean
    /**
     * Called when the user triggers closing the modal.
     */
    onDismiss?(): void
    /**
     * A descriptive setting for how wide the modal should aim to be, depending on how much space
     * it has on screen.
     * @default 'medium'
     */
    width?: ModalWidth
    /**
     * A descriptive setting for how tall the modal should aim to be.
     *
     * - 'expand': the modal aims to fill most of the available screen height, leaving only a small
     *   padding above and below.
     * - 'fitContent': the modal shrinks to the smallest size that allow it to fit its content.
     *
     * In either case, if content does not fit, the content of the main body is set to scroll
     * (provided you use `ModalBody`) so that the modal never has to strech vertically beyond the
     * viewport boundaries.
     *
     * If you do not use `ModalBody`, the modal still prevents overflow, and you are in charge of
     * the inner layout to ensure scroll, or whatever other strategy you may want.
     */
    height?: ModalHeightMode
    /**
     * Whether to set or not the focus initially to the first focusable element inside the modal.
     */
    autoFocus?: boolean
    /**
     * Controls if the modal is dismissed when pressing "Escape".
     */
    hideOnEscape?: DialogOptions['hideOnEscape']
    /**
     * Controls if the modal is dismissed when clicking outside the modal body, on the overlay.
     */
    hideOnInteractOutside?: DialogOptions['hideOnInteractOutside']
    /**
     * An escape hatch in case you need to provide a custom class name to the container element.
     */
    exceptionallySetClassName?: string
    /**
     * An escape hatch in case you need to provide a custom class name to the overlay element.
     */
    exceptionallySetOverlayClassName?: string
    /** Defines a string value that labels the current modal for assistive technologies. */
    'aria-label'?: string
    /** Identifies the element (or elements) that labels the current modal for assistive technologies. */
    'aria-labelledby'?: string
    /**
     * An HTML element or a memoized callback function that returns an HTML element to be used as
     * the portal element. By default, the portal element will be a `div` element appended to the
     * `document.body`.
     *
     * @default HTMLDivElement
     *
     * @example
     * const [portal, setPortal] = useState(null);
     * <Portal portalElement={portal} />;
     * <div ref={setPortal} />;
     *
     * @example
     * const getPortalElement = useCallback(() => {
     *   const div = document.createElement("div");
     *   const portalRoot = document.getElementById("portal-root");
     *   portalRoot.appendChild(div);
     *   return div;
     * }, []);
     * <Portal portalElement={getPortalElement} />;
     */
    portalElement?: PortalOptions['portalElement']
}

function isNotInternalFrame(element: HTMLElement) {
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
export function Modal({
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
    ...props
}: ModalProps) {
    const setOpen = React.useCallback(
        (visible: boolean) => {
            if (!visible) {
                onDismiss?.()
            }
        },
        [onDismiss],
    )
    const state = useDialogState({ open: isOpen, setOpen })

    const contextValue: ModalContextValue = React.useMemo(() => ({ onDismiss, height }), [
        onDismiss,
        height,
    ])

    const portalRef = React.useRef<HTMLElement | null>(null)
    const dialogRef = React.useRef<HTMLDivElement | null>(null)
    const backdropRef = React.useRef<HTMLDivElement | null>(null)
    const handleBackdropClick = React.useCallback(
        (event: React.MouseEvent) => {
            if (
                // The focus lock element takes up the same space as the backdrop and is where the event bubbles up from,
                // so instead of checking the backdrop as the event target, we need to make sure it's just above the dialog
                !dialogRef.current?.contains(event.target as Node) &&
                // Events fired from other portals will bubble up to the backdrop, even if it isn't a child in the DOM
                backdropRef.current?.contains(event.target as Node)
            ) {
                event.stopPropagation()
                onDismiss?.()
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

    if (!isOpen) {
        return null
    }

    return (
        <Portal portalRef={portalRef} portalElement={portalElement}>
            <Box
                data-testid="modal-overlay"
                data-overlay
                className={classNames(
                    styles.overlay,
                    styles[height],
                    styles[width],
                    exceptionallySetOverlayClassName,
                )}
                /**
                 * We're using `onPointerDown` instead of `onClick` to prevent
                 * the modal from closing when the click starts inside the modal
                 * and ends on the backdrop.
                 */
                onPointerDown={hideOnInteractOutside ? handleBackdropClick : undefined}
                ref={backdropRef}
            >
                <FocusLock autoFocus={autoFocus} whiteList={isNotInternalFrame} returnFocus={true}>
                    <Dialog
                        {...props}
                        ref={dialogRef}
                        as={Box}
                        state={state}
                        hideOnEscape={hideOnEscape}
                        preventBodyScroll
                        borderRadius="full"
                        background="default"
                        display="flex"
                        flexDirection="column"
                        overflow="hidden"
                        height={height === 'expand' ? 'full' : undefined}
                        flexGrow={height === 'expand' ? 1 : 0}
                        className={[exceptionallySetClassName, styles.container]}
                        // Disable focus lock as we set up our own using ReactFocusLock
                        modal={false}
                        autoFocus={false}
                        autoFocusOnShow={false}
                        autoFocusOnHide={false}
                        // Disable portal and backdrop as we control their markup
                        portal={false}
                        backdrop={false}
                        hideOnInteractOutside={false}
                    >
                        <ModalContext.Provider value={contextValue}>
                            {children}
                        </ModalContext.Provider>
                    </Dialog>
                </FocusLock>
            </Box>
        </Portal>
    )
}

//
// ModalCloseButton
//

export type ModalCloseButtonProps = Omit<
    ButtonProps,
    | 'type'
    | 'children'
    | 'variant'
    | 'icon'
    | 'startIcon'
    | 'endIcon'
    | 'disabled'
    | 'loading'
    | 'tabIndex'
    | 'width'
    | 'align'
> & {
    /**
     * The descriptive label of the button.
     */
    'aria-label': string
}

/**
 * The close button rendered by ModalHeader. Provided independently so that consumers can customize
 * the button's label.
 *
 * @see ModalHeader
 */
export function ModalCloseButton(props: ModalCloseButtonProps) {
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

    return (
        <Button
            {...props}
            variant="quaternary"
            onClick={onDismiss}
            icon={<CloseIcon />}
            tabIndex={includeInTabOrder ? 0 : -1}
        />
    )
}

//
// ModalHeader
//

export type ModalHeaderProps = DivProps & {
    /**
     * The content of the header.
     */
    children: React.ReactNode
    /**
     * Allows to provide a custom button element, or to omit the close button if set to false.
     * @see ModalCloseButton
     */
    button?: React.ReactNode | boolean
    /**
     * Whether to render a divider line below the header.
     * @default false
     */
    withDivider?: boolean
    /**
     * A escape hatch in case you need to provide a custom class name to the container element.
     */
    exceptionallySetClassName?: string
}

/**
 * Renders a standard modal header area with an optional close button.
 *
 * @see Modal
 * @see ModalFooter
 * @see ModalBody
 */
export function ModalHeader({
    children,
    button = true,
    withDivider = false,
    exceptionallySetClassName,
    ...props
}: ModalHeaderProps) {
    return (
        <>
            <Box
                {...props}
                as="header"
                paddingX="large"
                paddingY="small"
                className={exceptionallySetClassName}
            >
                <Columns space="large" alignY="center">
                    <Column width="auto">{children}</Column>
                    {button === false || button === null ? (
                        <div className={styles.headerContent} />
                    ) : (
                        <Column
                            width="content"
                            exceptionallySetClassName={styles.buttonContainer}
                            data-testid="button-container"
                        >
                            {typeof button === 'boolean' ? (
                                <ModalCloseButton aria-label="Close modal" autoFocus={false} />
                            ) : (
                                button
                            )}
                        </Column>
                    )}
                </Columns>
            </Box>
            {withDivider ? <Divider /> : null}
        </>
    )
}

//
// ModalBody
//

export type ModalBodyProps = DivProps & {
    /**
     * The content of the modal body.
     */
    children: React.ReactNode
    /**
     * A escape hatch in case you need to provide a custom class name to the container element.
     */
    exceptionallySetClassName?: string
}

/**
 * Renders the body of a modal.
 *
 * Convenient to use alongside ModalHeader and/or ModalFooter as needed. It ensures, among other
 * things, that the contet of the modal body expands or contracts depending on the modal height
 * setting or the size of the content. The body content also automatically scrolls when it's too
 * large to fit the available space.
 *
 * @see Modal
 * @see ModalHeader
 * @see ModalFooter
 */
export function ModalBody({ exceptionallySetClassName, children, ...props }: ModalBodyProps) {
    const { height } = React.useContext(ModalContext)
    return (
        <Box
            {...props}
            className={exceptionallySetClassName}
            flexGrow={height === 'expand' ? 1 : 0}
            height={height === 'expand' ? 'full' : undefined}
            overflow="auto"
        >
            <Box padding="large" paddingBottom="xxlarge">
                {children}
            </Box>
        </Box>
    )
}

//
// ModalFooter
//

export type ModalFooterProps = DivProps & {
    /**
     * The contant of the modal footer.
     */
    children: React.ReactNode
    /**
     * Whether to render a divider line below the footer.
     * @default false
     */
    withDivider?: boolean
    /**
     * A escape hatch in case you need to provide a custom class name to the container element.
     */
    exceptionallySetClassName?: string
}

/**
 * Renders a standard modal footer area.
 *
 * @see Modal
 * @see ModalHeader
 * @see ModalBody
 */
export function ModalFooter({
    exceptionallySetClassName,
    withDivider = false,
    ...props
}: ModalFooterProps) {
    return (
        <>
            {withDivider ? <Divider /> : null}
            <Box as="footer" {...props} className={exceptionallySetClassName} padding="large" />
        </>
    )
}

//
// ModalActions
//

export type ModalActionsProps = ModalFooterProps

/**
 * A specific version of the ModalFooter, tailored to showing an inline list of actions (buttons).
 * @see ModalFooter
 */
export function ModalActions({ children, ...props }: ModalActionsProps) {
    return (
        <ModalFooter {...props}>
            <Inline align="right" space="large">
                {children}
            </Inline>
        </ModalFooter>
    )
}
