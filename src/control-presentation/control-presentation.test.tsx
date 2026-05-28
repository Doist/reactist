import * as React from 'react'

import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { axe } from 'jest-axe'

import { TestIcon } from '../utils/test-helpers'

import { ControlPresentation } from './control-presentation'

describe('ControlPresentation', () => {
    it('renders the control passed as children', () => {
        render(
            <ControlPresentation>
                <input aria-label="Subject" data-testid="subject" />
            </ControlPresentation>,
        )
        const control = screen.getByTestId('subject')
        expect(control.tagName).toBe('INPUT')
    })

    it('is polymorphic — any element can be the control', () => {
        render(
            <ControlPresentation>
                <button type="button" aria-label="Subject" data-testid="subject">
                    Choose
                </button>
            </ControlPresentation>,
        )
        const control = screen.getByTestId('subject')
        expect(control.tagName).toBe('BUTTON')
        expect(control).toHaveTextContent('Choose')
    })

    it('does not alter attributes on the control', () => {
        render(
            <ControlPresentation>
                <input
                    aria-label="Subject"
                    data-testid="subject"
                    type="email"
                    placeholder="you@example.com"
                    data-custom="yes"
                    readOnly
                    disabled
                />
            </ControlPresentation>,
        )
        const control = screen.getByTestId('subject')
        expect(control).toHaveAttribute('type', 'email')
        expect(control).toHaveAttribute('placeholder', 'you@example.com')
        expect(control).toHaveAttribute('data-custom', 'yes')
        expect(control).toHaveAttribute('readonly')
        expect(control).toBeDisabled()
    })

    it('focuses the control when a non-interactive startSlot is clicked', async () => {
        render(
            <ControlPresentation startSlot={<TestIcon />}>
                <input aria-label="Subject" data-testid="subject" />
            </ControlPresentation>,
        )
        const control = screen.getByTestId('subject')
        expect(control).not.toHaveFocus()

        await userEvent.click(screen.getByTestId('test-icon'))
        expect(control).toHaveFocus()
    })

    it('merges exceptionallySetClassName onto the wrapper', () => {
        const { container } = render(
            <ControlPresentation exceptionallySetClassName="custom-class">
                <input aria-label="Subject" />
            </ControlPresentation>,
        )
        expect(container.firstElementChild).toHaveClass('custom-class')
    })

    it('endSlot accepts multi-child composition', () => {
        render(
            <ControlPresentation
                endSlot={
                    <>
                        <span data-testid="a" />
                        <span data-testid="b" />
                    </>
                }
            >
                <input aria-label="Subject" />
            </ControlPresentation>,
        )
        expect(screen.getByTestId('a')).toBeInTheDocument()
        expect(screen.getByTestId('b')).toBeInTheDocument()
    })

    describe('a11y', () => {
        it('renders with no a11y violations', async () => {
            const { container } = render(
                <>
                    <label htmlFor="plain">Plain</label>
                    <ControlPresentation>
                        <input id="plain" />
                    </ControlPresentation>
                    <label htmlFor="slotted">Slotted</label>
                    <ControlPresentation
                        startSlot={<TestIcon />}
                        endSlot={
                            <button type="button" aria-label="clear">
                                x
                            </button>
                        }
                    >
                        <input id="slotted" />
                    </ControlPresentation>
                </>,
            )
            expect(await axe(container)).toHaveNoViolations()
        })
    })
})
