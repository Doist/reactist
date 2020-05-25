import './styles/checkbox.less'

import React from 'react'

type Props = {
    checked?: boolean
    disabled?: boolean
    onChange?: (checked: boolean) => void
    label?: string | number
}

const Checkbox: React.FC<Props> = ({
    label,
    disabled,
    checked = false,
    onChange,
}) => (
    <label className="reactist_checkbox">
        <input
            className="reactist_checkbox--input"
            value={label}
            checked={checked}
            disabled={disabled}
            onChange={
                disabled || !onChange
                    ? undefined
                    : (event) => onChange(event.target.checked)
            }
            type="checkbox"
        />
        {label}
    </label>
)
Checkbox.displayName = 'Checkbox'

export default Checkbox
