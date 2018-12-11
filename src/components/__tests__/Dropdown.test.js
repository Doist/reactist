import React from 'react'
import { shallow } from 'enzyme'
import toJson from 'enzyme-to-json'

import Dropdown from '../Dropdown'

describe('Dropdown.Body', () => {
    it('renders empty without crashing', () => {
        const body = shallow(<Dropdown.Body />)
        expect(toJson(body)).toMatchSnapshot()
    })

    it('renders all children without crashing', () => {
        const simpleBody = shallow(<Dropdown.Body>Body Content</Dropdown.Body>)
        expect(toJson(simpleBody)).toMatchSnapshot()

        const complexBody = shallow(
            <Dropdown.Body>
                <div>
                    <img src="" alt="" />
                    Some additional text as well
                </div>
            </Dropdown.Body>
        )
        expect(toJson(complexBody)).toMatchSnapshot()
    })

    it('opens to the top when top is supplied', () => {
        const body = shallow(<Dropdown.Body top />)
        expect(body.props().style.top).toBe('auto')
        expect(body.props().style.bottom).toBe(0)
    })

    it('opens to the right when top is supplied', () => {
        const body = shallow(<Dropdown.Body right />)
        expect(body.props().style.right).toBe('auto')
        expect(body.props().style.left).toBe(0)
    })
})

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
