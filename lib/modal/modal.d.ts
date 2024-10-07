import * as React from 'react';
import { DialogOptions, PortalOptions } from '@ariakit/react';
import { IconButtonProps } from '../button';
import type { ObfuscatedClassName } from '../utils/common-types';
type ModalWidth = 'xsmall' | 'small' | 'medium' | 'large' | 'xlarge' | 'full';
type ModalHeightMode = 'expand' | 'fitContent';
type DivProps = Omit<React.DetailedHTMLProps<React.ButtonHTMLAttributes<HTMLDivElement>, HTMLDivElement>, 'className' | 'children' | `aria-label` | `aria-labelledby`>;
export interface ModalProps extends DivProps, ObfuscatedClassName {
    /**
     * The content of the modal.
     */
    children: React.ReactNode;
    /**
     * Whether the modal is open and visible or not.
     */
    isOpen: boolean;
    /**
     * Called when the user triggers closing the modal.
     */
    onDismiss?(): void;
    /**
     * A descriptive setting for how wide the modal should aim to be, depending on how much space
     * it has on screen.
     * @default 'medium'
     */
    width?: ModalWidth;
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
    height?: ModalHeightMode;
    /**
     * Whether to set or not the focus initially to the first focusable element inside the modal.
     */
    autoFocus?: boolean;
    /**
     * Controls if the modal is dismissed when pressing "Escape".
     */
    hideOnEscape?: DialogOptions['hideOnEscape'];
    /**
     * Controls if the modal is dismissed when clicking outside the modal body, on the overlay.
     */
    hideOnInteractOutside?: DialogOptions['hideOnInteractOutside'];
    /**
     * An escape hatch in case you need to provide a custom class name to the overlay element.
     */
    exceptionallySetOverlayClassName?: string;
    /**
     * Defines a string value that labels the current modal for assistive technologies.
     */
    'aria-label'?: string;
    /**
     * Identifies the element (or elements) that labels the current modal for assistive technologies.
     */
    'aria-labelledby'?: string;
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
    portalElement?: PortalOptions['portalElement'];
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
export declare function Modal({ isOpen, onDismiss, height, width, exceptionallySetClassName, exceptionallySetOverlayClassName, autoFocus, hideOnEscape, hideOnInteractOutside, children, portalElement, onKeyDown, className, ...props }: ModalProps): React.JSX.Element | null;
export interface ModalCloseButtonProps extends Omit<IconButtonProps, 'type' | 'variant' | 'icon' | 'disabled' | 'loading' | 'tabIndex' | 'ref'> {
    /**
     * The descriptive label of the button.
     */
    'aria-label': string;
}
/**
 * The close button rendered by ModalHeader. Provided independently so that consumers can customize
 * the button's label.
 *
 * @see ModalHeader
 */
export declare function ModalCloseButton(props: ModalCloseButtonProps): React.JSX.Element;
export interface ModalHeaderProps extends DivProps, ObfuscatedClassName {
    /**
     * The content of the header.
     */
    children: React.ReactNode;
    /**
     * Allows to provide a custom button element, or to omit the close button if set to false.
     * @see ModalCloseButton
     */
    button?: React.ReactNode | boolean;
    /**
     * Whether to render a divider line below the header.
     * @default false
     */
    withDivider?: boolean;
}
/**
 * Renders a standard modal header area with an optional close button.
 *
 * @see Modal
 * @see ModalFooter
 * @see ModalBody
 */
export declare function ModalHeader({ children, button, withDivider, exceptionallySetClassName, ...props }: ModalHeaderProps): React.JSX.Element;
export interface ModalBodyProps extends DivProps, ObfuscatedClassName {
    /**
     * The content of the modal body.
     */
    children: React.ReactNode;
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
export declare const ModalBody: React.ForwardRefExoticComponent<Omit<ModalBodyProps, "ref"> & React.RefAttributes<HTMLDivElement>>;
export interface ModalFooterProps extends DivProps, ObfuscatedClassName {
    /**
     * The contant of the modal footer.
     */
    children: React.ReactNode;
    /**
     * Whether to render a divider line below the footer.
     * @default false
     */
    withDivider?: boolean;
}
/**
 * Renders a standard modal footer area.
 *
 * @see Modal
 * @see ModalHeader
 * @see ModalBody
 */
export declare function ModalFooter({ exceptionallySetClassName, withDivider, ...props }: ModalFooterProps): React.JSX.Element;
export type ModalActionsProps = ModalFooterProps;
/**
 * A specific version of the ModalFooter, tailored to showing an inline list of actions (buttons).
 * @see ModalFooter
 */
export declare function ModalActions({ children, ...props }: ModalActionsProps): React.JSX.Element;
export {};
