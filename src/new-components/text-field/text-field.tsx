import * as React from 'react'
import { BaseField, BaseFieldProps } from '../base-field'
import { Box } from '../box'
import styles from './text-field.module.css'

type TextFieldProps = BaseFieldProps<HTMLInputElement>

const TextField = React.forwardRef<HTMLInputElement, TextFieldProps>(function TextField(
    { id, label, secondaryLabel, auxiliaryLabel, hint, type = 'text', maxWidth, hidden, ...props },
    ref,
) {
    return (
        <BaseField
            id={id}
            label={label}
            secondaryLabel={secondaryLabel}
            auxiliaryLabel={auxiliaryLabel}
            hint={hint}
            maxWidth={maxWidth}
            hidden={hidden}
        >
            {(extraProps) => (
                <Box className={styles.inputWrapper}>
                    <input {...props} {...extraProps} type={type} ref={ref} />
                </Box>
            )}
        </BaseField>
    )
})

export { TextField }
export type { TextFieldProps }
