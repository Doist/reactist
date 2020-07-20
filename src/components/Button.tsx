import React from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'
import Tooltip from './Tooltip'
import './styles/button.less'

type NativeButtonProps = React.DetailedHTMLProps<
    React.ButtonHTMLAttributes<HTMLButtonElement>,
    HTMLButtonElement
>

type Props = Omit<NativeButtonProps, 'title'> & {
    /**
     * Loading style. When true it disables the button, but it also adds a visual indication of
     * some in-progress operation going on.
     */
    loading?: boolean
    /**
     * Controls visually how the button shows up from a predefined set of kinds of buttons.
     */
    variant?: 'primary' | 'secondary' | 'danger' | 'link'
    /**
     * The size of the button. If not provided it shows up in a normal size.
     */
    size?: 'default' | 'small' | 'large'
    /**
     * Tooltip that is displayed on hover.
     *
     * This replaces `title` which is not supported for these buttons to avoid confusion.
     */
    tooltip?: React.ReactNode
}

const Button = React.forwardRef<HTMLButtonElement, Props>(function Button(
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

    return tooltip ? <Tooltip text={tooltip}>{button}</Tooltip> : button
})

Button.displayName = 'Button'

Button.propTypes = {
    loading: PropTypes.bool,
    variant: PropTypes.oneOf(['primary', 'secondary', 'danger', 'link']),
    size: PropTypes.oneOf(['default', 'small', 'large']),
    tooltip: PropTypes.string,
}

Button.defaultProps = {
    size: 'default',
    loading: false,
    disabled: false,
}

export default Button
