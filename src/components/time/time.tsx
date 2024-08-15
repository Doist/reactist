import { Component } from 'react'
import { Tooltip } from '../../tooltip'
import { TimeUtils, type TimeConfig } from './time-utils'

import './time.less'

const DELAY = 60000

type Props = {
    /** UNIX timestamp of the time to display. */
    time?: number
    /** Configuration for localization. */
    config?: TimeConfig
    /** Additional css class applied to the time element. */
    className?: string
    tooltipOnHover?: boolean
    /** Refresh the component every DELAY seconds. */
    refresh?: boolean
    /** If you don't want to use the default time format on the tooltip use this prop to supply a custom text */
    tooltip?: React.ReactNode
    /** When hovering over time it expands to short absolute version. */
    expandOnHover?: boolean
    /** When hovering over time it expands to the full absolute version. */
    expandFullyOnHover?: boolean
}

type State = {
    hovered: boolean
    mouseX?: number
    mouseY?: number
}

class Time extends Component<Props, State> {
    public static displayName: string
    public static defaultProps: Props

    constructor(props: Props) {
        super(props)
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

    componentDidUpdate(prevProps: Props) {
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

    refreshInterval?: ReturnType<typeof setTimeout>

    _setHovered(hovered: boolean, event: React.MouseEvent) {
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

    _renderTime(config: Props['config']) {
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

        return (
            <time
                className={className}
                onMouseEnter={(event) => this._setHovered(true, event)}
                onMouseLeave={(event) => this._setHovered(false, event)}
            >
                {this.props.tooltipOnHover ? (
                    <Tooltip
                        content={
                            this.props.tooltip ||
                            (this.props.time &&
                                TimeUtils.formatTimeLong(this.props.time, this.props.config))
                        }
                    >
                        <span>{timeComponent}</span>
                    </Tooltip>
                ) : (
                    timeComponent
                )}
            </time>
        )
    }
}
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
