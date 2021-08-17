import * as React from 'react'
import { render, screen } from '@testing-library/react'
import { TextField } from './'
import userEvent from '@testing-library/user-event'

describe('TextField', () => {
    it('supports having an externally provided id attribute', () => {
        render(<TextField data-testid="text-field" id="custom-id" label="Whatʼs your name?" />)
        expect(screen.getByTestId('text-field').id).toBe('custom-id')
        // Makes sure that even with the custom id, the label is still associated to the input element
        expect(screen.getByTestId('text-field')).toHaveAccessibleName('Whatʼs your name?')
    })

    it('is labelled by its label and secondary label', () => {
        const { rerender } = render(<TextField data-testid="text-field" label="Phone" />)
        expect(screen.getByTestId('text-field')).toHaveAccessibleName('Phone')

        rerender(<TextField data-testid="text-field" label="Phone" secondaryLabel="home" />)
        expect(screen.getByTestId('text-field')).toHaveAccessibleName('Phone (home)')
    })

    it('can be labelled via aria-label', () => {
        render(<TextField data-testid="text-field" label="Phone" aria-label="Your phone number" />)
        expect(screen.getByTestId('text-field')).toHaveAccessibleName('Your phone number')
    })

    it('can be labelled via aria-labelledby', () => {
        render(
            <>
                <TextField data-testid="text-field" label="Phone" aria-labelledby="custom-label" />
                <div id="custom-label">Your phone number</div>
            </>,
        )
        expect(screen.getByTestId('text-field')).toHaveAccessibleName('Your phone number')
    })

    it('is described by its hint when provided', () => {
        render(<TextField data-testid="text-field" label="Phone" hint="So we can call you" />)
        expect(screen.getByTestId('text-field')).toHaveAccessibleDescription('So we can call you')
    })

    it('can be described by something else via aria-describedby', () => {
        render(
            <>
                <TextField
                    data-testid="text-field"
                    label="Phone"
                    hint="So we can call you"
                    aria-describedby="custom-hint"
                />
                <div id="custom-hint">This is the phone where we will call you</div>
            </>,
        )
        expect(screen.getByTestId('text-field')).toHaveAccessibleDescription(
            'This is the phone where we will call you',
        )
    })

    it('renders its auxiliary label', () => {
        render(<TextField label="VAT ID" auxiliaryLabel={<a href="/help">Whatʼs this?</a>} />)
        expect(screen.getByRole('link', { name: 'Whatʼs this?' })).toBeInTheDocument()
    })

    it('does not use the auxiliary label for semantic labelling purposes', () => {
        render(<TextField label="VAT ID" auxiliaryLabel={<a href="/help">Whatʼs this?</a>} />)
        expect(screen.getByRole('textbox', { name: 'VAT ID' })).toHaveAccessibleName('VAT ID')
        expect(screen.getByRole('textbox', { name: 'VAT ID' })).not.toHaveAccessibleDescription()
    })

    it('can have a placeholder text', () => {
        render(
            <TextField
                label="Email"
                data-testid="text-field"
                placeholder="Enter your email address"
            />,
        )
        expect(screen.getByTestId('text-field')).toBe(
            screen.getByPlaceholderText('Enter your email address'),
        )
    })

    it('supports providing an alternative type', () => {
        render(<TextField label="Email" type="email" />)
        expect(screen.getByRole('textbox', { name: 'Email' })).toHaveAttribute('type', 'email')
    })

    it('is hidden when hidden={true}', () => {
        const { rerender } = render(
            <TextField data-testid="text-field" label="Whatʼs your name?" hidden />,
        )

        // check that it is rendered but not visible
        expect(screen.getByTestId('text-field')).not.toBeVisible()
        expect(screen.queryByRole('textbox', { name: 'Whatʼs your name?' })).not.toBeInTheDocument()
        expect(screen.getByText(/your name/i)).toBeInTheDocument()

        // check that it becomes visible when hidden is removed
        rerender(<TextField data-testid="text-field" label="Whatʼs your name?" />)
        expect(screen.getByTestId('text-field')).toBeVisible()
        expect(screen.getByRole('textbox', { name: 'Whatʼs your name?' })).toBeInTheDocument()
        expect(screen.getByText(/your name/i)).toBeInTheDocument()
    })

    it('forwards to the input element any extra props provided to it', () => {
        render(
            <TextField
                label="Visual label"
                aria-label="Non-visual label"
                data-testid="text-field"
                data-something="whatever"
            />,
        )
        const inputElement = screen.getByTestId('text-field')
        expect(inputElement.tagName).toBe('INPUT')
        expect(inputElement).toHaveAttribute('aria-label', 'Non-visual label')
        expect(inputElement).toHaveAttribute('data-testid', 'text-field')
        expect(inputElement).toHaveAttribute('data-something', 'whatever')
    })

    it('allows to type text into it', () => {
        render(<TextField label="Whatʼs your job title?" />)
        const inputElement = screen.getByRole('textbox', { name: 'Whatʼs your job title?' })
        expect(inputElement).toHaveValue('')
        userEvent.type(inputElement, 'Software developer')
        expect(inputElement).toHaveValue('Software developer')
    })

    it('can be disabled', () => {
        render(<TextField label="Whatʼs your job title?" disabled />)
        const inputElement = screen.getByRole('textbox', { name: 'Whatʼs your job title?' })
        expect(inputElement).toBeDisabled()
        expect(inputElement).toHaveValue('')
        userEvent.type(inputElement, 'Software developer')
        expect(inputElement).toHaveValue('')
    })

    it('can be readonly', () => {
        render(<TextField label="Whatʼs your job title?" readOnly />)
        const inputElement = screen.getByRole('textbox', { name: 'Whatʼs your job title?' })
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
                    <TextField
                        label="Whatʼs your job title?"
                        value={value}
                        onChange={(event) => setValue(event.currentTarget.value)}
                    />
                    <div data-testid="value">{value}</div>
                </>
            )
        }

        render(<TestCase />)
        const inputElement = screen.getByRole('textbox', { name: 'Whatʼs your job title?' })
        expect(inputElement).toHaveValue('')
        userEvent.type(inputElement, 'Software developer')
        expect(inputElement).toHaveValue('Software developer')
        expect(screen.getByTestId('value')).toHaveTextContent('Software developer')
    })
})
