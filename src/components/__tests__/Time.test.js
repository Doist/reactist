import dayjs from 'dayjs'
import React from 'react'
import { shallow } from 'enzyme'
import toJson from 'enzyme-to-json'

import Time from '../Time'

describe('Time', () => {
    const testDate = dayjs(new Date('March 22, 1991 13:37:42')).unix()

    it('renders without crashing', () => {
        const time = shallow(<Time time={dayjs().unix()} />)
        expect(toJson(time)).toMatchSnapshot()
    })

    it('toggles hovered state on mouse enter and leave when mouse moves', () => {
        const time = shallow(<Time time={dayjs().unix()} />)
        expect(time.state('hovered')).toBe(false)

        time.simulate('mouseEnter', getMouseEvent(100, 100))
        expect(time.state('hovered')).toBe(true)

        time.simulate('mouseLeave', getMouseEvent(100, 110))
        expect(time.state('hovered')).toBe(false)
    })

    it('does not toggle hovered state when mouse did not move', () => {
        const time = shallow(<Time time={dayjs().unix()} />)
        expect(time.state('hovered')).toBe(false)

        time.simulate('mouseEnter', getMouseEvent())
        expect(time.state('hovered')).toBe(true)

        time.simulate('mouseLeave', getMouseEvent())
        expect(time.state('hovered')).toBe(true)
    })

    it('renders relative time when not hovered', () => {
        const time = shallow(<Time time={dayjs().unix()} />)
        expect(getRenderedTime(time)).toBe('moments ago')
    })

    it('renders full absolute time when hovered and expandedFullOnHover is set', () => {
        const time = shallow(<Time time={testDate} expandFullyOnHover />)
        time.simulate('mouseEnter', getMouseEvent())
        expect(getRenderedTime(time)).toBe('March 22, 1991, 1:37 PM')
    })

    it('renders short absolute time when hovered and expandedOnHover is set', () => {
        const time = shallow(<Time time={testDate} expandOnHover />)
        time.simulate('mouseEnter', getMouseEvent())
        expect(getRenderedTime(time)).toBe('March 22, 1991')
    })

    it('adds additional class name if supplied', () => {
        const time = shallow(
            <Time time={testDate} className="this-classes were-added" />
        )
        expect(toJson(time)).toMatchSnapshot()
    })

    it('renders wrapped in tooltip when tooltipOnHover is set', () => {
        const time = shallow(<Time time={testDate} tooltipOnHover />)
        expect(time).toMatchSnapshot()
    })

    it('renders with custom tooltip when supplied', () => {
        const time = shallow(
            <Time time={testDate} tooltipOnHover tooltip="Test" />
        )
        expect(time).toMatchSnapshot()
    })

    it('does not render short absolute time on hover when tooltipOnHover is set', () => {
        const time = shallow(
            <Time time={dayjs().unix()} tooltipOnHover expandOnHover />
        )
        time.simulate('mouseEnter', getMouseEvent())
        expect(time.find('Tooltip').props().children).toBe('moments ago')
    })

    it('does not render full absolute time on hover when tooltipOnHover is set', () => {
        const time = shallow(
            <Time time={dayjs().unix()} tooltipOnHover expandFullyOnHover />
        )
        time.simulate('mouseEnter', getMouseEvent())
        expect(time.find('Tooltip').props().children).toBe('moments ago')
    })

    // Helper functions ///////////////////////////////////////////////////////
    function getRenderedTime(timeComponent) {
        return timeComponent.find('time').props().children
    }

    function getMouseEvent(x = 100, y = 100) {
        return { clientX: x, clientY: y }
    }
})
