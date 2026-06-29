import * as React from 'react'

import { fireEvent, render, screen, waitFor, within } from '@testing-library/react'
import { axe } from 'jest-axe'

import { Sidebar, SidebarContent, SidebarResizeHandle } from './sidebar'

import type { SidebarProps } from './sidebar'

function renderSidebar(
    props: Partial<SidebarProps> = {},
    {
        contentProps = {},
        children = <nav aria-label="Main navigation">Navigation</nav>,
    }: { contentProps?: Record<string, unknown>; children?: React.ReactNode } = {},
) {
    return render(
        <Sidebar align="start" isOpen={true} {...props}>
            <SidebarContent
                data-testid="sidebar-panel"
                aria-label="Main navigation"
                {...contentProps}
            >
                {children}
            </SidebarContent>
        </Sidebar>,
    )
}

describe('Sidebar', () => {
    it('renders a neutral <div> panel that wraps the consumer landmark child', () => {
        renderSidebar()
        const panel = screen.getByTestId('sidebar-panel')
        expect(panel.tagName).toBe('DIV')
        expect(panel).not.toHaveAttribute('role')
        expect(screen.getByRole('navigation', { name: 'Main navigation' })).toBeInTheDocument()
    })

    it('applies the provider `id` to the panel', () => {
        renderSidebar({ id: 'app-sidebar' })
        expect(screen.getByTestId('sidebar-panel')).toHaveAttribute('id', 'app-sidebar')
    })

    it('auto-generates a panel id when none is given', () => {
        renderSidebar()
        expect(screen.getByTestId('sidebar-panel').getAttribute('id')).toBeTruthy()
    })

    it('reflects open / closed through data-state', () => {
        const { rerender } = renderSidebar({ isOpen: true })
        const panel = screen.getByTestId('sidebar-panel')
        expect(panel).toHaveAttribute('data-state', 'open')

        rerender(
            <Sidebar align="start" isOpen={false}>
                <SidebarContent data-testid="sidebar-panel" aria-label="Main navigation">
                    <nav aria-label="Main navigation">Navigation</nav>
                </SidebarContent>
            </Sidebar>,
        )
        expect(panel).toHaveAttribute('data-state', 'closed')
    })

    it('exposes the attach edge through data-align', () => {
        renderSidebar({ align: 'end' })
        expect(screen.getByTestId('sidebar-panel')).toHaveAttribute('data-align', 'end')
    })

    it('ignores a host `role` so the component owns the rendered role', () => {
        renderSidebar({}, { contentProps: { role: 'banner' } })
        // Docked, the panel is a neutral div with no role; a host role is ignored.
        expect(screen.queryByRole('banner')).not.toBeInTheDocument()
        expect(screen.getByTestId('sidebar-panel')).not.toHaveAttribute('role')
    })

    it('keeps children mounted while closed by default', () => {
        renderSidebar({ isOpen: false })
        expect(screen.getByText('Navigation')).toBeInTheDocument()
    })
})

describe('overlay modes', () => {
    it('keeps the child landmark and adds no dialog while docked', () => {
        renderSidebar({ isOverlay: false, overlayMode: 'modal' })
        expect(screen.queryByRole('dialog')).not.toBeInTheDocument()
        expect(screen.getByRole('navigation', { name: 'Main navigation' })).toBeInTheDocument()
    })

    it('keeps a plain overlay free of a dialog role', () => {
        renderSidebar({ isOverlay: true, overlayMode: 'plain' })
        expect(screen.queryByRole('dialog')).not.toBeInTheDocument()
        expect(screen.getByRole('navigation', { name: 'Main navigation' })).toBeInTheDocument()
    })

    it('announces a dialog overlay as a non-modal dialog, landmark preserved inside', () => {
        // The panel itself becomes the dialog (a neutral <div>), named via the
        // aria-label on SidebarContent; the landmark child stays inside it.
        renderSidebar({ isOverlay: true, overlayMode: 'dialog' })
        const dialog = screen.getByRole('dialog', { name: 'Main navigation' })
        expect(dialog).not.toHaveAttribute('aria-modal')
        expect(
            within(dialog).getByRole('navigation', { name: 'Main navigation' }),
        ).toBeInTheDocument()
    })

    it('marks a modal overlay as a modal dialog', () => {
        renderSidebar({ isOverlay: true, overlayMode: 'modal' })
        const dialog = screen.getByRole('dialog', { name: 'Main navigation' })
        expect(dialog).toHaveAttribute('aria-modal', 'true')
    })
})

describe('modal backdrop', () => {
    it('is not rendered while docked, plain, or dialog', () => {
        const { rerender } = renderSidebar({ isOverlay: false, overlayMode: 'modal' })
        expect(screen.queryByTestId('sidebar-backdrop')).not.toBeInTheDocument()

        rerender(
            <Sidebar align="start" isOpen isOverlay overlayMode="plain">
                <SidebarContent aria-label="Main navigation">x</SidebarContent>
            </Sidebar>,
        )
        expect(screen.queryByTestId('sidebar-backdrop')).not.toBeInTheDocument()

        rerender(
            <Sidebar align="start" isOpen isOverlay overlayMode="dialog">
                <SidebarContent aria-label="Main navigation">x</SidebarContent>
            </Sidebar>,
        )
        expect(screen.queryByTestId('sidebar-backdrop')).not.toBeInTheDocument()
    })

    it('renders an aria-hidden backdrop for a modal overlay', () => {
        renderSidebar({ isOverlay: true, overlayMode: 'modal' })
        const backdrop = screen.getByTestId('sidebar-backdrop')
        expect(backdrop).toHaveAttribute('aria-hidden', 'true')
        expect(backdrop).toHaveAttribute('data-state', 'open')
    })

    it('dismisses on a backdrop click', () => {
        const onDismiss = jest.fn()
        renderSidebar({ isOverlay: true, overlayMode: 'modal', onDismiss })
        fireEvent.click(screen.getByTestId('sidebar-backdrop'))
        expect(onDismiss).toHaveBeenCalledTimes(1)
    })
})

describe('modal background', () => {
    const tree = (isOpen: boolean, overlayMode: 'modal' | 'dialog') => (
        <div>
            <Sidebar align="start" isOpen={isOpen} isOverlay overlayMode={overlayMode}>
                <SidebarContent aria-label="Menu">
                    <nav aria-label="Primary">Nav</nav>
                </SidebarContent>
            </Sidebar>
            <main>
                <button type="button">Background action</button>
            </main>
        </div>
    )

    it('hides the background from accessibility queries while a modal overlay is open, restoring on close', () => {
        const { rerender } = render(tree(true, 'modal'))
        expect(screen.queryByRole('button', { name: 'Background action' })).not.toBeInTheDocument()

        rerender(tree(false, 'modal'))
        expect(screen.getByRole('button', { name: 'Background action' })).toBeInTheDocument()
    })

    it('leaves the background reachable for a non-modal (dialog) overlay', () => {
        render(tree(true, 'dialog'))
        expect(screen.getByRole('button', { name: 'Background action' })).toBeInTheDocument()
    })
})

describe('Escape dismissal', () => {
    it('dismisses an open overlay on Escape from within the panel when enabled', () => {
        const onDismiss = jest.fn()
        renderSidebar({
            isOverlay: true,
            overlayMode: 'modal',
            dismissOverlayOnEscape: true,
            onDismiss,
        })
        fireEvent.keyDown(screen.getByTestId('sidebar-panel'), { key: 'Escape' })
        expect(onDismiss).toHaveBeenCalledTimes(1)
    })

    it('dismisses a non-modal overlay on Escape from within the panel', () => {
        const onDismiss = jest.fn()
        renderSidebar({
            isOverlay: true,
            overlayMode: 'dialog',
            dismissOverlayOnEscape: true,
            onDismiss,
        })
        fireEvent.keyDown(screen.getByTestId('sidebar-panel'), { key: 'Escape' })
        expect(onDismiss).toHaveBeenCalledTimes(1)
    })

    it('ignores Escape fired outside the panel', () => {
        const onDismiss = jest.fn()
        renderSidebar({
            isOverlay: true,
            overlayMode: 'dialog',
            dismissOverlayOnEscape: true,
            onDismiss,
        })
        fireEvent.keyDown(document.body, { key: 'Escape' })
        expect(onDismiss).not.toHaveBeenCalled()
    })

    it('respects defaultPrevented so a descendant can consume Escape', () => {
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
        fireEvent.keyDown(screen.getByRole('button', { name: 'Consumes Escape' }), {
            key: 'Escape',
        })
        expect(onDismiss).not.toHaveBeenCalled()
    })

    it('does not dismiss while docked', () => {
        const onDismiss = jest.fn()
        renderSidebar({ isOverlay: false, dismissOverlayOnEscape: true, onDismiss })
        fireEvent.keyDown(screen.getByTestId('sidebar-panel'), { key: 'Escape' })
        expect(onDismiss).not.toHaveBeenCalled()
    })

    it('does not dismiss when dismissOverlayOnEscape is off', () => {
        const onDismiss = jest.fn()
        renderSidebar({
            isOverlay: true,
            overlayMode: 'modal',
            dismissOverlayOnEscape: false,
            onDismiss,
        })
        fireEvent.keyDown(screen.getByTestId('sidebar-panel'), { key: 'Escape' })
        expect(onDismiss).not.toHaveBeenCalled()
    })
})

describe('focus management', () => {
    it('moves focus into the panel when opened as a modal overlay', async () => {
        render(
            <Sidebar align="start" isOpen isOverlay overlayMode="modal" id="nav">
                <SidebarContent aria-label="Menu">
                    <button type="button">First</button>
                    <button type="button">Second</button>
                </SidebarContent>
            </Sidebar>,
        )
        await waitFor(() => {
            const dialog = screen.getByRole('dialog', { name: 'Menu' })
            expect(dialog.contains(document.activeElement)).toBe(true)
        })
    })

    it('leaves the focus trap disabled while docked', () => {
        const { container } = renderSidebar({ isOverlay: false })
        const lock = container.querySelector('[data-focus-lock-disabled]')
        expect(lock).toHaveAttribute('data-focus-lock-disabled', 'disabled')
    })
})

describe('SidebarResizeHandle', () => {
    function renderResizable(props: Partial<SidebarProps> = {}) {
        const onWidthChange = jest.fn()
        render(
            <Sidebar
                align="start"
                isOpen
                id="sidebar"
                width={280}
                minWidth={210}
                maxWidth={420}
                defaultWidth={280}
                resizeStep={40}
                onWidthChange={onWidthChange}
                {...props}
            >
                <SidebarContent aria-label="Main navigation">
                    <div>Navigation</div>
                    <SidebarResizeHandle aria-label="Resize sidebar" />
                </SidebarContent>
            </Sidebar>,
        )
        return { onWidthChange }
    }

    it('renders a vertical separator wired to the panel', () => {
        renderResizable()
        const handle = screen.getByRole('separator', { name: 'Resize sidebar' })
        expect(handle).toHaveAttribute('aria-orientation', 'vertical')
        expect(handle).toHaveAttribute('aria-controls', 'sidebar')
        expect(handle).toHaveAttribute('aria-valuemin', '210')
        expect(handle).toHaveAttribute('aria-valuemax', '420')
        expect(handle).toHaveAttribute('aria-valuenow', '280')
        expect(handle).toHaveAttribute('aria-valuetext', '280px')
        expect(handle).toHaveAttribute('tabindex', '0')
    })

    it('grows with ArrowRight for align="start" (handle on the right edge)', () => {
        const { onWidthChange } = renderResizable({ align: 'start' })
        fireEvent.keyDown(screen.getByRole('separator', { name: 'Resize sidebar' }), {
            key: 'ArrowRight',
        })
        expect(onWidthChange).toHaveBeenLastCalledWith(320)
    })

    it('shrinks with ArrowLeft for align="start"', () => {
        const { onWidthChange } = renderResizable({ align: 'start' })
        fireEvent.keyDown(screen.getByRole('separator', { name: 'Resize sidebar' }), {
            key: 'ArrowLeft',
        })
        expect(onWidthChange).toHaveBeenLastCalledWith(240)
    })

    it('reverses the arrows for align="end" (handle on the left edge): ArrowRight shrinks', () => {
        const { onWidthChange } = renderResizable({ align: 'end' })
        fireEvent.keyDown(screen.getByRole('separator', { name: 'Resize sidebar' }), {
            key: 'ArrowRight',
        })
        expect(onWidthChange).toHaveBeenLastCalledWith(240)
    })

    it('reverses the arrows for align="end": ArrowLeft grows', () => {
        const { onWidthChange } = renderResizable({ align: 'end' })
        fireEvent.keyDown(screen.getByRole('separator', { name: 'Resize sidebar' }), {
            key: 'ArrowLeft',
        })
        expect(onWidthChange).toHaveBeenLastCalledWith(320)
    })

    it('jumps to min and max with Home and End', () => {
        const { onWidthChange } = renderResizable()
        const handle = screen.getByRole('separator', { name: 'Resize sidebar' })

        fireEvent.keyDown(handle, { key: 'Home' })
        expect(onWidthChange).toHaveBeenLastCalledWith(210)

        fireEvent.keyDown(handle, { key: 'End' })
        expect(onWidthChange).toHaveBeenLastCalledWith(420)
    })

    it('resets to the default width on double-click', () => {
        const { onWidthChange } = renderResizable({ width: 360 })
        const handle = screen.getByRole('separator', { name: 'Resize sidebar' })

        fireEvent.doubleClick(handle)
        expect(onWidthChange).toHaveBeenLastCalledWith(280)
    })

    it('clamps a keyboard step to the max width', () => {
        const { onWidthChange } = renderResizable({ width: 410 })
        const handle = screen.getByRole('separator', { name: 'Resize sidebar' })

        fireEvent.keyDown(handle, { key: 'ArrowRight' })
        expect(onWidthChange).toHaveBeenLastCalledWith(420)
    })

    it('drops out of the tab order and a11y tree while closed', () => {
        renderResizable({ isOpen: false })
        const handle = screen.getByRole('separator', { hidden: true })
        expect(handle).toHaveAttribute('tabindex', '-1')
        expect(handle).toHaveAttribute('aria-hidden', 'true')
    })

    it('does not resize while the sidebar is closed', () => {
        const { onWidthChange } = renderResizable({ isOpen: false })
        const handle = screen.getByRole('separator', { hidden: true })
        fireEvent.keyDown(handle, { key: 'ArrowRight' })
        expect(onWidthChange).not.toHaveBeenCalled()
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
            <Sidebar align="start" isOpen id="nav">
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
