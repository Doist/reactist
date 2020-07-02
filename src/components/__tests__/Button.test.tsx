import React from 'react'
import { render, fireEvent, screen } from '@testing-library/react'

import Button from '../Button'

describe('Button', () => {
    it('renders children as button text', () => {
        render(<Button variant="primary">Click me</Button>)
        expect(screen.getByRole('button')).toHaveTextContent('Click me')
    })

    it('calls onClick when clicked', () => {
        const clickSpy = jest.fn()
        render(
            <Button variant="primary" onClick={clickSpy}>
                Click me
            </Button>,
        )
        fireEvent.click(screen.getByRole('button', { name: 'Click me' }))
        expect(clickSpy).toHaveBeenCalled()
    })

    it('does not call onClick when disabled', () => {
        const clickSpy = jest.fn()
        render(
            <Button variant="primary" disabled onClick={clickSpy}>
                Click me
            </Button>,
        )
        fireEvent.click(screen.getByRole('button', { name: 'Click me' }))
        expect(clickSpy).not.toHaveBeenCalled()
    })

    it('does not call onClick when loading', () => {
        const clickSpy = jest.fn()
        render(
            <Button variant="primary" loading onClick={clickSpy}>
                Click me
            </Button>,
        )
        fireEvent.click(screen.getByRole('button', { name: 'Click me' }))
        expect(clickSpy).not.toHaveBeenCalled()
    })

    it('renders a tooltip when prop is supplied', () => {
        render(
            <Button variant="primary" tooltip="Click me">
                x
            </Button>,
        )
        expect(screen.getByRole('button').parentElement).toMatchInlineSnapshot(`
            <span
              class="reactist_popover__wrapper reactist_tooltip__wrapper"
            >
              <button
                class="reactist_button reactist_button--primary"
                type="button"
              >
                x
              </button>
              <span
                class="reactist_popover"
              />
            </span>
        `)
    })

    it('adds additional className when supplied', () => {
        render(
            <Button variant="primary" className="very-complex classnames-are-added">
                Click me
            </Button>,
        )
        expect(screen.getByRole('button')).toHaveClass('classnames-are-added', 'very-complex')
    })

    it('applies any extra props to the underlying button', () => {
        render(
            <Button variant="primary" type="submit" form="form-id">
                Click me
            </Button>,
        )
        expect(screen.getByRole('button')).toMatchInlineSnapshot(`
            <button
              class="reactist_button reactist_button--primary"
              form="form-id"
              type="submit"
            >
              Click me
            </button>
        `)
    })
})
