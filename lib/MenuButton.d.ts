export type Props = {
    className?: string;
    onClick?: (event: React.MouseEvent<Element, MouseEvent>) => void;
    name?: React.ReactNode;
    children?: React.ReactNode[];
};
export type MenuButtonItemProps = {
    className?: string;
    onClick?: (event: React.MouseEvent<Element, MouseEvent>) => void;
};
/**
 * @typedef {Object} Props
 * @property {string | undefined} [className]
 * @property {React.MouseEventHandler | undefined} [onClick]
 * @property {React.ReactNode} [name]
 * @property {React.ReactNode[] | undefined} [children]
 */
/** @type {React.FC<Props>} */
export const MenuButton: React.FC<Props>;
/**
 * @typedef {Object} MenuButtonItemProps
 * @property {string | undefined} [className]
 * @property {React.MouseEventHandler | undefined} [onClick]
 */
/** @type {React.FC<React.PropsWithChildren<MenuButtonItemProps>>} */
export const MenuButtonItem: React.FC<React.PropsWithChildren<MenuButtonItemProps>>;
import React from "react";
