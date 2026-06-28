import * as React from 'react'
import FocusLock from 'react-focus-lock'

import classNames from 'classnames'
import { useMergeRefs } from 'use-callback-ref'

import { Box } from '../box'
import { polymorphicComponent } from '../utils/polymorphism'

import styles from './sidebar.module.css'

import type { ObfuscatedClassName } from '../utils/common-types'
import type { PolymorphicComponentProps } from '../utils/polymorphism'

/** Which edge the sidebar attaches to; drives slide direction and the handle edge. */
type SidebarAlign = 'start' | 'end'

/** What an overlay sidebar *is* while floating. See the prop docs for the matrix. */
type SidebarOverlayMode = 'plain' | 'dialog' | 'modal'

type SidebarContextValue = {
    align: SidebarAlign
    overlayMode: SidebarOverlayMode
    isOpen: boolean
    isOverlay: boolean
    /** `isOverlay && isOpen`: the panel is floating *and* shown. */
    overlayOpen: boolean
    /** `overlayOpen && overlayMode === 'modal'`: trap focus and render the backdrop. */
    shouldTrap: boolean
    panelId: string
    panelRef: React.RefObject<HTMLElement | null>
    onDismiss?: () => void
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
     * Whether the sidebar floats over the content (`true`) or sits in flow
     * (`false`). The consumer computes it from its own breakpoint source.
     *
     * @default false
     */
    isOverlay?: boolean

    /**
     * What the overlay is while floating:
     *
     * - `plain`: background interactive, no role, no backdrop.
     * - `dialog`: adds `role="dialog"`; background still interactive, no backdrop.
     * - `modal`: adds `aria-modal`, traps focus, and renders a dimming backdrop
     *   that blocks the background.
     *
     * Has no effect while docked (`isOverlay={false}`).
     *
     * @default 'plain'
     */
    overlayMode?: SidebarOverlayMode

    /**
     * Calls `onDismiss` when Escape is pressed while shown as an overlay. Respects
     * `event.defaultPrevented`, so app-level key handling can opt out.
     *
     * @default false
     */
    dismissOverlayOnEscape?: boolean

    /**
     * Called when the user dismisses the sidebar (Escape with `dismissOverlayOnEscape`,
     * or a click on the modal backdrop). The consumer flips `isOpen`.
     */
    onDismiss?: () => void

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
 * The host for a sidebar instance. It renders no element of its own (only the
 * modal backdrop, as a sibling of the panel); it holds the controlled state and
 * resize config, derives the overlay state, runs the Escape-to-dismiss effect,
 * and exposes everything to the slots through context.
 *
 * @see SidebarContent
 * @see SidebarResizeHandle
 */
function Sidebar({
    align,
    isOpen,
    id,
    isOverlay = false,
    overlayMode = 'plain',
    dismissOverlayOnEscape = false,
    onDismiss,
    width,
    children,
}: SidebarProps) {
    const generatedId = React.useId()
    const panelId = id ?? generatedId
    const panelRef = React.useRef<HTMLElement>(null)

    const overlayOpen = isOverlay && isOpen
    const shouldTrap = overlayOpen && overlayMode === 'modal'

    React.useEffect(
        function dismissOverlayOnEscapeEffect() {
            if (!overlayOpen || !dismissOverlayOnEscape) return

            function handleEscapeKeyDown(event: KeyboardEvent) {
                if (event.key === 'Escape' && !event.defaultPrevented) {
                    onDismiss?.()
                }
            }

            window.addEventListener('keydown', handleEscapeKeyDown)
            return () => window.removeEventListener('keydown', handleEscapeKeyDown)
        },
        [overlayOpen, dismissOverlayOnEscape, onDismiss],
    )

    const contextValue: SidebarContextValue = {
        align,
        overlayMode,
        isOpen,
        isOverlay,
        overlayOpen,
        shouldTrap,
        panelId,
        panelRef,
        onDismiss,
        width,
    }

    return (
        <SidebarContext.Provider value={contextValue}>
            {children}
            <SidebarBackdrop />
        </SidebarContext.Provider>
    )
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
        const {
            align,
            overlayMode,
            isOpen,
            isOverlay,
            overlayOpen,
            shouldTrap,
            panelId,
            panelRef,
            width,
        } = useSidebarContext('SidebarContent')

        const mergedRef = useMergeRefs([panelRef, ref])

        const isDialog = overlayOpen && (overlayMode === 'dialog' || overlayMode === 'modal')
        const resolvedRole = isDialog ? 'dialog' : landmarkRole
        const ariaModal = overlayOpen && overlayMode === 'modal' ? true : undefined

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
                role={resolvedRole}
                aria-modal={ariaModal}
                data-align={align}
                data-overlay={isOverlay ? 'true' : 'false'}
                data-state={isOpen ? 'open' : 'closed'}
                style={{ ...style, ...widthStyle }}
                className={classNames(styles.panel, exceptionallySetClassName)}
            >
                <FocusLock
                    disabled={!shouldTrap}
                    returnFocus
                    className={styles.focusLock}
                    data-testid="sidebar-focus-lock"
                >
                    {children}
                </FocusLock>
            </Box>
        )
    },
)

//
// Backdrop (auto-rendered for modal overlays)
//

/**
 * The dimming scrim for a modal overlay. Auto-rendered by `<Sidebar>` as a
 * sibling of the panel; it exists only while `overlayMode="modal"` and the
 * sidebar is an overlay, and dismisses on click. It is `aria-hidden` (the open
 * panel owns the accessible name and modal semantics; the close paths are the
 * trigger and Escape). Customize via `--reactist-sidebar-backdrop-*`.
 */
function SidebarBackdrop() {
    const { isOverlay, overlayMode, isOpen, onDismiss } = useSidebarContext('SidebarBackdrop')

    if (!isOverlay || overlayMode !== 'modal') return null

    return (
        // The panel owns the modal semantics; this layer is a presentational,
        // pointer-only dismiss affordance (Escape is the keyboard close path).
        // eslint-disable-next-line jsx-a11y/no-static-element-interactions, jsx-a11y/click-events-have-key-events
        <div
            aria-hidden="true"
            data-state={isOpen ? 'open' : 'closed'}
            data-testid="sidebar-backdrop"
            className={styles.backdrop}
            onClick={() => onDismiss?.()}
        />
    )
}

export { Sidebar, SidebarContent, useSidebar }
export type { SidebarAlign, SidebarContentProps, SidebarOverlayMode, SidebarProps }
