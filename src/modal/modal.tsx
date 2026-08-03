import * as React from 'react'
import { forwardRef } from 'react'

import { Dialog } from '@base-ui/react/dialog'
import classNames from 'classnames'

import { Box } from '../box'
import { IconButton } from '../button'
import { Column, Columns } from '../columns'
import { Divider } from '../divider'
import { CloseIcon } from '../icons/close-icon'
import { Inline } from '../inline'

import styles from './modal.module.css'

import type { IconButtonProps } from '../button'
import type { DividerProps } from '../divider'
import type { ObfuscatedClassName } from '../utils/common-types'

type ModalWidth = 'xsmall' | 'small' | 'medium' | 'large' | 'xlarge' | 'full'
type ModalHeightMode = 'expand' | 'fitContent'

//
// ModalContext
//

type ModalContextValue = {
    onDismiss?(this: void): void
    height: ModalHeightMode
    dividers?: DividerProps['weight']
}

const ModalContext = React.createContext<ModalContextValue>({
    onDismiss: undefined,
    height: 'fitContent',
    dividers: undefined,
})

//
// Modal container
//

type DivProps = Omit<
    React.DetailedHTMLProps<React.ButtonHTMLAttributes<HTMLDivElement>, HTMLDivElement>,
    'className' | 'children' | `aria-label` | `aria-labelledby`
>

export interface ModalProps extends DivProps, ObfuscatedClassName {
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
    onDismiss?(this: void): void

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
     * The weight to apply to all dividers rendered inside the modal.
     */
    dividers?: DividerProps['weight']

    /**
     * Whether to set or not the focus initially to the first focusable element inside the modal.
     */
    autoFocus?: boolean

    /**
     * Controls if the modal is dismissed when pressing "Escape".
     */
    hideOnEscape?: boolean | ((event: KeyboardEvent) => boolean)

    /**
     * Controls if the modal is dismissed when clicking outside the modal body, on the overlay.
     */
    hideOnInteractOutside?: boolean | ((event: Event) => boolean)

    /**
     * An escape hatch in case you need to provide a custom class name to the overlay element.
     */
    exceptionallySetOverlayClassName?: string

    /**
     * Defines a string value that labels the current modal for assistive technologies.
     */
    'aria-label'?: string

    /**
     * Identifies the element (or elements) that labels the current modal for assistive technologies.
     */
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
     * <Modal portalElement={portal} />;
     * <div ref={setPortal} />;
     *
     * @example
     * const getPortalElement = () => {
     *   const div = document.createElement("div");
     *   const portalRoot = document.getElementById("portal-root");
     *   portalRoot.appendChild(div);
     *   return div;
     * };
     * <Modal portalElement={getPortalElement} />;
     */
    portalElement?: HTMLElement | (() => HTMLElement | null) | null
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
    dividers,
    width = 'medium',
    exceptionallySetClassName,
    exceptionallySetOverlayClassName,
    autoFocus = true,
    hideOnEscape = true,
    hideOnInteractOutside = true,
    children,
    portalElement,
    onKeyDown,
    // @ts-expect-error we want to make sure to not pass it to the dialog element
    className,
    ...props
}: ModalProps) {
    const contextValue: ModalContextValue = { onDismiss, height, dividers }

    const dialogRef = React.useRef<HTMLDivElement | null>(null)

    // Resolve the portal element upfront when given as a function, so that the dialog is only
    // rendered once its final portal element is known
    const [resolvedPortalElement, setResolvedPortalElement] = React.useState<HTMLElement | null>(
        null,
    )
    React.useLayoutEffect(
        function resolvePortalElement() {
            if (typeof portalElement === 'function') {
                // eslint-disable-next-line react-hooks/set-state-in-effect
                setResolvedPortalElement(portalElement())
            }
        },
        [portalElement],
    )

    function handleOpenChange(open: boolean, eventDetails: Dialog.Root.ChangeEventDetails) {
        if (open) {
            return
        }

        if (eventDetails.reason === 'outside-press') {
            const shouldHide =
                typeof hideOnInteractOutside === 'function'
                    ? hideOnInteractOutside(eventDetails.event)
                    : hideOnInteractOutside
            if (shouldHide && onDismiss != null) {
                onDismiss()
                return
            }
        }

        // Reject any other close request. Escape is handled by our own keydown handler below, so a
        // nested widget that handles Escape (and stops React propagation) does not also close the
        // modal, and so the key does not propagate beyond the modal when it triggers the dismissal
        eventDetails.cancel()
    }

    function handleKeyDown(event: React.KeyboardEvent<HTMLDivElement>) {
        if (event.key === 'Escape' && onDismiss != null && !event.defaultPrevented) {
            const shouldHide =
                typeof hideOnEscape === 'function' ? hideOnEscape(event.nativeEvent) : hideOnEscape
            if (shouldHide) {
                event.stopPropagation()
                onDismiss()
            }
        }
        onKeyDown?.(event)
    }

    function handleOverlayMouseDown(event: React.MouseEvent<HTMLDivElement>) {
        // Keep focus inside the modal when pressing on the overlay, so keyboard handling (such as
        // Escape to dismiss) keeps working even when the press does not close the modal
        if (!dialogRef.current?.contains(event.target as Node)) {
            event.preventDefault()
        }
    }

    /**
     * Focus the element marked with the `data-autofocus` attribute if present, or fall back to
     * the default behaviour of focusing the first focusable element inside the modal.
     */
    function getInitialFocus() {
        const autofocusElement = dialogRef.current?.querySelector('[data-autofocus]')
        return autofocusElement instanceof HTMLElement ? autofocusElement : true
    }

    if (typeof portalElement === 'function' && resolvedPortalElement == null) {
        return null
    }

    return (
        <Dialog.Root open={isOpen} onOpenChange={handleOpenChange} modal>
            <Dialog.Portal
                container={
                    (typeof portalElement === 'function' ? resolvedPortalElement : portalElement) ??
                    undefined
                }
            >
                <Box
                    data-testid="modal-overlay"
                    data-overlay
                    className={classNames(
                        styles.overlay,
                        styles[height],
                        styles[width],
                        exceptionallySetOverlayClassName,
                    )}
                    onMouseDown={handleOverlayMouseDown}
                >
                    <div className={styles.wrapper}>
                        <Dialog.Popup
                            {...props}
                            ref={dialogRef}
                            onKeyDown={handleKeyDown}
                            initialFocus={autoFocus ? getInitialFocus : false}
                            render={
                                <Box
                                    borderRadius="full"
                                    background="default"
                                    display="flex"
                                    flexDirection="column"
                                    overflow="hidden"
                                    height={height === 'expand' ? 'full' : undefined}
                                    flexGrow={height === 'expand' ? 1 : 0}
                                />
                            }
                            className={classNames(exceptionallySetClassName, styles.container)}
                        >
                            <ModalContext.Provider value={contextValue}>
                                {children}
                            </ModalContext.Provider>
                        </Dialog.Popup>
                    </div>
                </Box>
            </Dialog.Portal>
        </Dialog.Root>
    )
}

//
// ModalCloseButton
//

export interface ModalCloseButtonProps
    extends Omit<
        IconButtonProps,
        'type' | 'variant' | 'icon' | 'disabled' | 'loading' | 'tabIndex' | 'ref'
    > {
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
    const buttonRef = React.useRef<HTMLButtonElement>(null)

    React.useLayoutEffect(function skipAutoFocus() {
        const button = buttonRef.current
        if (!button) {
            return
        }

        button.tabIndex = -1

        const rafId = requestAnimationFrame(() => {
            button.tabIndex = 0
        })

        return () => {
            cancelAnimationFrame(rafId)
        }
    }, [])

    return (
        <IconButton
            {...props}
            ref={buttonRef}
            variant="quaternary"
            onClick={onDismiss}
            icon={<CloseIcon />}
        />
    )
}

//
// ModalHeader
//

export interface ModalHeaderProps extends DivProps, ObfuscatedClassName {
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
    const { dividers } = React.useContext(ModalContext)

    return (
        <>
            <Box
                {...props}
                as="header"
                paddingLeft="large"
                paddingRight={button === false || button === null ? 'large' : 'small'}
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
            {withDivider ? <Divider weight={dividers} /> : null}
        </>
    )
}

//
// ModalBody
//

export interface ModalBodyProps extends DivProps, ObfuscatedClassName {
    /**
     * The content of the modal body.
     */
    children: React.ReactNode
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
export const ModalBody = forwardRef<HTMLDivElement, ModalBodyProps>(function ModalBody(
    { exceptionallySetClassName, children, ...props },
    ref,
) {
    const { height } = React.useContext(ModalContext)
    return (
        <Box
            {...props}
            ref={ref}
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
})

//
// ModalFooter
//

export interface ModalFooterProps extends DivProps, ObfuscatedClassName {
    /**
     * The contant of the modal footer.
     */
    children: React.ReactNode
    /**
     * Whether to render a divider line below the footer.
     * @default false
     */
    withDivider?: boolean
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
    const { dividers } = React.useContext(ModalContext)

    return (
        <>
            {withDivider ? <Divider weight={dividers} /> : null}
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
