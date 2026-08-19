import * as React from 'react'

/**
 * The panel edge a resize gesture acts on.
 */
export type ResizablePanelEdge = 'left' | 'right' | 'top' | 'bottom'

type UseResizablePanelParams = {
    /**
     * When `false`, the committed value is not written to the panel, which allows
     * an uncontrolled component to retain its dimensions during initial mount and
     * after a resize. Defaults to `true`
     */
    applyValue?: boolean
    /** When set, read/write this CSS custom property instead of `width`/`height` */
    cssVariable?: string
    /** Width restored on a double-click reset */
    defaultValuePx: number
    /** When `true`, pointer and keyboard gestures are ignored */
    disabled?: boolean
    /** The edge the handle sits on, which sets the drag direction */
    edge: ResizablePanelEdge
    /** Upper clamp for the committed value */
    maxValuePx: number
    /** Lower clamp for the committed value */
    minValuePx: number
    /** Called with the committed value on pointer up and on each keyboard step */
    onValueCommit: (nextValuePx: number) => void
    /** The element whose size the gesture writes to */
    panelRef: React.RefObject<HTMLElement | null>
    /**
     * Keyboard arrow-key step in px. Arrow key resizing is disabled when this
     * is non-positive
     */
    stepPx: number
    /** The controlled, committed value in px */
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

function removeWindowListeners(listeners: Listeners) {
    window.removeEventListener('pointermove', listeners.pointerMove)
    window.removeEventListener('pointerup', listeners.pointerEnd)
    window.removeEventListener('pointercancel', listeners.pointerEnd)
}

export function clamp(value: number, min: number, max: number): number {
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
    const activeElement = document.activeElement
    return activeElement instanceof HTMLElement && activeElement !== document.body
        ? activeElement
        : null
}

function getKeyboardDeltaPx(edge: ResizablePanelEdge, key: string, stepPx: number): number | null {
    if (stepPx <= 0) return null
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
 * Returns the amount the Home/End keys should jump by based on the edge provided.
 * Home always resizes towards the left or top, while End moves towards the right
 * or bottom
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
 * Ported from Automations, this engine provides a performant way to
 * resize a panel element with pointer devices and the keyboard. During drag,
 * it writes the new dimension to either a provided CSS custom property,
 * or onto the DOM element directly, bypassing the render cycle. On drag end,
 * or via the keyboard, values are passed to the onValueCommit callback.
 *
 * Ref: https://github.com/Doist/automations/pull/3236
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
        if (!listenersRef.current) return
        removeWindowListeners(listenersRef.current)
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

        if (drag.currentValuePx !== drag.startValuePx) {
            onValueCommit(drag.currentValuePx)
        }

        if (drag.captureTarget.hasPointerCapture?.(drag.pointerId)) {
            drag.captureTarget.releasePointerCapture(drag.pointerId)
        }

        drag.previousFocusedElement?.focus({ preventScroll: true })
        dragRef.current = null
        clearListeners()
    }

    function onPointerDown(event: React.PointerEvent<HTMLDivElement>) {
        if (disabled) return
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

        function pointerMove(moveEvent: PointerEvent) {
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
            if (listenersRef.current) {
                removeWindowListeners(listenersRef.current)
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
