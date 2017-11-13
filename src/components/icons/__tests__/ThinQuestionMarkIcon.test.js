import React from 'react'
import { shallow } from 'enzyme'

import ThinQuestionMarkIcon from '../ThinQuestionMarkIcon.svg'

describe('ThinQuestionMarkIcon', () => {
    it('renders a svg icon', () => {
        const thinQuestionMarkIcon = shallow(<ThinQuestionMarkIcon />)
        expect(thinQuestionMarkIcon).toMatchSnapshot()
    })
})
