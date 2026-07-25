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
     * The content of the panel via `<SidebarContent>`
     */
    children?: React.ReactNode
}

/**
 * The host for a sidebar instance
 */
function Sidebar({ align, isOpen, id, width, minWidth, maxWidth, children }: SidebarProps) {
    const generatedId = React.useId()
    const panelId = id ?? generatedId
    const panelRef = React.useRef<HTMLDivElement>(null)

    const contextValue: SidebarContextValue = {
        align,
        isOpen,
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
        const { align, isOpen, panelId, panelRef, width, minWidth, maxWidth } =
            useSidebarContext('SidebarContent')

        const mergedRef = useMergeRefs([panelRef, ref])

        React.useEffect(
            function warnWhenDockedCollapseHasNoWidth() {
                if (!isOpen && width == null) {
                    // eslint-disable-next-line no-console
                    console.warn(
                        '[Sidebar]: a docked <Sidebar> needs a controlled `width` to collapse when closed; without one the closed panel stays visible.',
                    )
                }
            },
            [isOpen, width],
        )

        const clampedWidth =
            width != null ? clamp(width, minWidth ?? width, maxWidth ?? width) : undefined
        const widthStyle =
            clampedWidth != null
                ? ({ [SIDEBAR_WIDTH_VAR]: `${clampedWidth}px` } as React.CSSProperties)
                : undefined

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
                {children}
            </Box>
        )
    },
)

SidebarContent.displayName = 'SidebarContent'

export { Sidebar, SidebarContent }
export type { SidebarAlign, SidebarContentProps, SidebarProps }
