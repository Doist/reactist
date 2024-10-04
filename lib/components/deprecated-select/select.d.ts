import * as React from 'react';
import './select.less';
type Option = {
    /** Optional key for each option. If not provided `value` is used. */
    key?: string | number;
    /** Value of the option. */
    value: string | number;
    /** Text to display for the option. */
    text?: string | number;
    /** Whether the options is disabled or not. */
    disabled?: boolean;
};
type Props = {
    className?: string;
    disabled?: boolean;
    /** Currently selected value. */
    value?: string | number;
    /** Callback for the change event. Will be called with the next value (not the full event). */
    onChange?: (value: string) => void;
    /** Options that are rendered in the select. */
    options?: Option[];
    /** Value to initially be set */
    defaultValue?: string | number;
};
declare function Select({ value, options, onChange, disabled, className, defaultValue, ...otherProps }: Props): React.JSX.Element;
declare namespace Select {
    var displayName: string;
    var defaultProps: {
        options: never[];
        disabled: boolean;
    };
}
export { Select };
