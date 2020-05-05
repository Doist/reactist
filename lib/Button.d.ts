export default Button;
export type Props = {
    onClick?: (event?: React.MouseEvent<Element, MouseEvent>) => void;
    disabled?: boolean;
    loading?: boolean;
    className?: string;
    secondary?: boolean;
    small?: boolean;
    white?: boolean;
    large?: boolean;
    danger?: boolean;
    data_tip?: string;
    name?: React.ReactNode;
    close?: boolean;
};
/**
 * @typedef {Object} Props
 * @property {(event?: React.MouseEvent) => void} [onClick]
 * @property {boolean} [disabled]
 * @property {boolean} [loading]
 * @property {string} [className]
 * @property {boolean} [secondary]
 * @property {boolean} [small]
 * @property {boolean} [white]
 * @property {boolean} [large]
 * @property {boolean} [danger]
 * @property {string} [data_tip]
 * @property {React.ReactNode} [name]
 * @property {boolean} [close]
 */
/** @extends {React.Component<Props>} */
declare class Button extends React.Component<Props, any, any> {
    constructor(props: Readonly<Props>);
    constructor(props: Props, context?: any);
    /**
     * @param {React.MouseEvent} event
     */
    _onClick: (event: React.MouseEvent<Element, MouseEvent>) => void;
    render(): JSX.Element;
}
declare namespace Button {
    export const displayName: string;
    export namespace defaultProps {
        export const secondary: boolean;
        export const small: boolean;
        export const white: boolean;
        export const loading: boolean;
        export const disabled: boolean;
        export const danger: boolean;
    }
    export namespace propTypes {
        export const name: PropTypes.Requireable<PropTypes.ReactNodeLike>;
        export const onClick: PropTypes.Requireable<(...args: any[]) => any>;
        const secondary_1: PropTypes.Requireable<boolean>;
        export { secondary_1 as secondary };
        const small_1: PropTypes.Requireable<boolean>;
        export { small_1 as small };
        export const large: PropTypes.Requireable<boolean>;
        const white_1: PropTypes.Requireable<boolean>;
        export { white_1 as white };
        const loading_1: PropTypes.Requireable<boolean>;
        export { loading_1 as loading };
        const disabled_1: PropTypes.Requireable<boolean>;
        export { disabled_1 as disabled };
        const danger_1: PropTypes.Requireable<boolean>;
        export { danger_1 as danger };
        export const data_tip: PropTypes.Requireable<PropTypes.ReactNodeLike>;
        export const className: PropTypes.Requireable<string>;
    }
}
import React from "react";
import PropTypes from "prop-types";
