import * as React from 'react'

import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'

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

describe('ExpansionPanel', () => {
    it('wires the toggle to the content via aria-controls', () => {
        renderPanel()

        const toggle = screen.getByRole('button', { name: 'Toggle section' })
        expect(toggle).toHaveAttribute('aria-controls', 'panel-content')
        expect(document.getElementById('panel-content')).toBeInTheDocument()
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
})
