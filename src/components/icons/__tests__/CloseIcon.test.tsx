import React from 'react'
import { shallow } from 'enzyme'

import CloseIcon from '../CloseIcon.svg'

describe('CloseIcon', () => {
    it('renders a svg icon', () => {
        const closeIcon = shallow(<CloseIcon />)
        expect(closeIcon).toMatchSnapshot()
    })
})
