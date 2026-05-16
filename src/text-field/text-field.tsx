import * as React from 'react'

import { BaseField } from '../base-field'
import { ControlPresentation } from '../control-presentation'

import type { BaseFieldProps, FieldComponentProps } from '../base-field'

type TextFieldType = 'email' | 'search' | 'tel' | 'text' | 'url'

interface TextFieldProps
    extends Omit<FieldComponentProps<HTMLInputElement>, 'type' | 'supportsStartAndEndSlots'>,
        Pick<BaseFieldProps, 'characterCountPosition'> {
    type?: TextFieldType
    startSlot?: React.ReactElement | string | number
    endSlot?: React.ReactElement | string | number
    /** Maximum number of characters that the input field can accept. */
    maxLength?: number
}

const TextField = React.forwardRef<HTMLInputElement, TextFieldProps>(function TextField(
    {
        id,
        label,
        value,
        auxiliaryLabel,
        message,
        tone,
        type = 'text',
        maxWidth,
        maxLength,
        hidden,
        'aria-describedby': ariaDescribedBy,
        startSlot,
        endSlot,
        onChange: originalOnChange,
        characterCountPosition = 'below',
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
            maxLength={maxLength}
            hidden={hidden}
            aria-describedby={ariaDescribedBy}
            characterCountPosition={characterCountPosition}
        >
            {({
                id: resolvedId,
                'aria-describedby': describedBy,
                'aria-invalid': invalid,
                onChange,
                characterCountElement,
            }) => (
                <ControlPresentation
                    startSlot={startSlot}
                    endSlot={
                        characterCountElement || endSlot ? (
                            <>
                                {characterCountElement}
                                {endSlot}
                            </>
                        ) : undefined
                    }
                >
                    <input
                        {...props}
                        id={resolvedId}
                        type={type}
                        ref={ref}
                        value={value}
                        maxLength={maxLength}
                        aria-describedby={describedBy}
                        aria-invalid={invalid}
                        onChange={(event) => {
                            originalOnChange?.(event)
                            onChange?.(event)
                        }}
                    />
                </ControlPresentation>
            )}
        </BaseField>
    )
})

export { TextField }
export type { TextFieldProps, TextFieldType }
