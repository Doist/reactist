export default Select;
export type Option = {
    key?: React.ReactText;
    value?: React.ReactText;
    text?: React.ReactText;
    disabled?: boolean;
};
export type Props = {
    className?: string;
    disabled?: boolean;
    value: React.ReactText;
    onChange: (value: React.ReactText) => void;
    options?: Option[];
};
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
declare const Select: React.FC<Props>;
import React from "react";
