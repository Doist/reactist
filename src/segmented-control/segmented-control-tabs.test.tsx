import * as React from 'react'

import { act, render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { axe } from 'jest-axe'

import { flushMicrotasks, TestIcon } from '../utils/test-helpers'

import { SegmentedControlTabs } from './segmented-control-tabs'

async function flushAnimationFrames() {
    await act(
        () =>
            new Promise<void>((resolve) =>
                requestAnimationFrame(() => requestAnimationFrame(() => resolve())),
            ),
    )
}

async function renderSegmentedControlTabs(element: React.ReactElement) {
    const result = render(element)
    await flushAnimationFrames()
    return result
}

describe('SegmentedControlTabs', () => {
    it('renders option metadata and switches controlled panels', async () => {
        const onSelectedOptionChange = jest.fn()
        const user = userEvent.setup()

        function Example() {
            const [selectedOptionId, setSelectedOptionId] = React.useState('all')

            return (
                <SegmentedControlTabs
                    aria-label="Notifications"
                    selectedOptionId={selectedOptionId}
                    onSelectedOptionChange={(id) => {
                        onSelectedOptionChange(id)
                        setSelectedOptionId(id)
                    }}
                    options={[
                        { id: 'all', label: 'All', tabContent: 'All notifications' },
                        {
                            id: 'unread',
                            label: 'Unread',
                            extraLabel: '2',
                            extraIcon: <TestIcon />,
                            tabContent: 'Unread notifications',
                        },
                    ]}
                />
            )
        }

        await renderSegmentedControlTabs(<Example />)

        expect(await screen.findByRole('tabpanel', { name: 'All' })).toBeVisible()
        expect(screen.getByRole('tab', { name: 'Unread 2' })).toBeVisible()

        await user.click(screen.getByRole('tab', { name: 'Unread 2' }))
        await flushMicrotasks()

        expect(onSelectedOptionChange).toHaveBeenCalledWith('unread')
        expect(screen.getByRole('tabpanel', { name: 'Unread 2' })).toBeVisible()
        expect(screen.getByText('Unread notifications')).toBeVisible()
    })

    it('renders tabs as links and supports content wrappers', async () => {
        function ContentWrapper({ children }: { children: React.ReactNode }) {
            return <span title="Wrapped tab">{children}</span>
        }

        await renderSegmentedControlTabs(
            <SegmentedControlTabs
                aria-label="Integrations"
                initialSelectedOptionId="installed"
                options={[
                    {
                        id: 'installed',
                        label: 'Installed',
                        tabContent: 'Installed integrations',
                        tabRender: <a href="#installed" />,
                    },
                    {
                        id: 'browse',
                        label: 'Browse',
                        tabContent: 'Browse integrations',
                        Wrapper: ContentWrapper,
                    },
                ]}
            />,
        )

        expect(await screen.findByRole('tab', { name: 'Installed' })).toHaveAttribute(
            'href',
            '#installed',
        )
        expect(screen.getByTitle('Wrapped tab')).toBeVisible()
    })

    it('removes disabled tabs from keyboard navigation', async () => {
        const user = userEvent.setup()

        await renderSegmentedControlTabs(
            <SegmentedControlTabs
                aria-label="Notifications"
                initialSelectedOptionId="all"
                options={[
                    { id: 'all', label: 'All', tabContent: 'All notifications' },
                    {
                        id: 'unread',
                        label: 'Unread',
                        tabContent: 'Unread notifications',
                        disabled: true,
                    },
                    { id: 'mentions', label: 'Mentions', tabContent: 'Mentions' },
                ]}
            />,
        )

        await screen.findByRole('tabpanel', { name: 'All' })
        await user.tab()
        expect(screen.getByRole('tab', { name: 'All' })).toHaveFocus()

        await user.keyboard('{ArrowRight}')
        await flushMicrotasks()

        expect(screen.getByRole('tab', { name: 'Mentions' })).toHaveFocus()
        expect(screen.getByRole('tab', { name: 'Unread' })).toBeDisabled()
    })

    it('has no automated accessibility violations', async () => {
        const { container } = await renderSegmentedControlTabs(
            <SegmentedControlTabs
                aria-label="Notifications"
                initialSelectedOptionId="all"
                options={[
                    { id: 'all', label: 'All', tabContent: 'All notifications' },
                    { id: 'unread', label: 'Unread', tabContent: 'Unread notifications' },
                ]}
            />,
        )

        await screen.findByRole('tabpanel', { name: 'All' })
        expect(await axe(container)).toHaveNoViolations()
    })
})
