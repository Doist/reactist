import './styles/error_message.less'

import React from 'react'
import PropTypes from 'prop-types'

/**
 * @typedef {Object} Props
 * @property {number} timeout
 * @property {() => void} [onHide]
 * @property {string} message
 */

/** @extends {React.Component<Props>} */
class ErrorMessage extends React.Component<any, any> {
    public static displayName
    public static propTypes
    public static defaultProps

    /**
     * @param {Props} props
     * @param {unknown} context
     */
    constructor(props, context) {
        super(props, context)

        /* eslint-disable @typescript-eslint/camelcase */
        const is_valid_message = this._isValidMessage(props.message)
        if (is_valid_message) {
            this._triggerDelayedHide()
        }
        this.state = { visible: is_valid_message }
        /* eslint-enable @typescript-eslint/camelcase */
    }

    /**
     * @param {Props} next_props
     */
    /* eslint-disable @typescript-eslint/camelcase */
    UNSAFE_componentWillReceiveProps(next_props) {
        if (this._isValidMessage(next_props.message)) {
            this.setState(() => ({ visible: true }))
            this._triggerDelayedHide()
        }
    }
    /* eslint-enable @typescript-eslint/camelcase */

    /**
     * @param {string} message
     */
    _isValidMessage(message) {
        return message && message.length > 0
    }

    _clearTimeout = () => {
        ;(this as any).timeout && clearTimeout((this as any).timeout)
    }

    _triggerDelayedHide = () => {
        ;(this as any)._clearTimeout()
        ;(this as any).timeout = setTimeout(this._hide, this.props.timeout)
    }

    _hide = () => {
        this._clearTimeout()
        this.setState(() => ({ visible: false }))
        this.props.onHide && this.props.onHide()
    }

    render() {
        const { message } = this.props
        if (!this.state.visible || !this._isValidMessage(message)) {
            return false
        }

        return (
            <div className="reactist_error_message">
                <p>{message}</p>
                <div onClick={this._hide} className="dismiss_icon" />
            </div>
        )
    }
}
ErrorMessage.displayName = 'ErrorMessage'
ErrorMessage.defaultProps = {
    timeout: 2500,
}
ErrorMessage.propTypes = {
    /** Message to be displayed. This component only renders when message is set. */
    message: PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.arrayOf(PropTypes.node),
        PropTypes.node,
    ]),
    /** Timeout after the error message disappears (in ms). */
    timeout: PropTypes.number,
    /** Optional callback that is invoked when the error message disappears. */
    onHide: PropTypes.func,
}

export default ErrorMessage
