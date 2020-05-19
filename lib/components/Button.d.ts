import './styles/button.less';
import React from 'react';
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
/** @extends {React.Component<any>} */
declare class Button extends React.Component<any> {
    static defaultProps: any;
    static displayName: any;
    static propTypes: any;
    /**
     * @param {React.MouseEvent} event
     */
    _onClick: (event: any) => void;
    render(): JSX.Element;
}
export default Button;
