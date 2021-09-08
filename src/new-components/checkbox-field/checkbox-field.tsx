import * as React from 'react'
import { useForkRef } from 'reakit-utils'
import { HiddenVisually } from '../hidden-visually'
import { Box } from '../box'
import { Text } from '../text'
import { CheckboxIcon } from './checkbox-icon'

import styles from './checkbox-field.module.css'

type CheckboxFieldProps = Omit<JSX.IntrinsicElements['input'], 'type' | 'className'> & {
    label?: string
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
                'focus-marker-enabled-within',
            ]}
        >
            <HiddenVisually>
                <input
                    {...props}
                    ref={combinedRef}
                    type="checkbox"
                    checked={isChecked}
                    disabled={disabled}
                    onChange={(event) => {
                        onChange?.(event)
                        if (!event.defaultPrevented) {
                            setChecked(event.currentTarget.checked)
                        }
                    }}
                />
            </HiddenVisually>
            <CheckboxIcon
                aria-hidden
                checked={isChecked}
                indeterminate={indeterminate}
                disabled={disabled}
            />
            {label ? <Text>{label}</Text> : null}
        </Box>
    )
})

export { CheckboxField }
export type { CheckboxFieldProps }
