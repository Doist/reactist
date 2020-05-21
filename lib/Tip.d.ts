/// <reference types="react" />
import './styles/tip.less';
import PropTypes from 'prop-types';
/**
 * @typedef {Object} Props
 * @property {string | undefined} [className]
 * @property {React.ReactNode} [title]
 * @property {React.ReactNode} [message]
 * @property {boolean | undefined} [top]
 */
/** @type {React.FC<Props>} */
declare const Tip: {
    ({ title, message, top, className }: {
        title: any;
        message: any;
        top: any;
        className: any;
    }): JSX.Element;
    displayName: string;
    defaultProps: {
        top: boolean;
    };
    propTypes: {
        /** Whether the tip content should be displayed to the top or not. Maps to the Dropdown.Box top property. */
        top: PropTypes.Requireable<boolean>;
        /** Title of the tip. */
        title: PropTypes.Validator<string>;
        /** Message of the tip. */
        message: PropTypes.Validator<PropTypes.ReactNodeLike>;
        /** Additional css class that is applied to the Tip. */
        className: PropTypes.Requireable<string>;
    };
};
export default Tip;
