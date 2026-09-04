import * as React from 'react'

import { Box } from '../box'

import { SegmentedControlTabs } from './segmented-control-tabs'

import type { Meta, StoryObj } from '@storybook/react'

const meta = {
    title: '📑 Menus & tabs/Segmented Control/Tabs',
    component: SegmentedControlTabs,
    parameters: {
        badges: ['accessible'],
        figma: {
            url: 'https://www.figma.com/design/AH9ioCnZZLfiA5XcHFabOr/-Refresh--Product-%E2%80%93-Web?node-id=5-1187',
            path: 'Refresh - Product Web',
        },
    },
} satisfies Meta<typeof SegmentedControlTabs>

export default meta

type Story = StoryObj<typeof meta>

function ControlledExample({ width }: { width?: 'maxContent' | 'full' }) {
    const [selectedOptionId, setSelectedOptionId] = React.useState('all')

    return (
        <SegmentedControlTabs
            aria-label="Notifications"
            width={width}
            contentOffset="medium"
            selectedOptionId={selectedOptionId}
            onSelectedOptionChange={setSelectedOptionId}
            options={[
                { id: 'all', label: 'All', tabContent: 'All notifications content' },
                { id: 'unread', label: 'Unread', tabContent: 'Unread notifications content' },
            ]}
        />
    )
}

function UpgradeIcon() {
    return (
        <svg aria-hidden="true" width="14" height="14" viewBox="0 0 14 14" fill="none">
            <path
                d="m7 1 1.7 3.6L13 5.1 9.8 8l.8 4.2L7 10.1l-3.6 2.1L4.2 8 1 5.1l4.3-.5z"
                fill="currentColor"
            />
        </svg>
    )
}

export const Default: Story = {
    render: () => <ControlledExample />,
}

export const FullWidth: Story = {
    render: () => (
        <Box width="small">
            <ControlledExample width="full" />
        </Box>
    ),
}

export const FullWidthWithWrappingLabels: Story = {
    render: () => (
        <Box width="small">
            <SegmentedControlTabs
                aria-label="Developer options"
                width="full"
                initialSelectedOptionId="testdata"
                options={[
                    { id: 'testdata', label: 'Test Data', tabContent: 'Test data content' },
                    { id: 'tooltips', label: 'Tooltips', tabContent: 'Tooltips content' },
                    { id: 'syncengine', label: 'Sync Engine', tabContent: 'Sync engine content' },
                    { id: 'appversion', label: 'App Version', tabContent: 'App version content' },
                    { id: 'frozen', label: 'Frozen Data', tabContent: 'Frozen data content' },
                    { id: 'persistence', label: 'Persistence', tabContent: 'Persistence content' },
                    {
                        id: 'featureflags',
                        label: 'Feature Flags',
                        tabContent: 'Feature flags content',
                    },
                ]}
            />
        </Box>
    ),
}

export const DisabledOption: Story = {
    render: () => (
        <SegmentedControlTabs
            aria-label="Notifications"
            initialSelectedOptionId="all"
            options={[
                { id: 'all', label: 'All', tabContent: 'All notifications content' },
                {
                    id: 'unread',
                    label: 'Unread',
                    tabContent: 'Unread notifications content',
                    disabled: true,
                },
            ]}
        />
    ),
}

export const WithExtraContent: Story = {
    render: () => (
        <SegmentedControlTabs
            aria-label="Reminder type"
            initialSelectedOptionId="date"
            options={[
                {
                    id: 'date',
                    label: 'Date & time',
                    extraIcon: <UpgradeIcon />,
                    tabContent: 'Date and time settings',
                },
                {
                    id: 'location',
                    label: 'Location',
                    extraLabel: '2',
                    tabContent: 'Location settings',
                },
            ]}
        />
    ),
}

export const WithLabelsAsLinks: Story = {
    render: () => (
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
                    tabRender: <a href="#browse" />,
                },
            ]}
        />
    ),
}
