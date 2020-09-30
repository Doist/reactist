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
    content: React.ReactNode | (() => React.ReactNode)
    position?: PopoverState['placement']
    gapSize?: number
}

// These are exported to be used in the tests, they are not meant to be exported publicly
export const SHOW_DELAY = 500
export const HIDE_DELAY = 100

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

    /**
     * Prevents the tooltip from automatically firing on focus all the time. This is to prevent
     * tooltips from showing when the trigger element is focused back after a popover or dialog that
     * it opened was closed. See link below for more details.
     * @see https://github.com/reakit/reakit/discussions/749
     */
    function handleFocus(event: React.FocusEvent) {
        // If focus is not followed by a key up event, does it mean that it's not
        // an intentional keyboard focus? Not sure but it seems to work.
        // This may be resolved soon in an upcoming version of reakit:
        // https://github.com/reakit/reakit/issues/750
        function handleKeyUp(e: Event) {
            const eventKey = (e as KeyboardEvent).key
            if (eventKey !== 'Escape' && eventKey !== 'Enter' && eventKey !== 'Space') {
                tooltip.show()
            }
        }
        event.currentTarget.addEventListener('keyup', handleKeyUp, { once: true })
        // Prevent tooltip.show from being called by TooltipReference
        event.preventDefault()
        if (typeof child.props.onFocus === 'function') child.props.onFocus(event)
    }

    return (
        <>
            <TooltipReference
                {...tooltip}
                /* eslint-disable-next-line @typescript-eslint/no-explicit-any */
                ref={(child as any).ref}
                {...child.props}
                onFocus={handleFocus}
            >
                {(referenceProps) => React.cloneElement(child, referenceProps)}
            </TooltipReference>
            {tooltip.visible ? (
                <ReakitTooltip
                    {...tooltip}
                    {...props}
                    className={classNames('reactist_tooltip', className)}
                >
                    {typeof content === 'function' ? content() : content}
                </ReakitTooltip>
            ) : null}
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
