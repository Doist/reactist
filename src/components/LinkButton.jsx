import './styles/link_button.less'

import React from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'

class LinkButton extends React.Component {
    _handleClick = event => {
        event.preventDefault()
        if (!this.props.disabled && this.props.onClick) {
            this.props.onClick()
        }
    }

    render() {
        const className = classNames(
            'reactist_link_button',
            {
                disabled: this.props.disabled
            },
            this.props.className
        )
        return (
            <a className={className} href="" onClick={this._handleClick}>
                {this.props.name}
            </a>
        )
    }
}
LinkButton.displayName = 'LinkButton'
LinkButton.defaultProps = {
    disabled: false
}
LinkButton.propTypes = {
    /** Name of the link button that should be displayed. */
    name: PropTypes.string.isRequired,
    /** Function that should be called when link button is clicked. No parameters are passed. */
    onClick: PropTypes.func,
    /** Disabled link buttons cannot be clicked. */
    disabled: PropTypes.bool,
    /** Additional css class applied to the link button. */
    className: PropTypes.string
}

export default LinkButton
