import * as React from 'react'

import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { axe } from 'jest-axe'

import { BorderedTextField } from './bordered-text-field'

/** Locate the outlined chrome element by its CSS-module class name (hashed
 *  in tests but still containing 'outlinedChrome' as a substring). Used in
 *  several tests where we need to assert against the chrome wrapper rather
 *  than relying on tree position (BaseField's Stack wraps the output). */
function getChrome(container: HTMLElement): HTMLElement {
    const el = container.querySelector<HTMLElement>('[class*="outlinedChrome"]')
    if (!el) throw new Error('Chrome wrapper not found')
    return el
}

describe('BorderedTextField', () => {
    it('renders an input with the given label associated via htmlFor', () => {
        render(<BorderedTextField label="Email" />)
        const input = screen.getByLabelText('Email')
        expect(input.tagName).toBe('INPUT')
    })

    it('forwards the ref to the underlying input', () => {
        const ref = React.createRef<HTMLInputElement>()
        render(<BorderedTextField label="Email" ref={ref} />)
        expect(ref.current?.tagName).toBe('INPUT')
    })

    it('renders the label visually inside the chrome', () => {
        const { container } = render(<BorderedTextField label="Email" />)
        const chrome = getChrome(container)
        const label = screen.getByText('Email')
        expect(chrome).toContainElement(label)
    })

    it('focuses the input when the chrome wrapper is clicked outside the input', () => {
        const { container } = render(<BorderedTextField label="Email" />)
        const input = screen.getByLabelText('Email')
        expect(input).not.toHaveFocus()

        userEvent.click(getChrome(container))
        expect(input).toHaveFocus()
    })

    it('renders a message below the chrome', () => {
        render(<BorderedTextField label="Email" message="Please enter your email" />)
        expect(screen.getByText('Please enter your email')).toBeInTheDocument()
    })

    it('renders the endSlot inside the chrome', () => {
        const { container } = render(
            <BorderedTextField label="Email" endSlot={<span data-testid="end">end</span>} />,
        )
        const chrome = getChrome(container)
        expect(chrome).toContainElement(screen.getByTestId('end'))
    })

    it('renders the character count below when maxLength is set and characterCountPosition is default', () => {
        render(<BorderedTextField label="Email" maxLength={30} />)
        expect(screen.getByText(/0\/30/)).toBeInTheDocument()
    })

    it('hides the character count when characterCountPosition="hidden"', () => {
        render(<BorderedTextField label="Email" maxLength={30} characterCountPosition="hidden" />)
        expect(screen.queryByText(/0\/30/)).not.toBeInTheDocument()
    })

    it('does not accept startSlot, endSlotPosition, or characterCountPosition="inline" at the type level', () => {
        // Compile-time guards.
        // @ts-expect-error — startSlot is not part of BorderedTextField's API.
        ;<BorderedTextField label="x" startSlot={<span />} />
        // @ts-expect-error — endSlotPosition is not part of BorderedTextField's API.
        ;<BorderedTextField label="x" endSlotPosition="bottom" />
        // @ts-expect-error — 'inline' is not a valid characterCountPosition for bordered.
        ;<BorderedTextField label="x" maxLength={10} characterCountPosition="inline" />
    })

    describe('a11y', () => {
        it('renders with no a11y violations', async () => {
            const { container } = render(
                <>
                    <BorderedTextField label="Name" />
                    <BorderedTextField label="Email" message="Required" tone="error" />
                    <BorderedTextField
                        label="Search"
                        endSlot={
                            <button type="button" aria-label="clear">
                                x
                            </button>
                        }
                    />
                </>,
            )
            expect(await axe(container)).toHaveNoViolations()
        })
    })
})
