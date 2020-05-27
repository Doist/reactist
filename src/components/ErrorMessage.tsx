import './styles/error_message.less'

import React from 'react'

type Props = {
    timeout?: number
    onHide?: () => void
    message?: string
}

type State = {
    visible: boolean
}

class ErrorMessage extends React.Component<Props, State> {
    public static displayName: string
    public static defaultProps: Props

    constructor(props: Props, context: unknown) {
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
    UNSAFE_componentWillReceiveProps(next_props: Props) {
        if (this._isValidMessage(next_props.message)) {
            this.setState(() => ({ visible: true }))
            this._triggerDelayedHide()
        }
    }
    /* eslint-enable @typescript-eslint/camelcase */

    timeout?: NodeJS.Timeout

    /**
     * @param {string} message
     */
    _isValidMessage(message?: string) {
        return typeof message === 'string' && message.length > 0
    }

    _clearTimeout = () => {
        this.timeout && clearTimeout(this.timeout)
    }

    _triggerDelayedHide = () => {
        this._clearTimeout()
        this.timeout = setTimeout(this._hide, this.props.timeout)
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

export default ErrorMessage
