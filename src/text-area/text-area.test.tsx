import { useState } from 'react'

import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { axe } from 'jest-axe'

import { TextArea } from './'

describe('TextArea', () => {
    it('supports having an externally provided id attribute', () => {
        render(<TextArea data-testid="text-area" id="custom-id" label="Tell us a bit about you" />)
        expect(screen.getByTestId('text-area').id).toBe('custom-id')
        // Makes sure that even with the custom id, the label is still associated to the input element
        expect(screen.getByTestId('text-area')).toHaveAccessibleName('Tell us a bit about you')
    })

    it('is labelled by its label', () => {
        render(<TextArea data-testid="text-area" label="Tell us a bit about you" />)
        expect(screen.getByTestId('text-area')).toHaveAccessibleName('Tell us a bit about you')
    })

    it('can be labelled via aria-label', () => {
        render(
            <TextArea
                data-testid="text-area"
                label="Biography"
                aria-label="Tell us a bit about you"
            />,
        )
        expect(screen.getByTestId('text-area')).toHaveAccessibleName('Tell us a bit about you')
    })

    it('can be labelled via aria-labelledby', () => {
        render(
            <>
                <TextArea
                    data-testid="text-area"
                    label="Tell us a bit abouit you"
                    aria-labelledby="custom-label"
                />
                <div id="custom-label">Biography</div>
            </>,
        )
        expect(screen.getByTestId('text-area')).toHaveAccessibleName('Biography')
    })

    it('is described by its message when provided', () => {
        render(
            <TextArea
                data-testid="text-area"
                label="Biography"
                message="Tell us a bit about you"
            />,
        )
        expect(screen.getByTestId('text-area')).toHaveAccessibleDescription(
            'Tell us a bit about you',
        )
    })

    it('can be described by something else via aria-describedby', () => {
        render(
            <>
                <TextArea
                    data-testid="text-area"
                    label="Tell us a bit about you"
                    message="Don't be shy"
                    aria-describedby="custom-message"
                />
                <div id="custom-message">
                    You can talk about your hobbies and personal preferences
                </div>
            </>,
        )
        expect(screen.getByTestId('text-area')).toHaveAccessibleDescription(
            'You can talk about your hobbies and personal preferences',
        )
    })

    it('is marked as invalid and when tone="error"', () => {
        render(<TextArea data-testid="text-area" label="Tell us a bit about you" tone="error" />)
        expect(screen.getByTestId('text-area')).toBeInvalid()
    })

    it.each([['success' as const], ['loading' as const], ['neutral' as const], ['error' as const]])(
        'uses the message as the description, when tone="%s"',
        (tone) => {
            render(
                <TextArea
                    data-testid="text-area"
                    label="Tell us a bit about you"
                    message={`Message with ${tone} tone`}
                    tone={tone}
                />,
            )
            expect(screen.getByTestId('text-area')).toHaveAccessibleDescription(
                `Message with ${tone} tone`,
            )
        },
    )

    it('renders its auxiliary label', () => {
        render(
            <TextArea
                label="Tell us a bit about you"
                auxiliaryLabel={<a href="/help">Why we need this info?</a>}
            />,
        )
        expect(screen.getByRole('link', { name: 'Why we need this info?' })).toBeInTheDocument()
    })

    it('does not use the auxiliary label for semantic labelling purposes', () => {
        render(
            <TextArea
                label="Tell us a bit about you"
                auxiliaryLabel={<a href="/help">Why we need this info?</a>}
            />,
        )
        expect(
            screen.queryByRole('textbox', { name: /why we need this info/i }),
        ).not.toBeInTheDocument()
        expect(screen.getByRole('textbox')).toHaveAccessibleName('Tell us a bit about you')
        expect(screen.getByRole('textbox')).not.toHaveAccessibleDescription()
    })

    it('can have a placeholder text', () => {
        render(
            <TextArea
                label="Tell us a bit about you"
                data-testid="text-area"
                placeholder="You can talk about your hobbies and personal preferences"
            />,
        )
        expect(screen.getByTestId('text-area')).toBe(
            screen.getByPlaceholderText('You can talk about your hobbies and personal preferences'),
        )
    })

    it('is hidden when hidden={true}', () => {
        const { rerender } = render(
            <TextArea
                data-testid="text-area"
                label="Tell us a bit about you"
                message="You can talk about your hobbies and personal preferences"
                hidden
            />,
        )

        const textAreaElement = screen.getByTestId('text-area')
        const messageElement = screen.getByText(/you can talk about your hobbies/i)

        // check that it is rendered but not visible
        expect(textAreaElement).not.toBeVisible()
        expect(
            screen.queryByRole('textbox', { name: 'Tell us a bit about you' }),
        ).not.toBeInTheDocument()
        expect(screen.getByText(/you can talk about your hobbies/i)).toBeInTheDocument()
        expect(messageElement).not.toBeVisible()

        // check that it becomes visible when hidden is removed
        rerender(
            <TextArea
                data-testid="text-area"
                label="Tell us a bit about you"
                message="You can talk about your hobbies and personal preferences"
            />,
        )
        expect(textAreaElement).toBeVisible()
        expect(screen.getByRole('textbox', { name: 'Tell us a bit about you' })).toBeInTheDocument()
        expect(screen.getByText(/you can talk about your hobbies/i)).toBeInTheDocument()
        expect(messageElement).toBeVisible()
    })

    it('forwards to the textarea element any extra props provided to it', () => {
        render(
            <TextArea
                label="Visual label"
                aria-label="Non-visual label"
                data-testid="text-area"
                data-something="whatever"
            />,
        )
        const textareaElement = screen.getByTestId('text-area')
        expect(textareaElement.tagName).toBe('TEXTAREA')
        expect(textareaElement).toHaveAttribute('aria-label', 'Non-visual label')
        expect(textareaElement).toHaveAttribute('data-testid', 'text-area')
        expect(textareaElement).toHaveAttribute('data-something', 'whatever')
    })

    it('enables auto-grow when rows="auto"', () => {
        const { rerender } = render(<TextArea label="Auto-grow" autoExpand />)
        const textarea = screen.getByRole('textbox', { name: 'Auto-grow' })
        expect(textarea).toHaveClass('disableResize')

        rerender(<TextArea label="Auto-grow" rows={undefined} />)
        expect(textarea).not.toHaveClass('disableResize')
    })

    it('forwards the `rows` prop to the text area', () => {
        render(<TextArea label="Type something" rows={4} />)
        const textarea = screen.getByRole('textbox', { name: 'Type something' })
        expect(textarea).toHaveAttribute('rows', '4')
    })

    it('allows to type text into it', () => {
        render(<TextArea label="Tell us a bit about you" />)
        const textareaElement = screen.getByRole('textbox', { name: 'Tell us a bit about you' })
        expect(textareaElement).toHaveValue('')
        userEvent.type(textareaElement, 'I love to travel around the world')
        expect(textareaElement).toHaveValue('I love to travel around the world')
    })

    it('can be disabled', () => {
        render(<TextArea label="Tell us a bit about you" disabled />)
        const textareaElement = screen.getByRole('textbox', { name: 'Tell us a bit about you' })
        expect(textareaElement).toBeDisabled()
        expect(textareaElement).toHaveValue('')
        userEvent.type(textareaElement, 'I love to travel around the world')
        expect(textareaElement).toHaveValue('')
    })

    it('can be readonly', () => {
        render(<TextArea label="Tell us a bit about you" readOnly />)
        const textareaElement = screen.getByRole('textbox', { name: 'Tell us a bit about you' })
        expect(textareaElement).not.toBeDisabled()
        expect(textareaElement).toHaveValue('')
        userEvent.type(textareaElement, 'I love to travel around the world')
        expect(textareaElement).toHaveValue('')
    })

    it('can be a controlled field', () => {
        function TestCase() {
            const [value, setValue] = useState('')
            return (
                <>
                    <TextArea
                        label="Tell us a bit about you"
                        value={value}
                        onChange={(event) => setValue(event.currentTarget.value)}
                    />
                    <div data-testid="value">{value}</div>
                </>
            )
        }

        render(<TestCase />)
        const textareaElement = screen.getByRole('textbox', { name: 'Tell us a bit about you' })
        expect(textareaElement).toHaveValue('')
        userEvent.type(textareaElement, 'I love to travel around the world')
        expect(textareaElement).toHaveValue('I love to travel around the world')
        expect(screen.getByTestId('value')).toHaveTextContent('I love to travel around the world')
    })

    it('sets a data-replicated-value attribute on a controlled field when autoExpand is true', () => {
        render(
            <TextArea
                value="I am a Frontend Developer"
                label="Tell us a bit about you"
                autoExpand
            />,
        )
        const textareaElement = screen.getByRole('textbox', { name: 'Tell us a bit about you' })
        expect(textareaElement.parentElement).toHaveAttribute(
            'data-replicated-value',
            'I am a Frontend Developer',
        )
    })

    it('does NOT set a data-replicated-value attribute on an uncontrolled field when autoExpand is false', () => {
        render(<TextArea value="I am a Frontend Developer" label="Tell us a bit about you" />)
        const textareaElement = screen.getByRole('textbox', { name: 'Tell us a bit about you' })
        expect(textareaElement.parentElement).not.toHaveAttribute('data-replicated-value')
    })

    describe('a11y', () => {
        it('renders with no a11y violations', async () => {
            const { container } = render(
                <>
                    <TextArea label="Biography" />
                    <TextArea label="Biography" disabled />
                    <TextArea label="Biography" message="Tell us a bit about you" />
                </>,
            )
            expect(await axe(container)).toHaveNoViolations()
        })
    })
})
