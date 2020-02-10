import './styles/popover.less'

import React from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'

import { hasEnoughSpace, calculatePosition } from './utils/PositioningUtils'

class Popover extends React.Component {
    componentDidMount() {
        if (this.props.visible) {
            this._updatePopoverPosition()
        }
    }

    componentDidUpdate(prevProps) {
        if (this.wrapper && this.props.visible) {
            const positionChanged = prevProps.position !== this.props.position
            const vaguePositioningChanged =
                prevProps.allowVaguePositioning !==
                this.props.allowVaguePositioning
            const visibilityChanged = prevProps.visible !== this.props.visible
            const arrowChanged = prevProps.withArrow !== this.props.withArrow
            const gapSizeChanged = prevProps.gapSize !== this.props.gapSize
            const contentChanged = prevProps.content !== this.props.content
            if (
                positionChanged ||
                vaguePositioningChanged ||
                visibilityChanged ||
                arrowChanged ||
                gapSizeChanged ||
                contentChanged
            ) {
                this._updatePopoverPosition()
            }
        }
    }

    _updatePopoverPosition = () => {
        const { position, allowVaguePositioning, gapSize } = this.props
        const wrapperRect = this.wrapper.getBoundingClientRect()
        const popoverRect = this.popover.getBoundingClientRect()

        // Instead of using the documentElement find the nearest absolutely positioned element
        const documentEl = document.documentElement
        let node = this.wrapper
        let foundParent = false
        while (!foundParent) {
            const styles = getComputedStyle(node)
            const position = styles.getPropertyValue('position')
            if (
                position === 'absolute' ||
                node === documentEl ||
                !node.parentElement
            ) {
                foundParent = true
            } else {
                node = node.parentElement
            }
        }
        const nodeRect = node.getBoundingClientRect()
        const windowDimensions = {
            height: nodeRect.height,
            width: nodeRect.width
        }

        const popoverDimensions = {
            height: popoverRect.height,
            width: popoverRect.width
        }
        const wrapperDimensions = {
            height: wrapperRect.height,
            width: wrapperRect.width
        }
        const wrapperPositionRelative = {
            x: wrapperRect.left - nodeRect.left,
            y: wrapperRect.top - nodeRect.top
        }
        const wrapperPositionAbsolute = {
            x: wrapperRect.left,
            y: wrapperRect.top
        }

        const positionsToTry =
            position === 'auto'
                ? ['top', 'right', 'bottom', 'left', 'top']
                : position === 'vertical'
                    ? ['top', 'bottom']
                    : position === 'horizontal'
                        ? ['left', 'right']
                        : [position]

        for (let index = 0; index < positionsToTry.length; index++) {
            const currentPosition = positionsToTry[index]
            const enoughSpaceAtPosition = hasEnoughSpace(
                windowDimensions,
                popoverDimensions,
                wrapperDimensions,
                wrapperPositionRelative,
                currentPosition,
                gapSize
            )

            if (enoughSpaceAtPosition || index === positionsToTry.length - 1) {
                const popoverPosition = calculatePosition(
                    currentPosition,
                    wrapperDimensions,
                    wrapperPositionAbsolute,
                    popoverDimensions,
                    gapSize
                )
                this.popover.style.top = `${popoverPosition.y}px`
                this.popover.style.left = `${popoverPosition.x}px`

                /**
                 * Correct placement if vague positioning is allowed.
                 * When it's not allowed we "cut off" popovers and display them
                 * out of the viewport to maintain their centered position.
                 */
                if (allowVaguePositioning) {
                    // correct horizontally
                    if (popoverPosition.x < 0) {
                        this.popover.style.left = `${2 * gapSize}px`
                    }
                    // correct vertically
                    if (
                        popoverPosition.y + popoverDimensions.height >
                        windowDimensions.height
                    ) {
                        this.popover.style.top = `${windowDimensions.height -
                            popoverDimensions.height -
                            2 * gapSize}px`
                    }
                }

                if (currentPosition !== position) {
                    this.popover.className = this._getClassNameForPosition(
                        currentPosition
                    )
                }
                break
            }
        }
    }

    _getClassNameForPosition = position => {
        const { visible, withArrow, arrowClassName } = this.props
        const className = classNames('reactist_popover', { visible })

        if (visible && withArrow) {
            return classNames(className, arrowClassName, {
                arrow_top: position === 'bottom',
                arrow_right: position === 'left',
                arrow_bottom: position === 'auto' || position === 'top',
                arrow_left: position === 'right'
            })
        }
        return className
    }

    _updatePopoverRef = popover => {
        this.popover = popover
        if (typeof this.props.popoverRef === 'function') {
            this.props.popoverRef(popover)
        }
    }

    _updateWrapperRef = wrapper => {
        this.wrapper = wrapper
        if (typeof this.props.wrapperRef === 'function') {
            this.props.wrapperRef(wrapper)
        }
    }

    render() {
        const {
            position,
            wrapperClassName,
            popoverClassName,
            onMouseEnter,
            onMouseLeave,
            onClick,
            trigger,
            content
        } = this.props
        const popoverClass = this._getClassNameForPosition(position)
        const popoverContentClass = classNames(
            'reactist_popover__content',
            popoverClassName
        )
        const wrapperClass = classNames(
            'reactist_popover__wrapper',
            wrapperClassName
        )

        return (
            <span
                className={wrapperClass}
                onMouseEnter={onMouseEnter}
                onMouseLeave={onMouseLeave}
                onClick={onClick}
                ref={this._updateWrapperRef}
            >
                {trigger}
                <span className={popoverClass} ref={this._updatePopoverRef}>
                    {this.props.visible ? (
                        <span className={popoverContentClass}>
                            {typeof content === 'function'
                                ? content()
                                : content}
                        </span>
                    ) : null}
                </span>
            </span>
        )
    }
}
Popover.displayName = 'Popover'
Popover.defaultProps = {
    position: 'auto',
    gapSize: 5 // default size of the arrow (see `tooltip.less`)
}
Popover.propTypes = {
    /**
     * Position of the popover. Defaults to `auto`.
     * `auto` tries to position the tooltip to the top,
     * if there's not enough space it tries to position the tooltip clockwise (right, bottom, left).
     * Setting a distinct value like `right` will always position the popover right, regardless of available space.
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
     * Whether vague positioning is allowed. When set to true the popover prefers to be fully visible over being correctly centered.
     */
    allowVaguePositioning: PropTypes.bool,
    /** Whether or not the popover is currently visibble. */
    visible: PropTypes.bool.isRequired,
    /** Content slot of the popover. */
    content: PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.arrayOf(PropTypes.node),
        PropTypes.func,
        PropTypes.node
    ]).isRequired,
    /** Trigger slot of the popover. */
    trigger: PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.arrayOf(PropTypes.node),
        PropTypes.node
    ]),
    /** Function to be called when the trigger is clicked. */
    onClick: PropTypes.func,
    /** Function to be called when the mouse enters the trigger. */
    onMouseEnter: PropTypes.func,
    /** Function to be called when the mouse leaves the trigger. */
    onMouseLeave: PropTypes.func,
    /** Additional css class that is applied to the wrapper element. */
    wrapperClassName: PropTypes.string,
    /** Additional css class that is applied to the popover element. */
    popoverClassName: PropTypes.string,
    /** Additional css class that is applied to style the arrow. Not applied when `withArrow` is false. */
    arrowClassName: PropTypes.string,
    /** Whether or not the popover should have a centered arrow pointing to the trigger element. */
    withArrow: PropTypes.bool,
    /** Gap between the popover wrapper and the arrow. */
    gapSize: PropTypes.number,
    /** ref of the wrapper in case you need to manipulate it. */
    wrapperRef: PropTypes.func,
    /** ref of the popover in case you need to manipulate it. */
    popoverRef: PropTypes.func
}

export default Popover
