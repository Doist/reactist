import * as React from 'react'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { ButtonLink } from './button-link'

describe('ButtonLink', () => {
    it('renders a semantic link', () => {
        render(
            <ButtonLink href="/" variant="primary">
                Click me
            </ButtonLink>,
        )
        expect(screen.getByRole('link', { name: 'Click me' })).toBeInTheDocument()
    })

    it('calls the onClick handler when clicked', () => {
        const onClick = jest.fn()
        render(
            <ButtonLink href="/" variant="primary" onClick={onClick}>
                Click me
            </ButtonLink>,
        )
        const link = screen.getByRole('link', { name: 'Click me' })
        expect(link).not.toHaveAttribute('aria-disabled', 'true')
        expect(onClick).not.toHaveBeenCalled()
        userEvent.click(link)
        expect(onClick).toHaveBeenCalledTimes(1)
    })

    it('ignore clicks when disabled', () => {
        let isNavigationPrevented = false
        const clickSpy: React.MouseEventHandler<HTMLDivElement> = jest
            .fn()
            .mockImplementation((event: React.MouseEvent<HTMLDivElement>) => {
                isNavigationPrevented = event.defaultPrevented
            })

        const onClick = jest.fn()
        render(
            <div onClick={clickSpy}>
                <ButtonLink href="/" variant="primary" onClick={onClick} disabled>
                    Click me
                </ButtonLink>
            </div>,
        )
        const link = screen.getByRole('link', { name: 'Click me' })

        expect(link).toHaveAttribute('aria-disabled', 'true')
        expect(onClick).not.toHaveBeenCalled()
        userEvent.click(link)
        expect(onClick).not.toHaveBeenCalled()
        expect(isNavigationPrevented).toBe(true)
    })

    it('only applies a soft disabled state to the link', () => {
        render(
            <ButtonLink href="/" variant="primary" disabled>
                Click me
            </ButtonLink>,
        )
        const link = screen.getByRole('link', { name: 'Click me' })
        expect(link).not.toBeDisabled()
        expect(link).toHaveAttribute('aria-disabled', 'true')
        userEvent.tab()
        expect(link).toHaveFocus()
    })

    it('does not acknowledge the className prop, but exceptionallySetClassName instead', () => {
        render(
            <ButtonLink
                href="/"
                variant="primary"
                // @ts-expect-error
                className="wrong"
                exceptionallySetClassName="right"
            >
                Click me
            </ButtonLink>,
        )
        const link = screen.getByRole('link', { name: 'Click me' })
        expect(link).toHaveClass('right')
        expect(link).not.toHaveClass('wrong')
    })

    it('renders its children as its content', () => {
        render(
            <ButtonLink href="/" variant="primary">
                Click me <strong>now</strong>
            </ButtonLink>,
        )
        expect(screen.getByRole('link', { name: 'Click me now' }).innerHTML).toMatchInlineSnapshot(
            `"Click me <strong>now</strong>"`,
        )
    })

    it('renders a tooltip when prop is supplied', async () => {
        render(
            <ButtonLink href="/" variant="primary" tooltip="tooltip content here">
                Click me
            </ButtonLink>,
        )
        expect(screen.queryByRole('tooltip')).not.toBeInTheDocument()
        userEvent.tab()
        expect(screen.getByRole('link', { name: 'Click me' })).toHaveFocus()
        expect(
            await screen.findByRole('tooltip', { name: 'tooltip content here' }),
        ).toBeInTheDocument()
    })

    it('applies any extra props to the underlying link', () => {
        render(
            <ButtonLink href="/" variant="primary" type="submit" data-testid="test-link">
                Click me
            </ButtonLink>,
        )
        const link = screen.getByRole('link', { name: 'Click me' })
        expect(link).toHaveAttribute('type', 'submit')
        expect(link).toBe(screen.getByTestId('test-link'))
    })

    it('applies different class names based on variant', () => {
        const { rerender } = render(
            <ButtonLink href="/" variant="primary">
                Click me
            </ButtonLink>,
        )
        const link = screen.getByRole('link', { name: 'Click me' })
        expect(link).toHaveClass('variant-primary', 'tone-normal', 'size-normal')
        expect(link).not.toHaveClass('variant-secondary')
        expect(link).not.toHaveClass('variant-tertiary')

        rerender(
            <ButtonLink href="/" variant="secondary">
                Click me
            </ButtonLink>,
        )
        expect(link).toHaveClass('variant-secondary', 'tone-normal', 'size-normal')
        expect(link).not.toHaveClass('variant-primary')
        expect(link).not.toHaveClass('variant-tertiary')

        rerender(
            <ButtonLink href="/" variant="tertiary">
                Click me
            </ButtonLink>,
        )
        expect(link).toHaveClass('variant-tertiary', 'tone-normal', 'size-normal')
        expect(link).not.toHaveClass('variant-primary')
        expect(link).not.toHaveClass('variant-secondary')
    })

    it('applies different class names based on tone', () => {
        const { rerender } = render(
            <ButtonLink href="/" variant="primary">
                Click me
            </ButtonLink>,
        )
        const link = screen.getByRole('link', { name: 'Click me' })
        expect(link).toHaveClass('variant-primary', 'tone-normal', 'size-normal')
        expect(link).not.toHaveClass('tone-destructive')

        rerender(
            <ButtonLink href="/" variant="primary" tone="destructive">
                Click me
            </ButtonLink>,
        )
        expect(link).toHaveClass('variant-primary', 'tone-destructive', 'size-normal')
        expect(link).not.toHaveClass('tone-normal')
    })

    it('applies different class names based on size', () => {
        const { rerender } = render(
            <ButtonLink href="/" variant="primary" size="normal">
                Click me
            </ButtonLink>,
        )
        const link = screen.getByRole('link', { name: 'Click me' })
        expect(link).toHaveClass('variant-primary', 'tone-normal', 'size-normal')
        expect(link).not.toHaveClass('size-small')
        expect(link).not.toHaveClass('size-large')

        rerender(
            <ButtonLink href="/" variant="secondary" size="small">
                Click me
            </ButtonLink>,
        )
        expect(link).toHaveClass('variant-secondary', 'tone-normal', 'size-small')
        expect(link).not.toHaveClass('size-normal')
        expect(link).not.toHaveClass('size-large')

        rerender(
            <ButtonLink href="/" variant="tertiary" size="large">
                Click me
            </ButtonLink>,
        )
        expect(link).toHaveClass('variant-tertiary', 'tone-normal', 'size-large')
        expect(link).not.toHaveClass('size-normal')
        expect(link).not.toHaveClass('size-small')
    })
})
