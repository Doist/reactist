import * as React from 'react'
import { fireEvent, render, screen } from '@testing-library/react'
import { axe } from 'jest-axe'
import { Notification } from './notification'

describe('Notification', () => {
    it('renders the provided title and subtitle', () => {
        render(
            <Notification id="notification-test" title="I'm a title" subtitle="I'm a subtitle" />,
        )

        expect(screen.getByText("I'm a title")).toBeVisible()
        expect(screen.getByText("I'm a subtitle")).toBeVisible()
    })

    it("doesn't render a button or close button by default", () => {
        render(
            <Notification id="notification-test" title="I'm a title" subtitle="I'm a subtitle" />,
        )

        expect(screen.queryAllByRole('button')).toHaveLength(0)
    })

    it('renders a close button when onClose is provided', () => {
        const onClose = jest.fn()

        render(
            <Notification
                id="notification-test"
                title="I'm a title"
                onClose={onClose}
                closeAltText="Close me"
            />,
        )
        fireEvent.click(screen.getByRole('button', { name: 'Close me' }))

        expect(onClose).toHaveBeenCalledTimes(1)
    })

    it('renders a button around the content when onClick is provided', () => {
        const onClick = jest.fn()

        render(<Notification id="notification-test" title="I'm a title" onClick={onClick} />)
        fireEvent.click(screen.getByRole('button', { name: "I'm a title" }))

        expect(onClick).toHaveBeenCalledTimes(1)
    })

    it('renders a provided custom icon', () => {
        render(
            <Notification
                id="notification-test"
                title="I'm a title"
                icon={<div>I'm an icon</div>}
            />,
        )

        expect(screen.getByText("I'm an icon")).toBeVisible()
        expect(screen.getByText("I'm a title")).toBeVisible()
    })

    it('renders children in place of the title and subtitle', () => {
        render(
            <Notification
                id="notification-test"
                title="I'm a title"
                subtitle="I'm a subtitle"
                icon={<div>I'm an icon</div>}
            >
                I'm what gets rendered instead
            </Notification>,
        )

        expect(screen.queryByText("I'm a title")).not.toBeInTheDocument()
        expect(screen.queryByText("I'm a subtitle")).not.toBeInTheDocument()
        expect(screen.getByText("I'm an icon")).toBeVisible()
        expect(screen.getByRole('alert', { name: "I'm what gets rendered instead" })).toBeVisible()
    })

    describe('a11y', () => {
        it('renders with no a11y violations', async () => {
            const { container } = render(
                <Notification
                    id="notification-test"
                    title="I'm a title"
                    subtitle="I'm a subtitle"
                    icon={<div>I'm an icon</div>}
                >
                    I'm what gets rendered instead
                </Notification>,
            )
            const results = await axe(container)

            expect(results).toHaveNoViolations()
        })
    })
})
