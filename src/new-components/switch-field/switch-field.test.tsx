import * as React from 'react'
import { render, screen } from '@testing-library/react'
import { SwitchField } from './'
import userEvent from '@testing-library/user-event'

describe('SwitchField', () => {
    it('supports having an externally provided id attribute', () => {
        render(<SwitchField data-testid="switch-field" id="custom-id" label="Show unread badge" />)
        expect(screen.getByTestId('switch-field').id).toBe('custom-id')
        // Makes sure that even with the custom id, the label is still associated to the input element
        expect(screen.getByTestId('switch-field')).toHaveAccessibleName('Show unread badge')
    })

    it('is labelled by its label', () => {
        render(<SwitchField data-testid="switch-field" label="Show completed tasks" />)
        expect(screen.getByTestId('switch-field')).toHaveAccessibleName('Show completed tasks')
    })

    it('can be labelled via aria-label', () => {
        render(
            <SwitchField
                data-testid="switch-field"
                label="Show completed tasks"
                aria-label="Show completed tasks by default"
            />,
        )
        expect(screen.getByTestId('switch-field')).toHaveAccessibleName(
            'Show completed tasks by default',
        )
    })

    it('can be labelled via aria-labelledby', () => {
        render(
            <>
                <SwitchField
                    data-testid="switch-field"
                    label="Show completed tasks"
                    aria-labelledby="custom-label"
                />
                <div id="custom-label">Show completed tasks by default</div>
            </>,
        )
        expect(screen.getByTestId('switch-field')).toHaveAccessibleName(
            'Show completed tasks by default',
        )
    })

    it('is described by its hint when provided', () => {
        render(
            <SwitchField
                data-testid="switch-field"
                label="Show completed tasks"
                hint="Show completed tasks by default"
            />,
        )
        expect(screen.getByTestId('switch-field')).toHaveAccessibleDescription(
            'Show completed tasks by default',
        )
    })

    it('can be described by something else via aria-describedby', () => {
        render(
            <>
                <SwitchField
                    data-testid="switch-field"
                    label="Show completed tasks"
                    hint="Show completed tasks by default"
                    aria-describedby="custom-hint"
                />
                <div id="custom-hint">Always show your completed tasks by default</div>
            </>,
        )
        expect(screen.getByTestId('switch-field')).toHaveAccessibleDescription(
            'Always show your completed tasks by default',
        )
    })

    it('is hidden when hidden={true}', () => {
        const { rerender } = render(
            <SwitchField
                data-testid="switch-field"
                label="Show unread badge"
                hint="Show an icon badge to indicate that there are new threads and messages."
                hidden
            />,
        )

        const inputField = screen.getByTestId('switch-field')
        const hintElement = screen.getByText(
            'Show an icon badge to indicate that there are new threads and messages.',
        )

        // check that it is rendered but not visible
        expect(inputField).not.toBeVisible()
        expect(
            screen.queryByRole('checkbox', { name: 'Show unread badge' }),
        ).not.toBeInTheDocument()
        expect(hintElement).not.toBeVisible()

        // check that it becomes visible when hidden is removed
        rerender(
            <SwitchField
                data-testid="switch-field"
                label="Show unread badge"
                hint="We need it for billing purposes"
            />,
        )
        expect(inputField).toBeVisible()
        expect(screen.getByRole('checkbox', { name: 'Show unread badge' })).toBeInTheDocument()
        expect(hintElement).toBeVisible()
    })

    it('forwards to the input element any extra props provided to it', () => {
        render(
            <SwitchField
                label="Visual label"
                aria-label="Non-visual label"
                data-testid="switch-field"
                data-something="whatever"
            />,
        )
        const switchElement = screen.getByTestId('switch-field')
        expect(switchElement.tagName).toBe('INPUT')
        expect(switchElement).toHaveAttribute('type', 'checkbox')
        expect(switchElement).toHaveAttribute('aria-label', 'Non-visual label')
        expect(switchElement).toHaveAttribute('data-testid', 'switch-field')
        expect(switchElement).toHaveAttribute('data-something', 'whatever')
    })

    it('allows to be toggled on and off', () => {
        render(<SwitchField label="Accept terms and conditions" />)

        const switchElement = screen.getByRole('checkbox', { name: 'Accept terms and conditions' })
        expect(switchElement).not.toBeChecked()

        userEvent.click(switchElement)
        expect(switchElement).toBeChecked()

        userEvent.click(switchElement)
        expect(switchElement).not.toBeChecked()
    })

    it('can be disabled', () => {
        render(<SwitchField label="Accept terms and conditions" disabled />)
        const switchElement = screen.getByRole('checkbox', { name: 'Accept terms and conditions' })
        expect(switchElement).toBeDisabled()
        expect(switchElement).not.toBeChecked()
        userEvent.click(switchElement)
        expect(switchElement).not.toBeChecked()
    })

    it('can be uncontrolled and set to true by default', () => {
        render(<SwitchField label="Accept terms and conditions" defaultChecked />)
        const switchElement = screen.getByRole('checkbox', { name: 'Accept terms and conditions' })
        expect(switchElement).toBeChecked()
        userEvent.click(switchElement)
        expect(switchElement).not.toBeChecked()
    })

    it('can be a controlled input field', () => {
        function TestCase() {
            const [checked, setChecked] = React.useState(false)
            return (
                <>
                    <SwitchField
                        label="Accept terms and conditions"
                        checked={checked}
                        onChange={(event) => setChecked(event.currentTarget.checked)}
                    />
                    <div data-testid="value">{checked ? 'on' : 'off'}</div>
                </>
            )
        }

        render(<TestCase />)
        const switchElement = screen.getByRole('checkbox', { name: 'Accept terms and conditions' })
        expect(switchElement).not.toBeChecked()
        expect(screen.getByTestId('value')).toHaveTextContent('off')

        userEvent.click(switchElement)
        expect(switchElement).toBeChecked()
        expect(screen.getByTestId('value')).toHaveTextContent('on')

        userEvent.click(switchElement)
        expect(switchElement).not.toBeChecked()
        expect(screen.getByTestId('value')).toHaveTextContent('off')
    })
})
