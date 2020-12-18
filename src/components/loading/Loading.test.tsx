import React from 'react'
import { shallow } from 'enzyme'

import { Loading } from './loading'

describe('Loading', () => {
    it('renders a loading indicator', () => {
        const loading = shallow(<Loading />)
        expect(loading).toMatchSnapshot()
    })

    it('adds additionally supplied className', () => {
        const loading = shallow(<Loading className="additional className" />)
        expect(loading.hasClass('additional')).toBe(true)
        expect(loading.hasClass('className')).toBe(true)
    })
})
