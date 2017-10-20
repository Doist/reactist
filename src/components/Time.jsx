import './styles/time.less'

import React from 'react'
import PropTypes from 'prop-types'

import TimeUtils from './utils/TimeUtils'

class Time extends React.Component {
    constructor(props, context) {
        super(props, context)

        this.state = {
            hovered: false
        }
    }

    _setHovered(hovered) {
        this.setState(() => ({ hovered: hovered }))
    }

    _renderTime(config) {
        if (this.state.hovered) {
            if (this.props.expandFullyOnHover) {
                return TimeUtils.formatTimeLong(this.props.time, config.locale)
            }
            if (this.props.expandOnHover) {
                return TimeUtils.formatTime(this.props.time, config.locale)
            }
        }
        return TimeUtils.timeAgo(this.props.time, config)
    }

    render() {
        let className = 'reactist time'
        if (this.props.className) {
            className = this.props.className
        }

        return (
            <time
                className={ className }
                onMouseEnter={ () => this._setHovered(true) }
                onMouseLeave={ () => this._setHovered(false) }
            >
                {this._renderTime(this.props.config)}
            </time>
        )
    }
}
Time.displayName = 'Time'
Time.propTypes = {
    /**
     * Additional css class applied to the time element.
     */
    className: PropTypes.string,
    /**
     * UNIX timestamp of the time to display.
     */
    time: PropTypes.number.isRequired,
    /**
     * When hovering over time it expands to short absolute version.
     */
    expandOnHover: PropTypes.bool,
    /**
     * When hovering over time it expands to the full absolute version.
     */
    expandFullyOnHover: PropTypes.bool,
    /**
     * Configuration for localization.
     */
    config: PropTypes.shape({
        locale: PropTypes.string,
        hoursSuffix: PropTypes.string,
        minutesSuffix: PropTypes.string,
        momentsAgo: PropTypes.string
    })
}
Time.defaultProps = {
    expandOnHover: false,
    expandFullyOnHover: false,
    config: {
        locale: 'en',
        hoursSuffix: 'h',
        minutesSuffix: 'm',
        momentsAgo: 'moments ago'
    }
}

export default Time
