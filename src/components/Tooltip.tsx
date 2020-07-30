import React from 'react'
import classNames from 'classnames'

import {
    useTooltipState,
    TooltipInitialState,
    Tooltip as ReakitTooltip,
    TooltipReference,
    TooltipProps as ReakitTooltipProps,
} from 'reakit/Tooltip'
import { PopoverState } from 'reakit/Popover'

import './styles/tooltip.less'

type TooltipProps = Omit<ReakitTooltipProps, 'children'> & {
    children: React.ReactNode
    content: React.ReactNode
    position?: PopoverState['placement']
    gapSize?: number
}

const SHOW_DELAY = 100
const HIDE_DELAY = 100

function useDelayedTooltipState(initialState: TooltipInitialState) {
    const tooltipState = useTooltipState(initialState)
    const delay = useDelay()
    return React.useMemo(
        () => ({
            ...tooltipState,
            show: delay(() => tooltipState.show(), SHOW_DELAY),
            hide: delay(() => tooltipState.hide(), HIDE_DELAY),
        }),
        [delay, tooltipState],
    )
}

function Tooltip({
    children,
    content,
    position = 'top',
    gapSize = 3,
    className,
    ...props
}: TooltipProps) {
    const tooltip = useDelayedTooltipState({ placement: position, gutter: gapSize })

    const child = React.Children.only<React.ReactElement>(children as React.ReactElement)
    if (!content) {
        return child
    }

    return (
        <>
            {/* eslint-disable-next-line @typescript-eslint/no-explicit-any */}
            <TooltipReference {...tooltip} ref={(child as any).ref} {...child.props}>
                {(referenceProps) => React.cloneElement(child, referenceProps)}
            </TooltipReference>
            <ReakitTooltip
                {...tooltip}
                {...props}
                className={classNames('reactist_tooltip', className)}
            >
                {content}
            </ReakitTooltip>
        </>
    )
}

export { Tooltip, TooltipProps }

//
// Internal helpers
//

/**
 * Returns a function offering the same interface as setTimeout, but cleans up on unmount.
 *
 * The timeout state is shared, and only one delayed function can be active at any given time. If
 * a new delayed function is called while another one was waiting for its time to run, that older
 * invocation is cleared and it never runs.
 *
 * This is suitable for our use case here, but probably not the most intuitive thing in general.
 * That's why this is not made a shared util or something like it.
 */
function useDelay() {
    const timeoutRef = React.useRef<ReturnType<typeof setTimeout>>()

    const clearTimeouts = React.useCallback(function clearTimeouts() {
        if (timeoutRef.current != null) {
            clearTimeout(timeoutRef.current)
        }
    }, [])

    // Runs clearTimeouts when the component is unmounted
    React.useEffect(() => clearTimeouts, [clearTimeouts])

    return React.useCallback(
        function delay(fn: () => void, delay: number) {
            return () => {
                clearTimeouts()
                timeoutRef.current = setTimeout(fn, delay)
            }
        },
        [clearTimeouts],
    )
}
