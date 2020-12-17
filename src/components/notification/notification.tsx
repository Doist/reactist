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
    onClick?: (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void
    onClose?: (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void
    closeAltText?: string
    className?: string
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
    closeAltText = 'Close',
    className,
    ...rest
}: NotificationProps) {
    const titleId = title ? `${id}-title` : null
    const subtitleId = subtitle ? `${id}-subtitle` : null
    const contentId = children ? `${id}-content` : null
    const ariaLabelledBy =
        children && contentId
            ? { 'aria-labelledby': contentId }
            : titleId
            ? { 'aria-labelledby': titleId }
            : null
    const ariaDescribedBy = subtitleId && !children ? { 'aria-describedby': subtitleId } : null

    const notificationContent = (
        <div id={contentId ?? ''} className="reactist-notification__content">
            {children ?? (
                <>
                    {title ? (
                        <h3 id={titleId ?? ''} className="reactist-notification__title">
                            {title}
                        </h3>
                    ) : null}
                    {subtitle ? (
                        <p id={subtitleId ?? ''} className="reactist-notification__subtitle">
                            {subtitle}
                        </p>
                    ) : null}
                </>
            )}
        </div>
    )
    const notificationBody = (
        <div className="reactist-notification__icon-content-group">
            {icon ?? null}
            {notificationContent}
        </div>
    )

    return (
        <div
            id={id}
            role="dialog"
            className={classNames('reactist-notification', className, {
                'reactist-notification--with-button': Boolean(onClick),
                'reactist-notification--with-close-button': Boolean(onClose),
            })}
            {...ariaLabelledBy}
            {...ariaDescribedBy}
            {...rest}
        >
            {onClick ? (
                <button className="reactist-notification__button" onClick={onClick}>
                    {notificationBody}
                </button>
            ) : (
                notificationBody
            )}

            {onClose ? (
                <button
                    className="reactist-notification__close-button"
                    onClick={onClose}
                    aria-label={closeAltText}
                >
                    {customCloseButton ?? <CloseIcon />}
                </button>
            ) : null}
        </div>
    )
}

export { Notification }
