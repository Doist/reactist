import { forwardRef, useState } from 'react'

import { IconButton } from '../button'
import { PasswordHiddenIcon } from '../icons/password-hidden-icon'
import { PasswordVisibleIcon } from '../icons/password-visible-icon'
import { TextField, TextFieldProps } from '../text-field'

import type { ReactElement } from 'react'
import type { BaseFieldVariantProps } from '../base-field'

interface PasswordFieldProps
    extends Omit<TextFieldProps, 'type' | 'startSlot' | 'endSlot'>,
        BaseFieldVariantProps {
    togglePasswordLabel?: string
    endSlot?: ReactElement | string | number
}

const PasswordField = forwardRef<HTMLInputElement, PasswordFieldProps>(function PasswordField(
    { togglePasswordLabel = 'Toggle password visibility', endSlot, ...props },
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
                <>
                    {endSlot}
                    <IconButton
                        variant="quaternary"
                        icon={<Icon aria-hidden />}
                        aria-label={togglePasswordLabel}
                        onClick={() => setPasswordVisible((v) => !v)}
                    />
                </>
            }
        />
    )
})

export { PasswordField }
export type { PasswordFieldProps }
