import * as React from 'react'
import { type ComponentProps, forwardRef } from 'react'

import classNames from 'classnames'

import { Box } from '../box'

import { OutlinedControlContainer } from './outlined-control-container'

import styles from './control-presentation.module.css'

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
     * The single control element to wrap.
     */
    children: React.ReactElement
} & Omit<ComponentProps<typeof OutlinedControlContainer>, 'borderRadius' | 'children'>

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
        { startSlot, endSlot, exceptionallySetClassName, onClick, children },
        ref,
    ) {
        return (
            <OutlinedControlContainer
                ref={ref}
                borderRadius="small"
                onClick={onClick}
                exceptionallySetClassName={classNames(styles.container, exceptionallySetClassName)}
            >
                {startSlot != null ? (
                    <Slot className={[styles.slot, styles.startSlot]}>{startSlot}</Slot>
                ) : null}
                <div className={styles.control} data-reactist-control>
                    {children}
                </div>
                {endSlot != null ? (
                    <Slot className={[styles.slot, styles.endSlot]}>{endSlot}</Slot>
                ) : null}
            </OutlinedControlContainer>
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
