import React from 'react'
import classNames from 'classnames'

import { hasEnoughSpace, calculatePosition, RelativePosition } from './positioning-utils'

import './popover.less'

/**
 * Position of the popover. Defaults to `auto`.
 * `auto` tries to position the tooltip to the top,
 * if there's not enough space it tries to position the tooltip clockwise (right, bottom, left).
 * Setting a distinct value like `right` will always position the popover right, regardless of available space.
 * Specifying `horizontal` will only try to position the tooltip left and right in that order.
 * Specifying `vertical` will only try to position the tooltip top and bottom in that order.
 */
type Position = 'left' | 'right' | 'top' | 'bottom' | 'vertical' | 'horizontal' | 'auto'

type Props = {
    visible?: boolean
    /** ref of the popover in case you need to manipulate it. */
    popoverRef?: React.Ref<HTMLElement>
    /** ref of the wrapper in case you need to manipulate it. */
    wrapperRef?: React.Ref<HTMLElement>
    /** Function to be called when the mouse enters the trigger. */
    onMouseEnter?: React.MouseEventHandler
    /** Function to be called when the mouse leaves the trigger. */
    onMouseLeave?: React.MouseEventHandler
    onClick?: React.MouseEventHandler
    /** Additional css class that is applied to the wrapper element. */
    wrapperClassName?: string
    /** Additional css class that is applied to the popover element. */
    popoverClassName?: string
    /** Additional css class that is applied to style the arrow. Not applied when `withArrow` is false. */
    arrowClassName?: string
    /** Content prop of the popover. */
    content?: (() => React.ReactNode) | React.ReactNode
    trigger?: React.ReactNode
    position: Position
    withArrow?: boolean
    /**
     * Whether vague positioning is allowed. When set to true the popover prefers to be fully visible over being correctly centered.
     */
    allowVaguePositioning?: boolean
    /** Gap between the popover wrapper and the arrow. */
    gapSize: number
}

class Popover extends React.Component<Props> {
    public static displayName: string
    public static defaultProps: Props

    componentDidMount() {
        if (this.props.visible) {
            this._updatePopoverPosition()
        }
    }

    componentDidUpdate(prevProps: Props) {
        if (this.wrapper && this.props.visible) {
            const positionChanged = prevProps.position !== this.props.position
            const vaguePositioningChanged =
                prevProps.allowVaguePositioning !== this.props.allowVaguePositioning
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

    popover!: HTMLElement
    wrapper!: HTMLElement

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
            if (position === 'absolute' || node === documentEl || !node.parentElement) {
                foundParent = true
            } else {
                node = node.parentElement
            }
        }
        const nodeRect = node.getBoundingClientRect()
        const windowDimensions = {
            height: nodeRect.height,
            width: nodeRect.width,
        }

        const popoverDimensions = {
            height: popoverRect.height,
            width: popoverRect.width,
        }
        const wrapperDimensions = {
            height: wrapperRect.height,
            width: wrapperRect.width,
        }
        const wrapperPositionRelative = {
            x: wrapperRect.left - nodeRect.left,
            y: wrapperRect.top - nodeRect.top,
        }
        const wrapperPositionAbsolute = {
            x: wrapperRect.left,
            y: wrapperRect.top,
        }

        const positionsToTry: RelativePosition[] =
            position === 'auto'
                ? ['top', 'right', 'bottom', 'left', 'top']
                : position === 'vertical'
                ? ['top', 'bottom']
                : position === 'horizontal'
                ? ['left', 'right']
                : [position]

        for (let index = 0; index < positionsToTry.length; index++) {
            const currentPosition = positionsToTry[index]
            const enoughSpaceAtPosition =
                currentPosition != null
                    ? hasEnoughSpace(
                          windowDimensions,
                          popoverDimensions,
                          wrapperDimensions,
                          wrapperPositionRelative,
                          currentPosition,
                          gapSize,
                      )
                    : false

            if (enoughSpaceAtPosition || index === positionsToTry.length - 1) {
                const popoverPosition =
                    currentPosition != null
                        ? calculatePosition(
                              currentPosition,
                              wrapperDimensions,
                              wrapperPositionAbsolute,
                              popoverDimensions,
                              gapSize,
                          )
                        : wrapperPositionAbsolute
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
                    if (popoverPosition.y + popoverDimensions.height > windowDimensions.height) {
                        this.popover.style.top = `${
                            windowDimensions.height - popoverDimensions.height - 2 * gapSize
                        }px`
                    }
                }

                if (currentPosition !== position) {
                    this.popover.className = this._getClassNameForPosition(currentPosition)
                }
                break
            }
        }
    }

    _getClassNameForPosition = (position: Position | undefined) => {
        const { visible, withArrow, arrowClassName } = this.props
        const className = classNames('reactist_popover', { visible })

        if (visible && withArrow) {
            return classNames(className, arrowClassName, {
                arrow_top: position === 'bottom',
                arrow_right: position === 'left',
                arrow_bottom: position === 'auto' || position === 'top',
                arrow_left: position === 'right',
            })
        }
        return className
    }

    _updatePopoverRef = (popover: HTMLElement) => {
        this.popover = popover
        if (typeof this.props.popoverRef === 'function') {
            this.props.popoverRef(popover)
        }
    }

    _updateWrapperRef = (wrapper: HTMLElement) => {
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
            content,
        } = this.props
        const popoverClass = position ? this._getClassNameForPosition(position) : ''
        const popoverContentClass = classNames('reactist_popover__content', popoverClassName)
        const wrapperClass = classNames('reactist_popover__wrapper', wrapperClassName)
        const triggerElement = React.Children.only<React.ReactElement>(
            trigger as React.ReactElement,
        )

        function handleTriggerClick(event: React.SyntheticEvent) {
            // @ts-expect-error This is temporary while we revisit the Popover interface
            if (onClick) onClick(event)
            // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
            if (typeof triggerElement.props.onClick === 'function') {
                // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access,@typescript-eslint/no-unsafe-call
                triggerElement.props.onClick(event)
            }
        }

        return (
            <span
                className={wrapperClass}
                onMouseEnter={onMouseEnter}
                onMouseLeave={onMouseLeave}
                ref={this._updateWrapperRef}
            >
                {React.cloneElement(triggerElement, { onClick: handleTriggerClick })}
                <span className={popoverClass} ref={this._updatePopoverRef}>
                    {this.props.visible ? (
                        <span className={popoverContentClass}>
                            {typeof content === 'function' ? content() : content}
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
    gapSize: 5, // default size of the arrow (see `tooltip.less`)
}

export { Popover }
