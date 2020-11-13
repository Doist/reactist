import React from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'
import { Tooltip } from './Tooltip'
import './styles/button.less'

type NativeButtonProps = React.DetailedHTMLProps<
    React.ButtonHTMLAttributes<HTMLButtonElement>,
    HTMLButtonElement
>

export type ButtonVariant = 'primary' | 'secondary' | 'danger' | 'link'

export type ButtonSize = 'default' | 'small' | 'large'

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
            disabled={disabled || loading}
            onClick={onClick}
        >
            {children}
        </button>
    )

    return tooltip ? <Tooltip content={tooltip}>{button}</Tooltip> : button
})

Button.displayName = 'Button'

Button.propTypes = {
    loading: PropTypes.bool,
    variant: PropTypes.oneOf(['primary', 'secondary', 'danger', 'link']),
    size: PropTypes.oneOf(['default', 'small', 'large']),
    tooltip: PropTypes.node,
}

Button.defaultProps = {
    size: 'default',
    loading: false,
    disabled: false,
}

export default Button
