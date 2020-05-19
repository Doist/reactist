import './styles/icon.less';
import React from 'react';
/**
 * @typedef {Object} Props
 * @property {() => void} [onClick]
 * @property {boolean} [disabled]
 * @property {boolean} [className]
 * @property {string} [image]
 * @property {string} [hoveredImage]
 * @property {React.ReactNode} [icon]
 * @property {React.ReactNode} [tooltip]
 */
/** @extends {React.Component<Props>} */
declare class Icon extends React.Component<any, any> {
    static displayName: any;
    static defaultProps: any;
    static propTypes: any;
    /**
     * @param {Props} props
     * @param {unknown} context
     */
    constructor(props: any, context: any);
    /**
     * @param {React.MouseEvent} event
     */
    _onClick: (event: any) => void;
    _hover: () => void;
    _unhover: () => void;
    render(): JSX.Element;
}
export default Icon;
