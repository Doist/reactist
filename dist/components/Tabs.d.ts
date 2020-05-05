export type Props = {
    disabled?: boolean;
    spreadLayout?: boolean;
    defaultTab?: number;
    onChange?: (value: React.ReactText) => void;
};
export type TabProps = {
    className?: string;
    disabled?: boolean;
    value?: React.ReactText;
    title?: React.ReactNode;
};
/**
 * @typedef {Object} Props
 * @property {boolean} [disabled]
 * @property {boolean} [spreadLayout]
 * @property {number} [defaultTab]
 * @property {(value: string | number | undefined) => void} [onChange]
 */
/** @extends {React.Component<Props>} */
export class Tabs extends React.Component<Props, any, any> {
    /**
     * @param {Props} props
     * @param {unknown} context
     */
    constructor(props: Props, context: unknown);
    state: {
        activeTabIndex: number;
    };
    /**
     * @param {React.Component<TabProps>} tab
     * @param {number} i
     */
    _switchActiveTab: (tab: React.Component<TabProps, any, any>, i: number) => void;
    /**
     * @param {React.Component<TabProps>[]} tabs
     */
    _renderTabLinks: (tabs: React.Component<TabProps, any, any>[]) => JSX.Element[];
    render(): JSX.Element;
}
export namespace Tabs {
    export const displayName: string;
    export namespace propTypes {
        export const defaultTab: PropTypes.Requireable<React.ReactText>;
        export const spreadLayout: PropTypes.Requireable<boolean>;
        export const onChange: PropTypes.Requireable<(...args: any[]) => any>;
        export const children: PropTypes.Requireable<any>;
    }
    export namespace defaultProps {
        const spreadLayout_1: boolean;
        export { spreadLayout_1 as spreadLayout };
    }
}
/**
 * @typedef {Object} TabProps
 * @property {string | undefined} [className]
 * @property {boolean | undefined} [disabled]
 * @property {string | number | undefined} [value]
 * @property {React.ReactNode} [title]
 */
/** @type {React.FC<React.PropsWithChildren<TabProps>>} */
export const Tab: React.FC<React.PropsWithChildren<TabProps>>;
import React from "react";
import PropTypes from "prop-types";
