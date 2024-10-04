import * as React from 'react'
import { Tooltip } from '../../tooltip/tooltip.js'
import { TimeUtils } from './time-utils.js'

const DELAY = 60000

class Time extends React.Component {
    constructor(props) {
        super(props)
        this.refreshInterval = void 0
        this.refreshInterval = undefined
        this.state = {
            hovered: false,
            mouseX: undefined,
            mouseY: undefined,
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
            if (this.refreshInterval) {
                clearTimeout(this.refreshInterval)
            }
        }
    }

    componentWillUnmount() {
        if (this.refreshInterval) {
            clearTimeout(this.refreshInterval)
        }
    }

    _setHovered(hovered, event) {
        const { mouseX, mouseY } = this.state
        const { clientX, clientY } = event

        if (clientX !== mouseX || clientY !== mouseY) {
            // mouse has moved
            this.setState(() => ({
                hovered,
                mouseX: clientX,
                mouseY: clientY,
            }))
        }
    }

    _renderTime(config) {
        if (!this.props.time) {
            return
        }

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
        this.refreshInterval = setInterval(() => {
            this.forceUpdate()
        }, DELAY)
    }

    render() {
        let className = 'reactist_time'

        if (this.props.className) {
            className = this.props.className
        }

        const timeComponent = this._renderTime(this.props.config)

        return /*#__PURE__*/ React.createElement(
            'time',
            {
                className: className,
                onMouseEnter: (event) => this._setHovered(true, event),
                onMouseLeave: (event) => this._setHovered(false, event),
            },
            this.props.tooltipOnHover
                ? /*#__PURE__*/ React.createElement(
                      Tooltip,
                      {
                          content:
                              this.props.tooltip ||
                              (this.props.time &&
                                  TimeUtils.formatTimeLong(this.props.time, this.props.config)),
                      },
                      /*#__PURE__*/ React.createElement('span', null, timeComponent),
                  )
                : timeComponent,
        )
    }
}

Time.displayName = void 0
Time.defaultProps = void 0
Time.displayName = 'Time'
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
        momentsAgo: 'moments ago',
    },
}

export { Time }
//# sourceMappingURL=time.js.map
