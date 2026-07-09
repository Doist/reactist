import * as React from 'react'
import { createPortal } from 'react-dom'
import FocusLock from 'react-focus-lock'

import { suppressOthers } from 'aria-hidden'
import classNames from 'classnames'
import { useMergeRefs } from 'use-callback-ref'

import { Box } from '../box'

import { clamp, useResizablePanel } from './use-resizable-panel'

import styles from './sidebar.module.css'

import type { ObfuscatedClassName } from '../utils/common-types'

type SidebarAlign = 'start' | 'end'

type SidebarOverlayMode = 'plain' | 'dialog' | 'modal'

type SidebarContextValue = {
    align: SidebarAlign
    overlayMode: SidebarOverlayMode
    isOpen: boolean
    isOverlay: boolean
    overlayOpen: boolean
    shouldTrap: boolean
    unmountOnHide: boolean
    panelId: string
    panelRef: React.RefObject<HTMLDivElement | null>
    backdropRef: React.RefObject<HTMLDivElement | null>
    dismissOverlayOnEscape: boolean
    onDismiss?: () => void
    width?: number
    minWidth?: number
    maxWidth?: number
    defaultWidth?: number
    resizeStep?: number
    onWidthChange?: (width: number) => void
}

const SidebarContext = React.createContext<SidebarContextValue | null>(null)

/**
 * Scoped to `<SidebarContent>`, used to provide:
 *   * The live region that `<SidebarPersistentContent>` portals into
 *   * The panel's `unmountOnHide` option to emit warnings when it's used
 *     in conjunction with `<SidebarPersistentContent>`
 */
type SidebarContentContextValue = { region: HTMLElement | null; unmountOnHide: boolean }
const SidebarContentContext = React.createContext<SidebarContentContextValue | undefined>(undefined)

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
     * The side the sidebar attaches to. Controls the slide direction, which side
     * to apply the overlay inset (i.e. side closer to the edge of the viewport),
     * and the resize handle edge (side opposite from the viewport edge)
     */
    align: SidebarAlign

    /**
     * Whether the sidebar is open
     */
    isOpen: boolean

    /**
     * Identifies the sidebar instance. Applied as the `id` of the
     * `<SidebarContent>` panel and various `aria-controls`. Auto-generated
     * when omitted.
     */
    id?: string

    /**
     * When true, the sidebar floats over the content. When false, it sits in flow
     *
     * @default false
     */
    isOverlay?: boolean

    /**
     * How the overlay behaves while floating:
     *
     * - `plain`: the background is interactive with no extra attributes applied
     * - `dialog`: the panel is assigned the dialog role, with the background still interactive
     * - `modal`: the background is blocked with a backdrop. On top of being a dialog, focus trap
     *   and `aria-modal` are applied to the panel
     *
     * @default 'plain'
     */
    overlayMode?: SidebarOverlayMode

    /**
     * Determines whether `onDismiss` is called when the Esc key is pressed while the
     * panel has focus in overlay mode
     *
     * @default false
     */
    dismissOverlayOnEscape?: boolean

    /**
     * Called when the user intends to dismiss the sidebar
     */
    onDismiss?: () => void

    /**
     * Controlled width in px. The rendered width may be smaller when the viewport is
     * constrained while in overlay mode
     */
    width?: number

    /**
     * Fired when a new width should be committed
     */
    onWidthChange?: (width: number) => void

    /**
     * Minimum width allowed during resize
     */
    minWidth?: number

    /**
     * Maximum width allowed during resize
     */
    maxWidth?: number

    /**
     * Width restored on a double-click reset of the handle
     */
    defaultWidth?: number

    /**
     * The step in px when resizing via arrow keys. When omitted or a non-positive value
     * is set, arrow key resizing is disabled
     */
    resizeStep?: number

    /**
     * When `true`, the content unmounts at the end of the exit transition. Omit if the content's
     * internal state needs to be kept
     *
     * @default false
     */
    unmountOnHide?: boolean

    /**
     * The content of the panel via `<SidebarContent>`, and an optional `<SidebarResizeHandle>`
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
    const panelRef = React.useRef<HTMLDivElement>(null)
    const backdropRef = React.useRef<HTMLDivElement>(null)

    const overlayOpen = isOverlay && isOpen
    const shouldTrap = overlayOpen && overlayMode === 'modal'

    React.useLayoutEffect(
        function suppressBackgroundWhileModal() {
            if (!shouldTrap) return
            const panel = panelRef.current
            if (!panel) return
            const kept = backdropRef.current ? [panel, backdropRef.current] : [panel]
            return suppressOthers(kept)
        },
        [shouldTrap, panelRef, backdropRef],
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
        backdropRef,
        dismissOverlayOnEscape,
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
         * `<section>`. An optional `<SidebarResizeHandle>` should be included for resize support.
         */
        children?: React.ReactNode

        /** Test identifier applied to the panel element. */
        'data-testid'?: string

        [dataAttribute: `data-${string}`]: unknown
    }

const SIDEBAR_WIDTH_VAR = '--reactist-sidebar-width'

/**
 * Provides the positioning as a docked panel or as an overlaying dialog. It is responsible for
 * the slide and collapse transitions, and the committed width.
 *
 * Its `aria-label`/`aria-labelledby` attributes are only applied when rendered as a dialog.
 */
const SidebarContent = React.forwardRef<HTMLDivElement, SidebarContentProps>(
    function SidebarContent(
        {
            exceptionallySetClassName,
            children,
            style,
            onKeyDown: consumerOnKeyDown,
            'aria-label': ariaLabel,
            'aria-labelledby': ariaLabelledby,
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
            minWidth,
            maxWidth,
            dismissOverlayOnEscape,
            onDismiss,
        } = useSidebarContext('SidebarContent')

        const mergedRef = useMergeRefs([panelRef, ref])
        const inertContentRef = React.useRef<HTMLDivElement>(null)
        const [persistentRegion, setPersistentRegion] = React.useState<HTMLElement | null>(null)

        const isDialog = overlayOpen && (overlayMode === 'dialog' || overlayMode === 'modal')
        const ariaModal = overlayOpen && overlayMode === 'modal' ? true : undefined

        // Note: `inert` is only supported as a prop in React 19+. When dropping support for React 18,
        // add `inert={!isOpen}` to the `inertContentRef` element, and remove this effect
        React.useEffect(
            function inertContentWhileClosed() {
                inertContentRef.current?.toggleAttribute('inert', !isOpen)
            },
            [isOpen],
        )

        React.useEffect(
            function warnWhenDockedCollapseHasNoWidth() {
                if (!isOverlay && !isOpen && width == null && !unmountOnHide) {
                    // eslint-disable-next-line no-console
                    console.warn(
                        '[Sidebar]: a docked <Sidebar> needs a controlled `width` to collapse when closed; without one the closed panel stays visible while its contents are inert.',
                    )
                }
            },
            [isOverlay, isOpen, width, unmountOnHide],
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

        const persistentContentValue = React.useMemo(
            () => ({ region: persistentRegion, unmountOnHide }),
            [persistentRegion, unmountOnHide],
        )

        function handlePanelKeyDown(event: React.KeyboardEvent<HTMLDivElement>) {
            // Execute the consumer's handler first, allowing it to set preventDefault if necessary
            consumerOnKeyDown?.(event)
            if (event.defaultPrevented) return
            if (overlayOpen && dismissOverlayOnEscape && event.key === 'Escape') {
                onDismiss?.()
            }
        }

        return (
            <Box
                {...rest}
                as="div"
                ref={mergedRef}
                onKeyDown={handlePanelKeyDown}
                display="flex"
                flexDirection="column"
                flexShrink={0}
                id={panelId}
                role={isDialog ? 'dialog' : undefined}
                aria-modal={ariaModal}
                aria-label={isDialog ? ariaLabel : undefined}
                aria-labelledby={isDialog ? ariaLabelledby : undefined}
                data-align={align}
                data-overlay={isOverlay ? 'true' : 'false'}
                data-state={isOpen ? 'open' : 'closed'}
                style={{ ...style, ...widthStyle }}
                className={classNames(styles.panel, exceptionallySetClassName)}
            >
                <FocusLock disabled={!shouldTrap} returnFocus className={styles.focusLock}>
                    <div ref={setPersistentRegion} className={styles.persistentContent} />
                    <SidebarContentContext.Provider value={persistentContentValue}>
                        <div ref={inertContentRef} className={styles.inertContent}>
                            {childrenToRender}
                        </div>
                    </SidebarContentContext.Provider>
                </FocusLock>
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

//
// SidebarResizeHandle
//

type SidebarResizeHandleProps = {
    /** Accessible name for the separator */
    'aria-label'?: string

    /**
     * Human-readable current width for assistive tech. Derived from the width as
     * `"{width}px"` when omitted
     */
    'aria-valuetext'?: string
    [dataAttribute: `data-${string}`]: string | number | boolean | undefined
}

/**
 * When placed within `<SidebarContent>`, this adds drag and keyboard resize
 * to the sidebar. Renders a `role="separator"` on the inner edge (right for
 * `align="start"`, left for `align="end"`) and sets up `aria-controls` to the
 * panel internally.
 */
function SidebarResizeHandle({
    'aria-label': ariaLabel,
    'aria-valuetext': ariaValueText,
    ...dataProps
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

    // RTL note: while the panel's position respects RTL via CSS, the resize direction does not
    const edge = align === 'start' ? 'right' : 'left'
    const committedWidth = width ?? defaultWidth ?? 0
    const minValuePx = minWidth ?? committedWidth
    const maxValuePx = maxWidth ?? committedWidth

    const { currentValuePx, onDoubleClick, onKeyDown, onPointerDown } = useResizablePanel({
        applyValue: width != null,
        cssVariable: SIDEBAR_WIDTH_VAR,
        defaultValuePx: defaultWidth ?? committedWidth,
        disabled: !isOpen || width == null,
        edge,
        maxValuePx,
        minValuePx,
        onValueCommit: (next) => onWidthChange?.(next),
        panelRef,
        stepPx: resizeStep ?? 0,
        valuePx: committedWidth,
    })

    const hasResizeRange = minWidth != null && maxWidth != null && minWidth < maxWidth
    const resizeWarning =
        width == null
            ? '[Sidebar]: <SidebarResizeHandle> needs a controlled `width` on <Sidebar> to resize.'
            : !hasResizeRange
              ? '[Sidebar]: <SidebarResizeHandle> needs `minWidth` and `maxWidth` (with minWidth < maxWidth) on <Sidebar>.'
              : null

    React.useEffect(
        function warnOnDegenerateResizeConfig() {
            if (resizeWarning) {
                // eslint-disable-next-line no-console
                console.warn(resizeWarning)
            }
        },
        [resizeWarning],
    )

    return (
        <div
            {...dataProps}
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
            onDoubleClick={onDoubleClick}
            onKeyDown={onKeyDown}
            onPointerDown={onPointerDown}
            className={styles.resizeHandle}
        />
    )
}

//
// SidebarPersistentContent
//

type SidebarPersistentContentProps = { children?: React.ReactNode }

/**
 * This slot allows its children to be interactive when the sidebar is closed, and must be
 * placed within `<SidebarContent>`.
 *
 * Typically used for a toggle that transitions between being inside the panel while open,
 * and outside of it when closed. Content placed in this slot would sit outside of the region that's
 * marked as inert when the panel is closed, but remain within the panel's tab order and focus trap
 * (when overlayMode is modal).
 */
function SidebarPersistentContent({ children }: SidebarPersistentContentProps) {
    const content = React.useContext(SidebarContentContext)
    const region = content?.region ?? null
    const isOutsideContent = content === undefined
    const unmountsOnHide = content?.unmountOnHide ?? false

    React.useEffect(
        function warnOnMisconfiguration() {
            if (isOutsideContent) {
                // eslint-disable-next-line no-console
                console.warn(
                    '[Sidebar]: <SidebarPersistentContent> must be nested within <SidebarContent>.',
                )
            } else if (unmountsOnHide) {
                // eslint-disable-next-line no-console
                console.warn(
                    '[Sidebar]: `unmountOnHide` on <Sidebar> overrides <SidebarPersistentContent>, which causes its contents to unmount along with the panel.',
                )
            }
        },
        [isOutsideContent, unmountsOnHide],
    )

    return region ? createPortal(children, region) : null
}

//
// Backdrop
//

function SidebarBackdrop() {
    const { isOverlay, overlayMode, isOpen, onDismiss, backdropRef } =
        useSidebarContext('SidebarBackdrop')

    // Note: this is required for type-compatibility with React 18. `backdropRef` can be passed to `ref` directly below once we drop support
    const mergedBackdropRef = useMergeRefs([backdropRef])

    if (!isOverlay || overlayMode !== 'modal') return null

    return (
        <div
            ref={mergedBackdropRef}
            aria-hidden="true"
            data-state={isOpen ? 'open' : 'closed'}
            data-testid="sidebar-backdrop"
            className={styles.backdrop}
            onClick={onDismiss}
        />
    )
}

SidebarContent.displayName = 'SidebarContent'

export { Sidebar, SidebarContent, SidebarPersistentContent, SidebarResizeHandle }
export type {
    SidebarAlign,
    SidebarContentProps,
    SidebarOverlayMode,
    SidebarPersistentContentProps,
    SidebarProps,
    SidebarResizeHandleProps,
}
