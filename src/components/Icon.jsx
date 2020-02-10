import './styles/icon.less'

import React from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'

import Tooltip from './Tooltip'
import ThreeDotsIcon from './icons/ThreeDotsIcon.svg'

class Icon extends React.Component {
    constructor(props, context) {
        super(props, context)

        this.state = { hovered: false }
    }

    _onClick = event => {
        event.preventDefault()

        if (this.props.onClick && !this.props.disabled) {
            this.props.onClick()
        }
    }

    _hover = () => {
        this.setState(() => ({ hovered: true }))
    }
    _unhover = () => {
        this.setState(() => ({ hovered: false }))
    }

    render() {
        const { image, hoveredImage, icon, tooltip, disabled } = this.props
        const className = classNames(
            'reactist_icon',
            {
                'reactist_icon--component': !image,
                disabled
            },
            this.props.className
        )

        const style =
            image &&
            (this.state.hovered && hoveredImage
                ? { backgroundImage: `url(${hoveredImage})` }
                : { backgroundImage: `url(${image})` }) // only apply style for image components
        const iconComponent =
            !image &&
            (icon ? (
                icon
            ) : (
                <ThreeDotsIcon
                    color={this.state.hovered ? '#474747' : undefined}
                />
            )) // only set icon component for non-image components

        const component = (
            <a
                href="#"
                style={style}
                onClick={this._onClick}
                className={className}
                onMouseEnter={this._hover}
                onMouseLeave={this._unhover}
            >
                {iconComponent && iconComponent}
            </a>
        )
        return tooltip ? (
            <Tooltip text={tooltip}>{component}</Tooltip>
        ) : (
            component
        )
    }
}
Icon.displayName = 'Icon'
Icon.defaultProps = {
    disabled: false
}
Icon.propTypes = {
    /** URL to the image that should be displayed as icon. */
    image: PropTypes.string,
    /** Optional URL to the image that should be displayed when the icon is hovered. */
    hoveredImage: PropTypes.string,
    /** Callback that is called when icon is clicked. */
    onClick: PropTypes.func,
    /** Text of the tooltip of the icon. */
    tooltip: PropTypes.string,
    /** Whether hte icon is disabled. Disabled icons can't be clicked and displayed with less opacity. */
    disabled: PropTypes.bool,
    /** Icon component to render, defaults to three dots. */
    icon: PropTypes.element,
    /** Additional css class that is applied to the icon */
    className: PropTypes.string
}

export default Icon
