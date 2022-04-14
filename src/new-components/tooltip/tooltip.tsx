import * as React from 'react'
import classNames from 'classnames'
import { TooltipPopup, useTooltip } from '@reach/tooltip'
import styles from './tooltip.module.css'

type Position = 'top' | 'right' | 'bottom' | 'left'

type PositioningArgs = {
    triggerRect?: Partial<DOMRect> | null
    tooltipRect?: Partial<DOMRect> | null
    offset: number
    position: Position
}

/**
 * Override default positioning logic
 *
 * Original implementation: https://github.com/reach/reach-ui/blob/d4bcfc73f27e6e618ec2eb2b0154a58bc17496f0/packages/tooltip/src/index.tsx#L568
 * Centering demo: https://reacttraining.com/reach-ui/tooltip/#triangle-pointers-and-custom-styles
 */
function computePosition({
    triggerRect,
    tooltipRect,
    offset,
    position,
}: PositioningArgs): Pick<React.CSSProperties, 'top' | 'right' | 'bottom' | 'left'> {
    if (
        !triggerRect ||
        !tooltipRect ||
        typeof triggerRect.top !== 'number' ||
        typeof triggerRect.left !== 'number' ||
        typeof triggerRect.bottom !== 'number' ||
        typeof triggerRect.right !== 'number' ||
        typeof triggerRect.width !== 'number' ||
        typeof triggerRect.height !== 'number' ||
        typeof tooltipRect.width !== 'number' ||
        typeof tooltipRect.height !== 'number'
    ) {
        return {}
    }

    // const collisions = getCollisions(offset, triggerRect, tooltipRect)
    const collisions = {
        top: triggerRect.top - tooltipRect.height < 0,
        right: window.innerWidth < triggerRect.left + tooltipRect.width,
        bottom: window.innerHeight < triggerRect.bottom + tooltipRect.height + offset,
        left: triggerRect.left - tooltipRect.width < 0,
    }

    if (position === 'top' || position === 'bottom') {
        if (position === 'bottom' && collisions.bottom && !collisions.top) {
            position = 'top'
        } else if (position === 'top' && collisions.top && !collisions.bottom) {
            position = 'bottom'
        }

        const triggerCenter = triggerRect.left + triggerRect.width / 2
        const left = triggerCenter - tooltipRect.width / 2
        const maxLeft = window.innerWidth - tooltipRect.width - offset

        return {
            left: Math.min(Math.max(offset, left), maxLeft) + window.scrollX,
            top:
                position === 'top'
                    ? triggerRect.top - offset - window.scrollY - tooltipRect.height
                    : triggerRect.bottom + offset + window.scrollY,
        }
    } else {
        if (position === 'left' && collisions.left && !collisions.right) {
            position = 'right'
        } else if (position === 'right' && collisions.right && !collisions.left) {
            position = 'left'
        }

        const triggerCenter = triggerRect.top + triggerRect.height / 2
        const top = triggerCenter - tooltipRect.height / 2
        const maxTop = window.innerHeight - tooltipRect.height - offset

        return {
            top: Math.min(Math.max(offset, top), maxTop) + window.scrollX,
            left:
                position === 'left'
                    ? triggerRect.left - offset - window.scrollY - tooltipRect.width
                    : triggerRect.right + offset + window.scrollY,
        }
    }
}

/**
 * Used to prevent the tooltip from automatically firing on focus all the time. This is to prevent
 * tooltips from showing when the trigger element is focused back after a popover or dialog that
 * it opened was closed. See link below for more details.
 * @see https://github.com/reakit/reakit/discussions/749
 */
function useSpecialFocusManagement(
    onFocus: React.FocusEventHandler | null | undefined,
): [boolean, React.FocusEventHandler] {
    const [preventShow, setPreventShow] = React.useState(false)

    function handleFocus(event: React.FocusEvent<HTMLDivElement>) {
        // If focus is not followed by a key up event, does it mean that it's not
        // an intentional keyboard focus? Not sure but it seems to work.
        function handleKeyUp(e: Event) {
            const eventKey = (e as KeyboardEvent).key
            if (eventKey !== 'Escape' && eventKey !== 'Enter' && eventKey !== 'Space') {
                setPreventShow(false)
            }
        }
        event.currentTarget.addEventListener('keyup', handleKeyUp, { once: true })
        setPreventShow(true)
        onFocus?.(event)
    }

    return [preventShow, handleFocus]
}

type ChildProps = Pick<
    JSX.IntrinsicElements['div'],
    | 'onMouseEnter'
    | 'onMouseMove'
    | 'onMouseLeave'
    | 'onFocus'
    | 'onBlur'
    | 'onKeyDown'
    | 'onMouseDown'
>

type TooltipProps = {
    id?: string
    children: React.ReactNode
    content: React.ReactNode | (() => React.ReactNode)
    position?: Position
    offset?: number
    exceptionallySetClassName?: string
}

/**
 * @see https://github.com/reach/reach-ui/blob/d4bcfc73f27e6e618ec2eb2b0154a58bc17496f0/packages/tooltip/src/index.tsx#L363
 */
function Tooltip({
    id,
    children,
    position = 'top',
    offset = 3,
    content,
    exceptionallySetClassName,
}: TooltipProps) {
    const child = React.Children.only<React.ReactElement<ChildProps>>(
        children as React.ReactElement<ChildProps>,
    )
    const [preventShow, handleFocus] = useSpecialFocusManagement(child.props.onFocus)

    const [trigger, tooltip] = useTooltip({
        id,
        onMouseEnter: child.props.onMouseEnter,
        onMouseMove: child.props.onMouseMove,
        onMouseLeave: child.props.onMouseLeave,
        onFocus: handleFocus,
        onBlur: child.props.onBlur,
        onKeyDown: child.props.onKeyDown,
        onMouseDown: child.props.onMouseDown,
        /* eslint-disable */
        ref: (child as any).ref,
        /* eslint-enable */
        // DEBUG_STYLE,
    })

    const positioningFunction = React.useCallback(
        function positioningFunction(
            triggerRect?: Partial<DOMRect> | null,
            tooltipRect?: Partial<DOMRect> | null,
        ) {
            return computePosition({ triggerRect, tooltipRect, offset, position })
        },
        [offset, position],
    )

    const label =
        tooltip.isVisible && !preventShow
            ? content instanceof Function
                ? content()
                : content
            : null

    return (
        <>
            {React.cloneElement(children as React.ReactElement, trigger)}
            {label ? (
                <TooltipPopup
                    className={classNames(styles.tooltip, exceptionallySetClassName)}
                    position={positioningFunction}
                    label={label}
                    {...tooltip}
                />
            ) : null}
        </>
    )
}

export { Tooltip }
export type { TooltipProps }
