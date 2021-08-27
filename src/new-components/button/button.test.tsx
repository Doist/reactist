import * as React from 'react'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { Button } from './button'

describe('Button', () => {
    it('renders a semantic button', () => {
        render(<Button variant="primary">Click me</Button>)
        expect(screen.getByRole('button', { name: 'Click me' })).toBeInTheDocument()
    })

    it('calls the onClick handler when clicked', () => {
        const onClick = jest.fn()
        render(
            <Button variant="primary" onClick={onClick}>
                Click me
            </Button>,
        )
        const button = screen.getByRole('button', { name: 'Click me' })
        expect(button).not.toHaveAttribute('aria-disabled', 'true')
        expect(onClick).not.toHaveBeenCalled()
        userEvent.click(button)
        expect(onClick).toHaveBeenCalledTimes(1)
    })

    it('ignore clicks when disabled', () => {
        const onClick = jest.fn()
        render(
            <Button variant="primary" onClick={onClick} disabled>
                Click me
            </Button>,
        )
        const button = screen.getByRole('button', { name: 'Click me' })
        expect(button).toHaveAttribute('aria-disabled', 'true')
        expect(onClick).not.toHaveBeenCalled()
        userEvent.click(button)
        expect(onClick).not.toHaveBeenCalled()
    })

    it('only applies a soft disabled state to the button', () => {
        render(
            <Button variant="primary" disabled>
                Click me
            </Button>,
        )
        const button = screen.getByRole('button', { name: 'Click me' })
        expect(button).not.toBeDisabled()
        expect(button).toHaveAttribute('aria-disabled', 'true')
        userEvent.tab()
        expect(button).toHaveFocus()
    })

    it('submits a form when used with type="submit"', () => {
        const onSubmit = jest.fn().mockImplementation((event) => event.preventDefault())
        render(
            <form onSubmit={onSubmit}>
                <Button variant="primary" type="submit">
                    Submit
                </Button>
            </form>,
        )
        const button = screen.getByRole('button', { name: 'Submit' })
        expect(button).not.toHaveAttribute('aria-disabled', 'true')
        expect(onSubmit).not.toHaveBeenCalled()
        userEvent.click(button)
        expect(onSubmit).toHaveBeenCalledTimes(1)
    })

    it('does not submit a form when disabled', () => {
        const onSubmit = jest.fn().mockImplementation((event) => event.preventDefault())
        render(
            <form onSubmit={onSubmit}>
                <Button variant="primary" type="submit" disabled>
                    Submit
                </Button>
            </form>,
        )
        const button = screen.getByRole('button', { name: 'Submit' })
        expect(button).toHaveAttribute('aria-disabled', 'true')
        expect(onSubmit).not.toHaveBeenCalled()
        userEvent.click(button)
        expect(onSubmit).not.toHaveBeenCalled()
    })

    it('does not acknowledge the className prop, but exceptionallySetClassName instead', () => {
        render(
            <Button
                variant="primary"
                // @ts-expect-error
                className="wrong"
                exceptionallySetClassName="right"
            >
                Click me
            </Button>,
        )
        const button = screen.getByRole('button', { name: 'Click me' })
        expect(button).toHaveClass('right')
        expect(button).not.toHaveClass('wrong')
    })

    it('renders its children as its content', () => {
        render(
            <Button variant="primary">
                Click me <strong>now</strong>
            </Button>,
        )
        expect(
            screen.getByRole('button', { name: 'Click me now' }).innerHTML,
        ).toMatchInlineSnapshot(`"Click me <strong>now</strong>"`)
    })

    it('renders a tooltip when prop is supplied', async () => {
        render(
            <Button variant="primary" tooltip="tooltip content here">
                Click me
            </Button>,
        )
        expect(screen.queryByRole('tooltip')).not.toBeInTheDocument()
        userEvent.tab()
        expect(screen.getByRole('button', { name: 'Click me' })).toHaveFocus()
        expect(
            await screen.findByRole('tooltip', { name: 'tooltip content here' }),
        ).toBeInTheDocument()
    })

    it('applies any extra props to the underlying button', () => {
        render(
            <Button variant="primary" type="submit" data-testid="test-button">
                Click me
            </Button>,
        )
        const button = screen.getByRole('button', { name: 'Click me' })
        expect(button).toHaveAttribute('type', 'submit')
        expect(button).toBe(screen.getByTestId('test-button'))
    })

    it('applies different class names based on variant', () => {
        const { rerender } = render(<Button variant="primary">Click me</Button>)
        const button = screen.getByRole('button', { name: 'Click me' })
        expect(button).toHaveClass('variant-primary', 'tone-normal', 'size-normal')
        expect(button).not.toHaveClass('variant-secondary')
        expect(button).not.toHaveClass('variant-tertiary')

        rerender(<Button variant="secondary">Click me</Button>)
        expect(button).toHaveClass('variant-secondary', 'tone-normal', 'size-normal')
        expect(button).not.toHaveClass('variant-primary')
        expect(button).not.toHaveClass('variant-tertiary')

        rerender(<Button variant="tertiary">Click me</Button>)
        expect(button).toHaveClass('variant-tertiary', 'tone-normal', 'size-normal')
        expect(button).not.toHaveClass('variant-primary')
        expect(button).not.toHaveClass('variant-secondary')
    })

    it('applies different class names based on tone', () => {
        const { rerender } = render(<Button variant="primary">Click me</Button>)
        const button = screen.getByRole('button', { name: 'Click me' })
        expect(button).toHaveClass('variant-primary', 'tone-normal', 'size-normal')
        expect(button).not.toHaveClass('tone-destructive')

        rerender(
            <Button variant="primary" tone="destructive">
                Click me
            </Button>,
        )
        expect(button).toHaveClass('variant-primary', 'tone-destructive', 'size-normal')
        expect(button).not.toHaveClass('tone-normal')
    })

    it('applies different class names based on size', () => {
        const { rerender } = render(
            <Button variant="primary" size="normal">
                Click me
            </Button>,
        )
        const button = screen.getByRole('button', { name: 'Click me' })
        expect(button).toHaveClass('variant-primary', 'tone-normal', 'size-normal')
        expect(button).not.toHaveClass('size-small')
        expect(button).not.toHaveClass('size-large')

        rerender(
            <Button variant="secondary" size="small">
                Click me
            </Button>,
        )
        expect(button).toHaveClass('variant-secondary', 'tone-normal', 'size-small')
        expect(button).not.toHaveClass('size-normal')
        expect(button).not.toHaveClass('size-large')

        rerender(
            <Button variant="tertiary" size="large">
                Click me
            </Button>,
        )
        expect(button).toHaveClass('variant-tertiary', 'tone-normal', 'size-large')
        expect(button).not.toHaveClass('size-normal')
        expect(button).not.toHaveClass('size-small')
    })
})
