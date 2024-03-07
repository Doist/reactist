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

    return (
        <>
            <TooltipAnchor render={child} store={tooltip} ref={child.ref} />
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
