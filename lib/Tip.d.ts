export default Tip;
export type Props = {
    className?: string;
    title?: React.ReactNode;
    message?: React.ReactNode;
    top?: boolean;
};
/**
 * @typedef {Object} Props
 * @property {string | undefined} [className]
 * @property {React.ReactNode} [title]
 * @property {React.ReactNode} [message]
 * @property {boolean | undefined} [top]
 */
/** @type {React.FC<Props>} */
declare const Tip: React.FC<Props>;
import React from "react";
