import './styles/range_input.less'

import React from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'

const RangeInput = ({
    value,
    min,
    max,
    stepSize,
    onPlus,
    onMinus,
    onChange,
    className
}) => {
    if (typeof onPlus !== 'function') {
        onPlus = onChange
    }
    if (typeof onMinus !== 'function') {
        onMinus = onChange
    }
    const rangeInputClassName = classNames('reactist_range_input', className)
    return (
        <div className={rangeInputClassName}>
            <span
                className="range_btn minus"
                onClick={() => value > min && onMinus(value - stepSize)}
            />
            <input
                value={value}
                className="range_slider"
                type="range"
                min={min}
                max={max}
                step={stepSize}
                onChange={event => onChange(parseInt(event.target.value))}
            />
            <span
                className="range_btn plus"
                onClick={() => value < max && onPlus(value + stepSize)}
            />
        </div>
    )
}
RangeInput.displayName = 'RangeInput'
RangeInput.defaultProps = {
    value: 0,
    min: 0,
    max: 100,
    stepSize: 1
}
RangeInput.propTypes = {
    /** Current value of the range input. */
    value: PropTypes.number.isRequired,
    /** Minimum value of the range input. */
    min: PropTypes.number,
    /** Maximum value of the range input. */
    max: PropTypes.number,
    /** Step size of the range input and the plus/minus buttons. */
    stepSize: PropTypes.number,
    /** Optional function that is called when plus button is clicked. If not supplied onChange will be called with the next value. */
    onPlus: PropTypes.func,
    /** Optional function that is called when minus button is clicked. If not supplied onChange will be called with the next value. */
    onMinus: PropTypes.func,
    /** Callback function that is called whenever the range input value changes. When onPlus or onMinus is supplied this will not be called for button clicks. */
    onChange: PropTypes.func.isRequired,
    /** Optional css class that is applied to the range input. */
    className: PropTypes.string
}

export default RangeInput
