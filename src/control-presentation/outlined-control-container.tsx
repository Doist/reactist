import * as React from 'react'
import { forwardRef } from 'react'

import { Box } from '../box'

import styles from './outlined-control-container.module.css'

import type { ObfuscatedClassName } from '../utils/common-types'

export type OutlinedControlContainerProps = {
    /**
     * The control element (or a layout containing one) to wrap. The wrapper
     * chrome (border, hover/focus, disabled/read-only background tint, error
     * border) derives from attributes on the focusable descendant. Clicking
     * the wrapper focuses the first focusable input/select/textarea
     * descendant and dispatches a `.click()` (or `.showPicker()` for native
     * `<select>`).
     *
     * Contract: assumes a single focusable control descendant. Behavior is
     * undefined if multiple focusable controls are inside.
     */
    children: React.ReactNode

    /**
     * The wrapper's border-radius.
     * - `small` (default) — used by `ControlPresentation`'s inline chrome.
     * - `large` — used by `BorderedTextField`'s outlined chrome.
     */
    borderRadius?: 'small' | 'large'

    /**
     * Optional click handler. Fires before the click-to-focus dispatch.
     * Intended for composition with library wrappers (e.g. Ariakit's
     * render-prop pattern) that forward an upstream onClick to the chrome
     * element. Component-level click handling normally lives on the inner
     * control.
     */
    onClick?: React.MouseEventHandler<HTMLDivElement>
} & ObfuscatedClassName

/**
 * Private primitive shared by `ControlPresentation` and `BorderedTextField`.
 *
 * Provides the visual chrome (border with idle/hover/focus/error states,
 * background tints for read-only/disabled descendants) and the
 * click-to-focus dispatch behavior. Has no padding, sizing, or slot layout
 * of its own — consumers add those on top.
 *
 * Contract: assumes a single focusable control descendant. Behavior is
 * undefined if multiple focusable controls are inside.
 */
export const OutlinedControlContainer = forwardRef<HTMLDivElement, OutlinedControlContainerProps>(
    function OutlinedControlContainer(
        { borderRadius = 'small', exceptionallySetClassName, onClick, children },
        ref,
    ) {
        const controlWrapperRef = React.useRef<HTMLDivElement>(null)
        const isDispatchedReentryRef = React.useRef(false)

        function handleWrapperClick(event: React.MouseEvent<HTMLDivElement>) {
            if (isDispatchedReentryRef.current) return

            onClick?.(event)

            // Find the first focusable form control descendant. More robust
            // than firstElementChild — works whether the control is the
            // direct child (ControlPresentation) or nested inside a column
            // layout (BorderedTextField).
            const wrapper = controlWrapperRef.current
            const control = wrapper?.querySelector<HTMLElement>('input, select, textarea')
            if (!control) return

            if (event.target instanceof Node && control.contains(event.target)) return

            control.focus()
            if (control instanceof HTMLSelectElement && typeof control.showPicker === 'function') {
                try {
                    control.showPicker()
                } catch {
                    // showPicker can throw (e.g. focus state issues) — fall back
                    // silently; the focus above is the minimum useful behavior.
                }
                return
            }

            // Guard against the synchronous re-entry from control.click() bubbling
            // back to this handler. Always clear after the dispatch returns so the
            // guard cannot latch if a consumer's onClick stops propagation.
            isDispatchedReentryRef.current = true
            control.click()
            isDispatchedReentryRef.current = false
        }

        return (
            <Box
                ref={ref}
                className={[
                    styles.container,
                    borderRadius === 'large' ? styles.borderRadiusLarge : styles.borderRadiusSmall,
                    exceptionallySetClassName,
                ]}
                onClick={handleWrapperClick}
            >
                <div ref={controlWrapperRef} style={{ display: 'contents' }}>
                    {children}
                </div>
            </Box>
        )
    },
)
