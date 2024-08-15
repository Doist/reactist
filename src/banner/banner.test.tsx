import * as React from 'react'
import { render, screen } from '@testing-library/react'
import { axe } from 'jest-axe'
import { Banner, BannerTone } from './banner'

describe('Banner', () => {
    it('renders as a <div /> element', () => {
        render(<Banner tone="info" icon={'💚'} title={'Info'} data-testid="test-banner" />)
        expect(screen.getByTestId('test-banner').tagName).toBe('DIV')
    })

    it('renders the title inside the badge element', () => {
        render(<Banner tone="info" icon={'💚'} title={'New'} data-testid="test-banner" />)
        expect(screen.getByTestId('test-banner')).toHaveTextContent('New')
    })

    test.each([
        ['info' as BannerTone, 'title-info'],
        ['promotion' as BannerTone, 'title-promotion'],
    ])('renders a different CSS class according to the tone', (tone, expectedCSSClass) => {
        render(<Banner tone={tone} icon={'💚'} title={'Info'} />)
        expect(screen.getByText('Info')).toHaveClass(expectedCSSClass)
    })

    it('passes through aria-related attributes', () => {
        render(
            <Banner
                tone="info"
                icon={'💚'}
                title={'Info'}
                data-testid="test-banner"
                aria-hidden="true"
            />,
        )
        expect(screen.getByTestId('test-banner')).toHaveAttribute('aria-hidden', 'true')
    })

    it('passes through data-* attributes', () => {
        // Even though the use of data-testid already proves that the test passes, it may be important
        // to assert that any data-* attribute is forwarded as well.
        render(
            <Banner
                tone="info"
                icon={'💚'}
                title={'Info'}
                data-testid="test-banner"
                data-gtm-id="track-id"
            />,
        )
        expect(screen.getByTestId('test-banner')).toHaveAttribute('data-gtm-id', 'track-id')
    })

    it('does not passes through other attributes such as className, or exceptionallySetClassName', () => {
        render(
            <Banner
                tone="info"
                icon={'💚'}
                title={'Info'}
                data-testid="test-banner"
                // @ts-expect-error
                className="test-one"
                exceptionallySetClassName="test-two"
            />,
        )
        expect(screen.getByTestId('test-banner')).not.toHaveClass('test-one')
        expect(screen.getByTestId('test-banner')).not.toHaveClass('test-two')
    })

    it('renders more than one banner with no a11y violations', async () => {
        const { container } = render(
            <>
                <Banner tone="info" icon={'💚'} title={'Info'} />
                <Banner tone="promotion" icon={'🧡'} title={'Promotion'} />
            </>,
        )
        const results = await axe(container)
        expect(results).toHaveNoViolations()
    })

    it('honors rich text', () => {
        render(
            <Banner
                tone="info"
                icon={'💚'}
                title={
                    <>
                        This is really <strong>important</strong>
                    </>
                }
                data-testid="test-banner"
            />,
        )
        expect(screen.getByTestId('test-banner').innerHTML).toContain(
            'This is really <strong>important</strong>',
        )
    })

    it('uses the title as the accessible name', () => {
        render(<Banner tone="info" icon={'💚'} title={'Hello World'} />)
        expect(screen.getByRole('status', { name: 'Hello World' })).toBeInTheDocument()
    })

    it('uses the description as the accessible description', () => {
        render(
            <Banner
                tone="info"
                icon={'💚'}
                title={'Hello World'}
                description={'Welcome to the world, Linus!'}
            />,
        )
        expect(screen.getByRole('status', { name: 'Hello World' })).toHaveAccessibleDescription(
            'Welcome to the world, Linus!',
        )
    })

    it('does not have an accessible description if description is missing', () => {
        render(<Banner tone="info" icon={'💚'} title={'Hello World'} />)
        expect(
            screen.getByRole('status', { name: 'Hello World' }),
        ).not.toHaveAccessibleDescription()
    })
})
