import './styles/link_button.less'

import React from 'react'
import classNames from 'classnames'

type Props = {
    /** Function that should be called when link button is clicked. No parameters are passed. */
    onClick?: (event?: React.MouseEvent) => void
    /** Disabled link buttons cannot be clicked. */
    disabled?: boolean
    /** Additional css class applied to the link button. */
    className?: string
    /** Name of the link button that should be displayed. */
    name: React.ReactNode
}

class LinkButton extends React.Component<Props> {
    public static displayName: string
    public static defaultProps: Partial<Props>

    _handleClick = (event: React.MouseEvent) => {
        event.preventDefault()
        if (!this.props.disabled && this.props.onClick) {
            this.props.onClick()
        }
    }

    render() {
        const className = classNames(
            'reactist_link_button',
            {
                disabled: this.props.disabled,
            },
            this.props.className
        )
        return (
            /* eslint-disable jsx-a11y/anchor-is-valid */
            <a className={className} href="" onClick={this._handleClick}>
                {this.props.name}
            </a>
            /* eslint-enable jsx-a11y/anchor-is-valid */
        )
    }
}
LinkButton.displayName = 'LinkButton'
LinkButton.defaultProps = {
    disabled: false,
}

export default LinkButton
