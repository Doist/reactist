import './styles/tooltip.less'

import React from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'
import {
    hasEnoughSpace,
    calculatePosition
} from './utils/PositioningUtils'

class Tooltip extends React.Component {
    constructor(props, context) {
        super(props, context)
        this.state = { visible: false }
    }

    shouldComponentUpdate(nextProps, nextState) {
        // only update on state or prop changes
        return this.state.visible !== nextState.visible ||
            this.props.position !== nextProps.position ||
            this.props.text !== nextProps.text ||
            this.props.hideOnScroll !== nextProps.hideOnScroll ||
            this.props.delayShow !== nextProps.delayShow ||
            this.props.delayHide !== nextProps.delayHide ||
            this.props.children !== nextProps.children
    }

    componentDidUpdate() {
        if (this.wrapper && this.state.visible) {
            // Interact with the DOM after a state update
            this._updateTooltipPosition()
        }
    }

    componentWillUnmount() {
        this._clearDelayTimeout()
        this._removeScrollListener()
    }

    _initScrollListener() {
        document.addEventListener('scroll', this._hide)
    }

    _removeScrollListener() {
        document.removeEventListener('scroll', this._hide)
    }

    _clearDelayTimeout() {
        if (this.delayTimeout) {
            clearTimeout(this.delayTimeout)
        }
    }

    _show = () => {
        this._delayAction(() => {
            this.setState(() => ({ visible: true }))
            if (this.props.hideOnScroll) {
                this._initScrollListener()
            }
        }, this.props.delayShow)
    }
    _hide = () => {
        this._delayAction(() => {
            this._clearDelayTimeout()
            this.setState(() => ({ visible: false }))
            if (this.props.hideOnScroll) {
                this._removeScrollListener()
            }
        }, this.props.delayHide)
    }

    _delayAction(actionFn, delay) {
        this._clearDelayTimeout()
        this.delayTimeout = setTimeout(actionFn, delay)
    }

    _updateTooltipPosition = () => {
        const { position, allowVaguePositioning } = this.props
        const gapSize = 5 // size of the arrow (see `tooltip.less`)
        const wrapperRect = this.wrapper.getBoundingClientRect()
        const tooltipRect = this.tooltip.getBoundingClientRect()

        const windowDimensions = {
            height: Math.max(document.documentElement.clientHeight, window.innerHeight),
            width: Math.max(document.documentElement.clientWidth, window.innerWidth)
        }
        const tooltipDimensions = {
            height: tooltipRect.height,
            width: tooltipRect.width
        }
        const wrapperDimensions = {
            height: wrapperRect.height,
            width: wrapperRect.width
        }
        const wrapperPosition = {
            x: wrapperRect.x,
            y: wrapperRect.y
        }

        const positionsToTry = position === 'auto'
            ? ['top', 'right', 'bottom', 'left', 'top']
            : [position]

        for (let index = 0; index < positionsToTry.length; index++) {
            const currentPosition = positionsToTry[index]
            const enoughSpaceAtPosition = hasEnoughSpace(windowDimensions, tooltipDimensions, wrapperDimensions, wrapperPosition, currentPosition, gapSize)

            if (enoughSpaceAtPosition || index === positionsToTry.length - 1) {
                const tooltipPosition = calculatePosition(currentPosition, wrapperDimensions, wrapperPosition, tooltipDimensions, gapSize)
                this.tooltip.style.top = `${tooltipPosition.y}px`
                this.tooltip.style.left = tooltipPosition.x < 0 && allowVaguePositioning
                    ? `${2 * gapSize}px` // not centered but fully visible
                    : `${tooltipPosition.x}px`

                if (currentPosition !== position) {
                    this.tooltip.className = this._getClassNameForPosition(currentPosition)
                }
                break
            }
        }
    }

    _getClassNameForPosition = (position) => {
        const { visible } = this.state
        const { tooltipClassName } = this.props
        const className = classNames('reactist tooltip', { visible }, tooltipClassName)
        if (visible) {
            return classNames(className, {
                arrow_top: position === 'bottom',
                arrow_right: position === 'left',
                arrow_bottom: position === 'auto' || position === 'top',
                arrow_left: position === 'right'
            })
        }
        return className
    }

    render() {
        if (!this.props.text) {
            return (
                <div className='reactist tooltip__wrapper'>
                    { this.props.children }
                </div>
            )
        }

        const tooltipClass = this._getClassNameForPosition(this.props.position)
        const wrapperClass = classNames('reactist tooltip__wrapper', this.props.wrapperClassName)
        return (
            <span
                className={ wrapperClass }
                onMouseEnter={ this._show }
                onMouseLeave={ this._hide }
                ref={ wrapper => this.wrapper = wrapper }
            >
                { this.props.children }
                <span className={ tooltipClass } ref={ tooltip => this.tooltip = tooltip }>
                    <span className='tooltip__text'>{ this.props.text }</span>
                </span>
            </span>
        )
    }
}
Tooltip.displayName = 'Tooltip'
Tooltip.defaultProps = {
    position: 'auto',
    hideOnScroll: true,
    delayShow: 1000,
    delayHide: 0,
    allowVaguePositioning: false
}
Tooltip.propTypes = {
    /**
     * Position of the tooltip. Defaults to `auto`.
     * `auto` tries to position the tooltip to the top,
     * if there's not enough space it tries to position the tooltip clockwise (right, bottom, left).
     * Setting a distinct value like `right` will always position the tooltip right, regardless of available space.
     */
    position: PropTypes.oneOf(['auto', 'top', 'right', 'bottom', 'left']),
    /**
     * Whether vague positioning is allowed. When set to true the tooltip prefers to be fully visible over being correctly centered.
     */
    allowVaguePositioning: PropTypes.bool,
    /** Text that is displayed inside the tooltip */
    text: PropTypes.string.isRequired,
    /** Delay before the tooltip appears and disappears (in ms). */
    /** Set whether scrolling should hide the tooltip or not. */
    hideOnScroll: PropTypes.bool,
    /** How long to wait after hovering before the tooltip is shown (in ms). */
    delayShow: PropTypes.number,
    /** How long to wait after unhovering before the tooltip is hidden (in ms). */
    delayHide: PropTypes.number,
    /** Children that are wrapped by the toolip. */
    children: PropTypes.oneOfType([
        PropTypes.arrayOf(PropTypes.node),
        PropTypes.node
    ]),
    /** Additional css class that is applied to the wrapper element. */
    wrapperClassName: PropTypes.string,
    /** Additional css class that is applied to the tooltip element. */
    tooltipClassName: PropTypes.string
}

export default Tooltip
