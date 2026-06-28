import * as React from 'react'

import { render, screen } from '@testing-library/react'

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

describe('errors', () => {
    it('throws when a slot is used outside <Sidebar>', () => {
        const consoleError = jest.spyOn(console, 'error').mockImplementation(() => undefined)
        expect(() => render(<SidebarContent>orphan</SidebarContent>)).toThrow(
            'must be rendered inside <Sidebar>',
        )
        consoleError.mockRestore()
    })
})
