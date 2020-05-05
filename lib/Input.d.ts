export default Input;
export type InputProps = {
    className?: string;
};
export type Props = InputProps & React.InputHTMLAttributes<HTMLInputElement>;
/**
 * @typedef {Object} InputProps
 * @property {string | undefined} [className]
 */
/**
 * @typedef {InputProps & React.InputHTMLAttributes<HTMLInputElement>} Props
 */
declare const Input: React.ForwardRefExoticComponent<InputProps & React.InputHTMLAttributes<HTMLInputElement> & React.RefAttributes<HTMLInputElement>>;
import React from "react";
