import * as React from 'react'
import { BaseField, FieldComponentProps } from '../base-field'
import { Box } from '../box'
import styles from './text-area.module.css'

type TextAreaProps = FieldComponentProps<HTMLTextAreaElement> & {
    rows?: number
}

function TextArea({
    variant = 'normal',
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
                <Box width="full">
                    <textarea {...props} {...extraProps} />
                </Box>
            )}
        </BaseField>
    )
}

export { TextArea }
export type { TextAreaProps }
