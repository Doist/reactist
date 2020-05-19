import './styles/error_message.less';
import React from 'react';
/**
 * @typedef {Object} Props
 * @property {number} timeout
 * @property {() => void} [onHide]
 * @property {string} message
 */
/** @extends {React.Component<Props>} */
declare class ErrorMessage extends React.Component<any, any> {
    static displayName: any;
    static defaultProps: any;
    static propTypes: any;
    /**
     * @param {Props} props
     * @param {unknown} context
     */
    constructor(props: any, context: any);
    /**
     * @param {Props} next_props
     */
    UNSAFE_componentWillReceiveProps(next_props: any): void;
    /**
     * @param {string} message
     */
    _isValidMessage(message: any): boolean;
    _clearTimeout: () => void;
    _triggerDelayedHide: () => void;
    _hide: () => void;
    render(): false | JSX.Element;
}
export default ErrorMessage;
