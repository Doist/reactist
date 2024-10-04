import * as React from 'react';
type Key = 'ArrowUp' | 'ArrowRight' | 'ArrowDown' | 'ArrowLeft' | 'Enter' | 'Backspace' | 'Escape';
declare const SUPPORTED_KEYS: Record<string, Key>;
declare const KeyCapturerResolver: {
    resolveByKey(eventKey: string): Key | null;
    resolveByKeyCode(keyCode: number): Key | null;
};
type EventHandler = (event: React.SyntheticEvent) => void;
type EventHandlerProps = {
    onArrowUp?: EventHandler;
    onArrowDown?: EventHandler;
    onArrowLeft?: EventHandler;
    onArrowRight?: EventHandler;
    onEnter?: EventHandler;
    onBackspace?: EventHandler;
    onEscape?: EventHandler;
};
type PropagateProps = {
    propagateArrowUp?: boolean;
    propagateArrowDown?: boolean;
    propagateArrowLeft?: boolean;
    propagateArrowRight?: boolean;
    propagateEnter?: boolean;
    propagateBackspace?: boolean;
    propagateEscape?: boolean;
};
type KeyCapturerProps = EventHandlerProps & PropagateProps & {
    eventName?: 'onKeyDown' | 'onKeyDownCapture' | 'onKeyUp' | 'onKeyUpCapture';
    children: React.ReactElement<unknown>;
};
/**
 * Use this component to wrap anything you want to handle key events for (e.g. an input).
 * You can specify the `eventName` to capture (defaults to `onKeyDown`).
 * Check the SUPPORTED_KEYS map to see which keys are supported and supply the respective
 * `on${Key}` prop (i.e. `onEnter` or `onArrowDown`).
 * If you want the default behaviour to be preserved (i.e. only want to hook into the event
 * instead of replacing it) set the `propagate${Key}` prop (e.g. propagateBackspace).
 */
declare function KeyCapturer(props: KeyCapturerProps): React.ReactElement<unknown, string | React.JSXElementConstructor<any>>;
export { KeyCapturer, KeyCapturerResolver, SUPPORTED_KEYS };
