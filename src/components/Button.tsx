import './styles/button.less'

import React from 'react'
import classNames from 'classnames'

import Tooltip from './Tooltip'

type Props = {
    /**
     * Function that is called when the button is clicked.
     * Is only invoked when disabled is not set.
     */
    onClick?: (event?: React.MouseEvent) => void
    /** Disabled style. Prevents onClick from being called. */
    disabled?: boolean
    /** Loading style. Prevents onClick from being called. */
    loading?: boolean
    className?: string
    /** Secondary style. */
    secondary?: boolean
    /** Small style. */
    small?: boolean
    /** White style. */
    white?: boolean
    /** Large style. */
    large?: boolean
    /** Danger style. */
    danger?: boolean
    /** Tooltip that is displayed on hover. */
    data_tip?: string
    /** Text that is displayed on the button. */
    name?: React.ReactNode
    close?: boolean
}

class Button extends React.Component<
    Props & React.ButtonHTMLAttributes<HTMLButtonElement>
> {
    public static displayName: string
    public static defaultProps: Props

    _onClick = (event: React.MouseEvent) => {
        event.preventDefault()
        if (!this.props.disabled && !this.props.loading && this.props.onClick) {
            this.props.onClick()
        }
    }

    render() {
        const {
            className,
            secondary,
            small,
            large,
            white,
            loading,
            danger,
            disabled,
            name,
            //eslint-disable-next-line @typescript-eslint/camelcase
            data_tip,
            ...extraProps
        } = this.props

        delete extraProps.onClick
        const buttonClass = classNames(
            'reactist_button',
            {
                secondary,
                small,
                large,
                white,
                busy: loading,
                danger,
            },
            className
        )

        const button = (
            <button
                className={buttonClass}
                disabled={disabled}
                onClick={this._onClick}
                {...extraProps}
            >
                <div className="wrapper">
                    <span>{name}</span>
                </div>
            </button>
        )

        // conditionally wrap into tooltip
        //eslint-disable-next-line @typescript-eslint/camelcase
        return data_tip ? <Tooltip text={data_tip}>{button}</Tooltip> : button
    }
}
Button.displayName = 'Button'
Button.defaultProps = {
    secondary: false,
    small: false,
    white: false,
    loading: false,
    disabled: false,
    danger: false,
}

export default Button
