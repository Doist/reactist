import * as React from 'react'
import { screen, render } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { Tabs, Tab, TabList, TabPanel } from './'

describe('Tabs', () => {
    it("allows each TabPanel's visibility controlled by each tab", () => {
        render(
            <Tabs>
                <TabList aria-label="test-tabs">
                    <Tab id="tab1">Tab 1</Tab>
                    <Tab id="tab2">Tab 2</Tab>
                    <Tab id="tab3">Tab 3</Tab>
                </TabList>
                <TabPanel id="tab1">Content of tab 1</TabPanel>
                <TabPanel id="tab2">Content of tab 2</TabPanel>
                <TabPanel id="tab3">Content of tab 3</TabPanel>
            </Tabs>,
        )

        expect(screen.getByRole('tabpanel', { name: 'Tab 1' })).toBeVisible()
        expect(screen.getByText('Content of tab 1')).toBeVisible()
        expect(screen.queryByText('Content of tab 2')).not.toBeInTheDocument()
        expect(screen.queryByText('Content of tab 3')).not.toBeInTheDocument()

        userEvent.click(screen.getByRole('tab', { name: 'Tab 2' }))
        expect(screen.queryByText('Content of tab 1')).not.toBeInTheDocument()
        expect(screen.getByRole('tabpanel', { name: 'Tab 2' })).toBeVisible()
        expect(screen.getByText('Content of tab 2')).toBeVisible()
        expect(screen.queryByText('Content of tab 3')).not.toBeInTheDocument()

        userEvent.click(screen.getByRole('tab', { name: 'Tab 3' }))
        expect(screen.queryByText('Content of tab 1')).not.toBeInTheDocument()
        expect(screen.queryByText('Content of tab 2')).not.toBeInTheDocument()
        expect(screen.getByRole('tabpanel', { name: 'Tab 3' })).toBeVisible()
        expect(screen.getByText('Content of tab 3')).toBeVisible()
    })

    it("setting each TabPanel's lazyload prop to false renders tabs even when they aren't active", () => {
        render(
            <Tabs>
                <TabList aria-label="test-tabs">
                    <Tab id="tab1">Tab 1</Tab>
                    <Tab id="tab2">Tab 2</Tab>
                    <Tab id="tab3">Tab 3</Tab>
                </TabList>
                <TabPanel id="tab1" lazyload={false}>
                    Content of tab 1
                </TabPanel>
                <TabPanel id="tab2" lazyload={false}>
                    Content of tab 2
                </TabPanel>
                <TabPanel id="tab3" lazyload={false}>
                    Content of tab 3
                </TabPanel>
            </Tabs>,
        )

        expect(screen.getByRole('tabpanel', { name: 'Tab 1' })).toBeVisible()
        expect(screen.getByText('Content of tab 1')).toBeVisible()
        expect(screen.getByText('Content of tab 2')).not.toBeVisible()
        expect(screen.getByText('Content of tab 3')).not.toBeVisible()

        userEvent.click(screen.getByRole('tab', { name: 'Tab 2' }))
        expect(screen.getByText('Content of tab 1')).not.toBeVisible()
        expect(screen.getByRole('tabpanel', { name: 'Tab 2' })).toBeVisible()
        expect(screen.getByText('Content of tab 2')).toBeVisible()
        expect(screen.getByText('Content of tab 3')).not.toBeVisible()

        userEvent.click(screen.getByRole('tab', { name: 'Tab 3' }))
        expect(screen.getByText('Content of tab 1')).not.toBeVisible()
        expect(screen.getByText('Content of tab 2')).not.toBeVisible()
        expect(screen.getByRole('tabpanel', { name: 'Tab 3' })).toBeVisible()
        expect(screen.getByText('Content of tab 3')).toBeVisible()
    })
})
