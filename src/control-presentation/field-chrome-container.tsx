import * as React from 'react'
import { type ComponentProps, forwardRef } from 'react'

import { Box } from '../box'

import styles from './field-chrome-container.module.css'

import type { ObfuscatedClassName } from '../utils/common-types'

export type FieldChromeContainerProps = {
    /**
     * The control element to wrap. The wrapper chrome (border, hover/focus,
     * disabled/read-only background tint, error border) derives from
     * attributes on this descendant.
     *
     * Clicking the wrapper focuses the first focusable descendant and
     * dispatches a `.click()` (or `.showPicker()` for native `<select>`).
     */
    children: React.ReactNode

    /**
     * The wrapper's border-radius.
     * - `small` (default) — used by `ControlPresentation`'s inline chrome.
     * - `large` — used by `BorderedTextField`'s outlined chrome.
     */
    borderRadius?: 'small' | 'large'
} & ObfuscatedClassName &
    Omit<ComponentProps<typeof Box>, 'className'>

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
export const FieldChromeContainer = forwardRef<HTMLDivElement, FieldChromeContainerProps>(
    function FieldChromeContainer(
        { borderRadius = 'small', exceptionallySetClassName, children, ...rest },
        ref,
    ) {
        const controlWrapperRef = React.useRef<HTMLDivElement>(null)
        const isDispatchedReentryRef = React.useRef(false)

        const { onClick, ...restWithoutClick } = rest as typeof rest & {
            onClick?: React.MouseEventHandler<HTMLDivElement>
        }

        function handleWrapperClick(event: React.MouseEvent<HTMLDivElement>) {
            if (isDispatchedReentryRef.current) {
                isDispatchedReentryRef.current = false
                return
            }

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

            isDispatchedReentryRef.current = true
            control.click()
        }

        return (
            <Box
                ref={ref}
                {...restWithoutClick}
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
