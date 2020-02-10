import './styles/time.less'

import React from 'react'
import PropTypes from 'prop-types'

import Tooltip from './Tooltip'

import TimeUtils from './utils/TimeUtils'

const DELAY = 60000

class Time extends React.Component {
    constructor(props, context) {
        super(props, context)

        this.refresh_interval = null

        this.state = {
            hovered: false,
            mouseX: null,
            mouseY: null
        }
    }

    componentDidMount() {
        if (this.props.refresh) {
            this._refresh()
        }
    }

    componentDidUpdate(prevProps) {
        if (!prevProps.refresh && this.props.refresh) {
            this._refresh()
        }

        if (prevProps.refresh && !this.props.refresh) {
            clearTimeout(this.refresh_interval)
        }
    }

    componentWillUnmount() {
        clearTimeout(this.refresh_interval)
    }

    _setHovered(hovered, event) {
        const { mouseX, mouseY } = this.state
        const { clientX, clientY } = event
        if (clientX !== mouseX || clientY !== mouseY) {
            // mouse has moved
            this.setState(() => ({
                hovered,
                mouseX: clientX,
                mouseY: clientY
            }))
        }
    }

    _renderTime(config) {
        if (this.state.hovered) {
            if (this.props.expandFullyOnHover && !this.props.tooltipOnHover) {
                return TimeUtils.formatTimeLong(this.props.time, config)
            }
            if (this.props.expandOnHover && !this.props.tooltipOnHover) {
                return TimeUtils.formatTime(this.props.time, config)
            }
        }
        return TimeUtils.timeAgo(this.props.time, config)
    }

    _refresh() {
        this.refresh_interval = setInterval(() => {
            this.forceUpdate()
        }, DELAY)
    }

    render() {
        let className = 'reactist_time'
        if (this.props.className) {
            className = this.props.className
        }

        const timeComponent = this._renderTime(this.props.config)

        return (
            <time
                className={className}
                onMouseEnter={event => this._setHovered(true, event)}
                onMouseLeave={event => this._setHovered(false, event)}
            >
                {this.props.tooltipOnHover ? (
                    <Tooltip
                        text={
                            this.props.tooltip ||
                            TimeUtils.formatTimeLong(
                                this.props.time,
                                this.props.config
                            )
                        }
                        delayShow={500}
                    >
                        {timeComponent}
                    </Tooltip>
                ) : (
                    timeComponent
                )}
            </time>
        )
    }
}
Time.displayName = 'Time'
Time.propTypes = {
    /** Additional css class applied to the time element. */
    className: PropTypes.string,
    /** UNIX timestamp of the time to display. */
    time: PropTypes.number.isRequired,
    /** When hovering over time it expands to short absolute version. */
    expandOnHover: PropTypes.bool,
    /** When hovering over time it expands to the full absolute version. */
    expandFullyOnHover: PropTypes.bool,
    /** When hovering over time it shows a tooltip with the full absolute version. */
    tooltipOnHover: PropTypes.bool,
    /** Refresh the component every DELAY seconds. */
    refresh: PropTypes.bool,
    /** If you don't want to use the default time format on the tooltip use this prop to supply a custom text */
    tooltip: PropTypes.string,
    /** Configuration for localization. */
    config: PropTypes.shape({
        locale: PropTypes.string,
        shortFormatCurrentYear: PropTypes.string,
        shortFormatPastYear: PropTypes.string,
        fullFormat: PropTypes.string,
        daysSuffix: PropTypes.string,
        hoursSuffix: PropTypes.string,
        minutesSuffix: PropTypes.string,
        momentsAgo: PropTypes.string
    })
}
Time.defaultProps = {
    expandOnHover: false,
    expandFullyOnHover: false,
    tooltipOnHover: false,
    refresh: true,
    config: {
        locale: 'en',
        daysSuffix: 'd',
        hoursSuffix: 'h',
        minutesSuffix: 'm',
        momentsAgo: 'moments ago'
    }
}

export default Time
