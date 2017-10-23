import './styles/button.less'

import React from 'react'
import PropTypes from 'prop-types'
import ReactTooltip from 'react-tooltip'
import classNames from 'classnames'

class Button extends React.Component {
    constructor(props, context) {
        super(props, context)
        this._onClick = this._onClick.bind(this)
    }

    _onClick(event) {
        event.preventDefault()
        if (!this.props.disabled && this.props.onClick) {
            this.props.onClick()
        }
    }

    render() {
        const { data_tip } = this.props

        const className = classNames({
            reactist: true,
            button: true,
            secondary: this.props.secondary,
            small: this.props.small,
            white: this.props.white,
            loading: this.props.loading,
            danger: this.props.danger
        }, this.props.className)

        return (
            <button
                className={ className }
                disabled={ this.props.disabled }
                onClick={ this._onClick }
            >
                <div
                    data-tip={ data_tip }
                    className='wrapper'
                >
                    <span>{this.props.name}</span>
                </div>
                {data_tip && <ReactTooltip effect='solid' multiline />}
            </button>
        )
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
    name: PropTypes.string,
    /**
     * Function that is called when the button is clicked.
     * Is only invoked when disabled is not set.
     */
    onClick: PropTypes.func,
    /** Secondary style. */
    secondary: PropTypes.bool,
    /** Small style. */
    small: PropTypes.bool,
    /** White style. */
    white: PropTypes.bool,
    /** Loading style. */
    loading: PropTypes.bool,
    /** Disabled style. Prevents onClick from being called. */
    disabled: PropTypes.bool,
    /** Danger style. */
    danger: PropTypes.bool,
    /** Tooltip that is displayed on hover. */
    data_tip: PropTypes.string,
    /** Additional css class applied to the button. */
    className: PropTypes.string
}

export default Button
