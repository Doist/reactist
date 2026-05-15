import * as React from 'react'
import { type ComponentProps, forwardRef } from 'react'

import classNames from 'classnames'

import { Box } from '../box'

import { FieldChromeContainer } from './field-chrome-container'

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
     * are set on this element directly. The wrapper chrome derives from those
     * attributes.
     *
     * Click handlers belong on the control itself, not on this wrapper.
     * Clicking the wrapper focuses the control.
     */
    children: React.ReactNode
} & ObfuscatedClassName &
    Omit<ComponentProps<typeof Box>, 'className'>

/**
 * The visual chrome of an inline, single-row, text-field-style input: a
 * 32px-tall row with optional start/end slots around a control element.
 *
 * Slot order (left to right): `startSlot` → control (children) → `endSlot`.
 *
 * Click handlers belong on the control itself, not on this wrapper.
 * Clicking the wrapper focuses the control.
 */
export const ControlPresentation = forwardRef<HTMLDivElement, ControlPresentationProps>(
    function ControlPresentation(
        { startSlot, endSlot, exceptionallySetClassName, children, ...rest },
        ref,
    ) {
        // Only `onClick` is meaningful to forward to FCC; other Box props are
        // silently dropped pending CP API tightening in a follow-up.
        const { onClick } = rest as { onClick?: React.MouseEventHandler<HTMLDivElement> }
        return (
            <FieldChromeContainer
                ref={ref}
                borderRadius="small"
                onClick={onClick}
                exceptionallySetClassName={classNames(styles.container, exceptionallySetClassName)}
            >
                {startSlot ? (
                    <Slot className={[styles.slot, styles.startSlot]}>{startSlot}</Slot>
                ) : null}
                <div className={styles.control}>{children}</div>
                {endSlot ? <Slot className={[styles.slot, styles.endSlot]}>{endSlot}</Slot> : null}
            </FieldChromeContainer>
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
