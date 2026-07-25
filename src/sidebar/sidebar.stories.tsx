import * as React from 'react'

import { Box, Button, Heading, IconButton, Stack, Text } from '../index'

import { Sidebar, SidebarContent, SidebarPersistentContent } from './sidebar'

import type { Meta, StoryObj } from '@storybook/react-vite'

const NAV_ITEMS = ['Inbox', 'Today', 'Upcoming', 'Filters & Labels', 'Projects', 'Team']

function DemoNav({
    title = 'Workspace',
    navItems = NAV_ITEMS,
    as = 'nav',
    'aria-label': ariaLabel,
    children,
}: {
    title?: string
    navItems?: string[]
    as?: React.ComponentProps<typeof Box>['as']
    'aria-label'?: string
    children?: React.ReactNode
}) {
    return (
        <Box as={as} aria-label={ariaLabel} background="aside" height="full">
            <Box paddingLeft="large" paddingTop="large">
                <Heading level={2}>{title}</Heading>
            </Box>
            <Stack paddingY="medium" paddingX="xsmall">
                {navItems.map((item) => {
                    return (
                        <Button variant="quaternary" key={item} width="full" align="start">
                            {item}
                        </Button>
                    )
                })}
            </Stack>
            {children}
        </Box>
    )
}

const meta = {
    title: '🧭 Navigation & structure/Sidebar',
    component: Sidebar,
    parameters: {
        badges: ['accessible'],
        figma: {
            path: 'Web › Components / Todoist › Sidebar › Main Navigation / Sidebar',
            url: 'https://www.figma.com/design/LYlWNzvhMDh907l07mPPQk/Product-Library---Web?node-id=1194-17741',
        },
        docs: { source: { type: 'dynamic' } },
    },
    decorators: [
        (Story: () => React.JSX.Element) => (
            <Box
                position="relative"
                overflow="hidden"
                border="secondary"
                borderRadius="standard"
                background="default"
                style={{
                    // Set as containing block for the overlay
                    transform: 'translateZ(0)',
                    height: 420,
                }}
            >
                <Story />
            </Box>
        ),
    ],
} satisfies Meta<typeof Sidebar>

export default meta

type Story = StoryObj<typeof meta>

function SidebarToggleIcon() {
    return (
        <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
            <rect
                x="1.75"
                y="2.75"
                width="12.5"
                height="10.5"
                rx="1.5"
                stroke="currentColor"
                strokeWidth="1.5"
            />
            <line x1="6" x2="6" y1="3" y2="13" stroke="currentColor" strokeWidth="1.5" />
        </svg>
    )
}

SidebarToggleIcon.displayName = 'SidebarToggleIcon'

/** Docked nav with its collapse toggle in `<SidebarPersistentContent>`, kept reachable while collapsed. */
export const CollapsibleNav = {
    render: function CollapsibleNav() {
        const [isOpen, setIsOpen] = React.useState(true)

        return (
            <Box display="flex" height="full">
                <Sidebar id="collapsible-nav" align="start" isOpen={isOpen} width={260}>
                    <SidebarContent>
                        <SidebarPersistentContent>
                            <div
                                style={{
                                    position: 'absolute',
                                    top: 8,
                                    right: 8,
                                    zIndex: 2,
                                    // Switch the toggle between its in-panel position and outside of it when collapsed.
                                    // Transition at the same velocity as the panel so it appears as part of the same animation
                                    transition:
                                        'margin-right var(--reactist-sidebar-transition-duration) var(--reactist-sidebar-transition-easing)',
                                    marginRight: isOpen ? 0 : -45,
                                }}
                            >
                                <IconButton
                                    variant="quaternary"
                                    icon={<SidebarToggleIcon />}
                                    aria-label={isOpen ? 'Collapse sidebar' : 'Open sidebar'}
                                    aria-controls="collapsible-nav"
                                    aria-expanded={isOpen}
                                    onClick={() => setIsOpen((open) => !open)}
                                />
                            </div>
                        </SidebarPersistentContent>
                        <DemoNav aria-label="Main navigation" />
                    </SidebarContent>
                </Sidebar>
                <Box
                    as="main"
                    flexGrow={1}
                    minWidth={0}
                    paddingY="medium"
                    paddingX="xxlarge"
                    overflow="auto"
                >
                    <Stack space="medium" paddingLeft="small">
                        <Heading level="2" size="larger">
                            Main content
                        </Heading>
                        <Text tone="secondary">
                            Collapse the nav with the toggle in its header. While collapsed the
                            panel slides away and the toggle peeks at the edge, staying reachable to
                            reopen.
                        </Text>
                    </Stack>
                </Box>
            </Box>
        )
    },
} satisfies Story
