import * as React from 'react'
import classNames from 'classnames'

import {
    useTooltipState as useAriakitTooltipState,
    TooltipStateProps as AriakitTooltipStateProps,
    Tooltip as AriakitTooltip,
    TooltipProps as AriakitTooltipProps,
    TooltipAnchor,
    TooltipAnchorProps,
} from 'ariakit/tooltip'
import type { PopoverState } from 'ariakit/popover'

import './tooltip.less'

type TooltipProps = Omit<AriakitTooltipProps, 'children' | 'state'> & {
    children: React.ReactNode
    content: React.ReactNode | (() => React.ReactNode)
    position?: PopoverState['placement']
    gapSize?: number
}

// These are exported to be used in the tests, they are not meant to be exported publicly
export const SHOW_DELAY = 500
export const HIDE_DELAY = 100

function useDelayedTooltipState(initialState: AriakitTooltipStateProps) {
    const tooltipState = useAriakitTooltipState(initialState)
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
    const state = useDelayedTooltipState({ placement: position, gutter: gapSize })

    const child = React.Children.only(
        children as React.FunctionComponentElement<JSX.IntrinsicElements['div']> | null,
    )

    if (!content || !child) {
        return child
    }

    if (typeof child.ref === 'string') {
        throw new Error('Tooltip: String refs cannot be used as they cannot be forwarded')
    }

    /**
     * Prevents the tooltip from automatically firing on focus all the time. This is to prevent
     * tooltips from showing when the trigger element is focused back after a popover or dialog that
     * it opened was closed. See link below for more details.
     * @see https://github.com/reakit/reakit/discussions/749
     */
    function handleFocus(event: React.FocusEvent<HTMLDivElement>) {
        // If focus is not followed by a key up event, does it mean that it's not
        // an intentional keyboard focus? Not sure but it seems to work.
        // This may be resolved soon in an upcoming version of reakit:
        // https://github.com/reakit/reakit/issues/750
        function handleKeyUp(e: Event) {
            const eventKey = (e as KeyboardEvent).key
            if (eventKey !== 'Escape' && eventKey !== 'Enter' && eventKey !== 'Space') {
                state.show()
            }
        }
        event.currentTarget.addEventListener('keyup', handleKeyUp, { once: true })
        // Prevent tooltip.show from being called by TooltipReference
        event.preventDefault()
        child?.props?.onFocus?.(event)
    }

    return (
        <>
            <TooltipAnchor state={state} ref={child.ref} onFocus={handleFocus}>
                {(anchorProps: TooltipAnchorProps) => {
                    // Let child props override anchor props so user can specify attributes like tabIndex
                    // Also, do not apply the child's props to TooltipAnchor as props like `as` can create problems
                    // by applying the replacement component/element twice
                    return React.cloneElement(child, { ...anchorProps, ...child.props })
                }}
            </TooltipAnchor>
            {state.visible ? (
                <AriakitTooltip
                    {...props}
                    state={state}
                    className={classNames('reactist_tooltip', className)}
                >
                    {typeof content === 'function' ? content() : content}
                </AriakitTooltip>
            ) : null}
        </>
    )
}

export type { TooltipProps }
export { Tooltip }

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
