import React from 'react'
import { shallow } from 'enzyme'

import { Tabs, Tab } from '../Tabs'

describe('Tabs', () => {
    it('renders without children', () => {
        const tabs = shallow(<Tabs />)
        expect(tabs).toMatchSnapshot()
    })

    it('renders with single children', () => {
        const tabs = shallow(
            <Tabs>
                <Tab title="Tab 1">Content</Tab>
            </Tabs>
        )
        expect(tabs).toMatchSnapshot()
    })

    it('renders Tab without children', () => {
        const tab = shallow(<Tab title="Tab" />)
        expect(tab).toMatchSnapshot()
    })

    it('activates the defaultTab on initial render', () => {
        const tabs = shallow(
            <Tabs defaultTab={3}>
                <Tab value={1} title="Tab 1">
                    Content
                </Tab>
                <Tab value={2} title="Tab 2">
                    Content
                </Tab>
                <Tab value={3} title="Tab 3">
                    Content
                </Tab>
            </Tabs>
        )

        const tab3 = tabs.find('.reactist_tabs__header--item').at(2)
        expect(tab3.hasClass('active')).toBe(true)
    })

    it('activates a tab upon clicking on it', () => {
        const tabs = shallow(
            <Tabs>
                <Tab title="Tab 1">
                    <div id="tab1" />
                </Tab>
                <Tab title="Tab 2">
                    <div id="tab2" />
                </Tab>
            </Tabs>
        )

        expect(tabs.find('#tab1')).toHaveLength(1)
        expect(tabs.find('#tab2')).toHaveLength(0)

        const tab2 = tabs.find('.reactist_tabs__header--item').at(1)
        tab2.simulate('click', { preventDefault: jest.fn() })

        expect(tabs.find('#tab1')).toHaveLength(0)
        expect(tabs.find('#tab2')).toHaveLength(1)
    })

    it('invoke onChange() with tab value when a tab is activated', () => {
        const f = jest.fn()

        const tabs = shallow(
            <Tabs onChange={f}>
                <Tab title="Tab 1" value="1" />
                <Tab title="Tab 2" value="2" />
            </Tabs>
        )

        expect(f).not.toHaveBeenCalled()

        const tab2 = tabs.find('.reactist_tabs__header--item').at(1)
        tab2.simulate('click', { preventDefault: jest.fn() })

        expect(f).toHaveBeenCalledWith('2')
        expect(f).toHaveBeenCalledTimes(1)
    })

    it('does not activate a disabled tab upon clicking on it', () => {
        const tabs = shallow(
            <Tabs>
                <Tab title="Tab 1">
                    <div id="tab1" />
                </Tab>
                <Tab title="Tab 2" disabled>
                    <div id="tab2" />
                </Tab>
            </Tabs>
        )

        expect(tabs.find('#tab1')).toHaveLength(1)
        expect(tabs.find('#tab2')).toHaveLength(0)

        const tab2 = tabs.find('.reactist_tabs__header--item').at(1)
        tab2.simulate('click', { preventDefault: jest.fn() })

        expect(tabs.find('#tab1')).toHaveLength(1)
        expect(tabs.find('#tab2')).toHaveLength(0)
    })

    it('raise error if no tab with the match defaultTab value is found', () => {
        expect(() => {
            shallow(
                <Tabs defaultTab={3}>
                    <Tab value={1} title="Tab 1">
                        Content
                    </Tab>
                    <Tab value={2} title="Tab 2">
                        Content
                    </Tab>
                    <Tab value={4} title="Tab 4">
                        Content
                    </Tab>
                </Tabs>
            )
        }).toThrow()
    })

    it('accepts 0 (zero) as valid value for Tab and defaultTab', () => {
        expect(() => {
            shallow(
                <Tabs defaultTab={0}>
                    <Tab value={0} title="Tab 0">
                        Content
                    </Tab>
                    <Tab value={1} title="Tab 1">
                        Content
                    </Tab>
                </Tabs>
            )
        }).not.toThrow()
    })
})
