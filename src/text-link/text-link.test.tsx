import { render, screen } from '@testing-library/react'
import * as React from 'react'
import { TextLink } from './text-link'

describe('TextLink', () => {
    it('renders a link with the provided href', () => {
        render(<TextLink href="https://example.com">Click me</TextLink>)

        const link = screen.getByText('Click me')
        expect(link).toHaveAttribute('href', 'https://example.com')
    })

    it('opens in new tab when openInNewTab is true', () => {
        render(
            <TextLink href="https://example.com" openInNewTab>
                External link
            </TextLink>,
        )

        const link = screen.getByText('External link')
        expect(link).toHaveAttribute('target', '_blank')
        expect(link).toHaveAttribute('rel', 'noopener noreferrer')
    })

    it('does not add target or rel attributes when openInNewTab is false', () => {
        render(
            <TextLink href="https://example.com" openInNewTab={false}>
                Internal link
            </TextLink>,
        )

        const link = screen.getByText('Internal link')
        expect(link).not.toHaveAttribute('target')
        expect(link).not.toHaveAttribute('rel')
    })

    it('can be rendered as a different element using the as prop', () => {
        render(
            <TextLink
                as="button"
                onClick={() => {
                    // noop
                }}
            >
                Button link
            </TextLink>,
        )

        const button = screen.getByText('Button link')
        expect(button.tagName).toBe('BUTTON')
    })

    it('applies custom className while preserving default styles', () => {
        render(
            <TextLink href="#" exceptionallySetClassName="custom-class">
                Styled link
            </TextLink>,
        )

        const link = screen.getByText('Styled link')
        expect(link).toHaveClass('custom-class')
        // Verify it still has the default container class
        expect(link).toHaveClass('container')
    })
})
