import React from 'react'
import { shallow } from 'enzyme'

import Loading from '../Loading'

describe('Loading', () => {
    it('renders a loading indicator with three dots', () => {
        const loading = shallow(<Loading />)
        expect(loading).toMatchSnapshot()
    })

    it('applies the spinner--white class when white property is set', () => {
        const loading = shallow(<Loading white />)
        expect(loading.hasClass('spinner--white')).toBe(true)
    })

    it('adds additionally supplied className', () => {
        const loading = shallow(<Loading className="additional className" />)
        expect(loading.hasClass('additional')).toBe(true)
        expect(loading.hasClass('className')).toBe(true)
    })
})
