import * as React from 'react'
import { BaseField, BaseFieldVariantProps } from '../base-field'
import { Box } from '../box'
import styles from './text-field.module.css'
import type { FieldComponentProps } from '../base-field'
import { useMergeRefs } from 'use-callback-ref'

type TextFieldType = 'email' | 'search' | 'tel' | 'text' | 'url'

interface TextFieldProps
    extends Omit<FieldComponentProps<HTMLInputElement>, 'type'>,
        BaseFieldVariantProps {
    type?: TextFieldType
    startSlot?: React.ReactElement | string | number
    endSlot?: React.ReactElement | string | number
}

const TextField = React.forwardRef<HTMLInputElement, TextFieldProps>(function TextField(
    {
        variant = 'default',
        id,
        label,
        auxiliaryLabel,
        message,
        tone,
        type = 'text',
        maxWidth,
        hidden,
        'aria-describedby': ariaDescribedBy,
        startSlot,
        endSlot,
        ...props
    },
    ref,
) {
    const internalRef = React.useRef<HTMLInputElement>(null)
    const combinedRef = useMergeRefs([ref, internalRef])

    function handleClick(event: React.MouseEvent) {
        if (event.currentTarget === combinedRef.current) return
        internalRef.current?.focus()
    }

    return (
        <BaseField
            variant={variant}
            id={id}
            label={label}
            auxiliaryLabel={auxiliaryLabel}
            message={message}
            tone={tone}
            maxWidth={maxWidth}
            hidden={hidden}
            aria-describedby={ariaDescribedBy}
        >
            {(extraProps) => (
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
                    <input {...props} {...extraProps} type={type} ref={combinedRef} />
                    {endSlot ? (
                        <Box
                            className={styles.slot}
                            display="flex"
                            marginRight={variant === 'bordered' ? '-xsmall' : 'xsmall'}
                            marginLeft={variant === 'bordered' ? 'xsmall' : '-xsmall'}
                        >
                            {endSlot}
                        </Box>
                    ) : null}
                </Box>
            )}
        </BaseField>
    )
})

export { TextField }
export type { TextFieldProps, TextFieldType }
