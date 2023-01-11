import * as React from 'react'
import { BaseField, BaseFieldVariantProps, FieldComponentProps } from '../base-field'
import { Box } from '../box'
import styles from './text-area.module.css'

type TextAreaProps = FieldComponentProps<HTMLTextAreaElement> &
    BaseFieldVariantProps & {
        rows?: number
    }

const TextArea = React.forwardRef<HTMLTextAreaElement, TextAreaProps>(function TextArea(
    {
        variant = 'default',
        id,
        label,
        secondaryLabel,
        auxiliaryLabel,
        hint,
        message,
        tone,
        maxWidth,
        hidden,
        'aria-describedby': ariaDescribedBy,
        ...props
    },
    ref,
) {
    return (
        <BaseField
            variant={variant}
            id={id}
            label={label}
            secondaryLabel={secondaryLabel}
            auxiliaryLabel={auxiliaryLabel}
            hint={hint}
            message={message}
            tone={tone}
            hidden={hidden}
            aria-describedby={ariaDescribedBy}
            className={[
                styles.textAreaContainer,
                tone === 'error' ? styles.error : null,
                variant === 'bordered' ? styles.bordered : null,
            ]}
            maxWidth={maxWidth}
        >
            {(extraProps) => (
                <Box width="full" display="flex">
                    <textarea {...props} {...extraProps} ref={ref} />
                </Box>
            )}
        </BaseField>
    )
})

export { TextArea }
export type { TextAreaProps }
