import React from 'react'
import { mount, shallow } from 'enzyme'
import toJson from 'enzyme-to-json'

import Dropdown from '../Dropdown'

describe('Dropdown', () => {
    describe('Dropdown.Box', () => {
        it('renders the Trigger component without crashing', () => {
            const box = mount(
                <Dropdown.Box>
                    <Dropdown.Trigger />
                    <Dropdown.Body />
                </Dropdown.Box>
            )

            expect(toJson(box)).toMatchSnapshot()
        })

        it('applies additionally provided class name', () => {
            const box = shallow(
                <Dropdown.Box className="additional class">
                    <Dropdown.Trigger />
                    <Dropdown.Body />
                </Dropdown.Box>
            )

            expect(box.hasClass('additional')).toBe(true)
            expect(box.hasClass('class')).toBe(true)
        })

        it('passes onClick props to the Trigger component', () => {
            const box = shallow(
                <Dropdown.Box>
                    <Dropdown.Trigger />
                    <Dropdown.Body />
                </Dropdown.Box>
            )

            expect(box.find(Dropdown.Trigger).prop('onClick')).not.toEqual(
                undefined
            )
        })

        it('passes top, right, and setPosition props down to the Body component', () => {
            const box = shallow(
                <Dropdown.Box top right>
                    <Dropdown.Trigger onClick={jest.fn()} />
                    <Dropdown.Body />
                </Dropdown.Box>
            )

            openDropdown(box)

            const body = box.find(Dropdown.Body)

            expect(body.prop('top')).toEqual(true)
            expect(body.prop('right')).toEqual(true)
            expect(body.prop('setPosition')).not.toEqual(undefined)
        })

        it('toggles the Body component with each Trigger click', () => {
            const box = shallow(
                <Dropdown.Box>
                    <Dropdown.Trigger onClick={jest.fn()} />
                    <Dropdown.Body />
                </Dropdown.Box>
            )
            expect(box.find(Dropdown.Body)).toHaveLength(0)

            const trigger = box.find(Dropdown.Trigger)

            simulateClick(trigger)
            expect(box.find(Dropdown.Body)).toHaveLength(1)

            simulateClick(trigger)
            expect(box.find(Dropdown.Body)).toHaveLength(0)
        })

        it('toggles the Body component as a function with each Trigger click', () => {
            const box = shallow(
                <Dropdown.Box>
                    <Dropdown.Trigger onClick={jest.fn()} />
                    {props => <Dropdown.Body {...props} />}
                </Dropdown.Box>
            )
            expect(box.find(Dropdown.Body)).toHaveLength(0)

            const trigger = box.find(Dropdown.Trigger)

            simulateClick(trigger)
            expect(box.find(Dropdown.Body)).toHaveLength(1)

            simulateClick(trigger)
            expect(box.find(Dropdown.Body)).toHaveLength(0)
        })

        it('renders the Trigger component first when top prop is not provided', () => {
            const box = mount(
                <Dropdown.Box>
                    <Dropdown.Trigger onClick={jest.fn()} />
                    <Dropdown.Body />
                </Dropdown.Box>
            )

            openDropdown(box)

            expect(
                box
                    .find('div')
                    .at(0)
                    .hasClass('reactist_dropdown')
            ).toEqual(true)
            expect(
                box
                    .find('div')
                    .at(1)
                    .hasClass('trigger')
            ).toEqual(true)
        })

        it('renders the Body component first when top prop is provided', () => {
            const box = mount(
                <Dropdown.Box top>
                    <Dropdown.Trigger onClick={jest.fn()} />
                    <Dropdown.Body />
                </Dropdown.Box>
            )

            openDropdown(box)

            expect(
                box
                    .find('div')
                    .at(0)
                    .hasClass('reactist_dropdown')
            ).toEqual(true)
            expect(
                box
                    .find('div')
                    .at(1)
                    .hasClass('body_wrapper')
            ).toEqual(true)
        })

        it('calls onShowBody and onHideBody callbacks when the Body component is shown and hidden', () => {
            const onShowBodySpy = jest.fn()
            const onHideBodySpy = jest.fn()

            const box = shallow(
                <Dropdown.Box
                    onShowBody={onShowBodySpy}
                    onHideBody={onHideBodySpy}
                >
                    <Dropdown.Trigger onClick={jest.fn()} />
                    <Dropdown.Body />
                </Dropdown.Box>
            )

            const trigger = box.find(Dropdown.Trigger)

            simulateClick(trigger)
            expect(onShowBodySpy).toHaveBeenCalled()

            simulateClick(trigger)
            expect(onHideBodySpy).toHaveBeenCalled()
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
            simulateClick(trigger)

            expect(onClickSpy).toHaveBeenCalledTimes(1)
        })
    })

    describe('Dropdown.Body', () => {
        it('renders empty without crashing', () => {
            const body = shallow(<Dropdown.Body />)
            expect(toJson(body)).toMatchSnapshot()
        })

        it('renders all children without crashing', () => {
            const simpleBody = shallow(
                <Dropdown.Body>Body Content</Dropdown.Body>
            )
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

    // Helpers ================================================================

    const openDropdown = rootElement => {
        const trigger = rootElement.find(Dropdown.Trigger)
        simulateClick(trigger)
        expect(rootElement.find(Dropdown.Body)).toHaveLength(1)
    }

    const simulateClick = element => {
        element.simulate('click', {
            preventDefault: jest.fn(),
            stopPropagation: jest.fn()
        })
    }
})
