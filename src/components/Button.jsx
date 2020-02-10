import './styles/button.less'

import React from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'

import Tooltip from './Tooltip'

class Button extends React.Component {
    _onClick = event => {
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
                danger
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
    danger: false
}
Button.propTypes = {
    /** Text that is displayed on the button. */
    name: PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.arrayOf(PropTypes.node),
        PropTypes.node
    ]),
    /**
     * Function that is called when the button is clicked.
     * Is only invoked when disabled is not set.
     */
    onClick: PropTypes.func,
    /** Secondary style. */
    secondary: PropTypes.bool,
    /** Small style. */
    small: PropTypes.bool,
    /** Large style. */
    large: PropTypes.bool,
    /** White style. */
    white: PropTypes.bool,
    /** Loading style. Prevents onClick from being called. */
    loading: PropTypes.bool,
    /** Disabled style. Prevents onClick from being called. */
    disabled: PropTypes.bool,
    /** Danger style. */
    danger: PropTypes.bool,
    /** Tooltip that is displayed on hover. */
    data_tip: PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.arrayOf(PropTypes.node),
        PropTypes.node
    ]),
    /** Additional css class applied to the button. */
    className: PropTypes.string
}

export default Button
