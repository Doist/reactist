import React from 'react';
type ToastActionObject = {
    label: string;
    onClick: () => void;
};
type StaticToastProps = {
    /**
     * The message shown in the toast.
     */
    message: NonNullable<React.ReactNode>;
    /**
     * An optional extra description that complements the main message shown in the toast.
     */
    description?: React.ReactNode;
    /**
     * An icon to be shown in front of the message.
     */
    icon?: React.ReactNode;
    /**
     * The action to call when the user clicks on the dismiss button. If omitted, the dismiss button
     * does not appear.
     */
    onDismiss?: () => void;
    /**
     * The label for the button that dismisses the toast.
     */
    dismissLabel?: string;
    /**
     * What to render in the action slot. Usually a button or link.
     *
     * You can also pass an object that containst the action label, and a function that performs the
     * action. This is used by the toast component to render a button for you.
     *
     * In general, you should prefer the action object most of the time. But it is possible to pass
     * a React element instead, if you need more control over what to render. For instance, you may
     * want to render a link instead of a button.
     *
     * Keep in mind, though, that the default button rendered uses `variant="tertiary"` and
     * `size="small"`. In most cases you should stick to the variants `tertiary` or `primary`, which
     * are the ones that look better in the toast's dark background. And in all cases you should use
     * size `small`.
     */
    action?: React.ReactElement | ToastActionObject;
};
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
declare const StaticToast: React.ForwardRefExoticComponent<StaticToastProps & React.RefAttributes<HTMLDivElement>>;
declare function isActionObject(action: StaticToastProps['action']): action is ToastActionObject;
export { StaticToast, isActionObject };
export type { StaticToastProps };
