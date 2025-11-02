import * as React from 'react'

import { render, screen, within } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { axe } from 'jest-axe'

import { Banner, SystemBannerType } from './banner'

describe('Banner', () => {
    it('renders as a <div /> element', () => {
        render(<Banner type="info" description="This is an info message" />)
        expect(screen.getByRole('status').tagName).toBe('DIV')
    })

    it('renders the title inside the banner element', () => {
        render(<Banner type="info" title="Info title" description="This is an info message" />)
        expect(screen.getByRole('status')).toHaveTextContent('Info title')
    })

    it('by default does not render an icon for neutral type', () => {
        expect(screen.queryByTestId('banner-icon-neutral')).not.toBeInTheDocument()
        expect(screen.queryByRole('img')).not.toBeInTheDocument()
    })

    it('renders a custom icon for neutral type', () => {
        render(<Banner type="neutral" icon={<span>Custom Icon</span>} description="Info" />)
        expect(screen.getByText('Custom Icon')).toBeInTheDocument()
    })

    it('renders an image for neutral type', () => {
        render(<Banner type="neutral" image={<img alt="Custom Image" />} description="Info" />)
        expect(screen.getByAltText('Custom Image')).toBeInTheDocument()
    })

    test.each([
        ['info' as SystemBannerType, 'info'],
        ['upgrade' as SystemBannerType, 'upgrade'],
        ['experiment' as SystemBannerType, 'experiment'],
        ['warning' as SystemBannerType, 'warning'],
        ['error' as SystemBannerType, 'error'],
        ['success' as SystemBannerType, 'success'],
    ])('renders a different icon according to the type', (type, expectedtype) => {
        render(<Banner type={type} description="This is a message" />)
        expect(
            within(screen.getByRole('status')).getByTestId(`banner-icon-${expectedtype}`),
        ).toBeInTheDocument()
    })

    it('passes through aria-related attributes', () => {
        render(<Banner type="info" description="Info" aria-hidden="true" />)
        expect(screen.queryByRole('status')).not.toBeInTheDocument()
        expect(screen.getByRole('status', { hidden: true })).toBeInTheDocument()
    })

    it('passes through data-* attributes', () => {
        render(
            <Banner
                type="info"
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
                type="info"
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
                type="info"
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
                type="info"
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
        render(<Banner type="info" title="Hello World" description="Description" />)
        expect(screen.getByRole('status', { name: 'Hello World' })).toBeInTheDocument()
    })

    it("uses the description as the accessible name if there isn't a title", () => {
        render(<Banner type="info" description="Hello World" />)
        expect(screen.getByRole('status', { name: 'Hello World' })).toBeInTheDocument()
    })

    it('renders action button', () => {
        const onClickSpy = jest.fn()
        render(
            <Banner
                type="info"
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
                type="info"
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
                type="info"
                description="Info"
                inlineLinks={[{ label: 'Learn more', href: '#' }]}
            />,
        )
        expect(screen.getByRole('link', { name: 'Learn more' })).toBeInTheDocument()
    })

    it('renders multiple inline links', () => {
        render(
            <Banner
                type="info"
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
        const { rerender } = render(<Banner type="info" description="Info" />)
        expect(screen.queryByRole('button', { name: 'Close banner' })).not.toBeInTheDocument()

        rerender(<Banner type="info" description="Info" onClose={onClose} />)
        // close button is rendered twice because depending on banner size it can be in two places,
        // but only one is visible at a time (the other is set to display: none with CSS)
        expect(screen.getAllByRole('button', { name: 'Close banner' })).toHaveLength(2)

        rerender(
            <Banner
                type="info"
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
                type="info"
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
                <Banner type="info" description="Info" />
                <Banner
                    type="neutral"
                    title="This is a title"
                    description="This is a description"
                    icon={<span>Custom Icon</span>}
                    onClose={jest.fn()}
                    inlineLinks={[{ label: 'Link 1', href: '#' }]}
                />
                <Banner type="upgrade" title description="Promotion" />
            </>,
        )
        const results = await axe(container)
        expect(results).toHaveNoViolations()
    })
})
