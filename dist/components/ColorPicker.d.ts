import './styles/color_picker.less';
import React from 'react';
import PropTypes from 'prop-types';
/** @typedef {{name?: string; color?: string}} NamedColor */
declare const COLORS: string[];
/**
 * @typedef {Object} Props
 * @property {boolean | undefined} [small]
 * @property {number} color
 * @property {((color: number) => void) | undefined} [onChange]
 * @property {(string | NamedColor)[]} [colorList]
 */
/** @type {React.FC<Props>} */
declare const ColorPicker: React.FC<any>;
/**
 * @typedef {Object} ColorItemProps
 * @property {string} color
 * @property {number} colorIndex
 * @property {boolean | undefined} [isActive]
 * @property {((colorIndex: number) => void) | undefined} [onClick]
 * @property {React.ReactNode} [tooltip]
 */
/** @type {React.FC<ColorItemProps>} */
declare const ColorItem: {
    ({ color, colorIndex, isActive, onClick, tooltip }: {
        color: any;
        colorIndex: any;
        isActive: any;
        onClick: any;
        tooltip: any;
    }): JSX.Element;
    displayName: string;
    propTypes: {
        /** The color of the ColorItem as string. */
        color: PropTypes.Validator<string>;
        /** Index of the color to display. Is based upon the colorList array. */
        colorIndex: PropTypes.Validator<number>;
        /** Flag that can be used to highlight the currently selected item. */
        isActive: PropTypes.Requireable<boolean>;
        /** Optional callback that is called when the item is clicked. */
        onClick: PropTypes.Requireable<(...args: any[]) => any>;
        /** Optional tooltip to be shown when hovering the item. */
        tooltip: PropTypes.Requireable<string>;
    };
};
export default ColorPicker;
export { ColorItem, COLORS };
