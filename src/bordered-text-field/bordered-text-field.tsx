import * as React from 'react'

import { BaseField } from '../base-field'
import { Box } from '../box'
import { OutlinedControlContainer } from '../control-presentation/outlined-control-container'

import styles from './bordered-text-field.module.css'

import type { FieldComponentProps } from '../base-field'

type BorderedTextFieldType = 'email' | 'search' | 'tel' | 'text' | 'url'

interface BorderedTextFieldProps
    extends Omit<FieldComponentProps<HTMLInputElement>, 'type' | 'characterCountPosition'> {
    type?: BorderedTextFieldType
    /** Optional full-height slot rendered to the right of the label+input column. */
    endSlot?: React.ReactElement | string | number
    /** Position of the character count. `'inline'` is not supported in this layout. */
    characterCountPosition?: 'below' | 'hidden'
    /** The maximum number of characters that the input field can accept. */
    maxLength?: number
}

const BorderedTextField = React.forwardRef<HTMLInputElement, BorderedTextFieldProps>(
    function BorderedTextField(
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
            endSlot,
            characterCountPosition = 'below',
            'aria-describedby': ariaDescribedBy,
            onChange: originalOnChange,
            ...props
        },
        ref,
    ) {
        return (
            <BaseField
                id={id}
                label={null}
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
                }) => (
                    <OutlinedControlContainer
                        borderRadius="large"
                        exceptionallySetClassName={styles.outlinedChrome}
                    >
                        <Box display="flex" width="full">
                            <Box flexGrow={1} display="flex" flexDirection="column" minWidth={0}>
                                <label htmlFor={resolvedId} className={styles.label}>
                                    {label}
                                </label>
                                <input
                                    {...props}
                                    ref={ref}
                                    id={resolvedId}
                                    type={type}
                                    value={value}
                                    maxLength={maxLength}
                                    aria-describedby={describedBy}
                                    aria-invalid={invalid}
                                    className={styles.input}
                                    onChange={(event) => {
                                        originalOnChange?.(event)
                                        onChange?.(event)
                                    }}
                                />
                            </Box>
                            {endSlot ? (
                                <Box
                                    display="flex"
                                    alignItems="center"
                                    justifyContent="center"
                                    className={styles.fullHeightSlot}
                                >
                                    {endSlot}
                                </Box>
                            ) : null}
                        </Box>
                    </OutlinedControlContainer>
                )}
            </BaseField>
        )
    },
)

export { BorderedTextField }
export type { BorderedTextFieldProps, BorderedTextFieldType }
