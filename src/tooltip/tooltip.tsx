import * as React from 'react'

import {
    useTooltipStore,
    Tooltip as AriakitTooltip,
    TooltipAnchor,
    TooltipArrow,
} from '@ariakit/react'
import { Box } from '../box'

import type { TooltipStoreState } from '@ariakit/react'

import styles from './tooltip.module.css'

type TooltipProps = {
    /**
     * The element that triggers the tooltip. Generally a button or link.
     *
     * It should be an interactive element accessible both via mouse and keyboard interactions.
     */
    children: React.ReactNode

    /**
     * The content to show in the tooltip.
     *
     * It can be rich content provided via React elements, or string content. It should not include
     * interactive elements inside it. This includes links or buttons.
     *
     * You can provide a function instead of the content itself. In this case, the function should
     * return the desired content. This is useful if the content is expensive to generate. It can
     * also be useful if the content dynamically changes often, so every time you trigger the
     * tooltip the content may have changed (e.g. if you show a ticking time clock in the tooltip).
     *
     * The trigger element will be associated to this content via `aria-describedby`. This means
     * that the tooltip content will be read by assistive technologies such as screen readers. It
     * will likely read this content right after reading the trigger element label.
     */
    content: React.ReactNode | (() => React.ReactNode)

    /**
     * How to place the tooltip relative to its trigger element.
     *
     * The possible values are "top", "bottom", "left", "right". Additionally, any of these values
     * can be combined with `-start` or `-end` for even more control. For instance `top-start` will
     * place the tooltip at the top, but with the start (e.g. left) side of the toolip and the
     * trigger aligned. If neither `-start` or `-end` are provided, the tooltip is centered along
     * the vertical or horizontal axis with the trigger.
     *
     * The position is enforced whenever possible, but tooltips can appear in different positions
     * if the specified one would make the tooltip intersect with the viewport edges.
     *
     * @default 'top'
     */
    position?: TooltipStoreState['placement']

    /**
     * The separation (in pixels) between the trigger element and the tooltip.
     * @default 3
     */
    gapSize?: number

    /**
     * Whether to show an arrow-like element attached to the tooltip, and pointing towards the
     * trigger element.
     * @default false
     */
    withArrow?: boolean

    /**
     * An escape hatch, in case you need to provide a custom class name to the tooltip.
     */
    exceptionallySetClassName?: string
}

function Tooltip({
    children,
    content,
    position = 'top',
    gapSize = 3,
    withArrow = false,
    exceptionallySetClassName,
}: TooltipProps) {
    const tooltip = useTooltipStore({ placement: position, showTimeout: 500, hideTimeout: 100 })
    const isOpen = tooltip.useState('open')

    const child = React.Children.only(
        children as React.FunctionComponentElement<JSX.IntrinsicElements['div']> | null,
    )

    if (!child) {
        return child
    }

    if (typeof child.ref === 'string') {
        throw new Error('Tooltip: String refs cannot be used as they cannot be forwarded')
    }

    /**
     * Prevents the tooltip from automatically firing on focus all the time. This is to prevent
     * tooltips from showing when the trigger element is focused back after a popover or dialog that
     * it opened was closed. See link below for more details.
     * @see https://github.com/ariakit/ariakit/discussions/749
     */
    function handleFocus(event: React.FocusEvent<HTMLDivElement>) {
        // If focus is not followed by a key up event, does it mean that it's not an intentional
        // keyboard focus? Not sure but it seems to work.
        // This may be resolved soon in an upcoming version of ariakit:
        // https://github.com/ariakit/ariakit/issues/750
        function handleKeyUp(event: Event) {
            const eventKey = (event as KeyboardEvent).key
            if (eventKey !== 'Escape' && eventKey !== 'Enter' && eventKey !== 'Space') {
                tooltip.show()
            }
        }
        event.currentTarget.addEventListener('keyup', handleKeyUp, { once: true })
        event.preventDefault() // Prevent tooltip.show from being called by TooltipReference
        child?.props?.onFocus?.(event)
    }

    function handleBlur(event: React.FocusEvent<HTMLDivElement>) {
        tooltip.hide()
        child?.props?.onBlur?.(event)
    }

    return (
        <>
            <TooltipAnchor
                render={(anchorProps) => {
                    // Let child props override anchor props so user can specify attributes like tabIndex
                    // Also, do not apply the child's props to TooltipAnchor as props like `as` can create problems
                    // by applying the replacement component/element twice
                    return React.cloneElement(child, {
                        ...child.props,
                        ...anchorProps,
                        onFocus: handleFocus,
                        onBlur: handleBlur,
                    })
                }}
                store={tooltip}
                ref={child.ref}
            />
            {isOpen && content ? (
                <Box
                    as={AriakitTooltip}
                    gutter={gapSize}
                    store={tooltip}
                    className={[styles.tooltip, exceptionallySetClassName]}
                    background="toast"
                    borderRadius="standard"
                    paddingX="small"
                    paddingY="xsmall"
                    maxWidth="medium"
                    width="fitContent"
                    overflow="hidden"
                    textAlign="center"
                >
                    {withArrow ? <TooltipArrow /> : null}
                    {typeof content === 'function' ? content() : content}
                </Box>
            ) : null}
        </>
    )
}

export type { TooltipProps }
export { Tooltip }
