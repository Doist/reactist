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
    })
})
