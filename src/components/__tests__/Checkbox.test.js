import React from 'react'
import { shallow } from 'enzyme'

import Checkbox from '../Checkbox'

describe('Checkbox', () => {
    it('renders when initially set to false', () => {
        const checkbox = shallow(getCheckbox())
        expect(checkbox).toMatchSnapshot()
    })

    it('renders when initially set to true', () => {
        const checkbox = shallow(getCheckbox({ checked: true }))
        expect(checkbox).toMatchSnapshot()
    })

    it('calls onChange callback when checkbox value changes', () => {
        const onChangeSpy = jest.fn()
        const checkbox = shallow(getCheckbox({ onChange: onChangeSpy }))

        checkbox
            .find('.reactist_checkbox--input')
            .simulate('change', { target: { checked: true } })
        expect(onChangeSpy).toHaveBeenLastCalledWith(true)
    })

    it('does not call onChange when disabled', () => {
        const onChangeSpy = jest.fn()
        const checkbox = shallow(
            getCheckbox({ disabled: true, onChange: onChangeSpy })
        )

        checkbox
            .find('.reactist_checkbox--input')
            .simulate('change', { target: { checked: true } })
        expect(onChangeSpy).not.toHaveBeenCalled()
    })

    // Helpers ================================================================
    const getCheckbox = props => (
        <Checkbox
            label="Checkbox Label"
            checked={false}
            onChange={jest.fn()}
            {...props}
        />
    )
})
