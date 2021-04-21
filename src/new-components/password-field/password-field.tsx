import * as React from 'react'
import { Tooltip } from '../../components/tooltip'
import { BaseField } from '../base-field'
import { Box } from '../box'
import { useId } from '../common-helpers'

import { PasswordVisibleIcon } from '../icons/password-visible-icon'
import { PasswordHiddenIcon } from '../icons/password-hidden-icon'

import styles from './password-field.module.css'
import textFieldStyles from '../text-field/text-field.module.css'

import type { TextFieldProps } from '../text-field'

type PasswordFieldProps = Omit<TextFieldProps, 'type'> & {
    togglePasswordLabel: string
}

function PasswordField({
    label,
    secondaryLabel,
    auxiliaryLabel,
    hint,
    maxWidth,
    togglePasswordLabel,
    ...props
}: PasswordFieldProps) {
    const id = useId(props.id)
    const inputRef = React.useRef<HTMLInputElement>(null)
    const [isPasswordVisible, setPasswordVisible] = React.useState(false)

    function togglePasswordVisibility() {
        setPasswordVisible((v) => !v)
        inputRef.current?.focus()
    }

    return (
        <BaseField
            id={id}
            label={label}
            secondaryLabel={secondaryLabel}
            auxiliaryLabel={auxiliaryLabel}
            hint={hint}
            maxWidth={maxWidth}
        >
            {(extraProps) => (
                <Box
                    display="flex"
                    alignItems="center"
                    className={[styles.inputWrapper, textFieldStyles.inputWrapper]}
                >
                    <input
                        {...props}
                        {...extraProps}
                        ref={inputRef}
                        type={isPasswordVisible ? 'text' : 'password'}
                    />
                    <Tooltip content={togglePasswordLabel}>
                        <button
                            type="button"
                            onClick={togglePasswordVisibility}
                            aria-label={togglePasswordLabel}
                            tabIndex={-1}
                        >
                            {isPasswordVisible ? (
                                <PasswordVisibleIcon aria-hidden />
                            ) : (
                                <PasswordHiddenIcon aria-hidden />
                            )}
                        </button>
                    </Tooltip>
                </Box>
            )}
        </BaseField>
    )
}

export { PasswordField }
export type { PasswordFieldProps }
