import './styles/select.less'

import React from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'

const Select = ({ value, options, onChange, disabled, className }) => {
    const selectClassName = classNames(
        'reactist_select',
        { disabled },
        className
    )
    return (
        <select
            className={selectClassName}
            value={value}
            onChange={event => onChange(event.target.value)}
            disabled={disabled}
        >
            {options.map(option => (
                <option
                    key={option.key || option.value}
                    value={option.value}
                    disabled={option.disabled}
                >
                    {option.text}
                </option>
            ))}
        </select>
    )
}
Select.displayName = 'Select'
Select.defaultProps = {
    options: [],
    disabled: false
}
Select.propTypes = {
    /** Currently selected value. */
    value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
    /** Callback for the change event. Will be called with the next value (not the full event). */
    onChange: PropTypes.func.isRequired,
    /** Options that are rendered in the select. */
    options: PropTypes.arrayOf(
        PropTypes.shape({
            /** Optional key for each option. If not provided `value` is used. */
            key: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
            /** Value of the option. */
            value: PropTypes.oneOfType([PropTypes.string, PropTypes.number])
                .isRequired,
            /** Text to display for the option. */
            text: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
            /** Whether the options is disabled or not. */
            disabled: PropTypes.bool
        })
    ),
    /** Whether the select is disabled or not. */
    disabled: PropTypes.bool,
    /** Additional css class applied to the select. */
    className: PropTypes.string
}

export default Select
