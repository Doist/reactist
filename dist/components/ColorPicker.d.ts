export default ColorPicker;
export type NamedColor = {
    name?: string;
    color?: string;
};
export type Props = {
    small?: boolean;
    color: number;
    onChange?: (color: number) => void;
    colorList?: (string | {
        name?: string;
        color?: string;
    })[];
};
export type ColorItemProps = {
    color: string;
    colorIndex: number;
    isActive?: boolean;
    onClick?: (colorIndex: number) => void;
    tooltip?: React.ReactNode;
};
/**
 * @typedef {Object} Props
 * @property {boolean | undefined} [small]
 * @property {number} color
 * @property {((color: number) => void) | undefined} [onChange]
 * @property {(string | NamedColor)[]} [colorList]
 */
/** @type {React.FC<Props>} */
declare const ColorPicker: React.FC<Props>;
/**
 * @typedef {Object} ColorItemProps
 * @property {string} color
 * @property {number} colorIndex
 * @property {boolean | undefined} [isActive]
 * @property {((colorIndex: number) => void) | undefined} [onClick]
 * @property {React.ReactNode} [tooltip]
 */
/** @type {React.FC<ColorItemProps>} */
export const ColorItem: React.FC<ColorItemProps>;
/** @typedef {{name?: string; color?: string}} NamedColor */
export const COLORS: string[];
import React from "react";
