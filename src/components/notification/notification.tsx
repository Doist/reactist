import React from 'react'
import classNames from 'classnames'
import CloseIcon from '../icons/CloseIcon.svg'
import './notification.less'

type NotificationProps = {
    icon?: React.ReactNode
    title?: React.ReactNode
    subtitle?: React.ReactNode
    children?: React.ReactNode
    customCloseButton?: React.ReactNode
    onClick?: () => void
    onClose?: () => void
    customClassNames?: {
        notificationContainer?: string
        notificationButton?: string
        notificationIconContentGroup?: string
        notificationContent?: string
        title?: string
        subtitle?: string
        closeButton?: string
    }
} & JSX.IntrinsicElements['div']

function Notification({
    icon,
    title,
    subtitle,
    children,
    customCloseButton,
    onClick,
    onClose,
    customClassNames,
    ...rest
}: NotificationProps) {
    const notificationContent = children ?? (
        <div
            className={classNames(
                'reactist-notification__content',
                customClassNames?.notificationContent ?? '',
            )}
        >
            {title ? (
                <h3
                    className={classNames(
                        'reactist-notification__title',
                        customClassNames?.title ?? '',
                    )}
                >
                    {title}
                </h3>
            ) : null}
            {subtitle ? (
                <p
                    className={classNames(
                        'reactist-notification__subtitle',
                        customClassNames?.subtitle ?? '',
                    )}
                >
                    {subtitle}
                </p>
            ) : null}
        </div>
    )
    const notificationBody = (
        <>
            <div
                className={classNames(
                    'reactist-notification__icon-content-group',
                    customClassNames?.notificationIconContentGroup ?? '',
                )}
            >
                {icon ?? null}
                {notificationContent}
            </div>
            {onClose ? (
                <button
                    className={classNames(
                        'reactist-notification__close-button',
                        customClassNames?.closeButton ?? '',
                    )}
                    onClick={onClose}
                >
                    {customCloseButton ?? <CloseIcon />}
                </button>
            ) : null}
        </>
    )

    return (
        <div
            role="dialog"
            className={classNames(
                'reactist-notification',
                customClassNames?.notificationContainer ?? '',
                {
                    'reactist-notification--with-button': Boolean(onClick),
                },
            )}
            {...rest}
        >
            {onClick ? (
                <button
                    className={classNames(
                        'reactist-notification__button',
                        customClassNames?.notificationButton ?? '',
                    )}
                    onClick={onClick}
                >
                    {notificationBody}
                </button>
            ) : (
                notificationBody
            )}
        </div>
    )
}

export { Notification }
