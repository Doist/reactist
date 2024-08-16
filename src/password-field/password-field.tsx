import { forwardRef, useState } from 'react'
import { PasswordVisibleIcon } from '../icons/password-visible-icon'
import { PasswordHiddenIcon } from '../icons/password-hidden-icon'

import { TextField, type TextFieldProps } from '../text-field'
import { IconButton } from '../button'

import type { BaseFieldVariantProps } from '../base-field'

interface PasswordFieldProps
    extends Omit<TextFieldProps, 'type' | 'startSlot' | 'endSlot'>,
        BaseFieldVariantProps {
    togglePasswordLabel?: string
}

const PasswordField = forwardRef<HTMLInputElement, PasswordFieldProps>(function PasswordField(
    { togglePasswordLabel = 'Toggle password visibility', ...props },
    ref,
) {
    const [isPasswordVisible, setPasswordVisible] = useState(false)
    const Icon = isPasswordVisible ? PasswordVisibleIcon : PasswordHiddenIcon
    return (
        <TextField
            {...props}
            ref={ref}
            // @ts-expect-error TextField does not support type="password", so we override the type check here
            type={isPasswordVisible ? 'text' : 'password'}
            endSlot={
                <IconButton
                    variant="quaternary"
                    icon={<Icon aria-hidden />}
                    aria-label={togglePasswordLabel}
                    onClick={() => setPasswordVisible((v) => !v)}
                />
            }
        />
    )
})

export { PasswordField }
export type { PasswordFieldProps }
