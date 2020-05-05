export default ErrorMessage;
export type Props = {
    timeout: number;
    onHide?: () => void;
    message: string;
};
/**
 * @typedef {Object} Props
 * @property {number} timeout
 * @property {() => void} [onHide]
 * @property {string} message
 */
/** @extends {React.Component<Props>} */
declare class ErrorMessage extends React.Component<Props, any, any> {
    /**
     * @param {Props} props
     * @param {unknown} context
     */
    constructor(props: Props, context: unknown);
    state: {
        visible: boolean;
    };
    /**
     * @param {Props} next_props
     */
    UNSAFE_componentWillReceiveProps(next_props: Props): void;
    /**
     * @param {string} message
     */
    _isValidMessage(message: string): boolean;
    _clearTimeout: () => void;
    _triggerDelayedHide: () => void;
    timeout: NodeJS.Timeout;
    _hide: () => void;
    render(): false | JSX.Element;
}
declare namespace ErrorMessage {
    export const displayName: string;
    export namespace defaultProps {
        export const timeout: number;
    }
    export namespace propTypes {
        export const message: PropTypes.Requireable<PropTypes.ReactNodeLike>;
        const timeout_1: PropTypes.Requireable<number>;
        export { timeout_1 as timeout };
        export const onHide: PropTypes.Requireable<(...args: any[]) => any>;
    }
}
import React from "react";
import PropTypes from "prop-types";
