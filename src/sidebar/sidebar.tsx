import * as React from 'react'
import FocusLock from 'react-focus-lock'

import classNames from 'classnames'
import { useMergeRefs } from 'use-callback-ref'

import { Box } from '../box'
import { polymorphicComponent } from '../utils/polymorphism'

import { useResizablePanel } from './use-resizable-panel'

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
    unmountOnHide: boolean
    panelId: string
    panelRef: React.RefObject<HTMLElement | null>
    onDismiss?: () => void
    width?: number
    minWidth?: number
    maxWidth?: number
    defaultWidth?: number
    resizeStep?: number
    onWidthChange?: (width: number) => void
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

    /**
     * Commits a new width: on pointer up after a drag, and on each keystroke
     * during keyboard resize. Debounce persistence if it is expensive.
     */
    onWidthChange?: (width: number) => void

    /** Minimum width allowed during resize. */
    minWidth?: number

    /** Maximum width allowed during resize. */
    maxWidth?: number

    /** Width restored on a double-click reset of the handle. */
    defaultWidth?: number

    /** Step in px for keyboard (arrow-key) resize. */
    resizeStep?: number

    /**
     * Keeps the content mounted while closed by default so internal state (chat
     * drafts, scroll position) survives. When `true`, the content unmounts at the
     * end of the exit transition.
     *
     * @default false
     */
    unmountOnHide?: boolean

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
    onWidthChange,
    minWidth,
    maxWidth,
    defaultWidth,
    resizeStep,
    unmountOnHide = false,
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
        unmountOnHide,
        panelId,
        panelRef,
        onDismiss,
        width,
        minWidth,
        maxWidth,
        defaultWidth,
        resizeStep,
        onWidthChange,
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
            unmountOnHide,
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

        const childrenToRender = useDeferredUnmount({ isOpen, unmountOnHide, panelRef })
            ? children
            : null

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
                    {childrenToRender}
                </FocusLock>
            </Box>
        )
    },
)

/**
 * Returns whether the panel children should be rendered right now. With
 * `unmountOnHide`, the children stay mounted through the exit transition and
 * drop once it ends (with a duration fallback for reduced motion). Without it,
 * the children are always mounted.
 */
function useDeferredUnmount({
    isOpen,
    unmountOnHide,
    panelRef,
}: {
    isOpen: boolean
    unmountOnHide: boolean
    panelRef: React.RefObject<HTMLElement | null>
}): boolean {
    const [exited, setExited] = React.useState(() => unmountOnHide && !isOpen)
    const [wasOpen, setWasOpen] = React.useState(isOpen)

    // Adjust state during render (not in an effect) when the open prop flips:
    // re-opening cancels a pending exit immediately so the next close animates again.
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
            // setExited only fires from async callbacks below, never synchronously here.
            const fallbackTimeout = window.setTimeout(() => setExited(true), 500)

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

//
// SidebarResizeHandle
//

type SidebarResizeHandleProps = {
    /** Accessible name for the separator, e.g. "Resize sidebar". */
    'aria-label'?: string

    /**
     * Human-readable current width for assistive tech. Derived from the width as
     * `"{width}px"` when omitted; pass a localized string to override.
     */
    'aria-valuetext'?: string
}

/**
 * Adds drag and keyboard resize to the sidebar. Rendered by the consumer inside
 * `<SidebarContent>`; the sidebar is not resizable without it. Renders a
 * `role="separator"` on the inner edge (right for `align="start"`, left for
 * `align="end"`) and wires `aria-controls` to the panel internally.
 *
 * Keyboard: arrows resize by `resizeStep` (edge-aware), Home/End jump to
 * min/max, double-click resets to `defaultWidth`. There is no Enter/Space (it is
 * a separator, not a button). The handle leaves the tab order and the
 * accessibility tree while the sidebar is closed.
 *
 * @see Sidebar
 * @see SidebarContent
 */
function SidebarResizeHandle({
    'aria-label': ariaLabel,
    'aria-valuetext': ariaValueText,
}: SidebarResizeHandleProps) {
    const {
        align,
        isOpen,
        panelId,
        panelRef,
        width,
        minWidth,
        maxWidth,
        defaultWidth,
        resizeStep,
        onWidthChange,
    } = useSidebarContext('SidebarResizeHandle')

    const edge = align === 'start' ? 'right' : 'left'
    const committedWidth = width ?? defaultWidth ?? 0
    const minValuePx = minWidth ?? committedWidth
    const maxValuePx = maxWidth ?? committedWidth

    const { currentValuePx, onDoubleClick, onKeyDown, onPointerDown } = useResizablePanel({
        defaultValuePx: defaultWidth ?? committedWidth,
        disabled: !isOpen,
        edge,
        maxValuePx,
        minValuePx,
        onValueCommit: (next) => onWidthChange?.(next),
        panelRef,
        stepPx: resizeStep ?? 0,
        valuePx: committedWidth,
    })

    return (
        <div
            role="separator"
            tabIndex={isOpen ? 0 : -1}
            aria-hidden={isOpen ? undefined : true}
            aria-controls={panelId}
            aria-label={ariaLabel}
            aria-orientation="vertical"
            aria-valuemin={minValuePx}
            aria-valuemax={maxValuePx}
            aria-valuenow={currentValuePx}
            aria-valuetext={ariaValueText ?? `${currentValuePx}px`}
            data-align={align}
            data-disabled={isOpen ? undefined : 'true'}
            onDoubleClick={onDoubleClick}
            onKeyDown={onKeyDown}
            onPointerDown={onPointerDown}
            className={styles.resizeHandle}
        />
    )
}

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

SidebarContent.displayName = 'SidebarContent'

export { Sidebar, SidebarContent, SidebarResizeHandle, useSidebar }
export type {
    SidebarAlign,
    SidebarContentProps,
    SidebarOverlayMode,
    SidebarProps,
    SidebarResizeHandleProps,
}
