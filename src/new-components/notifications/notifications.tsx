import React from 'react'
import { Portal } from 'ariakit/portal'

import { generateElementId } from '../common-helpers'
import { Box } from '../box'
import { Stack } from '../stack'
import { Toast, ToastProps } from '../toast'

import styles from './notifications.module.css'

import type { Space } from '../common-types'
import { useNotificationsAnimation } from './notifications-animation'

/**
 * The props needed to fire up a new notification
 */
type NotificationProps = {
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
     * The number of seconds the notification is expected to be shown before it is dismissed
     * automatically, or false to disable auto-dismiss.
     *
     * It defaults to whatever is the autoDismissDelay set in the NotificationsProvider.
     */
    autoDismissDelay?: number | false

    /**
     * The label for the button that dismisses the notification.
     *
     * It defaults to the value set in the NotificationsProvider, but individual notifications can
     * have a different value if needed.
     */
    dismissLabel?: string

    /**
     * An optional action that the notification shows as a button to perform it.
     */
    action?: ToastProps['action']

    /**
     * Whether to show the dismiss button or not.
     *
     * Use this value with care. If combined with disabling `autoDismissDelay`, it may leave you
     * with notifications that the user won't be able to dismiss at will. It then is your
     * responsibility to dismiss the notification by calling the function returned by
     * `showNotification`.
     */
    showDismissButton?: boolean
}

//
// InternalNotification component and its props
//

type InternalNotificationProps = Omit<NotificationProps, 'autoDismissDelay' | 'dismissLabel'> &
    Required<Pick<NotificationProps, 'autoDismissDelay' | 'dismissLabel'>> & {
        notificationId: string
        onDismiss: (notificationId: string) => void
    }

/** @private */
const InternalNotification = React.forwardRef<HTMLDivElement, InternalNotificationProps>(
    function InternalNotification(
        {
            message,
            description,
            icon,
            action,
            autoDismissDelay,
            dismissLabel,
            showDismissButton = true,
            notificationId,
            onDismiss,
        },
        ref,
    ) {
        const [timeoutRunning, setTimeoutRunning] = React.useState(Boolean(autoDismissDelay))
        const timeoutRef = React.useRef<number | undefined>()

        const startTimeout = React.useCallback(function startTimeout() {
            setTimeoutRunning(true)
        }, [])

        const stopTimeout = React.useCallback(function stopTimeout() {
            setTimeoutRunning(false)
            clearTimeout(timeoutRef.current)
            timeoutRef.current = undefined
        }, [])

        React.useEffect(
            function setupAutoDismiss() {
                if (!timeoutRunning || !autoDismissDelay) return
                timeoutRef.current = window.setTimeout(() => {
                    onDismiss(notificationId)
                }, autoDismissDelay * 1000)
                return stopTimeout
            },
            [autoDismissDelay, onDismiss, notificationId, stopTimeout, timeoutRunning],
        )

        return (
            <Box
                ref={ref}
                width="fitContent"
                onMouseEnter={stopTimeout}
                onMouseLeave={startTimeout}
                className={styles.notification}
            >
                <Toast
                    message={message}
                    description={description}
                    icon={icon}
                    action={action}
                    onDismiss={showDismissButton ? () => onDismiss(notificationId) : undefined}
                    dismissLabel={dismissLabel}
                />
            </Box>
        )
    },
)

//
// Internal state and context
//

type InternalNotificationEntry = Omit<InternalNotificationProps, 'onDismiss'>
type NotificationsList = readonly InternalNotificationEntry[]

type ShowNotificationAction = (props: NotificationProps) => () => void
const NotificationContext = React.createContext<ShowNotificationAction>(() => () => undefined)

/**
 * The props needed by the NotificationsProvider component.
 *
 * @see NotificationsProvider
 */
type NotificationsProviderProps = {
    /**
     * The default label to apply to notification dismiss buttons.
     *
     * This is useful in environments that need locatization, so you do not need to pass the same
     * translated label every time you trigger a notification.
     *
     * However, you can still apply a different label to a specific notification, by passing a
     * different value when calling showNotification.
     *
     * @default 'Close'
     */
    defaultDismissLabel?: string

    /**
     * The default number of seconds after which the notification will be dismissed automatically.
     *
     * You can pass a different value to a specific notification when calling `showNotification`.
     * You can even pass `false` if you want a certain notification to never be dismissed
     * automatically.
     *
     * @default 10 (seconds)
     */
    defaultAutoDismissDelay?: number

    /**
     * The padding used to separate the notifications from the viewport borders.
     *
     * @default 'large'
     */
    padding?: Space

    /**
     * The app wrapped by the provider.
     */
    children: NonNullable<React.ReactNode>
}

/**
 * Provides the state management and rendering of the notifications currently active.
 *
 * You need to render this near the top of your app components tree, in order to `useNotifications`.
 *
 * @see useNotifications
 */
function NotificationsProvider({
    children,
    padding = 'large',
    defaultAutoDismissDelay = 10 /* seconds */,
    defaultDismissLabel = 'Close',
}: NotificationsProviderProps) {
    const [notifications, setNotifications] = React.useState<NotificationsList>([])
    const { mappedRef, animateRemove } = useNotificationsAnimation()

    const dismissNotification = React.useCallback(
        function onDismiss(notificationId: string) {
            animateRemove(notificationId, () => {
                setNotifications((list) => {
                    const index = list.findIndex((n) => n.notificationId === notificationId)
                    if (index < 0) return list
                    const copy = [...list]
                    copy.splice(index, 1)
                    return copy
                })
            })
        },
        [animateRemove],
    )

    const showNotification = React.useCallback(
        function showNotification(props: ToastProps) {
            const notificationId = generateElementId('notification')
            const newNotification: InternalNotificationEntry = {
                autoDismissDelay: defaultAutoDismissDelay,
                dismissLabel: defaultDismissLabel,
                ...props,
                notificationId,
            }
            setNotifications((list) => [...list, newNotification])
            return () => dismissNotification(notificationId)
        },
        [defaultAutoDismissDelay, defaultDismissLabel, dismissNotification],
    )

    return (
        <NotificationContext.Provider value={showNotification}>
            {children}
            <Portal>
                {notifications.length === 0 ? null : (
                    <Box
                        className={styles.stackedView}
                        position="fixed"
                        width="full"
                        paddingLeft={padding}
                        paddingBottom={padding}
                    >
                        <Stack space="medium">
                            {notifications.map(({ notificationId, ...props }) => (
                                <InternalNotification
                                    key={notificationId}
                                    ref={mappedRef(notificationId)}
                                    notificationId={notificationId}
                                    onDismiss={dismissNotification}
                                    {...props}
                                />
                            ))}
                        </Stack>
                    </Box>
                )}
            </Portal>
        </NotificationContext.Provider>
    )
}

/**
 * Provides a function `showNotification` that shows a new notification every time you call it.
 *
 * When called, `showNotification` returns a function that dismisses the notification when called.
 *
 * @see NotificationsProvider
 */
function useNotifications() {
    return React.useContext(NotificationContext)
}

/**
 * Renders a notification.
 *
 * Internally, this calls `showNotification`. It is provided for two reasons:
 *
 * 1. Convenience, when you want to fire a notification in markup/jsx code. Keep in mind, though,
 *    that notifications rendered in this way will be removed from view when ithe context where it
 *    is rendered is unmounted. Unlike notifications fired with `showNotification`, which will
 *    normally be dismissed, either by the user or after a delay.
 * 2. When combined with disabling dismissing it (e.g. `showDismissButton={false}` and
 *    `autoDismissDelay={false}` it provides a way to show "permanent" notifications that only go
 *    away when the component ceases to be rendered).
 *
 * This is useful for cases when the consumer wants to control when a notification is visible, and
 * to keep it visible based on an app-specific condition.
 *
 * Something important to note about this component is that it triggers the notification based on
 * the props passed when first rendered, and it does not update the notification if these props
 * change on subsequente renders. In this sense, this is an imperative component, more than a
 * descriptive one. This is done to simplify the internals, and to keep it in line with how
 * `showNotification` works: you fire up a notification imperatively, and you loose control over it.
 * It remains rendered according to the props you first passed.
 *
 * @see useNotifications
 */
function Notification(props: NotificationProps) {
    const showNotification = useNotifications()
    const propsRef = React.useRef<NotificationProps>(props)
    React.useEffect(() => {
        const dismissNotification = showNotification(propsRef.current)
        return dismissNotification
    }, [showNotification])
    return null
}

export { Notification, NotificationsProvider, useNotifications }
export type { NotificationProps, NotificationsProviderProps }
