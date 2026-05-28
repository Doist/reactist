import * as React from 'react'

import { render, screen } from '@testing-library/react'
import { axe } from 'jest-axe'

import { Avatar } from './avatar'
import { AvatarPair } from './avatar-pair'

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

    it('requires exactly two children at the type level', () => {
        const invalidPair = (
            // @ts-expect-error AvatarPair children must be a tuple of two elements
            <AvatarPair size={28}>
                <Avatar size={28} name="Jane Doe" />
            </AvatarPair>
        )
        expect(invalidPair).toBeTruthy()
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

    describe('a11y', () => {
        it('renders with no a11y violations', async () => {
            const { container } = render(
                <>
                    <AvatarPair size={28}>
                        <Avatar size={28} name="Jane Doe" image="avatar.png" />
                        <Avatar size={28} name="John Doe" />
                    </AvatarPair>
                    <AvatarPair size={36} shape="rounded">
                        <Avatar size={36} shape="rounded" name="Reactist" />
                        <Avatar size={36} shape="rounded" name="Design System" />
                    </AvatarPair>
                    <AvatarPair as="button" aria-label="Open shared workspace" size={28}>
                        <Avatar size={28} name="Workspace" />
                        <Avatar size={28} name="Design System" />
                    </AvatarPair>
                </>,
            )
            const results = await axe(container)

            expect(results).toHaveNoViolations()
        })
    })
})
