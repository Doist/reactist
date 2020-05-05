export default Time;
export type Props = {
    time: number;
    config: import("./utils/TimeUtils").Config;
    className?: string;
    tooltipOnHover?: boolean;
    refresh?: boolean;
    tooltip?: React.ReactNode;
    expandOnHover?: boolean;
    expandFullyOnHover?: boolean;
};
export type State = {
    hovered: boolean;
};
/**
 * @typedef {Object} Props
 * @property {number} time
 * @property {import('./utils/TimeUtils').Config} config
 * @property {string} [className]
 * @property {boolean} [tooltipOnHover]
 * @property {boolean} [refresh]
 * @property {React.ReactNode} [tooltip]
 * @property {boolean} [expandOnHover]
 * @property {boolean} [expandFullyOnHover]
 */
/**
 * @typedef {Object} State
 * @property {boolean} hovered
 */
/** @extends {React.Component<Props, State>} */
declare class Time extends React.Component<Props, State, any> {
    /**
     * @param {Props} props
     * @param {unknown} context
     */
    constructor(props: Props, context: unknown);
    refresh_interval: NodeJS.Timeout;
    state: {
        hovered: boolean;
        mouseX: any;
        mouseY: any;
    };
    componentDidMount(): void;
    /**
     * @param {Props} prevProps
     */
    componentDidUpdate(prevProps: Props): void;
    componentWillUnmount(): void;
    /**
     * @param {boolean} hovered
     * @param {React.MouseEvent} event
     */
    _setHovered(hovered: boolean, event: React.MouseEvent<Element, MouseEvent>): void;
    /**
     * @param {Props['config']} config
     */
    _renderTime(config: import("./utils/TimeUtils").Config): string;
    _refresh(): void;
    render(): JSX.Element;
}
declare namespace Time {
    export const displayName: string;
    export namespace propTypes {
        export const className: PropTypes.Requireable<string>;
        export const time: PropTypes.Validator<number>;
        export const expandOnHover: PropTypes.Requireable<boolean>;
        export const expandFullyOnHover: PropTypes.Requireable<boolean>;
        export const tooltipOnHover: PropTypes.Requireable<boolean>;
        export const refresh: PropTypes.Requireable<boolean>;
        export const tooltip: PropTypes.Requireable<string>;
        export const config: PropTypes.Requireable<PropTypes.InferProps<{
            locale: PropTypes.Requireable<string>;
            shortFormatCurrentYear: PropTypes.Requireable<string>;
            shortFormatPastYear: PropTypes.Requireable<string>;
            fullFormat: PropTypes.Requireable<string>;
            daysSuffix: PropTypes.Requireable<string>;
            hoursSuffix: PropTypes.Requireable<string>;
            minutesSuffix: PropTypes.Requireable<string>;
            momentsAgo: PropTypes.Requireable<string>;
        }>>;
    }
    export namespace defaultProps {
        const expandOnHover_1: boolean;
        export { expandOnHover_1 as expandOnHover };
        const expandFullyOnHover_1: boolean;
        export { expandFullyOnHover_1 as expandFullyOnHover };
        const tooltipOnHover_1: boolean;
        export { tooltipOnHover_1 as tooltipOnHover };
        const refresh_1: boolean;
        export { refresh_1 as refresh };
        export namespace config_1 {
            export const locale: string;
            export const daysSuffix: string;
            export const hoursSuffix: string;
            export const minutesSuffix: string;
            export const momentsAgo: string;
        }
        export { config_1 as config };
    }
}
import React from "react";
import PropTypes from "prop-types";
