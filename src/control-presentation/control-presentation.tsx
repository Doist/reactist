import * as React from 'react'
import { type ComponentProps, forwardRef } from 'react'

import { Box } from '../box'

import styles from './control-presentation.module.css'

import type { ObfuscatedClassName } from '../utils/common-types'

type SlotContent = React.ReactElement | string | number

export type ControlPresentationProps = {
    /**
     * A leading element rendered before the control — a decorative icon, a row
     * of chips/tags, or any other content that should sit on the leading edge.
     */
    startSlot?: SlotContent

    /**
     * Trailing content rendered immediately after the control (e.g. a unit,
     * counter, supplementary text, or an action button such as a clear button
     * or dropdown-trigger chevron).
     */
    endSlot?: SlotContent

    /**
     * The control element (an `<input>`, an Ariakit Select trigger,
     * `<select>`, etc.). Attributes belonging to the control — `type`,
     * `value`, `onChange`, `readOnly`, `disabled`, `aria-invalid`, and so on —
     * are set on this element directly. The wrapper chrome (read-only
     * background, disabled state, error border) derives from those attributes.
     *
     * Click handlers belong on the control itself, not on this wrapper.
     */
    children: React.ReactNode
} & ObfuscatedClassName &
    Omit<ComponentProps<typeof Box>, 'className'>

/**
 * A presentational primitive that renders the visual chrome of a
 * text-field-style input (border, hover / focus / disabled / read-only / error
 * states, plus an optional row of slots) around an arbitrary control element.
 *
 * Slot order (left to right):
 * `startSlot` → control (children) → `endSlot`.
 *
 * Clicking anywhere on the wrapper focuses the control.
 */
export const ControlPresentation = forwardRef<HTMLDivElement, ControlPresentationProps>(
    function ControlPresentation(
        { startSlot, endSlot, exceptionallySetClassName, children, ...rest },
        ref,
    ) {
        const controlWrapperRef = React.useRef<HTMLDivElement>(null)
        // The synthetic .click() we dispatch below bubbles back up to this
        // handler. Track that we're inside that re-entry so we can skip
        // re-invoking the consumer onClick + activation for it.
        const isDispatchedReentryRef = React.useRef(false)

        // `onClick` isn't part of `ControlPresentationProps` — consumers
        // should put click handlers on the inner control. This extraction
        // exists only to compose with onClick that arrives via render-prop
        // wrapping (e.g. Ariakit's Select trigger uses `render={<ControlPresentation/>}`
        // and forwards its own onClick), where the wrapper IS the trigger.
        const { onClick, ...restWithoutClick } = rest as typeof rest & {
            onClick?: React.MouseEventHandler<HTMLDivElement>
        }

        function handleWrapperClick(event: React.MouseEvent<HTMLDivElement>) {
            if (isDispatchedReentryRef.current) {
                isDispatchedReentryRef.current = false
                return
            }

            onClick?.(event)

            const control = controlWrapperRef.current?.firstElementChild as HTMLElement | null
            if (!control) return

            // Don't re-fire when the user clicked directly on the control —
            // it handled itself, and re-dispatching would double-activate.
            if (event.target instanceof Node && control.contains(event.target)) return

            // .focus() handles inputs (cursor/keyboard focus). The activation
            // hop differs by element type:
            //  - Native <select>: synthetic .click() is blocked by browsers
            //    for the native dropdown. .showPicker() is the correct API.
            //  - Everything else (inputs, native <button>, Ariakit Select
            //    triggers, anchors): .click() either activates the click
            //    handler or is harmlessly redundant.
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
                className={[styles.container, exceptionallySetClassName]}
                display="flex"
                alignItems="center"
                overflow="hidden"
                borderRadius="standard"
                onClick={handleWrapperClick}
            >
                {startSlot ? (
                    <Slot className={[styles.slot, styles.startSlot]}>{startSlot}</Slot>
                ) : null}
                <div ref={controlWrapperRef} className={styles.control}>
                    {children}
                </div>
                {endSlot ? <Slot className={[styles.slot, styles.endSlot]}>{endSlot}</Slot> : null}
            </Box>
        )
    },
)

function Slot(props: ComponentProps<typeof Box>) {
    return (
        <Box
            role="presentation"
            display="flex"
            alignItems="center"
            justifyContent="center"
            height="full"
            minWidth={0}
            {...props}
        />
    )
}
