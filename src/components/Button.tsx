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
     *
     * Note: the 'white' variant is considered deprecated. Use 'secondary' instead.
     */
    variant: 'primary' | 'secondary' | 'danger' | 'white'
    /**
     * The size of the button. If not provided it shows up in a normal size.
     */
    size?: 'default' | 'small' | 'large'
    /**
     * Tooltip that is displayed on hover.
     *
     * This replaces `title` which is not supported for these buttons to avoid confusion.
     */
    tooltip?: string
    /**
     * A flag to make outer elements know this button is meant to close something (e.g. in
     * Modal.Actions).
     *
     * @deprecated This is being removed in favor of being explicit in calling whatever action the
     *   button should perform when clicked.
     */
    close?: boolean
}

function Button({
    type = 'button',
    variant,
    size = 'default',
    loading = false,
    disabled = false,
    tooltip,
    onClick,
    children,
    ...props
}: Props) {
    const className = classNames(
        'reactist_button',
        `reactist_button--${variant}`,
        size !== 'default' ? `reactist_button--${size}` : null,
        { 'reactist_button--loading': loading },
        props.className,
    )

    const button = (
        <button
            {...props}
            type={type}
            className={className}
            disabled={disabled || loading}
            onClick={onClick}
        >
            {children}
        </button>
    )

    return tooltip ? <Tooltip text={tooltip}>{button}</Tooltip> : button
}

Button.displayName = 'Button'

Button.propTypes = {
    loading: PropTypes.bool,
    variant: PropTypes.oneOf(['primary', 'secondary', 'white', 'danger']).isRequired,
    size: PropTypes.oneOf(['default', 'small', 'large']),
    tooltip: PropTypes.string,
}

Button.defaultProps = {
    size: 'default',
    loading: false,
    disabled: false,
}

export default Button
