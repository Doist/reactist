import * as React from 'react'
import { useForkRef } from 'ariakit-utils'
import { Box } from '../box'
import { Text } from '../text'
import { CheckboxIcon } from './checkbox-icon'

import styles from './checkbox-field.module.css'

type CheckboxFieldProps = Omit<
    JSX.IntrinsicElements['input'],
    | 'type'
    | 'className'
    | 'disabled'
    | 'aria-controls'
    | 'aria-describedby'
    | 'aria-label'
    | 'aria-labelledby'
> & {
    'aria-checked'?: never
    /** Identifies the set of checkboxes controlled by the mixed checkbox for assistive technologies. */
    'aria-controls'?: string
    /** Identifies the element (or elements) that describes the checkbox for assistive technologies. */
    'aria-describedby'?: string
    /** Defines a string value that labels the current checkbox for assistive technologies. */
    'aria-label'?: string
    /** Identifies the element (or elements) that labels the current checkbox for assistive technologies. */
    'aria-labelledby'?: string
    /** Defines whether or not the checkbox is disabled. */
    disabled?: boolean
    /** The label for the checkbox element. */
    label?: React.ReactNode
    /** Defines whether or not the checkbox can be of a `mixed` state. */
    indeterminate?: boolean
}

const CheckboxField = React.forwardRef<HTMLInputElement, CheckboxFieldProps>(function CheckboxField(
    { label, disabled, indeterminate, defaultChecked, onChange, ...props },
    ref,
) {
    const isControlledComponent = typeof props.checked === 'boolean'
    if (typeof indeterminate === 'boolean' && !isControlledComponent) {
        // eslint-disable-next-line no-console
        console.warn('Cannot use indeterminate on an uncontrolled checkbox')
        indeterminate = undefined
    }

    if (!label && !props['aria-label'] && !props['aria-labelledby']) {
        // eslint-disable-next-line no-console
        console.warn('A Checkbox needs a label')
    }

    const [keyFocused, setKeyFocused] = React.useState(false)
    const [checkedState, setChecked] = React.useState(props.checked ?? defaultChecked ?? false)
    const isChecked = props.checked ?? checkedState

    const internalRef = React.useRef<HTMLInputElement>(null)
    const combinedRef = useForkRef(internalRef, ref)
    React.useEffect(
        function setIndeterminate() {
            if (internalRef.current && typeof indeterminate === 'boolean') {
                internalRef.current.indeterminate = indeterminate
            }
        },
        [indeterminate],
    )

    return (
        <Box
            as="label"
            display="flex"
            alignItems="center"
            className={[
                styles.container,
                disabled ? styles.disabled : null,
                isChecked ? styles.checked : null,
                keyFocused ? styles.keyFocused : null,
            ]}
        >
            <input
                {...props}
                ref={combinedRef}
                type="checkbox"
                aria-checked={indeterminate ? 'mixed' : isChecked}
                checked={isChecked}
                disabled={disabled}
                onChange={(event) => {
                    onChange?.(event)
                    if (!event.defaultPrevented) {
                        setChecked(event.currentTarget.checked)
                    }
                }}
                onBlur={(event) => {
                    setKeyFocused(false)
                    props?.onBlur?.(event)
                }}
                onKeyUp={(event) => {
                    setKeyFocused(true)
                    props?.onKeyUp?.(event)
                }}
            />
            <CheckboxIcon
                checked={isChecked}
                disabled={disabled}
                indeterminate={indeterminate}
                aria-hidden
            />
            {label ? typeof label === 'string' ? <Text>{label}</Text> : label : null}
        </Box>
    )
})

export { CheckboxField }
export type { CheckboxFieldProps }
