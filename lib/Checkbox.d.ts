/// <reference types="react" />
import './styles/checkbox.less';
import PropTypes from 'prop-types';
/**
 * @typedef {Object} Props
 * @property {boolean | undefined} [checked]
 * @property {boolean | undefined} [disabled]
 * @property {(checked: boolean) => void} [onChange]
 * @property {string | number | undefined} [label]
 */
/** @type {React.FC<Props>} */
declare const Checkbox: {
    ({ label, disabled, checked, onChange }: {
        label: any;
        disabled: any;
        checked: any;
        onChange: any;
    }): JSX.Element;
    displayName: string;
    defaultProps: {
        checked: boolean;
    };
    propTypes: {
        /** Handler function that is called when the checkbox is toggled. Is invoked with the checked value and not the full event. */
        onChange: PropTypes.Validator<(...args: any[]) => any>;
        /** Current value of the checkbox. */
        checked: PropTypes.Requireable<boolean>;
        /** Whether the checkbox is disabled or not. */
        disabled: PropTypes.Requireable<boolean>;
        /** Label that is displayed next to the checkbox. */
        label: PropTypes.Requireable<string | number>;
    };
};
export default Checkbox;
