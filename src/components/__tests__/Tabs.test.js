import React from 'react'
import { shallow } from 'enzyme'

import { Tabs, Tab } from '../Tabs'

describe('Tabs', () => {
    it('renders without children', () => {
        const tabs = shallow(<Tabs />)
        expect(tabs).toMatchSnapshot()
    })

    it('renders with single children', () => {
        const tabs = shallow(<Tabs>
            <Tab title='Tab 1'>Content</Tab>
        </Tabs>)
        expect(tabs).toMatchSnapshot()
    })

    it('renders Tab without children', () => {
        const tab = shallow(<Tab title='Tab' />)
        expect(tab).toMatchSnapshot()
    })

    it('activates the defaultTab on initial render', () => {
        const tabs = shallow(<Tabs defaultTab={ 2 }>
            <Tab title='Tab 1'>Content</Tab>
            <Tab title='Tab 2'>Content</Tab>
            <Tab title='Tab 3'>Content</Tab>
        </Tabs>)

        const tab3 = tabs.find('.tabs__header--item').at(2)
        expect(tab3.hasClass('active')).toBe(true)
    })

    it('activates a tab upon clicking on it', () => {
        const tabs = shallow(<Tabs>
            <Tab title='Tab 1'>Content</Tab>
            <Tab title='Tab 2'>Content</Tab>
        </Tabs>)

        const tab2 = tabs.find('.tabs__header--item').at(1)
        expect(tabs.state().activeTab).toBe(0)

        tab2.simulate('click', { preventDefault: jest.fn() })
        expect(tabs.state().activeTab).toBe(1)
    })

    it('does not activate a disabled tab upon clicking on it', () => {
        const tabs = shallow(<Tabs>
            <Tab title='Tab 1'>Content</Tab>
            <Tab title='Tab 2' disabled>Content</Tab>
        </Tabs>)

        const tab2 = tabs.find('.tabs__header--item').at(1)
        expect(tabs.state().activeTab).toBe(0)

        tab2.simulate('click', { preventDefault: jest.fn() })
        expect(tabs.state().activeTab).toBe(0)
    })
})
