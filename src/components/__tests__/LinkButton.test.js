import React from 'react'
import { shallow } from 'enzyme'

import LinkButton from '../LinkButton'

describe('LinkButton', () => {
    it('renders without crashing', () => {
        const linkButton = shallow(<LinkButton name="link" />)
        expect(linkButton).toMatchSnapshot()
    })

    it('appends additionally supplied classnames', () => {
        const linkButton = shallow(
            <LinkButton name="link" className="extra-brand-style" />
        )
        expect(linkButton).toMatchSnapshot()
    })

    it('calls onClick handler when supplied and prevents default behaviour of link', () => {
        const clickSpy = jest.fn()
        const defaultPreventionSpy = jest.fn()
        const linkButton = shallow(
            <LinkButton name="link" onClick={clickSpy} />
        )

        linkButton.simulate('click', { preventDefault: defaultPreventionSpy })
        expect(clickSpy).toHaveBeenCalled()
        expect(defaultPreventionSpy).toHaveBeenCalled()
    })

    it('does not call onClick handler when disabled but prevents default behaviour of link', () => {
        const clickSpy = jest.fn()
        const defaultPreventionSpy = jest.fn()
        const linkButton = shallow(
            <LinkButton name="link" disabled onClick={clickSpy} />
        )

        linkButton.simulate('click', { preventDefault: defaultPreventionSpy })
        expect(clickSpy).not.toHaveBeenCalled()
        expect(defaultPreventionSpy).toHaveBeenCalled()
    })
})
