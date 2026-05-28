import * as React from 'react'
import { forwardRef } from 'react'

import { Box } from '../box'

import styles from './outlined-control-container.module.css'

import type { ObfuscatedClassName } from '../utils/common-types'

const CONTROL_SCOPE_SELECTOR = '[data-reactist-control]'
const FOCUSABLE_CONTROL_SELECTOR = [
    'input',
    'select',
    'textarea',
    'button',
    'a[href]',
    '[role="button"]',
    '[tabindex]:not([tabindex="-1"])',
].join(',')
const INTERACTIVE_SELECTOR = [
    'button',
    'a[href]',
    'input',
    'select',
    'textarea',
    '[role="button"]',
].join(',')
const TEXT_ENTRY_INPUT_TYPES = new Set([
    'email',
    'number',
    'password',
    'search',
    'tel',
    'text',
    'url',
])

export type OutlinedControlContainerProps = {
    /**
     * The control element (or a layout containing one) to wrap. The wrapper
     * chrome (border, hover/focus, disabled/read-only background tint, error
     * border) derives from attributes on the focusable descendant. Clicking
     * the wrapper focuses the first focusable control descendant. It activates
     * button-like controls with `.click()` and native `<select>` elements with
     * `.showPicker()`.
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

            // Find the first focusable form control descendant. More robust
            // than firstElementChild — works whether the control is the
            // direct child (ControlPresentation) or nested inside a column
            // layout (BorderedTextField).
            const wrapper = controlWrapperRef.current
            const control = findWrappedControl(wrapper)
            if (!control) {
                onClick?.(event)
                return
            }

            if (isInteractiveElementOutsideControl(event.target, control)) return

            onClick?.(event)

            if (event.target instanceof Node && control.contains(event.target)) return

            control.focus()
            if (isDisabledControl(control) || isTextEntryControl(control)) return

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
            let didThrow = false
            let thrownError: unknown
            try {
                control.click()
            } catch (error) {
                didThrow = true
                thrownError = error
            }
            isDispatchedReentryRef.current = false

            if (didThrow) throw thrownError
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

function findWrappedControl(wrapper: HTMLElement | null) {
    if (!wrapper) return null

    const controlScope = wrapper.querySelector<HTMLElement>(CONTROL_SCOPE_SELECTOR)
    const searchRoot = controlScope ?? wrapper
    if (searchRoot.matches(FOCUSABLE_CONTROL_SELECTOR)) return searchRoot

    return searchRoot.querySelector<HTMLElement>(FOCUSABLE_CONTROL_SELECTOR)
}

function isInteractiveElementOutsideControl(target: EventTarget, control: HTMLElement) {
    if (!(target instanceof Element) || control.contains(target)) return false
    return target.closest(INTERACTIVE_SELECTOR) != null
}

function isDisabledControl(control: HTMLElement) {
    return (
        control.hasAttribute('disabled') ||
        isTruthyStateAttribute(control, 'aria-disabled') ||
        isTruthyStateAttribute(control, 'data-disabled')
    )
}

function isTruthyStateAttribute(control: HTMLElement, attribute: string) {
    const value = control.getAttribute(attribute)
    return value != null && value !== 'false'
}

function isTextEntryControl(control: HTMLElement) {
    if (control instanceof HTMLTextAreaElement) return true
    if (!(control instanceof HTMLInputElement)) return false

    return TEXT_ENTRY_INPUT_TYPES.has(control.type)
}
