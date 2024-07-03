import * as React from 'react'

import { PasswordVisibleIcon } from '../icons/password-visible-icon'
import { PasswordHiddenIcon } from '../icons/password-hidden-icon'

import { TextField, TextFieldProps } from '../text-field'
import { IconButton } from '../button'

import type { BaseFieldVariantProps } from '../base-field'

/**
 * FIXME: This is a workaround for consumers that are using newer versions of React types that no longer have these props.
 * Once we upgrade Reactist to the newest React types, we should be able to remove these.
 */
type DeprecatedProps = 'crossOrigin' | 'onPointerEnterCapture' | 'onPointerLeaveCapture'

type PasswordFieldProps = Omit<TextFieldProps, 'type' | 'startSlot' | 'endSlot' | DeprecatedProps> &
    BaseFieldVariantProps & {
        togglePasswordLabel?: string
    }

const PasswordField = React.forwardRef<HTMLInputElement, PasswordFieldProps>(function PasswordField(
    { togglePasswordLabel = 'Toggle password visibility', ...props },
    ref,
) {
    const [isPasswordVisible, setPasswordVisible] = React.useState(false)
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
