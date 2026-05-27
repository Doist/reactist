import * as React from 'react'

import { fireEvent, render, screen } from '@testing-library/react'
import { axe } from 'jest-axe'

import { Avatar, AvatarGroup, AvatarPair } from './avatar'

describe('Avatar', () => {
    function failCurrentAvatarImage(currentSrc: string) {
        const image = screen.getByRole('img', { name: 'Jane Doe' })
        Object.defineProperty(image, 'currentSrc', {
            configurable: true,
            value: currentSrc,
        })
        fireEvent.error(image)
    }

    it('renders a string image URL', () => {
        render(<Avatar data-testid="avatar" size={36} name="Jane Doe" image="avatar.png" />)

        expect(screen.getByRole('img', { name: 'Jane Doe' })).toHaveAttribute('src', 'avatar.png')
        expect(screen.getByTestId('avatar')).toHaveStyle({
            '--reactist-avatar-size': '36px',
        })
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

        expect(screen.getByRole('img', { name: 'Jane Doe' })).toHaveTextContent('JD')
        expect(screen.getByTestId('avatar')).toHaveClass('meta-color-0')
    })

    it('applies the deterministic meta color class for the avatar name', () => {
        render(<Avatar data-testid="avatar" size={36} name="John Doe" />)

        expect(screen.getByTestId('avatar')).toHaveClass('meta-color-9')
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

        failCurrentAvatarImage('avatar-144.png')

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

        failCurrentAvatarImage(new URL('avatar-72.png', document.baseURI).href)

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

        failCurrentAvatarImage('avatar-144.png')

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

        failCurrentAvatarImage('avatar-72.png')
        failCurrentAvatarImage('avatar-36.png')

        expect(screen.getByRole('img', { name: 'Jane Doe' })).toHaveTextContent('JD')
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

    it('uses custom alt text as the accessible label for initials avatars', () => {
        render(<Avatar size={36} name="Jane Doe" alt="Account avatar" />)

        expect(screen.getByRole('img', { name: 'Account avatar' })).toHaveTextContent('JD')
    })

    it('normalizes the default accessible label before deciding whether it is decorative', () => {
        render(<Avatar data-testid="avatar" size={36} name="   " image="avatar.png" />)

        expect(screen.queryByRole('img')).not.toBeInTheDocument()
        expect(screen.getByAltText('')).toHaveAttribute('src', 'avatar.png')
        expect(screen.getByTestId('avatar')).toHaveAttribute('aria-hidden', 'true')
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

describe('AvatarGroup', () => {
    it('renders direct Avatar children without wrappers', () => {
        render(
            <AvatarGroup data-testid="group" size={36}>
                <Avatar data-testid="first" size={36} name="Jane Doe" />
                <Avatar data-testid="second" size={36} name="John Doe" />
            </AvatarGroup>,
        )

        expect(screen.getByTestId('group')).toContainElement(screen.getByTestId('first'))
        expect(screen.getByTestId('group')).toContainElement(screen.getByTestId('second'))
        expect(screen.getByTestId('first').parentElement).toBe(screen.getByTestId('group'))
        expect(screen.getByTestId('second').parentElement).toBe(screen.getByTestId('group'))
    })

    it('sets size-derived spacing variables', () => {
        render(
            <AvatarGroup data-testid="group" size={36}>
                <Avatar size={36} name="Jane Doe" />
                <Avatar size={36} name="John Doe" />
            </AvatarGroup>,
        )

        expect(screen.getByTestId('group')).toHaveStyle({
            '--reactist-avatar-group-size': '36px',
            '--reactist-avatar-group-overlap': '4px',
            '--reactist-avatar-group-mask': '2.5px',
            '--reactist-avatar-group-rounded-mask-radius': 'calc(5px + 2.5px)',
        })
    })

    it('sets large size-derived spacing variables', () => {
        render(
            <AvatarGroup data-testid="group" size={80}>
                <Avatar size={80} name="Jane Doe" />
                <Avatar size={80} name="John Doe" />
            </AvatarGroup>,
        )

        expect(screen.getByTestId('group')).toHaveStyle({
            '--reactist-avatar-group-size': '80px',
            '--reactist-avatar-group-overlap': '8px',
            '--reactist-avatar-group-mask': '3px',
            '--reactist-avatar-group-rounded-mask-radius': 'calc(10px + 3px)',
        })
    })

    it('exposes positive count through data-count', () => {
        render(
            <AvatarGroup data-testid="group" size={36} count={3}>
                <Avatar size={36} name="Jane Doe" />
                <Avatar size={36} name="John Doe" />
            </AvatarGroup>,
        )

        expect(screen.getByTestId('group')).toHaveAttribute('data-count', '3')
    })

    it('omits data-count when count is not positive', () => {
        render(
            <AvatarGroup data-testid="group" size={36} count={0}>
                <Avatar size={36} name="Jane Doe" />
                <Avatar size={36} name="John Doe" />
            </AvatarGroup>,
        )

        expect(screen.getByTestId('group')).not.toHaveAttribute('data-count')
    })

    it('omits data-count when count is not provided', () => {
        render(
            <AvatarGroup data-testid="group" size={36}>
                <Avatar size={36} name="Jane Doe" />
                <Avatar size={36} name="John Doe" />
            </AvatarGroup>,
        )

        expect(screen.getByTestId('group')).not.toHaveAttribute('data-count')
    })

    it('leaves the count overlay custom property available for CSS customization', () => {
        render(
            <AvatarGroup data-testid="group" size={36} count={3}>
                <Avatar size={36} name="Jane Doe" />
                <Avatar size={36} name="John Doe" />
            </AvatarGroup>,
        )

        expect(
            screen
                .getByTestId('group')
                .style.getPropertyValue('--reactist-avatar-group-count-overlay'),
        ).toBe('')
    })

    it('applies the group shape class', () => {
        render(
            <AvatarGroup data-testid="group" size={36} shape="rounded">
                <Avatar size={36} shape="rounded" name="Workspace" />
                <Avatar size={36} shape="rounded" name="Design System" />
            </AvatarGroup>,
        )

        expect(screen.getByTestId('group')).toHaveClass('avatarGroupShape-rounded')
    })

    it('applies the escape hatch class name', () => {
        render(
            <AvatarGroup data-testid="group" size={36} exceptionallySetClassName="custom-group">
                <Avatar size={36} name="Jane Doe" />
                <Avatar size={36} name="John Doe" />
            </AvatarGroup>,
        )

        expect(screen.getByTestId('group')).toHaveClass('custom-group')
    })

    it('can render as a button', () => {
        render(
            <AvatarGroup as="button" aria-label="Manage members" size={36}>
                <Avatar size={36} name="Jane Doe" />
                <Avatar size={36} name="John Doe" />
            </AvatarGroup>,
        )

        expect(screen.getByRole('button', { name: 'Manage members' })).toBeVisible()
    })

    it('derives the root ref type from the element rendered with as', () => {
        const anchorRef = React.createRef<HTMLAnchorElement>()
        const buttonRef = React.createRef<HTMLButtonElement>()

        render(
            <AvatarGroup as="a" data-testid="group" href="/members" ref={anchorRef} size={36}>
                <Avatar size={36} name="Jane Doe" />
                <Avatar size={36} name="John Doe" />
            </AvatarGroup>,
        )

        expect(anchorRef.current).toBe(screen.getByTestId('group'))

        const invalidRefElement = (
            // @ts-expect-error refs must match the element selected with as
            <AvatarGroup as="a" href="/members" ref={buttonRef} size={36}>
                <Avatar size={36} name="Jane Doe" />
                <Avatar size={36} name="John Doe" />
            </AvatarGroup>
        )
        expect(invalidRefElement).toBeTruthy()
    })
})

describe('AvatarPair', () => {
    it('renders direct Avatar children without wrappers', () => {
        render(
            <AvatarPair data-testid="pair" size={28}>
                <Avatar data-testid="first" size={28} name="Jane Doe" />
                <Avatar data-testid="second" size={28} name="John Doe" />
            </AvatarPair>,
        )

        expect(screen.getByTestId('pair')).toContainElement(screen.getByTestId('first'))
        expect(screen.getByTestId('pair')).toContainElement(screen.getByTestId('second'))
        expect(screen.getByTestId('first').parentElement).toBe(screen.getByTestId('pair'))
        expect(screen.getByTestId('second').parentElement).toBe(screen.getByTestId('pair'))
    })

    it('sets size-derived pair variables', () => {
        render(
            <AvatarPair data-testid="pair" size={28}>
                <Avatar size={28} name="Jane Doe" />
                <Avatar size={28} name="John Doe" />
            </AvatarPair>,
        )

        expect(screen.getByTestId('pair')).toHaveStyle({
            '--reactist-avatar-pair-size': '28px',
            '--reactist-avatar-pair-spacing': '12px',
            '--reactist-avatar-pair-mask': '2px',
            '--reactist-avatar-pair-rounded-mask-radius': 'calc(5px + 2px)',
        })
    })

    it('sets large size-derived pair variables', () => {
        render(
            <AvatarPair data-testid="pair" size={80}>
                <Avatar size={80} name="Jane Doe" />
                <Avatar size={80} name="John Doe" />
            </AvatarPair>,
        )

        expect(screen.getByTestId('pair')).toHaveStyle({
            '--reactist-avatar-pair-size': '80px',
            '--reactist-avatar-pair-spacing': '36px',
            '--reactist-avatar-pair-mask': '3px',
            '--reactist-avatar-pair-rounded-mask-radius': 'calc(10px + 3px)',
        })
    })

    it('applies the pair shape class', () => {
        render(
            <AvatarPair data-testid="pair" size={28} shape="rounded">
                <Avatar size={28} shape="rounded" name="Workspace" />
                <Avatar size={28} shape="rounded" name="Design System" />
            </AvatarPair>,
        )

        expect(screen.getByTestId('pair')).toHaveClass('avatarPairShape-rounded')
    })

    it('applies the escape hatch class name', () => {
        render(
            <AvatarPair data-testid="pair" size={28} exceptionallySetClassName="custom-pair">
                <Avatar size={28} name="Jane Doe" />
                <Avatar size={28} name="John Doe" />
            </AvatarPair>,
        )

        expect(screen.getByTestId('pair')).toHaveClass('custom-pair')
    })

    it('can render as a button', () => {
        render(
            <AvatarPair as="button" aria-label="Open workspace pair" size={28}>
                <Avatar size={28} name="Workspace" />
                <Avatar size={28} name="Design System" />
            </AvatarPair>,
        )

        expect(screen.getByRole('button', { name: 'Open workspace pair' })).toBeVisible()
    })

    it('derives the root ref type from the element rendered with as', () => {
        const anchorRef = React.createRef<HTMLAnchorElement>()
        const buttonRef = React.createRef<HTMLButtonElement>()

        render(
            <AvatarPair
                as="a"
                data-testid="pair"
                href="/workspaces/design"
                ref={anchorRef}
                size={28}
            >
                <Avatar size={28} name="Workspace" />
                <Avatar size={28} name="Design System" />
            </AvatarPair>,
        )

        expect(anchorRef.current).toBe(screen.getByTestId('pair'))

        const invalidRefElement = (
            // @ts-expect-error refs must match the element selected with as
            <AvatarPair as="a" href="/workspaces/design" ref={buttonRef} size={28}>
                <Avatar size={28} name="Workspace" />
                <Avatar size={28} name="Design System" />
            </AvatarPair>
        )
        expect(invalidRefElement).toBeTruthy()
    })
})
