import * as React from 'react';
interface CheckboxFieldProps extends Omit<JSX.IntrinsicElements['input'], 'type' | 'className' | 'disabled' | 'aria-controls' | 'aria-describedby' | 'aria-label' | 'aria-labelledby'> {
    'aria-checked'?: never;
    /**
     *
     * Identifies the set of checkboxes controlled by the mixed checkbox for assistive technologies.
     */
    'aria-controls'?: string;
    /**
     * Identifies the element (or elements) that describes the checkbox for assistive technologies.
     */
    'aria-describedby'?: string;
    /**
     * Defines a string value that labels the current checkbox for assistive technologies.
     */
    'aria-label'?: string;
    /**
     * Identifies the element (or elements) that labels the current checkbox for assistive technologies.
     */
    'aria-labelledby'?: string;
    /**
     * Defines whether or not the checkbox is disabled.
     */
    disabled?: boolean;
    /**
     * The label for the checkbox element.
     */
    label?: React.ReactNode;
    /**
     * The icon that should be added to the checkbox label.
     */
    icon?: React.ReactElement | string | number;
    /**
     * Defines whether or not the checkbox can be of a `mixed` state.
     */
    indeterminate?: boolean;
}
declare const CheckboxField: React.ForwardRefExoticComponent<Omit<CheckboxFieldProps, "ref"> & React.RefAttributes<HTMLInputElement>>;
export { CheckboxField };
export type { CheckboxFieldProps };
