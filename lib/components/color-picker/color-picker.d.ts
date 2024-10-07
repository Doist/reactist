import * as React from 'react';
import './color-picker.less';
type NamedColor = {
    name: string;
    color: string;
};
declare const COLORS: string[];
type Props = {
    small?: boolean;
    color?: number;
    onChange?: (color: number) => void;
    colorList?: (string | NamedColor)[];
};
declare function ColorPicker({ color, small, onChange, colorList }: Props): React.JSX.Element;
declare namespace ColorPicker {
    var displayName: string;
}
type ColorItemProps = {
    color: string;
    colorIndex: number;
    isActive?: boolean;
    onClick?: (colorIndex: number) => void;
    tooltip?: React.ReactNode;
};
declare function ColorItem({ color, colorIndex, isActive, onClick, tooltip }: ColorItemProps): React.JSX.Element;
declare namespace ColorItem {
    var displayName: string;
}
export { ColorPicker, ColorItem, COLORS };
