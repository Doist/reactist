declare namespace _default {
    export { Box };
    export { Trigger };
    export { Body };
}
export default _default;
export type BoxProps = {
    onShowBody?: () => void;
    onHideBody?: () => void;
    allowBodyInteractions?: boolean;
    top?: boolean;
    right?: boolean;
    scrolling_parent?: string;
    children: [React.ReactElement<TriggerProps, string | ((props: any) => React.ReactElement<any, string | any | (new (props: any) => React.Component<any, any, any>)>) | (new (props: any) => React.Component<any, any, any>)>, React.ReactElement<{}, string | ((props: any) => React.ReactElement<any, string | any | (new (props: any) => React.Component<any, any, any>)>) | (new (props: any) => React.Component<any, any, any>)> | ((props: {}) => JSX.Element)];
    className?: string;
};
export type BoxState = Object;
export type top = boolean;
export type show_body = boolean;
export type TriggerProps = {
    onClick?: (event?: React.MouseEvent<Element, MouseEvent>) => void;
};
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
declare class Box extends React.Component<BoxProps, Object, any> {
    /**
     * @param {BoxProps} props
     * @param {unknown} context
     */
    constructor(props: BoxProps, context: unknown);
    state: {
        show_body: boolean;
        top: boolean;
    };
    /**
     * @param {MouseEvent} event
     */
    _handleClickOutside(event: MouseEvent): void;
    /**
     * @param {HTMLElement} body
     */
    _setPosition(body: HTMLElement): void;
    _toggleShowBody(): void;
    _timeout: NodeJS.Timeout;
    componentWillUnmount(): void;
    _getTriggerComponent(): React.ReactElement<TriggerProps, string | ((props: any) => React.ReactElement<any, string | any | (new (props: any) => React.Component<any, any, any>)>) | (new (props: any) => React.Component<any, any, any>)>;
    _getBodyComponent(): JSX.Element;
    render(): JSX.Element;
}
declare namespace Box {
    export const displayName: string;
    export namespace propTypes {
        export const top: PropTypes.Requireable<boolean>;
        export const right: PropTypes.Requireable<boolean>;
        export const scrolling_parent: PropTypes.Requireable<string>;
        export const allowBodyInteractions: PropTypes.Requireable<boolean>;
        export const onShowBody: PropTypes.Requireable<(...args: any[]) => any>;
        export const onHideBody: PropTypes.Requireable<(...args: any[]) => any>;
        export const className: PropTypes.Requireable<string>;
        export const children: PropTypes.Requireable<any>;
    }
}
/**
 * @typedef {Object} TriggerProps
 * @property {(event?: React.MouseEvent) => void} [onClick]
 */
/** @extends {React.Component<TriggerProps>} */
declare class Trigger extends React.Component<TriggerProps, any, any> {
    /**
     * @param {TriggerProps} props
     * @param {unknown} context
     */
    constructor(props: TriggerProps, context: unknown);
    /**
     * @param {React.MouseEvent} event
     */
    _onClick(event: React.MouseEvent<Element, MouseEvent>): void;
    render(): JSX.Element;
}
declare namespace Trigger {
    const displayName_1: string;
    export { displayName_1 as displayName };
    export namespace propTypes_1 {
        export const onClick: PropTypes.Requireable<(...args: any[]) => any>;
        const children_1: PropTypes.Requireable<any>;
        export { children_1 as children };
    }
    export { propTypes_1 as propTypes };
}
declare class Body extends React.Component<any, any, any> {
    constructor(props: Readonly<any>);
    constructor(props: any, context?: any);
    render(): JSX.Element;
}
declare namespace Body {
    const displayName_2: string;
    export { displayName_2 as displayName };
    export namespace propTypes_2 {
        const top_1: PropTypes.Requireable<boolean>;
        export { top_1 as top };
        const right_1: PropTypes.Requireable<boolean>;
        export { right_1 as right };
        export const setPosition: PropTypes.Requireable<(...args: any[]) => any>;
        const children_2: PropTypes.Requireable<any>;
        export { children_2 as children };
    }
    export { propTypes_2 as propTypes };
}
import React from "react";
import PropTypes from "prop-types";
