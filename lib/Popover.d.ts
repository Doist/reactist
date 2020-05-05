export default Popover;
export type Position = "top" | "right" | "bottom" | "left" | "vertical" | "horizontal" | "auto";
export type Props = {
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
declare class Popover extends React.Component<Props, any, any> {
    constructor(props: Readonly<Props>);
    constructor(props: Props, context?: any);
    componentDidMount(): void;
    /**
     * @param {Props} prevProps
     */
    componentDidUpdate(prevProps: Props): void;
    _updatePopoverPosition: () => void;
    /**
     * @param {Position} position
     */
    _getClassNameForPosition: (position: "top" | "right" | "bottom" | "left" | "vertical" | "horizontal" | "auto") => string;
    /**
     * @param {HTMLElement} popover
     */
    _updatePopoverRef: (popover: HTMLElement) => void;
    popover: HTMLElement;
    /**
     * @param {HTMLElement} wrapper
     */
    _updateWrapperRef: (wrapper: HTMLElement) => void;
    wrapper: HTMLElement;
    render(): JSX.Element;
}
declare namespace Popover {
    export const displayName: string;
    export namespace defaultProps {
        export const position: string;
        export const gapSize: number;
    }
    export namespace propTypes {
        const position_1: PropTypes.Requireable<string>;
        export { position_1 as position };
        export const allowVaguePositioning: PropTypes.Requireable<boolean>;
        export const visible: PropTypes.Validator<boolean>;
        export const content: PropTypes.Validator<PropTypes.ReactNodeLike>;
        export const trigger: PropTypes.Requireable<PropTypes.ReactNodeLike>;
        export const onClick: PropTypes.Requireable<(...args: any[]) => any>;
        export const onMouseEnter: PropTypes.Requireable<(...args: any[]) => any>;
        export const onMouseLeave: PropTypes.Requireable<(...args: any[]) => any>;
        export const wrapperClassName: PropTypes.Requireable<string>;
        export const popoverClassName: PropTypes.Requireable<string>;
        export const arrowClassName: PropTypes.Requireable<string>;
        export const withArrow: PropTypes.Requireable<boolean>;
        const gapSize_1: PropTypes.Requireable<number>;
        export { gapSize_1 as gapSize };
        export const wrapperRef: PropTypes.Requireable<(...args: any[]) => any>;
        export const popoverRef: PropTypes.Requireable<(...args: any[]) => any>;
    }
}
import React from "react";
import PropTypes from "prop-types";
