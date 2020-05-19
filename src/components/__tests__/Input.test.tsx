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
        const input = shallow(<Input onChange={onChangeSpy} />)

        input.simulate('change')
        expect(onChangeSpy).toHaveBeenCalled()
    })

    it('adds additional className when supplied', () => {
        const input = shallow(
            <Input className="very-complex classnames-are-added" />
        )
        expect(input.hasClass('reactist_input')).toBe(true)
        expect(input.hasClass('very-complex')).toBe(true)
        expect(input.hasClass('classnames-are-added')).toBe(true)
    })
})
