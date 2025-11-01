import { forwardRef, useRef } from 'react'

import { useMergeRefs } from 'use-callback-ref'

import { BaseField, BaseFieldVariantProps } from '../base-field'
import { Box } from '../box'

import styles from './text-field.module.css'

import type { MouseEvent, ReactElement } from 'react'
import type { BaseFieldProps, FieldComponentProps } from '../base-field'

type TextFieldType = 'email' | 'search' | 'tel' | 'text' | 'url'

interface TextFieldProps
    extends Omit<FieldComponentProps<HTMLInputElement>, 'type' | 'supportsStartAndEndSlots'>,
        BaseFieldVariantProps,
        Pick<BaseFieldProps, 'characterCountPosition'> {
    type?: TextFieldType
    startSlot?: ReactElement | string | number
    endSlot?: ReactElement | string | number
    /**
     * The maximum number of characters that the input field can accept.
     * When this limit is reached, the input field will not accept any more characters.
     * The counter element will turn red when the number of characters is within 10 of the maximum limit.
     */
    maxLength?: number
}

const TextField = forwardRef<HTMLInputElement, TextFieldProps>(function TextField(
    {
        variant = 'default',
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
        endSlotPosition = 'bottom',
        ...props
    },
    ref,
) {
    const internalRef = useRef<HTMLInputElement>(null)
    const combinedRef = useMergeRefs([ref, internalRef])

    function handleClick(event: MouseEvent) {
        if (event.currentTarget === combinedRef.current) return
        internalRef.current?.focus()
    }

    const displayEndSlot =
        endSlot &&
        (variant === 'default' || (variant === 'bordered' && endSlotPosition === 'bottom'))

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
            maxLength={maxLength}
            hidden={hidden}
            aria-describedby={ariaDescribedBy}
            characterCountPosition={characterCountPosition}
            supportsStartAndEndSlots
            endSlot={endSlot}
            endSlotPosition={variant === 'bordered' ? endSlotPosition : undefined}
        >
            {({ onChange, characterCountElement, ...extraProps }) => (
                <Box
                    display="flex"
                    alignItems="center"
                    className={[
                        styles.inputWrapper,
                        tone === 'error' ? styles.error : null,
                        variant === 'bordered' ? styles.bordered : null,
                        props.readOnly ? styles.readOnly : null,
                    ]}
                    onClick={handleClick}
                >
                    {startSlot ? (
                        <Box
                            className={styles.slot}
                            display="flex"
                            marginRight={variant === 'bordered' ? 'xsmall' : '-xsmall'}
                            marginLeft={variant === 'bordered' ? '-xsmall' : 'xsmall'}
                        >
                            {startSlot}
                        </Box>
                    ) : null}
                    <input
                        {...props}
                        {...extraProps}
                        type={type}
                        ref={combinedRef}
                        maxLength={maxLength}
                        onChange={(event) => {
                            originalOnChange?.(event)
                            onChange?.(event)
                        }}
                    />
                    {displayEndSlot || characterCountElement ? (
                        <Box
                            className={styles.slot}
                            display="flex"
                            marginRight={variant === 'bordered' ? '-xsmall' : 'xsmall'}
                            marginLeft={variant === 'bordered' ? 'xsmall' : '-xsmall'}
                        >
                            {characterCountElement}
                            {displayEndSlot ? endSlot : null}
                        </Box>
                    ) : null}
                </Box>
            )}
        </BaseField>
    )
})

export { TextField }
export type { TextFieldProps, TextFieldType }
