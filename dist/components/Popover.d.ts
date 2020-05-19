import './styles/popover.less';
import React from 'react';
/** @typedef {'left' | 'right' | 'top' | 'bottom' | 'vertical' | 'horizontal' | 'auto'} Position */
/**
 * @typedef {Object} Props
 * @property {boolean} [visible]
 * @property {React.Ref<HTMLElement>} [popoverRef]
 * @property {React.Ref<HTMLElement>} [wrapperRef]
 * @property {React.MouseEventHandler} [onMouseEnter]
 * @property {React.MouseEventHandler} [onMouseLeave]
 * @property {React.MouseEventHandler} [onClick]
 * @property {string} [wrapperClassName]
 * @property {string} [popoverClassName]
 * @property {string} [arrowClassName]
 * @property {(() => React.ReactNode) | React.ReactNode} [content]
 * @property {React.ReactNode} [trigger]
 * @property {Position} position
 * @property {boolean} [withArrow]
 * @property {boolean} [allowVaguePositioning]
 * @property {number} gapSize
 */
/** @extends {React.Component<Props>} */
declare class Popover extends React.Component<any, any> {
    static displayName: any;
    static defaultProps: any;
    static propTypes: any;
    componentDidMount(): void;
    /**
     * @param {Props} prevProps
     */
    componentDidUpdate(prevProps: any): void;
    _updatePopoverPosition: () => void;
    /**
     * @param {Position} position
     */
    _getClassNameForPosition: (position: any) => string;
    /**
     * @param {HTMLElement} popover
     */
    _updatePopoverRef: (popover: any) => void;
    /**
     * @param {HTMLElement} wrapper
     */
    _updateWrapperRef: (wrapper: any) => void;
    render(): JSX.Element;
}
export default Popover;
