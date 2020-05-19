import './styles/select.less';
import React from 'react';
import PropTypes from 'prop-types';
/**
 * @typedef {Object} Option
 * @property {string | number | undefined} [key]
 * @property {string | number} [value]
 * @property {string | number | undefined} [text]
 * @property {boolean | undefined} [disabled]
 */
/**
 * @typedef {Object} Props
 * @property {string | undefined} [className]
 * @property {boolean | undefined} [disabled]
 * @property {string | number} value
 * @property {(value: Props['value']) => void} onChange
 * @property {Option[] | undefined} [options]
 */
/** @type {React.FC<Props>} */
declare const Select: {
    ({ value, options, onChange, disabled, className }: {
        value: any;
        options: any;
        onChange: any;
        disabled: any;
        className: any;
    }): JSX.Element;
    displayName: string;
    defaultProps: {
        options: any[];
        disabled: boolean;
    };
    propTypes: {
        /** Currently selected value. */
        value: PropTypes.Validator<React.Key>;
        /** Callback for the change event. Will be called with the next value (not the full event). */
        onChange: PropTypes.Validator<(...args: any[]) => any>;
        /** Options that are rendered in the select. */
        options: PropTypes.Requireable<PropTypes.InferProps<{
            /** Optional key for each option. If not provided `value` is used. */
            key: PropTypes.Requireable<React.Key>;
            /** Value of the option. */
            value: PropTypes.Validator<React.Key>;
            /** Text to display for the option. */
            text: PropTypes.Requireable<React.Key>;
            /** Whether the options is disabled or not. */
            disabled: PropTypes.Requireable<boolean>;
        }>[]>;
        /** Whether the select is disabled or not. */
        disabled: PropTypes.Requireable<boolean>;
        /** Additional css class applied to the select. */
        className: PropTypes.Requireable<string>;
    };
};
export default Select;
