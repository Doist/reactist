import React from 'react'
import { shallow } from 'enzyme'

import Tip from '../Tip'

describe('Tip', () => {
    it('renders without crashing', () => {
        const tip = shallow(getTip())
        expect(tip).toMatchSnapshot()
    })

    // Helpers ================================================================
    const getTip = props => (
        <Tip title="Title of the Tip" message="Message of the Tip" {...props} />
    )
})
