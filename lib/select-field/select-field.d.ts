import * as React from 'react';
import { BaseFieldVariantProps, FieldComponentProps } from '../base-field';
interface SelectFieldProps extends FieldComponentProps<HTMLSelectElement>, BaseFieldVariantProps {
}
declare const SelectField: React.ForwardRefExoticComponent<Omit<SelectFieldProps, "ref"> & React.RefAttributes<HTMLSelectElement>>;
export { SelectField };
export type { SelectFieldProps };
