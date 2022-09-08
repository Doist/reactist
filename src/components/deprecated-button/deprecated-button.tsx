import * as React from 'react'
import classNames from 'classnames'

import { Tooltip } from '../tooltip'

import './deprecated-button.less'

type NativeButtonProps = React.DetailedHTMLProps<
    React.ButtonHTMLAttributes<HTMLButtonElement>,
    HTMLButtonElement
>

/** @deprecated */
export type ButtonVariant = 'primary' | 'secondary' | 'danger' | 'link'

/** @deprecated */
export type ButtonSize = 'default' | 'small' | 'large'

/** @deprecated */
export type ButtonProps = Omit<NativeButtonProps, 'title' | 'ref'> & {
    /**
     * Loading style. When true it disables the button, but it also adds a visual indication of
     * some in-progress operation going on.
     */
    loading?: boolean
    /**
     * Controls visually how the button shows up from a predefined set of kinds of buttons.
     */
    variant?: ButtonVariant
    /**
     * The size of the button. If not provided it shows up in a normal size.
     */
    size?: ButtonSize
    /**
     * Tooltip that is displayed on hover.
     *
     * This replaces `title` which is not supported for these buttons to avoid confusion.
     */
    tooltip?: React.ReactNode
}

/**
 * @deprecated
 */
const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(function Button(
    {
        type = 'button',
        variant,
        size = 'default',
        loading = false,
        disabled = false,
        tooltip,
        onClick,
        children,
        ...props
    },
    ref,
) {
    const className = classNames(
        'reactist_button',
        variant ? `reactist_button--${variant}` : null,
        size !== 'default' ? `reactist_button--${size}` : null,
        { 'reactist_button--loading': loading },
        props.className,
    )

    const button = (
        <button
            {...props}
            ref={ref}
            type={type}
            className={className}
            aria-disabled={disabled || loading}
            onClick={disabled || loading ? undefined : onClick}
        >
            {children}
        </button>
    )

    return tooltip ? <Tooltip content={tooltip}>{button}</Tooltip> : button
})

Button.displayName = 'Button'

Button.defaultProps = {
    size: 'default',
    loading: false,
    disabled: false,
}

export { Button }
