import * as React from 'react'
import { render, screen } from '@testing-library/react'
import { TextField } from './'
import userEvent from '@testing-library/user-event'
import { axe } from 'jest-axe'

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

    it('is marked as invalid and when tone="error"', () => {
        render(<TextField data-testid="text-field" label="Verification code" tone="error" />)
        expect(screen.getByTestId('text-field')).toBeInvalid()
    })

    it.each([['success' as const], ['loading' as const], ['neutral' as const], ['error' as const]])(
        'uses the message as the description, when tone="%s"',
        (tone) => {
            render(
                <TextField
                    data-testid="text-field"
                    label="Verification code"
                    message={`Message with ${tone} tone`}
                    tone={tone}
                />,
            )
            expect(screen.getByTestId('text-field')).toHaveAccessibleDescription(
                `Message with ${tone} tone`,
            )
        },
    )

    it('adds the message as part of the description, whenever the tone is not error', () => {
        render(
            <TextField
                data-testid="text-field"
                label="Verification code"
                hint="Paste in the verification code"
                message="Verification successful"
                tone="success"
            />,
        )
        expect(screen.getByTestId('text-field')).toHaveAccessibleDescription(
            'Verification successful Paste in the verification code',
        )
    })

    it('renders its auxiliary label', () => {
        render(<TextField label="VAT ID" auxiliaryLabel={<a href="/help">Whatʼs this?</a>} />)
        expect(screen.getByRole('link', { name: 'Whatʼs this?' })).toBeInTheDocument()
    })

    it('does not use the auxiliary label for semantic labelling purposes', () => {
        render(<TextField label="VAT ID" auxiliaryLabel={<a href="/help">What is this?</a>} />)
        expect(screen.queryByRole('textbox', { name: /what is this/i })).not.toBeInTheDocument()
        expect(screen.getByRole('textbox')).toHaveAccessibleName('VAT ID')
        expect(screen.getByRole('textbox')).not.toHaveAccessibleDescription()
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
            <TextField
                data-testid="text-field"
                label="Whatʼs your name?"
                hint="We need it for billing purposes"
                hidden
            />,
        )

        const inputField = screen.getByTestId('text-field')
        const hintElement = screen.getByText(/we need it for billing purposes/i)

        // check that it is rendered but not visible
        expect(inputField).not.toBeVisible()
        expect(screen.queryByRole('textbox', { name: 'Whatʼs your name?' })).not.toBeInTheDocument()
        expect(screen.getByText(/your name/i)).toBeInTheDocument()
        expect(hintElement).not.toBeVisible()

        // check that it becomes visible when hidden is removed
        rerender(
            <TextField
                data-testid="text-field"
                label="Whatʼs your name?"
                hint="We need it for billing purposes"
            />,
        )
        expect(inputField).toBeVisible()
        expect(screen.getByRole('textbox', { name: 'Whatʼs your name?' })).toBeInTheDocument()
        expect(screen.getByText(/your name/i)).toBeInTheDocument()
        expect(hintElement).toBeVisible()
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

    it('focuses on the text field when clicking on an icon in startSlot', () => {
        render(<TextField label="Whatʼs your job title?" startSlot={<div>💼</div>} />)

        const inputElement = screen.getByRole('textbox', { name: 'Whatʼs your job title?' })
        expect(inputElement).not.toHaveFocus()

        userEvent.click(screen.getByText('💼'))
        expect(inputElement).toHaveFocus()
    })

    it('focuses on the text field when clicking on a button in startSlot', () => {
        render(
            <TextField
                label="Whatʼs your job title?"
                startSlot={<button type="button">x</button>}
            />,
        )

        const inputElement = screen.getByRole('textbox', { name: 'Whatʼs your job title?' })
        expect(inputElement).not.toHaveFocus()

        userEvent.click(screen.getByRole('button', { name: 'x' }))
        expect(inputElement).toHaveFocus()
    })

    describe('a11y', () => {
        it('renders with no a11y violations', async () => {
            const { container } = render(
                <>
                    <TextField label="Whatʼs your name?" />
                    <TextField label="Whatʼs your name?" disabled />
                    <TextField label="Whatʼs your name?" hint="We need it for billing purposes" />
                </>,
            )
            const results = await axe(container)

            expect(results).toHaveNoViolations()
        })
    })
})
