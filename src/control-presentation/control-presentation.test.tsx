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

    it('marks slot wrappers with role="presentation"', () => {
        const { container } = render(
            <ControlPresentation startSlot={<TestIcon />} endSlot={<span>end</span>}>
                <input aria-label="Subject" />
            </ControlPresentation>,
        )
        // exactly 2: startSlot wrapper + endSlot wrapper
        const presentation = container.querySelectorAll('[role="presentation"]')
        expect(presentation).toHaveLength(2)
    })

    it('focuses the control when the wrapper is clicked', () => {
        const { container } = render(
            <ControlPresentation>
                <input aria-label="Subject" data-testid="subject" />
            </ControlPresentation>,
        )
        const control = screen.getByTestId('subject')
        expect(control).not.toHaveFocus()

        userEvent.click(container.firstElementChild as Element)
        expect(control).toHaveFocus()
    })

    it('focuses the control when a non-interactive startSlot is clicked', () => {
        render(
            <ControlPresentation startSlot={<TestIcon />}>
                <input aria-label="Subject" data-testid="subject" />
            </ControlPresentation>,
        )
        const control = screen.getByTestId('subject')
        expect(control).not.toHaveFocus()

        userEvent.click(screen.getByTestId('test-icon'))
        expect(control).toHaveFocus()
    })

    it('fires a startSlot button onClick and focuses the control', () => {
        const onSlotClick = jest.fn()
        render(
            <ControlPresentation
                startSlot={
                    <button type="button" onClick={onSlotClick}>
                        prefix
                    </button>
                }
            >
                <input aria-label="Subject" data-testid="subject" />
            </ControlPresentation>,
        )
        const control = screen.getByTestId('subject')
        expect(control).not.toHaveFocus()

        userEvent.click(screen.getByRole('button', { name: 'prefix' }))
        expect(onSlotClick).toHaveBeenCalledTimes(1)
        expect(control).toHaveFocus()
    })

    it('fires an endSlot button onClick and focuses the control', () => {
        const onSlotClick = jest.fn()
        render(
            <ControlPresentation
                endSlot={
                    <button type="button" onClick={onSlotClick}>
                        clear
                    </button>
                }
            >
                <input aria-label="Subject" data-testid="subject" />
            </ControlPresentation>,
        )
        const control = screen.getByTestId('subject')
        expect(control).not.toHaveFocus()

        userEvent.click(screen.getByRole('button', { name: 'clear' }))
        expect(onSlotClick).toHaveBeenCalledTimes(1)
        expect(control).toHaveFocus()
    })

    it('renders startSlot and endSlot together', () => {
        render(
            <ControlPresentation
                startSlot={<TestIcon />}
                endSlot={
                    <button type="button" aria-label="open">
                        ▾
                    </button>
                }
            >
                <input aria-label="Subject" />
            </ControlPresentation>,
        )
        expect(screen.getByTestId('test-icon')).toBeInTheDocument()
        expect(screen.getByRole('button', { name: 'open' })).toBeInTheDocument()
    })

    it('renders string and number content in slots', () => {
        const { container } = render(
            <ControlPresentation startSlot="$" endSlot={42}>
                <input aria-label="Amount" />
            </ControlPresentation>,
        )
        expect(container).toHaveTextContent('$')
        expect(container).toHaveTextContent('42')
    })

    it('merges exceptionallySetClassName onto the wrapper', () => {
        const { container } = render(
            <ControlPresentation exceptionallySetClassName="custom-class">
                <input aria-label="Subject" />
            </ControlPresentation>,
        )
        expect(container.firstElementChild).toHaveClass('custom-class')
    })

    it('focuses a polymorphic (button) control on wrapper click', () => {
        const { container } = render(
            <ControlPresentation>
                <button type="button" aria-label="Subject" data-testid="subject">
                    Choose
                </button>
            </ControlPresentation>,
        )
        const control = screen.getByTestId('subject')
        expect(control).not.toHaveFocus()

        userEvent.click(container.firstElementChild as Element)
        expect(control).toHaveFocus()
    })

    it('allows typing into the control', () => {
        render(
            <ControlPresentation>
                <input aria-label="Subject" data-testid="subject" />
            </ControlPresentation>,
        )
        const control = screen.getByTestId('subject')
        userEvent.type(control, 'hello')
        expect(control).toHaveValue('hello')
    })

    describe('state styling', () => {
        describe('read-only', () => {
            it('preserves the native readOnly attribute on the control', () => {
                render(
                    <ControlPresentation>
                        <input aria-label="x" data-testid="subject" readOnly />
                    </ControlPresentation>,
                )
                expect(screen.getByTestId('subject')).toHaveAttribute('readonly')
            })

            it('preserves aria-readonly="true" on the control', () => {
                render(
                    <ControlPresentation>
                        <input aria-label="x" data-testid="subject" aria-readonly="true" />
                    </ControlPresentation>,
                )
                expect(screen.getByTestId('subject')).toHaveAttribute('aria-readonly', 'true')
            })

            it('preserves aria-readonly="false" on the control (negative-case contract)', () => {
                render(
                    <ControlPresentation>
                        <input aria-label="x" data-testid="subject" aria-readonly="false" />
                    </ControlPresentation>,
                )
                expect(screen.getByTestId('subject')).toHaveAttribute('aria-readonly', 'false')
            })

            it('preserves data-readonly="true" on the control', () => {
                render(
                    <ControlPresentation>
                        <input aria-label="x" data-testid="subject" data-readonly="true" />
                    </ControlPresentation>,
                )
                expect(screen.getByTestId('subject')).toHaveAttribute('data-readonly', 'true')
            })
        })

        describe('disabled', () => {
            it('preserves the native disabled attribute on the control', () => {
                render(
                    <ControlPresentation>
                        <input aria-label="x" data-testid="subject" disabled />
                    </ControlPresentation>,
                )
                expect(screen.getByTestId('subject')).toBeDisabled()
            })

            it('preserves aria-disabled="true" on the control', () => {
                render(
                    <ControlPresentation>
                        <input aria-label="x" data-testid="subject" aria-disabled="true" />
                    </ControlPresentation>,
                )
                expect(screen.getByTestId('subject')).toHaveAttribute('aria-disabled', 'true')
            })

            it('preserves aria-disabled="false" on the control (negative-case contract)', () => {
                render(
                    <ControlPresentation>
                        <input aria-label="x" data-testid="subject" aria-disabled="false" />
                    </ControlPresentation>,
                )
                expect(screen.getByTestId('subject')).toHaveAttribute('aria-disabled', 'false')
            })

            it('preserves data-disabled="true" on the control', () => {
                render(
                    <ControlPresentation>
                        <input aria-label="x" data-testid="subject" data-disabled="true" />
                    </ControlPresentation>,
                )
                expect(screen.getByTestId('subject')).toHaveAttribute('data-disabled', 'true')
            })
        })

        describe('invalid', () => {
            it('preserves aria-invalid="true" on the control', () => {
                render(
                    <ControlPresentation>
                        <input aria-label="x" data-testid="subject" aria-invalid="true" />
                    </ControlPresentation>,
                )
                expect(screen.getByTestId('subject')).toHaveAttribute('aria-invalid', 'true')
            })

            it('preserves aria-invalid="false" on the control (negative-case contract)', () => {
                render(
                    <ControlPresentation>
                        <input aria-label="x" data-testid="subject" aria-invalid="false" />
                    </ControlPresentation>,
                )
                expect(screen.getByTestId('subject')).toHaveAttribute('aria-invalid', 'false')
            })

            it('does not add aria-invalid when not provided', () => {
                render(
                    <ControlPresentation>
                        <input aria-label="x" data-testid="subject" />
                    </ControlPresentation>,
                )
                expect(screen.getByTestId('subject')).not.toHaveAttribute('aria-invalid')
            })
        })
    })

    describe('slot markers', () => {
        it('renders a startSlot wrapper carrying the startSlot marker class', () => {
            const { container } = render(
                <ControlPresentation startSlot={<TestIcon />}>
                    <input aria-label="Subject" />
                </ControlPresentation>,
            )
            expect(container.querySelector('[class*="startSlot"]')).not.toBeNull()
        })

        it('renders an endSlot wrapper carrying the endSlot marker class', () => {
            const { container } = render(
                <ControlPresentation endSlot={<TestIcon />}>
                    <input aria-label="Subject" />
                </ControlPresentation>,
            )
            expect(container.querySelector('[class*="endSlot"]')).not.toBeNull()
        })

        it('omits the startSlot wrapper when no startSlot is provided', () => {
            const { container } = render(
                <ControlPresentation>
                    <input aria-label="Subject" />
                </ControlPresentation>,
            )
            expect(container.querySelector('[class*="startSlot"]')).toBeNull()
        })

        it('omits the endSlot wrapper when no endSlot is provided', () => {
            const { container } = render(
                <ControlPresentation>
                    <input aria-label="Subject" />
                </ControlPresentation>,
            )
            expect(container.querySelector('[class*="endSlot"]')).toBeNull()
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
