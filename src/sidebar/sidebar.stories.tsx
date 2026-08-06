import * as React from 'react'

import { Box, Button, Divider, Heading, IconButton, Stack, Text } from '../index'

import { Sidebar, SidebarContent, SidebarPersistentContent, SidebarResizeHandle } from './sidebar'

import type { Meta, StoryObj } from '@storybook/react-vite'
import type { SidebarAlign, SidebarOverlayMode } from './sidebar'

const NAV_ITEMS = ['Inbox', 'Today', 'Upcoming', 'Filters & Labels', 'Projects', 'Team']

const DETAIL_ITEMS = ['Description', 'Sub-tasks', 'Comments', 'Activity', 'Attachments']

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

function DemoRail({
    'aria-label': ariaLabel,
    children,
}: {
    'aria-label'?: string
    children?: React.ReactNode
}) {
    return (
        <Box as="nav" aria-label={ariaLabel} background="aside" height="full">
            <Stack space="small" padding="small" align="center">
                {['T', 'C', 'A'].map((label) => (
                    <Box
                        key={label}
                        display="flex"
                        alignItems="center"
                        justifyContent="center"
                        style={{
                            width: 36,
                            height: 36,
                            borderRadius: 8,
                            background: 'var(--reactist-divider-secondary)',
                        }}
                    >
                        <Text weight="semibold" size="caption">
                            {label}
                        </Text>
                    </Box>
                ))}
            </Stack>
            {children}
        </Box>
    )
}

const CARD_INSET_OVERRIDES = {
    '--reactist-sidebar-overlay-inset-block': '12px',
    '--reactist-sidebar-overlay-inset-inline': '12px',
} as React.CSSProperties

function useShellWidth<T extends HTMLElement>() {
    const shellRef = React.useRef<T>(null)
    const [width, setWidth] = React.useState(Infinity)

    React.useEffect(function observeShellWidth() {
        const node = shellRef.current
        if (!node) return

        const observer = new ResizeObserver((entries) => {
            const entry = entries[0]
            if (entry) setWidth(entry.contentRect.width)
        })
        observer.observe(node)
        return () => observer.disconnect()
    }, [])

    return [shellRef, width] as const
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

/** Docked nav with a `<SidebarResizeHandle>`: pointer drag plus keyboard resize, width committed via `onWidthChange`. */
export const Resizable = {
    render: function Resizable() {
        const [width, setWidth] = React.useState(280)

        return (
            <Box display="flex" height="full">
                <Sidebar
                    id="resizable-nav"
                    align="start"
                    isOpen
                    width={width}
                    onWidthChange={setWidth}
                    minWidth={210}
                    maxWidth={400}
                    defaultWidth={280}
                    resizeStep={24}
                >
                    <SidebarContent>
                        <DemoNav aria-label="Main navigation">
                            <SidebarResizeHandle
                                aria-label="Resize sidebar"
                                data-testid="sidebar-resize-handle"
                            />
                        </DemoNav>
                    </SidebarContent>
                </Sidebar>
                <Box as="main" flexGrow={1} minWidth={0} padding="large" overflow="auto">
                    <Text>
                        Drag the handle on the sidebar's right edge, or focus it and use the arrow
                        keys, Home / End, or double-click to reset. Current width:{' '}
                        <Text as="span" weight="semibold">
                            {width}px
                        </Text>
                        .
                    </Text>
                </Box>
            </Box>
        )
    },
} satisfies Story

/** Modal overlay drawer: floats, traps focus, dims, and dismisses on the backdrop or Escape. */
export const ModalDrawer = {
    render: function ModalDrawer() {
        const [isOpen, setIsOpen] = React.useState(false)

        return (
            <Box display="flex" height="full">
                <Sidebar
                    id="modal-nav"
                    align="start"
                    isOverlay
                    overlayMode="modal"
                    isOpen={isOpen}
                    dismissOverlayOnEscape
                    onDismiss={() => setIsOpen(false)}
                    width={260}
                >
                    {/* The panel forwards keydowns to this handler after its own Escape
                        dismiss; a consumer that wants Escape kept from app-level handlers
                        (e.g. a global hotkey) stops propagation here. */}
                    <SidebarContent
                        aria-label="Primary navigation"
                        onKeyDown={(event) => {
                            if (event.key === 'Escape') event.stopPropagation()
                        }}
                    >
                        <DemoNav aria-label="Primary navigation" />
                    </SidebarContent>
                </Sidebar>
                <Box as="main" flexGrow={1} minWidth={0} padding="large" overflow="auto">
                    <Stack space="medium">
                        <Button
                            variant="primary"
                            aria-expanded={isOpen}
                            aria-controls="modal-nav"
                            onClick={() => setIsOpen(true)}
                        >
                            Open menu
                        </Button>
                        <Text tone="secondary">
                            Open the drawer, then dismiss it with the backdrop or the Escape key.
                            Focus is trapped inside the drawer while it is open.
                        </Text>
                    </Stack>
                </Box>
            </Box>
        )
    },
} satisfies Story

/** End-aligned non-modal dialog pane, modelled on a contextual chat, with a rounded inset card skin. */
export const DialogSidePane = {
    render: function DialogSidePane() {
        const [isOpen, setIsOpen] = React.useState(true)
        const [width, setWidth] = React.useState(340)

        return (
            <Box display="flex" height="full">
                <Box as="main" flexGrow={1} minWidth={0} padding="large" overflow="auto">
                    <Stack space="medium">
                        <Button
                            variant="secondary"
                            aria-expanded={isOpen}
                            aria-controls="chat-pane"
                            onClick={() => setIsOpen((open) => !open)}
                        >
                            {isOpen ? 'Hide assistant' : 'Show assistant'}
                        </Button>
                        <Text tone="secondary">
                            The pane floats over this content but leaves it interactive: you can
                            keep clicking here while it is open.
                        </Text>
                    </Stack>
                </Box>
                <Sidebar
                    id="chat-pane"
                    align="end"
                    isOverlay
                    overlayMode="dialog"
                    isOpen={isOpen}
                    dismissOverlayOnEscape
                    onDismiss={() => setIsOpen(false)}
                    width={width}
                    onWidthChange={setWidth}
                    minWidth={280}
                    maxWidth={460}
                    defaultWidth={340}
                    resizeStep={24}
                >
                    <SidebarContent
                        aria-labelledby="chat-pane-heading"
                        style={CARD_INSET_OVERRIDES}
                    >
                        <Box
                            display="flex"
                            flexDirection="column"
                            position="relative"
                            height="full"
                            background="default"
                            borderRadius="full"
                            border="secondary"
                            overflow="hidden"
                        >
                            <Box
                                display="flex"
                                justifyContent="spaceBetween"
                                alignItems="center"
                                padding="medium"
                            >
                                <Heading level="2" size="smaller" id="chat-pane-heading">
                                    Assistant
                                </Heading>
                                <Button
                                    variant="tertiary"
                                    size="small"
                                    onClick={() => setIsOpen(false)}
                                >
                                    Close
                                </Button>
                            </Box>
                            <Divider weight="secondary" />
                            <Box padding="medium" overflow="auto" flexGrow={1}>
                                <Text tone="secondary">
                                    Conversation history lives here. Drag the handle on the left
                                    edge to resize the pane.
                                </Text>
                            </Box>
                            {/* Inside the rounded skin: the border-radius crops the handle, the
                                way the Automations chat does it. Placing it as a sibling of the
                                skin instead keeps it on the panel edge, uncropped. */}
                            <SidebarResizeHandle aria-label="Resize assistant" />
                        </Box>
                    </SidebarContent>
                </Sidebar>
            </Box>
        )
    },
} satisfies Story

/**
 * Three sidebars in one shell: a workspace rail and a main nav on the left, a
 * details pane on the right, each with its own breakpoint. As the canvas narrows
 * the details pane overlays first (it needs the most room), the nav next, and the
 * rail stays docked.
 */
export const ResponsiveShell = {
    render: function ResponsiveShell() {
        const [shellRef, shellWidth] = useShellWidth<HTMLDivElement>()
        const navIsOverlay = shellWidth < 640
        const paneIsOverlay = shellWidth < 900

        const [navOpen, setNavOpen] = React.useState(false)
        const [paneOpen, setPaneOpen] = React.useState(false)
        const [railWidth, setRailWidth] = React.useState(64)
        const [navWidth, setNavWidth] = React.useState(240)
        const [paneWidth, setPaneWidth] = React.useState(300)

        // Docked panels stay in view; overlays start closed and obey their trigger.
        const isNavOpen = navIsOverlay ? navOpen : true
        const isPaneOpen = paneIsOverlay ? paneOpen : true

        return (
            <Box display="flex" height="full" ref={shellRef}>
                <Sidebar
                    id="rs-rail"
                    align="start"
                    isOpen
                    width={railWidth}
                    onWidthChange={setRailWidth}
                    minWidth={56}
                    maxWidth={120}
                    defaultWidth={64}
                    resizeStep={8}
                >
                    <SidebarContent aria-label="Workspaces">
                        <DemoRail aria-label="Workspaces">
                            <SidebarResizeHandle aria-label="Resize workspace rail" />
                        </DemoRail>
                    </SidebarContent>
                </Sidebar>
                <Sidebar
                    id="rs-nav"
                    align="start"
                    isOverlay={navIsOverlay}
                    overlayMode="modal"
                    isOpen={isNavOpen}
                    dismissOverlayOnEscape
                    onDismiss={() => setNavOpen(false)}
                    width={navWidth}
                    onWidthChange={setNavWidth}
                    minWidth={200}
                    maxWidth={320}
                    defaultWidth={240}
                    resizeStep={20}
                >
                    <SidebarContent aria-label="Main navigation">
                        <DemoNav aria-label="Main navigation">
                            <SidebarResizeHandle aria-label="Resize navigation" />
                        </DemoNav>
                    </SidebarContent>
                </Sidebar>
                <Box as="main" flexGrow={1} minWidth={0} padding="large" overflow="auto">
                    <Stack space="medium">
                        <Box display="flex" gap="small">
                            {navIsOverlay ? (
                                <Button
                                    variant="secondary"
                                    aria-expanded={navOpen}
                                    aria-controls="rs-nav"
                                    onClick={() => setNavOpen(true)}
                                >
                                    Open nav
                                </Button>
                            ) : null}
                            {paneIsOverlay ? (
                                <Button
                                    variant="secondary"
                                    aria-expanded={paneOpen}
                                    aria-controls="rs-pane"
                                    onClick={() => setPaneOpen((open) => !open)}
                                >
                                    {paneOpen ? 'Hide details' : 'Show details'}
                                </Button>
                            ) : null}
                        </Box>
                        <Heading level="2" size="larger">
                            Main content
                        </Heading>
                        <Text tone="secondary">
                            Three sidebars in one shell. Resize the canvas: the details pane becomes
                            an overlay below 900px and the nav below 640px, each with its own
                            trigger, while the workspace rail stays docked.
                        </Text>
                    </Stack>
                </Box>
                <Sidebar
                    id="rs-pane"
                    align="end"
                    isOverlay={paneIsOverlay}
                    overlayMode="dialog"
                    isOpen={isPaneOpen}
                    dismissOverlayOnEscape
                    onDismiss={() => setPaneOpen(false)}
                    width={paneWidth}
                    onWidthChange={setPaneWidth}
                    minWidth={260}
                    maxWidth={420}
                    defaultWidth={300}
                    resizeStep={20}
                >
                    {/* Keep the details pane below the modal nav and its backdrop. */}
                    <SidebarContent
                        aria-label="Details"
                        style={{ '--reactist-sidebar-overlay-z-index': 30 } as React.CSSProperties}
                    >
                        <DemoNav
                            title="Details"
                            as="aside"
                            aria-label="Details"
                            navItems={DETAIL_ITEMS}
                        >
                            <SidebarResizeHandle aria-label="Resize details pane" />
                        </DemoNav>
                    </SidebarContent>
                </Sidebar>
            </Box>
        )
    },
} satisfies Story

type PlaygroundArgs = {
    align: SidebarAlign
    isOverlay: boolean
    overlayMode: SidebarOverlayMode
    isOpen: boolean
    width: number
    resizable: boolean
    dismissOverlayOnEscape: boolean
    unmountOnHide: boolean
}

export const Playground = {
    args: {
        align: 'start',
        isOverlay: false,
        overlayMode: 'plain',
        isOpen: true,
        width: 280,
        resizable: true,
        dismissOverlayOnEscape: true,
        unmountOnHide: false,
    },
    argTypes: {
        align: { control: { type: 'inline-radio' }, options: ['start', 'end'] },
        overlayMode: { control: { type: 'inline-radio' }, options: ['plain', 'dialog', 'modal'] },
        isOverlay: { control: { type: 'boolean' } },
        isOpen: { control: { type: 'boolean' } },
        width: { control: { type: 'range', min: 210, max: 400, step: 10 } },
        resizable: { control: { type: 'boolean' } },
        dismissOverlayOnEscape: { control: { type: 'boolean' } },
        unmountOnHide: { control: { type: 'boolean' } },
    },
    render: function Playground({
        align,
        isOverlay,
        overlayMode,
        isOpen: isOpenArg,
        width: widthArg,
        resizable,
        dismissOverlayOnEscape,
        unmountOnHide,
    }: PlaygroundArgs) {
        const [isOpen, setIsOpen] = React.useState(isOpenArg)
        const [width, setWidth] = React.useState(widthArg)
        const [args, setArgs] = React.useState({ isOpenArg, widthArg })

        // Sync the local interactive state to the controls during render (not in an
        // effect) when the args change.
        if (args.isOpenArg !== isOpenArg || args.widthArg !== widthArg) {
            setArgs({ isOpenArg, widthArg })
            setIsOpen(isOpenArg)
            setWidth(widthArg)
        }

        const sidebar = (
            <Sidebar
                id="playground-sidebar"
                align={align}
                isOverlay={isOverlay}
                overlayMode={overlayMode}
                isOpen={isOpen}
                dismissOverlayOnEscape={dismissOverlayOnEscape}
                unmountOnHide={unmountOnHide}
                onDismiss={() => setIsOpen(false)}
                width={width}
                onWidthChange={setWidth}
                minWidth={210}
                maxWidth={400}
                defaultWidth={280}
                resizeStep={24}
            >
                <SidebarContent aria-label="Playground sidebar">
                    <DemoNav aria-label="Playground sidebar">
                        {resizable ? <SidebarResizeHandle aria-label="Resize sidebar" /> : null}
                    </DemoNav>
                </SidebarContent>
            </Sidebar>
        )

        const main = (
            <Box as="main" flexGrow={1} minWidth={0} padding="large" overflow="auto">
                <Stack space="medium">
                    <Button
                        variant="primary"
                        aria-expanded={isOpen}
                        aria-controls="playground-sidebar"
                        onClick={() => setIsOpen((open) => !open)}
                    >
                        {isOpen ? 'Close sidebar' : 'Open sidebar'}
                    </Button>
                    <Text tone="secondary">
                        Use the controls to switch alignment, overlay mode, and resizability.
                    </Text>
                </Stack>
            </Box>
        )

        return (
            <Box display="flex" height="full">
                {align === 'start' ? (
                    <>
                        {sidebar}
                        {main}
                    </>
                ) : (
                    <>
                        {main}
                        {sidebar}
                    </>
                )}
            </Box>
        )
    },
} satisfies StoryObj<PlaygroundArgs>
