import * as React from 'react'
import { render, screen } from '@testing-library/react'
import { Loading } from './loading'
import { axe } from 'jest-axe'

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

    describe('a11y', () => {
        test('renders with no a11y violations', async () => {
            const { container } = render(<Loading aria-label="Loading…" />)
            const results = await axe(container)

            expect(results).toHaveNoViolations()
        })

        it('adds a default `aria-label` attribute if not provided', () => {
            // @ts-expect-error prop missing on purpose
            render(<Loading />)
            expect(screen.getByRole('progressbar', { name: 'Loading…' })).toBeInTheDocument()
        })

        it('supports the `aria-label` attribute', () => {
            render(<Loading aria-label="Custom loading label" />)
            expect(
                screen.getByRole('progressbar', { name: 'Custom loading label' }),
            ).toBeInTheDocument()
        })

        it('supports the `aria-labelledby` attribute', () => {
            render(
                <>
                    <Loading aria-labelledby="label-id" />
                    <div id="label-id">Loading data…</div>
                </>,
            )
            expect(screen.getByRole('progressbar', { name: 'Loading data…' })).toBeInTheDocument()
        })

        it('supports the `aria-describedby` attribute', () => {
            render(
                <>
                    <Loading aria-label="Description test" aria-describedby="description-id" />
                    <div id="description-id">50% complete</div>
                </>,
            )
            expect(
                screen.getByRole('progressbar', { name: 'Description test' }),
            ).toHaveAccessibleDescription('50% complete')
        })
    })
})
