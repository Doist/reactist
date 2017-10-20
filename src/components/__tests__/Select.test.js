import React from 'react'
import { shallow } from 'enzyme'

import Select from '../Select'

describe('Select', () => {
    it('renders without crashing', () => {
        const select = shallow(getSelect())
        expect(select).toMatchSnapshot()
    })

    it('uses key of option when supplied', () => {
        const select = shallow(getSelect({ options: [{ value: 'test', text: 'test', key: 'test-key' }]}))
        expect(select.find('option').get(0).key).toBe('test-key')
    })

    it('calls onChange handler with selected value', () => {
        const onChangeSpy = jest.fn()
        const select = shallow(getSelect({ onChange: onChangeSpy, options: [{ value: 'test2', text: 'test2' }]}))

        select.simulate('change', { target: { value: 'test2' }})
        expect(onChangeSpy).toHaveBeenLastCalledWith('test2')
    })

    // helpers
    const getSelect = (props) => (
        <Select
            onChange={ () => {} }
            value='test'
            options={ [{ value: 'test', text: 'test' }] }
            { ...props }
        />
    )
})
