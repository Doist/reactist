import './styles/tooltip.less'

import React from 'react'
import classNames from 'classnames'

import Popover from './Popover'

type TooltipProps = {
    onMouseEnter?: React.MouseEventHandler
    onMouseLeave?: React.MouseEventHandler
    /** Additional css class that is applied to the tooltip element. */
    tooltipClassName?: string
    /** How long to wait after hovering before the tooltip is shown (in ms). */
    delayShow: number
    /** How long to wait after unhovering before the tooltip is hidden (in ms). */
    delayHide: number
    /** Set whether scrolling should hide the tooltip or not. */
    hideOnScroll?: boolean
    /** Inverted tooltips have a light background with dark text. */
    inverted?: boolean
    /** Text that is displayed inside the tooltip */
    text?: React.ComponentProps<typeof Popover>['content']
}

type Props = React.PropsWithChildren<
    TooltipProps &
        Pick<
            React.ComponentProps<typeof Popover>,
            | 'popoverClassName'
            /** Additional css class that is applied to the wrapper element. */
            | 'wrapperClassName'
            /**
             * Whether vague positioning is allowed. When set to true the tooltip prefers to be fully visible over being correctly centered.
             */
            | 'allowVaguePositioning'
            /** Gap between the tooltip wrapper and the arrow  */
            | 'gapSize'
            /** Whether or not the tooltip should have a centered arrow pointing to the trigger element. */
            | 'withArrow'
            /**
             * Position of the tooltip. Defaults to `auto`.
             * `auto` tries to position the tooltip to the top,
             * if there's not enough space it tries to position the tooltip clockwise (right, bottom, left).
             * Setting a distinct value like `right` will always position the tooltip right, regardless of available space.
             * Specifying `horizontal` will only try to position the tooltip left and right in that order.
             * Specifying `vertical` will only try to position the tooltip top and bottom in that order.
             */
            | 'position'
        >
>
type State = {
    visible?: boolean
}

class Tooltip extends React.Component<Props, State> {
    public static displayName: string
    public static defaultProps: Props

    state: State = { visible: false }

    shouldComponentUpdate(nextProps: Props, nextState: State): boolean {
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

    wrapper?: HTMLLIElement
    tooltip?: HTMLLIElement
    delayTimeout?: ReturnType<typeof setTimeout>

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

    _delayAction(actionFn: Parameters<typeof setTimeout>[0], delay: number) {
        this._clearDelayTimeout()
        this.delayTimeout = setTimeout(actionFn, delay)
    }

    _updateTooltipRef = (tooltip: HTMLLIElement) => {
        this.tooltip = tooltip
    }

    _updateWrapperRef = (wrapper: HTMLLIElement) => {
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
            withArrow,
        } = this.props

        const wrapperClass = classNames('reactist_tooltip__wrapper', wrapperClassName)
        const tooltipClass = classNames('reactist_tooltip__text', tooltipClassName, {
            inverted,
        })
        const arrowClass = classNames('reactist_tooltip__arrow', { inverted })

        if (!text) {
            return <div className={wrapperClass}>{children}</div>
        }

        // wrap on click of trigger to hide tooltip on click
        const trigger = React.Children.map(children, (child) => {
            if (React.isValidElement(child)) {
                /**
                 * We can only attach click listeners to valid elements.
                 * When passing in a string / number as child we cannot attach the listener.
                 */
                return React.cloneElement(child, {
                    onClick: (event: React.MouseEvent) => {
                        this._hide()
                        if (typeof child.props.onClick === 'function') {
                            child.props.onClick(event)
                        }
                    },
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
    gapSize: 5, // default size of the arrow (see `tooltip.less`)
}

export default Tooltip
