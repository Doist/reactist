import * as React from 'react'

import { act, fireEvent, render, screen, waitFor, within } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { axe } from 'jest-axe'

import { Sidebar, SidebarContent, SidebarPersistentContent, SidebarResizeHandle } from './sidebar'

import type { SidebarAlign, SidebarProps } from './sidebar'

function renderSidebar(
    props: Partial<SidebarProps> = {},
    {
        contentProps = {},
        children = <nav aria-label="Main navigation">Navigation</nav>,
        withBackground = false,
    }: {
        contentProps?: Record<string, unknown>
        children?: React.ReactNode
        withBackground?: boolean
    } = {},
) {
    const ui = (overrides: Partial<SidebarProps>) => (
        <div>
            <Sidebar align="start" isOpen {...props} {...overrides}>
                <SidebarContent
                    data-testid="sidebar-panel"
                    aria-label="Main navigation"
                    {...contentProps}
                >
                    {children}
                </SidebarContent>
            </Sidebar>
            {withBackground ? (
                <main>
                    <button type="button">Background action</button>
                </main>
            ) : null}
        </div>
    )
    const view = render(ui({}))
    return {
        ...view,
        rerender: (overrides: Partial<SidebarProps> = {}) => view.rerender(ui(overrides)),
    }
}

describe('when isOverlay is false', () => {
    it('renders a docked panel as a neutral <div> wrapping the content', () => {
        const width = 280
        // `role` is omitted from the public type but we force it to prove the
        // component owns the rendered role and a host role is ignored.
        renderSidebar(
            { align: 'end', id: 'app-sidebar', width },
            { contentProps: { role: 'banner' }, children: <div>Panel content</div> },
        )

        const panel = screen.getByTestId('sidebar-panel')
        expect(panel.tagName).toBe('DIV')
        expect(panel).not.toHaveAttribute('role')
        expect(screen.queryByRole('banner')).not.toBeInTheDocument()
        expect(panel).toHaveAttribute('id', 'app-sidebar')
        expect(panel).toHaveAttribute('data-align', 'end')
        expect(panel).toHaveAttribute('data-state', 'open')
        expect(panel.style.getPropertyValue('--reactist-sidebar-width')).toBe(`${width}px`)
        expect(panel.style.width).toBe('')
        expect(screen.getByText('Panel content')).toBeInTheDocument()
    })

    it('does not add overlay semantics while docked', async () => {
        const user = userEvent.setup()
        const onDismiss = jest.fn()
        const { container } = renderSidebar(
            {
                isOverlay: false,
                overlayMode: 'modal',
                dismissOverlayOnEscape: true,
                onDismiss,
            },
            {
                children: (
                    <nav aria-label="Main navigation">
                        <button type="button">Panel item</button>
                    </nav>
                ),
            },
        )

        expect(screen.queryByRole('dialog')).not.toBeInTheDocument()
        expect(screen.getByRole('navigation', { name: 'Main navigation' })).toBeInTheDocument()
        expect(screen.queryByTestId('sidebar-backdrop')).not.toBeInTheDocument()
        expect(container.querySelector('[data-focus-lock-disabled]')).toHaveAttribute(
            'data-focus-lock-disabled',
            'disabled',
        )

        // Escape does not do anything while docked, even with the flag on and focus inside.
        screen.getByRole('button', { name: 'Panel item' }).focus()
        await user.keyboard('{Escape}')
        expect(onDismiss).not.toHaveBeenCalled()
    })
})

describe('when overlayMode is modal', () => {
    it('opens as a modal dialog: backdrop shown, background hidden from assistive tech, and focus trapped', async () => {
        renderSidebar(
            { isOverlay: true, overlayMode: 'modal', id: 'nav' },
            {
                contentProps: { 'aria-label': 'Menu' },
                children: (
                    <nav aria-label="Primary">
                        <button type="button">First</button>
                    </nav>
                ),
                withBackground: true,
            },
        )

        const dialog = screen.getByRole('dialog', { name: 'Menu' })
        expect(dialog).toHaveAttribute('aria-modal', 'true')

        const backdrop = screen.getByTestId('sidebar-backdrop')
        expect(backdrop).toHaveAttribute('aria-hidden', 'true')
        expect(backdrop).toHaveAttribute('data-state', 'open')

        // The background is still visible, just hidden from assistive tech.
        expect(screen.queryByRole('button', { name: 'Background action' })).not.toBeInTheDocument()

        await waitFor(() => {
            expect(dialog.contains(document.activeElement)).toBe(true)
        })
    })

    it('dismisses on a backdrop click and restores the background on close', async () => {
        const user = userEvent.setup()
        const onDismiss = jest.fn()
        const { rerender } = renderSidebar(
            { isOverlay: true, overlayMode: 'modal', onDismiss },
            { withBackground: true },
        )

        expect(screen.queryByRole('button', { name: 'Background action' })).not.toBeInTheDocument()

        await user.click(screen.getByTestId('sidebar-backdrop'))
        expect(onDismiss).toHaveBeenCalledTimes(1)

        rerender({ isOpen: false })
        expect(screen.getByRole('button', { name: 'Background action' })).toBeInTheDocument()
    })
})

describe('when overlayMode is dialog', () => {
    it("opens as a non-modal dialog, preserving the content's landmark and leaving the background reachable", () => {
        renderSidebar(
            { isOverlay: true, overlayMode: 'dialog' },
            { children: <nav aria-label="Primary">Navigation</nav>, withBackground: true },
        )

        const dialog = screen.getByRole('dialog', { name: 'Main navigation' })
        expect(dialog).not.toHaveAttribute('aria-modal')

        expect(within(dialog).getByRole('navigation', { name: 'Primary' })).toBeInTheDocument()
        expect(screen.queryByTestId('sidebar-backdrop')).not.toBeInTheDocument()
        expect(screen.getByRole('button', { name: 'Background action' })).toBeInTheDocument()
    })
})

describe('when overlayMode is plain', () => {
    it('opens as a plain overlay with no dialog role, backdrop, or trap', () => {
        const { container } = renderSidebar({ isOverlay: true, overlayMode: 'plain' })

        expect(screen.queryByRole('dialog')).not.toBeInTheDocument()
        expect(screen.getByRole('navigation', { name: 'Main navigation' })).toBeInTheDocument()
        expect(screen.queryByTestId('sidebar-backdrop')).not.toBeInTheDocument()
        expect(container.querySelector('[data-focus-lock-disabled]')).toHaveAttribute(
            'data-focus-lock-disabled',
            'disabled',
        )
    })
})

describe('dismissOverlayOnEscape', () => {
    it('dismisses an open overlay on Escape from within the panel', async () => {
        const user = userEvent.setup()
        const onDismiss = jest.fn()
        renderSidebar(
            { isOverlay: true, overlayMode: 'dialog', dismissOverlayOnEscape: true, onDismiss },
            { children: <button type="button">Panel item</button> },
        )

        await user.keyboard('{Escape}')
        expect(onDismiss).not.toHaveBeenCalled()

        screen.getByRole('button', { name: 'Panel item' }).focus()
        await user.keyboard('{Escape}')
        expect(onDismiss).toHaveBeenCalledTimes(1)
    })

    it('respects defaultPrevented so a descendant can consume Escape', async () => {
        const user = userEvent.setup()
        const onDismiss = jest.fn()
        renderSidebar(
            {
                isOverlay: true,
                overlayMode: 'modal',
                dismissOverlayOnEscape: true,
                onDismiss,
            },
            {
                children: (
                    <button
                        type="button"
                        onKeyDown={(event) => {
                            if (event.key === 'Escape') event.preventDefault()
                        }}
                    >
                        Consumes Escape
                    </button>
                ),
            },
        )
        screen.getByRole('button', { name: 'Consumes Escape' }).focus()
        await user.keyboard('{Escape}')
        expect(onDismiss).not.toHaveBeenCalled()
    })

    it('does not dismiss when dismissOverlayOnEscape is off', async () => {
        const user = userEvent.setup()
        const onDismiss = jest.fn()
        renderSidebar(
            {
                isOverlay: true,
                overlayMode: 'modal',
                dismissOverlayOnEscape: false,
                onDismiss,
            },
            { children: <button type="button">Panel item</button> },
        )
        screen.getByRole('button', { name: 'Panel item' }).focus()
        await user.keyboard('{Escape}')
        expect(onDismiss).not.toHaveBeenCalled()
    })
})

describe('unmountOnHide', () => {
    it('keeps children mounted while closed by default', () => {
        renderSidebar({ isOpen: false, width: 280 })
        expect(screen.getByText('Navigation')).toBeInTheDocument()
    })

    it('drops children on transitionend after the exit', () => {
        const { rerender } = renderSidebar(
            { unmountOnHide: true },
            { children: <nav aria-label="Primary">Panel body</nav> },
        )
        expect(screen.getByText('Panel body')).toBeInTheDocument()

        rerender({ isOpen: false })
        expect(screen.getByText('Panel body')).toBeInTheDocument()

        fireEvent.transitionEnd(screen.getByTestId('sidebar-panel'))
        expect(screen.queryByText('Panel body')).not.toBeInTheDocument()
    })

    it('cancels a pending unmount when reopened mid-exit', () => {
        const { rerender } = renderSidebar(
            { unmountOnHide: true },
            { children: <nav aria-label="Primary">Panel body</nav> },
        )
        rerender({ isOpen: false })
        rerender({ isOpen: true })
        fireEvent.transitionEnd(screen.getByTestId('sidebar-panel'))
        expect(screen.getByText('Panel body')).toBeInTheDocument()
    })

    it('unmounts without a transitionend under reduced motion', () => {
        jest.useFakeTimers()
        try {
            const { rerender } = renderSidebar(
                { unmountOnHide: true },
                { children: <nav aria-label="Primary">Panel body</nav> },
            )
            rerender({ isOpen: false })
            expect(screen.getByText('Panel body')).toBeInTheDocument()
            act(() => {
                jest.runOnlyPendingTimers()
            })
            expect(screen.queryByText('Panel body')).not.toBeInTheDocument()
        } finally {
            jest.useRealTimers()
        }
    })
})

describe('SidebarPersistentContent', () => {
    it('renders in the panel and stays visible when open, and out of the inert when closed', async () => {
        const { rerender } = renderSidebar(
            { width: 280 },
            {
                children: (
                    <nav aria-label="Main navigation">
                        <SidebarPersistentContent>
                            <button type="button">Toggle sidebar</button>
                        </SidebarPersistentContent>
                        <a href="#projects">Projects</a>
                    </nav>
                ),
            },
        )

        const panel = screen.getByTestId('sidebar-panel')
        const toggle = await within(panel).findByRole('button', { name: 'Toggle sidebar' })
        expect(toggle).toBeVisible()
        expect(toggle.closest('[inert]')).toBeNull()
        expect(screen.getByText('Projects').closest('[inert]')).toBeNull()

        rerender({ isOpen: false })
        expect(screen.getByText('Projects').closest('[inert]')).not.toBeNull()
        expect(toggle.closest('[inert]')).toBeNull()
    })
})

describe('resize', () => {
    const WIDTH = 280
    const MIN_WIDTH = 210
    const MAX_WIDTH = 420
    const DEFAULT_WIDTH = 280
    const STEP = 40

    function renderResizable(props: Partial<SidebarProps> = {}) {
        const onWidthChange = jest.fn()
        return {
            onWidthChange,
            ...renderSidebar(
                {
                    id: 'sidebar',
                    width: WIDTH,
                    minWidth: MIN_WIDTH,
                    maxWidth: MAX_WIDTH,
                    defaultWidth: DEFAULT_WIDTH,
                    resizeStep: STEP,
                    onWidthChange,
                    ...props,
                },
                {
                    children: (
                        <>
                            <div>Navigation</div>
                            <SidebarResizeHandle aria-label="Resize sidebar" />
                        </>
                    ),
                },
            ),
        }
    }

    it('wires the separator when open and makes it non-interactive when closed', async () => {
        const user = userEvent.setup()
        const { onWidthChange, rerender } = renderResizable()

        const handle = screen.getByRole('separator', { name: 'Resize sidebar' })
        expect(handle).toHaveAttribute('aria-orientation', 'vertical')
        expect(handle).toHaveAttribute('aria-controls', 'sidebar')
        expect(handle).toHaveAttribute('aria-valuemin', String(MIN_WIDTH))
        expect(handle).toHaveAttribute('aria-valuemax', String(MAX_WIDTH))
        expect(handle).toHaveAttribute('aria-valuenow', String(WIDTH))
        expect(handle).toHaveAttribute('aria-valuetext', `${WIDTH}px`)
        expect(handle).toHaveAttribute('tabindex', '0')

        rerender({ isOpen: false })

        const closedHandle = screen.getByRole('separator', { hidden: true })
        expect(closedHandle).toHaveAttribute('tabindex', '-1')
        expect(closedHandle).toHaveAttribute('aria-hidden', 'true')

        closedHandle.focus()
        await user.keyboard('{ArrowRight}')
        expect(onWidthChange).not.toHaveBeenCalled()
    })

    it('forwards data-* attributes to the separator and keeps its own on collision', () => {
        renderSidebar(
            { id: 'sidebar', width: 280, minWidth: 200, maxWidth: 420 },
            {
                children: (
                    <>
                        <nav aria-label="Main navigation">Navigation</nav>
                        <SidebarResizeHandle
                            aria-label="Resize sidebar"
                            data-testid="resize-handle"
                            data-align="consumer-should-lose"
                        />
                    </>
                ),
            },
        )

        const handle = screen.getByTestId('resize-handle')
        expect(handle).toHaveAttribute('data-testid', 'resize-handle')
        // the component owns data-align; a consumer collision must not win
        expect(handle).toHaveAttribute('data-align', 'start')
    })

    const keyboardCases: Array<{
        align: SidebarAlign
        key: string
        width?: number
        expected: number
        description: string
    }> = [
        {
            align: 'start',
            key: 'ArrowRight',
            expected: WIDTH + STEP,
            description: 'widens by resizeStep',
        },
        {
            align: 'start',
            key: 'ArrowLeft',
            expected: WIDTH - STEP,
            description: 'narrows by resizeStep',
        },
        {
            align: 'end',
            key: 'ArrowRight',
            expected: WIDTH - STEP,
            description: 'narrows by resizeStep',
        },
        {
            align: 'end',
            key: 'ArrowLeft',
            expected: WIDTH + STEP,
            description: 'widens by resizeStep',
        },
        { align: 'start', key: 'Home', expected: MIN_WIDTH, description: 'jumps to minWidth' },
        { align: 'start', key: 'End', expected: MAX_WIDTH, description: 'jumps to maxWidth' },
        {
            align: 'end',
            key: 'Home',
            expected: MAX_WIDTH,
            description: 'jumps to maxWidth (swapped)',
        },
        {
            align: 'end',
            key: 'End',
            expected: MIN_WIDTH,
            description: 'jumps to minWidth (swapped)',
        },
        {
            align: 'start',
            key: 'ArrowRight',
            width: MAX_WIDTH - 10,
            expected: MAX_WIDTH,
            description: 'clamps a step to maxWidth',
        },
    ]

    it.each(keyboardCases)(
        'align="$align": $key $description',
        async ({ align, key, width, expected }) => {
            const user = userEvent.setup()
            const { onWidthChange } = renderResizable({ align, width: width ?? WIDTH })

            screen.getByRole('separator', { name: 'Resize sidebar' }).focus()
            await user.keyboard(`{${key}}`)
            expect(onWidthChange).toHaveBeenLastCalledWith(expected)
        },
    )

    it('resets to defaultWidth on double-click', async () => {
        const user = userEvent.setup()
        const { onWidthChange } = renderResizable({ width: DEFAULT_WIDTH + 80 })
        await user.dblClick(screen.getByRole('separator', { name: 'Resize sidebar' }))
        expect(onWidthChange).toHaveBeenLastCalledWith(DEFAULT_WIDTH)
    })

    it('commits the dragged width once on pointer up', async () => {
        const user = userEvent.setup()
        const { onWidthChange } = renderResizable()
        const handle = screen.getByRole('separator', { name: 'Resize sidebar' })
        const panel = document.getElementById('sidebar') as HTMLElement

        handle.setPointerCapture = jest.fn()
        handle.releasePointerCapture = jest.fn()
        handle.hasPointerCapture = jest.fn(() => false)

        const dragByPx = 50
        await user.pointer([
            { keys: '[MouseLeft>]', target: handle, coords: { clientX: 100, clientY: 0 } },
            { coords: { clientX: 100 + dragByPx, clientY: 0 } },
            { keys: '[/MouseLeft]' },
        ])

        expect(panel.style.getPropertyValue('--reactist-sidebar-width')).toBe(
            `${WIDTH + dragByPx}px`,
        )
        expect(onWidthChange).toHaveBeenCalledTimes(1)
        expect(onWidthChange).toHaveBeenLastCalledWith(WIDTH + dragByPx)
    })
})

describe('errors', () => {
    it('throws when a slot is used outside <Sidebar>', () => {
        const consoleError = jest.spyOn(console, 'error').mockImplementation(() => undefined)
        expect(() => render(<SidebarContent>orphan</SidebarContent>)).toThrow(
            'must be rendered inside <Sidebar>',
        )
        consoleError.mockRestore()
    })
})

describe('accessibility', () => {
    it('has no axe violations as a docked nav', async () => {
        const { container } = render(
            <Sidebar align="start" isOpen id="nav" width={280} minWidth={210} maxWidth={420}>
                <SidebarContent>
                    <nav aria-label="Main navigation">
                        <a href="#projects">Projects</a>
                    </nav>
                    <SidebarResizeHandle aria-label="Resize sidebar" />
                </SidebarContent>
            </Sidebar>,
        )
        expect(await axe(container)).toHaveNoViolations()
    })

    it('has no axe violations as a modal overlay', async () => {
        const { container } = render(
            <Sidebar align="start" isOpen isOverlay overlayMode="modal" id="nav">
                <SidebarContent aria-label="Main navigation">
                    <nav aria-label="Primary">
                        <a href="#projects">Projects</a>
                    </nav>
                </SidebarContent>
            </Sidebar>,
        )
        expect(await axe(container)).toHaveNoViolations()
    })
})
