import React from 'react'
import { shallow } from 'enzyme'

import ProgressBar from '../ProgressBar'

describe('ProgressBar', () => {
    it('renders without crashing', () => {
        const progressBar = shallow(<ProgressBar />)
        expect(progressBar).toMatchSnapshot()
    })

    it('uses 0% width for fillPercentages smaller than 0', () => {
        const progressBar = shallow(<ProgressBar fillPercentage={-1} />)
        expect(progressBar.find('.inner').props().style.width).toBe('0%')
    })

    it('uses 100% width for fillPercentages larger than 100', () => {
        const progressBar = shallow(<ProgressBar fillPercentage={1337} />)
        expect(progressBar.find('.inner').props().style.width).toBe('100%')
    })
})
