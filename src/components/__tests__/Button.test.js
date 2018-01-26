import React from 'react'
import { shallow } from 'enzyme'
import toJson from 'enzyme-to-json'

import Button from '../Button.jsx'

describe('Button', () => {
    it('renders empty without crashing', () => {
        const button = shallow(<Button />)
        expect(toJson(button)).toMatchSnapshot()
    })

    it('renders name as button text', () => {
        const button = shallow(<Button name="THE BUTTON TEXT" />)
        expect(toJson(button)).toMatchSnapshot()
    })

    it('calls onclick when clicked', () => {
        const mockEvent = { preventDefault: jest.fn() }
        const clickSpy = jest.fn()
        const button = shallow(<Button onClick={clickSpy} />)

        button.find('button').simulate('click', mockEvent)
        expect(clickSpy).toHaveBeenCalled()
    })

    it('does not call onclick when disabled and clicked', () => {
        const mockEvent = { preventDefault: jest.fn() }
        const clickSpy = jest.fn()
        const button = shallow(<Button disabled onClick={clickSpy} />)

        button.find('button').simulate('click', mockEvent)
        expect(clickSpy).not.toHaveBeenCalled()
    })

    it('does not call onClick when loading and clicked', () => {
        const mockEvent = { preventDefault: jest.fn() }
        const clickSpy = jest.fn()
        const button = shallow(<Button loading onClick={clickSpy} />)

        button.find('button').simulate('click', mockEvent)
        expect(clickSpy).not.toHaveBeenCalled()
    })

    it('renders a tooltip when prop is supplied', () => {
        const button = shallow(
            <Button name="THE BUTTON TEXT" data_tip="THE TOOLTIP" />
        )
        expect(toJson(button)).toMatchSnapshot()
    })

    it('adds additional className when supplied', () => {
        const button = shallow(
            <Button
                name="THE BUTTON TEXT"
                className="very-complex classnames-are-added"
            />
        )
        expect(toJson(button)).toMatchSnapshot()
    })
})
