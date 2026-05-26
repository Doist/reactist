import * as React from 'react'

import { fireEvent, render, screen } from '@testing-library/react'

import { Avatar } from './avatar'

describe('Avatar', () => {
    afterEach(() => {
        Object.defineProperty(window, 'devicePixelRatio', {
            configurable: true,
            value: 1,
        })
    })

    it('renders a string image URL', () => {
        render(<Avatar data-testid="avatar" size={36} name="Jane Doe" image="avatar.png" />)

        expect(screen.getByRole('img', { name: 'Jane Doe' })).toHaveAttribute('src', 'avatar.png')
        expect(screen.getByTestId('avatar')).toHaveStyle({
            '--reactist-avatar-size': '36px',
        })
    })

    it('renders a source-map image URL selected for pixel density', () => {
        Object.defineProperty(window, 'devicePixelRatio', {
            configurable: true,
            value: 2,
        })

        render(
            <Avatar
                size={36}
                name="Jane Doe"
                image={{
                    36: 'avatar-36.png',
                    72: 'avatar-72.png',
                    144: 'avatar-144.png',
                }}
            />,
        )

        const image = screen.getByRole('img', { name: 'Jane Doe' })
        expect(image).toHaveAttribute('src', 'avatar-72.png')
        expect(image).toHaveAttribute(
            'srcset',
            'avatar-36.png 36w, avatar-72.png 72w, avatar-144.png 144w',
        )
        expect(image).toHaveAttribute('sizes', '36px')
    })

    it('falls back to initials when no image is provided', () => {
        render(<Avatar data-testid="avatar" size={36} name="Jane Doe" />)

        expect(screen.getByRole('img', { name: 'Jane Doe' })).toHaveTextContent('JD')
        expect(screen.getByTestId('avatar')).toHaveStyle({
            '--reactist-avatar-meta-fill': 'var(--reactist-avatar-meta-fill-0)',
        })
    })

    it('falls back to initials when image source map is empty', () => {
        render(<Avatar size={36} name="Jane Doe" image={{}} />)

        expect(screen.getByRole('img', { name: 'Jane Doe' })).toHaveTextContent('JD')
    })

    it('falls back to initials when the image fails to load', () => {
        render(<Avatar size={36} name="Jane Doe" image="missing.png" />)

        fireEvent.error(screen.getByRole('img', { name: 'Jane Doe' }))

        expect(screen.getByRole('img', { name: 'Jane Doe' })).toHaveTextContent('JD')
    })

    it('allows a new image to load after a failed image changes', () => {
        const { rerender } = render(<Avatar size={36} name="Jane Doe" image="missing.png" />)

        fireEvent.error(screen.getByRole('img', { name: 'Jane Doe' }))
        expect(screen.getByRole('img', { name: 'Jane Doe' })).toHaveTextContent('JD')

        rerender(<Avatar size={36} name="Jane Doe" image="avatar.png" />)

        expect(screen.getByRole('img', { name: 'Jane Doe' })).toHaveAttribute('src', 'avatar.png')
    })

    it('retries a failed image when the same image is provided after being removed', () => {
        const { rerender } = render(<Avatar size={36} name="Jane Doe" image="missing.png" />)

        fireEvent.error(screen.getByRole('img', { name: 'Jane Doe' }))
        expect(screen.getByRole('img', { name: 'Jane Doe' })).toHaveTextContent('JD')

        rerender(<Avatar size={36} name="Jane Doe" />)
        expect(screen.getByRole('img', { name: 'Jane Doe' })).toHaveTextContent('JD')

        rerender(<Avatar size={36} name="Jane Doe" image="missing.png" />)

        expect(screen.getByRole('img', { name: 'Jane Doe' })).toHaveAttribute('src', 'missing.png')
    })

    it('renders a neutral empty avatar when no name or image is provided', () => {
        render(<Avatar data-testid="avatar" size={36} />)

        expect(screen.getByTestId('avatar')).toHaveClass('empty')
        expect(screen.getByTestId('avatar')).toHaveTextContent('')
    })

    it('supports rounded shape with size-aware radius', () => {
        render(<Avatar data-testid="avatar" size={50} shape="rounded" name="Design" />)

        expect(screen.getByTestId('avatar')).toHaveClass('shape-rounded')
        expect(screen.getByTestId('avatar')).toHaveStyle({
            '--reactist-avatar-rounded-radius': '7px',
        })
    })

    it('defaults to circle shape', () => {
        render(<Avatar data-testid="avatar" size={36} name="Jane Doe" />)

        expect(screen.getByTestId('avatar')).toHaveClass('shape-circle')
    })

    it('uses custom alt text as the accessible label', () => {
        render(<Avatar size={36} name="Jane Doe" image="avatar.png" alt="Account avatar" />)

        expect(screen.getByRole('img', { name: 'Account avatar' })).toBeInTheDocument()
    })

    it('supports decorative image avatars with empty alt text', () => {
        render(<Avatar size={36} name="Jane Doe" image="avatar.png" alt="" />)

        expect(screen.queryByRole('img')).not.toBeInTheDocument()
        expect(screen.getByAltText('')).toHaveAttribute('src', 'avatar.png')
    })

    it('supports decorative initials avatars with empty alt text', () => {
        render(<Avatar data-testid="avatar" size={36} name="Jane Doe" alt="" />)

        expect(screen.queryByRole('img')).not.toBeInTheDocument()
        expect(screen.getByTestId('avatar')).toHaveAttribute('aria-hidden', 'true')
        expect(screen.getByTestId('avatar')).toHaveTextContent('JD')
    })

    it('applies the escape hatch class name', () => {
        render(
            <Avatar
                data-testid="avatar"
                size={36}
                name="Jane Doe"
                exceptionallySetClassName="custom-avatar"
            />,
        )

        expect(screen.getByTestId('avatar')).toHaveClass('custom-avatar')
    })
})
