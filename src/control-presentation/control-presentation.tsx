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

    forwardClickToControl?: boolean
    onClick?: React.MouseEventHandler<HTMLDivElement>

    /**
     * The control element (an `<input>`, an Ariakit Select trigger,
     * `<select>`, etc.). Attributes belonging to the control — `type`,
     * `value`, `onChange`, `readOnly`, `disabled`, `aria-invalid`, and so on —
     * are set on this element directly. The wrapper chrome (read-only
     * background, disabled state, error border) derives from those attributes.
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
        {
            startSlot,
            endSlot,
            forwardClickToControl = true,
            onClick,
            exceptionallySetClassName,
            children,
            ...rest
        },
        ref,
    ) {
        const controlWrapperRef = React.useRef<HTMLDivElement>(null)

        function handleWrapperClick(event: React.MouseEvent<HTMLDivElement>) {
            onClick?.(event)
            if (!forwardClickToControl) return

            const control = controlWrapperRef.current?.firstElementChild as HTMLElement | null
            control?.focus?.()
        }

        return (
            <Box
                ref={ref}
                {...rest}
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
