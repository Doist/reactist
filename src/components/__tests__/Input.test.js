import React from 'react'
import { shallow } from 'enzyme'

import Input from '../Input'

describe('Input', () => {
    it('renders without crashing', () => {
        const input = shallow(<Input />)
        expect(input).toMatchSnapshot()
    })

    it('adds arbitrary props to the underlying input element', () => {
        const onChangeSpy = jest.fn()
        const input = shallow(<Input onChange={ onChangeSpy } />)

        input.simulate('change')
        expect(onChangeSpy).toHaveBeenCalled()
    })
})
