import * as React from 'react'

/**
 * The panel edge a resize gesture acts on. The sidebar only ever resizes along
 * the inline axis (`left` / `right`), but the engine supports the block axis too
 * so it can be reused for other resizable surfaces.
 */
export type ResizablePanelEdge = 'left' | 'right' | 'top' | 'bottom'

type UseResizablePanelParams = {
    /**
     * When `false`, the committed value is not written to the panel, so a panel
     * with no controlled value keeps its natural size instead of collapsing.
     * Defaults to `true`.
     */
    applyValue?: boolean
    /** When set, read/write this CSS custom property instead of `width` / `height`. */
    cssVariable?: string
    /** Width restored on a double-click reset. */
    defaultValuePx: number
    /** When `true`, pointer and keyboard gestures are ignored. */
    disabled?: boolean
    /** The edge the handle sits on, which sets the drag direction. */
    edge: ResizablePanelEdge
    /** Upper clamp for the committed value. */
    maxValuePx: number
    /** Lower clamp for the committed value. */
    minValuePx: number
    /** Called with the committed value on pointer up and on each keyboard step. */
    onValueCommit: (nextValuePx: number) => void
    /** The element whose size the gesture writes to. */
    panelRef: React.RefObject<HTMLElement | null>
    /** Keyboard arrow-key step in px. */
    stepPx: number
    /** The controlled, committed value in px. */
    valuePx: number
}

type DragState = {
    captureTarget: HTMLElement
    currentValuePx: number
    pointerId: number
    previousFocusedElement: HTMLElement | null
    startPointerPx: number
    startValuePx: number
}

type Listeners = {
    pointerEnd: () => void
    pointerMove: (event: PointerEvent) => void
}

function clamp(value: number, min: number, max: number): number {
    return Math.round(Math.min(max, Math.max(min, value)))
}

function getDimension(edge: ResizablePanelEdge): 'height' | 'width' {
    return edge === 'left' || edge === 'right' ? 'width' : 'height'
}

function getPointerPx(
    edge: ResizablePanelEdge,
    event: Pick<PointerEvent | React.PointerEvent, 'clientX' | 'clientY'>,
): number {
    return getDimension(edge) === 'width' ? event.clientX : event.clientY
}

function getDirection(edge: ResizablePanelEdge): 1 | -1 {
    return edge === 'right' || edge === 'bottom' ? 1 : -1
}

function getElementValuePx(
    element: HTMLElement | null,
    edge: ResizablePanelEdge,
    fallbackValuePx: number,
    cssVariable?: string,
): number {
    if (!element) return fallbackValuePx

    const dimension = getDimension(edge)
    const inlineValuePx = Number.parseFloat(
        cssVariable ? element.style.getPropertyValue(cssVariable) : element.style[dimension],
    )
    if (Number.isFinite(inlineValuePx) && inlineValuePx > 0) return inlineValuePx

    const measuredValuePx = element.getBoundingClientRect()[dimension]
    return measuredValuePx > 0 ? measuredValuePx : fallbackValuePx
}

function setElementValuePx(
    element: HTMLElement | null,
    edge: ResizablePanelEdge,
    valuePx: number,
    cssVariable?: string,
) {
    if (!element) return
    if (cssVariable) {
        element.style.setProperty(cssVariable, `${valuePx}px`)
    } else {
        element.style[getDimension(edge)] = `${valuePx}px`
    }
}

function getActiveElementForRestore(): HTMLElement | null {
    if (typeof document === 'undefined') return null

    const activeElement = document.activeElement
    return activeElement instanceof HTMLElement && activeElement !== document.body
        ? activeElement
        : null
}

function getKeyboardDeltaPx(edge: ResizablePanelEdge, key: string, stepPx: number): number | null {
    if (edge === 'left') {
        if (key === 'ArrowLeft') return stepPx
        if (key === 'ArrowRight') return -stepPx
    }
    if (edge === 'right') {
        if (key === 'ArrowLeft') return -stepPx
        if (key === 'ArrowRight') return stepPx
    }
    if (edge === 'top') {
        if (key === 'ArrowUp') return stepPx
        if (key === 'ArrowDown') return -stepPx
    }
    if (edge === 'bottom') {
        if (key === 'ArrowUp') return -stepPx
        if (key === 'ArrowDown') return stepPx
    }
    return null
}

/**
 * Maps a Home/End keypress to the absolute width it should jump to, or `null`
 * for any other key. `edge` changes the keys' directions: on `right`/`bottom`
 * edges Home returns `minValuePx` and End returns `maxValuePx`, while on
 * `left`/`top` edges they will be swapped.
 */
function getKeyboardJumpPx(
    edge: ResizablePanelEdge,
    key: string,
    minValuePx: number,
    maxValuePx: number,
): number | null {
    const growsForward = getDirection(edge) === 1
    if (key === 'Home') return growsForward ? minValuePx : maxValuePx
    if (key === 'End') return growsForward ? maxValuePx : minValuePx
    return null
}

/**
 * The imperative, render-free resize engine ported from Automations. A pointer
 * drag writes the panel size straight to the DOM (batched to one write per
 * animation frame) and commits once on pointer up; keyboard resize commits on
 * each keystroke. Nothing re-renders React per frame, so the panel's children
 * and any backdrop stay untouched during a drag.
 *
 * The handlers are plain functions; the React Compiler memoizes them. The one
 * constraint that keeps it Compiler-clean: `panelRef.current` is only read inside
 * event handlers, the animation-frame callback, or an effect, never during render.
 */
export function useResizablePanel({
    applyValue = true,
    cssVariable,
    defaultValuePx,
    disabled = false,
    edge,
    maxValuePx,
    minValuePx,
    onValueCommit,
    panelRef,
    stepPx,
    valuePx,
}: UseResizablePanelParams) {
    const dragRef = React.useRef<DragState | null>(null)
    const frameRef = React.useRef<number | null>(null)
    const listenersRef = React.useRef<Listeners | null>(null)
    const pendingValueRef = React.useRef<number | null>(null)
    const currentValuePx = clamp(valuePx, minValuePx, maxValuePx)

    function clearListeners() {
        const listeners = listenersRef.current
        if (!listeners) return

        window.removeEventListener('pointermove', listeners.pointerMove)
        window.removeEventListener('pointerup', listeners.pointerEnd)
        window.removeEventListener('pointercancel', listeners.pointerEnd)
        listenersRef.current = null
    }

    function flushPreview() {
        if (pendingValueRef.current === null) return

        setElementValuePx(panelRef.current, edge, pendingValueRef.current, cssVariable)
        pendingValueRef.current = null
    }

    function cancelFrame() {
        if (frameRef.current === null) return

        window.cancelAnimationFrame(frameRef.current)
        frameRef.current = null
    }

    function previewValue(nextValuePx: number) {
        pendingValueRef.current = nextValuePx
        if (frameRef.current !== null) return

        frameRef.current = window.requestAnimationFrame(() => {
            frameRef.current = null
            flushPreview()
        })
    }

    function commitValue(nextValuePx: number) {
        const clampedValuePx = clamp(nextValuePx, minValuePx, maxValuePx)

        setElementValuePx(panelRef.current, edge, clampedValuePx, cssVariable)
        onValueCommit(clampedValuePx)
    }

    function endDrag() {
        const drag = dragRef.current
        if (!drag) return

        cancelFrame()
        flushPreview()
        onValueCommit(drag.currentValuePx)

        if (
            typeof drag.captureTarget.hasPointerCapture === 'function' &&
            drag.captureTarget.hasPointerCapture(drag.pointerId)
        ) {
            drag.captureTarget.releasePointerCapture(drag.pointerId)
        }

        drag.previousFocusedElement?.focus({ preventScroll: true })
        dragRef.current = null
        clearListeners()
    }

    function onPointerDown(event: React.PointerEvent<HTMLDivElement>) {
        if (disabled) return
        // Only the primary button starts a resize; let right/middle-click through
        // so the context menu still opens.
        if (event.button !== 0) return

        event.preventDefault()
        event.stopPropagation()
        endDrag()

        const startValuePx = clamp(
            getElementValuePx(panelRef.current, edge, currentValuePx, cssVariable),
            minValuePx,
            maxValuePx,
        )

        event.currentTarget.setPointerCapture?.(event.pointerId)
        dragRef.current = {
            captureTarget: event.currentTarget,
            currentValuePx: startValuePx,
            pointerId: event.pointerId,
            previousFocusedElement: getActiveElementForRestore(),
            startPointerPx: getPointerPx(edge, event),
            startValuePx,
        }
        event.currentTarget.focus({ preventScroll: true })
        clearListeners()

        const pointerMove = (moveEvent: PointerEvent) => {
            const drag = dragRef.current
            if (!drag) return

            const pointerDeltaPx = getPointerPx(edge, moveEvent) - drag.startPointerPx
            const nextValuePx = drag.startValuePx + pointerDeltaPx * getDirection(edge)

            drag.currentValuePx = clamp(nextValuePx, minValuePx, maxValuePx)
            previewValue(drag.currentValuePx)
        }

        listenersRef.current = { pointerEnd: endDrag, pointerMove }
        window.addEventListener('pointermove', pointerMove)
        window.addEventListener('pointerup', endDrag)
        window.addEventListener('pointercancel', endDrag)
    }

    function onDoubleClick() {
        if (!disabled) commitValue(defaultValuePx)
    }

    function onKeyDown(event: React.KeyboardEvent<HTMLDivElement>) {
        if (disabled) return

        const nextValuePx = getKeyboardJumpPx(edge, event.key, minValuePx, maxValuePx)
        const deltaPx = getKeyboardDeltaPx(edge, event.key, stepPx)

        if (nextValuePx === null && deltaPx === null) return

        event.preventDefault()
        commitValue(
            nextValuePx ??
                getElementValuePx(panelRef.current, edge, currentValuePx, cssVariable) +
                    (deltaPx ?? 0),
        )
    }

    React.useEffect(
        function reapplyCommittedValue() {
            if (!applyValue) return
            setElementValuePx(panelRef.current, edge, currentValuePx, cssVariable)
        },
        [applyValue, currentValuePx, edge, panelRef, cssVariable],
    )

    React.useEffect(function cleanupOnUnmount() {
        return () => {
            if (frameRef.current !== null) {
                window.cancelAnimationFrame(frameRef.current)
                frameRef.current = null
            }

            const listeners = listenersRef.current
            if (listeners) {
                window.removeEventListener('pointermove', listeners.pointerMove)
                window.removeEventListener('pointerup', listeners.pointerEnd)
                window.removeEventListener('pointercancel', listeners.pointerEnd)
                listenersRef.current = null
            }
        }
    }, [])

    return {
        currentValuePx,
        onDoubleClick,
        onKeyDown,
        onPointerDown,
    }
}
