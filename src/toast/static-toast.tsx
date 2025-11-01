import { forwardRef } from 'react'

import { Box } from '../box'
import { Button, IconButton } from '../button'
import { CloseIcon } from '../icons/close-icon'
import { Stack } from '../stack'
import { Text } from '../text'

import styles from './toast.module.css'

import type { ReactElement, ReactNode } from 'react'

type ToastActionObject = {
    label: string
    onClick: () => void
    closeToast?: boolean
}

type StaticToastProps = {
    /**
     * The message shown in the toast.
     */
    message: NonNullable<ReactNode>

    /**
     * An optional extra description that complements the main message shown in the toast.
     */
    description?: ReactNode

    /**
     * An icon to be shown in front of the message.
     */
    icon?: ReactNode

    /**
     * The action to call when the user clicks on the dismiss button. If omitted, the dismiss button
     * does not appear.
     */
    onDismiss?: () => void

    /**
     * The label for the button that dismisses the toast.
     */
    dismissLabel?: string

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
    action?: ReactElement | ToastActionObject
}

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
const StaticToast = forwardRef<HTMLDivElement, StaticToastProps>(function Toast(
    { message, description, icon, action, onDismiss, dismissLabel = 'Close', ...props },
    ref,
) {
    return (
        <Box
            ref={ref}
            role="alert"
            aria-live="polite"
            borderRadius="full"
            width="fitContent"
            background="toast"
            display="flex"
            padding="large"
            alignItems="center"
            className={styles.toastContainer}
            {...props}
        >
            {icon ? <ToastContentSlot>{icon}</ToastContentSlot> : null}

            <Box flexGrow={1} maxWidth="small">
                {description ? (
                    <Stack space="small">
                        <Text weight="bold">{message} </Text>
                        <Text>{description}</Text>
                    </Stack>
                ) : (
                    <Text>{message}</Text>
                )}
            </Box>

            {action ? (
                <ToastContentSlot>
                    {isActionObject(action) ? (
                        <Button variant="tertiary" size="small" onClick={action.onClick}>
                            {action.label}
                        </Button>
                    ) : (
                        action
                    )}
                </ToastContentSlot>
            ) : null}

            {onDismiss ? (
                <ToastContentSlot>
                    <IconButton
                        variant="quaternary"
                        size="small"
                        onClick={onDismiss}
                        aria-label={dismissLabel}
                        icon={<CloseIcon />}
                    />
                </ToastContentSlot>
            ) : null}
        </Box>
    )
})

function isActionObject(action: StaticToastProps['action']): action is ToastActionObject {
    return (
        action != null &&
        typeof action === 'object' &&
        'label' in action &&
        'onClick' in action &&
        typeof action.label === 'string' &&
        typeof action.onClick === 'function'
    )
}

function ToastContentSlot({ children }: { children: ReactNode }) {
    return (
        <Box
            display="flex"
            alignItems="center"
            justifyContent="center"
            marginX="-xsmall"
            marginY="-medium"
            className={styles.slot}
        >
            {children}
        </Box>
    )
}

export { isActionObject, StaticToast }
export type { StaticToastProps }
