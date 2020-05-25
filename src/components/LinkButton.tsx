import './styles/link_button.less'

import React from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'

/**
 * @typedef {Object} Props
 * @property {(event?: React.MouseEvent) => void} [onClick]
 * @property {boolean} [disabled]
 * @property {string} [className]
 * @property {React.ReactNode} [name]
 */

/** @extends {React.Component<Props>} */
class LinkButton extends React.Component<any, any> {
    public static displayName
    public static propTypes
    public static defaultProps

    /**
     * @param {React.MouseEvent} event
     */
    _handleClick = (event) => {
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
LinkButton.propTypes = {
    /** Name of the link button that should be displayed. */
    name: PropTypes.string.isRequired,
    /** Function that should be called when link button is clicked. No parameters are passed. */
    onClick: PropTypes.func,
    /** Disabled link buttons cannot be clicked. */
    disabled: PropTypes.bool,
    /** Additional css class applied to the link button. */
    className: PropTypes.string,
}

export default LinkButton
