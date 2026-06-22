import * as React from 'react'

import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { axe } from 'jest-axe'

import {
    ExpansionPanel,
    ExpansionPanelContent,
    ExpansionPanelHeader,
    ExpansionPanelToggle,
} from './expansion-panel'

type PanelOverrides =
    | { initiallyExpanded?: boolean }
    | { isExpanded: boolean; onToggleExpand: () => void }

function renderPanel(overrides: PanelOverrides = {}) {
    return render(
        <ExpansionPanel id="panel-content" {...overrides}>
            <ExpansionPanelHeader>
                <ExpansionPanelToggle aria-label="Toggle section" />
            </ExpansionPanelHeader>
            <ExpansionPanelContent>
                <span>Body content</span>
            </ExpansionPanelContent>
        </ExpansionPanel>,
    )
}

function renderButtonTogglePanel(overrides: PanelOverrides = {}) {
    return render(
        <ExpansionPanel id="panel-content" {...overrides}>
            <ExpansionPanelHeader>
                <ExpansionPanelToggle>Section label</ExpansionPanelToggle>
            </ExpansionPanelHeader>
            <ExpansionPanelContent>
                <span>Body content</span>
            </ExpansionPanelContent>
        </ExpansionPanel>,
    )
}

describe('ExpansionPanel', () => {
    it('has no accessibility violations', async () => {
        const { container } = renderPanel({ initiallyExpanded: true })
        expect(await axe(container)).toHaveNoViolations()
    })

    it('wires the toggle to the content via aria-controls', () => {
        renderPanel()

        const toggle = screen.getByRole('button', { name: 'Toggle section' })
        expect(toggle).toHaveAttribute('aria-controls', 'panel-content')
        expect(document.getElementById('panel-content')).toBeInTheDocument()
    })

    it('shows content when expanded and reports collapsed via the toggle otherwise', () => {
        // Note: the collapsed panel hides its content with `display: none` via a CSS
        // class, which jsdom doesn't apply, so we assert the visible (expanded) state
        // directly and the collapsed state through the toggle's `aria-expanded`.
        const { unmount } = renderPanel({ initiallyExpanded: true })
        expect(screen.getByText('Body content')).toBeVisible()
        unmount()

        renderPanel({ initiallyExpanded: false })
        expect(screen.getByRole('button', { name: 'Toggle section' })).toHaveAttribute(
            'aria-expanded',
            'false',
        )
    })

    it('toggles its expanded state in uncontrolled mode', async () => {
        const user = userEvent.setup()
        renderPanel({ initiallyExpanded: true })

        const toggle = screen.getByRole('button', { name: 'Toggle section' })
        expect(toggle).toHaveAttribute('aria-expanded', 'true')

        await user.click(toggle)
        expect(toggle).toHaveAttribute('aria-expanded', 'false')

        await user.click(toggle)
        expect(toggle).toHaveAttribute('aria-expanded', 'true')
    })

    it('reflects controlled state and calls onToggleExpand', async () => {
        const user = userEvent.setup()
        const onToggleExpand = jest.fn()
        renderPanel({ isExpanded: false, onToggleExpand })

        const toggle = screen.getByRole('button', { name: 'Toggle section' })
        expect(toggle).toHaveAttribute('aria-expanded', 'false')

        await user.click(toggle)
        expect(onToggleExpand).toHaveBeenCalledTimes(1)
    })

    it('renders a full-width button toggle (named by its children) when given children', async () => {
        const user = userEvent.setup()
        renderButtonTogglePanel({ initiallyExpanded: true })

        const toggle = screen.getByRole('button', { name: 'Section label' })
        expect(toggle).toHaveAttribute('aria-expanded', 'true')
        expect(toggle).toHaveAttribute('aria-controls', 'panel-content')

        await user.click(toggle)
        expect(toggle).toHaveAttribute('aria-expanded', 'false')
    })
})
