import * as React from 'react'
import { render, screen } from '@testing-library/react'
import { CheckboxField } from '.'
import userEvent from '@testing-library/user-event'
import { axe } from 'jest-axe'

describe('CheckboxField', () => {
    function IndeterminateTestCase({ initialState }: { initialState: boolean[] }) {
        const [state, setState] = React.useState<boolean[]>(initialState)
        const checkedCount = state.filter(Boolean).length
        const indeterminate = checkedCount > 0 && checkedCount < state.length

        return (
            <div>
                <CheckboxField
                    data-testid="main-checkbox"
                    checked={checkedCount === state.length}
                    onChange={(event) => {
                        const { checked } = event.currentTarget
                        setState((state) => state.map(() => checked))
                    }}
                    indeterminate={indeterminate}
                    label={`Check/uncheck all (${checkedCount} / ${state.length})`}
                />

                <div>
                    {state.map((checked, index) => (
                        <CheckboxField
                            key={`${index}-${String(checked)}`}
                            data-testid="checkbox-item"
                            label={String(index + 1)}
                            checked={checked}
                            onChange={(event) => {
                                const { checked } = event.currentTarget
                                setState((state) => {
                                    const newState = [...state]
                                    newState[index] = checked
                                    return newState
                                })
                            }}
                        />
                    ))}
                </div>
            </div>
        )
    }

    it('supports having an externally provided id attribute', () => {
        render(
            <CheckboxField data-testid="checkbox-field" id="custom-id" label="Show unread badge" />,
        )
        expect(screen.getByTestId('checkbox-field').id).toBe('custom-id')
        // Makes sure that even with the custom id, the label is still associated to the input element
        expect(screen.getByTestId('checkbox-field')).toHaveAccessibleName('Show unread badge')
    })

    it('is labelled by its label', () => {
        render(<CheckboxField data-testid="checkbox-field" label="Show completed tasks" />)
        expect(screen.getByTestId('checkbox-field')).toHaveAccessibleName('Show completed tasks')
    })

    it('issues a warning if no label is given', () => {
        /* eslint-disable no-console */
        const originalConsoleWarn = console.warn
        console.warn = jest.fn()

        render(<CheckboxField />)
        expect(console.warn).toHaveBeenCalledWith(expect.stringMatching(/needs a label/))

        console.warn = originalConsoleWarn
        /* eslint-enable no-console */
    })

    it('is hidden when hidden={true}', () => {
        const { rerender } = render(
            <CheckboxField data-testid="checkbox-field" label="Show unread badge" hidden />,
        )

        const inputField = screen.getByTestId('checkbox-field')

        // check that it is rendered but not visible
        expect(inputField).not.toBeVisible()
        expect(
            screen.queryByRole('checkbox', { name: 'Show unread badge' }),
        ).not.toBeInTheDocument()

        // check that it becomes visible when hidden is removed
        rerender(<CheckboxField data-testid="checkbox-field" label="Show unread badge" />)
        expect(inputField).toBeVisible()
        expect(screen.getByRole('checkbox', { name: 'Show unread badge' })).toBeInTheDocument()
    })

    it('forwards to the input element any extra props provided to it', () => {
        render(
            <CheckboxField
                label="Visual label"
                aria-label="Non-visual label"
                data-testid="checkbox-field"
                data-something="whatever"
            />,
        )
        const switchElement = screen.getByTestId('checkbox-field')
        expect(switchElement.tagName).toBe('INPUT')
        expect(switchElement).toHaveAttribute('type', 'checkbox')
        expect(switchElement).toHaveAttribute('aria-label', 'Non-visual label')
        expect(switchElement).toHaveAttribute('data-testid', 'checkbox-field')
        expect(switchElement).toHaveAttribute('data-something', 'whatever')
    })

    it('allows to be toggled on and off', () => {
        render(<CheckboxField label="Accept terms and conditions" />)

        const switchElement = screen.getByRole('checkbox', { name: 'Accept terms and conditions' })
        expect(switchElement).not.toBeChecked()

        userEvent.click(switchElement)
        expect(switchElement).toBeChecked()

        userEvent.click(switchElement)
        expect(switchElement).not.toBeChecked()
    })

    it('can be disabled', () => {
        render(<CheckboxField label="Accept terms and conditions" disabled />)
        const switchElement = screen.getByRole('checkbox', { name: 'Accept terms and conditions' })
        expect(switchElement).toBeDisabled()
        expect(switchElement).not.toBeChecked()
        userEvent.click(switchElement)
        expect(switchElement).not.toBeChecked()
    })

    it('can be uncontrolled and set to true by default', () => {
        render(<CheckboxField label="Accept terms and conditions" defaultChecked />)
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
                    <CheckboxField
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

    describe('indeterminate', () => {
        function getCheckboxItem(index: number): HTMLElement {
            const checkbox = screen.getAllByTestId('checkbox-item')[index]

            if (!checkbox) throw new Error('Checkbox not found')

            return checkbox
        }

        it('can be set as indeterminate when it is a controlled component', () => {
            render(<IndeterminateTestCase initialState={[false, true, false]} />)
            const mainCheckbox = screen.getByTestId('main-checkbox')

            // it's initially indeterminate
            expect(mainCheckbox).toBePartiallyChecked()

            // check two remaining unchecked checkboxes, and it ceases to be indeterminate
            userEvent.click(getCheckboxItem(0))
            userEvent.click(getCheckboxItem(2))
            expect(mainCheckbox).toBeChecked()

            // uncheck all checkboxes one by one, and gradually check main checkbox status along the way
            userEvent.click(getCheckboxItem(0))
            expect(mainCheckbox).toBePartiallyChecked()
            expect(mainCheckbox).not.toBeChecked()

            // …second one
            userEvent.click(getCheckboxItem(1))
            expect(mainCheckbox).toBePartiallyChecked()
            expect(mainCheckbox).not.toBeChecked()

            // …last one
            userEvent.click(getCheckboxItem(2))
            expect(mainCheckbox).not.toBePartiallyChecked()
            expect(mainCheckbox).not.toBeChecked()

            // check them all via the main checkbox
            userEvent.click(mainCheckbox)
            expect(mainCheckbox).toBeChecked()
            expect(mainCheckbox).not.toBePartiallyChecked()

            // uncheck a single checkbox item
            userEvent.click(getCheckboxItem(2))
            expect(mainCheckbox).not.toBeChecked()
            expect(mainCheckbox).toBePartiallyChecked()
        })

        it('cannot be used as indeterminate when component is uncontrolled', () => {
            /* eslint-disable no-console */
            const originalConsoleWarn = console.warn
            console.warn = jest.fn()

            render(<CheckboxField label="Main checkbox" indeterminate={true} />)
            expect(console.warn).toHaveBeenCalledWith(
                expect.stringMatching(/indeterminate.+uncontrolled/),
            )

            console.warn = originalConsoleWarn
            /* eslint-enable no-console */
        })
    })

    describe('a11y', () => {
        test('renders with no a11y violations', async () => {
            const { container } = render(<CheckboxField label="Show completed tasks" />)
            const results = await axe(container)

            expect(results).toHaveNoViolations()
        })

        it('supports the `aria-label` attribute', () => {
            render(
                <CheckboxField
                    data-testid="checkbox-field"
                    label="Show completed tasks"
                    aria-label="Show completed tasks by default"
                />,
            )
            expect(screen.getByTestId('checkbox-field')).toHaveAccessibleName(
                'Show completed tasks by default',
            )
        })

        it('supports the `aria-labelledby` attribute', () => {
            render(
                <>
                    <CheckboxField
                        data-testid="checkbox-field"
                        label="Show completed tasks"
                        aria-labelledby="custom-label"
                    />
                    <div id="custom-label">Show completed tasks by default</div>
                </>,
            )
            expect(screen.getByTestId('checkbox-field')).toHaveAccessibleName(
                'Show completed tasks by default',
            )
        })

        it('supports the `aria-describedby` attribute', () => {
            render(
                <>
                    <CheckboxField
                        data-testid="checkbox-field"
                        label="Show completed tasks"
                        aria-describedby="custom-hint"
                    />
                    <div id="custom-hint">Always show your completed tasks by default</div>
                </>,
            )
            expect(screen.getByTestId('checkbox-field')).toHaveAccessibleDescription(
                'Always show your completed tasks by default',
            )
        })

        it('supports the `aria-controls` attribute', () => {
            render(
                <>
                    <CheckboxField
                        data-testid="checkbox-field"
                        label="Parent checkbox"
                        aria-controls="child-checkbox"
                    />
                    <CheckboxField id="child-checkbox" label="Child checkbox" />
                </>,
            )
            expect(screen.getByTestId('checkbox-field')).toHaveAttribute(
                'aria-controls',
                'child-checkbox',
            )
        })

        it('updates the `aria-checked` attribute correctly', () => {
            render(<IndeterminateTestCase initialState={[false, true, false]} />)
            const mainCheckbox = screen.getByTestId('main-checkbox')

            // it's initially indeterminate
            expect(mainCheckbox).toHaveAttribute('aria-checked', 'mixed')

            // updates to 'true' when clicked while mixed
            userEvent.click(mainCheckbox)
            expect(mainCheckbox).toHaveAttribute('aria-checked', 'true')

            // updates to 'false' when clicked while true
            userEvent.click(mainCheckbox)
            expect(mainCheckbox).toHaveAttribute('aria-checked', 'false')
        })
    })
})
