import * as React from 'react'

import { BaseField } from '../base-field'
import { ControlPresentation } from '../control-presentation'

import styles from './select-field.module.css'

import type { FieldComponentProps } from '../base-field'

type SelectFieldProps = Omit<
    FieldComponentProps<HTMLSelectElement>,
    'maxLength' | 'characterCountPosition'
>

const SelectField = React.forwardRef<HTMLSelectElement, SelectFieldProps>(function SelectField(
    {
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
            {({ id: resolvedId, 'aria-describedby': describedBy, 'aria-invalid': invalid }) => (
                <ControlPresentation endSlot={<SelectChevron aria-hidden />}>
                    <select
                        {...props}
                        ref={ref}
                        id={resolvedId}
                        value={value}
                        className={styles.select}
                        aria-describedby={describedBy}
                        aria-invalid={invalid}
                        onChange={(event) => {
                            originalOnChange?.(event)
                        }}
                    >
                        {children}
                    </select>
                </ControlPresentation>
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
