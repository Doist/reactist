import * as React from 'react'
import { BaseField, BaseFieldVariantProps, FieldComponentProps } from '../base-field'
import { Box } from '../box'
import styles from './select-field.module.css'

interface SelectFieldProps extends FieldComponentProps<HTMLSelectElement>, BaseFieldVariantProps {}

const SelectField = React.forwardRef<HTMLSelectElement, SelectFieldProps>(function SelectField(
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
        children,
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
            maxWidth={maxWidth}
            hidden={hidden}
            aria-describedby={ariaDescribedBy}
        >
            {(extraProps) => (
                <Box
                    data-testid="select-wrapper"
                    className={[
                        styles.selectWrapper,
                        tone === 'error' ? styles.error : null,
                        variant === 'bordered' ? styles.bordered : null,
                    ]}
                >
                    <select {...props} {...extraProps} ref={ref}>
                        {children}
                    </select>
                    <SelectChevron aria-hidden />
                </Box>
            )}
        </BaseField>
    )
})

function SelectChevron(props: JSX.IntrinsicElements['svg']) {
    return (
        <svg width="16" height="16" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
            <path
                d="M11.646 5.646a.5.5 0 0 1 .708.708l-4 4a.5.5 0 0 1-.708 0l-4-4a.5.5 0 1 1 .708-.708L8 9.293l3.646-3.647z"
                fill="currentColor"
            />
        </svg>
    )
}

export { SelectField }
export type { SelectFieldProps }
