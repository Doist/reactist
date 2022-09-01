import React from 'react'

import { CloseIcon } from '../icons/close-icon'
import { Box } from '../box'
import { Button } from '../button'
import { Stack } from '../stack'
import { Text } from '../text'

import styles from './toast.module.css'

type ToastActionObject = {
    label: string
    onClick: () => void
}

type ToastProps = {
    /**
     * The message shown in the notification.
     */
    message: NonNullable<React.ReactNode>

    /**
     * An optional extra description that complements the main message shown in the notification.
     */
    description?: React.ReactNode

    /**
     * An icon to be shown in front of the message.
     */
    icon?: React.ReactNode

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
    action?: React.ReactElement | ToastActionObject
}

/**
 * A toast that shows a message, and an optional action associated with it.
 *
 * This component is generally not meant to be used directly. Most of the time you'll want to use
 * notifications instead (see `useNotifications`). However, the component is available in case you
 * need to take control of rendering a toast under different circumstances than that of notification
 * toasts.
 *
 * This component makes no assumptions outwardly about how it is positioned on the screen. That is,
 * it will not be shown floating or fixed to the viewport edges, as toasts normally show up. It only
 * provides the toast look and feel, but you are responsible for positioning it as you want.
 *
 * @see useNotifications
 */
function Toast({
    message,
    description,
    icon,
    action,
    onDismiss,
    dismissLabel = 'Close',
    ...props
}: ToastProps) {
    return (
        <Box
            role="alert"
            aria-live="polite"
            borderRadius="full"
            width="fitContent"
            background="toast"
            display="flex"
            padding="large"
            alignItems="center"
            className={styles.container}
            {...props}
        >
            {icon ? (
                <Box
                    display="flex"
                    alignItems="center"
                    justifyContent="center"
                    className={styles.icon}
                >
                    {icon}
                </Box>
            ) : null}

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
                <Box
                    display="flex"
                    alignItems="center"
                    justifyContent="center"
                    className={styles.action}
                >
                    <ToastActionSlot action={action} />
                </Box>
            ) : null}

            {onDismiss ? (
                <Box display="flex" alignItems="center" justifyContent="center" margin="-small">
                    <Button
                        variant="quaternary"
                        size="small"
                        onClick={onDismiss}
                        aria-label={dismissLabel}
                        icon={<CloseIcon />}
                    />
                </Box>
            ) : null}
        </Box>
    )
}

function isActionObject(action: ToastProps['action']): action is ToastActionObject {
    return (
        action != null &&
        typeof action === 'object' &&
        'label' in action &&
        'onClick' in action &&
        typeof action.label === 'string' &&
        typeof action.onClick === 'function'
    )
}

function ToastActionSlot({ action }: Pick<ToastProps, 'action'>) {
    if (React.isValidElement(action)) {
        return action
    }

    if (isActionObject(action)) {
        return (
            <Button variant="tertiary" size="small" onClick={action.onClick}>
                {action.label}
            </Button>
        )
    }

    return null
}

export { Toast }
export type { ToastProps }
