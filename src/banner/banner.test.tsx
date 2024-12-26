import * as React from 'react'
import { render, screen, within } from '@testing-library/react'
import { axe } from 'jest-axe'
import { Banner, SystemBannerTone } from './banner'
import userEvent from '@testing-library/user-event'

describe('Banner', () => {
    it('renders as a <div /> element', () => {
        render(<Banner tone="info" description="This is an info message" />)
        expect(screen.getByRole('status').tagName).toBe('DIV')
    })

    it('renders the title inside the banner element', () => {
        render(<Banner tone="info" title="Info title" description="This is an info message" />)
        expect(screen.getByRole('status')).toHaveTextContent('Info title')
    })

    it('by default does not render an icon for neutral tone', () => {
        expect(screen.queryByTestId('banner-icon-neutral')).not.toBeInTheDocument()
        expect(screen.queryByRole('img')).not.toBeInTheDocument()
    })

    it('renders a custom icon for neutral tone', () => {
        render(<Banner tone="neutral" icon={<span>Custom Icon</span>} description="Info" />)
        expect(screen.getByText('Custom Icon')).toBeInTheDocument()
    })

    it('renders an image for neutral tone', () => {
        render(<Banner tone="neutral" image={<img alt="Custom Image" />} description="Info" />)
        expect(screen.getByAltText('Custom Image')).toBeInTheDocument()
    })

    test.each([
        ['info' as SystemBannerTone, 'info'],
        ['upgrade' as SystemBannerTone, 'upgrade'],
        ['experiment' as SystemBannerTone, 'experiment'],
        ['warning' as SystemBannerTone, 'warning'],
        ['error' as SystemBannerTone, 'error'],
        ['success' as SystemBannerTone, 'success'],
    ])('renders a different icon according to the tone', (tone, expectedTone) => {
        render(<Banner tone={tone} description="This is a message" />)
        expect(
            within(screen.getByRole('status')).getByTestId(`banner-icon-${expectedTone}`),
        ).toBeInTheDocument()
    })

    it('passes through aria-related attributes', () => {
        render(<Banner tone="info" description="Info" aria-hidden="true" />)
        expect(screen.queryByRole('status')).not.toBeInTheDocument()
        expect(screen.getByRole('status', { hidden: true })).toBeInTheDocument()
    })

    it('passes through data-* attributes', () => {
        render(
            <Banner
                tone="info"
                description="Info"
                data-testid="test-banner"
                data-gtm-id="track-id"
            />,
        )
        expect(screen.getByRole('status')).toHaveAttribute('data-gtm-id', 'track-id')
    })

    it('does not pass through other attributes such as className, or exceptionallySetClassName', () => {
        render(
            <Banner
                tone="info"
                description="Info"
                // @ts-expect-error
                className="test-one"
                exceptionallySetClassName="test-two"
            />,
        )
        expect(screen.getByRole('status')).not.toHaveClass('test-one')
        expect(screen.getByRole('status')).not.toHaveClass('test-two')
    })

    it('honors rich text in the title', () => {
        render(
            <Banner
                tone="info"
                title={
                    <>
                        This is really <strong>important</strong>
                    </>
                }
                description="Description"
            />,
        )
        expect(screen.getByRole('status').innerHTML).toContain(
            'This is really <strong>important</strong>',
        )
    })

    it('honors rich text in the description', () => {
        render(
            <Banner
                tone="info"
                description={
                    <>
                        This is really <strong>important</strong>
                    </>
                }
            />,
        )
        expect(screen.getByRole('status').innerHTML).toContain(
            'This is really <strong>important</strong>',
        )
    })

    it('uses the title as the accessible name', () => {
        render(<Banner tone="info" title="Hello World" description="Description" />)
        expect(screen.getByRole('status', { name: 'Hello World' })).toBeInTheDocument()
    })

    it("uses the description as the accessible name if there isn't a title", () => {
        render(<Banner tone="info" description="Hello World" />)
        expect(screen.getByRole('status', { name: 'Hello World' })).toBeInTheDocument()
    })

    it('renders action button', () => {
        const onClickSpy = jest.fn()
        render(
            <Banner
                tone="info"
                description="Info"
                action={{
                    type: 'button',
                    variant: 'primary',
                    label: 'Click Me',
                    onClick: onClickSpy,
                }}
            />,
        )
        userEvent.click(screen.getByRole('button', { name: 'Click Me' }))
        expect(onClickSpy).toHaveBeenCalled()
    })

    it('renders action link', () => {
        render(
            <Banner
                tone="info"
                description="Info"
                action={{
                    type: 'link',
                    variant: 'primary',
                    label: 'Click Me',
                    href: 'http://localhost',
                }}
            />,
        )
        expect(screen.getByRole('link', { name: 'Click Me' })).toHaveAttribute(
            'href',
            'http://localhost',
        )
    })

    it('renders inline link', () => {
        render(
            <Banner
                tone="info"
                description="Info"
                inlineLinks={[{ label: 'Learn more', href: '#' }]}
            />,
        )
        expect(screen.getByRole('link', { name: 'Learn more' })).toBeInTheDocument()
    })

    it('renders multiple inline links', () => {
        render(
            <Banner
                tone="info"
                description={<p>Info</p>}
                inlineLinks={[
                    { label: 'Learn more', href: '#' },
                    { label: 'Send feedback', href: '#' },
                ]}
            />,
        )
        expect(screen.getByRole('link', { name: 'Learn more' })).toBeInTheDocument()
        expect(screen.getByRole('link', { name: 'Send feedback' })).toBeInTheDocument()
        expect(screen.getByRole('status')).toHaveTextContent('Learn more · Send feedback')
    })

    it('renders close button', () => {
        const onClose = jest.fn()
        const { rerender } = render(<Banner tone="info" description="Info" />)
        expect(screen.queryByRole('button', { name: 'Close banner' })).not.toBeInTheDocument()

        rerender(<Banner tone="info" description="Info" onClose={onClose} />)
        // close button is rendered twice because depending on banner size it can be in two places,
        // but only one is visible at a time (the other is set to display: none with CSS)
        expect(screen.getAllByRole('button', { name: 'Close banner' })).toHaveLength(2)

        rerender(
            <Banner
                tone="info"
                description="Info"
                closeLabel="Custom close label"
                onClose={onClose}
            />,
        )
        // close button is rendered twice because depending on banner size it can be in two places,
        // but only one is visible at a time (the other is set to display: none with CSS)
        expect(screen.getAllByRole('button', { name: 'Custom close label' })).toHaveLength(2)
    })

    it('calls onClose when close button is clicked', () => {
        const onClose = jest.fn()
        render(
            <Banner
                tone="info"
                description="Info"
                closeLabel="Custom close label"
                onClose={onClose}
            />,
        )
        // close button is rendered twice because depending on banner size it can be in two places,
        // but only one is visible at a time (the other is set to display: none with CSS)
        // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
        userEvent.click(screen.getAllByRole('button', { name: 'Custom close label' })[0]!)
        expect(onClose).toHaveBeenCalledTimes(1)
    })

    it('renders more than one banner with no a11y violations', async () => {
        const { container } = render(
            <>
                <Banner tone="info" description="Info" />
                <Banner
                    tone="neutral"
                    title="This is a title"
                    description="This is a description"
                    icon={<span>Custom Icon</span>}
                    onClose={jest.fn()}
                    inlineLinks={[{ label: 'Link 1', href: '#' }]}
                />
                <Banner tone="upgrade" title description="Promotion" />
            </>,
        )
        const results = await axe(container)
        expect(results).toHaveNoViolations()
    })
})
