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

    _renderTime() {
        if (this.state.hovered) {
            if (this.props.expandFullyOnHover) {
                return TimeUtils.formatTimeLong(this.props.time)
            }
            if (this.props.expandOnHover) {
                return TimeUtils.formatTime(this.props.time)
            }
        }
        return TimeUtils.timeAgo(this.props.time)
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
                {this._renderTime()}
            </time>
        )
    }
}
Time.propTypes = {
    className: PropTypes.string,
    time: PropTypes.number.isRequired,
    expandOnHover: PropTypes.bool,
    expandFullyOnHover: PropTypes.bool
}
Time.defaultProps = {
    expandOnHover: false,
    expandFullyOnHover: false
}

export default Time
