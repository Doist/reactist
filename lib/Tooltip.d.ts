export default Tooltip;
export type PopoverProps = {
    visible?: boolean;
    popoverRef?: React.Ref<HTMLElement>;
    wrapperRef?: React.Ref<HTMLElement>;
    onMouseEnter?: (event: React.MouseEvent<Element, MouseEvent>) => void;
    onMouseLeave?: (event: React.MouseEvent<Element, MouseEvent>) => void;
    onClick?: (event: React.MouseEvent<Element, MouseEvent>) => void;
    wrapperClassName?: string;
    popoverClassName?: string;
    arrowClassName?: string;
    content?: string | number | boolean | {} | React.ReactElement<any, string | ((props: any) => React.ReactElement<any, string | any | (new (props: any) => React.Component<any, any, any>)>) | (new (props: any) => React.Component<any, any, any>)> | React.ReactNodeArray | React.ReactPortal | (() => React.ReactNode);
    trigger?: React.ReactNode;
    position: "top" | "right" | "bottom" | "left" | "vertical" | "horizontal" | "auto";
    withArrow?: boolean;
    allowVaguePositioning?: boolean;
    gapSize: number;
};
export type TooltipProps = {
    onMouseEnter?: (event: React.MouseEvent<Element, MouseEvent>) => void;
    onMouseLeave?: (event: React.MouseEvent<Element, MouseEvent>) => void;
    tooltipClassName?: string;
    delayShow: number;
    delayHide: number;
    hideOnScroll?: boolean;
    inverted?: boolean;
    text?: string | number | boolean | {} | React.ReactElement<any, string | ((props: any) => React.ReactElement<any, string | any | (new (props: any) => React.Component<any, any, any>)>) | (new (props: any) => React.Component<any, any, any>)> | React.ReactNodeArray | React.ReactPortal | (() => React.ReactNode);
};
export type Props = TooltipProps & Pick<import("./Popover").Props, "wrapperClassName" | "popoverClassName" | "position" | "withArrow" | "allowVaguePositioning" | "gapSize"> & {
    children?: React.ReactNode;
};
export type State = {
    visible: boolean;
};
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
declare class Tooltip extends React.Component<React.PropsWithChildren<TooltipProps & Pick<import("./Popover").Props, "wrapperClassName" | "popoverClassName" | "position" | "withArrow" | "allowVaguePositioning" | "gapSize">>, State, any> {
    constructor(props: Readonly<React.PropsWithChildren<TooltipProps & Pick<import("./Popover").Props, "wrapperClassName" | "popoverClassName" | "position" | "withArrow" | "allowVaguePositioning" | "gapSize">>>);
    constructor(props: React.PropsWithChildren<TooltipProps & Pick<import("./Popover").Props, "wrapperClassName" | "popoverClassName" | "position" | "withArrow" | "allowVaguePositioning" | "gapSize">>, context?: any);
    /** @type {State} */
    state: State;
    /**
     * @param {Props} nextProps
     * @param {State} nextState
     * @return {boolean}
     */
    shouldComponentUpdate(nextProps: React.PropsWithChildren<TooltipProps & Pick<import("./Popover").Props, "wrapperClassName" | "popoverClassName" | "position" | "withArrow" | "allowVaguePositioning" | "gapSize">>, nextState: State): boolean;
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
    _delayAction(actionFn: (...args: any[]) => void, delay: number): void;
    delayTimeout: NodeJS.Timeout;
    /**
     * @param {HTMLLIElement} tooltip
     */
    _updateTooltipRef: (tooltip: HTMLLIElement) => void;
    tooltip: HTMLLIElement;
    /**
     * @param {HTMLLIElement} wrapper
     */
    _updateWrapperRef: (wrapper: HTMLLIElement) => void;
    wrapper: HTMLLIElement;
    render(): JSX.Element;
}
declare namespace Tooltip {
    export const displayName: string;
    export namespace defaultProps {
        export const position: string;
        export const hideOnScroll: boolean;
        export const delayShow: number;
        export const delayHide: number;
        export const allowVaguePositioning: boolean;
        export const inverted: boolean;
        export const withArrow: boolean;
        export const gapSize: number;
    }
    export namespace propTypes {
        const position_1: PropTypes.Requireable<string>;
        export { position_1 as position };
        const allowVaguePositioning_1: PropTypes.Requireable<boolean>;
        export { allowVaguePositioning_1 as allowVaguePositioning };
        export const text: PropTypes.Validator<PropTypes.ReactNodeLike>;
        const hideOnScroll_1: PropTypes.Requireable<boolean>;
        export { hideOnScroll_1 as hideOnScroll };
        const delayShow_1: PropTypes.Requireable<number>;
        export { delayShow_1 as delayShow };
        const delayHide_1: PropTypes.Requireable<number>;
        export { delayHide_1 as delayHide };
        export const children: PropTypes.Requireable<PropTypes.ReactNodeLike>;
        export const wrapperClassName: PropTypes.Requireable<string>;
        export const tooltipClassName: PropTypes.Requireable<string>;
        const inverted_1: PropTypes.Requireable<boolean>;
        export { inverted_1 as inverted };
        const gapSize_1: PropTypes.Requireable<number>;
        export { gapSize_1 as gapSize };
        const withArrow_1: PropTypes.Requireable<boolean>;
        export { withArrow_1 as withArrow };
    }
}
import React from "react";
import PropTypes from "prop-types";
