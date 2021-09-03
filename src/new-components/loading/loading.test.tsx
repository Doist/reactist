import * as React from 'react'
import { render, screen } from '@testing-library/react'
import { Loading } from './loading'

function getSize() {
    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    const svg = screen.getByRole('progressbar', { name: 'Loading…' }).firstElementChild!
    const width = Number(svg.getAttribute('width'))
    const height = Number(svg.getAttribute('height'))
    expect(width).toEqual(height)
    return width
}

describe('Loading', () => {
    it('does not acknowledge the className prop, but exceptionallySetClassName instead', () => {
        render(
            <Loading
                aria-label="Loading…"
                // @ts-expect-error
                className="wrong"
                exceptionallySetClassName="right"
            />,
        )
        const loadingIndicator = screen.getByRole('progressbar', { name: 'Loading…' })
        expect(loadingIndicator).toHaveClass('right')
        expect(loadingIndicator).not.toHaveClass('wrong')
    })

    it('renders an indeterminate progressbar', () => {
        render(<Loading aria-label="Loading…" />)
        expect(screen.getByRole('progressbar', { name: 'Loading…' })).toBeInTheDocument()
    })

    it('renders in small size by default', () => {
        const { rerender } = render(<Loading aria-label="Loading…" />)
        const originalSize = getSize()
        rerender(<Loading aria-label="Loading…" size="small" />)
        expect(getSize()).toEqual(originalSize)
    })

    it('renders with larger numeric sizes as the named size prop implies larger size', () => {
        const { rerender } = render(<Loading aria-label="Loading…" size="small" />)
        const smallSize = getSize()

        rerender(<Loading aria-label="Loading…" size="medium" />)
        const mediumSize = getSize()

        rerender(<Loading aria-label="Loading…" size="large" />)
        const largeSize = getSize()

        expect(smallSize).toBeLessThan(mediumSize)
        expect(mediumSize).toBeLessThan(largeSize)
    })

    it('renders in small size if an invalid size is given', () => {
        const { rerender } = render(<Loading aria-label="Loading…" size="small" />)
        const smallSize = getSize()
        rerender(
            <Loading
                aria-label="Loading…"
                // @ts-expect-error invalid value given on purpose
                size="wrong"
            />,
        )
        expect(getSize()).toEqual(smallSize)
    })

    it('supports having its label set via aria-labelledby', () => {
        render(
            <>
                <Loading aria-labelledby="label-id" />
                <div id="label-id">Loading data…</div>
            </>,
        )
        expect(screen.getByRole('progressbar', { name: 'Loading data…' })).toBeInTheDocument()
    })
})
