import * as React from 'react'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { PasswordField } from './'

describe('PasswordField', () => {
    it('supports having an externally provided id attribute', () => {
        render(<PasswordField data-testid="password-field" id="custom-id" label="New Password" />)
        expect(screen.getByTestId('password-field').id).toBe('custom-id')
        // Makes sure that even with the custom id, the label is still associated to the input element
        expect(screen.getByTestId('password-field')).toHaveAccessibleName('New Password')
    })

    it('is labelled by its label and secondary label', () => {
        const { rerender } = render(<PasswordField data-testid="password-field" label="Phone" />)
        expect(screen.getByTestId('password-field')).toHaveAccessibleName('Phone')

        rerender(<PasswordField data-testid="password-field" label="Phone" secondaryLabel="home" />)
        expect(screen.getByTestId('password-field')).toHaveAccessibleName('Phone (home)')
    })

    it('can be labelled via aria-label', () => {
        render(
            <PasswordField
                data-testid="password-field"
                label="Phone"
                aria-label="Your phone number"
            />,
        )
        expect(screen.getByTestId('password-field')).toHaveAccessibleName('Your phone number')
    })

    it('can be labelled via aria-labelledby', () => {
        render(
            <>
                <PasswordField
                    data-testid="password-field"
                    label="Phone"
                    aria-labelledby="custom-label"
                />
                <div id="custom-label">Your phone number</div>
            </>,
        )
        expect(screen.getByTestId('password-field')).toHaveAccessibleName('Your phone number')
    })

    it('is described by its hint when provided', () => {
        render(
            <PasswordField data-testid="password-field" label="Phone" hint="So we can call you" />,
        )
        expect(screen.getByTestId('password-field')).toHaveAccessibleDescription(
            'So we can call you',
        )
    })

    it('can be described by something else via aria-describedby', () => {
        render(
            <>
                <PasswordField
                    data-testid="password-field"
                    label="Phone"
                    hint="So we can call you"
                    aria-describedby="custom-hint"
                />
                <div id="custom-hint">This is the phone where we will call you</div>
            </>,
        )
        expect(screen.getByTestId('password-field')).toHaveAccessibleDescription(
            'This is the phone where we will call you',
        )
    })

    it('renders its auxiliary label', () => {
        render(
            <PasswordField
                label="New Password"
                auxiliaryLabel={<a href="/help">Whatʼs this?</a>}
            />,
        )
        expect(screen.getByRole('link', { name: 'Whatʼs this?' })).toBeInTheDocument()
    })

    it('does not use the auxiliary label for semantic labelling purposes', () => {
        render(
            <PasswordField
                data-testid="password-field"
                label="New Password"
                auxiliaryLabel={<a href="/help">Whatʼs this?</a>}
            />,
        )
        expect(screen.getByTestId('password-field')).toHaveAccessibleName('New Password')
        expect(screen.getByTestId('password-field')).not.toHaveAccessibleDescription()
    })

    it('can have a placeholder text', () => {
        render(
            <PasswordField
                label="Email"
                data-testid="password-field"
                placeholder="Enter your email address"
            />,
        )
        expect(screen.getByTestId('password-field')).toBe(
            screen.getByPlaceholderText('Enter your email address'),
        )
    })

    it('renders an input with type="password" and does not allow providing an alternative type', () => {
        const { rerender } = render(<PasswordField data-testid="password-field" label="Password" />)

        const passwordField = screen.getByTestId('password-field')
        expect(passwordField).toHaveAttribute('type', 'password')

        rerender(
            <PasswordField
                label="Password"
                // @ts-expect-error
                type="text"
            />,
        )
        expect(passwordField).toHaveAttribute('type', 'password')
    })

    it('allows to toggle visibility of the password value', () => {
        render(<PasswordField data-testid="password-field" label="Password" />)

        const passwordField = screen.getByTestId('password-field')
        const togglePasswordButton = screen.getByRole('button', {
            name: 'Toggle password visibility',
        })

        expect(passwordField).toHaveAttribute('type', 'password')

        userEvent.click(togglePasswordButton)
        expect(passwordField).toHaveAttribute('type', 'text')

        userEvent.click(screen.getByRole('button', { name: 'Toggle password visibility' }))
        expect(passwordField).toHaveAttribute('type', 'password')
    })

    it('is hidden when hidden={true}', () => {
        const { rerender } = render(
            <PasswordField
                data-testid="password-field"
                label="New Password"
                hint="Must be at least 8 characters long"
                hidden
            />,
        )

        const inputField = screen.getByTestId('password-field')
        const hintElement = screen.getByText('Must be at least 8 characters long')

        // check that it is rendered but not visible
        expect(inputField).not.toBeVisible()
        expect(hintElement).not.toBeVisible()

        // check that it becomes visible when hidden is removed
        rerender(
            <PasswordField
                data-testid="password-field"
                label="New Password"
                hint="Must be at least 8 characters long"
            />,
        )
        expect(inputField).toBeVisible()
        expect(hintElement).toBeVisible()
    })

    it('forwards to the input element any extra props provided to it', () => {
        render(
            <PasswordField
                label="Visual label"
                aria-label="Non-visual label"
                data-testid="password-field"
                data-something="whatever"
            />,
        )
        const inputElement = screen.getByTestId('password-field')
        expect(inputElement.tagName).toBe('INPUT')
        expect(inputElement).toHaveAttribute('aria-label', 'Non-visual label')
        expect(inputElement).toHaveAttribute('data-testid', 'password-field')
        expect(inputElement).toHaveAttribute('data-something', 'whatever')
    })

    it('allows to type text into it', () => {
        render(<PasswordField data-testid="password-field" label="Confirm Password" />)
        const inputElement = screen.getByTestId('password-field')
        expect(inputElement).toHaveValue('')
        userEvent.type(inputElement, 'super-p4$$w0rd')
        expect(inputElement).toHaveValue('super-p4$$w0rd')
    })

    it('can be disabled', () => {
        render(<PasswordField data-testid="password-field" label="Confirm Password" disabled />)
        const inputElement = screen.getByTestId('password-field')
        expect(inputElement).toBeDisabled()
        expect(inputElement).toHaveValue('')
        userEvent.type(inputElement, 'Software developer')
        expect(inputElement).toHaveValue('')
    })

    it('can be readonly', () => {
        render(<PasswordField data-testid="password-field" label="Confirm Password" readOnly />)
        const inputElement = screen.getByTestId('password-field')
        expect(inputElement).not.toBeDisabled()
        expect(inputElement).toHaveValue('')
        userEvent.type(inputElement, 'Software developer')
        expect(inputElement).toHaveValue('')
    })

    it('can be a controlled input field', () => {
        function TestCase() {
            const [value, setValue] = React.useState('')
            return (
                <>
                    <PasswordField
                        data-testid="password-field"
                        label="New Password"
                        value={value}
                        onChange={(event) => setValue(event.currentTarget.value)}
                    />
                    <div data-testid="value">{value}</div>
                </>
            )
        }

        render(<TestCase />)
        const inputElement = screen.getByTestId('password-field')
        expect(inputElement).toHaveValue('')
        userEvent.type(inputElement, 'password value')
        expect(inputElement).toHaveValue('password value')
        expect(screen.getByTestId('value')).toHaveTextContent('password value')
    })
})
