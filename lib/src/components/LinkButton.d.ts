import './styles/link_button.less';
import React from 'react';
/**
 * @typedef {Object} Props
 * @property {(event?: React.MouseEvent) => void} [onClick]
 * @property {boolean} [disabled]
 * @property {string} [className]
 * @property {React.ReactNode} [name]
 */
/** @extends {React.Component<Props>} */
declare class LinkButton extends React.Component<any, any> {
    static displayName: any;
    static defaultProps: any;
    static propTypes: any;
    /**
     * @param {React.MouseEvent} event
     */
    _handleClick: (event: any) => void;
    render(): JSX.Element;
}
export default LinkButton;
