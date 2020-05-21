import './styles/time.less';
import React from 'react';
/**
 * @typedef {Object} Props
 * @property {number} time
 * @property {import('./utils/TimeUtils').Config} config
 * @property {string} [className]
 * @property {boolean} [tooltipOnHover]
 * @property {boolean} [refresh]
 * @property {React.ReactNode} [tooltip]
 * @property {boolean} [expandOnHover]
 * @property {boolean} [expandFullyOnHover]
 */
/**
 * @typedef {Object} State
 * @property {boolean} hovered
 */
/** @extends {React.Component<Props, State>} */
declare class Time extends React.Component<any, any> {
    static displayName: any;
    static propTypes: any;
    static defaultProps: any;
    /**
     * @param {Props} props
     */
    constructor(props: any);
    componentDidMount(): void;
    /**
     * @param {Props} prevProps
     */
    componentDidUpdate(prevProps: any): void;
    componentWillUnmount(): void;
    /**
     * @param {boolean} hovered
     * @param {React.MouseEvent} event
     */
    _setHovered(hovered: any, event: any): void;
    /**
     * @param {Props['config']} config
     */
    _renderTime(config: any): any;
    _refresh(): void;
    render(): JSX.Element;
}
export default Time;
