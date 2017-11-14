import React from 'react'
import { shallow } from 'enzyme'

import ThreeDotsIcon from '../ThreeDotsIcon.svg'

describe('ThreeDotsIcon', () => {
    it('renders a svg icon', () => {
        const threeDotsIcon = shallow(<ThreeDotsIcon />)
        expect(threeDotsIcon).toMatchSnapshot()
    })
})
