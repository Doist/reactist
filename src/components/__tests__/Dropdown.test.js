import React from 'react'
import { shallow } from 'enzyme'
import toJson from 'enzyme-to-json'

import Dropdown from '../Dropdown'

describe('Dropdown.Trigger', () => {
    it('renders empty without crashing', () => {
        const trigger = shallow(<Dropdown.Trigger />)
        expect(toJson(trigger)).toMatchSnapshot()
    })

    it('renders all children without crashing', () => {
        const simpleTrigger = shallow(
            <Dropdown.Trigger>Trigger Content</Dropdown.Trigger>
        )
        expect(toJson(simpleTrigger)).toMatchSnapshot()

        const complexTrigger = shallow(
            <Dropdown.Trigger>
                <div>
                    <img src="" alt="" />
                    Some additional text as well
                </div>
            </Dropdown.Trigger>
        )
        expect(toJson(complexTrigger)).toMatchSnapshot()
    })

    it('calls onClick callback', () => {
        const onClickSpy = jest.fn()
        const trigger = shallow(<Dropdown.Trigger onClick={onClickSpy} />)

        trigger.simulate('click', {
            preventDefault: jest.fn(),
            stopPropagation: jest.fn()
        })

        expect(onClickSpy).toHaveBeenCalledTimes(1)
    })
})
