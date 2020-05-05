export default KeyCapturer;
export type Props = Record<string, string | number | boolean | React.ReactElement<any, string | ((props: any) => React.ReactElement<any, string | any | (new (props: any) => React.Component<any, any, any>)>) | (new (props: any) => React.Component<any, any, any>)> | (() => void)> & {
    eventName?: "onKeyDown" | "onKeyDownCapture" | "onKeyUp" | "onKeyUpCapture";
};
/**
 * @typedef {Record<string, (() => void) | boolean | React.ReactChild> & {eventName?: 'onKeyDown' | 'onKeyDownCapture' | 'onKeyUp' | 'onKeyUpCapture'}} Props
 */
/**
 * Use this component to wrap anything you want to handle key events for (e.g. an input).
 * You can specify the `eventName` to capture (defaults to `onKeyDown`).
 * Check the SUPPORTED_KEYS map to see which keys are supported and supply the respective
 * `on${Key}` prop (i.e. `onEnter` or `onArrowDown`).
 * If you want the default behaviour to be preserved (i.e. only want to hook into the event
 * instead of replacing it) set the `propagate${Key}` prop (e.g. propagateBackspace).
 *
 * @extends {React.Component<Props>}
 */
declare class KeyCapturer extends React.Component<Record<string, string | number | boolean | React.ReactElement<any, string | ((props: any) => React.ReactElement<any, string | any | (new (props: any) => React.Component<any, any, any>)>) | (new (props: any) => React.Component<any, any, any>)> | (() => void)> & {
    eventName?: "onKeyDown" | "onKeyDownCapture" | "onKeyUp" | "onKeyUpCapture";
}, any, any> {
    constructor(props: Readonly<Record<string, string | number | boolean | React.ReactElement<any, string | ((props: any) => React.ReactElement<any, string | any | (new (props: any) => React.Component<any, any, any>)>) | (new (props: any) => React.Component<any, any, any>)> | (() => void)> & {
        eventName?: "onKeyDown" | "onKeyDownCapture" | "onKeyUp" | "onKeyUpCapture";
    }>);
    constructor(props: Record<string, string | number | boolean | React.ReactElement<any, string | ((props: any) => React.ReactElement<any, string | any | (new (props: any) => React.Component<any, any, any>)>) | (new (props: any) => React.Component<any, any, any>)> | (() => void)> & {
        eventName?: "onKeyDown" | "onKeyDownCapture" | "onKeyUp" | "onKeyUpCapture";
    }, context?: any);
    /**
     * @param {React.KeyboardEvent} event
     */
    _handleKeyEvent: (event: React.KeyboardEvent<Element>) => void;
    render(): React.ReactElement<any, string | ((props: any) => React.ReactElement<any, string | any | (new (props: any) => React.Component<any, any, any>)>) | (new (props: any) => React.Component<any, any, any>)>;
}
declare namespace KeyCapturer {
    export namespace propTypes {
        export const children: PropTypes.Requireable<any>;
        export const eventName: PropTypes.Requireable<string>;
    }
}
export namespace KeyCapturerResolver {
    export function resolveByKey(eventKey: string): string;
    export function resolveByKeyCode(keyCode: number): string;
}
/** @type {Record<string, string>} */
export const SUPPORTED_KEYS: Record<string, string>;
import React from "react";
import PropTypes from "prop-types";
