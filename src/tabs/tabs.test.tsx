import * as React from 'react'
import { screen, render, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { axe } from 'jest-axe'

import { Tabs, Tab, TabList, TabPanel, TabAwareSlot } from './'

describe('Tabs', () => {
    it("allows each TabPanel's visibility to be controlled by its corresponding tab", async () => {
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

        expect(await screen.findByRole('tabpanel', { name: 'Tab 1' })).toBeVisible()
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

    it("renders a tab's content only when they're active when each TabPanel's `render` prop is set to 'active'", async () => {
        render(
            <Tabs>
                <TabList aria-label="test-tabs">
                    <Tab id="tab1">Tab 1</Tab>
                    <Tab id="tab2">Tab 2</Tab>
                    <Tab id="tab3">Tab 3</Tab>
                </TabList>
                <TabPanel id="tab1" renderMode="active">
                    Content of tab 1
                </TabPanel>
                <TabPanel id="tab2" renderMode="active">
                    Content of tab 2
                </TabPanel>
                <TabPanel id="tab3" renderMode="active">
                    Content of tab 3
                </TabPanel>
            </Tabs>,
        )

        expect(await screen.findByRole('tabpanel', { name: 'Tab 1' })).toBeVisible()
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

    it("doesn't render inactive tabs until they have become active once when each TabPanel's `render` prop is set to 'lazy'", async () => {
        render(
            <Tabs>
                <TabList aria-label="test-tabs">
                    <Tab id="tab1">Tab 1</Tab>
                    <Tab id="tab2">Tab 2</Tab>
                    <Tab id="tab3">Tab 3</Tab>
                </TabList>
                <TabPanel id="tab1" renderMode="lazy">
                    Content of tab 1
                </TabPanel>
                <TabPanel id="tab2" renderMode="lazy">
                    Content of tab 2
                </TabPanel>
                <TabPanel id="tab3" renderMode="lazy">
                    Content of tab 3
                </TabPanel>
            </Tabs>,
        )

        expect(await screen.findByRole('tabpanel', { name: 'Tab 1' })).toBeVisible()
        expect(screen.getByText('Content of tab 1')).toBeVisible()
        expect(screen.queryByText('Content of tab 2')).not.toBeInTheDocument()
        expect(screen.queryByText('Content of tab 3')).not.toBeInTheDocument()

        userEvent.click(screen.getByRole('tab', { name: 'Tab 2' }))
        expect(screen.getByText('Content of tab 1')).not.toBeVisible()
        expect(screen.getByRole('tabpanel', { name: 'Tab 2' })).toBeVisible()
        expect(screen.getByText('Content of tab 2')).toBeVisible()
        expect(screen.queryByText('Content of tab 3')).not.toBeInTheDocument()

        userEvent.click(screen.getByRole('tab', { name: 'Tab 3' }))
        expect(screen.getByText('Content of tab 1')).not.toBeVisible()
        expect(screen.getByText('Content of tab 2')).not.toBeVisible()
        expect(screen.getByRole('tabpanel', { name: 'Tab 3' })).toBeVisible()
        expect(screen.getByText('Content of tab 3')).toBeVisible()
    })

    it('becomes a controlled component when selectedId is provided', () => {
        const { rerender } = render(
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

        userEvent.click(screen.getByRole('tab', { name: 'Tab 2' }))

        expect(screen.getByText('Content of tab 2')).toBeVisible()
        expect(screen.getByText('Content of tab 1')).not.toBeVisible()
        expect(screen.getByText('Content of tab 3')).not.toBeVisible()

        const onSelectedIdChange = jest.fn()
        rerender(
            <Tabs selectedId="tab3" onSelectedIdChange={onSelectedIdChange}>
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

        expect(onSelectedIdChange).not.toHaveBeenCalled()
        expect(screen.getByText('Content of tab 1')).not.toBeVisible()
        expect(screen.getByText('Content of tab 2')).not.toBeVisible()
        expect(screen.getByText('Content of tab 3')).toBeVisible()

        userEvent.click(screen.getByRole('tab', { name: 'Tab 2' }))

        expect(onSelectedIdChange).toHaveBeenCalledTimes(1)
        expect(onSelectedIdChange).toHaveBeenCalledWith('tab2')
        // The active tab is not set automatically
        expect(screen.getByText('Content of tab 1')).not.toBeVisible()
        expect(screen.getByText('Content of tab 2')).not.toBeVisible()
        expect(screen.getByText('Content of tab 3')).toBeVisible()

        onSelectedIdChange.mockReset()

        rerender(
            <Tabs selectedId="tab2" onSelectedIdChange={onSelectedIdChange}>
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

        expect(onSelectedIdChange).not.toHaveBeenCalled()
        expect(screen.getByText('Content of tab 1')).not.toBeVisible()
        expect(screen.getByText('Content of tab 2')).toBeVisible()
        expect(screen.getByText('Content of tab 3')).not.toBeVisible()
    })

    it("calls TabAwareSlot's render prop with the current selectedId", async () => {
        render(
            <Tabs>
                <TabList aria-label="test-tabs">
                    <Tab id="tab1">Tab 1</Tab>
                    <Tab id="tab2">Tab 2</Tab>
                    <Tab id="tab3">Tab 3</Tab>
                </TabList>
                <TabAwareSlot>
                    {({ selectedId }) => <p>Currently rendering {selectedId}</p>}
                </TabAwareSlot>
                <TabPanel id="tab1">Content of tab 1</TabPanel>
                <TabPanel id="tab2">Content of tab 2</TabPanel>
                <TabPanel id="tab3">Content of tab 3</TabPanel>
            </Tabs>,
        )

        expect(await screen.findByRole('tabpanel', { name: 'Tab 1' })).toBeVisible()
        expect(screen.getByText('Currently rendering tab1')).toBeVisible()

        userEvent.click(screen.getByRole('tab', { name: 'Tab 2' }))
        expect(screen.getByText('Currently rendering tab2')).toBeVisible()

        userEvent.click(screen.getByRole('tab', { name: 'Tab 3' }))
        expect(screen.getByText('Currently rendering tab3')).toBeVisible()
    })

    it('allows different elements to be rendered in place of the TabPanel', async () => {
        const CustomTabPanel = React.forwardRef<
            HTMLDivElement,
            React.AllHTMLAttributes<HTMLDivElement>
        >(function CustomTabPanel({ children, ...props }, ref) {
            return (
                <div data-testid="custom-tab-panel" {...props} ref={ref}>
                    {children}
                </div>
            )
        })

        render(
            <Tabs>
                <TabList aria-label="Multiple tablist example tabs">
                    <Tab id="tab1">Tab 1</Tab>
                    <Tab id="tab2">Tab 2</Tab>
                </TabList>
                <TabPanel id="tab1" render={<CustomTabPanel />}>
                    Content of tab 1
                </TabPanel>
                <TabPanel id="tab2" render={<section />}>
                    Content of tab 2
                </TabPanel>
            </Tabs>,
        )

        const customTabPanel = await screen.findByTestId('custom-tab-panel')
        await waitFor(() => {
            expect(customTabPanel).toBeVisible()
        })
        expect(screen.getByText('Content of tab 1')).toBe(customTabPanel)

        userEvent.click(screen.getByRole('tab', { name: 'Tab 2' }))
        expect(screen.getByRole('tabpanel', { name: 'Tab 2' })).toBeVisible()
        expect(screen.getByRole('tabpanel', { name: 'Tab 2' })).toBe(
            document.querySelector('section'),
        )
        expect(screen.getByText('Content of tab 2')).toBeVisible()
    })

    describe('a11y', () => {
        it('renders with no a11y violations', async () => {
            const { container } = render(
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
            await screen.findByRole('tabpanel', { name: 'Tab 1' })
            expect(await axe(container)).toHaveNoViolations()
        })
    })
})
