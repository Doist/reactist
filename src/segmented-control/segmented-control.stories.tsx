import * as React from 'react'

import { Badge } from '../badge'
import { Box } from '../box'
import { Inline } from '../inline'
import { Tooltip } from '../tooltip'

import { SegmentedControlRadio } from './segmented-control'

import type { Meta, StoryObj } from '@storybook/react'

const meta = {
    title: '📑 Menus & tabs/Segmented Control/Radio',
    component: SegmentedControlRadio,
    parameters: {
        badges: ['accessible'],
        figma: [
            {
                url: 'https://www.figma.com/design/LYlWNzvhMDh907l07mPPQk/Product-Library---Web?node-id=1286-25423',
                path: 'Web › Components / Todoist › Tabs',
            },
            {
                url: 'https://www.figma.com/design/AH9ioCnZZLfiA5XcHFabOr/-Refresh--Product-%E2%80%93-Web?node-id=5-1187',
                path: 'Refresh - Product Web',
            },
        ],
    },
} satisfies Meta<typeof SegmentedControlRadio>

export default meta

type Story = StoryObj<typeof meta>

const LAYOUT_OPTIONS = [
    { id: 'list', label: 'List' },
    { id: 'board', label: 'Board' },
    { id: 'calendar', label: 'Calendar' },
]

function ControlledExample({ width }: { width?: 'maxContent' | 'full' }) {
    const [selectedOptionId, setSelectedOptionId] = React.useState('list')

    return (
        <SegmentedControlRadio
            aria-label="Project layout"
            width={width}
            selectedOptionId={selectedOptionId}
            onSelectedOptionChange={setSelectedOptionId}
            options={LAYOUT_OPTIONS}
        />
    )
}

function ViewIcon({ shape }: { shape: 'list' | 'board' | 'calendar' }) {
    return (
        <svg aria-hidden="true" width="18" height="18" viewBox="0 0 18 18" fill="none">
            {shape === 'list' ? (
                <path d="M3 5h12M3 9h12M3 13h12" stroke="currentColor" strokeWidth="1.5" />
            ) : shape === 'board' ? (
                <path d="M3 3.5h5v11H3zm7 0h5v7h-5z" stroke="currentColor" strokeWidth="1.5" />
            ) : (
                <path
                    d="M3 5h12v10H3zM6 3v4m6-4v4M3 8h12"
                    stroke="currentColor"
                    strokeWidth="1.5"
                />
            )}
        </svg>
    )
}

function ListTooltip({ children }: { children: React.ReactNode }) {
    return <Tooltip content="Switch to List layout">{children}</Tooltip>
}

function BoardTooltip({ children }: { children: React.ReactNode }) {
    return <Tooltip content="Switch to Board layout">{children}</Tooltip>
}

function CalendarTooltip({ children }: { children: React.ReactNode }) {
    return <Tooltip content="Switch to Calendar layout">{children}</Tooltip>
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

export const DisabledOption: Story = {
    render: () => (
        <SegmentedControlRadio
            aria-label="Project layout"
            initialSelectedOptionId="list"
            options={[
                { id: 'list', label: 'List' },
                { id: 'board', label: 'Board', disabled: true },
                { id: 'calendar', label: 'Calendar' },
            ]}
        />
    ),
}

export const WithIcons: Story = {
    render: () => (
        <SegmentedControlRadio
            aria-label="Project layout"
            initialSelectedOptionId="list"
            options={[
                { id: 'list', label: 'List', icon: <ViewIcon shape="list" /> },
                { id: 'board', label: 'Board', icon: <ViewIcon shape="board" /> },
                { id: 'calendar', label: 'Calendar', icon: <ViewIcon shape="calendar" /> },
            ]}
        />
    ),
}

export const WithBadge: Story = {
    render: () => (
        <SegmentedControlRadio
            aria-label="Workspace overview"
            initialSelectedOptionId="projects"
            options={[
                { id: 'projects', label: 'Projects' },
                { id: 'members', label: 'People' },
                {
                    id: 'goals',
                    label: (
                        <Inline space="xsmall">
                            <span>Goals</span>
                            <Badge label="Beta" tone="promote" />
                        </Inline>
                    ),
                },
            ]}
        />
    ),
}

export const WithTooltips: Story = {
    render: () => (
        <SegmentedControlRadio
            aria-label="Project layout"
            initialSelectedOptionId="list"
            options={[
                {
                    id: 'list',
                    label: 'List',
                    icon: <ViewIcon shape="list" />,
                    Wrapper: ListTooltip,
                },
                {
                    id: 'board',
                    label: 'Board',
                    icon: <ViewIcon shape="board" />,
                    Wrapper: BoardTooltip,
                },
                {
                    id: 'calendar',
                    label: 'Calendar',
                    icon: <ViewIcon shape="calendar" />,
                    Wrapper: CalendarTooltip,
                },
            ]}
        />
    ),
}
