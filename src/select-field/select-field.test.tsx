import { useState } from 'react'
import { render, screen } from '@testing-library/react'
import { SelectField } from './'
import userEvent from '@testing-library/user-event'
import { axe } from 'jest-axe'

describe('SelectField', () => {
    it('supports having an externally provided id attribute', () => {
        render(<SelectField data-testid="select-field" id="custom-id" label="Province" />)
        expect(screen.getByTestId('select-field').id).toBe('custom-id')
        // Makes sure that even with the custom id, the label is still associated to the input element
        expect(screen.getByTestId('select-field')).toHaveAccessibleName('Province')
    })

    it('is labelled by its label', () => {
        render(<SelectField data-testid="select-field" label="Phone" />)
        expect(screen.getByTestId('select-field')).toHaveAccessibleName('Phone')
    })

    it('can be labelled via aria-label', () => {
        render(
            <SelectField data-testid="select-field" label="Phone" aria-label="Your phone number" />,
        )
        expect(screen.getByTestId('select-field')).toHaveAccessibleName('Your phone number')
    })

    it('can be labelled via aria-labelledby', () => {
        render(
            <>
                <SelectField
                    data-testid="select-field"
                    label="Phone"
                    aria-labelledby="custom-label"
                />
                <div id="custom-label">Your phone number</div>
            </>,
        )
        expect(screen.getByTestId('select-field')).toHaveAccessibleName('Your phone number')
    })

    it('is described by its message when provided', () => {
        render(
            <SelectField data-testid="select-field" label="Phone" message="So we can call you" />,
        )
        expect(screen.getByTestId('select-field')).toHaveAccessibleDescription('So we can call you')
    })

    it('can be described by something else via aria-describedby', () => {
        render(
            <>
                <SelectField
                    data-testid="select-field"
                    label="Phone"
                    message="So we can call you"
                    aria-describedby="custom-message"
                />
                <div id="custom-message">This is the phone where we will call you</div>
            </>,
        )
        expect(screen.getByTestId('select-field')).toHaveAccessibleDescription(
            'This is the phone where we will call you',
        )
    })

    it('is marked as invalid and when tone="error"', () => {
        render(<SelectField data-testid="select-field" label="Theme" tone="error" />)
        expect(screen.getByTestId('select-field')).toBeInvalid()
    })

    it('uses the message as the description, whenever the tone is not error', () => {
        render(
            <SelectField
                data-testid="select-field"
                label="Theme"
                message="Your theme preference has been saved"
                tone="success"
            />,
        )
        expect(screen.getByTestId('select-field')).toHaveAccessibleDescription(
            'Your theme preference has been saved',
        )
    })

    it.each([['success' as const], ['loading' as const], ['neutral' as const], ['error' as const]])(
        'uses the message as the description, when tone="%s"',
        (tone) => {
            render(
                <SelectField
                    data-testid="select-field"
                    label="Theme"
                    message={`Message with ${tone} tone`}
                    tone={tone}
                />,
            )
            expect(screen.getByTestId('select-field')).toHaveAccessibleDescription(
                `Message with ${tone} tone`,
            )
        },
    )

    it('adds the message as part of the description, whenever the tone is not error', () => {
        render(
            <SelectField
                data-testid="select-field"
                label="Theme"
                message="Select the theme that you like"
                tone="success"
            />,
        )
        expect(screen.getByTestId('select-field')).toHaveAccessibleDescription(
            'Select the theme that you like',
        )
    })

    it('renders its auxiliary label', () => {
        render(<SelectField label="Theme" auxiliaryLabel={<a href="/help">About themes</a>} />)
        expect(screen.getByRole('link', { name: 'About themes' })).toBeInTheDocument()
    })

    it('does not use the auxiliary label for semantic labelling purposes', () => {
        render(<SelectField label="Theme" auxiliaryLabel={<a href="/help">About themes</a>} />)
        expect(screen.getByRole('combobox', { name: 'Theme' })).toHaveAccessibleName('Theme')
        expect(screen.getByRole('combobox', { name: 'Theme' })).not.toHaveAccessibleDescription()
    })

    it('supports providing an alternative type', () => {
        render(<SelectField label="Email" type="email" />)
        expect(screen.getByRole('combobox', { name: 'Email' })).toHaveAttribute('type', 'email')
    })

    it('is hidden when hidden={true}', () => {
        const { rerender } = render(
            <SelectField
                data-testid="select-field"
                label="Province"
                message="We need it for billing purposes"
                hidden
            />,
        )

        const selectField = screen.getByTestId('select-field')
        const messageElement = screen.getByText('We need it for billing purposes')

        // check that it is rendered but not visible
        expect(selectField).not.toBeVisible()
        expect(messageElement).not.toBeVisible()
        expect(screen.queryByRole('combobox', { name: 'Province' })).not.toBeInTheDocument()
        expect(screen.getByText('Province')).toBeInTheDocument()

        // check that it becomes visible when hidden is removed
        rerender(
            <SelectField
                data-testid="select-field"
                label="Province"
                message="We need it for billing purposes"
            />,
        )
        expect(selectField).toBeVisible()
        expect(messageElement).toBeVisible()
        expect(screen.getByRole('combobox', { name: 'Province' })).toBeInTheDocument()
        expect(screen.getByText('Province')).toBeInTheDocument()
    })

    it('forwards to the select element any extra props provided to it', () => {
        render(
            <SelectField
                label="Visual label"
                aria-label="Non-visual label"
                data-testid="select-field"
                data-something="whatever"
            />,
        )
        const selectElement = screen.getByTestId('select-field')
        expect(selectElement.tagName).toBe('SELECT')
        expect(selectElement).toHaveAttribute('aria-label', 'Non-visual label')
        expect(selectElement).toHaveAttribute('data-testid', 'select-field')
        expect(selectElement).toHaveAttribute('data-something', 'whatever')
    })

    it('allows to select from the options', () => {
        render(
            <SelectField label="Theme" defaultValue="-">
                <option value="-" disabled>
                    Select theme
                </option>
                <option value="light">Light theme</option>
                <option value="dark">Dark theme</option>
            </SelectField>,
        )

        const selectElement = screen.getByRole('combobox', { name: 'Theme' })
        expect(selectElement).toHaveValue('-')
        expect(selectElement).toHaveDisplayValue('Select theme')

        userEvent.selectOptions(selectElement, 'light')
        expect(selectElement).toHaveValue('light')
        expect(selectElement).toHaveDisplayValue('Light theme')

        userEvent.selectOptions(selectElement, 'dark')
        expect(selectElement).toHaveValue('dark')
        expect(selectElement).toHaveDisplayValue('Dark theme')
    })

    it('can be disabled', () => {
        render(
            <SelectField label="Theme" defaultValue="dark" disabled>
                <option value="light">Light theme</option>
                <option value="dark">Dark theme</option>
            </SelectField>,
        )

        const selectElement = screen.getByRole('combobox', { name: 'Theme' })
        expect(selectElement).toBeDisabled()
        expect(selectElement).toHaveValue('dark')
        userEvent.selectOptions(selectElement, 'light')
        expect(selectElement).toHaveValue('dark')
    })

    it('can be a controlled select field', () => {
        function TestCase() {
            const [theme, setTheme] = useState('dark')
            return (
                <div data-testid="container" data-theme={theme}>
                    <SelectField
                        label="Theme"
                        value={theme}
                        onChange={(event) => setTheme(event.currentTarget.value)}
                    >
                        <option value="light">Light theme</option>
                        <option value="dark">Dark theme</option>
                    </SelectField>
                </div>
            )
        }

        render(<TestCase />)
        const selectElement = screen.getByRole('combobox', { name: 'Theme' })
        expect(selectElement).toHaveValue('dark')
        expect(screen.getByTestId('container')).toHaveAttribute('data-theme', 'dark')

        userEvent.selectOptions(selectElement, 'light')
        expect(selectElement).toHaveValue('light')
        expect(selectElement).toHaveDisplayValue('Light theme')
        expect(screen.getByTestId('container')).toHaveAttribute('data-theme', 'light')
    })

    it('supports providing a variant', () => {
        render(<SelectField label="Email" type="email" variant="bordered" />)

        expect(screen.getByTestId('select-wrapper')).toHaveClass('bordered')
    })

    describe('a11y', () => {
        it('renders with no a11y violations', async () => {
            const { container } = render(
                <>
                    <SelectField label="Province" />
                    <SelectField label="Province" disabled />
                    <SelectField label="Province" message="Select a province" />
                </>,
            )
            const results = await axe(container)

            expect(results).toHaveNoViolations()
        })
    })
})
