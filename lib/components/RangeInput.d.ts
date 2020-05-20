/// <reference types="react" />
import './styles/range_input.less';
import PropTypes from 'prop-types';
/**
 * @typedef {Object} Props
 * @property {string | undefined} [className]
 * @property {number} [value]
 * @property {number | undefined} [min]
 * @property {number | undefined} [max]
 * @property {number | undefined} [stepSize]
 * @property {((value: number) => void) | undefined} [onPlus]
 * @property {((value: number) => void) | undefined} [onMinus]
 * @property {(value: number) => void} [onChange]
 */
/** @type {React.FC<Props>} */
declare const RangeInput: {
    ({ value, min, max, stepSize, onPlus, onMinus, onChange, className, }: {
        value: any;
        min: any;
        max: any;
        stepSize: any;
        onPlus: any;
        onMinus: any;
        onChange: any;
        className: any;
    }): JSX.Element;
    displayName: string;
    defaultProps: {
        value: number;
        min: number;
        max: number;
        stepSize: number;
    };
    propTypes: {
        /** Current value of the range input. */
        value: PropTypes.Validator<number>;
        /** Minimum value of the range input. */
        min: PropTypes.Requireable<number>;
        /** Maximum value of the range input. */
        max: PropTypes.Requireable<number>;
        /** Step size of the range input and the plus/minus buttons. */
        stepSize: PropTypes.Requireable<number>;
        /** Optional function that is called when plus button is clicked. If not supplied onChange will be called with the next value. */
        onPlus: PropTypes.Requireable<(...args: any[]) => any>;
        /** Optional function that is called when minus button is clicked. If not supplied onChange will be called with the next value. */
        onMinus: PropTypes.Requireable<(...args: any[]) => any>;
        /** Callback function that is called whenever the range input value changes. When onPlus or onMinus is supplied this will not be called for button clicks. */
        onChange: PropTypes.Validator<(...args: any[]) => any>;
        /** Optional css class that is applied to the range input. */
        className: PropTypes.Requireable<string>;
    };
};
export default RangeInput;
