import React from 'react'
import classNames from 'classnames'
import CloseIcon from '../icons/CloseIcon.svg'
import './notification.less'

type NotificationProps = {
    id: string
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
    id,
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
    const titleId = title ? `${id}-title` : null
    const subtitleId = subtitle ? `${id}-subtitle` : null
    const ariaLabelledBy = titleId ? { 'aria-labelledby': titleId } : null
    const ariaDescribedBy = subtitleId ? { 'aria-describedby': subtitleId } : null

    const notificationContent = children ?? (
        <div
            className={classNames(
                'reactist-notification__content',
                customClassNames?.notificationContent ?? '',
            )}
        >
            {title ? (
                <h3
                    id={titleId ?? ''}
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
                    id={subtitleId ?? ''}
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
            id={id}
            role="dialog"
            className={classNames(
                'reactist-notification',
                customClassNames?.notificationContainer ?? '',
                {
                    'reactist-notification--with-button': Boolean(onClick),
                },
            )}
            {...ariaLabelledBy}
            {...ariaDescribedBy}
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
