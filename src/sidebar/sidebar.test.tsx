import * as React from 'react'

import { act, fireEvent, render, screen } from '@testing-library/react'

import { Sidebar, SidebarContent } from './sidebar'

import type { SidebarProps } from './sidebar'

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
            {
                contentProps: { role: 'banner', exceptionallySetClassName: 'app-skin' },
                children: <div>Panel content</div>,
            },
        )

        const panel = screen.getByTestId('sidebar-panel')
        expect(panel.tagName).toBe('DIV')
        expect(panel).not.toHaveAttribute('role')
        expect(screen.queryByRole('banner')).not.toBeInTheDocument()
        // `aria-label` is applied only to the dialog role, so a docked panel drops the
        // name it was given.
        expect(panel).not.toHaveAttribute('aria-label')
        expect(panel).toHaveClass('app-skin')
        expect(panel).toHaveAttribute('id', 'app-sidebar')
        expect(panel).toHaveAttribute('data-align', 'end')
        expect(panel).toHaveAttribute('data-state', 'open')
        expect(panel.style.getPropertyValue('--reactist-sidebar-width')).toBe(`${width}px`)
        expect(panel.style.width).toBe('')
        expect(screen.getByText('Panel content')).toBeInTheDocument()
    })
})

describe('unmountOnHide', () => {
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

describe('errors', () => {
    it('throws when a slot is used outside <Sidebar>', () => {
        const consoleError = jest.spyOn(console, 'error').mockImplementation(() => undefined)
        expect(() => render(<SidebarContent>orphan</SidebarContent>)).toThrow(
            'must be rendered inside <Sidebar>',
        )
        consoleError.mockRestore()
    })
})
