export default Icon;
export type Props = {
    onClick?: () => void;
    disabled?: boolean;
    className?: boolean;
    image?: string;
    hoveredImage?: string;
    icon?: React.ReactNode;
    tooltip?: React.ReactNode;
};
/**
 * @typedef {Object} Props
 * @property {() => void} [onClick]
 * @property {boolean} [disabled]
 * @property {boolean} [className]
 * @property {string} [image]
 * @property {string} [hoveredImage]
 * @property {React.ReactNode} [icon]
 * @property {React.ReactNode} [tooltip]
 */
/** @extends {React.Component<Props>} */
declare class Icon extends React.Component<Props, any, any> {
    /**
     * @param {Props} props
     * @param {unknown} context
     */
    constructor(props: Props, context: unknown);
    state: {
        hovered: boolean;
    };
    /**
     * @param {React.MouseEvent} event
     */
    _onClick: (event: React.MouseEvent<Element, MouseEvent>) => void;
    _hover: () => void;
    _unhover: () => void;
    render(): JSX.Element;
}
declare namespace Icon {
    export const displayName: string;
    export namespace defaultProps {
        export const disabled: boolean;
    }
    export namespace propTypes {
        export const image: PropTypes.Requireable<string>;
        export const hoveredImage: PropTypes.Requireable<string>;
        export const onClick: PropTypes.Requireable<(...args: any[]) => any>;
        export const tooltip: PropTypes.Requireable<string>;
        const disabled_1: PropTypes.Requireable<boolean>;
        export { disabled_1 as disabled };
        export const icon: PropTypes.Requireable<PropTypes.ReactElementLike>;
        export const className: PropTypes.Requireable<string>;
    }
}
import React from "react";
import PropTypes from "prop-types";
