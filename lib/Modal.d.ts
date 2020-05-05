declare namespace _default {
    export { Box };
    export { Header };
    export { Body };
    export { Actions };
}
export default _default;
export type Props = {
    className?: string;
    style?: React.CSSProperties;
    large?: boolean;
    medium?: boolean;
    closeOnOverlayClick?: boolean;
};
export type ActionProps = {
    onClick?: () => void;
    close?: boolean;
};
/**
 * @typedef {Object} Props
 * @property {string} [className]
 * @property {React.CSSProperties} [style]
 * @property {boolean} [large]
 * @property {boolean} [medium]
 * @property {boolean} [closeOnOverlayClick]
 */
/** @extends {React.Component<Props>} */
declare class Box extends React.Component<Props, any, any> {
    /**
     * @param {Props} props
     * @param {unknown} context
     */
    constructor(props: Props, context: unknown);
    /**
     * @param {KeyboardEvent} event
     */
    _handleKeyDown(event: KeyboardEvent): void;
    _closeModal(): void;
    /**
     * @param {React.MouseEvent<Element>} event
     */
    _handleOverlayClick(event: React.MouseEvent<Element, MouseEvent>): void;
    componentWillUnmount(): void;
    render(): JSX.Element;
}
declare namespace Box {
    export const displayName: string;
    export namespace defaultProps {
        export const large: boolean;
        export const closeOnOverlayClick: boolean;
    }
    export namespace propTypes {
        export const className: PropTypes.Requireable<string>;
        export const style: PropTypes.Requireable<object>;
        const large_1: PropTypes.Requireable<boolean>;
        export { large_1 as large };
        export const medium: PropTypes.Requireable<boolean>;
        const closeOnOverlayClick_1: PropTypes.Requireable<boolean>;
        export { closeOnOverlayClick_1 as closeOnOverlayClick };
        export const children: PropTypes.Requireable<PropTypes.ReactNodeLike>;
    }
}
declare class Header extends React.Component<any, any, any> {
    constructor(props: Readonly<any>);
    constructor(props: any, context?: any);
    /**
     * @param {React.MouseEvent} event
     */
    _closeModal(event: React.MouseEvent<Element, MouseEvent>): void;
    render(): JSX.Element;
}
declare namespace Header {
    const displayName_1: string;
    export { displayName_1 as displayName };
    export namespace propTypes_1 {
        const children_1: PropTypes.Requireable<PropTypes.ReactNodeLike>;
        export { children_1 as children };
        export const title: PropTypes.Requireable<string>;
        export const subtitle: PropTypes.Requireable<string>;
        export const beforeClose: PropTypes.Requireable<(...args: any[]) => any>;
    }
    export { propTypes_1 as propTypes };
}
declare class Body extends React.Component<any, any, any> {
    constructor(props: Readonly<any>);
    constructor(props: any, context?: any);
    /**
     * @param {React.MouseEvent} event
     */
    _closeModal(event: React.MouseEvent<Element, MouseEvent>): void;
    render(): JSX.Element;
}
declare namespace Body {
    const displayName_2: string;
    export { displayName_2 as displayName };
    export namespace defaultProps_1 {
        export const showCloseIcon: boolean;
    }
    export { defaultProps_1 as defaultProps };
    export namespace propTypes_2 {
        export const icon: PropTypes.Requireable<PropTypes.ReactNodeLike>;
        const showCloseIcon_1: PropTypes.Requireable<boolean>;
        export { showCloseIcon_1 as showCloseIcon };
        const className_1: PropTypes.Requireable<string>;
        export { className_1 as className };
        const style_1: PropTypes.Requireable<object>;
        export { style_1 as style };
        export const plain: PropTypes.Requireable<boolean>;
        const children_2: PropTypes.Requireable<PropTypes.ReactNodeLike>;
        export { children_2 as children };
    }
    export { propTypes_2 as propTypes };
}
/**
 * @typedef {Object} ActionProps
 * @property {() => void} [onClick]
 * @property {boolean} [close]
 */
/** @extends {React.Component} */
declare class Actions extends React.Component<any, any, any> {
    constructor(props: Readonly<any>);
    constructor(props: any, context?: any);
    /** @param {ActionProps['onClick']} on_click */
    _onClick(on_click: () => void): void;
    render(): JSX.Element;
}
declare namespace Actions {
    const displayName_3: string;
    export { displayName_3 as displayName };
    export namespace propTypes_3 {
        const children_3: PropTypes.Requireable<PropTypes.ReactNodeLike>;
        export { children_3 as children };
    }
    export { propTypes_3 as propTypes };
}
import React from "react";
import PropTypes from "prop-types";
