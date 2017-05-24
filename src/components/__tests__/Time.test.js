import moment from 'moment'
import React from 'react'
import { shallow } from 'enzyme'
import toJson from 'enzyme-to-json'

import Time from '../Time'

describe('Time', () => {
    const testDate = moment().year(1991)
                             .month('March')
                             .date(22)
                             .hours(13)
                             .minutes(37)
                             .seconds(42)
                             .unix()

    it('renders without crashing', () => {
        const time = shallow(<Time time={ moment().unix() } />)
        expect(toJson(time)).toMatchSnapshot()
    })

    it('toggles hovered state on mouse enter and leave', () => {
        const time = shallow(<Time time={ moment().unix() } />)
        expect(time.state('hovered')).toBe(false)

        time.simulate('mouseEnter')
        expect(time.state('hovered')).toBe(true)

        time.simulate('mouseLeave')
        expect(time.state('hovered')).toBe(false)
    })

    it('renders relative time when not hovered', () => {
        const time = shallow(<Time time={ moment().unix() } />)
        expect(getRenderedTime(time)).toBe('moments ago')
    })

    it('renders full absolute time when hovered and expandedFullOnHover is set', () => {
        const time = shallow(<Time time={ testDate } expandFullyOnHover />)
        time.simulate('mouseEnter')
        expect(getRenderedTime(time)).toBe('22 Mar 91, 1:37 PM')
    })

    it('renders short absolute time when hovered and expandedOnHover is set', () => {
        const time = shallow(<Time time={ testDate } expandOnHover />)
        time.simulate('mouseEnter')
        expect(getRenderedTime(time)).toBe('Mar 22, 1991')
    })

    it('adds additional class name if supplied', () => {
        const time = shallow(<Time time={ testDate } className='this-classes were-added' />)
        expect(toJson(time)).toMatchSnapshot()
    })

    // Helper functions ///////////////////////////////////////////////////////
    function getRenderedTime(timeComponent) {
        return timeComponent.children().node
    }
})