import * as React from 'react';
import { BaseFieldVariantProps } from '../base-field';
import type { FieldComponentProps } from '../base-field';
type TextFieldType = 'email' | 'search' | 'tel' | 'text' | 'url';
interface TextFieldProps extends Omit<FieldComponentProps<HTMLInputElement>, 'type'>, BaseFieldVariantProps {
    type?: TextFieldType;
    startSlot?: React.ReactElement | string | number;
    endSlot?: React.ReactElement | string | number;
}
declare const TextField: React.ForwardRefExoticComponent<Omit<TextFieldProps, "ref"> & React.RefAttributes<HTMLInputElement>>;
export { TextField };
export type { TextFieldProps, TextFieldType };
