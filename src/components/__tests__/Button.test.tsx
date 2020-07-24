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
            <Button variant="primary" tooltip="tooltip content here">
                Click me
            </Button>,
        )
        expect(screen.queryByRole('tooltip')).not.toBeInTheDocument()
        fireEvent.focus(screen.getByRole('button', { name: 'Click me' }))
        expect(screen.getByRole('tooltip', { name: 'tooltip content here' })).toBeInTheDocument()
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
            <Button type="submit" form="form-id">
                Click me
            </Button>,
        )
        const button = screen.getByRole('button')
        expect(button).toHaveAttribute('form', 'form-id')
        expect(button).toHaveAttribute('type', 'submit')
    })

    it('renders a <button /> even if the button variant is "link"', () => {
        render(<Button variant="link">Click me</Button>)
        expect(screen.getByRole('button', { name: 'Click me' })).toBeInTheDocument()
    })
})
