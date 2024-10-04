import * as React from 'react';
import { FieldComponentProps } from '../base-field';
interface SwitchFieldProps extends Omit<FieldComponentProps<HTMLInputElement>, 'type' | 'auxiliaryLabel' | 'maxWidth' | 'aria-describedby' | 'aria-label' | 'aria-labelledby'> {
    /**
     * Identifies the element (or elements) that describes the switch for assistive technologies.
     */
    'aria-describedby'?: string;
    /**
     * Defines a string value that labels the current switch for assistive technologies.
     */
    'aria-label'?: string;
    /**
     * Identifies the element (or elements) that labels the current switch for assistive technologies.
     */
    'aria-labelledby'?: string;
}
declare const SwitchField: React.ForwardRefExoticComponent<Omit<SwitchFieldProps, "ref"> & React.RefAttributes<HTMLInputElement>>;
export { SwitchField };
export type { SwitchFieldProps };
