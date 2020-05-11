export default Checkbox;
export type Props = {
    checked?: boolean;
    disabled?: boolean;
    onChange?: (checked: boolean) => void;
    label?: React.ReactText;
};
/**
 * @typedef {Object} Props
 * @property {boolean | undefined} [checked]
 * @property {boolean | undefined} [disabled]
 * @property {(checked: boolean) => void} [onChange]
 * @property {string | number | undefined} [label]
 */
/** @type {React.FC<Props>} */
declare const Checkbox: React.FC<Props>;
import React from "react";