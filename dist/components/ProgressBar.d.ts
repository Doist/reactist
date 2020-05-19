/// <reference types="react" />
import './styles/progress_bar.less';
import PropTypes from 'prop-types';
/**
 * @typedef {Object} Props
 * @property {string | undefined} [className]
 * @property {number | undefined} [fillPercentage]
 */
/** @type {React.FC<Props>} */
declare const ProgressBar: {
    ({ fillPercentage, className }: {
        fillPercentage: any;
        className: any;
    }): JSX.Element;
    displayName: string;
    defaultProps: {
        fillPercentage: number;
    };
    propTypes: {
        /** How much of the progress bar should be filled. Number between 0 and 100 inclusive. */
        fillPercentage: PropTypes.Requireable<number>;
        /** Additional css class applied to the progress bar. */
        className: PropTypes.Requireable<string>;
    };
};
export default ProgressBar;
