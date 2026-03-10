import * as React from 'react'

import { render, screen } from '@testing-library/react'
import { axe } from 'jest-axe'

import { ProgressBar } from './progress-bar'

describe('ProgressBar', () => {
    it('renders without crashing', () => {
        const progressBar = render(<ProgressBar />)
        expect(progressBar.container).toMatchSnapshot()
    })

    it('uses 0% width for fillPercentages smaller than 0', () => {
        render(<ProgressBar fillPercentage={-1} />)
        expect(screen.getByRole('progressbar')).toHaveValue(0)
    })

    it('uses 100% width for fillPercentages larger than 100', () => {
        render(<ProgressBar fillPercentage={1337} />)
        expect(screen.getByRole('progressbar')).toHaveValue(100)
    })

    describe('showScale', () => {
        it('does not render scale by default', () => {
            const { container } = render(<ProgressBar fillPercentage={50} />)
            expect(container.querySelector('[aria-hidden="true"]')).not.toBeInTheDocument()
        })

        it('renders scale with correct labels when showScale is true', () => {
            const { container } = render(<ProgressBar fillPercentage={50} showScale />)
            const ticks = container.querySelector('[aria-hidden="true"]')
            expect(ticks).toBeInTheDocument()

            const spans = ticks!.querySelectorAll('span')
            expect(spans).toHaveLength(5)
            expect(spans[0]).toHaveTextContent('00')
            expect(spans[1]).toHaveTextContent('25')
            expect(spans[2]).toHaveTextContent('50')
            expect(spans[3]).toHaveTextContent('75')
            expect(spans[4]).toHaveTextContent('')
        })

        it('marks scale as aria-hidden', () => {
            const { container } = render(<ProgressBar fillPercentage={50} showScale />)
            const ticks = container.querySelector('[aria-hidden="true"]')
            expect(ticks).toBeInTheDocument()
        })

        it('applies className to wrapper when showScale is true', () => {
            const { container } = render(
                <ProgressBar fillPercentage={50} showScale className="custom-class" />,
            )
            // The outermost div should have the custom class
            expect(container.firstElementChild).toHaveClass('custom-class')
            // The progress bar div should not have the custom class
            expect(container.querySelector('[class*="progressBar"]')).not.toHaveClass(
                'custom-class',
            )
        })
    })

    describe('a11y', () => {
        it('renders with no a11y violations', async () => {
            const { container } = render(<ProgressBar fillPercentage={50} />)
            const results = await axe(container)

            expect(results).toHaveNoViolations()
        })

        it('supports the `aria-valuetext` attribute', () => {
            render(<ProgressBar fillPercentage={50} aria-valuetext="Step 2: Copying files..." />)
            expect(screen.getByRole('progressbar')).toHaveAttribute(
                'aria-valuetext',
                'Step 2: Copying files...',
            )
        })

        it('renders with no a11y violations when showScale is true', async () => {
            const { container } = render(<ProgressBar fillPercentage={50} showScale />)
            const results = await axe(container)

            expect(results).toHaveNoViolations()
        })
    })
})
