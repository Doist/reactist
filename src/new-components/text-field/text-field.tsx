import * as React from 'react'
import { BaseField, BaseFieldProps } from '../base-field'
import { Box } from '../box'
import styles from './text-field.module.css'

type TextFieldProps = BaseFieldProps<HTMLInputElement>

function TextField({
    id,
    label,
    secondaryLabel,
    auxiliaryLabel,
    hint,
    type = 'text',
    maxWidth,
    ...props
}: TextFieldProps) {
    return (
        <BaseField
            id={id}
            label={label}
            secondaryLabel={secondaryLabel}
            auxiliaryLabel={auxiliaryLabel}
            hint={hint}
            maxWidth={maxWidth}
        >
            {(extraProps) => (
                <Box className={styles.inputWrapper}>
                    <input {...props} {...extraProps} type={type} />
                </Box>
            )}
        </BaseField>
    )
}

export { TextField }
export type { TextFieldProps }
