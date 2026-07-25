import * as React from 'react'

import classNames from 'classnames'
import { useMergeRefs } from 'use-callback-ref'

import { Box } from '../box'

import { clamp } from './use-resizable-panel'

import styles from './sidebar.module.css'

import type { ObfuscatedClassName } from '../utils/common-types'

type SidebarAlign = 'start' | 'end'

type SidebarContextValue = {
    align: SidebarAlign
    isOpen: boolean
    unmountOnHide: boolean
    panelId: string
    panelRef: React.RefObject<HTMLDivElement | null>
    width?: number
    minWidth?: number
    maxWidth?: number
}

const SidebarContext = React.createContext<SidebarContextValue | null>(null)

function useSidebarContext(componentName: string): SidebarContextValue {
    const context = React.useContext(SidebarContext)
    if (context === null) {
        throw new Error(`${componentName} must be rendered inside <Sidebar>.`)
    }
    return context
}

//
// Sidebar (provider)
//

type SidebarProps = {
    /**
     * The side the sidebar attaches to. Controls the slide direction
     */
    align: SidebarAlign

    /**
     * Whether the sidebar is open
     */
    isOpen: boolean

    /**
     * Identifies the sidebar instance. Applied as the `id` of the
     * `<SidebarContent>` panel. Auto-generated when omitted.
     */
    id?: string

    /**
     * Controlled width in px
     */
    width?: number

    /**
     * Lower bound for the controlled width
     */
    minWidth?: number

    /**
     * Upper bound for the controlled width
     */
    maxWidth?: number

    /**
     * When `true`, the content unmounts at the end of the exit transition. Omit if the content's
     * internal state needs to be kept
     *
     * @default false
     */
    unmountOnHide?: boolean

    /**
     * The content of the panel via `<SidebarContent>`
     */
    children?: React.ReactNode
}

/**
 * The host for a sidebar instance
 */
function Sidebar({
    align,
    isOpen,
    id,
    width,
    minWidth,
    maxWidth,
    unmountOnHide = false,
    children,
}: SidebarProps) {
    const generatedId = React.useId()
    const panelId = id ?? generatedId
    const panelRef = React.useRef<HTMLDivElement>(null)

    const contextValue: SidebarContextValue = {
        align,
        isOpen,
        unmountOnHide,
        panelId,
        panelRef,
        width,
        minWidth,
        maxWidth,
    }

    return <SidebarContext.Provider value={contextValue}>{children}</SidebarContext.Provider>
}

//
// SidebarContent
//

type SidebarContentProps = Omit<
    React.ComponentPropsWithoutRef<'div'>,
    'className' | 'role' | 'id' | 'aria-label' | 'aria-labelledby'
> &
    ObfuscatedClassName &
    (
        | { 'aria-label'?: string; 'aria-labelledby'?: never }
        | { 'aria-label'?: never; 'aria-labelledby'?: string }
    ) & {
        /**
         * The panel's skin and content. It is recommended to use a landmark element, e.g. `<nav>`, `<aside>`, or
         * `<section>`.
         */
        children?: React.ReactNode

        /** Test identifier applied to the panel element. */
        'data-testid'?: string

        [dataAttribute: `data-${string}`]: unknown
    }

const SIDEBAR_WIDTH_VAR = '--reactist-sidebar-width'

/**
 * Provides the positioning as a docked panel. It is responsible for the slide and collapse
 * transitions, and the committed width.
 */
const SidebarContent = React.forwardRef<HTMLDivElement, SidebarContentProps>(
    function SidebarContent({ exceptionallySetClassName, children, style, ...rest }, ref) {
        const { align, isOpen, unmountOnHide, panelId, panelRef, width, minWidth, maxWidth } =
            useSidebarContext('SidebarContent')

        const mergedRef = useMergeRefs([panelRef, ref])

        React.useEffect(
            function warnWhenDockedCollapseHasNoWidth() {
                if (!isOpen && width == null && !unmountOnHide) {
                    // eslint-disable-next-line no-console
                    console.warn(
                        '[Sidebar]: a docked <Sidebar> needs a controlled `width` to collapse when closed; without one the closed panel stays visible.',
                    )
                }
            },
            [isOpen, width, unmountOnHide],
        )

        const clampedWidth =
            width != null ? clamp(width, minWidth ?? width, maxWidth ?? width) : undefined
        const widthStyle =
            clampedWidth != null
                ? ({ [SIDEBAR_WIDTH_VAR]: `${clampedWidth}px` } as React.CSSProperties)
                : undefined

        const childrenToRender = useDeferredUnmount({ isOpen, unmountOnHide, panelRef })
            ? children
            : null

        return (
            <Box
                {...rest}
                as="div"
                ref={mergedRef}
                display="flex"
                flexDirection="column"
                flexShrink={0}
                id={panelId}
                role={undefined}
                aria-modal={undefined}
                aria-label={undefined}
                aria-labelledby={undefined}
                data-align={align}
                data-overlay="false"
                data-state={isOpen ? 'open' : 'closed'}
                style={{ ...style, ...widthStyle }}
                className={classNames(styles.panel, exceptionallySetClassName)}
            >
                {childrenToRender}
            </Box>
        )
    },
)

/**
 * Determines whether the panel's children should be rendered. When `unmountOnHide`
 * is true, the children remain mounted during the exit transition and are unmounted
 * when it finishes
 */
function useDeferredUnmount({
    isOpen,
    unmountOnHide,
    panelRef,
}: {
    isOpen: boolean
    unmountOnHide: boolean
    panelRef: React.RefObject<HTMLDivElement | null>
}): boolean {
    const [exited, setExited] = React.useState(() => unmountOnHide && !isOpen)
    const [wasOpen, setWasOpen] = React.useState(isOpen)

    if (isOpen && !wasOpen) {
        setWasOpen(true)
        setExited(false)
    } else if (!isOpen && wasOpen) {
        setWasOpen(false)
    }

    React.useEffect(
        function unmountAfterExitTransition() {
            if (isOpen || !unmountOnHide) return

            const panel = panelRef.current
            const fallbackTimeout = window.setTimeout(
                () => setExited(true),
                getExitTimeoutMs(panel),
            )

            function handleTransitionEnd(event: TransitionEvent) {
                if (event.target === panel) {
                    window.clearTimeout(fallbackTimeout)
                    setExited(true)
                }
            }

            panel?.addEventListener('transitionend', handleTransitionEnd)
            return function cleanup() {
                window.clearTimeout(fallbackTimeout)
                panel?.removeEventListener('transitionend', handleTransitionEnd)
            }
        },
        [isOpen, unmountOnHide, panelRef],
    )

    return isOpen || !unmountOnHide || !exited
}

function parseCssDurationMs(value: string): number {
    return value.split(',').reduce((max, part) => {
        const trimmed = part.trim()
        const numeric = Number.parseFloat(trimmed)
        if (!Number.isFinite(numeric)) return max
        return Math.max(max, trimmed.endsWith('ms') ? numeric : numeric * 1000)
    }, 0)
}

function getExitTimeoutMs(panel: HTMLElement | null): number {
    if (!panel) return 0
    const style = window.getComputedStyle(panel)
    const durationMs = parseCssDurationMs(style.transitionDuration)
    if (durationMs === 0) return 0
    return durationMs + parseCssDurationMs(style.transitionDelay) + 50
}

SidebarContent.displayName = 'SidebarContent'

export { Sidebar, SidebarContent }
export type { SidebarAlign, SidebarContentProps, SidebarProps }
