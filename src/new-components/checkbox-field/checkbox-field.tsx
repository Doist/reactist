import * as React from 'react'
import { VisuallyHidden } from 'reakit/VisuallyHidden'
import { Box } from '../box'
import { CheckboxIcon } from './checkbox-icon'

import styles from './checkbox-field.module.css'

type CheckboxFieldProps = Omit<JSX.IntrinsicElements['input'], 'type'> & {
    label?: string
    indeterminate?: boolean
}

function CheckboxField({
    label,
    className,
    style,
    checked,
    indeterminate = false,
    ...props
}: CheckboxFieldProps) {
    if (!label && !props['aria-label'] && !props['aria-labelledby']) {
        // eslint-disable-next-line no-console
        console.warn('A Checkbox needs a label')
    }

    const checkboxRef = React.useRef<HTMLInputElement>(null)
    React.useEffect(
        function setIndeterminate() {
            if (checkboxRef.current) {
                checkboxRef.current.indeterminate = indeterminate
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
                className,
                styles.container,
                { [styles.checked]: checked },
                'focus-marker-enabled-within',
            ]}
            style={style}
        >
            <VisuallyHidden>
                <input {...props} ref={checkboxRef} type="checkbox" checked={checked} />
            </VisuallyHidden>
            <CheckboxIcon
                aria-hidden
                checked={checked}
                indeterminate={indeterminate}
                disabled={props.disabled}
            />
            {label ? <span>{label}</span> : null}
        </Box>
    )
}

export { CheckboxField }
export type { CheckboxFieldProps }
