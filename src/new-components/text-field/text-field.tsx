import * as React from 'react'
import { BaseField } from '../base-field'
import { Box } from '../box'
import styles from './text-field.module.css'
import type { FieldComponentProps } from '../base-field'

type TextFieldType = 'email' | 'search' | 'tel' | 'text' | 'url'

type TextFieldProps = Omit<FieldComponentProps<HTMLInputElement>, 'type'> & {
    type?: TextFieldType
}

const TextField = React.forwardRef<HTMLInputElement, TextFieldProps>(function TextField(
    {
        id,
        label,
        secondaryLabel,
        auxiliaryLabel,
        hint,
        error,
        type = 'text',
        maxWidth,
        hidden,
        'aria-describedby': ariaDescribedBy,
        ...props
    },
    ref,
) {
    return (
        <BaseField
            id={id}
            label={label}
            secondaryLabel={secondaryLabel}
            auxiliaryLabel={auxiliaryLabel}
            hint={hint}
            error={error}
            maxWidth={maxWidth}
            hidden={hidden}
            aria-describedby={ariaDescribedBy}
        >
            {(extraProps) => (
                <Box className={[styles.inputWrapper, { [styles.error]: error }]}>
                    <input {...props} {...extraProps} type={type} ref={ref} />
                </Box>
            )}
        </BaseField>
    )
})

export { TextField }
export type { TextFieldProps, TextFieldType }
