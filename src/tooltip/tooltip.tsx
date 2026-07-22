import * as React from 'react'

import { Tooltip as BaseTooltip } from '@base-ui/react/tooltip'

import { Box } from '../box'

import styles from './tooltip.module.css'

import type { JSX } from 'react'
import type { ObfuscatedClassName } from '../utils/common-types'

const defaultShowTimeout = 500
const defaultHideTimeout = 100

type TooltipContextState = {
    showTimeout: number
    hideTimeout: number
}

const TooltipContext = React.createContext<TooltipContextState>({
    showTimeout: defaultShowTimeout,
    hideTimeout: defaultHideTimeout,
})

function TooltipProvider({
    showTimeout = defaultShowTimeout,
    hideTimeout = defaultHideTimeout,
    children,
}: React.PropsWithChildren<{
    showTimeout?: number
    hideTimeout?: number
}>) {
    const value = React.useMemo(() => ({ showTimeout, hideTimeout }), [showTimeout, hideTimeout])
    return (
        <TooltipContext.Provider value={value}>
            {/*
             * Base UI only groups tooltip delays inside a provider. Without this, moving between
             * adjacent triggers re-waits the full show timeout every time.
             */}
            <BaseTooltip.Provider>{children}</BaseTooltip.Provider>
        </TooltipContext.Provider>
    )
}

/**
 * How to place the tooltip relative to its trigger element.
 */
type TooltipPosition =
    | 'top'
    | 'top-start'
    | 'top-end'
    | 'right'
    | 'right-start'
    | 'right-end'
    | 'bottom'
    | 'bottom-start'
    | 'bottom-end'
    | 'left'
    | 'left-start'
    | 'left-end'

/**
 * Imperative control over a tooltip, obtained via the `ref` prop.
 */
type TooltipHandle = {
    /** Shows the tooltip immediately, bypassing the show timeout. */
    show: () => void
    /** Hides the tooltip immediately, bypassing the hide timeout. */
    hide: () => void
}

type TooltipSide = 'top' | 'right' | 'bottom' | 'left'
type TooltipAlign = 'start' | 'center' | 'end'

/**
 * Splits our combined `position` value into the `side` and `align` pair that Base UI expects.
 */
function getSideAndAlign(position: TooltipPosition): { side: TooltipSide; align: TooltipAlign } {
    const [side, align] = position.split('-') as [TooltipSide, 'start' | 'end' | undefined]
    return { side, align: align ?? 'center' }
}

interface TooltipProps extends ObfuscatedClassName {
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
     * Tooltips are visual-only affordances. The content is exposed via `role="tooltip"`, but the
     * trigger is deliberately not associated with it (e.g. via `aria-describedby`), so assistive
     * technologies will not announce it alongside the trigger. If the information matters, make
     * sure the trigger is labelled with it, or put it in the page content instead.
     *
     * Tooltips also do not open on touch devices, so never hide essential information in one.
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
    position?: TooltipPosition

    /**
     * The separation (in pixels) between the trigger element and the tooltip.
     * @default 3
     */
    gapSize?: number

    /**
     * The amount of time in milliseconds to wait before showing the tooltip
     * Use `<TooltipProvider>` to set a global value for all tooltips
     * @default 500
     */
    showTimeout?: number

    /**
     * The amount of time in milliseconds to wait before hiding the tooltip
     * Use `<TooltipProvider>` to set a global value for all tooltips
     * @default 100
     */
    hideTimeout?: number
}

const Tooltip = React.forwardRef<TooltipHandle, TooltipProps>(function Tooltip(
    {
        children,
        content,
        position = 'top',
        gapSize = 3,
        showTimeout,
        hideTimeout,
        exceptionallySetClassName,
    },
    ref,
) {
    const { showTimeout: globalShowTimeout, hideTimeout: globalHideTimeout } =
        React.useContext(TooltipContext)

    const [open, setOpen] = React.useState(false)
    const tooltipId = React.useId()

    React.useImperativeHandle(
        ref,
        () => ({
            show: () => setOpen(true),
            hide: () => setOpen(false),
        }),
        [],
    )

    const child = React.Children.only(
        children as React.FunctionComponentElement<JSX.IntrinsicElements['div']> | null,
    )

    if (!child) {
        return child
    }

    const { side, align } = getSideAndAlign(position)

    return (
        <BaseTooltip.Root open={open} onOpenChange={setOpen}>
            <BaseTooltip.Trigger
                render={child}
                delay={showTimeout ?? globalShowTimeout}
                closeDelay={hideTimeout ?? globalHideTimeout}
            />
            {open && content ? (
                <BaseTooltip.Portal>
                    <BaseTooltip.Positioner
                        side={side}
                        align={align}
                        sideOffset={gapSize}
                        className={styles.positioner}
                    >
                        <BaseTooltip.Popup
                            id={tooltipId}
                            role="tooltip"
                            render={
                                <Box
                                    className={[styles.tooltip, exceptionallySetClassName]}
                                    background="toast"
                                    borderRadius="standard"
                                    paddingX="small"
                                    paddingY="xsmall"
                                    maxWidth="medium"
                                    width="fitContent"
                                    overflow="hidden"
                                    textAlign="center"
                                />
                            }
                        >
                            {typeof content === 'function' ? content() : content}
                        </BaseTooltip.Popup>
                    </BaseTooltip.Positioner>
                </BaseTooltip.Portal>
            ) : null}
        </BaseTooltip.Root>
    )
})

export type { TooltipHandle, TooltipPosition, TooltipProps }
export { Tooltip, TooltipProvider }
