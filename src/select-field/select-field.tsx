import { forwardRef } from 'react'

import { BaseField } from '../base-field'
import { Box } from '../box'

import styles from './select-field.module.css'

import type { BaseFieldVariantProps, FieldComponentProps } from '../base-field'

interface SelectFieldProps
    extends Omit<
            FieldComponentProps<HTMLSelectElement>,
            | 'maxLength'
            | 'characterCountPosition'
            | 'endSlot'
            | 'supportsStartAndEndSlots'
            | 'endSlotPosition'
        >,
        BaseFieldVariantProps {}

const SelectField = forwardRef<HTMLSelectElement, SelectFieldProps>(function SelectField(
    {
        variant = 'default',
        id,
        label,
        value,
        auxiliaryLabel,
        message,
        tone,
        maxWidth,
        children,
        hidden,
        'aria-describedby': ariaDescribedBy,
        onChange: originalOnChange,
        ...props
    },
    ref,
) {
    return (
        <BaseField
            variant={variant}
            id={id}
            label={label}
            value={value}
            auxiliaryLabel={auxiliaryLabel}
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
                    <select
                        {...props}
                        {...extraProps}
                        ref={ref}
                        onChange={(event) => {
                            originalOnChange?.(event)
                        }}
                    >
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
