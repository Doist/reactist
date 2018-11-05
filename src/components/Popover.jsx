import './styles/popover.less'

import React from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'

import { hasEnoughSpace, calculatePosition } from './utils/PositioningUtils'

class Popover extends React.Component {
    componentDidUpdate(prevProps) {
        if (this.wrapper && !prevProps.visible && this.props.visible) {
            this._updatePopoverPosition()
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
                this.popover.style.left =
                    popoverPosition.x < 0 && allowVaguePositioning
                        ? `${2 * gapSize}px` // not centered but fully visible
                        : `${popoverPosition.x}px`

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
        const { popoverClassName, visible, withArrow } = this.props
        const className = classNames(
            'reactist popover',
            { visible },
            popoverClassName
        )

        if (visible && withArrow) {
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
        const {
            position,
            wrapperClassName,
            onMouseEnter,
            onMouseLeave,
            onClick,
            trigger,
            content
        } = this.props
        const popoverClass = this._getClassNameForPosition(position)
        const wrapperClass = classNames(
            'reactist popover__wrapper',
            wrapperClassName
        )

        return (
            <span
                className={wrapperClass}
                onMouseEnter={onMouseEnter}
                onMouseLeave={onMouseLeave}
                onClick={onClick}
                ref={wrapper => (this.wrapper = wrapper)}
            >
                {trigger}
                <span
                    className={popoverClass}
                    ref={popover => (this.popover = popover)}
                >
                    <span className="popover__content">{content}</span>
                </span>
            </span>
        )
    }
}

Popover.propTypes = {
    /**
     * Position of the popover. Defaults to `auto`.
     * `auto` tries to position the tooltip to the top,
     * if there's not enough space it tries to position the tooltip clockwise (right, bottom, left).
     * Setting a distinct value like `right` will always position the popover right, regardless of available space.
     */
    position: PropTypes.oneOf(['auto', 'top', 'right', 'bottom', 'left']),
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
    /** Whether or not the popover should have a centered arrow pointing to the trigger element. */
    withArrow: PropTypes.bool,
    /** Gap between the popover wrapper and the arrow. */
    gapSize: PropTypes.number
}

export default Popover
