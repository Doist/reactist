import React from 'react'
import classNames from 'classnames'

import './select.less'

type Option = {
    /** Optional key for each option. If not provided `value` is used. */
    key?: string | number
    /** Value of the option. */
    value: string | number
    /** Text to display for the option. */
    text?: string | number
    /** Whether the options is disabled or not. */
    disabled?: boolean
}

type Props = {
    className?: string
    disabled?: boolean
    /** Currently selected value. */
    value?: string | number
    /** Callback for the change event. Will be called with the next value (not the full event). */
    onChange?: (value: string) => void
    /** Options that are rendered in the select. */
    options?: Option[]
    /** Value to initially be set */
    defaultValue?: string | number
}

function Select({
    value,
    options = [],
    onChange,
    disabled = true,
    className = '',
    defaultValue,
    ...otherProps
}: Props) {
    const selectClassName = classNames('reactist_select', { disabled }, className)
    return (
        <select
            className={selectClassName}
            value={value}
            onChange={(event) => (onChange ? onChange(event.target.value) : undefined)}
            disabled={disabled}
            defaultValue={defaultValue}
            {...otherProps}
        >
            {options &&
                options.map((option) => (
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
    disabled: false,
}

export { Select }
