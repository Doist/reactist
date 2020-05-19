import './styles/modal.less';
import React from 'react';
/**
 * @typedef {Object} Props
 * @property {string} [className]
 * @property {React.CSSProperties} [style]
 * @property {boolean} [large]
 * @property {boolean} [medium]
 * @property {boolean} [closeOnOverlayClick]
 */
/** @extends {React.Component<Props>} */
declare class Box extends React.Component<any, any> {
    static displayName: any;
    static propTypes: any;
    static defaultProps: any;
    /**
     * @param {Props} props
     * @param {unknown} context
     */
    constructor(props: any, context: any);
    componentWillUnmount(): void;
    _closeModal(): void;
    /**
     * @param {KeyboardEvent} event
     */
    _handleKeyDown(event: any): void;
    /**
     * @param {React.MouseEvent<Element>} event
     */
    _handleOverlayClick(event: any): void;
    render(): JSX.Element;
}
declare class Header extends React.Component<any, any> {
    static displayName: any;
    static defaultProps: any;
    static propTypes: any;
    /**
     * @param {React.MouseEvent} event
     */
    _closeModal(event: any): void;
    render(): JSX.Element;
}
declare class Body extends React.Component<any, any> {
    static displayName: any;
    static propTypes: any;
    static defaultProps: any;
    /**
     * @param {React.MouseEvent} event
     */
    _closeModal(event: any): void;
    render(): JSX.Element;
}
/**
 * @typedef {Object} ActionProps
 * @property {() => void} [onClick]
 * @property {boolean} [close]
 */
/** @extends {React.Component} */
declare class Actions extends React.Component<any, any> {
    static displayName: any;
    static propTypes: any;
    /** @param {ActionProps['onClick']} on_click */
    _onClick(on_click: any): void;
    render(): JSX.Element;
}
declare const _default: {
    Box: typeof Box;
    Header: typeof Header;
    Body: typeof Body;
    Actions: typeof Actions;
};
export default _default;
