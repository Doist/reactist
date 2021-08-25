import * as React from 'react'
import { render, screen } from '@testing-library/react'
import { LoadingSpinner } from './loading-spinner'

function getSize() {
    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    const svg = screen.getByRole('progressbar', { name: 'Loading…' }).firstElementChild!
    const width = Number(svg.getAttribute('width'))
    const height = Number(svg.getAttribute('height'))
    expect(width).toEqual(height)
    return width
}

describe('LoadingSpinner', () => {
    it('renders an indeterminate progressbar', () => {
        render(<LoadingSpinner label="Loading…" />)
        expect(screen.getByRole('progressbar', { name: 'Loading…' })).toBeInTheDocument()
    })

    it('renders in small size by default', () => {
        const { rerender } = render(<LoadingSpinner label="Loading…" />)
        const originalSize = getSize()
        rerender(<LoadingSpinner label="Loading…" size="small" />)
        expect(getSize()).toEqual(originalSize)
    })

    it('renders with larger numeric sizes as the named size prop implies larger size', () => {
        const { rerender } = render(<LoadingSpinner label="Loading…" size="small" />)
        const smallSize = getSize()

        rerender(<LoadingSpinner label="Loading…" size="medium" />)
        const mediumSize = getSize()

        rerender(<LoadingSpinner label="Loading…" size="large" />)
        const largeSize = getSize()

        expect(smallSize).toBeLessThan(mediumSize)
        expect(mediumSize).toBeLessThan(largeSize)
    })
})
