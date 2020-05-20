import './styles/tabs.less';
import React from 'react';
import PropTypes from 'prop-types';
/**
 * @typedef {Object} Props
 * @property {boolean} [disabled]
 * @property {boolean} [spreadLayout]
 * @property {number} [defaultTab]
 * @property {(value: string | number | undefined) => void} [onChange]
 */
/** @extends {React.Component<Props>} */
declare class Tabs extends React.Component<any, any> {
    static displayName: any;
    static propTypes: any;
    static defaultProps: any;
    /**
     * @param {Props} props
     * @param {unknown} context
     */
    constructor(props: any, context: any);
    /**
     * @param {React.Component<TabProps>} tab
     * @param {number} i
     */
    _switchActiveTab: (tab: any, i: any) => void;
    /**
     * @param {React.Component<TabProps>[]} tabs
     */
    _renderTabLinks: (tabs: any) => any;
    render(): JSX.Element;
}
/**
 * @typedef {Object} TabProps
 * @property {string | undefined} [className]
 * @property {boolean | undefined} [disabled]
 * @property {string | number | undefined} [value]
 * @property {React.ReactNode} [title]
 */
/** @type {React.FC<React.PropsWithChildren<TabProps>>} */
declare const Tab: {
    ({ children, className }: {
        children: any;
        className: any;
    }): JSX.Element;
    displayName: string;
    defaultProps: {
        disabled: boolean;
    };
    propTypes: {
        value: PropTypes.Requireable<string | number>;
        /** Title of the tab. */
        title: PropTypes.Validator<string>;
        /** Disabled tabs can't be selected. */
        disabled: PropTypes.Requireable<boolean>;
        /** Additional css class applied to Tab. */
        className: PropTypes.Requireable<string>;
        /** Children of the Tab component. Can be a simple string or other component(s). */
        children: PropTypes.Requireable<any>;
    };
};
export { Tabs, Tab };
