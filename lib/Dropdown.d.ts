import './styles/dropdown.less';
import React from 'react';
/**
 * @typedef {Object} BoxProps
 * @property {() => void} [onShowBody]
 * @property {() => void} [onHideBody]
 * @property {boolean} [allowBodyInteractions]
 * @property {boolean} [top]
 * @property {boolean} [right]
 * @property {string} [scrolling_parent]
 * @property {[React.ReactElement<TriggerProps>, React.ReactElement<{}> | ((props: {}) => JSX.Element)]} children
 * @property {string} [className]
 */
/**
 * @typedef {Object} BoxState
 * @typedef {boolean} top
 * @typedef {boolean} show_body
 */
/** @extends {React.Component<BoxProps, BoxState>} */
declare class Box extends React.Component<any, any> {
    static displayName: any;
    static propTypes: any;
    /**
     * @param {BoxProps} props
     * @param {unknown} context
     */
    constructor(props: any, context: any);
    componentWillUnmount(): void;
    /**
     * @param {MouseEvent} event
     */
    _handleClickOutside(event: any): void;
    _toggleShowBody(): void;
    _getTriggerComponent(): React.DetailedReactHTMLElement<{
        onClick: () => void;
    }, HTMLElement>;
    /**
     * @param {HTMLElement} body
     */
    _setPosition(body: any): void;
    _getBodyComponent(): JSX.Element;
    render(): JSX.Element;
}
interface TriggerProps {
    onClick?: (event?: React.MouseEvent) => void;
}
declare class Trigger extends React.Component<TriggerProps> {
    static displayName: any;
    static propTypes: any;
    /**
     * @param {TriggerProps} props
     * @param {unknown} context
     */
    constructor(props: any, context: any);
    /**
     * @param {React.MouseEvent} event
     */
    _onClick(event: any): void;
    render(): JSX.Element;
}
declare class Body extends React.Component<any, any, any> {
    static displayName: any;
    static propTypes: any;
    render(): JSX.Element;
}
declare const Dropdown: {
    Box: typeof Box;
    Trigger: typeof Trigger;
    Body: typeof Body;
};
export default Dropdown;
