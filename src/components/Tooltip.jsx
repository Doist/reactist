import './styles/tooltip.less'

import React from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'

import Popover from './Popover'

class Tooltip extends React.Component {
    state = { visible: false }

    shouldComponentUpdate(nextProps, nextState) {
        // only update on state or prop changes
        return (
            this.state.visible !== nextState.visible ||
            this.props.position !== nextProps.position ||
            this.props.text !== nextProps.text ||
            this.props.hideOnScroll !== nextProps.hideOnScroll ||
            this.props.delayShow !== nextProps.delayShow ||
            this.props.delayHide !== nextProps.delayHide ||
            this.props.gapSize !== nextProps.gapSize ||
            this.props.children !== nextProps.children
        )
    }

    componentWillUnmount() {
        this._clearDelayTimeout()
        this._removeScrollListener()
    }

    _initScrollListener() {
        document.addEventListener('scroll', this._hide, true)
    }

    _removeScrollListener() {
        document.removeEventListener('scroll', this._hide, true)
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

    _updateTooltipRef = tooltip => {
        this.tooltip = tooltip
    }

    _updateWrapperRef = wrapper => {
        this.wrapper = wrapper
    }

    render() {
        const {
            position,
            allowVaguePositioning,
            wrapperClassName,
            tooltipClassName,
            text,
            children,
            gapSize,
            inverted,
            withArrow
        } = this.props

        const wrapperClass = classNames(
            'reactist_tooltip__wrapper',
            wrapperClassName
        )
        const tooltipClass = classNames(
            'reactist_tooltip__text',
            tooltipClassName,
            {
                inverted
            }
        )
        const arrowClass = classNames('reactist_tooltip__arrow', { inverted })

        if (!text) {
            return <div className={wrapperClass}>{children}</div>
        }

        // wrap on click of trigger to hide tooltip on click
        const trigger = React.Children.map(children, child => {
            if (React.isValidElement(child)) {
                /**
                 * We can only attach click listeners to valid elements.
                 * When passing in a string / number as child we cannot attach the listener.
                 */
                return React.cloneElement(child, {
                    onClick: event => {
                        this._hide()
                        if (typeof child.props.onClick === 'function') {
                            child.props.onClick(event)
                        }
                    }
                })
            } else {
                return child
            }
        })

        return (
            <Popover
                position={position}
                visible={this.state.visible}
                trigger={trigger}
                content={text}
                popoverClassName={tooltipClass}
                wrapperClassName={wrapperClass}
                arrowClassName={arrowClass}
                onMouseEnter={this._show}
                onMouseLeave={this._hide}
                allowVaguePositioning={allowVaguePositioning}
                gapSize={gapSize}
                popoverRef={this._updateTooltipRef}
                wrapperRef={this._updateWrapperRef}
                withArrow={withArrow}
            />
        )
    }
}
Tooltip.displayName = 'Tooltip'
Tooltip.defaultProps = {
    position: 'auto',
    hideOnScroll: true,
    delayShow: 500,
    delayHide: 0,
    allowVaguePositioning: false,
    inverted: false,
    withArrow: true,
    gapSize: 5 // default size of the arrow (see `tooltip.less`)
}
Tooltip.propTypes = {
    /**
     * Position of the tooltip. Defaults to `auto`.
     * `auto` tries to position the tooltip to the top,
     * if there's not enough space it tries to position the tooltip clockwise (right, bottom, left).
     * Setting a distinct value like `right` will always position the tooltip right, regardless of available space.
     * Specifying `horizontal` will only try to position the tooltip left and right in that order.
     * Specifying `vertical` will only try to position the tooltip top and bottom in that order.
     */
    position: PropTypes.oneOf([
        'auto',
        'top',
        'right',
        'bottom',
        'left',
        'horizontal',
        'vertical'
    ]),
    /**
     * Whether vague positioning is allowed. When set to true the tooltip prefers to be fully visible over being correctly centered.
     */
    allowVaguePositioning: PropTypes.bool,
    /** Text that is displayed inside the tooltip */
    text: PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.arrayOf(PropTypes.node),
        PropTypes.func,
        PropTypes.node
    ]).isRequired,
    /** Set whether scrolling should hide the tooltip or not. */
    hideOnScroll: PropTypes.bool,
    /** How long to wait after hovering before the tooltip is shown (in ms). */
    delayShow: PropTypes.number,
    /** How long to wait after unhovering before the tooltip is hidden (in ms). */
    delayHide: PropTypes.number,
    /** Children that are wrapped by the toolip. */
    children: PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.arrayOf(PropTypes.node),
        PropTypes.node
    ]),
    /** Additional css class that is applied to the wrapper element. */
    wrapperClassName: PropTypes.string,
    /** Additional css class that is applied to the tooltip element. */
    tooltipClassName: PropTypes.string,
    /** Inverted tooltips have a light background with dark text. */
    inverted: PropTypes.bool,
    /** Gap between the tooltip wrapper and the arrow  */
    gapSize: PropTypes.number,
    /** Whether or not the tooltip should have a centered arrow pointing to the trigger element. */
    withArrow: PropTypes.bool
}

export default Tooltip
