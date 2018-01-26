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
            .find('.checkbox--input')
            .simulate('change', { target: { checked: true } })
        expect(onChangeSpy).toHaveBeenLastCalledWith(true)
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
