import * as React from 'react'

import { render, screen } from '@testing-library/react'
import { axe } from 'jest-axe'

import { Display } from './display'

const displayVariants = ['display-1', 'display-2', 'display-3', 'display-4', 'display-5'] as const

describe('Display', () => {
    it.each(displayVariants)('applies the %s variant', (variant) => {
        render(
            <Display data-testid="display-element" variant={variant}>
                Display
            </Display>,
        )
        expect(screen.getByTestId('display-element')).toHaveClass('variant-' + variant)
    })

    it('renders a div by default', () => {
        render(
            <Display data-testid="display-element" variant="display-1">
                Display
            </Display>,
        )
        expect(screen.getByTestId('display-element').tagName).toBe('DIV')
    })

    it('renders through Ariakit Role', () => {
        render(
            <Display
                data-testid="display-element"
                variant="display-2"
                render={<h1 id="page-title" />}
            >
                Page title
            </Display>,
        )
        const element = screen.getByRole('heading', { level: 1, name: 'Page title' })
        expect(element).toHaveAttribute('id', 'page-title')
        expect(element).toHaveClass('variant-display-2')
    })

    it('does not acknowledge className but accepts exceptionallySetClassName', () => {
        render(
            <Display
                data-testid="display-element"
                variant="display-3"
                // @ts-expect-error className is intentionally unavailable
                className="wrong"
                exceptionallySetClassName="right"
            >
                Display
            </Display>,
        )
        expect(screen.getByTestId('display-element')).toHaveClass('right')
        expect(screen.getByTestId('display-element')).not.toHaveClass('wrong')
    })

    it('supports tone, responsive alignment, and line clamping', () => {
        render(
            <Display
                data-testid="display-element"
                variant="display-4"
                tone="secondary"
                align={{ mobile: 'start', tablet: 'center', desktop: 'end' }}
                lineClamp={2}
            >
                Display
            </Display>,
        )
        expect(screen.getByTestId('display-element')).toHaveClass(
            'tone-secondary',
            'textAlign-start',
            'tablet-textAlign-center',
            'desktop-textAlign-end',
            'lineClamp-2',
            'lineClampMultipleLines',
            'paddingRight-xsmall',
        )
    })

    it('forwards its ref', () => {
        const ref = React.createRef<HTMLDivElement>()
        render(
            <Display variant="display-5" ref={ref}>
                Display
            </Display>,
        )
        expect(ref.current?.tagName).toBe('DIV')
    })

    it('has no accessibility violations', async () => {
        const { container } = render(
            <>
                <Display variant="display-1">Display</Display>
                <Display variant="display-2" render={<h1 />}>
                    Page title
                </Display>
            </>,
        )
        expect(await axe(container)).toHaveNoViolations()
    })
})
