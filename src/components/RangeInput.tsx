import './styles/range_input.less'

import React from 'react'
import classNames from 'classnames'

type Props = {
    /** Optional css class that is applied to the range input. */
    className?: string
    /** Current value of the range input. */
    value?: number
    /** Minimum value of the range input. */
    min?: number
    /** Maximum value of the range input. */
    max?: number
    /** Step size of the range input and the plus/minus buttons. */
    stepSize?: number
    /** Optional function that is called when plus button is clicked. If not supplied onChange will be called with the next value. */
    onPlus?: (value: number) => void
    /** Optional function that is called when minus button is clicked. If not supplied onChange will be called with the next value. */
    onMinus?: (value: number) => void
    /** Callback function that is called whenever the range input value changes. When onPlus or onMinus is supplied this will not be called for button clicks. */
    onChange?: (value: number) => void
}

function RangeInput({
    value = 0,
    min = 0,
    max = 100,
    stepSize = 1,
    onPlus,
    onMinus,
    onChange,
    className,
}: Props) {
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
                onClick={() => value > min && onMinus && onMinus(value - stepSize)}
            />
            <input
                value={value}
                className="range_slider"
                type="range"
                min={min}
                max={max}
                step={stepSize}
                onChange={(event) => onChange && onChange(parseInt(event.target.value))}
            />
            <span
                className="range_btn plus"
                onClick={() => value < max && onPlus && onPlus(value + stepSize)}
            />
        </div>
    )
}
RangeInput.displayName = 'RangeInput'

export default RangeInput
