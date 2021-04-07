import * as React from 'react'
import { BaseField, BaseFieldProps } from '../base-field'
import { Box } from '../box'
import styles from './text-area.module.css'

type TextAreaProps = BaseFieldProps<HTMLTextAreaElement>

function TextArea({
    id,
    label,
    secondaryLabel,
    auxiliaryLabel,
    hint,
    maxWidth,
    ...props
}: TextAreaProps) {
    return (
        <BaseField
            id={id}
            label={label}
            secondaryLabel={secondaryLabel}
            auxiliaryLabel={auxiliaryLabel}
            hint={hint}
            className={styles.componentTextArea}
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
