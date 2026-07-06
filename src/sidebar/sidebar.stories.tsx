import * as React from 'react'

import { Box, Button, Heading, IconButton, Stack, Text } from '../index'

import { Sidebar, SidebarContent, SidebarPersistentContent, SidebarResizeHandle } from './sidebar'

import type { Meta, StoryObj } from '@storybook/react-vite'
import type { SidebarAlign, SidebarOverlayMode } from './sidebar'

const NAV_ITEMS = ['Inbox', 'Today', 'Upcoming', 'Filters & Labels', 'Projects', 'Team']

function DemoNav({ title = 'Workspace' }: { title?: string }) {
    return (
        <Stack space="xsmall" padding="medium">
            <Text weight="semibold" size="caption" tone="secondary">
                {title}
            </Text>
            {NAV_ITEMS.map((item) => (
                <Box
                    key={item}
                    as="a"
                    href={`#${item}`}
                    display="block"
                    padding="xsmall"
                    borderRadius="standard"
                    style={{ color: 'inherit', textDecoration: 'none' }}
                >
                    <Text>{item}</Text>
                </Box>
            ))}
        </Stack>
    )
}

DemoNav.displayName = 'DemoNav'

function DemoRail() {
    return (
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
    )
}

DemoRail.displayName = 'DemoRail'

const RAIL_SKIN = {
    background: 'var(--reactist-divider-tertiary, #edf2f3)',
    borderRight: '1px solid var(--reactist-divider-secondary)',
} satisfies React.CSSProperties

const PANEL_SKIN = {
    background: 'var(--reactist-content-background, #faf9f8)',
    borderRight: '1px solid var(--reactist-divider-secondary)',
} satisfies React.CSSProperties

// The mirror skin for an `align="end"` pane: the border sits on the inner edge.
const PANEL_SKIN_END = {
    background: 'var(--reactist-content-background, #faf9f8)',
    borderLeft: '1px solid var(--reactist-divider-secondary)',
} satisfies React.CSSProperties

// Make the otherwise-transparent resize handle visible in the demos.
const HANDLE_VISIBLE = {
    '--reactist-sidebar-resize-handle-idle-fill': 'var(--reactist-divider-secondary)',
} as React.CSSProperties

const CARD_INSETS = {
    '--reactist-sidebar-overlay-inset-block': '12px',
    '--reactist-sidebar-overlay-inset-inline': '12px',
} as React.CSSProperties

const CARD_SKIN = {
    position: 'relative',
    display: 'flex',
    flexDirection: 'column',
    height: '100%',
    overflow: 'hidden',
    borderRadius: 12,
    background: '#ffffff',
    border: '1px solid var(--reactist-divider-secondary)',
    boxShadow: '0 10px 30px rgba(0, 0, 0, 0.15)',
} satisfies React.CSSProperties

/**
 * Flips `isOverlay` when the shell gets narrower than `breakpoint`. Computing the
 * overlay state from a breakpoint is the consumer's job; this measures the
 * container (rather than the viewport) so it works inside the bounded demo stage.
 */
function useOverlayBelow<T extends HTMLElement>(breakpoint: number) {
    const shellRef = React.useRef<T>(null)
    const [isOverlay, setIsOverlay] = React.useState(false)

    React.useEffect(
        function observeShellWidth() {
            const node = shellRef.current
            if (!node) return

            const observer = new ResizeObserver((entries) => {
                const entry = entries[0]
                if (entry) setIsOverlay(entry.contentRect.width < breakpoint)
            })
            observer.observe(node)
            return () => observer.disconnect()
        },
        [breakpoint],
    )

    return [shellRef, isOverlay] as const
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
        // Serialize the rendered composition into "Show code", not the story wrapper.
        docs: { source: { type: 'dynamic' } },
    },
    decorators: [
        // A bounded, transformed stage (excluded from "Show code") that becomes the
        // containing block for the sidebar's `position: fixed` overlays, so a
        // floating panel and its backdrop scope to this box, not the whole canvas.
        (Story: () => React.JSX.Element) => (
            <div
                style={{
                    position: 'relative',
                    height: 420,
                    overflow: 'hidden',
                    transform: 'translateZ(0)',
                    border: '1px solid var(--reactist-divider-secondary)',
                    borderRadius: 8,
                    background: '#ffffff',
                }}
            >
                <Story />
            </div>
        ),
    ],
} satisfies Meta<typeof Sidebar>

export default meta

type Story = StoryObj<typeof meta>

/**
 * A docked left nav inside the shell contract: a `display: flex` parent, the
 * sidebar as a fixed-width flex child, and a `flexGrow` / `minWidth={0}` main
 * absorber. Toggling `isOpen` collapses the panel with a margin transition while
 * the main content reflows into the freed space.
 */
export const Docked = {
    render: function Docked() {
        const [isOpen, setIsOpen] = React.useState(true)

        return (
            <Box display="flex" height="full" overflow="hidden">
                <Sidebar id="docked-nav" align="start" isOpen={isOpen} width={260}>
                    <SidebarContent style={PANEL_SKIN}>
                        <Box as="nav" aria-label="Primary">
                            <DemoNav />
                        </Box>
                    </SidebarContent>
                </Sidebar>
                <Box as="main" flexGrow={1} minWidth={0} padding="large" overflow="auto">
                    <Stack space="medium">
                        <Button
                            variant="secondary"
                            aria-expanded={isOpen}
                            aria-controls="docked-nav"
                            onClick={() => setIsOpen((open) => !open)}
                        >
                            {isOpen ? 'Collapse sidebar' : 'Expand sidebar'}
                        </Button>
                        <Text tone="secondary">
                            The main element is the flex absorber: `flexGrow` with `minWidth={0}`,
                            so the sidebar can resize or collapse without overflowing the row.
                        </Text>
                    </Stack>
                </Box>
            </Box>
        )
    },
} satisfies Story

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

/**
 * A docked main nav whose collapse toggle lives in `<SidebarPersistentContent>`, the
 * pattern Todoist, Comms, and Automations share. The toggle rides the collapse
 * animation and peeks at the freed edge while collapsed, staying reachable to reopen.
 */
export const CollapsibleNav = {
    render: function CollapsibleNav() {
        const [isOpen, setIsOpen] = React.useState(true)

        return (
            <Box display="flex" height="full">
                <Sidebar id="collapsible-nav" align="start" isOpen={isOpen} width={260}>
                    <SidebarContent style={PANEL_SKIN}>
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
                                    marginRight: isOpen ? 0 : -40,
                                }}
                            >
                                <IconButton
                                    variant="secondary"
                                    icon={<SidebarToggleIcon />}
                                    aria-label={isOpen ? 'Collapse sidebar' : 'Open sidebar'}
                                    aria-controls="collapsible-nav"
                                    aria-expanded={isOpen}
                                    onClick={() => setIsOpen((open) => !open)}
                                />
                            </div>
                        </SidebarPersistentContent>
                        <Box as="nav" aria-label="Primary">
                            <DemoNav />
                        </Box>
                    </SidebarContent>
                </Sidebar>
                <Box
                    as="main"
                    flexGrow={1}
                    minWidth={0}
                    paddingY="large"
                    paddingRight="large"
                    paddingLeft={isOpen ? 'large' : 'xxlarge'}
                    overflow="auto"
                >
                    <Stack space="medium">
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

/**
 * Adding a `<SidebarResizeHandle>` makes the panel resizable: the handle sits on
 * the inner edge (right for `align="start"`), drives a render-free pointer drag,
 * and supports keyboard resize (arrows step, Home/End jump to min/max,
 * double-click resets to `defaultWidth`). Width is controlled and committed
 * through `onWidthChange`.
 */
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
                    <SidebarContent style={{ ...PANEL_SKIN, ...HANDLE_VISIBLE }}>
                        <Box as="nav" aria-label="Primary">
                            <DemoNav />
                        </Box>
                        <SidebarResizeHandle
                            aria-label="Resize sidebar"
                            data-testid="sidebar-resize-handle"
                        />
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

/**
 * A modal overlay drawer (`isOverlay` + `overlayMode="modal"`). It floats over
 * the content, traps focus, renders a dimming backdrop, and dismisses on the
 * backdrop click or Escape. The component inerts the background itself, so the
 * consumer no longer marks `main`. The panel becomes a `dialog` (named via `aria-label`
 * on `SidebarContent`), and the consumer's `<nav>` landmark remains a child,
 * preserved inside the dialog.
 */
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
                        style={PANEL_SKIN}
                        onKeyDown={(event) => {
                            if (event.key === 'Escape') event.stopPropagation()
                        }}
                    >
                        <Box as="nav" aria-label="Primary">
                            <DemoNav />
                        </Box>
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

/**
 * An end-aligned, non-modal dialog side pane (`align="end"` +
 * `overlayMode="dialog"`), modelled on a contextual chat. The background stays
 * interactive (no backdrop); it closes via its own control or Escape. The
 * rounded card skin is a child with `overflow: hidden`, so the resize handle on
 * the panel edge stays outside the clip. The card is inset from the viewport
 * edges via the overlay inset custom properties.
 */
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
                    <SidebarContent aria-labelledby="chat-pane-heading" style={CARD_INSETS}>
                        <div style={CARD_SKIN}>
                            <Box
                                padding="medium"
                                style={{
                                    borderBottom: '1px solid var(--reactist-divider-secondary)',
                                }}
                            >
                                <Box
                                    display="flex"
                                    justifyContent="spaceBetween"
                                    alignItems="center"
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
                            </Box>
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
                        </div>
                    </SidebarContent>
                </Sidebar>
            </Box>
        )
    },
} satisfies Story

/**
 * Responsive shell. The consumer computes `isOverlay` from the container width:
 * above the breakpoint the nav is docked in flow; below it, the nav becomes a
 * modal drawer with a trigger. Resize the canvas (or use the viewport toolbar) to
 * cross the breakpoint. The `<nav>` landmark is a child of `SidebarContent`, so it
 * remains a navigation landmark while docked and is preserved inside the dialog while
 * a modal overlay (the panel itself becomes the dialog).
 */
export const Responsive = {
    render: function Responsive() {
        const [shellRef, isOverlay] = useOverlayBelow<HTMLDivElement>(640)
        const [isOpen, setIsOpen] = React.useState(false)
        // Docked: always in view. Overlay: toggled by the trigger.
        const open = isOverlay ? isOpen : true

        return (
            <Box display="flex" height="full" ref={shellRef}>
                <Sidebar
                    id="responsive-nav"
                    align="start"
                    isOverlay={isOverlay}
                    overlayMode="modal"
                    isOpen={open}
                    dismissOverlayOnEscape
                    onDismiss={() => setIsOpen(false)}
                    width={240}
                >
                    <SidebarContent aria-label="Primary navigation" style={PANEL_SKIN}>
                        <Box as="nav" aria-label="Primary navigation">
                            <DemoNav />
                        </Box>
                    </SidebarContent>
                </Sidebar>
                <Box as="main" flexGrow={1} minWidth={0} padding="large" overflow="auto">
                    <Stack space="medium">
                        {isOverlay ? (
                            <Button
                                variant="primary"
                                aria-expanded={isOpen}
                                aria-controls="responsive-nav"
                                onClick={() => setIsOpen(true)}
                            >
                                Open menu
                            </Button>
                        ) : null}
                        <Text tone="secondary">
                            Above 640px the nav is docked; below it the consumer flips `isOverlay`
                            and the nav becomes a modal drawer. Resize the canvas to see it cross
                            the breakpoint.
                        </Text>
                    </Stack>
                </Box>
            </Box>
        )
    },
} satisfies Story

/**
 * Two sidebars docked on the same side, like Comms' workspace rail plus its
 * conversation list. They tile through the flex contract: each `<Sidebar>` is a
 * `flex-shrink: 0` child, and the `flexGrow / minWidth={0}` main absorbs the
 * rest. Both panes are independently resizable.
 */
export const StackedSidebars = {
    render: function StackedSidebars() {
        const [railWidth, setRailWidth] = React.useState(64)
        const [listWidth, setListWidth] = React.useState(260)

        return (
            <Box display="flex" height="full">
                <Sidebar
                    id="workspace-rail"
                    align="start"
                    isOpen
                    width={railWidth}
                    onWidthChange={setRailWidth}
                    minWidth={56}
                    maxWidth={120}
                    defaultWidth={64}
                    resizeStep={8}
                >
                    <SidebarContent style={{ ...RAIL_SKIN, ...HANDLE_VISIBLE }}>
                        <Box as="nav" aria-label="Workspaces">
                            <DemoRail />
                        </Box>
                        <SidebarResizeHandle aria-label="Resize workspace rail" />
                    </SidebarContent>
                </Sidebar>
                <Sidebar
                    id="conversations"
                    align="start"
                    isOpen
                    width={listWidth}
                    onWidthChange={setListWidth}
                    minWidth={200}
                    maxWidth={360}
                    defaultWidth={260}
                    resizeStep={20}
                >
                    <SidebarContent style={{ ...PANEL_SKIN, ...HANDLE_VISIBLE }}>
                        <Box as="section" aria-label="Conversations">
                            <DemoNav title="Conversations" />
                        </Box>
                        <SidebarResizeHandle aria-label="Resize conversation list" />
                    </SidebarContent>
                </Sidebar>
                <Box as="main" flexGrow={1} minWidth={0} padding="large" overflow="auto">
                    <Stack space="medium">
                        <Heading level="2" size="larger">
                            Conversation
                        </Heading>
                        <Text tone="secondary">
                            A workspace rail and a conversation list, both docked on the left and
                            independently resizable. Drag either pane's right edge; the main content
                            absorbs the change.
                        </Text>
                    </Stack>
                </Box>
            </Box>
        )
    },
} satisfies Story

/**
 * A left nav and a right details pane around the main absorber: the spec's full
 * shell contract with both edges. `align="start"` and `align="end"` are the same
 * component mirrored. Both panes resize from their inner edges.
 */
export const LeftAndRight = {
    render: function LeftAndRight() {
        const [navWidth, setNavWidth] = React.useState(240)
        const [paneWidth, setPaneWidth] = React.useState(320)

        return (
            <Box display="flex" height="full">
                <Sidebar
                    id="lr-nav"
                    align="start"
                    isOpen
                    width={navWidth}
                    onWidthChange={setNavWidth}
                    minWidth={200}
                    maxWidth={320}
                    defaultWidth={240}
                    resizeStep={20}
                >
                    <SidebarContent style={{ ...PANEL_SKIN, ...HANDLE_VISIBLE }}>
                        <Box as="nav" aria-label="Main navigation">
                            <DemoNav />
                        </Box>
                        <SidebarResizeHandle aria-label="Resize navigation" />
                    </SidebarContent>
                </Sidebar>
                <Box as="main" flexGrow={1} minWidth={0} padding="large" overflow="auto">
                    <Stack space="medium">
                        <Heading level="2" size="larger">
                            Main content
                        </Heading>
                        <Text tone="secondary">
                            The main element is the absorber between both sidebars. Drag either
                            pane's inner edge to resize it.
                        </Text>
                    </Stack>
                </Box>
                <Sidebar
                    id="lr-pane"
                    align="end"
                    isOpen
                    width={paneWidth}
                    onWidthChange={setPaneWidth}
                    minWidth={280}
                    maxWidth={480}
                    defaultWidth={320}
                    resizeStep={20}
                >
                    <SidebarContent style={{ ...PANEL_SKIN_END, ...HANDLE_VISIBLE }}>
                        <Box as="aside" aria-label="Details">
                            <DemoNav title="Details" />
                        </Box>
                        <SidebarResizeHandle aria-label="Resize details pane" />
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
                <SidebarContent
                    aria-label="Playground sidebar"
                    style={{ ...PANEL_SKIN, ...HANDLE_VISIBLE }}
                >
                    <DemoNav />
                    {resizable ? <SidebarResizeHandle aria-label="Resize sidebar" /> : null}
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
