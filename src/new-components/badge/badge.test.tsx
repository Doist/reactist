import * as React from 'react'
import { render, screen } from '@testing-library/react'
import { Badge } from './badge'

describe('Badge', () => {
    it('renders as a <span /> element', () => {
        render(<Badge tone="info" label="New" data-testid="test-badge" />)
        expect(screen.getByTestId('test-badge').tagName).toBe('SPAN')
    })

    it('renders the label inside the badge element', () => {
        render(<Badge tone="info" label="New" data-testid="test-badge" />)
        expect(screen.getByTestId('test-badge')).toHaveTextContent('New')
    })

    it('renders a different CSS class according to the tone', () => {
        render(
            <>
                <Badge tone="info" label="Info" />
                <Badge tone="positive" label="Positive" />
                <Badge tone="promote" label="Promote" />
                <Badge tone="attention" label="Attention" />
            </>,
        )
        expect(screen.getByText('Info')).toHaveClass('badge-info')
        expect(screen.getByText('Positive')).toHaveClass('badge-positive')
        expect(screen.getByText('Promote')).toHaveClass('badge-promote')
        expect(screen.getByText('Attention')).toHaveClass('badge-attention')
    })

    it('passes through aria-related attributes', () => {
        render(<Badge tone="info" label="New" data-testid="test-badge" aria-hidden="true" />)
        expect(screen.getByTestId('test-badge')).toHaveAttribute('aria-hidden', 'true')
    })

    it('passes through data-* attributes', () => {
        // Even though the use of data-testid already proves that the test passes, it may be important
        // to assert that any data-* attribute is forwarded as well.
        render(<Badge tone="info" label="New" data-testid="test-badge" data-gtm-id="track-id" />)
        expect(screen.getByTestId('test-badge')).toHaveAttribute('data-gtm-id', 'track-id')
    })

    it('does not passes through other attributes such as className, or exceptionallySetClassName', () => {
        render(
            <Badge
                tone="info"
                label="New"
                data-testid="test-badge"
                // @ts-expect-error
                className="test-one"
                exceptionallySetClassName="test-two"
            />,
        )
        expect(screen.getByTestId('test-badge')).not.toHaveClass('test-one')
        expect(screen.getByTestId('test-badge')).not.toHaveClass('test-two')
    })
})
