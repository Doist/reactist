import * as React from 'react'

import classNames from 'classnames'
import { useMergeRefs } from 'use-callback-ref'

import { Box } from '../box'
import { polymorphicComponent } from '../utils/polymorphism'

import styles from './sidebar.module.css'

import type { ObfuscatedClassName } from '../utils/common-types'
import type { PolymorphicComponentProps } from '../utils/polymorphism'

/** Which edge the sidebar attaches to; drives slide direction and the handle edge. */
type SidebarAlign = 'start' | 'end'

type SidebarContextValue = {
    align: SidebarAlign
    isOpen: boolean
    panelId: string
    panelRef: React.RefObject<HTMLElement | null>
    width?: number
}

const SidebarContext = React.createContext<SidebarContextValue | null>(null)

function useSidebarContext(componentName: string): SidebarContextValue {
    const context = React.useContext(SidebarContext)
    if (context === null) {
        throw new Error(`${componentName} must be rendered inside <Sidebar>.`)
    }
    return context
}

/**
 * Reads the nearest `<Sidebar>` context. The slots use it internally; it is also
 * available to advanced consumers rendering custom pieces inside the provider.
 * Throws when called outside a `<Sidebar>`.
 */
function useSidebar(): SidebarContextValue {
    return useSidebarContext('useSidebar')
}

//
// Sidebar (provider)
//

type SidebarProps = {
    /**
     * The side the sidebar attaches to. Controls the slide direction, the
     * overlay inset edge, and the resize handle edge.
     */
    align: SidebarAlign

    /**
     * Whether the sidebar is open. Controlled: the consumer owns the state and
     * flips it (e.g. from a trigger button or a breakpoint change).
     */
    isOpen: boolean

    /**
     * Identifies the sidebar instance. Applied as the `id` of the
     * `<SidebarContent>` panel and used to wire the resize handle's
     * `aria-controls` (and a detached trigger's `aria-controls`). Auto-generated
     * when omitted.
     */
    id?: string

    /**
     * Controlled width in px, applied while docked and while floating. The
     * rendered width may be smaller when the viewport constrains a floating
     * panel, but the stored value is preserved.
     */
    width?: number

    /** The composed slots (`SidebarContent`, and an optional `SidebarResizeHandle`). */
    children?: React.ReactNode
}

/**
 * The host for a sidebar instance. It renders no element of its own; it holds the
 * controlled state and exposes it to the slots through context.
 *
 * @see SidebarContent
 */
function Sidebar({ align, isOpen, id, width, children }: SidebarProps) {
    const generatedId = React.useId()
    const panelId = id ?? generatedId
    const panelRef = React.useRef<HTMLElement>(null)

    const contextValue: SidebarContextValue = { align, isOpen, panelId, panelRef, width }

    return <SidebarContext.Provider value={contextValue}>{children}</SidebarContext.Provider>
}

//
// SidebarContent (the panel)
//

type SidebarContentOwnProps = ObfuscatedClassName & {
    /**
     * The landmark role applied while docked (or a `plain` overlay), together
     * with an accessible name (`aria-label` / `aria-labelledby`). When
     * `overlayMode` is `dialog` or `modal`, the rendered role becomes `dialog`
     * instead. The native `role` host prop is ignored in favour of this.
     */
    landmarkRole?: string

    /** The panel's skin and content, plus an optional `<SidebarResizeHandle>`. */
    children?: React.ReactNode

    /** Test identifier applied to the panel element. */
    'data-testid'?: string

    // Let consumers forward arbitrary data-* attributes onto the panel element.
    [dataAttribute: `data-${string}`]: unknown
}

type SidebarContentProps<ComponentType extends React.ElementType = 'aside'> =
    PolymorphicComponentProps<ComponentType, SidebarContentOwnProps, 'omitClassName'>

const SIDEBAR_WIDTH_VAR = '--reactist-sidebar-width'

/**
 * The sidebar panel. A polymorphic `Box` (default `aside`) that owns positioning
 * (in-flow vs `position: fixed`), the slide / collapse transition, dialog
 * semantics from `overlayMode`, and the committed width. Wraps its children in a
 * focus trap while shown as a modal overlay.
 *
 * The visual skin (background, rounding, padding) stays a consumer child or
 * `exceptionallySetClassName`; keep the clipping skin (`overflow: hidden`) a
 * child so the resize handle on the panel edge is not clipped.
 *
 * @see Sidebar
 */
const SidebarContent = polymorphicComponent<'aside', SidebarContentOwnProps, 'omitClassName'>(
    function SidebarContent(
        {
            as: component = 'aside',
            landmarkRole,
            exceptionallySetClassName,
            children,
            style,
            // The component owns the rendered role (landmark vs dialog); ignore any host role.
            role: _ignoredRole,
            ...rest
        },
        ref,
    ) {
        const { align, isOpen, panelId, panelRef, width } = useSidebarContext('SidebarContent')

        const mergedRef = useMergeRefs([panelRef, ref])

        const widthStyle =
            width != null
                ? ({
                      width: `${width}px`,
                      [SIDEBAR_WIDTH_VAR]: `${width}px`,
                  } as React.CSSProperties)
                : undefined

        return (
            <Box
                {...rest}
                as={component}
                ref={mergedRef}
                display="flex"
                flexDirection="column"
                flexShrink={0}
                id={panelId}
                role={landmarkRole}
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

export { Sidebar, SidebarContent, useSidebar }
export type { SidebarAlign, SidebarContentProps, SidebarProps }
