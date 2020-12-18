import React from 'react'

import './error-message.less'

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

        const isValidMessage = this._isValidMessage(props.message)
        if (isValidMessage) {
            this._triggerDelayedHide()
        }
        this.state = { visible: isValidMessage }
    }

    UNSAFE_componentWillReceiveProps(nextProps: Props) {
        if (this._isValidMessage(nextProps.message)) {
            this.setState(() => ({ visible: true }))
            this._triggerDelayedHide()
        }
    }

    timeout?: number

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

export { ErrorMessage }
