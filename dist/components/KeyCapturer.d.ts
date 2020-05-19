import React from 'react';
/** @type {Record<string, string>} */
declare const SUPPORTED_KEYS: {
    ARROW_UP: string;
    ARROW_RIGHT: string;
    ARROW_DOWN: string;
    ARROW_LEFT: string;
    ENTER: string;
    BACKSPACE: string;
    ESCAPE: string;
};
declare const KeyCapturerResolver: {
    /**
     * @param {string} eventKey
     */
    resolveByKey: (eventKey: any) => string;
    /**
     * @param {number} keyCode
     */
    resolveByKeyCode: (keyCode: any) => string;
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
declare class KeyCapturer extends React.Component<any, any> {
    static propTypes: any;
    /**
     * @param {React.KeyboardEvent} event
     */
    _handleKeyEvent: (event: any) => void;
    render(): React.ReactElement<any, string | ((props: any) => React.ReactElement<any, string | any | (new (props: any) => React.Component<any, any, any>)>) | (new (props: any) => React.Component<any, any, any>)>;
}
export default KeyCapturer;
export { KeyCapturerResolver, SUPPORTED_KEYS };
