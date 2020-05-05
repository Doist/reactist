export default RangeInput;
export type Props = {
    className?: string;
    value?: number;
    min?: number;
    max?: number;
    stepSize?: number;
    onPlus?: (value: number) => void;
    onMinus?: (value: number) => void;
    onChange?: (value: number) => void;
};
/**
 * @typedef {Object} Props
 * @property {string | undefined} [className]
 * @property {number} [value]
 * @property {number | undefined} [min]
 * @property {number | undefined} [max]
 * @property {number | undefined} [stepSize]
 * @property {((value: number) => void) | undefined} [onPlus]
 * @property {((value: number) => void) | undefined} [onMinus]
 * @property {(value: number) => void} [onChange]
 */
/** @type {React.FC<Props>} */
declare const RangeInput: React.FC<Props>;
import React from "react";
