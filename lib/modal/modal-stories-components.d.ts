import * as React from 'react';
import * as ModalComponents from './modal';
import type { ModalProps, ModalHeaderProps, ModalFooterProps } from './modal';
declare function Link({ children, ...props }: JSX.IntrinsicElements['a']): React.JSX.Element;
type ModalStoryState = Pick<ModalProps, 'width' | 'height'> & {
    button: 'true' | 'false' | 'custom';
    hideOn: 'escapeAndOverlay' | 'escape' | 'overlay';
    withScrollableContent: boolean;
};
declare function ModalStoryStateProvider({ initialState, children, }: {
    initialState?: Partial<ModalStoryState>;
    children: React.ReactNode;
}): React.JSX.Element;
declare function ScrollableContent({ label, count }: {
    label?: string;
    count?: number;
}): React.JSX.Element;
declare function ModalOptionsForm({ title }: {
    title?: React.ReactNode;
}): React.JSX.Element;
declare function ModalButton({ variant, size, children, action, }: {
    variant: 'primary' | 'secondary' | 'danger';
    action?: 'open' | 'close';
    size?: 'small';
    children: NonNullable<React.ReactNode>;
}): React.JSX.Element;
declare namespace ModalButton {
    var displayName: string;
}
type WithOptionals<Props, Keys extends keyof Props> = Omit<Props, Keys> & Partial<Pick<Props, Keys>>;
declare function Modal(props: WithOptionals<ModalProps, 'isOpen' | 'onDismiss' | 'width' | 'height'>): React.JSX.Element;
declare function ModalHeader(props: WithOptionals<ModalHeaderProps, 'withDivider' | 'button'>): React.JSX.Element;
declare const ModalBody: React.ForwardRefExoticComponent<Omit<ModalComponents.ModalBodyProps, "ref"> & React.RefAttributes<HTMLDivElement>>;
declare function ModalFooter(props: WithOptionals<ModalFooterProps, 'withDivider'>): React.JSX.Element;
declare function ModalActions(props: WithOptionals<ModalFooterProps, 'withDivider'>): React.JSX.Element;
/**
 * Used by stories in storybooks to programmatically open the modal on each story.
 *
 * Not only that, but it also serves the purpose of testing that the modal actually opens.
 *
 * @see https://storybook.js.org/docs/react/writing-tests/interaction-testing
 */
export declare function openModal({ canvasElement }: {
    canvasElement: HTMLElement;
}): Promise<void>;
export { Link, ModalStoryStateProvider, ModalOptionsForm, ModalButton as Button, ScrollableContent };
export { Modal, ModalHeader, ModalBody, ModalFooter, ModalActions };
