import * as React from 'react';
import { TextFieldProps } from '../text-field';
import type { BaseFieldVariantProps } from '../base-field';
interface PasswordFieldProps extends Omit<TextFieldProps, 'type' | 'startSlot' | 'endSlot'>, BaseFieldVariantProps {
    togglePasswordLabel?: string;
    endSlot?: React.ReactElement | string | number;
}
declare const PasswordField: React.ForwardRefExoticComponent<Omit<PasswordFieldProps, "ref"> & React.RefAttributes<HTMLInputElement>>;
export { PasswordField };
export type { PasswordFieldProps };
