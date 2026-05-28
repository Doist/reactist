import * as React from 'react'

import { fireEvent, render, screen } from '@testing-library/react'
import { axe } from 'jest-axe'

import { Avatar } from './avatar'

describe('Avatar', () => {
    function failAvatarImage(currentSrc?: string) {
        const image = screen.getByRole('img', { name: 'Jane Doe' })

        if (currentSrc) {
            Object.defineProperty(image, 'currentSrc', {
                configurable: true,
                value: currentSrc,
            })
        }

        fireEvent.error(image)
    }

    it('renders a string image URL', () => {
        render(<Avatar data-testid="avatar" size={36} name="Jane Doe" image="avatar.png" />)

        expect(screen.getByRole('img', { name: 'Jane Doe' })).toHaveAttribute('src', 'avatar.png')
        expect(screen.getByTestId('avatar')).toHaveClass('size-36')
    })

    it('does not apply meta color classes while rendering an image', () => {
        render(<Avatar data-testid="avatar" size={36} name="Jane Doe" image="avatar.png" />)

        expect(
            Array.from(screen.getByTestId('avatar').classList).some((className) =>
                className.startsWith('meta-color-'),
            ),
        ).toBe(false)
    })

    it('renders a source-map image URL with native responsive image hints', () => {
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
        expect(image).toHaveAttribute('src', 'avatar-144.png')
        expect(image).toHaveAttribute(
            'srcset',
            'avatar-36.png 36w, avatar-72.png 72w, avatar-144.png 144w',
        )
        expect(image).toHaveAttribute('sizes', '36px')
    })

    it('falls back to initials when no image is provided', () => {
        render(<Avatar data-testid="avatar" size={36} name="Jane Doe" />)

        const initials = screen.getByRole('img', { name: 'Jane Doe' })
        expect(initials).toHaveTextContent('JD')
        expect(initials).toHaveClass('meta-color-0')
    })

    it('applies the deterministic meta color class for the avatar name', () => {
        render(<Avatar data-testid="avatar" size={36} name="John Doe" />)

        expect(screen.getByRole('img', { name: 'John Doe' })).toHaveClass('meta-color-9')
    })

    it('falls back to initials when image source map is empty', () => {
        render(<Avatar size={36} name="Jane Doe" image={{}} />)

        expect(screen.getByRole('img', { name: 'Jane Doe' })).toHaveTextContent('JD')
    })

    it('falls back to initials when the image fails to load', () => {
        render(<Avatar size={36} name="Jane Doe" image="missing.png" />)

        failAvatarImage()

        expect(screen.getByRole('img', { name: 'Jane Doe' })).toHaveTextContent('JD')
    })

    it('allows a new image to load after a failed image changes', () => {
        const { rerender } = render(<Avatar size={36} name="Jane Doe" image="missing.png" />)

        failAvatarImage()
        expect(screen.getByRole('img', { name: 'Jane Doe' })).toHaveTextContent('JD')

        rerender(<Avatar size={36} name="Jane Doe" image="avatar.png" />)

        expect(screen.getByRole('img', { name: 'Jane Doe' })).toHaveAttribute('src', 'avatar.png')
    })

    it('keeps the root element mounted when resetting failed image state', () => {
        const { rerender } = render(
            <Avatar data-testid="avatar" size={36} name="Jane Doe" image="missing.png" />,
        )
        const avatarRoot = screen.getByTestId('avatar')

        failAvatarImage()

        rerender(<Avatar data-testid="avatar" size={36} name="Jane Doe" image="avatar.png" />)

        expect(screen.getByTestId('avatar')).toBe(avatarRoot)
        expect(screen.getByRole('img', { name: 'Jane Doe' })).toHaveAttribute('src', 'avatar.png')
    })

    it('removes a failed source-map candidate and retries with the remaining candidates', () => {
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

        failAvatarImage('avatar-144.png')

        const image = screen.getByRole('img', { name: 'Jane Doe' })
        expect(image).toHaveAttribute('src', 'avatar-72.png')
        expect(image).toHaveAttribute('srcset', 'avatar-36.png 36w, avatar-72.png 72w')
        expect(image).toHaveAttribute('sizes', '36px')
    })

    it('removes the selected source-map candidate when it is not the fallback src', () => {
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

        failAvatarImage(new URL('avatar-72.png', document.baseURI).href)

        const image = screen.getByRole('img', { name: 'Jane Doe' })
        expect(image).toHaveAttribute('src', 'avatar-144.png')
        expect(image).toHaveAttribute('srcset', 'avatar-36.png 36w, avatar-144.png 144w')
        expect(image).toHaveAttribute('sizes', '36px')
    })

    it('keeps filtered source-map candidates when only the avatar size changes', () => {
        const image = {
            36: 'avatar-36.png',
            72: 'avatar-72.png',
            144: 'avatar-144.png',
        }
        const { rerender } = render(<Avatar size={36} name="Jane Doe" image={image} />)

        failAvatarImage('avatar-144.png')

        rerender(<Avatar size={72} name="Jane Doe" image={image} />)

        const retriedImage = screen.getByRole('img', { name: 'Jane Doe' })
        expect(retriedImage).toHaveAttribute('src', 'avatar-72.png')
        expect(retriedImage).toHaveAttribute('srcset', 'avatar-36.png 36w, avatar-72.png 72w')
        expect(retriedImage).toHaveAttribute('sizes', '72px')
    })

    it('falls back to initials when every source-map candidate fails', () => {
        render(
            <Avatar
                size={36}
                name="Jane Doe"
                image={{
                    36: 'avatar-36.png',
                    72: 'avatar-72.png',
                }}
            />,
        )

        failAvatarImage('avatar-72.png')
        failAvatarImage('avatar-36.png')

        expect(screen.getByRole('img', { name: 'Jane Doe' })).toHaveTextContent('JD')
    })

    it('retries a failed image when the same image is provided after being removed', () => {
        const { rerender } = render(<Avatar size={36} name="Jane Doe" image="missing.png" />)

        failAvatarImage()
        expect(screen.getByRole('img', { name: 'Jane Doe' })).toHaveTextContent('JD')

        rerender(<Avatar size={36} name="Jane Doe" />)
        expect(screen.getByRole('img', { name: 'Jane Doe' })).toHaveTextContent('JD')

        rerender(<Avatar size={36} name="Jane Doe" image="missing.png" />)

        expect(screen.getByRole('img', { name: 'Jane Doe' })).toHaveAttribute('src', 'missing.png')
    })

    it('renders a neutral empty avatar when no name or image is provided', () => {
        render(<Avatar data-testid="avatar" size={36} />)

        expect(screen.getByTestId('avatar')).not.toHaveClass('meta-color-0')
        expect(screen.getByTestId('avatar')).toHaveTextContent('')
        expect(screen.queryByRole('img')).not.toBeInTheDocument()
    })

    it('can render the root as a different element', () => {
        render(<Avatar as="section" data-testid="avatar" size={36} name="Jane Doe" />)

        expect(screen.getByTestId('avatar').tagName).toBe('SECTION')
    })

    it('derives the root ref type from the element rendered with as', () => {
        const anchorRef = React.createRef<HTMLAnchorElement>()
        const buttonRef = React.createRef<HTMLButtonElement>()

        render(
            <Avatar
                as="a"
                data-testid="avatar"
                href="/profile"
                ref={anchorRef}
                size={36}
                name="Jane Doe"
            />,
        )

        expect(anchorRef.current).toBe(screen.getByTestId('avatar'))

        const invalidRefElement = (
            // @ts-expect-error refs must match the element selected with as
            <Avatar as="a" href="/profile" ref={buttonRef} size={36} name="Jane Doe" />
        )
        expect(invalidRefElement).toBeTruthy()
    })

    it('supports rounded shape with size-driven CSS classes', () => {
        render(<Avatar data-testid="avatar" size={50} shape="rounded" name="Design" />)

        expect(screen.getByTestId('avatar')).toHaveClass('shape-rounded')
        expect(screen.getByTestId('avatar')).toHaveClass('size-50')
    })

    it('defaults to circle shape', () => {
        render(<Avatar data-testid="avatar" size={36} name="Jane Doe" />)

        expect(screen.getByTestId('avatar')).toHaveClass('shape-circle')
    })

    it('uses custom alt text as the accessible label', () => {
        render(<Avatar size={36} name="Jane Doe" image="avatar.png" alt="Account avatar" />)

        expect(screen.getByRole('img', { name: 'Account avatar' })).toBeInTheDocument()
    })

    it('uses custom alt text as the accessible label for initials avatars', () => {
        render(<Avatar size={36} name="Jane Doe" alt="Account avatar" />)

        expect(screen.getByRole('img', { name: 'Account avatar' })).toHaveTextContent('JD')
    })

    it('normalizes the default accessible label before deciding whether it is decorative', () => {
        render(<Avatar data-testid="avatar" size={36} name="   " image="avatar.png" />)

        expect(screen.queryByRole('img')).not.toBeInTheDocument()
        expect(screen.getByAltText('')).toHaveAttribute('src', 'avatar.png')
        expect(screen.getByAltText('')).toHaveAttribute('aria-hidden', 'true')
        expect(screen.getByTestId('avatar')).not.toHaveAttribute('aria-hidden')
    })

    it('supports decorative image avatars with empty alt text', () => {
        render(<Avatar size={36} name="Jane Doe" image="avatar.png" alt="" />)

        expect(screen.queryByRole('img')).not.toBeInTheDocument()
        expect(screen.getByAltText('')).toHaveAttribute('src', 'avatar.png')
        expect(screen.getByAltText('')).toHaveAttribute('aria-hidden', 'true')
    })

    it('supports decorative initials avatars with empty alt text', () => {
        render(<Avatar data-testid="avatar" size={36} name="Jane Doe" alt="" />)

        expect(screen.queryByRole('img')).not.toBeInTheDocument()
        expect(screen.getByText('JD')).toHaveAttribute('aria-hidden', 'true')
        expect(screen.getByTestId('avatar')).not.toHaveAttribute('aria-hidden')
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

    describe('a11y', () => {
        it('renders with no a11y violations', async () => {
            const { container } = render(
                <>
                    <Avatar size={36} name="Jane Doe" image="avatar.png" />
                    <Avatar size={36} name="John Doe" />
                    <Avatar size={36} name="Decorative Image" image="decorative.png" alt="" />
                    <Avatar size={36} name="Decorative Initials" alt="" />
                    <Avatar size={36} />
                </>,
            )
            const results = await axe(container)

            expect(results).toHaveNoViolations()
        })
    })
})
