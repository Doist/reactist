/// <reference types="react" />
import './styles/loading.less';
import PropTypes from 'prop-types';
/**
 * @typedef {Object} Props
 * @property {string | undefined} [className]
 * @property {string | undefined} [spinnerColor]
 * @property {string | undefined} [bgColor]
 * @property {string | number | undefined} [size]
 */
/** @type {React.FC<Props>} */
declare const Loading: {
    ({ className, spinnerColor, bgColor, size }: {
        className: any;
        spinnerColor: any;
        bgColor: any;
        size: any;
    }): JSX.Element;
    displayName: string;
    defaultProps: {
        size: number;
        spinnerColor: string;
        bgColor: string;
    };
    propTypes: {
        /** Additional css class that is applied to Loading. */
        className: PropTypes.Requireable<string>;
        /** Hex code of the spinner color. */
        spinnerColor: PropTypes.Requireable<string>;
        /** Hex code of the background color. */
        bgColor: PropTypes.Requireable<string>;
        /** Circle diameter in pixels. */
        size: PropTypes.Requireable<number>;
    };
};
export default Loading;
