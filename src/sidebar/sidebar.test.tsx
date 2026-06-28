import * as React from 'react'

import { fireEvent, render, screen, waitFor } from '@testing-library/react'
import { axe } from 'jest-axe'

import { Sidebar, SidebarContent } from './sidebar'

import type { SidebarProps } from './sidebar'

function renderSidebar(
    props: Partial<SidebarProps> = {},
    {
        contentProps = {},
        children = <div>Navigation</div>,
    }: { contentProps?: Record<string, unknown>; children?: React.ReactNode } = {},
) {
    return render(
        <Sidebar align="start" isOpen={true} {...props}>
            <SidebarContent aria-label="Main navigation" {...contentProps}>
                {children}
            </SidebarContent>
        </Sidebar>,
    )
}

describe('Sidebar', () => {
    it('renders the panel as an <aside> by default', () => {
        renderSidebar()
        const panel = screen.getByRole('complementary', { name: 'Main navigation' })
        expect(panel.tagName).toBe('ASIDE')
    })

    it('renders the panel as a custom element via `as`', () => {
        renderSidebar({}, { contentProps: { as: 'nav' } })
        const panel = screen.getByRole('navigation', { name: 'Main navigation' })
        expect(panel.tagName).toBe('NAV')
    })

    it('applies the provider `id` to the panel', () => {
        renderSidebar({ id: 'app-sidebar' })
        expect(screen.getByRole('complementary', { name: 'Main navigation' })).toHaveAttribute(
            'id',
            'app-sidebar',
        )
    })

    it('auto-generates a panel id when none is given', () => {
        renderSidebar()
        const panel = screen.getByRole('complementary', { name: 'Main navigation' })
        expect(panel.getAttribute('id')).toBeTruthy()
    })

    it('reflects open / closed through data-state', () => {
        const { rerender } = renderSidebar({ isOpen: true })
        const panel = screen.getByRole('complementary', { name: 'Main navigation' })
        expect(panel).toHaveAttribute('data-state', 'open')

        rerender(
            <Sidebar align="start" isOpen={false}>
                <SidebarContent aria-label="Main navigation">
                    <div>Navigation</div>
                </SidebarContent>
            </Sidebar>,
        )
        expect(panel).toHaveAttribute('data-state', 'closed')
    })

    it('exposes the attach edge through data-align', () => {
        renderSidebar({ align: 'end' })
        expect(screen.getByRole('complementary', { name: 'Main navigation' })).toHaveAttribute(
            'data-align',
            'end',
        )
    })

    it('ignores a host `role` so the component owns the rendered role', () => {
        renderSidebar({}, { contentProps: { role: 'banner' } })
        // The landmark role stays `complementary` (the default aside), not the host `banner`.
        expect(screen.queryByRole('banner')).not.toBeInTheDocument()
        expect(screen.getByRole('complementary', { name: 'Main navigation' })).toBeInTheDocument()
    })

    it('keeps children mounted while closed by default', () => {
        renderSidebar({ isOpen: false })
        expect(screen.getByText('Navigation')).toBeInTheDocument()
    })
})

describe('overlay modes', () => {
    it('uses the landmark role and adds no dialog while docked', () => {
        renderSidebar({ isOverlay: false, overlayMode: 'modal' })
        expect(screen.queryByRole('dialog')).not.toBeInTheDocument()
        expect(screen.getByRole('complementary', { name: 'Main navigation' })).toBeInTheDocument()
    })

    it('keeps a plain overlay free of a dialog role', () => {
        renderSidebar({ isOverlay: true, overlayMode: 'plain' })
        expect(screen.queryByRole('dialog')).not.toBeInTheDocument()
    })

    it('announces a dialog overlay as a non-modal dialog', () => {
        // A dialog overlay renders a generic element (`as="div"`) so the `dialog`
        // role is valid; the default `aside` cannot carry `role="dialog"`.
        renderSidebar({ isOverlay: true, overlayMode: 'dialog' }, { contentProps: { as: 'div' } })
        const dialog = screen.getByRole('dialog', { name: 'Main navigation' })
        expect(dialog).not.toHaveAttribute('aria-modal')
    })

    it('marks a modal overlay as a modal dialog', () => {
        renderSidebar({ isOverlay: true, overlayMode: 'modal' }, { contentProps: { as: 'div' } })
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

describe('Escape dismissal', () => {
    it('dismisses an open overlay on Escape when enabled', () => {
        const onDismiss = jest.fn()
        renderSidebar({
            isOverlay: true,
            overlayMode: 'modal',
            dismissOverlayOnEscape: true,
            onDismiss,
        })
        fireEvent.keyDown(document.body, { key: 'Escape' })
        expect(onDismiss).toHaveBeenCalledTimes(1)
    })

    it('respects defaultPrevented so app handlers can opt out', () => {
        const onDismiss = jest.fn()
        renderSidebar({
            isOverlay: true,
            overlayMode: 'modal',
            dismissOverlayOnEscape: true,
            onDismiss,
        })

        function preventEscape(event: KeyboardEvent) {
            if (event.key === 'Escape') event.preventDefault()
        }
        document.body.addEventListener('keydown', preventEscape, { capture: true })
        fireEvent.keyDown(document.body, { key: 'Escape' })
        document.body.removeEventListener('keydown', preventEscape, { capture: true })

        expect(onDismiss).not.toHaveBeenCalled()
    })

    it('does not dismiss while docked', () => {
        const onDismiss = jest.fn()
        renderSidebar({ isOverlay: false, dismissOverlayOnEscape: true, onDismiss })
        fireEvent.keyDown(document.body, { key: 'Escape' })
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
        fireEvent.keyDown(document.body, { key: 'Escape' })
        expect(onDismiss).not.toHaveBeenCalled()
    })
})

describe('focus management', () => {
    it('moves focus into the panel when opened as a modal overlay', async () => {
        render(
            <Sidebar align="start" isOpen isOverlay overlayMode="modal" id="nav">
                <SidebarContent as="div" aria-label="Menu">
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
    it('has no axe violations as a modal overlay', async () => {
        const { container } = render(
            <Sidebar align="start" isOpen isOverlay overlayMode="modal" id="nav">
                <SidebarContent as="div" aria-label="Main navigation">
                    <a href="#projects">Projects</a>
                </SidebarContent>
            </Sidebar>,
        )
        expect(await axe(container)).toHaveNoViolations()
    })
})
