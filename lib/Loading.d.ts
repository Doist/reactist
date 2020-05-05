export default Loading;
export type Props = {
    className?: string;
    spinnerColor?: string;
    bgColor?: string;
    size?: React.ReactText;
};
/**
 * @typedef {Object} Props
 * @property {string | undefined} [className]
 * @property {string | undefined} [spinnerColor]
 * @property {string | undefined} [bgColor]
 * @property {string | number | undefined} [size]
 */
/** @type {React.FC<Props>} */
declare const Loading: React.FC<Props>;
import React from "react";
