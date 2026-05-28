import * as React from 'react'

import { render, screen } from '@testing-library/react'
import { axe } from 'jest-axe'

import { Avatar } from './avatar'
import { AvatarGroup } from './avatar-group'

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

    it('hides the count overlay from assistive tech', () => {
        render(
            <AvatarGroup data-testid="group" size={36} count={3}>
                <Avatar size={36} name="Jane Doe" />
                <Avatar size={36} name="John Doe" />
            </AvatarGroup>,
        )

        expect(screen.getByText('3')).toHaveAttribute('aria-hidden', 'true')
    })

    it('omits the count overlay when count is not positive', () => {
        render(
            <AvatarGroup data-testid="group" size={36} count={0}>
                <Avatar size={36} name="Jane Doe" />
                <Avatar size={36} name="John Doe" />
            </AvatarGroup>,
        )

        expect(screen.queryByText(/^\+/)).not.toBeInTheDocument()
    })

    it('omits the count overlay when count is not provided', () => {
        render(
            <AvatarGroup data-testid="group" size={36}>
                <Avatar size={36} name="Jane Doe" />
                <Avatar size={36} name="John Doe" />
            </AvatarGroup>,
        )

        expect(screen.queryByText(/^\+/)).not.toBeInTheDocument()
    })

    it('renders the count overlay alongside a single avatar', () => {
        render(
            <AvatarGroup data-testid="group" size={36} count={4}>
                <Avatar size={36} name="Jane Doe" />
            </AvatarGroup>,
        )

        expect(screen.getByText('4')).toBeInTheDocument()
        expect(screen.getByRole('img', { name: 'Jane Doe' })).toBeInTheDocument()
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

    describe('a11y', () => {
        it('renders with no a11y violations', async () => {
            const { container } = render(
                <>
                    <AvatarGroup size={36}>
                        <Avatar size={36} name="Jane Doe" image="avatar.png" />
                        <Avatar size={36} name="John Doe" />
                    </AvatarGroup>
                    <AvatarGroup size={36} count={3}>
                        <Avatar size={36} name="Jane Doe" />
                        <Avatar size={36} name="John Doe" />
                    </AvatarGroup>
                    <AvatarGroup size={36} shape="rounded" count={5}>
                        <Avatar size={36} shape="rounded" name="Reactist" />
                        <Avatar size={36} shape="rounded" name="Todoist" />
                    </AvatarGroup>
                    <AvatarGroup as="button" aria-label="Manage 5 members" size={36} count={3}>
                        <Avatar size={36} name="Jane Doe" />
                        <Avatar size={36} name="John Doe" />
                    </AvatarGroup>
                </>,
            )
            const results = await axe(container)

            expect(results).toHaveNoViolations()
        })
    })
})
