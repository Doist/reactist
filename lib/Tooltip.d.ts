import './styles/tooltip.less';
import React from 'react';
/** @typedef {import('./Popover').Props} PopoverProps */
/**
 * @typedef {Object} TooltipProps
 * @property {React.MouseEventHandler} [onMouseEnter]
 * @property {React.MouseEventHandler} [onMouseLeave]
 * @property {string} [tooltipClassName]
 * @property {number} delayShow
 * @property {number} delayHide
 * @property {boolean} [hideOnScroll]
 * @property {boolean} [inverted]
 * @property {PopoverProps['content']} [text]
 */
/**
 * @typedef {React.PropsWithChildren<TooltipProps & Pick<PopoverProps, "popoverClassName" | "wrapperClassName" | "allowVaguePositioning" | "gapSize" | "withArrow" | "position">>} Props
 */
/**
 * @typedef {Object} State
 * @property {boolean} visible
 */
/** @extends {React.Component<Props, State>} */
declare class Tooltip extends React.Component<any, any> {
    static displayName: any;
    static propTypes: any;
    static defaultProps: any;
    /** @type {State} */
    state: {
        visible: boolean;
    };
    /**
     * @param {Props} nextProps
     * @param {State} nextState
     * @return {boolean}
     */
    shouldComponentUpdate(nextProps: any, nextState: any): boolean;
    componentWillUnmount(): void;
    _initScrollListener(): void;
    _removeScrollListener(): void;
    _clearDelayTimeout(): void;
    _show: () => void;
    _hide: () => void;
    /**
     * @param {(...args: any[]) => void} actionFn
     * @param {number} delay
     */
    _delayAction(actionFn: any, delay: any): void;
    /**
     * @param {HTMLLIElement} tooltip
     */
    _updateTooltipRef: (tooltip: any) => void;
    /**
     * @param {HTMLLIElement} wrapper
     */
    _updateWrapperRef: (wrapper: any) => void;
    render(): JSX.Element;
}
export default Tooltip;
