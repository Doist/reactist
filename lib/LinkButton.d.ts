export default LinkButton;
export type Props = {
    onClick?: (event?: React.MouseEvent<Element, MouseEvent>) => void;
    disabled?: boolean;
    className?: string;
    name?: React.ReactNode;
};
/**
 * @typedef {Object} Props
 * @property {(event?: React.MouseEvent) => void} [onClick]
 * @property {boolean} [disabled]
 * @property {string} [className]
 * @property {React.ReactNode} [name]
 */
/** @extends {React.Component<Props>} */
declare class LinkButton extends React.Component<Props, any, any> {
    constructor(props: Readonly<Props>);
    constructor(props: Props, context?: any);
    /**
     * @param {React.MouseEvent} event
     */
    _handleClick: (event: React.MouseEvent<Element, MouseEvent>) => void;
    render(): JSX.Element;
}
declare namespace LinkButton {
    export const displayName: string;
    export namespace defaultProps {
        export const disabled: boolean;
    }
    export namespace propTypes {
        export const name: PropTypes.Validator<string>;
        export const onClick: PropTypes.Requireable<(...args: any[]) => any>;
        const disabled_1: PropTypes.Requireable<boolean>;
        export { disabled_1 as disabled };
        export const className: PropTypes.Requireable<string>;
    }
}
import React from "react";
import PropTypes from "prop-types";
