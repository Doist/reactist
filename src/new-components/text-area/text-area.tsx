import * as React from 'react'
import { BaseField, BaseFieldVariantProps, FieldComponentProps } from '../base-field'
import { Box } from '../box'
import styles from './text-area.module.css'

type TextAreaProps = FieldComponentProps<HTMLTextAreaElement> &
    BaseFieldVariantProps & {
        rows?: number
    }

function TextArea({
    variant = 'default',
    id,
    label,
    secondaryLabel,
    auxiliaryLabel,
    hint,
    message,
    tone,
    maxWidth,
    ...props
}: TextAreaProps) {
    return (
        <BaseField
            _fieldType="text"
            variant={variant}
            id={id}
            label={label}
            secondaryLabel={secondaryLabel}
            auxiliaryLabel={auxiliaryLabel}
            hint={hint}
            message={message}
            tone={tone}
            className={[
                styles.container,
                tone === 'error' ? styles.error : null,
                variant === 'bordered' ? styles.bordered : null,
            ]}
            maxWidth={maxWidth}
        >
            {(extraProps) => (
                <Box width="full" display="flex">
                    <textarea {...props} {...extraProps} />
                </Box>
            )}
        </BaseField>
    )
}

export { TextArea }
export type { TextAreaProps }
