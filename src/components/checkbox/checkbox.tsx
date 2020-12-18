import React from 'react'

import './checkbox.less'

type Props = {
    checked?: boolean
    disabled?: boolean
    onChange?: (checked: boolean) => void
    label?: string | number
}

function Checkbox({ label, disabled, checked = false, onChange }: Props) {
    return (
        <label className="reactist_checkbox">
            <input
                className="reactist_checkbox--input"
                value={label}
                checked={checked}
                disabled={disabled}
                onChange={
                    disabled || !onChange ? undefined : (event) => onChange(event.target.checked)
                }
                type="checkbox"
            />
            {label}
        </label>
    )
}
Checkbox.displayName = 'Checkbox'

export { Checkbox }
