import React, { useState } from 'react'
import { TooltipPopup, useTooltip } from '@reach/tooltip'
import '@reach/tooltip/styles.css'
import './styles/tooltip.less'

type TooltipProps = JSX.IntrinsicElements['div'] & {
    content: React.ReactNode | (() => React.ReactNode)
    children: React.ReactNode
}

/*
 * This Tooltip.js module will export @reach/tooltip,
 * with its default position set to centering position
 */

const OFFSET = 3

/**
 * @see https://github.com/reach/reach-ui/blob/d4bcfc73f27e6e618ec2eb2b0154a58bc17496f0/packages/tooltip/src/index.tsx#L573
 */
function getCollisions({
    triggerRect,
    tooltipRect,
}: {
    triggerRect?: Partial<DOMRect> | null
    tooltipRect?: Partial<DOMRect> | null
}) {
    if (
        !triggerRect ||
        !tooltipRect ||
        typeof triggerRect.top !== 'number' ||
        typeof triggerRect.bottom !== 'number' ||
        typeof tooltipRect.height !== 'number'
    ) {
        return {}
    }

    return {
        top: triggerRect.top - tooltipRect.height < 0,
        bottom: window.innerHeight < triggerRect.bottom + tooltipRect.height + OFFSET,
    }
}

/**
 * Override default positioning logic
 *
 * Original implementation: https://github.com/reach/reach-ui/blob/d4bcfc73f27e6e618ec2eb2b0154a58bc17496f0/packages/tooltip/src/index.tsx#L568
 * Centering demo: https://reacttraining.com/reach-ui/tooltip/#triangle-pointers-and-custom-styles
 */
function centered(triggerRect?: Partial<DOMRect> | null, tooltipRect?: Partial<DOMRect> | null) {
    if (
        !triggerRect ||
        !tooltipRect ||
        typeof triggerRect.top !== 'number' ||
        typeof triggerRect.left !== 'number' ||
        typeof triggerRect.bottom !== 'number' ||
        typeof triggerRect.width !== 'number' ||
        typeof tooltipRect.height !== 'number' ||
        typeof tooltipRect.width !== 'number'
    ) {
        return {}
    }

    const collisions = getCollisions({ triggerRect, tooltipRect })
    const directionUp = !collisions.top

    const triggerCenter = triggerRect.left + triggerRect.width / 2
    const left = triggerCenter - tooltipRect.width / 2
    const maxLeft = window.innerWidth - tooltipRect.width - OFFSET

    return {
        left: Math.min(Math.max(OFFSET, left), maxLeft) + window.scrollX,
        top: directionUp
            ? triggerRect.top - OFFSET - window.scrollY - tooltipRect.height
            : triggerRect.bottom + OFFSET + window.scrollY,
    }
}

/**
 * @see https://github.com/reach/reach-ui/blob/d4bcfc73f27e6e618ec2eb2b0154a58bc17496f0/packages/tooltip/src/index.tsx#L363
 */
function Tooltip({ children, id, content, ...rest }: TooltipProps) {
    const child = React.Children.only<React.ReactElement>(children as React.ReactElement)

    const [trigger, tooltip] = useTooltip({
        id,
        onMouseEnter: child.props.onMouseEnter,
        onMouseMove: child.props.onMouseMove,
        onMouseLeave: child.props.onMouseLeave,
        onFocus: child.props.onFocus,
        onBlur: child.props.onBlur,
        onKeyDown: child.props.onKeyDown,
        onMouseDown: child.props.onMouseDown,
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        ref: (child as any).ref,
    })

    const { isVisible, triggerRect } = tooltip
    const [tooltipElement, setTooltipElement] = useState<HTMLDivElement | null>(null)
    const tooltipRect = tooltipElement && tooltipElement.getBoundingClientRect()
    const collisions = getCollisions({ triggerRect, tooltipRect })
    const directionUp = !collisions.top

    return (
        <>
            {React.cloneElement(children as React.ReactElement, trigger)}
            {isVisible && content && (
                <TooltipPopup
                    data-direction={directionUp ? 'up' : 'down'}
                    ref={(ref: HTMLDivElement) => setTooltipElement(ref)}
                    position={centered}
                    label={typeof content === 'function' ? content() : content}
                    {...tooltip}
                    {...rest}
                />
            )}
        </>
    )
}

export { Tooltip, TooltipProps }
